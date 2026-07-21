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

        // OpenBDは書影が無い場合など、値が無い項目をnullではなく空文字列で返してくることがある。
        // 空文字列をそのままフロントに渡すと <img src=""> のような壊れた表示になってしまうため、
        // ここで空文字列はnullに正規化しておく。
        // (書影は2023年のOpenBD方針変更以降、ホワイトリストに入っていない出版社の分は
        //  そもそも返ってこない。表紙が無い本があるのは仕様として受け入れる)
        fun String?.orNullIfBlank(): String? = this?.takeIf { it.isNotBlank() }

        val title = summary?.title.orNullIfBlank()

        return if (summary == null || title == null) {
            ResponseEntity.ok(BookLookupResponse(found = false))
        } else {
            ResponseEntity.ok(
                BookLookupResponse(
                    found = true,
                    title = title,
                    author = summary.author.orNullIfBlank(),
                    coverUrl = summary.cover.orNullIfBlank(),
                    publisher = summary.publisher.orNullIfBlank()
                )
            )
        }
    }
}
