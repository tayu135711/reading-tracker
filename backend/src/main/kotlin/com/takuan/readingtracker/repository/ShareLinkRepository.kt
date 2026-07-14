package com.takuan.readingtracker.repository

import com.takuan.readingtracker.entity.ShareLink
import org.springframework.data.jpa.repository.JpaRepository

interface ShareLinkRepository : JpaRepository<ShareLink, String>
