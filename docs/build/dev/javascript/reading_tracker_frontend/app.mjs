import * as $int from "../gleam_stdlib/gleam/int.mjs";
import * as $list from "../gleam_stdlib/gleam/list.mjs";
import * as $option from "../gleam_stdlib/gleam/option.mjs";
import { None, Some } from "../gleam_stdlib/gleam/option.mjs";
import * as $lustre from "../lustre/lustre.mjs";
import * as $attribute from "../lustre/lustre/attribute.mjs";
import * as $effect from "../lustre/lustre/effect.mjs";
import * as $element from "../lustre/lustre/element.mjs";
import * as $html from "../lustre/lustre/element/html.mjs";
import * as $event from "../lustre/lustre/event.mjs";
import * as $lustre_http from "../lustre_http/lustre_http.mjs";
import * as $api from "./api.mjs";
import {
  Ok,
  toList,
  Empty as $Empty,
  CustomType as $CustomType,
  makeError,
  remainderInt,
  isEqual,
} from "./gleam.mjs";
import * as $types from "./types.mjs";
import { status_label } from "./types.mjs";

const FILEPATH = "src\\app.gleam";

export class LoginMode extends $CustomType {}
export const AuthMode$LoginMode = () => new LoginMode();
export const AuthMode$isLoginMode = (value) => value instanceof LoginMode;

export class RegisterMode extends $CustomType {}
export const AuthMode$RegisterMode = () => new RegisterMode();
export const AuthMode$isRegisterMode = (value) => value instanceof RegisterMode;

export class LibraryView extends $CustomType {}
export const ViewMode$LibraryView = () => new LibraryView();
export const ViewMode$isLibraryView = (value) => value instanceof LibraryView;

export class RecordsRoomView extends $CustomType {}
export const ViewMode$RecordsRoomView = () => new RecordsRoomView();
export const ViewMode$isRecordsRoomView = (value) =>
  value instanceof RecordsRoomView;

export class Model extends $CustomType {
  constructor(token, username, role, auth_mode, auth_username_input, auth_password_input, auth_error, auth_loading, view_mode, books, loading, error, expanded_book, show_manual_form, new_title, new_author, new_genre, isbn_input, lookup_result, lookup_loading, lookup_error, review_target, review_rating, review_comment, share_link, admin_users, admin_books, admin_loading, admin_error, confirm_delete_user, confirm_delete_book) {
    super();
    this.token = token;
    this.username = username;
    this.role = role;
    this.auth_mode = auth_mode;
    this.auth_username_input = auth_username_input;
    this.auth_password_input = auth_password_input;
    this.auth_error = auth_error;
    this.auth_loading = auth_loading;
    this.view_mode = view_mode;
    this.books = books;
    this.loading = loading;
    this.error = error;
    this.expanded_book = expanded_book;
    this.show_manual_form = show_manual_form;
    this.new_title = new_title;
    this.new_author = new_author;
    this.new_genre = new_genre;
    this.isbn_input = isbn_input;
    this.lookup_result = lookup_result;
    this.lookup_loading = lookup_loading;
    this.lookup_error = lookup_error;
    this.review_target = review_target;
    this.review_rating = review_rating;
    this.review_comment = review_comment;
    this.share_link = share_link;
    this.admin_users = admin_users;
    this.admin_books = admin_books;
    this.admin_loading = admin_loading;
    this.admin_error = admin_error;
    this.confirm_delete_user = confirm_delete_user;
    this.confirm_delete_book = confirm_delete_book;
  }
}
export const Model$Model = (token, username, role, auth_mode, auth_username_input, auth_password_input, auth_error, auth_loading, view_mode, books, loading, error, expanded_book, show_manual_form, new_title, new_author, new_genre, isbn_input, lookup_result, lookup_loading, lookup_error, review_target, review_rating, review_comment, share_link, admin_users, admin_books, admin_loading, admin_error, confirm_delete_user, confirm_delete_book) =>
  new Model(token,
  username,
  role,
  auth_mode,
  auth_username_input,
  auth_password_input,
  auth_error,
  auth_loading,
  view_mode,
  books,
  loading,
  error,
  expanded_book,
  show_manual_form,
  new_title,
  new_author,
  new_genre,
  isbn_input,
  lookup_result,
  lookup_loading,
  lookup_error,
  review_target,
  review_rating,
  review_comment,
  share_link,
  admin_users,
  admin_books,
  admin_loading,
  admin_error,
  confirm_delete_user,
  confirm_delete_book);
export const Model$isModel = (value) => value instanceof Model;
export const Model$Model$token = (value) => value.token;
export const Model$Model$0 = (value) => value.token;
export const Model$Model$username = (value) => value.username;
export const Model$Model$1 = (value) => value.username;
export const Model$Model$role = (value) => value.role;
export const Model$Model$2 = (value) => value.role;
export const Model$Model$auth_mode = (value) => value.auth_mode;
export const Model$Model$3 = (value) => value.auth_mode;
export const Model$Model$auth_username_input = (value) =>
  value.auth_username_input;
export const Model$Model$4 = (value) => value.auth_username_input;
export const Model$Model$auth_password_input = (value) =>
  value.auth_password_input;
export const Model$Model$5 = (value) => value.auth_password_input;
export const Model$Model$auth_error = (value) => value.auth_error;
export const Model$Model$6 = (value) => value.auth_error;
export const Model$Model$auth_loading = (value) => value.auth_loading;
export const Model$Model$7 = (value) => value.auth_loading;
export const Model$Model$view_mode = (value) => value.view_mode;
export const Model$Model$8 = (value) => value.view_mode;
export const Model$Model$books = (value) => value.books;
export const Model$Model$9 = (value) => value.books;
export const Model$Model$loading = (value) => value.loading;
export const Model$Model$10 = (value) => value.loading;
export const Model$Model$error = (value) => value.error;
export const Model$Model$11 = (value) => value.error;
export const Model$Model$expanded_book = (value) => value.expanded_book;
export const Model$Model$12 = (value) => value.expanded_book;
export const Model$Model$show_manual_form = (value) => value.show_manual_form;
export const Model$Model$13 = (value) => value.show_manual_form;
export const Model$Model$new_title = (value) => value.new_title;
export const Model$Model$14 = (value) => value.new_title;
export const Model$Model$new_author = (value) => value.new_author;
export const Model$Model$15 = (value) => value.new_author;
export const Model$Model$new_genre = (value) => value.new_genre;
export const Model$Model$16 = (value) => value.new_genre;
export const Model$Model$isbn_input = (value) => value.isbn_input;
export const Model$Model$17 = (value) => value.isbn_input;
export const Model$Model$lookup_result = (value) => value.lookup_result;
export const Model$Model$18 = (value) => value.lookup_result;
export const Model$Model$lookup_loading = (value) => value.lookup_loading;
export const Model$Model$19 = (value) => value.lookup_loading;
export const Model$Model$lookup_error = (value) => value.lookup_error;
export const Model$Model$20 = (value) => value.lookup_error;
export const Model$Model$review_target = (value) => value.review_target;
export const Model$Model$21 = (value) => value.review_target;
export const Model$Model$review_rating = (value) => value.review_rating;
export const Model$Model$22 = (value) => value.review_rating;
export const Model$Model$review_comment = (value) => value.review_comment;
export const Model$Model$23 = (value) => value.review_comment;
export const Model$Model$share_link = (value) => value.share_link;
export const Model$Model$24 = (value) => value.share_link;
export const Model$Model$admin_users = (value) => value.admin_users;
export const Model$Model$25 = (value) => value.admin_users;
export const Model$Model$admin_books = (value) => value.admin_books;
export const Model$Model$26 = (value) => value.admin_books;
export const Model$Model$admin_loading = (value) => value.admin_loading;
export const Model$Model$27 = (value) => value.admin_loading;
export const Model$Model$admin_error = (value) => value.admin_error;
export const Model$Model$28 = (value) => value.admin_error;
export const Model$Model$confirm_delete_user = (value) =>
  value.confirm_delete_user;
export const Model$Model$29 = (value) => value.confirm_delete_user;
export const Model$Model$confirm_delete_book = (value) =>
  value.confirm_delete_book;
export const Model$Model$30 = (value) => value.confirm_delete_book;

export class UserUpdatedAuthUsername extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const Msg$UserUpdatedAuthUsername = ($0) =>
  new UserUpdatedAuthUsername($0);
export const Msg$isUserUpdatedAuthUsername = (value) =>
  value instanceof UserUpdatedAuthUsername;
export const Msg$UserUpdatedAuthUsername$0 = (value) => value[0];

export class UserUpdatedAuthPassword extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const Msg$UserUpdatedAuthPassword = ($0) =>
  new UserUpdatedAuthPassword($0);
export const Msg$isUserUpdatedAuthPassword = (value) =>
  value instanceof UserUpdatedAuthPassword;
export const Msg$UserUpdatedAuthPassword$0 = (value) => value[0];

export class UserToggledAuthMode extends $CustomType {}
export const Msg$UserToggledAuthMode = () => new UserToggledAuthMode();
export const Msg$isUserToggledAuthMode = (value) =>
  value instanceof UserToggledAuthMode;

export class UserSubmittedAuth extends $CustomType {}
export const Msg$UserSubmittedAuth = () => new UserSubmittedAuth();
export const Msg$isUserSubmittedAuth = (value) =>
  value instanceof UserSubmittedAuth;

export class ApiAuthReturned extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const Msg$ApiAuthReturned = ($0) => new ApiAuthReturned($0);
export const Msg$isApiAuthReturned = (value) =>
  value instanceof ApiAuthReturned;
export const Msg$ApiAuthReturned$0 = (value) => value[0];

export class UserLoggedOut extends $CustomType {}
export const Msg$UserLoggedOut = () => new UserLoggedOut();
export const Msg$isUserLoggedOut = (value) => value instanceof UserLoggedOut;

export class ApiReturnedBooks extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const Msg$ApiReturnedBooks = ($0) => new ApiReturnedBooks($0);
export const Msg$isApiReturnedBooks = (value) =>
  value instanceof ApiReturnedBooks;
