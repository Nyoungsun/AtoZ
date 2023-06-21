package com.project.AtoZApplication.controller;

import com.project.AtoZApplication.service.NaverBlogServiceImpl;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Async;
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

    @PostMapping("/search")
    public JSONObject searchNaverBlog(@RequestParam String text) {
        JSONObject responseBody = naverBlogServiceimpl.searchNaverBlog(text);
//        List<String> contentsList = naverBlogServiceimpl.crawlingNaverBlog(responseBody);
//        naverBlogServiceimpl.clovaSentiment(contentsList);

        System.out.println("클라이언트에 responseBody 전송");

        return responseBody;
    }
}
