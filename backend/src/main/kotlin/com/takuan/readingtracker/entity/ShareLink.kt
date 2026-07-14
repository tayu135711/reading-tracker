package com.takuan.readingtracker.entity

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.Id
import jakarta.persistence.Table
import java.time.LocalDateTime
import java.util.UUID

@Entity
@Table(name = "share_links")
data class ShareLink(
    @Id
    val uuid: String = UUID.randomUUID().toString(),

    @Column(name = "book_id")
    val bookId: Long = 0,

    val createdAt: LocalDateTime = LocalDateTime.now()
)
