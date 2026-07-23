// 端末ごとの本棚を区別するためのセッションID。
// localStorageに保存されるので、同じブラウザなら再訪問しても同じ本棚が見える。
@external(javascript, "./session_ffi.mjs", "getOrCreateSessionId")
pub fn get_or_create_session_id() -> String

// 「引き継ぎコード」入力用。他の端末のセッションIDをこの端末に書き込む。
@external(javascript, "./session_ffi.mjs", "setSessionId")
pub fn set_session_id(id: String) -> String
