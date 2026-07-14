package com.takuan.readingtracker.entity

import jakarta.persistence.Entity
import jakarta.persistence.EnumType
import jakarta.persistence.Enumerated
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.Table

enum class BookStatus {
    UNREAD,   // 未読(積んでる)
    READING,  // 読書中
    FINISHED  // 読了
}

@Entity
@Table(name = "books")
data class Book(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    val title: String = "",
    val author: String = "",
    val genre: String = "",
    val coverUrl: String? = null,

    @Enumerated(EnumType.STRING)
    val status: BookStatus = BookStatus.UNREAD
)
