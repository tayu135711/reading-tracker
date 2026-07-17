import * as $decode from "../gleam_stdlib/gleam/dynamic/decode.mjs";
import * as $option from "../gleam_stdlib/gleam/option.mjs";
import { None, Some } from "../gleam_stdlib/gleam/option.mjs";
import { CustomType as $CustomType } from "./gleam.mjs";

export class Unread extends $CustomType {}
export const BookStatus$Unread = () => new Unread();
export const BookStatus$isUnread = (value) => value instanceof Unread;

export class Reading extends $CustomType {}
export const BookStatus$Reading = () => new Reading();
export const BookStatus$isReading = (value) => value instanceof Reading;

export class Finished extends $CustomType {}
export const BookStatus$Finished = () => new Finished();
export const BookStatus$isFinished = (value) => value instanceof Finished;

export class Review extends $CustomType {
  constructor(id, rating, comment, read_date) {
    super();
    this.id = id;
    this.rating = rating;
    this.comment = comment;
    this.read_date = read_date;
  }
}
export const Review$Review = (id, rating, comment, read_date) =>
  new Review(id, rating, comment, read_date);
export const Review$isReview = (value) => value instanceof Review;
export const Review$Review$id = (value) => value.id;
export const Review$Review$0 = (value) => value.id;
export const Review$Review$rating = (value) => value.rating;
export const Review$Review$1 = (value) => value.rating;
export const Review$Review$comment = (value) => value.comment;
export const Review$Review$2 = (value) => value.comment;
export const Review$Review$read_date = (value) => value.read_date;
export const Review$Review$3 = (value) => value.read_date;

export class Book extends $CustomType {
  constructor(id, title, author, genre, cover_url, status, reviews) {
    super();
    this.id = id;
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.cover_url = cover_url;
    this.status = status;
    this.reviews = reviews;
  }
}
export const Book$Book = (id, title, author, genre, cover_url, status, reviews) =>
  new Book(id, title, author, genre, cover_url, status, reviews);
export const Book$isBook = (value) => value instanceof Book;
export const Book$Book$id = (value) => value.id;
export const Book$Book$0 = (value) => value.id;
export const Book$Book$title = (value) => value.title;
export const Book$Book$1 = (value) => value.title;
export const Book$Book$author = (value) => value.author;
export const Book$Book$2 = (value) => value.author;
export const Book$Book$genre = (value) => value.genre;
export const Book$Book$3 = (value) => value.genre;
export const Book$Book$cover_url = (value) => value.cover_url;
export const Book$Book$4 = (value) => value.cover_url;
export const Book$Book$status = (value) => value.status;
export const Book$Book$5 = (value) => value.status;
export const Book$Book$reviews = (value) => value.reviews;
export const Book$Book$6 = (value) => value.reviews;

export class AuthResult extends $CustomType {
  constructor(token, username, role) {
    super();
    this.token = token;
    this.username = username;
    this.role = role;
  }
}
export const AuthResult$AuthResult = (token, username, role) =>
  new AuthResult(token, username, role);
export const AuthResult$isAuthResult = (value) => value instanceof AuthResult;
export const AuthResult$AuthResult$token = (value) => value.token;
export const AuthResult$AuthResult$0 = (value) => value.token;
export const AuthResult$AuthResult$username = (value) => value.username;
export const AuthResult$AuthResult$1 = (value) => value.username;
export const AuthResult$AuthResult$role = (value) => value.role;
export const AuthResult$AuthResult$2 = (value) => value.role;

export class LookupResult extends $CustomType {
  constructor(found, title, author, cover_url, publisher) {
    super();
    this.found = found;
    this.title = title;
    this.author = author;
    this.cover_url = cover_url;
    this.publisher = publisher;
  }
}
export const LookupResult$LookupResult = (found, title, author, cover_url, publisher) =>
  new LookupResult(found, title, author, cover_url, publisher);
export const LookupResult$isLookupResult = (value) =>
  value instanceof LookupResult;
export const LookupResult$LookupResult$found = (value) => value.found;
export const LookupResult$LookupResult$0 = (value) => value.found;
export const LookupResult$LookupResult$title = (value) => value.title;
export const LookupResult$LookupResult$1 = (value) => value.title;
export const LookupResult$LookupResult$author = (value) => value.author;
export const LookupResult$LookupResult$2 = (value) => value.author;
export const LookupResult$LookupResult$cover_url = (value) => value.cover_url;
export const LookupResult$LookupResult$3 = (value) => value.cover_url;
export const LookupResult$LookupResult$publisher = (value) => value.publisher;
export const LookupResult$LookupResult$4 = (value) => value.publisher;

export class AdminUser extends $CustomType {
  constructor(id, username, role, book_count) {
    super();
    this.id = id;
    this.username = username;
    this.role = role;
    this.book_count = book_count;
  }
}
export const AdminUser$AdminUser = (id, username, role, book_count) =>
  new AdminUser(id, username, role, book_count);
export const AdminUser$isAdminUser = (value) => value instanceof AdminUser;
export const AdminUser$AdminUser$id = (value) => value.id;
export const AdminUser$AdminUser$0 = (value) => value.id;
export const AdminUser$AdminUser$username = (value) => value.username;
export const AdminUser$AdminUser$1 = (value) => value.username;
export const AdminUser$AdminUser$role = (value) => value.role;
export const AdminUser$AdminUser$2 = (value) => value.role;
export const AdminUser$AdminUser$book_count = (value) => value.book_count;
export const AdminUser$AdminUser$3 = (value) => value.book_count;

