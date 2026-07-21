package com.takuan.readingtracker.controller

import com.takuan.readingtracker.dto.BookRequest
import com.takuan.readingtracker.dto.BookResponse
import com.takuan.readingtracker.dto.ProgressRequest
import com.takuan.readingtracker.dto.ReviewRequest
import com.takuan.readingtracker.dto.StatusRequest
import com.takuan.readingtracker.dto.toResponse
import com.takuan.readingtracker.entity.Book
import com.takuan.readingtracker.entity.Review
import com.takuan.readingtracker.repository.BookRepository
import com.takuan.readingtracker.repository.ReviewRepository
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PatchMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/books")
class BookController(
    private val bookRepository: BookRepository,
    private val reviewRepository: ReviewRepository
) {

    // 一覧取得
    @GetMapping
    fun getAll(): List<BookResponse> =
        bookRepository.findAll().map { book ->
            book.toResponse(reviewRepository.findByBookId(book.id))
        }

    // 1冊取得
    @GetMapping("/{id}")
    fun getOne(@PathVariable id: Long): ResponseEntity<BookResponse> {
        val book = bookRepository.findById(id).orElse(null)
            ?: return ResponseEntity.notFound().build()
        return ResponseEntity.ok(book.toResponse(reviewRepository.findByBookId(id)))
    }

    // 登録
    @PostMapping
    fun create(@RequestBody req: BookRequest): ResponseEntity<BookResponse> {
        val saved = bookRepository.save(
            Book(
                title = req.title,
                author = req.author,
                genre = req.genre,
                coverUrl = req.coverUrl,
                status = req.status,
                currentPage = req.currentPage,
                totalPage = req.totalPage
            )
        )
        return ResponseEntity.status(HttpStatus.CREATED).body(saved.toResponse())
    }

    // 更新
    @PutMapping("/{id}")
    fun update(@PathVariable id: Long, @RequestBody req: BookRequest): ResponseEntity<BookResponse> {
        if (!bookRepository.existsById(id)) return ResponseEntity.notFound().build()
        val updated = bookRepository.save(
            Book(
                id = id,
                title = req.title,
                author = req.author,
                genre = req.genre,
                coverUrl = req.coverUrl,
                status = req.status,
                currentPage = req.currentPage,
                totalPage = req.totalPage
            )
        )
        return ResponseEntity.ok(updated.toResponse(reviewRepository.findByBookId(id)))
    }

    // 読書中の進捗(ページ数)だけを更新する
    @PatchMapping("/{id}/progress")
    fun updateProgress(@PathVariable id: Long, @RequestBody req: ProgressRequest): ResponseEntity<BookResponse> {
        val book = bookRepository.findById(id).orElse(null)
            ?: return ResponseEntity.notFound().build()
        val updated = bookRepository.save(
            book.copy(currentPage = req.currentPage, totalPage = req.totalPage)
        )
        return ResponseEntity.ok(updated.toResponse(reviewRepository.findByBookId(id)))
    }

    // ステータス(未読/読書中/読了)だけを更新する
    @PatchMapping("/{id}/status")
    fun updateStatus(@PathVariable id: Long, @RequestBody req: StatusRequest): ResponseEntity<BookResponse> {
        val book = bookRepository.findById(id).orElse(null)
            ?: return ResponseEntity.notFound().build()
        val updated = bookRepository.save(book.copy(status = req.status))
        return ResponseEntity.ok(updated.toResponse(reviewRepository.findByBookId(id)))
    }

    // 削除
    @DeleteMapping("/{id}")
    fun delete(@PathVariable id: Long): ResponseEntity<Void> {
        if (!bookRepository.existsById(id)) return ResponseEntity.notFound().build()
        bookRepository.deleteById(id)
        return ResponseEntity.noContent().build()
    }

    // 感想を追加
    @PostMapping("/{id}/reviews")
    fun addReview(@PathVariable id: Long, @RequestBody req: ReviewRequest): ResponseEntity<BookResponse> {
        val book = bookRepository.findById(id).orElse(null)
            ?: return ResponseEntity.notFound().build()
        reviewRepository.save(
            Review(bookId = id, rating = req.rating, comment = req.comment)
        )
        return ResponseEntity.status(HttpStatus.CREATED)
            .body(book.toResponse(reviewRepository.findByBookId(id)))
    }
}
