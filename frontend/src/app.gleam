import api
import gleam/int
import gleam/list
import gleam/option.{type Option, None, Some}
import gleam/string
import lustre
import lustre/attribute
import lustre/effect.{type Effect}
import lustre/element.{type Element}
import lustre/element/html
import lustre/event
import lustre_http
import types.{type Book, type LookupResult, type Review, status_label}

pub fn main() {
  let app = lustre.application(init, update, view)
  let assert Ok(_) = lustre.start(app, "#app", Nil)
  Nil
}

// ===== Model =====

pub type Model {
  Model(
    // 本棚
    books: List(Book),
    loading: Bool,
    error: Option(String),
    expanded_book: Option(Int),
    search_query: String,

    // 手動登録フォーム
    show_manual_form: Bool,
    new_title: String,
    new_author: String,
    new_genre: String,

    // ISBN検索
    isbn_input: String,
    lookup_result: Option(LookupResult),
    lookup_loading: Bool,
    lookup_error: Option(String),

    // 感想フォーム
    review_target: Option(Int),
    review_rating: Int,
    review_comment: String,

    // 共有リンク
    share_link: Option(String),
  )
}

fn init(_flags) -> #(Model, Effect(Msg)) {
  let model =
    Model(
      books: [],
      loading: True,
      error: None,
      expanded_book: None,
      search_query: "",
      show_manual_form: False,
      new_title: "",
      new_author: "",
      new_genre: "",
      isbn_input: "",
      lookup_result: None,
      lookup_loading: False,
      lookup_error: None,
      review_target: None,
      review_rating: 5,
      review_comment: "",
      share_link: None,
    )
  #(model, api.fetch_books(ApiReturnedBooks))
}

// ===== Msg =====

pub type Msg {
  // 本棚
  ApiReturnedBooks(Result(List(Book), lustre_http.HttpError))
  UserToggledBookSpine(Int)
  UserUpdatedSearchQuery(String)

  // 手動登録
  UserToggledManualForm
  UserUpdatedTitle(String)
  UserUpdatedAuthor(String)
  UserUpdatedGenre(String)
  UserSubmittedBook
  ApiBookCreated(Result(Nil, lustre_http.HttpError))

  // ISBN検索
  UserUpdatedIsbn(String)
  UserSubmittedIsbnLookup
  ApiLookupReturned(Result(LookupResult, lustre_http.HttpError))
  UserRegisteredLookedUpBook

  // 感想
  UserOpenedReviewForm(Int)
  UserUpdatedRating(Int)
  UserUpdatedComment(String)
  UserSubmittedReview(Int)
  ApiReviewAdded(Result(Nil, lustre_http.HttpError))

  // 共有
  UserRequestedShareLink(Int)
  ApiShareLinkCreated(Result(String, lustre_http.HttpError))
}

// ===== update =====

