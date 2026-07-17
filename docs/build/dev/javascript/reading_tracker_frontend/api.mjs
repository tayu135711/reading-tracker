import * as $http from "../gleam_http/gleam/http.mjs";
import * as $request from "../gleam_http/gleam/http/request.mjs";
import * as $json from "../gleam_json/gleam/json.mjs";
import * as $int from "../gleam_stdlib/gleam/int.mjs";
import * as $effect from "../lustre/lustre/effect.mjs";
import * as $lustre_http from "../lustre_http/lustre_http.mjs";
import { Ok, toList } from "./gleam.mjs";
import * as $types from "./types.mjs";
import {
  admin_books_decoder,
  admin_users_decoder,
  auth_decoder,
  books_decoder,
  lookup_decoder,
  share_uuid_decoder,
} from "./types.mjs";

const api_base = "https://reading-tracker-backend-wc3c.onrender.com/api";

export function register(username, password, on_result) {
  let body = $json.object(
    toList([
      ["username", $json.string(username)],
      ["password", $json.string(password)],
    ]),
  );
  return $lustre_http.post(
    api_base + "/auth/register",
    body,
    $lustre_http.expect_json(auth_decoder(), on_result),
  );
}

export function login(username, password, on_result) {
  let body = $json.object(
    toList([
      ["username", $json.string(username)],
      ["password", $json.string(password)],
    ]),
  );
  return $lustre_http.post(
    api_base + "/auth/login",
    body,
    $lustre_http.expect_json(auth_decoder(), on_result),
  );
}

function authed_send(token, req, expect) {
  let _pipe = req;
  let _pipe$1 = $request.set_header(_pipe, "Authorization", "Bearer " + token);
  return $lustre_http.send(_pipe$1, expect);
}

export function fetch_books(token, on_result) {
  let $ = $request.to(api_base + "/books");
  if ($ instanceof Ok) {
    let req = $[0];
    return authed_send(
      token,
      req,
      $lustre_http.expect_json(books_decoder(), on_result),
    );
  } else {
    return $effect.none();
  }
}

export function create_book(token, title, author, genre, cover_url, on_result) {
  let _block;
  if (cover_url === "") {
    _block = $json.null$();
  } else {
    let url = cover_url;
    _block = $json.string(url);
  }
  let cover_json = _block;
  let body = $json.object(
    toList([
      ["title", $json.string(title)],
      ["author", $json.string(author)],
      ["genre", $json.string(genre)],
      ["coverUrl", cover_json],
      ["status", $json.string("UNREAD")],
    ]),
  );
  let $ = $request.to(api_base + "/books");
  if ($ instanceof Ok) {
    let req = $[0];
    let _pipe = req;
    let _pipe$1 = $request.set_method(_pipe, new $http.Post());
    let _pipe$2 = $request.set_header(
      _pipe$1,
      "Content-Type",
      "application/json",
    );
    let _pipe$3 = $request.set_body(_pipe$2, $json.to_string(body));
    return ((_capture) => {
      return authed_send(
        token,
        _capture,
        $lustre_http.expect_anything(on_result),
      );
    })(_pipe$3);
  } else {
    return $effect.none();
  }
}

export function add_review(token, book_id, rating, comment, on_result) {
  let body = $json.object(
    toList([["rating", $json.int(rating)], ["comment", $json.string(comment)]]),
  );
  let $ = $request.to(
    ((api_base + "/books/") + $int.to_string(book_id)) + "/reviews",
  );
  if ($ instanceof Ok) {
    let req = $[0];
    let _pipe = req;
    let _pipe$1 = $request.set_method(_pipe, new $http.Post());
    let _pipe$2 = $request.set_header(
      _pipe$1,
      "Content-Type",
      "application/json",
    );
    let _pipe$3 = $request.set_body(_pipe$2, $json.to_string(body));
    return ((_capture) => {
      return authed_send(
        token,
        _capture,
        $lustre_http.expect_anything(on_result),
      );
    })(_pipe$3);
  } else {
    return $effect.none();
  }
}

export function create_share_link(token, book_id, on_result) {
  let $ = $request.to(
    ((api_base + "/books/") + $int.to_string(book_id)) + "/share",
  );
  if ($ instanceof Ok) {
    let req = $[0];
    let _pipe = req;
    let _pipe$1 = $request.set_method(_pipe, new $http.Post());
    let _pipe$2 = $request.set_header(
      _pipe$1,
      "Content-Type",
      "application/json",
    );
    let _pipe$3 = $request.set_body(_pipe$2, "{}");
    return ((_capture) => {
      return authed_send(
        token,
        _capture,
        $lustre_http.expect_json(share_uuid_decoder(), on_result),
      );
    })(_pipe$3);
  } else {
    return $effect.none();
  }
}

export function lookup_isbn(token, isbn, on_result) {
  let $ = $request.to((api_base + "/books/lookup?isbn=") + isbn);
  if ($ instanceof Ok) {
    let req = $[0];
    return authed_send(
      token,
      req,
      $lustre_http.expect_json(lookup_decoder(), on_result),
    );
  } else {
    return $effect.none();
  }
}

export function fetch_admin_users(token, on_result) {
  let $ = $request.to(api_base + "/admin/users");
  if ($ instanceof Ok) {
    let req = $[0];
    return authed_send(
      token,
      req,
      $lustre_http.expect_json(admin_users_decoder(), on_result),
    );
  } else {
    return $effect.none();
  }
}

export function delete_admin_user(token, id, on_result) {
  let $ = $request.to((api_base + "/admin/users/") + $int.to_string(id));
  if ($ instanceof Ok) {
    let req = $[0];
    let _pipe = req;
    let _pipe$1 = $request.set_method(_pipe, new $http.Delete());
    return ((_capture) => {
      return authed_send(
        token,
        _capture,
        $lustre_http.expect_anything(on_result),
      );
    })(_pipe$1);
  } else {
    return $effect.none();
  }
}

export function fetch_admin_books(token, on_result) {
  let $ = $request.to(api_base + "/admin/books");
  if ($ instanceof Ok) {
    let req = $[0];
    return authed_send(
      token,
      req,
      $lustre_http.expect_json(admin_books_decoder(), on_result),
    );
  } else {
    return $effect.none();
  }
}

export function delete_admin_book(token, id, on_result) {
  let $ = $request.to((api_base + "/admin/books/") + $int.to_string(id));
  if ($ instanceof Ok) {
    let req = $[0];
    let _pipe = req;
    let _pipe$1 = $request.set_method(_pipe, new $http.Delete());
    return ((_capture) => {
      return authed_send(
        token,
        _capture,
        $lustre_http.expect_anything(on_result),
      );
    })(_pipe$1);
  } else {
    return $effect.none();
  }
}
