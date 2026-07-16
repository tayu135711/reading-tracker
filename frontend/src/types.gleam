import gleam/dynamic/decode
import gleam/option.{type Option}

pub type BookStatus {
  Unread
  Reading
  Finished
}

pub fn status_to_string(status: BookStatus) -> String {
  case status {
    Unread -> "UNREAD"
    Reading -> "READING"
    Finished -> "FINISHED"
  }
}

pub fn status_label(status: BookStatus) -> String {
  case status {
    Unread -> "未読"
    Reading -> "読書中"
    Finished -> "読了"
  }
}

fn status_from_string(str: String) -> BookStatus {
  case str {
    "READING" -> Reading
    "FINISHED" -> Finished
    _ -> Unread
  }
}

pub type Review {
  Review(id: Int, rating: Int, comment: String, read_date: String)
}

pub type Book {
  Book(
    id: Int,
    title: String,
    author: String,
    genre: String,
    cover_url: Option(String),
    status: BookStatus,
    reviews: List(Review),
  )
}

pub type LookupResult {
  LookupResult(
    found: Bool,
    title: Option(String),
    author: Option(String),
    cover_url: Option(String),
    publisher: Option(String),
  )
}

// ===== JSONデコーダー =====
// バックエンド(Kotlin/Spring Boot)が返すJSONの形と1対1で対応させる

pub fn review_decoder() -> decode.Decoder(Review) {
  use id <- decode.field("id", decode.int)
  use rating <- decode.field("rating", decode.int)
  use comment <- decode.field("comment", decode.string)
  use read_date <- decode.field("readDate", decode.string)
  decode.success(Review(id, rating, comment, read_date))
}

pub fn book_decoder() -> decode.Decoder(Book) {
  use id <- decode.field("id", decode.int)
  use title <- decode.field("title", decode.string)
  use author <- decode.field("author", decode.string)
  use genre <- decode.field("genre", decode.string)
  use cover_url <- decode.field("coverUrl", decode.optional(decode.string))
  use status_str <- decode.field("status", decode.string)
  use reviews <- decode.field("reviews", decode.list(review_decoder()))
  decode.success(Book(
    id,
    title,
    author,
    genre,
    cover_url,
    status_from_string(status_str),
    reviews,
  ))
}

pub fn books_decoder() -> decode.Decoder(List(Book)) {
  decode.list(book_decoder())
}

pub fn share_uuid_decoder() -> decode.Decoder(String) {
  use uuid <- decode.field("uuid", decode.string)
  decode.success(uuid)
}

pub fn lookup_decoder() -> decode.Decoder(LookupResult) {
  use found <- decode.field("found", decode.bool)
  use title <- decode.field("title", decode.optional(decode.string))
  use author <- decode.field("author", decode.optional(decode.string))
  use cover_url <- decode.field("coverUrl", decode.optional(decode.string))
  use publisher <- decode.field("publisher", decode.optional(decode.string))
  decode.success(LookupResult(found, title, author, cover_url, publisher))
}
