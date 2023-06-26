package com.project.AtoZApplication.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.*;

@Service
public class NaverBlogServiceImpl implements NaverBlogService {

    @Value("${X_Naver_Client_Id}")
    private String X_Naver_Client_Id;
    @Value("${X_Naver_Client_Secret}")
    private String X_Naver_Client_Secret;

    @Value("${X_NCP_APIGW_API_KEY_ID}")
    private String X_NCP_APIGW_API_KEY_ID;
    @Value("${X_NCP_APIGW_API_KEY}")
    private String X_NCP_APIGW_API_KEY;

    public JSONObject searchNaverBlog(String query, int start) {
        System.out.println("검색어: " + query + ", start: " + start);
        RestTemplate restTemplate = new RestTemplate();
        String apiURL = "https://openapi.naver.com/v1/search/blog?query=" + query + "&display=" + 10 + "&start=" + start +  "&sort=sim" ;

        HttpHeaders headers = new HttpHeaders(); //요청 헤더
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("X-Naver-Client-Id", X_Naver_Client_Id);
        headers.set("X-Naver-Client-Secret", X_Naver_Client_Secret);

        HttpEntity<Map<String, String>> request = new HttpEntity<>(headers);
        ResponseEntity<String> responseBody = restTemplate.exchange(apiURL, HttpMethod.GET, request, String.class);

        JSONObject responseJSON = null;
        if (responseBody.getStatusCode().is2xxSuccessful()) {
            String responseStr = responseBody.getBody();
            JSONParser parser = new JSONParser();
            try {
                 responseJSON = (JSONObject) parser.parse(responseStr); //JSONObject로 변환

            } catch (ParseException e) {
                throw new RuntimeException(e);
            }
        }

        return responseJSON;
    }

    public List<String> crawlingNaverBlog(JSONObject responseBody) {
        JSONArray items = (JSONArray) responseBody.get("items"); //items 필드만 추출하여 JSONArray로 변환

        List<String> contentsList = new ArrayList<>(); //itmes의 link들을 저장할 배열 생성

        ExecutorService executorService = Executors.newFixedThreadPool(10); // 스레드를 이용한 병렬처리
        List<Future<String>> futures = new ArrayList<>();

        for (int i = 0; i < items.size(); i++) {
            JSONObject element = (JSONObject) items.get(i); //items(JSONArray) 하나씩 추출
            String url = (String) element.get("link"); //그 안에서 link 필드만 추출

            Future<String> future = executorService.submit(() -> {
                try {
                    Document document = Jsoup.connect(url).get();
                    Elements iframes = document.select("iframe#mainFrame");
                    String src = iframes.attr("src");
                    String realUrl = "http://blog.naver.com" + src;

                    Document realDocument = Jsoup.connect(realUrl).get();
                    Elements blogContent = realDocument.select("div.se-component.se-text.se-l-default");

                    if (blogContent.isEmpty()) {
                        blogContent = realDocument.select("div.post-view");
                    }

                    String content = blogContent.text();

                    content = content.replaceAll("[^ㄱ-ㅎㅏ-ㅣ가-힣0-9,. ]", "");
                    content = content.replaceAll("\\s+", " ");
                    content = content.trim();

                    if (content.length() > 1000) {
                        content = content.substring(0, 1000);
                    }

                    return content;

                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            });

            futures.add(future);
        }

        executorService.shutdown();

        try {
            executorService.awaitTermination(Long.MAX_VALUE, TimeUnit.NANOSECONDS);

            for (Future<String> future : futures) {
                String contents = future.get();
                contentsList.add(contents);
            }
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException(e);
        }
        return contentsList;
    }

    @Override
    public JSONArray clovaSentiment(List<String> contetnsList) {
        JSONArray jsonArray = new JSONArray();
        JSONObject jsonObj = new JSONObject();

        String text;
        for (int i = 0; i < contetnsList.size(); i++) {
            if (contetnsList.get(i).isEmpty()) {
                text = "중립";
            } else {
                text = contetnsList.get(i);
            }

            String apiURL = "https://naveropenapi.apigw.ntruss.com/sentiment-analysis/v1/analyze";

            RestTemplate restTemplate = new RestTemplate();

            HttpHeaders headers = new HttpHeaders(); //요청 헤더
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.set("X-NCP-APIGW-API-KEY-ID", X_NCP_APIGW_API_KEY_ID);
            headers.set("X-NCP-APIGW-API-KEY", X_NCP_APIGW_API_KEY);

            Map<String, String> content = new HashMap<>(); //요청 바디
            content.put("content", text);

            HttpEntity<Map<String, String>> request = new HttpEntity<>(content, headers);
            ResponseEntity<String> response = restTemplate.exchange(apiURL, HttpMethod.POST, request, String.class);

            if (response.getStatusCode().is2xxSuccessful()) {
                String responseBody = response.getBody();

                ObjectMapper objectMapper = new ObjectMapper();
                try {
                    Map<String, Object> responseMap = objectMapper.readValue(responseBody, Map.class); //responsBody에서 document필드만 추출하기 위해 파싱
                    Map<String, Object> document = (Map<String, Object>) responseMap.get("document");  //document필드만 추출
                    String sentiment = (String) document.get("sentiment");                             //document필드의 sentiment값 추출 (감정분석 결과)

                    Map<String, Object> confidence = (Map<String, Object>) document.get("confidence"); //document필드의 confidence필드 추출(neutral, positive, negative)

                    jsonObj.put("sentiment", sentiment);
                    jsonObj.put("confidence", confidence);
                    jsonArray.add(jsonObj);

                } catch (Exception e) {
                    e.printStackTrace();
                }
            }//if
        }//for

        return jsonArray;
    }
}



