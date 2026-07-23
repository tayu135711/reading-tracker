package com.takuan.readingtracker.repository

import com.takuan.readingtracker.entity.Book
import org.springframework.data.jpa.repository.JpaRepository

interface BookRepository : JpaRepository<Book, Long> {
    // 自分の本棚だけを取得
    fun findAllByOwnerId(ownerId: String): List<Book>

    // 自分の本棚の中の1冊だけを取得(他人の本のIDを指定してもnullになる)
    fun findByIdAndOwnerId(id: Long, ownerId: String): Book?
}
