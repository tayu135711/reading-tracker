package com.takuan.readingtracker.dto

import com.fasterxml.jackson.annotation.JsonIgnoreProperties

// Google Books APIは項目が多いので、表紙画像を拾うのに必要な部分だけ持つ

@JsonIgnoreProperties(ignoreUnknown = true)
data class GoogleBooksResponse(
    val items: List<GoogleBooksItem>? = null
)

@JsonIgnoreProperties(ignoreUnknown = true)
data class GoogleBooksItem(
    val volumeInfo: GoogleVolumeInfo? = null
)

@JsonIgnoreProperties(ignoreUnknown = true)
data class GoogleVolumeInfo(
    val imageLinks: GoogleImageLinks? = null
)

@JsonIgnoreProperties(ignoreUnknown = true)
data class GoogleImageLinks(
    val smallThumbnail: String? = null,
    val thumbnail: String? = null
)
