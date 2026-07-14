import gleam/int
import gleam/json
import lustre/effect.{type Effect}
import lustre_http
import types.{type Book, books_decoder, share_uuid_decoder}

// 本番バックエンド(Render)のURL
const api_base = "https://reading-tracker-backend-wc3c.onrender.com/api"

// 一覧取得
pub fn fetch_books(
  on_result: fn(Result(List(Book), lustre_http.HttpError)) -> msg,
) -> Effect(msg) {
  lustre_http.get(
    api_base <> "/books",
    lustre_http.expect_json(books_decoder(), on_result),
  )
}

// 登録(成功したらMsgだけ返す。一覧の再取得はupdate側でfetch_booksを呼ぶ)
pub fn create_book(
  title: String,
  author: String,
  genre: String,
  on_result: fn(Result(Nil, lustre_http.HttpError)) -> msg,
) -> Effect(msg) {
  let body =
    json.object([
      #("title", json.string(title)),
      #("author", json.string(author)),
      #("genre", json.string(genre)),
      #("coverUrl", json.null()),
      #("status", json.string("UNREAD")),
    ])

  lustre_http.post(
    api_base <> "/books",
    body,
    lustre_http.expect_anything(on_result),
  )
}

// 感想を追加
pub fn add_review(
  book_id: Int,
  rating: Int,
  comment: String,
  on_result: fn(Result(Nil, lustre_http.HttpError)) -> msg,
) -> Effect(msg) {
  let body =
    json.object([
      #("rating", json.int(rating)),
      #("comment", json.string(comment)),
    ])

  lustre_http.post(
    api_base <> "/books/" <> int.to_string(book_id) <> "/reviews",
    body,
    lustre_http.expect_anything(on_result),
  )
}

// おすすめ用の共有リンクを発行する(友達に送るURLのuuidを取得)
pub fn create_share_link(
  book_id: Int,
  on_result: fn(Result(String, lustre_http.HttpError)) -> msg,
) -> Effect(msg) {
  lustre_http.post(
    api_base <> "/books/" <> int.to_string(book_id) <> "/share",
    json.object([]),
    lustre_http.expect_json(share_uuid_decoder(), on_result),
  )
}
