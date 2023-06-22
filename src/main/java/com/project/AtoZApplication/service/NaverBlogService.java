package com.project.AtoZApplication.service;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Async;

import java.sql.Struct;
import java.util.List;
import java.util.concurrent.CompletableFuture;

public interface NaverBlogService {

    Object searchNaverBlog(String text, int start);
    List<String> crawlingNaverBlog(String responseBody);
    JSONArray clovaSentiment(List<String> contentsList);

}
