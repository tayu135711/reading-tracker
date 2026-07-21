package com.takuan.readingtracker.dto

import com.takuan.readingtracker.entity.Book
import com.takuan.readingtracker.entity.BookStatus
import com.takuan.readingtracker.entity.Review

// ===== リクエスト用 =====

data class BookRequest(
    val title: String,
    val author: String,
    val genre: String,
    val coverUrl: String? = null,
    val status: BookStatus = BookStatus.UNREAD,
    val currentPage: Int? = null,
    val totalPage: Int? = null
)

data class ReviewRequest(
    val rating: Int,
    val comment: String
)

// 読書中の進捗だけを更新するためのリクエスト
data class ProgressRequest(
    val currentPage: Int?,
    val totalPage: Int?
)

// ステータス(未読/読書中/読了)だけを更新するためのリクエスト
data class StatusRequest(
    val status: BookStatus
)

// ===== レスポンス用 =====

data class ReviewResponse(
    val id: Long,
    val rating: Int,
    val comment: String,
    val readDate: String
)

data class BookResponse(
    val id: Long,
    val title: String,
    val author: String,
    val genre: String,
    val coverUrl: String?,
    val status: BookStatus,
    val currentPage: Int?,
    val totalPage: Int?,
    val reviews: List<ReviewResponse>
)

// ===== Entity -> Response 変換 =====
// フロントに返す形をここで一元管理する(実務でもよくあるマッピング層)

fun Review.toResponse(): ReviewResponse = ReviewResponse(
    id = id,
    rating = rating,
    comment = comment,
    readDate = readDate.toString()
)

fun Book.toResponse(reviews: List<Review> = emptyList()): BookResponse = BookResponse(
    id = id,
    title = title,
    author = author,
    genre = genre,
    coverUrl = coverUrl,
    status = status,
    currentPage = currentPage,
    totalPage = totalPage,
    reviews = reviews.map { it.toResponse() }
)
