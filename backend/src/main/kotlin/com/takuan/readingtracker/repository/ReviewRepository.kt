package com.takuan.readingtracker.repository

import com.takuan.readingtracker.entity.Review
import org.springframework.data.jpa.repository.JpaRepository

interface ReviewRepository : JpaRepository<Review, Long> {
    fun findByBookId(bookId: Long): List<Review>
}
