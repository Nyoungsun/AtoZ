package com.project.AtoZApplication.controller;

import com.project.AtoZApplication.service.NaverBlogServiceImpl;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Async;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

@RestController
public class NaverBlogController {

    @Autowired
    private NaverBlogServiceImpl naverBlogServiceimpl;

    @GetMapping("/search")
    public ResponseEntity<String> searchNaverBlog(@RequestParam String query, int start) {
        ResponseEntity<String> responseBody = naverBlogServiceimpl.searchNaverBlog(query, start);
//        List<String> contentsList = naverBlogServiceimpl.crawlingNaverBlog(responseBody);
//        naverBlogServiceimpl.clovaSentiment(contentsList);

        return responseBody;
    }
}