fn update(model: Model, msg: Msg) -> #(Model, Effect(Msg)) {
  case msg {
    // ---- 本棚 ----
    ApiReturnedBooks(Ok(books)) -> #(
      Model(..model, books: books, loading: False, error: None),
      effect.none(),
    )
    ApiReturnedBooks(Error(_)) -> #(
      Model(..model, loading: False, error: Some("本棚を読み込めんかった")),
      effect.none(),
    )
    UserToggledBookSpine(id) -> #(
      Model(
        ..model,
        expanded_book: case model.expanded_book == Some(id) {
          True -> None
          False -> Some(id)
        },
        share_link: None,
      ),
      effect.none(),
    )
    UserUpdatedSearchQuery(v) -> #(
      Model(..model, search_query: v),
      effect.none(),
    )

    // ---- 手動登録 ----
    UserToggledManualForm -> #(
      Model(..model, show_manual_form: !model.show_manual_form),
      effect.none(),
    )
    UserUpdatedTitle(v) -> #(Model(..model, new_title: v), effect.none())
    UserUpdatedAuthor(v) -> #(Model(..model, new_author: v), effect.none())
    UserUpdatedGenre(v) -> #(Model(..model, new_genre: v), effect.none())
    UserSubmittedBook -> #(
      model,
      api.create_book(model.new_title, model.new_author, model.new_genre, "", ApiBookCreated),
    )
    ApiBookCreated(Ok(_)) -> #(
      Model(
        ..model,
        new_title: "",
        new_author: "",
        new_genre: "",
        show_manual_form: False,
      ),
      api.fetch_books(ApiReturnedBooks),
    )
    ApiBookCreated(Error(_)) -> #(
      Model(..model, error: Some("本の登録に失敗した")),
      effect.none(),
    )

    // ---- ISBN検索 ----
    UserUpdatedIsbn(v) -> #(
      Model(..model, isbn_input: v, lookup_error: None),
      effect.none(),
    )
    UserSubmittedIsbnLookup -> #(
      Model(..model, lookup_loading: True, lookup_result: None, lookup_error: None),
      api.lookup_isbn(model.isbn_input, ApiLookupReturned),
    )
    ApiLookupReturned(Ok(result)) -> {
      case result.found {
        True -> #(
          Model(..model, lookup_loading: False, lookup_result: Some(result)),
          effect.none(),
        )
        False -> #(
          Model(
            ..model,
            lookup_loading: False,
            lookup_result: None,
            lookup_error: Some("この本の情報が見つからんかった。手入力で登録してな"),
          ),
          effect.none(),
        )
      }
    }
    ApiLookupReturned(Error(_)) -> #(
      Model(..model, lookup_loading: False, lookup_error: Some("検索に失敗した")),
      effect.none(),
    )
    UserRegisteredLookedUpBook -> {
      case model.lookup_result {
        Some(result) -> {
          let title = option.unwrap(result.title, "")
          let author = option.unwrap(result.author, "")
          let cover = option.unwrap(result.cover_url, "")
          #(
            Model(..model, isbn_input: "", lookup_result: None),
            api.create_book(title, author, "未分類", cover, ApiBookCreated),
          )
        }
        None -> #(model, effect.none())
      }
    }

    // ---- 感想 ----
    UserOpenedReviewForm(id) -> #(
      Model(..model, review_target: Some(id)),
      effect.none(),
    )
    UserUpdatedRating(v) -> #(Model(..model, review_rating: v), effect.none())
    UserUpdatedComment(v) -> #(Model(..model, review_comment: v), effect.none())
    UserSubmittedReview(id) -> #(
      model,
      api.add_review(id, model.review_rating, model.review_comment, ApiReviewAdded),
    )
    ApiReviewAdded(Ok(_)) -> #(
      Model(..model, review_target: None, review_comment: ""),
      api.fetch_books(ApiReturnedBooks),
    )
    ApiReviewAdded(Error(_)) -> #(
      Model(..model, error: Some("感想の登録に失敗した")),
      effect.none(),
    )

    // ---- 共有 ----
    UserRequestedShareLink(id) -> #(
      Model(..model, share_link: None),
      api.create_share_link(id, ApiShareLinkCreated),
    )
    ApiShareLinkCreated(Ok(uuid)) -> #(
      Model(..model, share_link: Some(uuid)),
      effect.none(),
    )
    ApiShareLinkCreated(Error(_)) -> #(
      Model(..model, error: Some("共有リンクの発行に失敗した")),
      effect.none(),
    )
  }
}

// ===== view =====

fn view(model: Model) -> Element(Msg) {
  html.div([attribute.class("study-room")], [
    html.header([attribute.class("study-header")], [
      html.div([], [
        html.p([attribute.class("eyebrow")], [element.text("蔵書録")]),
        html.h1([attribute.class("study-title")], [element.text("わたしの書斎")]),
      ]),
    ]),
    view_isbn_panel(model),
    view_manual_toggle(model),
    case model.show_manual_form {
      True -> view_manual_form(model)
      False -> element.none()
    },
    case model.error {
      Some(msg) -> html.p([attribute.class("error-plate")], [element.text(msg)])
      None -> element.none()
    },
    case model.loading {
      True -> html.p([attribute.class("candle-loading")], [element.text("灯りを点けとる...")])
      False -> view_shelf(model)
    },
  ])
}

