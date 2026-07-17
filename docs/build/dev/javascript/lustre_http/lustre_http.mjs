import * as $fetch from "../gleam_fetch/gleam/fetch.mjs";
import * as $http from "../gleam_http/gleam/http.mjs";
import * as $request from "../gleam_http/gleam/http/request.mjs";
import * as $response from "../gleam_http/gleam/http/response.mjs";
import { Response } from "../gleam_http/gleam/http/response.mjs";
import * as $promise from "../gleam_javascript/gleam/javascript/promise.mjs";
import * as $json from "../gleam_json/gleam/json.mjs";
import * as $decode from "../gleam_stdlib/gleam/dynamic/decode.mjs";
import * as $result from "../gleam_stdlib/gleam/result.mjs";
import * as $effect from "../lustre/lustre/effect.mjs";
import { Ok, Error, CustomType as $CustomType } from "./gleam.mjs";

/**
 * Both [`get`](#get) and [`post`](#post) let you pass the request URL as a
 * string. This error is returned if you pass in something that isn't a valid
 * URL.
 */
export class BadUrl extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const HttpError$BadUrl = ($0) => new BadUrl($0);
export const HttpError$isBadUrl = (value) => value instanceof BadUrl;
export const HttpError$BadUrl$0 = (value) => value[0];

/**
 * The server returned a 500 Internal Server Error. The body of the response
 * is included as a string.
 */
export class InternalServerError extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const HttpError$InternalServerError = ($0) =>
  new InternalServerError($0);
export const HttpError$isInternalServerError = (value) =>
  value instanceof InternalServerError;
export const HttpError$InternalServerError$0 = (value) => value[0];

/**
 * When you use [`expect_json`](#expect_json) to decode an incoming response,
 * this error is returned if the body is not valid JSON or the decoder fails.
 */
export class JsonError extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const HttpError$JsonError = ($0) => new JsonError($0);
export const HttpError$isJsonError = (value) => value instanceof JsonError;
export const HttpError$JsonError$0 = (value) => value[0];

/**
 * If you try and make a request while the client is offline, this error is
 * returned.
 */
export class NetworkError extends $CustomType {}
export const HttpError$NetworkError = () => new NetworkError();
export const HttpError$isNetworkError = (value) =>
  value instanceof NetworkError;

/**
 * The server returned a 404 Not Found error.
 */
export class NotFound extends $CustomType {}
export const HttpError$NotFound = () => new NotFound();
export const HttpError$isNotFound = (value) => value instanceof NotFound;

/**
 * Any other non-200 response from the server that is not 404, 401 or 500 will
 * be returned as this error. The status code and body of the response are
 * included.
 */
export class OtherError extends $CustomType {
  constructor($0, $1) {
    super();
    this[0] = $0;
    this[1] = $1;
  }
}
export const HttpError$OtherError = ($0, $1) => new OtherError($0, $1);
export const HttpError$isOtherError = (value) => value instanceof OtherError;
export const HttpError$OtherError$0 = (value) => value[0];
export const HttpError$OtherError$1 = (value) => value[1];

/**
 * The server returned a 401 Unauthorized error.
 */
export class Unauthorized extends $CustomType {}
export const HttpError$Unauthorized = () => new Unauthorized();
export const HttpError$isUnauthorized = (value) =>
  value instanceof Unauthorized;

class ExpectTextResponse extends $CustomType {
  constructor(run) {
    super();
    this.run = run;
  }
}

function do_send(req, expect, dispatch) {
  let _pipe = $fetch.send(req);
  let _pipe$1 = $promise.try_await(_pipe, $fetch.read_text_body);
  let _pipe$2 = $promise.map(
    _pipe$1,
    (response) => {
      if (response instanceof Ok) {
        let res = response[0];
        return expect.run(new Ok(res));
      } else {
        return expect.run(new Error(new NetworkError()));
      }
    },
  );
  let _pipe$3 = $promise.rescue(
    _pipe$2,
    (_) => { return expect.run(new Error(new NetworkError())); },
  );
  $promise.tap(_pipe$3, dispatch);
  return undefined;
}

/**
 * Send a GET request to the given URL and say what kind of response you're
 * expecting. If the url is invalid, the expect handler will receive a `BadUrl`
 * error.
 *
 * ### Usage
 *
 * ```gleam
 * import lustre_http as http
 *
 * type Msg {
 *   GotIpAddress(Result(String, http.HttpError))
 *   WhoAmI
 * }
 *
 * fn update(model, msg) {
 *   case msg {
 *     GotIpAddress(Ok(ip)) -> ...
 *     GotIpAddress(Error(err)) -> ...
 *     WhoAmI -> #(
 *       model,
 *       http.get("https://api.ipify.org", http.expect_text(GotIpAddress)
 *     )
 *   }
 * }
 * ```
 *
 * If you need tighter control over the request - e.g. to set headers - you can
 * construct the request manually using the [gleam_http](https://hexdocs.pm/gleam_http/gleam/http/request.html)
 * package and then use [`send`](#send) instead.
 */
export function get(url, expect) {
  return $effect.from(
    (dispatch) => {
      let $ = $request.to(url);
      if ($ instanceof Ok) {
        let req = $[0];
        return do_send(req, expect, dispatch);
      } else {
        return dispatch(expect.run(new Error(new BadUrl(url))));
      }
    },
  );
}

