# 📚 読書記録トラッカー (Reading Tracker)

読んだ本を記録して、友達に「おすすめリンク」で共有できるアプリ。

## 技術スタック

- **バックエンド**: Kotlin + Spring Boot + JPA (H2インメモリDB)
- **フロントエンド**: [Gleam](https://gleam.run/) + [Lustre](https://hexdocs.pm/lustre/)
  - Elm由来のModel-View-Updateアーキテクチャを採用した、型安全な関数型フロントエンド

なぜこの組み合わせか:
- Kotlin/Spring Bootは実務(新卒配属先)で使う技術スタックそのまま
- Gleamはまだ採用事例が少ない新興言語。BEAM(Erlang VM)とJavaScript両方にコンパイルできる珍しい言語で、型安全性を追求した個人開発の実験場として選定

## セットアップ・起動方法

### バックエンド (Kotlin / Spring Boot)

```bash
cd backend
# Gradle Wrapperがない場合は先に生成(要 gradle コマンド)
gradle wrapper
./gradlew bootRun
```

起動したら `http://localhost:8080/api/books` でAPIが叩ける。

主なエンドポイント:

| メソッド | パス | 内容 |
|---|---|---|
| GET | /api/books | 一覧取得 |
| POST | /api/books | 登録 |
| PUT | /api/books/{id} | 更新 |
| DELETE | /api/books/{id} | 削除 |
| POST | /api/books/{id}/reviews | 感想を追加 |
| POST | /api/books/{id}/share | おすすめリンク発行 |
| GET | /api/share/{uuid} | 共有リンクから閲覧(公開・認証不要) |

### フロントエンド (Gleam / Lustre)

Gleamは初めてだと思うので、まずツールチェーンのインストールから:

```bash
# Homebrewの場合
brew install gleam

# それ以外はこちら参照
# https://gleam.run/getting-started/installing/
```

インストールできたら:

```bash
cd frontend
gleam deps download
gleam run -m lustre/dev start
```

ブラウザで `http://localhost:1234` あたりが自動で開く(バージョンによって挙動が変わることがある)。

## ⚠️ 正直な注意書き

Gleam/Lustreはエコシステムの進化がかなり速い言語です。`gleam.toml` のバージョン指定や `gleam/dynamic/decode` まわりのAPIは、たくあんが実際に `gleam deps download` した時点の最新版と微妙にズレてエラーが出る可能性があります。

その場合は:
1. エラーメッセージをよく読む(Gleamはエラーメッセージがかなり親切)
2. `gleam.toml` のバージョン範囲を少し緩める
3. それでも詰まったら、エラーメッセージをそのまま貼ってくれれば一緒にデバッグする

これも含めて「ニッチな言語に挑戦した」というポートフォリオのネタになるはず。

## 今後の拡張アイデア

- タグ付け・検索機能
- 読書進捗管理(ページ数トラッキング)
- Render + Neon Postgresへの本番デプロイ(H2から差し替え)
- GitHub ActionsでバックエンドのCI(ビルド + JUnitテスト)