export const Msg$ApiReturnedBooks$0 = (value) => value[0];

export class UserToggledBookSpine extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const Msg$UserToggledBookSpine = ($0) => new UserToggledBookSpine($0);
export const Msg$isUserToggledBookSpine = (value) =>
  value instanceof UserToggledBookSpine;
export const Msg$UserToggledBookSpine$0 = (value) => value[0];

export class UserToggledManualForm extends $CustomType {}
export const Msg$UserToggledManualForm = () => new UserToggledManualForm();
export const Msg$isUserToggledManualForm = (value) =>
  value instanceof UserToggledManualForm;

export class UserUpdatedTitle extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const Msg$UserUpdatedTitle = ($0) => new UserUpdatedTitle($0);
export const Msg$isUserUpdatedTitle = (value) =>
  value instanceof UserUpdatedTitle;
export const Msg$UserUpdatedTitle$0 = (value) => value[0];

export class UserUpdatedAuthor extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const Msg$UserUpdatedAuthor = ($0) => new UserUpdatedAuthor($0);
export const Msg$isUserUpdatedAuthor = (value) =>
  value instanceof UserUpdatedAuthor;
export const Msg$UserUpdatedAuthor$0 = (value) => value[0];

export class UserUpdatedGenre extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const Msg$UserUpdatedGenre = ($0) => new UserUpdatedGenre($0);
export const Msg$isUserUpdatedGenre = (value) =>
  value instanceof UserUpdatedGenre;
export const Msg$UserUpdatedGenre$0 = (value) => value[0];

export class UserSubmittedBook extends $CustomType {}
export const Msg$UserSubmittedBook = () => new UserSubmittedBook();
export const Msg$isUserSubmittedBook = (value) =>
  value instanceof UserSubmittedBook;

export class ApiBookCreated extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const Msg$ApiBookCreated = ($0) => new ApiBookCreated($0);
export const Msg$isApiBookCreated = (value) => value instanceof ApiBookCreated;
export const Msg$ApiBookCreated$0 = (value) => value[0];

export class UserUpdatedIsbn extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const Msg$UserUpdatedIsbn = ($0) => new UserUpdatedIsbn($0);
export const Msg$isUserUpdatedIsbn = (value) =>
  value instanceof UserUpdatedIsbn;
export const Msg$UserUpdatedIsbn$0 = (value) => value[0];

export class UserSubmittedIsbnLookup extends $CustomType {}
export const Msg$UserSubmittedIsbnLookup = () => new UserSubmittedIsbnLookup();
export const Msg$isUserSubmittedIsbnLookup = (value) =>
  value instanceof UserSubmittedIsbnLookup;

export class ApiLookupReturned extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const Msg$ApiLookupReturned = ($0) => new ApiLookupReturned($0);
export const Msg$isApiLookupReturned = (value) =>
  value instanceof ApiLookupReturned;
export const Msg$ApiLookupReturned$0 = (value) => value[0];

export class UserRegisteredLookedUpBook extends $CustomType {}
export const Msg$UserRegisteredLookedUpBook = () =>
  new UserRegisteredLookedUpBook();
export const Msg$isUserRegisteredLookedUpBook = (value) =>
  value instanceof UserRegisteredLookedUpBook;

export class UserOpenedReviewForm extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const Msg$UserOpenedReviewForm = ($0) => new UserOpenedReviewForm($0);
export const Msg$isUserOpenedReviewForm = (value) =>
  value instanceof UserOpenedReviewForm;
export const Msg$UserOpenedReviewForm$0 = (value) => value[0];

export class UserUpdatedRating extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const Msg$UserUpdatedRating = ($0) => new UserUpdatedRating($0);
export const Msg$isUserUpdatedRating = (value) =>
  value instanceof UserUpdatedRating;
export const Msg$UserUpdatedRating$0 = (value) => value[0];

export class UserUpdatedComment extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const Msg$UserUpdatedComment = ($0) => new UserUpdatedComment($0);
export const Msg$isUserUpdatedComment = (value) =>
  value instanceof UserUpdatedComment;
export const Msg$UserUpdatedComment$0 = (value) => value[0];

export class UserSubmittedReview extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const Msg$UserSubmittedReview = ($0) => new UserSubmittedReview($0);
export const Msg$isUserSubmittedReview = (value) =>
  value instanceof UserSubmittedReview;
export const Msg$UserSubmittedReview$0 = (value) => value[0];

export class ApiReviewAdded extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const Msg$ApiReviewAdded = ($0) => new ApiReviewAdded($0);
export const Msg$isApiReviewAdded = (value) => value instanceof ApiReviewAdded;
export const Msg$ApiReviewAdded$0 = (value) => value[0];

export class UserRequestedShareLink extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const Msg$UserRequestedShareLink = ($0) =>
  new UserRequestedShareLink($0);
export const Msg$isUserRequestedShareLink = (value) =>
  value instanceof UserRequestedShareLink;
export const Msg$UserRequestedShareLink$0 = (value) => value[0];

export class ApiShareLinkCreated extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const Msg$ApiShareLinkCreated = ($0) => new ApiShareLinkCreated($0);
export const Msg$isApiShareLinkCreated = (value) =>
  value instanceof ApiShareLinkCreated;
export const Msg$ApiShareLinkCreated$0 = (value) => value[0];

export class UserOpenedRecordsRoom extends $CustomType {}
export const Msg$UserOpenedRecordsRoom = () => new UserOpenedRecordsRoom();
export const Msg$isUserOpenedRecordsRoom = (value) =>
  value instanceof UserOpenedRecordsRoom;

export class UserClosedRecordsRoom extends $CustomType {}
export const Msg$UserClosedRecordsRoom = () => new UserClosedRecordsRoom();
export const Msg$isUserClosedRecordsRoom = (value) =>
  value instanceof UserClosedRecordsRoom;

export class ApiAdminUsersReturned extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const Msg$ApiAdminUsersReturned = ($0) => new ApiAdminUsersReturned($0);
export const Msg$isApiAdminUsersReturned = (value) =>
  value instanceof ApiAdminUsersReturned;
export const Msg$ApiAdminUsersReturned$0 = (value) => value[0];

export class ApiAdminBooksReturned extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const Msg$ApiAdminBooksReturned = ($0) => new ApiAdminBooksReturned($0);
export const Msg$isApiAdminBooksReturned = (value) =>
  value instanceof ApiAdminBooksReturned;
export const Msg$ApiAdminBooksReturned$0 = (value) => value[0];

export class UserRequestedDeleteUser extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const Msg$UserRequestedDeleteUser = ($0) =>
  new UserRequestedDeleteUser($0);
export const Msg$isUserRequestedDeleteUser = (value) =>
  value instanceof UserRequestedDeleteUser;
export const Msg$UserRequestedDeleteUser$0 = (value) => value[0];

export class UserConfirmedDeleteUser extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const Msg$UserConfirmedDeleteUser = ($0) =>
  new UserConfirmedDeleteUser($0);
export const Msg$isUserConfirmedDeleteUser = (value) =>
  value instanceof UserConfirmedDeleteUser;
export const Msg$UserConfirmedDeleteUser$0 = (value) => value[0];

export class ApiUserDeleted extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const Msg$ApiUserDeleted = ($0) => new ApiUserDeleted($0);
export const Msg$isApiUserDeleted = (value) => value instanceof ApiUserDeleted;
export const Msg$ApiUserDeleted$0 = (value) => value[0];

export class UserRequestedDeleteBook extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const Msg$UserRequestedDeleteBook = ($0) =>
  new UserRequestedDeleteBook($0);
export const Msg$isUserRequestedDeleteBook = (value) =>
  value instanceof UserRequestedDeleteBook;
export const Msg$UserRequestedDeleteBook$0 = (value) => value[0];

export class UserConfirmedDeleteBook extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const Msg$UserConfirmedDeleteBook = ($0) =>
  new UserConfirmedDeleteBook($0);
export const Msg$isUserConfirmedDeleteBook = (value) =>
  value instanceof UserConfirmedDeleteBook;
export const Msg$UserConfirmedDeleteBook$0 = (value) => value[0];

export class ApiAdminBookDeleted extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const Msg$ApiAdminBookDeleted = ($0) => new ApiAdminBookDeleted($0);
export const Msg$isApiAdminBookDeleted = (value) =>
  value instanceof ApiAdminBookDeleted;
export const Msg$ApiAdminBookDeleted$0 = (value) => value[0];

export class UserCancelledAdminDelete extends $CustomType {}
export const Msg$UserCancelledAdminDelete = () =>
  new UserCancelledAdminDelete();
export const Msg$isUserCancelledAdminDelete = (value) =>
  value instanceof UserCancelledAdminDelete;

const spine_colors = /* @__PURE__ */ toList([
  "#6B3226",
  "#4A5D43",
  "#3A4A63",
  "#5C4A2E",
  "#5A3B5C",
]);

function view_admin_book_row(book, model) {
  return $html.div(
    toList([$attribute.class$("records-row")]),
    toList([
      $html.div(
        toList([$attribute.class$("records-cell records-cell-name")]),
        toList([$element.text(book.title)]),
      ),
      $html.div(
        toList([$attribute.class$("records-cell")]),
        toList([
          $element.text(((book.author + "(") + book.owner_username) + "の棚)"),
        ]),
      ),
      $html.div(
        toList([$attribute.class$("records-cell records-cell-action")]),
        toList([
          (() => {
            let $ = isEqual(model.confirm_delete_book, new Some(book.id));
            if ($) {
              return $html.span(
                toList([]),
                toList([
                  $html.button(
                    toList([
                      $attribute.class$("danger-button small"),
                      $event.on_click(new UserConfirmedDeleteBook(book.id)),
                    ]),
                    toList([$element.text("本当に処分する")]),
                  ),
                  $html.button(
                    toList([
                      $attribute.class$("quiet-link"),
                      $event.on_click(new UserCancelledAdminDelete()),
                    ]),
                    toList([$element.text("やめとく")]),
                  ),
                ]),
              );
            } else {
              return $html.button(
                toList([
                  $attribute.class$("quiet-link"),
                  $event.on_click(new UserRequestedDeleteBook(book.id)),
                ]),
                toList([$element.text("処分する")]),
              );
            }
          })(),
        ]),
      ),
    ]),
  );
}