/**
 * Send a POST request to the given URL and say what kind of response you're
 * expecting. If the url is invalid, the expect handler will receive a `BadUrl`
 * error.
 *
 * ### Usage
 *
 * ```gleam
 * import lustre_http as http
 * import gleam/json.{type Json}
 *
 * type Msg {
 *   GotResponse(Result(Nil, http.HttpError))
 *   CreatePost(body: Json)
 * }
 *
 * fn update(model, msg) {
 *   case msg {
 *     GotResponse(Ok(_)) -> ...
 *     GotResponse(Error(err)) -> ...
 *     CreatePost(body) -> #(
 *       model,
 *       http.post(
 *         "https://jsonplaceholder.typicode.com/posts",
 *         body,
 *         http.expect_anything(GotResponse))
 *     )
 *   }
 * }
 * ```
 *
 * If you need tighter control over the request - e.g. to set headers - you can
 * construct the request manually using the [gleam_http](https://hexdocs.pm/gleam_http/gleam/http/request.html)
 * package and then use [`send`](#send) instead.
 */
export function post(url, body, expect) {
  return $effect.from(
    (dispatch) => {
      let $ = $request.to(url);
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
        return do_send(_pipe$3, expect, dispatch);
      } else {
        return dispatch(expect.run(new Error(new BadUrl(url))));
      }
    },
  );
}

/**
 * Send a [gleam_http `Request`](https://hexdocs.pm/gleam_http/gleam/http/request.html#Request)
 * along with what kind of response you're expecting to receive. Once the request
 * is complete, the response will be turned into a message you can handle in
 * your `update` function.
 *
 * If you just want to make a simple GET or POST request, you might find either
 * [`get`](#get) or [`post`](#post) easier to use!
 */
export function send(req, expect) {
  return $effect.from((_capture) => { return do_send(req, expect, _capture); });
}

function response_to_result(response) {
  let status = response.status;
  if ((200 <= status) && (status <= 299)) {
    let body = response.body;
    return new Ok(body);
  } else {
    let $ = response.status;
    if ($ === 401) {
      return new Error(new Unauthorized());
    } else if ($ === 404) {
      return new Error(new NotFound());
    } else if ($ === 500) {
      let body = response.body;
      return new Error(new InternalServerError(body));
    } else {
      let code = $;
      let body = response.body;
      return new Error(new OtherError(code, body));
    }
  }
}

/**
 * Expect any response. This is useful if you want to just fire off a request
 * and make sure it was successful. If you want to handle the response body in
 * some way, you should take a look at [`expect_text`](#expect_text) or
 * [`expect_json`](#expect_json) instead.
 */
export function expect_anything(to_msg) {
  return new ExpectTextResponse(
    (response) => {
      let _pipe = response;
      let _pipe$1 = $result.try$(_pipe, response_to_result);
      let _pipe$2 = $result.replace(_pipe$1, undefined);
      return to_msg(_pipe$2);
    },
  );
}

/**
 * Expect a plain text response.
 */
export function expect_text(to_msg) {
  return new ExpectTextResponse(
    (response) => {
      let _pipe = response;
      let _pipe$1 = $result.try$(_pipe, response_to_result);
      return to_msg(_pipe$1);
    },
  );
}

/**
 * Expect a JSON response. The decoder is used to decode the JSON into a
 * well-typed Gleam value. If this fails, the `JsonError` error variant will be
 * returned.
 *
 * ### Usage
 *
 * ```gleam
 * import lustre_http as http
 * import gleam/dynamic/decode
 *
 * type Post {
 *   Post(id: Int, title: String, body: String)
 * }
 *
 * type Msg {
 *   GotPosts(Result(List(Post), http.HttpError))
 * }
 *
 * fn get_posts() -> Effect(msg) {
 *   let url = "https://jsonplaceholder.typicode.com/posts"
 *   let decoder = {
 *     use id <- decode.field("id", decode.int)
 *     use title <- decode.field("title", decode.string)
 *     use body <- decode.field("body", decode.string)
 *     decode.success(Post(id, title, body))
 *   }
 *
 *   http.get(url, http.expect_json(decode.list(decoder), GotPosts))
 * }
 * ```
 */
export function expect_json(decoder, to_msg) {
  return new ExpectTextResponse(
    (response) => {
      let _pipe = response;
      let _pipe$1 = $result.try$(_pipe, response_to_result);
      let _pipe$2 = $result.try$(
        _pipe$1,
        (body) => {
          let $ = $json.parse(body, decoder);
          if ($ instanceof Ok) {
            return $;
          } else {
            let json_error = $[0];
            return new Error(new JsonError(json_error));
          }
        },
      );
      return to_msg(_pipe$2);
    },
  );
}

/**
 * Expect a [gleam_http `Response`](https://hexdocs.pm/gleam_http/gleam/http/response.html#Response)
 * and handle it yourself. This is necessary if you want to handle specific
 * HTTP status codes or read the response headers.
 */
export function expect_text_response(on_response, on_failure, to_msg) {
  return new ExpectTextResponse(
    (response) => {
      if (response instanceof Ok) {
        let response$1 = response[0];
        return to_msg(on_response(response$1));
      } else {
        let error = response[0];
        return to_msg(new Error(on_failure(error)));
      }
    },
  );
}
