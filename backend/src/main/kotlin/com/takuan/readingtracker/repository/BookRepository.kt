package com.takuan.readingtracker.repository

import com.takuan.readingtracker.entity.Book
import org.springframework.data.jpa.repository.JpaRepository

interface BookRepository : JpaRepository<Book, Long>
