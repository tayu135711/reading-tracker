package com.takuan.readingtracker.entity

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.Table
import java.time.LocalDate

@Entity
@Table(name = "reviews")
data class Review(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    @Column(name = "book_id")
    val bookId: Long = 0,

    val rating: Int = 0, // 1〜5
    val comment: String = "",
    val readDate: LocalDate = LocalDate.now()
)
