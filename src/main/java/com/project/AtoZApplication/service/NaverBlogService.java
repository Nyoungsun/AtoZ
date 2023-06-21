package com.project.AtoZApplication.service;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.scheduling.annotation.Async;

import java.sql.Struct;
import java.util.List;
import java.util.concurrent.CompletableFuture;

public interface NaverBlogService {

    JSONObject searchNaverBlog(String text);
    List<String> crawlingNaverBlog(String responseBody);
    JSONArray clovaSentiment(List<String> contentsList);

}