export class AdminBook extends $CustomType {
  constructor(id, user_id, owner_username, title, author) {
    super();
    this.id = id;
    this.user_id = user_id;
    this.owner_username = owner_username;
    this.title = title;
    this.author = author;
  }
}
export const AdminBook$AdminBook = (id, user_id, owner_username, title, author) =>
  new AdminBook(id, user_id, owner_username, title, author);
export const AdminBook$isAdminBook = (value) => value instanceof AdminBook;
export const AdminBook$AdminBook$id = (value) => value.id;
export const AdminBook$AdminBook$0 = (value) => value.id;
export const AdminBook$AdminBook$user_id = (value) => value.user_id;
export const AdminBook$AdminBook$1 = (value) => value.user_id;
export const AdminBook$AdminBook$owner_username = (value) =>
  value.owner_username;
export const AdminBook$AdminBook$2 = (value) => value.owner_username;
export const AdminBook$AdminBook$title = (value) => value.title;
export const AdminBook$AdminBook$3 = (value) => value.title;
export const AdminBook$AdminBook$author = (value) => value.author;
export const AdminBook$AdminBook$4 = (value) => value.author;

export function status_to_string(status) {
  if (status instanceof Unread) {
    return "UNREAD";
  } else if (status instanceof Reading) {
    return "READING";
  } else {
    return "FINISHED";
  }
}

export function status_label(status) {
  if (status instanceof Unread) {
    return "未読";
  } else if (status instanceof Reading) {
    return "読書中";
  } else {
    return "読了";
  }
}

function status_from_string(str) {
  if (str === "READING") {
    return new Reading();
  } else if (str === "FINISHED") {
    return new Finished();
  } else {
    return new Unread();
  }
}

export function review_decoder() {
  return $decode.field(
    "id",
    $decode.int,
    (id) => {
      return $decode.field(
        "rating",
        $decode.int,
        (rating) => {
          return $decode.field(
            "comment",
            $decode.string,
            (comment) => {
              return $decode.field(
                "readDate",
                $decode.string,
                (read_date) => {
                  return $decode.success(
                    new Review(id, rating, comment, read_date),
                  );
                },
              );
            },
          );
        },
      );
    },
  );
}

export function book_decoder() {
  return $decode.field(
    "id",
    $decode.int,
    (id) => {
      return $decode.field(
        "title",
        $decode.string,
        (title) => {
          return $decode.field(
            "author",
            $decode.string,
            (author) => {
              return $decode.field(
                "genre",
                $decode.string,
                (genre) => {
                  return $decode.field(
                    "coverUrl",
                    $decode.optional($decode.string),
                    (cover_url) => {
                      return $decode.field(
                        "status",
                        $decode.string,
                        (status_str) => {
                          return $decode.field(
                            "reviews",
                            $decode.list(review_decoder()),
                            (reviews) => {
                              return $decode.success(
                                new Book(
                                  id,
                                  title,
                                  author,
                                  genre,
                                  cover_url,
                                  status_from_string(status_str),
                                  reviews,
                                ),
                              );
                            },
                          );
                        },
                      );
                    },
                  );
                },
              );
            },
          );
        },
      );
    },
  );
}

export function books_decoder() {
  return $decode.list(book_decoder());
}

export function share_uuid_decoder() {
  return $decode.field(
    "uuid",
    $decode.string,
    (uuid) => { return $decode.success(uuid); },
  );
}

export function auth_decoder() {
  return $decode.field(
    "token",
    $decode.string,
    (token) => {
      return $decode.field(
        "username",
        $decode.string,
        (username) => {
          return $decode.field(
            "role",
            $decode.string,
            (role) => {
              return $decode.success(new AuthResult(token, username, role));
            },
          );
        },
      );
    },
  );
}

export function lookup_decoder() {
  return $decode.field(
    "found",
    $decode.bool,
    (found) => {
      return $decode.field(
        "title",
        $decode.optional($decode.string),
        (title) => {
          return $decode.field(
            "author",
            $decode.optional($decode.string),
            (author) => {
              return $decode.field(
                "coverUrl",
                $decode.optional($decode.string),
                (cover_url) => {
                  return $decode.field(
                    "publisher",
                    $decode.optional($decode.string),
                    (publisher) => {
                      return $decode.success(
                        new LookupResult(
                          found,
                          title,
                          author,
                          cover_url,
                          publisher,
                        ),
                      );
                    },
                  );
                },
              );
            },
          );
        },
      );
    },
  );
}

export function admin_user_decoder() {
  return $decode.field(
    "id",
    $decode.int,
    (id) => {
      return $decode.field(
        "username",
        $decode.string,
        (username) => {
          return $decode.field(
            "role",
            $decode.string,
            (role) => {
              return $decode.field(
                "bookCount",
                $decode.int,
                (book_count) => {
                  return $decode.success(
                    new AdminUser(id, username, role, book_count),
                  );
                },
              );
            },
          );
        },
      );
    },
  );
}

export function admin_users_decoder() {
  return $decode.list(admin_user_decoder());
}

export function admin_book_decoder() {
  return $decode.field(
    "id",
    $decode.int,
    (id) => {
      return $decode.field(
        "userId",
        $decode.int,
        (user_id) => {
          return $decode.field(
            "ownerUsername",
            $decode.string,
            (owner_username) => {
              return $decode.field(
                "title",
                $decode.string,
                (title) => {
                  return $decode.field(
                    "author",
                    $decode.string,
                    (author) => {
                      return $decode.success(
                        new AdminBook(
                          id,
                          user_id,
                          owner_username,
                          title,
                          author,
                        ),
                      );
                    },
                  );
                },
              );
            },
          );
        },
      );
    },
  );
}

export function admin_books_decoder() {
  return $decode.list(admin_book_decoder());
}
