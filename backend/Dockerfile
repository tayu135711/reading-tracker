# ===== ビルドステージ =====
FROM eclipse-temurin:17-jdk-jammy AS build
WORKDIR /app

# 依存関係だけ先にコピーしてキャッシュを効かせる
COPY gradlew .
COPY gradle gradle
COPY build.gradle.kts settings.gradle.kts ./
RUN chmod +x gradlew

# ソースをコピーしてビルド
COPY src src
RUN ./gradlew build -x test --no-daemon

# ===== 実行ステージ =====
FROM eclipse-temurin:17-jre-jammy
WORKDIR /app
COPY --from=build /app/build/libs/*.jar app.jar

# Renderは$PORT環境変数でリッスンポートを指定してくる
ENV PORT=8080
EXPOSE 8080
ENTRYPOINT ["sh", "-c", "java -jar app.jar --server.port=${PORT}"]
