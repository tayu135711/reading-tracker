import gleam/http
import gleam/http/request
import gleam/int
import gleam/json
import lustre/effect.{type Effect}
import lustre_http
import types.{type Book, type LookupResult, books_decoder, lookup_decoder, share_uuid_decoder}

// 本番バックエンド(Render)のURL
const api_base = "https://reading-tracker-backend-wc3c.onrender.com/api"

pub fn fetch_books(
  on_result: fn(Result(List(Book), lustre_http.HttpError)) -> msg,
) -> Effect(msg) {
  lustre_http.get(
    api_base <> "/books",
    lustre_http.expect_json(books_decoder(), on_result),
  )
}

pub fn create_book(
  title: String,
  author: String,
  genre: String,
  cover_url: String,
  on_result: fn(Result(Nil, lustre_http.HttpError)) -> msg,
) -> Effect(msg) {
  let cover_json = case cover_url {
    "" -> json.null()
    url -> json.string(url)
  }
  let body =
    json.object([
      #("title", json.string(title)),
      #("author", json.string(author)),
      #("genre", json.string(genre)),
      #("coverUrl", cover_json),
      #("status", json.string("UNREAD")),
    ])

  lustre_http.post(
    api_base <> "/books",
    body,
    lustre_http.expect_anything(on_result),
  )
}

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

// ISBNから書誌情報を検索する(OpenBD連携、バックエンド経由)
pub fn lookup_isbn(
  isbn: String,
  on_result: fn(Result(LookupResult, lustre_http.HttpError)) -> msg,
) -> Effect(msg) {
  lustre_http.get(
    api_base <> "/books/lookup?isbn=" <> isbn,
    lustre_http.expect_json(lookup_decoder(), on_result),
  )
}
