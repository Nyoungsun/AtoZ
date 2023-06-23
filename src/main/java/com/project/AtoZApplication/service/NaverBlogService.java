package com.project.AtoZApplication.service;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Async;

import java.sql.Struct;
import java.util.List;
import java.util.concurrent.CompletableFuture;

public interface NaverBlogService {

    ResponseEntity<String> searchNaverBlog(String query, int start);
    List<String> crawlingNaverBlog(ResponseEntity<String> responseBody);
    JSONArray clovaSentiment(List<String> contentsList);

}