fn view_isbn_panel(model: Model) -> Element(Msg) {
  html.div([attribute.class("brass-panel")], [
    html.p([attribute.class("panel-label")], [element.text("ISBNから取り寄せる")]),
    html.div([attribute.class("isbn-row")], [
      html.input([
        attribute.class("isbn-input"),
        attribute.value(model.isbn_input),
        event.on_input(UserUpdatedIsbn),
        attribute.placeholder("背表紙のバーコード下の数字(13桁)"),
      ]),
      html.button(
        [attribute.class("brass-button"), event.on_click(UserSubmittedIsbnLookup)],
        [element.text(case model.lookup_loading {
          True -> "取り寄せ中..."
          False -> "取り寄せる"
        })],
      ),
    ]),
    case model.lookup_error {
      Some(msg) -> html.p([attribute.class("error-plate")], [element.text(msg)])
      None -> element.none()
    },
    case model.lookup_result {
      Some(result) -> view_lookup_preview(result)
      None -> element.none()
    },
  ])
}

fn view_lookup_preview(result: LookupResult) -> Element(Msg) {
  html.div([attribute.class("lookup-preview")], [
    case result.cover_url {
      Some(url) -> html.img([attribute.src(url), attribute.class("lookup-cover")])
      None -> element.none()
    },
    html.div([], [
      html.p([attribute.class("lookup-title")], [
        element.text(option.unwrap(result.title, "(タイトル不明)")),
      ]),
      html.p([attribute.class("lookup-author")], [
        element.text(option.unwrap(result.author, "")),
      ]),
      html.button(
        [attribute.class("brass-button small"), event.on_click(UserRegisteredLookedUpBook)],
        [element.text("この本を棚に加える")],
      ),
    ]),
  ])
}

fn view_manual_toggle(model: Model) -> Element(Msg) {
  html.button(
    [attribute.class("quiet-link"), event.on_click(UserToggledManualForm)],
    [
      element.text(case model.show_manual_form {
        True -> "手入力をやめる"
        False -> "見つからんかったら、手で書き込む"
      }),
    ],
  )
}

fn view_manual_form(model: Model) -> Element(Msg) {
  html.div([attribute.class("brass-panel")], [
    html.div([attribute.class("ledger-field")], [
      html.label([], [element.text("題")]),
      html.input([
        attribute.value(model.new_title),
        event.on_input(UserUpdatedTitle),
      ]),
    ]),
    html.div([attribute.class("ledger-field")], [
      html.label([], [element.text("著者")]),
      html.input([
        attribute.value(model.new_author),
        event.on_input(UserUpdatedAuthor),
      ]),
    ]),
    html.div([attribute.class("ledger-field")], [
      html.label([], [element.text("分類")]),
      html.input([
        attribute.value(model.new_genre),
        event.on_input(UserUpdatedGenre),
      ]),
    ]),
    html.button(
      [attribute.class("brass-button"), event.on_click(UserSubmittedBook)],
      [element.text("棚に加える")],
    ),
  ])
}

fn view_shelf(model: Model) -> Element(Msg) {
  let filtered = filter_books(model.books, model.search_query)

  html.div([], [
    html.div([attribute.class("ledger-field search-field")], [
      html.input([
        attribute.class("search-input"),
        attribute.value(model.search_query),
        event.on_input(UserUpdatedSearchQuery),
        attribute.placeholder("題・著者・分類で棚を探す"),
      ]),
    ]),
    case model.books, filtered {
      [], _ ->
        html.p([attribute.class("empty-shelf")], [
          element.text("棚はまだ空っぽや。最初の一冊を迎え入れよか"),
        ])
      _, [] ->
        html.p([attribute.class("empty-shelf")], [
          element.text("その言葉に当てはまる本は見当たらんかった"),
        ])
      _, books ->
        html.div(
          [attribute.class("shelf")],
          list.index_map(books, fn(book, i) { view_spine(book, i, model) }),
        )
    },
  ])
}