function view_admin_books_section(model) {
  return $html.div(
    toList([$attribute.class$("brass-panel")]),
    toList([
      $html.p(
        toList([$attribute.class$("panel-label")]),
        toList([$element.text("すべての蔵書")]),
      ),
      $html.div(
        toList([$attribute.class$("records-table")]),
        $list.map(
          model.admin_books,
          (_capture) => { return view_admin_book_row(_capture, model); },
        ),
      ),
    ]),
  );
}

function view_admin_user_row(user, model) {
  return $html.div(
    toList([$attribute.class$("records-row")]),
    toList([
      $html.div(
        toList([$attribute.class$("records-cell records-cell-name")]),
        toList([
          $element.text(user.username),
          (() => {
            let $ = user.role;
            if ($ === "ADMIN") {
              return $html.span(
                toList([$attribute.class$("admin-badge")]),
                toList([$element.text("管理者")]),
              );
            } else {
              return $element.none();
            }
          })(),
        ]),
      ),
      $html.div(
        toList([$attribute.class$("records-cell")]),
        toList([$element.text($int.to_string(user.book_count) + " 冊")]),
      ),
      $html.div(
        toList([$attribute.class$("records-cell records-cell-action")]),
        toList([
          (() => {
            let $ = user.role;
            let $1 = isEqual(model.confirm_delete_user, new Some(user.id));
            if ($ === "ADMIN") {
              return $element.none();
            } else if ($1) {
              return $html.span(
                toList([]),
                toList([
                  $html.button(
                    toList([
                      $attribute.class$("danger-button small"),
                      $event.on_click(new UserConfirmedDeleteUser(user.id)),
                    ]),
                    toList([$element.text("本当に除籍する")]),
                  ),
                  $html.button(
                    toList([
                      $attribute.class$("quiet-link"),
                      $event.on_click(new UserCancelledAdminDelete()),
                    ]),
                    toList([$element.text("やめとく")]),
                  ),
                ]),
              );
            } else {
              return $html.button(
                toList([
                  $attribute.class$("quiet-link"),
                  $event.on_click(new UserRequestedDeleteUser(user.id)),
                ]),
                toList([$element.text("除籍する")]),
              );
            }
          })(),
        ]),
      ),
    ]),
  );
}

function view_admin_users_section(model) {
  return $html.div(
    toList([$attribute.class$("brass-panel")]),
    toList([
      $html.p(
        toList([$attribute.class$("panel-label")]),
        toList([$element.text("在籍する者たち")]),
      ),
      $html.div(
        toList([$attribute.class$("records-table")]),
        $list.map(
          model.admin_users,
          (_capture) => { return view_admin_user_row(_capture, model); },
        ),
      ),
    ]),
  );
}

function view_records_room(model) {
  return $html.div(
    toList([$attribute.class$("study-room records-room")]),
    toList([
      $html.header(
        toList([$attribute.class$("study-header")]),
        toList([
          $html.div(
            toList([]),
            toList([
              $html.p(
                toList([$attribute.class$("eyebrow")]),
                toList([$element.text("管理区画")]),
              ),
              $html.h1(
                toList([$attribute.class$("study-title")]),
                toList([$element.text("記録の間")]),
              ),
            ]),
          ),
          $html.button(
            toList([
              $attribute.class$("quiet-link"),
              $event.on_click(new UserClosedRecordsRoom()),
            ]),
            toList([$element.text("書斎へ戻る")]),
          ),
        ]),
      ),
      (() => {
        let $ = model.admin_error;
        if ($ instanceof Some) {
          let msg = $[0];
          return $html.p(
            toList([$attribute.class$("error-plate")]),
            toList([$element.text(msg)]),
          );
        } else {
          return $element.none();
        }
      })(),
      (() => {
        let $ = model.admin_loading;
        if ($) {
          return $html.p(
            toList([$attribute.class$("candle-loading")]),
            toList([$element.text("記録を紐解いとる...")]),
          );
        } else {
          return $html.div(
            toList([]),
            toList([
              view_admin_users_section(model),
              view_admin_books_section(model),
            ]),
          );
        }
      })(),
    ]),
  );
}

function parse_int_or(value, default$) {
  let $ = $int.parse(value);
  if ($ instanceof Ok) {
    let n = $[0];
    return n;
  } else {
    return default$;
  }
}

function view_review_form(book_id, model) {
  return $html.div(
    toList([$attribute.class$("ledger-field")]),
    toList([
      $html.label(toList([]), toList([$element.text("評価(1〜5)")])),
      $html.input(
        toList([
          $attribute.type_("number"),
          $attribute.value($int.to_string(model.review_rating)),
          $event.on_input(
            (v) => { return new UserUpdatedRating(parse_int_or(v, 5)); },
          ),
        ]),
      ),
      $html.textarea(
        toList([
          $event.on_input((var0) => { return new UserUpdatedComment(var0); }),
          $attribute.placeholder("読んだ感想を書き残す"),
        ]),
        model.review_comment,
      ),
      $html.button(
        toList([
          $attribute.class$("brass-button small"),
          $event.on_click(new UserSubmittedReview(book_id)),
        ]),
        toList([$element.text("記す")]),
      ),
    ]),
  );
}

function stars(rating) {
  if (rating === 1) {
    return "★";
  } else if (rating === 2) {
    return "★★";
  } else if (rating === 3) {
    return "★★★";
  } else if (rating === 4) {
    return "★★★★";
  } else if (rating === 5) {
    return "★★★★★";
  } else {
    return "★★★★★";
  }
}

function view_review(review) {
  return $html.p(
    toList([$attribute.class$("review-line")]),
    toList([$element.text((stars(review.rating) + "  ") + review.comment)]),
  );
}

function view_book_detail(book, model) {
  return $html.div(
    toList([$attribute.class$("book-detail")]),
    toList([
      (() => {
        let $ = book.cover_url;
        if ($ instanceof Some) {
          let url = $[0];
          return $html.img(
            toList([$attribute.src(url), $attribute.class$("detail-cover")]),
          );
        } else {
          return $element.none();
        }
      })(),
      $html.div(
        toList([]),
        toList([
          $html.h2(
            toList([$attribute.class$("detail-title")]),
            toList([$element.text(book.title)]),
          ),
          $html.p(
            toList([$attribute.class$("detail-meta")]),
            toList([$element.text((book.author + " ・ ") + book.genre)]),
          ),
          $html.div(
            toList([$attribute.class$("review-list")]),
            $list.map(book.reviews, view_review),
          ),
          $html.div(
            toList([$attribute.class$("detail-actions")]),
            toList([
              $html.button(
                toList([
                  $attribute.class$("brass-button small"),
                  $event.on_click(new UserOpenedReviewForm(book.id)),
                ]),
                toList([$element.text("感想を記す")]),
              ),
              $html.button(
                toList([
                  $attribute.class$("brass-button small"),
                  $event.on_click(new UserRequestedShareLink(book.id)),
                ]),
                toList([$element.text("誰かに薦める")]),
              ),
            ]),
          ),
          (() => {
            let $ = isEqual(model.review_target, new Some(book.id));
            if ($) {
              return view_review_form(book.id, model);
            } else {
              return $element.none();
            }
          })(),
          (() => {
            let $ = model.share_link;
            if ($ instanceof Some) {
              let uuid = $[0];
              return $html.p(
                toList([$attribute.class$("share-note")]),
                toList([$element.text("薦め状ができたで → /share/" + uuid)]),
              );
            } else {
              return $element.none();
            }
          })(),
        ]),
      ),
    ]),
  );
}

function spine_color(index) {
  let n = $list.length(spine_colors);
  let i = remainderInt(index, n);
  let $ = $list.drop(spine_colors, i);
  if ($ instanceof $Empty) {
    return "#4A3423";
  } else {
    let color = $.head;
    return color;
  }
}

function view_spine(book, index, model) {
  let is_open = isEqual(model.expanded_book, new Some(book.id));
  return $html.div(
    toList([$attribute.class$("volume")]),
    toList([
      $html.div(
        toList([
          $attribute.class$("spine"),
          $attribute.style("background", spine_color(index)),
          $event.on_click(new UserToggledBookSpine(book.id)),
        ]),
        toList([
          $html.span(
            toList([$attribute.class$("spine-title")]),
            toList([$element.text(book.title)]),
          ),
          $html.span(
            toList([$attribute.class$("spine-status")]),
            toList([$element.text(status_label(book.status))]),
          ),
        ]),
      ),
      (() => {
        if (is_open) {
          return view_book_detail(book, model);
        } else {
          return $element.none();
        }
      })(),
    ]),
  );
}

function view_shelf(model) {
  let $ = model.books;
  if ($ instanceof $Empty) {
    return $html.p(
      toList([$attribute.class$("empty-shelf")]),
      toList([$element.text("棚はまだ空っぽや。最初の一冊を迎え入れよか")]),
    );
  } else {
    let books = $;
    return $html.div(
      toList([$attribute.class$("shelf")]),
      $list.index_map(
        books,
        (book, i) => { return view_spine(book, i, model); },
      ),
    );
  }
}

function view_manual_form(model) {
  return $html.div(
    toList([$attribute.class$("brass-panel")]),
    toList([
      $html.div(
        toList([$attribute.class$("ledger-field")]),
        toList([
          $html.label(toList([]), toList([$element.text("題")])),
          $html.input(
            toList([
              $attribute.value(model.new_title),
              $event.on_input((var0) => { return new UserUpdatedTitle(var0); }),
            ]),
          ),
        ]),
      ),
      $html.div(
        toList([$attribute.class$("ledger-field")]),
        toList([
          $html.label(toList([]), toList([$element.text("著者")])),
          $html.input(
            toList([
              $attribute.value(model.new_author),
              $event.on_input((var0) => { return new UserUpdatedAuthor(var0); }),
            ]),
          ),
        ]),
      ),
      $html.div(
        toList([$attribute.class$("ledger-field")]),
        toList([
          $html.label(toList([]), toList([$element.text("分類")])),
          $html.input(
            toList([
              $attribute.value(model.new_genre),
              $event.on_input((var0) => { return new UserUpdatedGenre(var0); }),
            ]),
          ),
        ]),
      ),
      $html.button(
        toList([
          $attribute.class$("brass-button"),
          $event.on_click(new UserSubmittedBook()),
        ]),
        toList([$element.text("棚に加える")]),
      ),
    ]),
  );
}

