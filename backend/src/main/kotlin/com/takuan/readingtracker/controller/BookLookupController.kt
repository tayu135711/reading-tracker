package com.takuan.readingtracker.controller

import com.takuan.readingtracker.dto.BookLookupResponse
import com.takuan.readingtracker.dto.OpenBdItem
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.client.RestTemplate

@RestController
@RequestMapping("/api/books")
class BookLookupController(
    private val restTemplate: RestTemplate
) {

    // ISBNを打つと、OpenBDから本の情報(タイトル・著者・表紙画像)を自動取得する
    @GetMapping("/lookup")
    fun lookupByIsbn(@RequestParam isbn: String): ResponseEntity<BookLookupResponse> {
        val cleanIsbn = isbn.replace("-", "").trim()
        val url = "https://api.openbd.jp/v1/get?isbn=$cleanIsbn"

        val result = try {
            restTemplate.getForObject(url, Array<OpenBdItem?>::class.java)
        } catch (e: Exception) {
            null
        }

        val item = result?.firstOrNull()
        val summary = item?.summary

        return if (summary == null || summary.title == null) {
            ResponseEntity.ok(BookLookupResponse(found = false))
        } else {
            ResponseEntity.ok(
                BookLookupResponse(
                    found = true,
                    title = summary.title,
                    author = summary.author,
                    coverUrl = summary.cover,
                    publisher = summary.publisher
                )
            )
        }
    }
}
