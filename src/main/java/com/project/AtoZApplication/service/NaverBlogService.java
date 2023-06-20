package com.project.AtoZApplication.service;

import org.springframework.scheduling.annotation.Async;

import java.sql.Struct;
import java.util.concurrent.CompletableFuture;

public interface NaverBlogService {

    String searchNaverBlog(String text);
    void crawlingNaverBlog(String responseBody);
}