function view_manual_toggle(model) {
  return $html.button(
    toList([
      $attribute.class$("quiet-link"),
      $event.on_click(new UserToggledManualForm()),
    ]),
    toList([
      $element.text(
        (() => {
          let $ = model.show_manual_form;
          if ($) {
            return "手入力をやめる";
          } else {
            return "見つからんかったら、手で書き込む";
          }
        })(),
      ),
    ]),
  );
}

function view_lookup_preview(result) {
  return $html.div(
    toList([$attribute.class$("lookup-preview")]),
    toList([
      (() => {
        let $ = result.cover_url;
        if ($ instanceof Some) {
          let url = $[0];
          return $html.img(
            toList([$attribute.src(url), $attribute.class$("lookup-cover")]),
          );
        } else {
          return $element.none();
        }
      })(),
      $html.div(
        toList([]),
        toList([
          $html.p(
            toList([$attribute.class$("lookup-title")]),
            toList([$element.text($option.unwrap(result.title, "(タイトル不明)"))]),
          ),
          $html.p(
            toList([$attribute.class$("lookup-author")]),
            toList([$element.text($option.unwrap(result.author, ""))]),
          ),
          $html.button(
            toList([
              $attribute.class$("brass-button small"),
              $event.on_click(new UserRegisteredLookedUpBook()),
            ]),
            toList([$element.text("この本を棚に加える")]),
          ),
        ]),
      ),
    ]),
  );
}

function view_isbn_panel(model) {
  return $html.div(
    toList([$attribute.class$("brass-panel")]),
    toList([
      $html.p(
        toList([$attribute.class$("panel-label")]),
        toList([$element.text("ISBNから取り寄せる")]),
      ),
      $html.div(
        toList([$attribute.class$("isbn-row")]),
        toList([
          $html.input(
            toList([
              $attribute.class$("isbn-input"),
              $attribute.value(model.isbn_input),
              $event.on_input((var0) => { return new UserUpdatedIsbn(var0); }),
              $attribute.placeholder("背表紙のバーコード下の数字(13桁)"),
            ]),
          ),
          $html.button(
            toList([
              $attribute.class$("brass-button"),
              $event.on_click(new UserSubmittedIsbnLookup()),
            ]),
            toList([
              $element.text(
                (() => {
                  let $ = model.lookup_loading;
                  if ($) {
                    return "取り寄せ中...";
                  } else {
                    return "取り寄せる";
                  }
                })(),
              ),
            ]),
          ),
        ]),
      ),
      (() => {
        let $ = model.lookup_error;
        if ($ instanceof Some) {
          let msg = $[0];
          return $html.p(
            toList([$attribute.class$("error-plate")]),
            toList([$element.text(msg)]),
          );
        } else {
          return $element.none();
        }
      })(),
      (() => {
        let $ = model.lookup_result;
        if ($ instanceof Some) {
          let result = $[0];
          return view_lookup_preview(result);
        } else {
          return $element.none();
        }
      })(),
    ]),
  );
}

function view_header(model) {
  return $html.header(
    toList([$attribute.class$("study-header")]),
    toList([
      $html.div(
        toList([]),
        toList([
          $html.p(
            toList([$attribute.class$("eyebrow")]),
            toList([$element.text("蔵書録")]),
          ),
          $html.h1(
            toList([$attribute.class$("study-title")]),
            toList([$element.text(model.username + "の書斎")]),
          ),
        ]),
      ),
      $html.div(
        toList([$attribute.class$("header-actions")]),
        toList([
          (() => {
            let $ = model.role;
            if ($ === "ADMIN") {
              return $html.button(
                toList([
                  $attribute.class$("quiet-link admin-link"),
                  $event.on_click(new UserOpenedRecordsRoom()),
                ]),
                toList([$element.text("🕯 記録の間へ")]),
              );
            } else {
              return $element.none();
            }
          })(),
          $html.button(
            toList([
              $attribute.class$("quiet-link"),
              $event.on_click(new UserLoggedOut()),
            ]),
            toList([$element.text("扉を閉じる")]),
          ),
        ]),
      ),
    ]),
  );
}

function view_library(model) {
  return $html.div(
    toList([$attribute.class$("study-room")]),
    toList([
      view_header(model),
      view_isbn_panel(model),
      view_manual_toggle(model),
      (() => {
        let $ = model.show_manual_form;
        if ($) {
          return view_manual_form(model);
        } else {
          return $element.none();
        }
      })(),
      (() => {
        let $ = model.error;
        if ($ instanceof Some) {
          let msg = $[0];
          return $html.p(
            toList([$attribute.class$("error-plate")]),
            toList([$element.text(msg)]),
          );
        } else {
          return $element.none();
        }
      })(),
      (() => {
        let $ = model.loading;
        if ($) {
          return $html.p(
            toList([$attribute.class$("candle-loading")]),
            toList([$element.text("灯りを点けとる...")]),
          );
        } else {
          return view_shelf(model);
        }
      })(),
    ]),
  );
}

function view_auth_screen(model) {
  return $html.div(
    toList([$attribute.class$("study-room")]),
    toList([
      $html.div(
        toList([$attribute.class$("lectern")]),
        toList([
          $html.p(
            toList([$attribute.class$("eyebrow")]),
            toList([$element.text("蔵書録")]),
          ),
          $html.h1(
            toList([$attribute.class$("lectern-title")]),
            toList([$element.text("書斎の扉")]),
          ),
          $html.p(
            toList([$attribute.class$("lectern-sub")]),
            toList([
              $element.text(
                (() => {
                  let $ = model.auth_mode;
                  if ($ instanceof LoginMode) {
                    return "扉を開けて、あなたの本棚へ";
                  } else {
                    return "新しい書斎の鍵を作る";
                  }
                })(),
              ),
            ]),
          ),
          (() => {
            let $ = model.auth_error;
            if ($ instanceof Some) {
              let msg = $[0];
              return $html.p(
                toList([$attribute.class$("error-plate")]),
                toList([$element.text(msg)]),
              );
            } else {
              return $element.none();
            }
          })(),
          $html.div(
            toList([$attribute.class$("ledger-field")]),
            toList([
              $html.label(toList([]), toList([$element.text("名前")])),
              $html.input(
                toList([
                  $attribute.value(model.auth_username_input),
                  $event.on_input(
                    (var0) => { return new UserUpdatedAuthUsername(var0); },
                  ),
                  $attribute.placeholder("たとえば takuan"),
                ]),
              ),
            ]),
          ),
          $html.div(
            toList([$attribute.class$("ledger-field")]),
            toList([
              $html.label(toList([]), toList([$element.text("合言葉")])),
              $html.input(
                toList([
                  $attribute.type_("password"),
                  $attribute.value(model.auth_password_input),
                  $event.on_input(
                    (var0) => { return new UserUpdatedAuthPassword(var0); },
                  ),
                  $attribute.placeholder("忘れずにな"),
                ]),
              ),
            ]),
          ),
          $html.button(
            toList([
              $attribute.class$("brass-button wide"),
              $event.on_click(new UserSubmittedAuth()),
            ]),
            toList([
              $element.text(
                (() => {
                  let $ = model.auth_loading;
                  let $1 = model.auth_mode;
                  if ($) {
                    return "扉を開けとる...";
                  } else if ($1 instanceof LoginMode) {
                    return "扉を開ける";
                  } else {
                    return "鍵を作る";
                  }
                })(),
              ),
            ]),
          ),
          $html.button(
            toList([
              $attribute.class$("quiet-link"),
              $event.on_click(new UserToggledAuthMode()),
            ]),
            toList([
              $element.text(
                (() => {
                  let $ = model.auth_mode;
                  if ($ instanceof LoginMode) {
                    return "はじめての方はこちら、鍵を作る";
                  } else {
                    return "もう鍵をお持ちなら、こちら";
                  }
                })(),
              ),
            ]),
          ),
        ]),
      ),
    ]),
  );
}

function view(model) {
  let $ = model.token;
  if ($ instanceof Some) {
    let $1 = model.view_mode;
    if ($1 instanceof LibraryView) {
      return view_library(model);
    } else {
      return view_records_room(model);
    }
  } else {
    return view_auth_screen(model);
  }
}

