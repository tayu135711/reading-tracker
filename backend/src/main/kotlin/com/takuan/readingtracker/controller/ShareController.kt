package com.takuan.readingtracker.controller

import com.takuan.readingtracker.dto.BookResponse
import com.takuan.readingtracker.dto.toResponse
import com.takuan.readingtracker.entity.ShareLink
import com.takuan.readingtracker.repository.BookRepository
import com.takuan.readingtracker.repository.ReviewRepository
import com.takuan.readingtracker.repository.ShareLinkRepository
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestHeader
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api")
class ShareController(
    private val shareLinkRepository: ShareLinkRepository,
    private val bookRepository: BookRepository,
    private val reviewRepository: ReviewRepository
) {

    // 「おすすめリンク」発行 = 装備を人に見せるためのURLを生成する(自分の本棚の本だけ発行できる)
    @PostMapping("/books/{id}/share")
    fun createShareLink(
        @PathVariable id: Long,
        @RequestHeader("X-Session-Id") ownerId: String
    ): ResponseEntity<Map<String, String>> {
        if (bookRepository.findByIdAndOwnerId(id, ownerId) == null) return ResponseEntity.notFound().build()
        val link = shareLinkRepository.save(ShareLink(bookId = id))
        return ResponseEntity.ok(mapOf("uuid" to link.uuid))
    }

    // 認証なしで誰でも見れる公開ビュー(友達が踏むリンク先)
    @GetMapping("/share/{uuid}")
    fun getSharedBook(@PathVariable uuid: String): ResponseEntity<BookResponse> {
        val link = shareLinkRepository.findById(uuid).orElse(null)
            ?: return ResponseEntity.notFound().build()
        val book = bookRepository.findById(link.bookId).orElse(null)
            ?: return ResponseEntity.notFound().build()
        return ResponseEntity.ok(book.toResponse(reviewRepository.findByBookId(link.bookId)))
    }
}
