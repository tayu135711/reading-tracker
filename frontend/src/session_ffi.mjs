const STORAGE_KEY = "reading_tracker_session_id";

// 端末(ブラウザ)ごとに1回だけ発行され、以後はlocalStorageから読み出される。
// これが「自分の本棚」を識別するID。ログイン機能はまだ無いので、
// ブラウザを変えたりlocalStorageを消すと別の本棚として扱われる。
export function getOrCreateSessionId() {
  let id = window.localStorage.getItem(STORAGE_KEY);
  if (!id) {
    id = crypto.randomUUID();
    window.localStorage.setItem(STORAGE_KEY, id);
  }
  return id;
}

// 「引き継ぎコード」機能用。他の端末で発行済みのセッションIDを
// この端末のlocalStorageに書き込んで、同じ本棚に接続し直す。
export function setSessionId(id) {
  window.localStorage.setItem(STORAGE_KEY, id);
  return id;
}
