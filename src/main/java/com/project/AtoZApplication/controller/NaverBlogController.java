package com.project.AtoZApplication.controller;

import com.project.AtoZApplication.service.NaverBlogServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

@RestController
public class NaverBlogController {

    @Autowired
    private NaverBlogServiceImpl naverBlogServiceimpl;

    @PostMapping("/search")
    public String searchNaverBlog(@RequestParam String text) throws ExecutionException, InterruptedException {
        String responseBody = naverBlogServiceimpl.searchNaverBlog(text);
        naverBlogServiceimpl.crawlingNaverBlog(responseBody);
        System.out.println("Hi");

        return responseBody;
    }
}
