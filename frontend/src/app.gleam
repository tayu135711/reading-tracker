import api
import gleam/int
import gleam/list
import gleam/option.{type Option, None, Some}
import lustre
import lustre/effect.{type Effect}
import lustre/element.{type Element}
import lustre/element/html
import lustre/event
import lustre_http
import types.{type Book, type Review, Book, status_label}

pub fn main() {
  let app = lustre.application(init, update, view)
  let assert Ok(_) = lustre.start(app, "#app", Nil)
  Nil
}

// ===== Model =====

pub type Model {
  Model(
    books: List(Book),
    loading: Bool,
    error: Option(String),
    // 登録フォームの入力中の値
    new_title: String,
    new_author: String,
    new_genre: String,
    // 感想フォーム(どの本に対して入力中か)
    review_target: Option(Int),
    review_rating: Int,
    review_comment: String,
    // 直近発行した共有リンク
    share_link: Option(String),
  )
}

fn init(_flags) -> #(Model, Effect(Msg)) {
  let model =
    Model(
      books: [],
      loading: True,
      error: None,
      new_title: "",
      new_author: "",
      new_genre: "",
      review_target: None,
      review_rating: 5,
      review_comment: "",
      share_link: None,
    )
  #(model, api.fetch_books(ApiReturnedBooks))
}

// ===== Msg =====

pub type Msg {
  ApiReturnedBooks(Result(List(Book), lustre_http.HttpError))
  ApiBookCreated(Result(Nil, lustre_http.HttpError))
  ApiReviewAdded(Result(Nil, lustre_http.HttpError))
  ApiShareLinkCreated(Result(String, lustre_http.HttpError))

  UserUpdatedTitle(String)
  UserUpdatedAuthor(String)
  UserUpdatedGenre(String)
  UserSubmittedBook

  UserOpenedReviewForm(Int)
  UserUpdatedRating(Int)
  UserUpdatedComment(String)
  UserSubmittedReview(Int)

  UserRequestedShareLink(Int)
}

// ===== update =====

fn update(model: Model, msg: Msg) -> #(Model, Effect(Msg)) {
  case msg {
    ApiReturnedBooks(Ok(books)) -> #(
      Model(..model, books: books, loading: False, error: None),
      effect.none(),
    )
    ApiReturnedBooks(Error(_)) -> #(
      Model(
        ..model,
        loading: False,
        error: Some(
          "本の一覧を取得できんかった。バックエンド(localhost:8080)が起動してるか確認してな",
        ),
      ),
      effect.none(),
    )

    ApiBookCreated(Ok(_)) -> #(
      Model(..model, new_title: "", new_author: "", new_genre: ""),
      api.fetch_books(ApiReturnedBooks),
    )
    ApiBookCreated(Error(_)) -> #(
      Model(..model, error: Some("本の登録に失敗した")),
      effect.none(),
    )

    ApiReviewAdded(Ok(_)) -> #(
      Model(..model, review_target: None, review_comment: ""),
      api.fetch_books(ApiReturnedBooks),
    )
    ApiReviewAdded(Error(_)) -> #(
      Model(..model, error: Some("感想の登録に失敗した")),
      effect.none(),
    )

    ApiShareLinkCreated(Ok(uuid)) -> #(
      Model(..model, share_link: Some(uuid)),
      effect.none(),
    )
    ApiShareLinkCreated(Error(_)) -> #(
      Model(..model, error: Some("共有リンクの発行に失敗した")),
      effect.none(),
    )

    UserUpdatedTitle(value) -> #(Model(..model, new_title: value), effect.none())
    UserUpdatedAuthor(value) -> #(Model(..model, new_author: value), effect.none())
    UserUpdatedGenre(value) -> #(Model(..model, new_genre: value), effect.none())

    UserSubmittedBook -> #(
      model,
      api.create_book(model.new_title, model.new_author, model.new_genre, ApiBookCreated),
    )

    UserOpenedReviewForm(book_id) -> #(
      Model(..model, review_target: Some(book_id), share_link: None),
      effect.none(),
    )
    UserUpdatedRating(value) -> #(Model(..model, review_rating: value), effect.none())
    UserUpdatedComment(value) -> #(Model(..model, review_comment: value), effect.none())

    UserSubmittedReview(book_id) -> #(
      model,
      api.add_review(book_id, model.review_rating, model.review_comment, ApiReviewAdded),
    )

    UserRequestedShareLink(book_id) -> #(
      Model(..model, share_link: None),
      api.create_share_link(book_id, ApiShareLinkCreated),
    )
  }
}

