package com.project.AtoZApplication.controller;

import com.project.AtoZApplication.service.NaverBlogServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MySentimentController {

    @Autowired
    private NaverBlogServiceImpl naverBlogServiceImpl;

    @GetMapping("/GetMySentiment")
    public ResponseEntity<String> mySentiment(@RequestParam String text) {

        return naverBlogServiceImpl.mySentiment(text);
    }
}
