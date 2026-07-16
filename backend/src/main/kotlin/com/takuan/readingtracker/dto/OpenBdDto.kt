package com.takuan.readingtracker.dto

import com.fasterxml.jackson.annotation.JsonIgnoreProperties

// OpenBDのレスポンスは項目が非常に多いので、使う部分だけ拾ってあとは無視する
@JsonIgnoreProperties(ignoreUnknown = true)
data class OpenBdItem(
    val summary: OpenBdSummary? = null
)

@JsonIgnoreProperties(ignoreUnknown = true)
data class OpenBdSummary(
    val isbn: String? = null,
    val title: String? = null,
    val author: String? = null,
    val publisher: String? = null,
    val pubdate: String? = null,
    val cover: String? = null
)

// フロントに返す、こっちで使いやすい形に整えたレスポンス
data class BookLookupResponse(
    val found: Boolean,
    val title: String? = null,
    val author: String? = null,
    val coverUrl: String? = null,
    val publisher: String? = null
)