// ===== view =====

fn view(model: Model) -> Element(Msg) {
  html.div([], [
    html.h1([], [element.text("📚 読書記録トラッカー")]),
    view_error(model.error),
    view_new_book_form(model),
    view_share_link(model.share_link),
    html.hr([]),
    case model.loading {
      True -> html.p([], [element.text("読み込み中...")])
      False -> html.div([], list.map(model.books, view_book_card(_, model)))
    },
  ])
}

fn view_error(error: Option(String)) -> Element(Msg) {
  case error {
    Some(msg) -> html.p([], [element.text("⚠️ " <> msg)])
    None -> element.none()
  }
}

fn view_share_link(link: Option(String)) -> Element(Msg) {
  case link {
    Some(uuid) ->
      html.div([], [
        element.text("共有リンク発行できたで → /share/" <> uuid),
      ])
    None -> element.none()
  }
}

fn view_new_book_form(model: Model) -> Element(Msg) {
  html.div([], [
    html.h2([], [element.text("本を登録する")]),
    html.input([
      event.on_input(UserUpdatedTitle),
      html.attribute.value(model.new_title),
      html.attribute.placeholder("タイトル"),
    ]),
    html.input([
      event.on_input(UserUpdatedAuthor),
      html.attribute.value(model.new_author),
      html.attribute.placeholder("著者"),
    ]),
    html.input([
      event.on_input(UserUpdatedGenre),
      html.attribute.value(model.new_genre),
      html.attribute.placeholder("ジャンル"),
    ]),
    html.button([event.on_click(UserSubmittedBook)], [element.text("登録")]),
  ])
}

fn view_book_card(book: Book, model: Model) -> Element(Msg) {
  html.div([], [
    html.h3([], [element.text(book.title <> "(" <> status_label(book.status) <> ")")]),
    html.p([], [element.text(book.author <> " / " <> book.genre)]),
    html.div([], list.map(book.reviews, view_review)),
    html.button([event.on_click(UserOpenedReviewForm(book.id))], [
      element.text("感想を書く"),
    ]),
    html.button([event.on_click(UserRequestedShareLink(book.id))], [
      element.text("おすすめリンクを発行"),
    ]),
    case model.review_target == Some(book.id) {
      True -> view_review_form(book.id, model)
      False -> element.none()
    },
  ])
}

fn view_review(review: Review) -> Element(Msg) {
  html.p([], [
    element.text("★" <> int.to_string(review.rating) <> " " <> review.comment),
  ])
}

fn view_review_form(book_id: Int, model: Model) -> Element(Msg) {
  html.div([], [
    html.input([
      html.attribute.type_("number"),
      html.attribute.value(int.to_string(model.review_rating)),
      event.on_input(fn(value) {
        UserUpdatedRating(result_int_or(value, 5))
      }),
    ]),
    html.textarea(
      [
        event.on_input(UserUpdatedComment),
        html.attribute.placeholder("感想を書いてな"),
      ],
      model.review_comment,
    ),
    html.button([event.on_click(UserSubmittedReview(book_id))], [
      element.text("感想を保存"),
    ]),
  ])
}

fn result_int_or(value: String, default: Int) -> Int {
  case int.parse(value) {
    Ok(n) -> n
    Error(_) -> default
  }
}
