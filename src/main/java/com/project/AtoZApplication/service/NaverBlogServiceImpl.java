package com.project.AtoZApplication.service;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

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

    @Value("${NAVER_CLIENT_ID}")
    public String NAVER_CLIENT_ID;
    @Value("${NAVER_CLIENT_SECRET}")
    public String NAVER_CLIENT_SECRET;

    public String searchNaverBlog(String text) {
        try {
            text = URLEncoder.encode(text, "UTF-8");
        } catch (UnsupportedEncodingException e) {
            throw new RuntimeException("검색어 인코딩 실패", e);
        }

        String apiURL = "https://openapi.naver.com/v1/search/blog?query=" + text + "&display=" + 100;

        Map<String, String> requestHeaders = new HashMap<>();
        requestHeaders.put("X-Naver-Client-Id", NAVER_CLIENT_ID);
        requestHeaders.put("X-Naver-Client-Secret", NAVER_CLIENT_SECRET);

        String responseBody = get(apiURL, requestHeaders);

        return responseBody;
    }

    private static String get(String apiUrl, Map<String, String> requestHeaders) {
        HttpURLConnection con = connect(apiUrl);
        try {
            con.setRequestMethod("GET");
            for (Map.Entry<String, String> header : requestHeaders.entrySet()) {
                con.setRequestProperty(header.getKey(), header.getValue());
            }

            int responseCode = con.getResponseCode();
            if (responseCode == HttpURLConnection.HTTP_OK) { // 정상 호출
                return readBody(con.getInputStream());
            } else { // 오류 발생
                return readBody(con.getErrorStream());
            }
        } catch (IOException e) {
            throw new RuntimeException("API 요청과 응답 실패", e);
        } finally {
            con.disconnect();
        }
    }

    private static HttpURLConnection connect(String apiUrl) {
        try {
            URL url = new URL(apiUrl);
            return (HttpURLConnection) url.openConnection();
        } catch (MalformedURLException e) {
            throw new RuntimeException("API URL이 잘못되었습니다. : " + apiUrl, e);
        } catch (IOException e) {
            throw new RuntimeException("연결이 실패했습니다. : " + apiUrl, e);
        }
    }

    private static String readBody(InputStream body) {
        InputStreamReader streamReader = new InputStreamReader(body);

        try (BufferedReader lineReader = new BufferedReader(streamReader)) {
            StringBuilder responseBody = new StringBuilder();

            String line;
            while ((line = lineReader.readLine()) != null) {
                responseBody.append(line);
            }

            return responseBody.toString();
        } catch (IOException e) {
            throw new RuntimeException("API 응답을 읽는 데 실패했습니다.", e);
        }
    }

    public void crawlingNaverBlog(String responseBody) {
        //responseBody에서 link만 추출하여 저장
        JSONParser parser = new JSONParser();
        JSONObject object;
        try {
            object = (JSONObject) parser.parse(responseBody);
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }

        JSONArray items = (JSONArray) object.get("items");
        List<String> contentsList = new ArrayList<>();

        ExecutorService executorService = Executors.newFixedThreadPool(10); // Adjust the number of threads as per your requirements
        List<Future<String>> futures = new ArrayList<>();


        for (int i = 0; i < items.size(); i++) {
            JSONObject element = (JSONObject) items.get(i);
            String url = (String) element.get("link");

            Future<String> future = executorService.submit(() -> {
                try {
                    Document document = Jsoup.connect(url)
                            .userAgent("Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36")
                            .get();
                    Elements iframes = document.select("iframe#mainFrame");
                    String src = iframes.attr("src");
                    String realUrl = "http://blog.naver.com" + src;

                    Thread.sleep(2000);

                    Document realDocument = Jsoup.connect(realUrl).get();
                    Elements blogElement = realDocument.select("div.se-component.se-text.se-l-default");
                    if (blogElement.isEmpty()) {
                        blogElement = realDocument.select("div.post-view");
                    }
                    String contents = blogElement.text();
                    contents = contents.replaceAll("[^ㄱ-ㅎㅏ-ㅣ가-힣0-9,. ]", "");
                    contents = contents.replaceAll("\\s+", " ");
                    if (contents.length() > 1000) {
                        contents = contents.substring(0, 1000);
                    }
                    return contents;
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
                System.out.println(contents);
            }

            System.out.println("fin");
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException(e);
        }
    }
}


