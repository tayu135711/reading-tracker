# ===== ビルドステージ =====
FROM gradle:8.10-jdk17-jammy AS build
WORKDIR /app

# 依存関係だけ先にコピーしてキャッシュを効かせる
COPY build.gradle.kts settings.gradle.kts ./

# ソースをコピーしてビルド
COPY src src
RUN gradle build -x test --no-daemon

# ===== 実行ステージ =====
FROM eclipse-temurin:17-jre-jammy
WORKDIR /app
COPY --from=build /app/build/libs/*.jar app.jar

# Renderは$PORT環境変数でリッスンポートを指定してくる
ENV PORT=8080
EXPOSE 8080
ENTRYPOINT ["sh", "-c", "java -jar app.jar --server.port=${PORT}"]
