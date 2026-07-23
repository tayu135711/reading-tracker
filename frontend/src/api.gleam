import gleam/http
import gleam/http/request
import gleam/int
import gleam/json
import lustre/effect.{type Effect}
import lustre_http
import session
import types.{
  type Book, type LookupResult, books_decoder, lookup_decoder,
  share_uuid_decoder,
}

// 本番バックエンド(Render)のURL
const api_base = "https://reading-tracker-backend-wc3c.onrender.com/api"

// 自分の本棚を識別するためのヘッダー。端末ごとに発行されるセッションIDを毎回付ける。
fn set_session_header(req: request.Request(String)) -> request.Request(String) {
  request.set_header(req, "X-Session-Id", session.get_or_create_session_id())
}

// GET(セッションヘッダー付き)
fn get(url: String, expect: lustre_http.Expect(msg)) -> Effect(msg) {
  let assert Ok(req) = request.to(url)
  req
  |> set_session_header
  |> lustre_http.send(expect)
}

// POST(セッションヘッダー付き)
fn post(
  url: String,
  body: json.Json,
  expect: lustre_http.Expect(msg),
) -> Effect(msg) {
  let assert Ok(req) = request.to(url)
  req
  |> request.set_method(http.Post)
  |> request.set_header("Content-Type", "application/json")
  |> request.set_body(json.to_string(body))
  |> set_session_header
  |> lustre_http.send(expect)
}

// lustre_httpにはPATCHの組み込みヘルパーが無いので、gleam/http/requestで自前で組み立てる。
fn patch(
  url: String,
  body: json.Json,
  expect: lustre_http.Expect(msg),
) -> Effect(msg) {
  let assert Ok(req) = request.to(url)
  req
  |> request.set_method(http.Patch)
  |> request.set_header("Content-Type", "application/json")
  |> request.set_body(json.to_string(body))
  |> set_session_header
  |> lustre_http.send(expect)
}

pub fn fetch_books(
  on_result: fn(Result(List(Book), lustre_http.HttpError)) -> msg,
) -> Effect(msg) {
  get(api_base <> "/books", lustre_http.expect_json(books_decoder(), on_result))
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

  post(api_base <> "/books", body, lustre_http.expect_anything(on_result))
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

  post(
    api_base <> "/books/" <> int.to_string(book_id) <> "/reviews",
    body,
    lustre_http.expect_anything(on_result),
  )
}

pub fn update_status(
  book_id: Int,
  status: types.BookStatus,
  on_result: fn(Result(Nil, lustre_http.HttpError)) -> msg,
) -> Effect(msg) {
  let body =
    json.object([#("status", json.string(types.status_to_string(status)))])

  patch(
    api_base <> "/books/" <> int.to_string(book_id) <> "/status",
    body,
    lustre_http.expect_anything(on_result),
  )
}

pub fn update_progress(
  book_id: Int,
  current_page: Int,
  total_page: Int,
  on_result: fn(Result(Nil, lustre_http.HttpError)) -> msg,
) -> Effect(msg) {
  let body =
    json.object([
      #("currentPage", json.int(current_page)),
      #("totalPage", json.int(total_page)),
    ])

  patch(
    api_base <> "/books/" <> int.to_string(book_id) <> "/progress",
    body,
    lustre_http.expect_anything(on_result),
  )
}

pub fn create_share_link(
  book_id: Int,
  on_result: fn(Result(String, lustre_http.HttpError)) -> msg,
) -> Effect(msg) {
  post(
    api_base <> "/books/" <> int.to_string(book_id) <> "/share",
    json.object([]),
    lustre_http.expect_json(share_uuid_decoder(), on_result),
  )
}

// ISBNから書誌情報を検索する(OpenBD連携、バックエンド経由)
// これは本棚に紐づかない共通の検索なのでセッションヘッダーは不要。
pub fn lookup_isbn(
  isbn: String,
  on_result: fn(Result(LookupResult, lustre_http.HttpError)) -> msg,
) -> Effect(msg) {
  lustre_http.get(
    api_base <> "/books/lookup?isbn=" <> isbn,
    lustre_http.expect_json(lookup_decoder(), on_result),
  )
}
