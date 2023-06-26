package com.project.AtoZApplication.controller;

import com.project.AtoZApplication.service.NaverBlogServiceImpl;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Async;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

@RestController
public class NaverBlogController {

    @Autowired
    private NaverBlogServiceImpl naverBlogServiceimpl;

    @GetMapping("/search")
    public JSONObject searchNaverBlog(@RequestParam String query, int start) {
        JSONObject responseBody = naverBlogServiceimpl.searchNaverBlog(query, start);
        List<String> contentsList = naverBlogServiceimpl.crawlingNaverBlog(responseBody);
        JSONArray sentiment = naverBlogServiceimpl.clovaSentiment(contentsList);


        JSONArray items = (JSONArray) responseBody.get("items");

        for (int i = 0; i < items.size(); i++) {
            JSONObject item = (JSONObject) items.get(i);
            JSONObject senti = (JSONObject) sentiment.get(i);

            String sentStr = (String) senti.get("sentiment");
            Map<String, String> confidence = (Map<String, String>) senti.get("confidence");
            item.put("sentiment", sentStr);
            item.put("confidence", confidence);
        }

        responseBody.replace("items", items);

        return responseBody;
    }
}