fn filter_books(books: List(Book), query: String) -> List(Book) {
  let needle = string.lowercase(string.trim(query))
  case needle {
    "" -> books
    _ ->
      list.filter(books, fn(book) {
        string.contains(string.lowercase(book.title), needle)
        || string.contains(string.lowercase(book.author), needle)
        || string.contains(string.lowercase(book.genre), needle)
      })
  }
}

const spine_colors = ["#6B3226", "#4A5D43", "#3A4A63", "#5C4A2E", "#5A3B5C"]

fn spine_color(index: Int) -> String {
  let n = list.length(spine_colors)
  let i = index % n
  case list.drop(spine_colors, i) {
    [color, ..] -> color
    [] -> "#4A3423"
  }
}

fn view_spine(book: Book, index: Int, model: Model) -> Element(Msg) {
  let is_open = model.expanded_book == Some(book.id)
  html.div([attribute.class("volume")], [
    html.div(
      [
        attribute.class("spine"),
        attribute.style("background", spine_color(index)),
        event.on_click(UserToggledBookSpine(book.id)),
      ],
      [
        html.span([attribute.class("spine-title")], [element.text(book.title)]),
        html.span([attribute.class("spine-status")], [
          element.text(status_label(book.status)),
        ]),
      ],
    ),
    case is_open {
      True -> view_book_detail(book, model)
      False -> element.none()
    },
  ])
}

fn view_book_detail(book: Book, model: Model) -> Element(Msg) {
  html.div([attribute.class("book-detail")], [
    case book.cover_url {
      Some(url) -> html.img([attribute.src(url), attribute.class("detail-cover")])
      None -> element.none()
    },
    html.div([], [
      html.h2([attribute.class("detail-title")], [element.text(book.title)]),
      html.p([attribute.class("detail-meta")], [
        element.text(book.author <> " ・ " <> book.genre),
      ]),
      html.div([attribute.class("review-list")], list.map(book.reviews, view_review)),
      html.div([attribute.class("detail-actions")], [
        html.button(
          [attribute.class("brass-button small"), event.on_click(UserOpenedReviewForm(book.id))],
          [element.text("感想を記す")],
        ),
        html.button(
          [attribute.class("brass-button small"), event.on_click(UserRequestedShareLink(book.id))],
          [element.text("誰かに薦める")],
        ),
      ]),
      case model.review_target == Some(book.id) {
        True -> view_review_form(book.id, model)
        False -> element.none()
      },
      case model.share_link {
        Some(uuid) ->
          html.p([attribute.class("share-note")], [
            element.text("薦め状ができたで → /share/" <> uuid),
          ])
        None -> element.none()
      },
    ]),
  ])
}

fn view_review(review: Review) -> Element(Msg) {
  html.p([attribute.class("review-line")], [
    element.text(stars(review.rating) <> "  " <> review.comment),
  ])
}

fn stars(rating: Int) -> String {
  case rating {
    1 -> "★"
    2 -> "★★"
    3 -> "★★★"
    4 -> "★★★★"
    5 -> "★★★★★"
    _ -> "★★★★★"
  }
}

fn view_review_form(book_id: Int, model: Model) -> Element(Msg) {
  html.div([attribute.class("ledger-field")], [
    html.label([], [element.text("評価(1〜5)")]),
    html.input([
      attribute.type_("number"),
      attribute.value(int.to_string(model.review_rating)),
      event.on_input(fn(v) { UserUpdatedRating(parse_int_or(v, 5)) }),
    ]),
    html.textarea(
      [
        event.on_input(UserUpdatedComment),
        attribute.placeholder("読んだ感想を書き残す"),
      ],
      model.review_comment,
    ),
    html.button(
      [attribute.class("brass-button small"), event.on_click(UserSubmittedReview(book_id))],
      [element.text("記す")],
    ),
  ])
}

fn parse_int_or(value: String, default: Int) -> Int {
  case int.parse(value) {
    Ok(n) -> n
    Error(_) -> default
  }
}