function update(model, msg) {
  if (msg instanceof UserUpdatedAuthUsername) {
    let v = msg[0];
    return [
      new Model(
        model.token,
        model.username,
        model.role,
        model.auth_mode,
        v,
        model.auth_password_input,
        model.auth_error,
        model.auth_loading,
        model.view_mode,
        model.books,
        model.loading,
        model.error,
        model.expanded_book,
        model.show_manual_form,
        model.new_title,
        model.new_author,
        model.new_genre,
        model.isbn_input,
        model.lookup_result,
        model.lookup_loading,
        model.lookup_error,
        model.review_target,
        model.review_rating,
        model.review_comment,
        model.share_link,
        model.admin_users,
        model.admin_books,
        model.admin_loading,
        model.admin_error,
        model.confirm_delete_user,
        model.confirm_delete_book,
      ),
      $effect.none(),
    ];
  } else if (msg instanceof UserUpdatedAuthPassword) {
    let v = msg[0];
    return [
      new Model(
        model.token,
        model.username,
        model.role,
        model.auth_mode,
        model.auth_username_input,
        v,
        model.auth_error,
        model.auth_loading,
        model.view_mode,
        model.books,
        model.loading,
        model.error,
        model.expanded_book,
        model.show_manual_form,
        model.new_title,
        model.new_author,
        model.new_genre,
        model.isbn_input,
        model.lookup_result,
        model.lookup_loading,
        model.lookup_error,
        model.review_target,
        model.review_rating,
        model.review_comment,
        model.share_link,
        model.admin_users,
        model.admin_books,
        model.admin_loading,
        model.admin_error,
        model.confirm_delete_user,
        model.confirm_delete_book,
      ),
      $effect.none(),
    ];
  } else if (msg instanceof UserToggledAuthMode) {
    return [
      new Model(
        model.token,
        model.username,
        model.role,
        (() => {
          let $ = model.auth_mode;
          if ($ instanceof LoginMode) {
            return new RegisterMode();
          } else {
            return new LoginMode();
          }
        })(),
        model.auth_username_input,
        model.auth_password_input,
        new None(),
        model.auth_loading,
        model.view_mode,
        model.books,
        model.loading,
        model.error,
        model.expanded_book,
        model.show_manual_form,
        model.new_title,
        model.new_author,
        model.new_genre,
        model.isbn_input,
        model.lookup_result,
        model.lookup_loading,
        model.lookup_error,
        model.review_target,
        model.review_rating,
        model.review_comment,
        model.share_link,
        model.admin_users,
        model.admin_books,
        model.admin_loading,
        model.admin_error,
        model.confirm_delete_user,
        model.confirm_delete_book,
      ),
      $effect.none(),
    ];
  } else if (msg instanceof UserSubmittedAuth) {
    let _block;
    let $ = model.auth_mode;
    if ($ instanceof LoginMode) {
      _block = $api.login(
        model.auth_username_input,
        model.auth_password_input,
        (var0) => { return new ApiAuthReturned(var0); },
      );
    } else {
      _block = $api.register(
        model.auth_username_input,
        model.auth_password_input,
        (var0) => { return new ApiAuthReturned(var0); },
      );
    }
    let eff = _block;
    return [
      new Model(
        model.token,
        model.username,
        model.role,
        model.auth_mode,
        model.auth_username_input,
        model.auth_password_input,
        new None(),
        true,
        model.view_mode,
        model.books,
        model.loading,
        model.error,
        model.expanded_book,
        model.show_manual_form,
        model.new_title,
        model.new_author,
        model.new_genre,
        model.isbn_input,
        model.lookup_result,
        model.lookup_loading,
        model.lookup_error,
        model.review_target,
        model.review_rating,
        model.review_comment,
        model.share_link,
        model.admin_users,
        model.admin_books,
        model.admin_loading,
        model.admin_error,
        model.confirm_delete_user,
        model.confirm_delete_book,
      ),
      eff,
    ];
  } else if (msg instanceof ApiAuthReturned) {
    let $ = msg[0];
    if ($ instanceof Ok) {
      let result = $[0];
      return [
        new Model(
          new Some(result.token),
          result.username,
          result.role,
          model.auth_mode,
          model.auth_username_input,
          model.auth_password_input,
          model.auth_error,
          false,
          model.view_mode,
          model.books,
          true,
          model.error,
          model.expanded_book,
          model.show_manual_form,
          model.new_title,
          model.new_author,
          model.new_genre,
          model.isbn_input,
          model.lookup_result,
          model.lookup_loading,
          model.lookup_error,
          model.review_target,
          model.review_rating,
          model.review_comment,
          model.share_link,
          model.admin_users,
          model.admin_books,
          model.admin_loading,
          model.admin_error,
          model.confirm_delete_user,
          model.confirm_delete_book,
        ),
        $api.fetch_books(
          result.token,
          (var0) => { return new ApiReturnedBooks(var0); },
        ),
      ];
    } else {
      return [
        new Model(
          model.token,
          model.username,
          model.role,
          model.auth_mode,
          model.auth_username_input,
          model.auth_password_input,
          new Some("ユーザー名かパスワードが違うで。もう一回確認してみて"),
          false,
          model.view_mode,
          model.books,
          model.loading,
          model.error,
          model.expanded_book,
          model.show_manual_form,
          model.new_title,
          model.new_author,
          model.new_genre,
          model.isbn_input,
          model.lookup_result,
          model.lookup_loading,
          model.lookup_error,
          model.review_target,
          model.review_rating,
          model.review_comment,
          model.share_link,
          model.admin_users,
          model.admin_books,
          model.admin_loading,
          model.admin_error,
          model.confirm_delete_user,
          model.confirm_delete_book,
        ),
        $effect.none(),
      ];
    }
  } else if (msg instanceof UserLoggedOut) {
    return [
      new Model(
        new None(),
        "",
        "USER",
        model.auth_mode,
        "",
        "",
        model.auth_error,
        model.auth_loading,
        new LibraryView(),
        toList([]),
        model.loading,
        model.error,
        model.expanded_book,
        model.show_manual_form,
        model.new_title,
        model.new_author,
        model.new_genre,
        model.isbn_input,
        model.lookup_result,
        model.lookup_loading,
        model.lookup_error,
        model.review_target,
        model.review_rating,
        model.review_comment,
        model.share_link,
        model.admin_users,
        model.admin_books,
        model.admin_loading,
        model.admin_error,
        model.confirm_delete_user,
        model.confirm_delete_book,
      ),
      $effect.none(),
    ];
  } else if (msg instanceof ApiReturnedBooks) {
    let $ = msg[0];
    if ($ instanceof Ok) {
      let books = $[0];
      return [
        new Model(
          model.token,
          model.username,
          model.role,
          model.auth_mode,
          model.auth_username_input,
          model.auth_password_input,
          model.auth_error,
          model.auth_loading,
          model.view_mode,
          books,
          false,
          new None(),
          model.expanded_book,
          model.show_manual_form,
          model.new_title,
          model.new_author,
          model.new_genre,
          model.isbn_input,
          model.lookup_result,
          model.lookup_loading,
          model.lookup_error,
          model.review_target,
          model.review_rating,
          model.review_comment,
          model.share_link,
          model.admin_users,
          model.admin_books,
          model.admin_loading,
          model.admin_error,
          model.confirm_delete_user,
          model.confirm_delete_book,
        ),
        $effect.none(),
      ];
    } else {
      return [
        new Model(
          model.token,
          model.username,
          model.role,
          model.auth_mode,
          model.auth_username_input,
          model.auth_password_input,
          model.auth_error,
          model.auth_loading,
          model.view_mode,
          model.books,
          false,
          new Some("本棚を読み込めんかった"),
          model.expanded_book,
          model.show_manual_form,
          model.new_title,
          model.new_author,
          model.new_genre,
          model.isbn_input,
          model.lookup_result,
          model.lookup_loading,
          model.lookup_error,
          model.review_target,
          model.review_rating,
          model.review_comment,
          model.share_link,
          model.admin_users,
          model.admin_books,
          model.admin_loading,
          model.admin_error,
          model.confirm_delete_user,
          model.confirm_delete_book,
        ),
        $effect.none(),
      ];
    }
  } else if (msg instanceof UserToggledBookSpine) {
    let id = msg[0];
    return [
      new Model(
        model.token,
        model.username,
        model.role,
        model.auth_mode,
        model.auth_username_input,
        model.auth_password_input,
        model.auth_error,
        model.auth_loading,
        model.view_mode,
        model.books,
        model.loading,
        model.error,
        (() => {
          let $ = isEqual(model.expanded_book, new Some(id));
          if ($) {
            return new None();
          } else {
            return new Some(id);
          }
        })(),
        model.show_manual_form,
        model.new_title,
        model.new_author,
        model.new_genre,
        model.isbn_input,
        model.lookup_result,
        model.lookup_loading,
        model.lookup_error,
        model.review_target,
        model.review_rating,
        model.review_comment,
        new None(),
        model.admin_users,
        model.admin_books,
        model.admin_loading,
        model.admin_error,
        model.confirm_delete_user,
        model.confirm_delete_book,
      ),
      $effect.none(),
    ];
  } else if (msg instanceof UserToggledManualForm) {
    return [
      new Model(
        model.token,
        model.username,
        model.role,
        model.auth_mode,
        model.auth_username_input,
        model.auth_password_input,
        model.auth_error,
        model.auth_loading,
        model.view_mode,
        model.books,
        model.loading,
        model.error,
        model.expanded_book,
        !model.show_manual_form,
        model.new_title,
        model.new_author,
        model.new_genre,
        model.isbn_input,
        model.lookup_result,
        model.lookup_loading,
        model.lookup_error,
        model.review_target,
        model.review_rating,
        model.review_comment,
        model.share_link,
        model.admin_users,
        model.admin_books,
        model.admin_loading,
        model.admin_error,
        model.confirm_delete_user,
        model.confirm_delete_book,
      ),
      $effect.none(),
    ];
  } else if (msg instanceof UserUpdatedTitle) {
    let v = msg[0];
    return [
      new Model(
        model.token,
        model.username,
        model.role,
        model.auth_mode,
        model.auth_username_input,
        model.auth_password_input,
        model.auth_error,
        model.auth_loading,
        model.view_mode,
        model.books,
        model.loading,
        model.error,
        model.expanded_book,
        model.show_manual_form,
        v,
        model.new_author,
        model.new_genre,
        model.isbn_input,
        model.lookup_result,
        model.lookup_loading,
        model.lookup_error,
        model.review_target,
        model.review_rating,
        model.review_comment,
        model.share_link,
        model.admin_users,
        model.admin_books,
        model.admin_loading,
        model.admin_error,
        model.confirm_delete_user,
        model.confirm_delete_book,
      ),
      $effect.none(),
    ];
  } else if (msg instanceof UserUpdatedAuthor) {
    let v = msg[0];
    return [
      new Model(
        model.token,
        model.username,
        model.role,
        model.auth_mode,
        model.auth_username_input,
        model.auth_password_input,
        model.auth_error,
        model.auth_loading,
        model.view_mode,
        model.books,
        model.loading,
        model.error,
        model.expanded_book,
        model.show_manual_form,
        model.new_title,
        v,
        model.new_genre,
        model.isbn_input,
        model.lookup_result,
        model.lookup_loading,
        model.lookup_error,
        model.review_target,
        model.review_rating,
        model.review_comment,
        model.share_link,
        model.admin_users,
        model.admin_books,
        model.admin_loading,
        model.admin_error,
        model.confirm_delete_user,
        model.confirm_delete_book,
      ),
      $effect.none(),
    ];
  } else if (msg instanceof UserUpdatedGenre) {
    let v = msg[0];
    return [
      new Model(
        model.token,
        model.username,
        model.role,
        model.auth_mode,
        model.auth_username_input,
        model.auth_password_input,
        model.auth_error,
        model.auth_loading,
        model.view_mode,
        model.books,
        model.loading,
        model.error,
        model.expanded_book,
        model.show_manual_form,
        model.new_title,
        model.new_author,
        v,
        model.isbn_input,
        model.lookup_result,
        model.lookup_loading,
        model.lookup_error,
        model.review_target,
        model.review_rating,
        model.review_comment,
        model.share_link,
        model.admin_users,
        model.admin_books,
        model.admin_loading,
        model.admin_error,
        model.confirm_delete_user,
        model.confirm_delete_book,
      ),
      $effect.none(),
    ];
  } else if (msg instanceof UserSubmittedBook) {
    let $ = model.token;
    if ($ instanceof Some) {
      let token = $[0];
      return [
        model,
        $api.create_book(
          token,
          model.new_title,
          model.new_author,
          model.new_genre,
          "",
          (var0) => { return new ApiBookCreated(var0); },
        ),
      ];
    } else {
      return [model, $effect.none()];
    }
  } else if (msg instanceof ApiBookCreated) {
    let $ = msg[0];
    if ($ instanceof Ok) {
      let $1 = model.token;
      if ($1 instanceof Some) {
        let token = $1[0];
        return [
          new Model(
            model.token,
            model.username,
            model.role,
            model.auth_mode,
            model.auth_username_input,
            model.auth_password_input,
            model.auth_error,
            model.auth_loading,
            model.view_mode,
            model.books,
            model.loading,
            model.error,
            model.expanded_book,
            false,
            "",
            "",
            "",
            model.isbn_input,
            model.lookup_result,
            model.lookup_loading,
            model.lookup_error,
            model.review_target,
            model.review_rating,
            model.review_comment,
            model.share_link,
            model.admin_users,
            model.admin_books,
            model.admin_loading,
            model.admin_error,
            model.confirm_delete_user,
            model.confirm_delete_book,
          ),
          $api.fetch_books(
            token,
            (var0) => { return new ApiReturnedBooks(var0); },
          ),
        ];
      } else {
        return [model, $effect.none()];
      }
    } else {
      return [
        new Model(
          model.token,
          model.username,
          model.role,
          model.auth_mode,
          model.auth_username_input,
          model.auth_password_input,
          model.auth_error,
          model.auth_loading,
          model.view_mode,
          model.books,
          model.loading,
          new Some("本の登録に失敗した"),
          model.expanded_book,
          model.show_manual_form,
          model.new_title,
          model.new_author,
          model.new_genre,
          model.isbn_input,
          model.lookup_result,
          model.lookup_loading,
          model.lookup_error,
          model.review_target,
          model.review_rating,
          model.review_comment,
          model.share_link,
          model.admin_users,
          model.admin_books,
          model.admin_loading,
          model.admin_error,
          model.confirm_delete_user,
          model.confirm_delete_book,
        ),
        $effect.none(),
      ];
    }
  } else if (msg instanceof UserUpdatedIsbn) {
    let v = msg[0];
    return [
      new Model(
        model.token,
        model.username,
        model.role,
        model.auth_mode,
        model.auth_username_input,
        model.auth_password_input,
        model.auth_error,
        model.auth_loading,
        model.view_mode,
        model.books,
        model.loading,
        model.error,
        model.expanded_book,
        model.show_manual_form,
        model.new_title,
        model.new_author,
        model.new_genre,
        v,
        model.lookup_result,
        model.lookup_loading,
        new None(),
        model.review_target,
        model.review_rating,
        model.review_comment,
        model.share_link,
        model.admin_users,
        model.admin_books,
        model.admin_loading,
        model.admin_error,
        model.confirm_delete_user,
        model.confirm_delete_book,
      ),
      $effect.none(),
    ];
  } else if (msg instanceof UserSubmittedIsbnLookup) {
    let $ = model.token;
    if ($ instanceof Some) {
      let token = $[0];
      return [
        new Model(
          model.token,
          model.username,
          model.role,
          model.auth_mode,
          model.auth_username_input,
          model.auth_password_input,
          model.auth_error,
          model.auth_loading,
          model.view_mode,
          model.books,
          model.loading,
          model.error,
          model.expanded_book,
          model.show_manual_form,
          model.new_title,
          model.new_author,
          model.new_genre,
          model.isbn_input,
          new None(),
          true,
          new None(),
          model.review_target,
          model.review_rating,
          model.review_comment,
          model.share_link,
          model.admin_users,
          model.admin_books,
          model.admin_loading,
          model.admin_error,
          model.confirm_delete_user,
          model.confirm_delete_book,
        ),
        $api.lookup_isbn(
          token,
          model.isbn_input,
          (var0) => { return new ApiLookupReturned(var0); },
        ),
      ];
    } else {
      return [model, $effect.none()];
    }
  } else if (msg instanceof ApiLookupReturned) {
    let $ = msg[0];
    if ($ instanceof Ok) {
      let result = $[0];
      let $1 = result.found;
      if ($1) {
        return [
          new Model(
            model.token,
            model.username,
            model.role,
            model.auth_mode,
            model.auth_username_input,
            model.auth_password_input,
            model.auth_error,
            model.auth_loading,
            model.view_mode,
            model.books,
            model.loading,
            model.error,
            model.expanded_book,
            model.show_manual_form,
            model.new_title,
            model.new_author,
            model.new_genre,
            model.isbn_input,
            new Some(result),
            false,
            model.lookup_error,
            model.review_target,
            model.review_rating,
            model.review_comment,
            model.share_link,
            model.admin_users,
            model.admin_books,
            model.admin_loading,
            model.admin_error,
            model.confirm_delete_user,
            model.confirm_delete_book,
          ),
          $effect.none(),
        ];
      } else {
        return [
          new Model(
            model.token,
            model.username,
            model.role,
            model.auth_mode,
            model.auth_username_input,
            model.auth_password_input,
            model.auth_error,
            model.auth_loading,
            model.view_mode,
            model.books,
            model.loading,
            model.error,
            model.expanded_book,
            model.show_manual_form,
            model.new_title,
            model.new_author,
            model.new_genre,
            model.isbn_input,
            new None(),
            false,
            new Some("この本の情報が見つからんかった。手入力で登録してな"),
            model.review_target,
            model.review_rating,
            model.review_comment,
            model.share_link,
            model.admin_users,
            model.admin_books,
            model.admin_loading,
            model.admin_error,
            model.confirm_delete_user,
            model.confirm_delete_book,
          ),
          $effect.none(),
        ];
      }
    } else {
      return [
        new Model(
          model.token,
          model.username,
          model.role,
          model.auth_mode,
          model.auth_username_input,
          model.auth_password_input,
          model.auth_error,
          model.auth_loading,
          model.view_mode,
          model.books,
          model.loading,
          model.error,
          model.expanded_book,
          model.show_manual_form,
          model.new_title,
          model.new_author,
          model.new_genre,
          model.isbn_input,
          model.lookup_result,
          false,
          new Some("検索に失敗した"),
          model.review_target,
          model.review_rating,
          model.review_comment,
          model.share_link,
          model.admin_users,
          model.admin_books,
          model.admin_loading,
          model.admin_error,
          model.confirm_delete_user,
          model.confirm_delete_book,
        ),
        $effect.none(),
      ];
    }
  } else if (msg instanceof UserRegisteredLookedUpBook) {
    let $ = model.token;
    let $1 = model.lookup_result;
    if ($ instanceof Some && $1 instanceof Some) {
      let token = $[0];
      let result = $1[0];
      let title = $option.unwrap(result.title, "");
      let author = $option.unwrap(result.author, "");
      let cover = $option.unwrap(result.cover_url, "");
      return [
        new Model(
          model.token,
          model.username,
          model.role,
          model.auth_mode,
          model.auth_username_input,
          model.auth_password_input,
          model.auth_error,
          model.auth_loading,
          model.view_mode,
          model.books,
          model.loading,
          model.error,
          model.expanded_book,
          model.show_manual_form,
          model.new_title,
          model.new_author,
          model.new_genre,
          "",
          new None(),
          model.lookup_loading,
          model.lookup_error,
          model.review_target,
          model.review_rating,
          model.review_comment,
          model.share_link,
          model.admin_users,
          model.admin_books,
          model.admin_loading,
          model.admin_error,
          model.confirm_delete_user,
          model.confirm_delete_book,
        ),
        $api.create_book(
          token,
          title,
          author,
          "未分類",
          cover,
          (var0) => { return new ApiBookCreated(var0); },
        ),
      ];
    } else {
      return [model, $effect.none()];
    }
  } else if (msg instanceof UserOpenedReviewForm) {
    let id = msg[0];
    return [
      new Model(
        model.token,
        model.username,
        model.role,
        model.auth_mode,
        model.auth_username_input,
        model.auth_password_input,
        model.auth_error,
        model.auth_loading,
        model.view_mode,
        model.books,
        model.loading,
        model.error,
        model.expanded_book,
        model.show_manual_form,
        model.new_title,
        model.new_author,
        model.new_genre,
        model.isbn_input,
        model.lookup_result,
        model.lookup_loading,
        model.lookup_error,
        new Some(id),
        model.review_rating,
        model.review_comment,
        model.share_link,
        model.admin_users,
        model.admin_books,
        model.admin_loading,
        model.admin_error,
        model.confirm_delete_user,
        model.confirm_delete_book,
      ),
      $effect.none(),
    ];
  } else if (msg instanceof UserUpdatedRating) {
    let v = msg[0];
    return [
      new Model(
        model.token,
        model.username,
        model.role,
        model.auth_mode,
        model.auth_username_input,
        model.auth_password_input,
        model.auth_error,
        model.auth_loading,
        model.view_mode,
        model.books,
        model.loading,
        model.error,
        model.expanded_book,
        model.show_manual_form,
        model.new_title,
        model.new_author,
        model.new_genre,
        model.isbn_input,
        model.lookup_result,
        model.lookup_loading,
        model.lookup_error,
        model.review_target,
        v,
        model.review_comment,
        model.share_link,
        model.admin_users,
        model.admin_books,
        model.admin_loading,
        model.admin_error,
        model.confirm_delete_user,
        model.confirm_delete_book,
      ),
      $effect.none(),
    ];
  } else if (msg instanceof UserUpdatedComment) {
    let v = msg[0];
    return [
      new Model(
        model.token,
        model.username,
        model.role,
        model.auth_mode,
        model.auth_username_input,
        model.auth_password_input,
        model.auth_error,
        model.auth_loading,
        model.view_mode,
        model.books,
        model.loading,
        model.error,
        model.expanded_book,
        model.show_manual_form,
        model.new_title,
        model.new_author,
        model.new_genre,
        model.isbn_input,
        model.lookup_result,
        model.lookup_loading,
        model.lookup_error,
        model.review_target,
        model.review_rating,
        v,
        model.share_link,
        model.admin_users,
        model.admin_books,
        model.admin_loading,
        model.admin_error,
        model.confirm_delete_user,
        model.confirm_delete_book,
      ),
      $effect.none(),
    ];
  } else if (msg instanceof UserSubmittedReview) {
    let id = msg[0];
    let $ = model.token;
    if ($ instanceof Some) {
      let token = $[0];
      return [
        model,
        $api.add_review(
          token,
          id,
          model.review_rating,
          model.review_comment,
          (var0) => { return new ApiReviewAdded(var0); },
        ),
      ];
    } else {
      return [model, $effect.none()];
    }
  } else if (msg instanceof ApiReviewAdded) {
    let $ = msg[0];
    if ($ instanceof Ok) {
      let $1 = model.token;
      if ($1 instanceof Some) {
        let token = $1[0];
        return [
          new Model(
            model.token,
            model.username,
            model.role,
            model.auth_mode,
            model.auth_username_input,
            model.auth_password_input,
            model.auth_error,
            model.auth_loading,
            model.view_mode,
            model.books,
            model.loading,
            model.error,
            model.expanded_book,
            model.show_manual_form,
            model.new_title,
            model.new_author,
            model.new_genre,
            model.isbn_input,
            model.lookup_result,
            model.lookup_loading,
            model.lookup_error,
            new None(),
            model.review_rating,
            "",
            model.share_link,
            model.admin_users,
            model.admin_books,
            model.admin_loading,
            model.admin_error,
            model.confirm_delete_user,
            model.confirm_delete_book,
          ),
          $api.fetch_books(
            token,
            (var0) => { return new ApiReturnedBooks(var0); },
          ),
        ];
      } else {
        return [model, $effect.none()];
      }
    } else {
      return [
        new Model(
          model.token,
          model.username,
          model.role,
          model.auth_mode,
          model.auth_username_input,
          model.auth_password_input,
          model.auth_error,
          model.auth_loading,
          model.view_mode,
          model.books,
          model.loading,
          new Some("感想の登録に失敗した"),
          model.expanded_book,
          model.show_manual_form,
          model.new_title,
          model.new_author,
          model.new_genre,
          model.isbn_input,
          model.lookup_result,
          model.lookup_loading,
          model.lookup_error,
          model.review_target,
          model.review_rating,
          model.review_comment,
          model.share_link,
          model.admin_users,
          model.admin_books,
          model.admin_loading,
          model.admin_error,
          model.confirm_delete_user,
          model.confirm_delete_book,
        ),
        $effect.none(),
      ];
    }
  } else if (msg instanceof UserRequestedShareLink) {
    let id = msg[0];
    let $ = model.token;
    if ($ instanceof Some) {
      let token = $[0];
      return [
        new Model(
          model.token,
          model.username,
          model.role,
          model.auth_mode,
          model.auth_username_input,
          model.auth_password_input,
          model.auth_error,
          model.auth_loading,
          model.view_mode,
          model.books,
          model.loading,
          model.error,
          model.expanded_book,
          model.show_manual_form,
          model.new_title,
          model.new_author,
          model.new_genre,
          model.isbn_input,
          model.lookup_result,
          model.lookup_loading,
          model.lookup_error,
          model.review_target,
          model.review_rating,
          model.review_comment,
          new None(),
          model.admin_users,
          model.admin_books,
          model.admin_loading,
          model.admin_error,
          model.confirm_delete_user,
          model.confirm_delete_book,
        ),
        $api.create_share_link(
          token,
          id,
          (var0) => { return new ApiShareLinkCreated(var0); },
        ),
      ];
    } else {
      return [model, $effect.none()];
    }
  } else if (msg instanceof ApiShareLinkCreated) {
    let $ = msg[0];
    if ($ instanceof Ok) {
      let uuid = $[0];
      return [
        new Model(
          model.token,
          model.username,
          model.role,
          model.auth_mode,
          model.auth_username_input,
          model.auth_password_input,
          model.auth_error,
          model.auth_loading,
          model.view_mode,
          model.books,
          model.loading,
          model.error,
          model.expanded_book,
          model.show_manual_form,
          model.new_title,
          model.new_author,
          model.new_genre,
          model.isbn_input,
          model.lookup_result,
          model.lookup_loading,
          model.lookup_error,
          model.review_target,
          model.review_rating,
          model.review_comment,
          new Some(uuid),
          model.admin_users,
          model.admin_books,
          model.admin_loading,
          model.admin_error,
          model.confirm_delete_user,
          model.confirm_delete_book,
        ),
        $effect.none(),
      ];
    } else {
      return [
        new Model(
          model.token,
          model.username,
          model.role,
          model.auth_mode,
          model.auth_username_input,
          model.auth_password_input,
          model.auth_error,
          model.auth_loading,
          model.view_mode,
          model.books,
          model.loading,
          new Some("共有リンクの発行に失敗した"),
          model.expanded_book,
          model.show_manual_form,
          model.new_title,
          model.new_author,
          model.new_genre,
          model.isbn_input,
          model.lookup_result,
          model.lookup_loading,
          model.lookup_error,
          model.review_target,
          model.review_rating,
          model.review_comment,
          model.share_link,
          model.admin_users,
          model.admin_books,
          model.admin_loading,
          model.admin_error,
          model.confirm_delete_user,
          model.confirm_delete_book,
        ),
        $effect.none(),
      ];
    }
  } else if (msg instanceof UserOpenedRecordsRoom) {
    let $ = model.token;
    if ($ instanceof Some) {
      let token = $[0];
      return [
        new Model(
          model.token,
          model.username,
          model.role,
          model.auth_mode,
          model.auth_username_input,
          model.auth_password_input,
          model.auth_error,
          model.auth_loading,
          new RecordsRoomView(),
          model.books,
          model.loading,
          model.error,
          model.expanded_book,
          model.show_manual_form,
          model.new_title,
          model.new_author,
          model.new_genre,
          model.isbn_input,
          model.lookup_result,
          model.lookup_loading,
          model.lookup_error,
          model.review_target,
          model.review_rating,
          model.review_comment,
          model.share_link,
          model.admin_users,
          model.admin_books,
          true,
          new None(),
          model.confirm_delete_user,
          model.confirm_delete_book,
        ),
        $effect.batch(
          toList([
            $api.fetch_admin_users(
              token,
              (var0) => { return new ApiAdminUsersReturned(var0); },
            ),
            $api.fetch_admin_books(
              token,
              (var0) => { return new ApiAdminBooksReturned(var0); },
            ),
          ]),
        ),
      ];
    } else {
      return [model, $effect.none()];
    }
  } else if (msg instanceof UserClosedRecordsRoom) {
    return [
      new Model(
        model.token,
        model.username,
        model.role,
        model.auth_mode,
        model.auth_username_input,
        model.auth_password_input,
        model.auth_error,
        model.auth_loading,
        new LibraryView(),
        model.books,
        model.loading,
        model.error,
        model.expanded_book,
        model.show_manual_form,
        model.new_title,
        model.new_author,
        model.new_genre,
        model.isbn_input,
        model.lookup_result,
        model.lookup_loading,
        model.lookup_error,
        model.review_target,
        model.review_rating,
        model.review_comment,
        model.share_link,
        model.admin_users,
        model.admin_books,
        model.admin_loading,
        model.admin_error,
        model.confirm_delete_user,
        model.confirm_delete_book,
      ),
      $effect.none(),
    ];
  } else if (msg instanceof ApiAdminUsersReturned) {
    let $ = msg[0];
    if ($ instanceof Ok) {
      let users = $[0];
      return [
        new Model(
          model.token,
          model.username,
          model.role,
          model.auth_mode,
          model.auth_username_input,
          model.auth_password_input,
          model.auth_error,
          model.auth_loading,
          model.view_mode,
          model.books,
          model.loading,
          model.error,
          model.expanded_book,
          model.show_manual_form,
          model.new_title,
          model.new_author,
          model.new_genre,
          model.isbn_input,
          model.lookup_result,
          model.lookup_loading,
          model.lookup_error,
          model.review_target,
          model.review_rating,
          model.review_comment,
          model.share_link,
          users,
          model.admin_books,
          false,
          model.admin_error,
          model.confirm_delete_user,
          model.confirm_delete_book,
        ),
        $effect.none(),
      ];
    } else {
      return [
        new Model(
          model.token,
          model.username,
          model.role,
          model.auth_mode,
          model.auth_username_input,
          model.auth_password_input,
          model.auth_error,
          model.auth_loading,
          model.view_mode,
          model.books,
          model.loading,
          model.error,
          model.expanded_book,
          model.show_manual_form,
          model.new_title,
          model.new_author,
          model.new_genre,
          model.isbn_input,
          model.lookup_result,
          model.lookup_loading,
          model.lookup_error,
          model.review_target,
          model.review_rating,
          model.review_comment,
          model.share_link,
          model.admin_users,
          model.admin_books,
          false,
          new Some("ユーザー一覧を読み込めんかった"),
          model.confirm_delete_user,
          model.confirm_delete_book,
        ),
        $effect.none(),
      ];
    }
  } else if (msg instanceof ApiAdminBooksReturned) {
    let $ = msg[0];
    if ($ instanceof Ok) {
      let books = $[0];
      return [
        new Model(
          model.token,
          model.username,
          model.role,
          model.auth_mode,
          model.auth_username_input,
          model.auth_password_input,
          model.auth_error,
          model.auth_loading,
          model.view_mode,
          model.books,
          model.loading,
          model.error,
          model.expanded_book,
          model.show_manual_form,
          model.new_title,
          model.new_author,
          model.new_genre,
          model.isbn_input,
          model.lookup_result,
          model.lookup_loading,
          model.lookup_error,
          model.review_target,
          model.review_rating,
          model.review_comment,
          model.share_link,
          model.admin_users,
          books,
          model.admin_loading,
          model.admin_error,
          model.confirm_delete_user,
          model.confirm_delete_book,
        ),
        $effect.none(),
      ];
    } else {
      return [
        new Model(
          model.token,
          model.username,
          model.role,
          model.auth_mode,
          model.auth_username_input,
          model.auth_password_input,
          model.auth_error,
          model.auth_loading,
          model.view_mode,
          model.books,
          model.loading,
          model.error,
          model.expanded_book,
          model.show_manual_form,
          model.new_title,
          model.new_author,
          model.new_genre,
          model.isbn_input,
          model.lookup_result,
          model.lookup_loading,
          model.lookup_error,
          model.review_target,
          model.review_rating,
          model.review_comment,
          model.share_link,
          model.admin_users,
          model.admin_books,
          model.admin_loading,
          new Some("蔵書一覧を読み込めんかった"),
          model.confirm_delete_user,
          model.confirm_delete_book,
        ),
        $effect.none(),
      ];
    }
  } else if (msg instanceof UserRequestedDeleteUser) {
    let id = msg[0];
    return [
      new Model(
        model.token,
        model.username,
        model.role,
        model.auth_mode,
        model.auth_username_input,
        model.auth_password_input,
        model.auth_error,
        model.auth_loading,
        model.view_mode,
        model.books,
        model.loading,
        model.error,
        model.expanded_book,
        model.show_manual_form,
        model.new_title,
        model.new_author,
        model.new_genre,
        model.isbn_input,
        model.lookup_result,
        model.lookup_loading,
        model.lookup_error,
        model.review_target,
        model.review_rating,
        model.review_comment,
        model.share_link,
        model.admin_users,
        model.admin_books,
        model.admin_loading,
        model.admin_error,
        new Some(id),
        new None(),
      ),
      $effect.none(),
    ];
  } else if (msg instanceof UserConfirmedDeleteUser) {
    let id = msg[0];
    let $ = model.token;
    if ($ instanceof Some) {
      let token = $[0];
      return [
        new Model(
          model.token,
          model.username,
          model.role,
          model.auth_mode,
          model.auth_username_input,
          model.auth_password_input,
          model.auth_error,
          model.auth_loading,
          model.view_mode,
          model.books,
          model.loading,
          model.error,
          model.expanded_book,
          model.show_manual_form,
          model.new_title,
          model.new_author,
          model.new_genre,
          model.isbn_input,
          model.lookup_result,
          model.lookup_loading,
          model.lookup_error,
          model.review_target,
          model.review_rating,
          model.review_comment,
          model.share_link,
          model.admin_users,
          model.admin_books,
          model.admin_loading,
          model.admin_error,
          new None(),
          model.confirm_delete_book,
        ),
        $api.delete_admin_user(
          token,
          id,
          (var0) => { return new ApiUserDeleted(var0); },
        ),
      ];
    } else {
      return [model, $effect.none()];
    }
  } else if (msg instanceof ApiUserDeleted) {
    let $ = msg[0];
    if ($ instanceof Ok) {
      let $1 = model.token;
      if ($1 instanceof Some) {
        let token = $1[0];
        return [
          model,
          $effect.batch(
            toList([
              $api.fetch_admin_users(
                token,
                (var0) => { return new ApiAdminUsersReturned(var0); },
              ),
              $api.fetch_admin_books(
                token,
                (var0) => { return new ApiAdminBooksReturned(var0); },
              ),
            ]),
          ),
        ];
      } else {
        return [model, $effect.none()];
      }
    } else {
      return [
        new Model(
          model.token,
          model.username,
          model.role,
          model.auth_mode,
          model.auth_username_input,
          model.auth_password_input,
          model.auth_error,
          model.auth_loading,
          model.view_mode,
          model.books,
          model.loading,
          model.error,
          model.expanded_book,
          model.show_manual_form,
          model.new_title,
          model.new_author,
          model.new_genre,
          model.isbn_input,
          model.lookup_result,
          model.lookup_loading,
          model.lookup_error,
          model.review_target,
          model.review_rating,
          model.review_comment,
          model.share_link,
          model.admin_users,
          model.admin_books,
          model.admin_loading,
          new Some("ユーザーの削除に失敗した"),
          model.confirm_delete_user,
          model.confirm_delete_book,
        ),
        $effect.none(),
      ];
    }
  } else if (msg instanceof UserRequestedDeleteBook) {
    let id = msg[0];
    return [
      new Model(
        model.token,
        model.username,
        model.role,
        model.auth_mode,
        model.auth_username_input,
        model.auth_password_input,
        model.auth_error,
        model.auth_loading,
        model.view_mode,
        model.books,
        model.loading,
        model.error,
        model.expanded_book,
        model.show_manual_form,
        model.new_title,
        model.new_author,
        model.new_genre,
        model.isbn_input,
        model.lookup_result,
        model.lookup_loading,
        model.lookup_error,
        model.review_target,
        model.review_rating,
        model.review_comment,
        model.share_link,
        model.admin_users,
        model.admin_books,
        model.admin_loading,
        model.admin_error,
        new None(),
        new Some(id),
      ),
      $effect.none(),
    ];
  } else if (msg instanceof UserConfirmedDeleteBook) {
    let id = msg[0];
    let $ = model.token;
    if ($ instanceof Some) {
      let token = $[0];
      return [
        new Model(
          model.token,
          model.username,
          model.role,
          model.auth_mode,
          model.auth_username_input,
          model.auth_password_input,
          model.auth_error,
          model.auth_loading,
          model.view_mode,
          model.books,
          model.loading,
          model.error,
          model.expanded_book,
          model.show_manual_form,
          model.new_title,
          model.new_author,
          model.new_genre,
          model.isbn_input,
          model.lookup_result,
          model.lookup_loading,
          model.lookup_error,
          model.review_target,
          model.review_rating,
          model.review_comment,
          model.share_link,
          model.admin_users,
          model.admin_books,
          model.admin_loading,
          model.admin_error,
          model.confirm_delete_user,
          new None(),
        ),
        $api.delete_admin_book(
          token,
          id,
          (var0) => { return new ApiAdminBookDeleted(var0); },
        ),
      ];
    } else {
      return [model, $effect.none()];
    }
  } else if (msg instanceof ApiAdminBookDeleted) {
    let $ = msg[0];
    if ($ instanceof Ok) {
      let $1 = model.token;
      if ($1 instanceof Some) {
        let token = $1[0];
        return [
          model,
          $api.fetch_admin_books(
            token,
            (var0) => { return new ApiAdminBooksReturned(var0); },
          ),
        ];
      } else {
        return [model, $effect.none()];
      }
    } else {
      return [
        new Model(
          model.token,
          model.username,
          model.role,
          model.auth_mode,
          model.auth_username_input,
          model.auth_password_input,
          model.auth_error,
          model.auth_loading,
          model.view_mode,
          model.books,
          model.loading,
          model.error,
          model.expanded_book,
          model.show_manual_form,
          model.new_title,
          model.new_author,
          model.new_genre,
          model.isbn_input,
          model.lookup_result,
          model.lookup_loading,
          model.lookup_error,
          model.review_target,
          model.review_rating,
          model.review_comment,
          model.share_link,
          model.admin_users,
          model.admin_books,
          model.admin_loading,
          new Some("本の削除に失敗した"),
          model.confirm_delete_user,
          model.confirm_delete_book,
        ),
        $effect.none(),
      ];
    }
  } else {
    return [
      new Model(
        model.token,
        model.username,
        model.role,
        model.auth_mode,
        model.auth_username_input,
        model.auth_password_input,
        model.auth_error,
        model.auth_loading,
        model.view_mode,
        model.books,
        model.loading,
        model.error,
        model.expanded_book,
        model.show_manual_form,
        model.new_title,
        model.new_author,
        model.new_genre,
        model.isbn_input,
        model.lookup_result,
        model.lookup_loading,
        model.lookup_error,
        model.review_target,
        model.review_rating,
        model.review_comment,
        model.share_link,
        model.admin_users,
        model.admin_books,
        model.admin_loading,
        model.admin_error,
        new None(),
        new None(),
      ),
      $effect.none(),
    ];
  }
}

function init(_) {
  let model = new Model(
    new None(),
    "",
    "USER",
    new LoginMode(),
    "",
    "",
    new None(),
    false,
    new LibraryView(),
    toList([]),
    false,
    new None(),
    new None(),
    false,
    "",
    "",
    "",
    "",
    new None(),
    false,
    new None(),
    new None(),
    5,
    "",
    new None(),
    toList([]),
    toList([]),
    false,
    new None(),
    new None(),
    new None(),
  );
  return [model, $effect.none()];
}

export function main() {
  let app = $lustre.application(init, update, view);
  let $ = $lustre.start(app, "#app", undefined);
  if (!($ instanceof Ok)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "app",
      19,
      "main",
      "Pattern match failed, no pattern matched the value.",
      { value: $, start: 465, end: 514, pattern_start: 476, pattern_end: 481 }
    )
  }
  return undefined;
}
