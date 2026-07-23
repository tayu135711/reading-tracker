package com.takuan.readingtracker.entity

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.EnumType
import jakarta.persistence.Enumerated
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.Index
import jakarta.persistence.Table

enum class BookStatus {
    UNREAD,   // 未読(積んでる)
    READING,  // 読書中
    FINISHED  // 読了
}

@Entity
@Table(name = "books", indexes = [Index(name = "idx_books_owner_id", columnList = "owner_id")])
data class Book(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    // 端末ごとに自動発行されるセッションID(X-Session-Idヘッダー由来)。これで本棚を持ち主ごとに分離する。
    @Column(name = "owner_id", nullable = false)
    val ownerId: String = "",

    val title: String = "",
    val author: String = "",
    val genre: String = "",
    val coverUrl: String? = null,

    @Enumerated(EnumType.STRING)
    val status: BookStatus = BookStatus.UNREAD,

    // 読書中の進捗(ページ数)。読了・未読の本ではnullのままでよい。
    val currentPage: Int? = null,
    val totalPage: Int? = null
)
