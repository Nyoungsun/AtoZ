package com.project.healthywebsurfing;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.RequestEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

@RestController
public class OpenApiController {

//    @Value("${NAVER_CLIENT_ID}")
//    private String NAVER_CLIENT_ID;
//    @Value("${NAVER_CLIENT_SECRET")
//    private String NAVER_CLIENT_SECRET;

    @PostMapping("/search")
    public String searchText(@RequestParam String text) {

//        URI uri = UriComponentsBuilder
//                .fromUriString("https://openapi.naver.com")
//                .path("/v1/search/book.json")
//                .queryParam("query", text)
//                .queryParam("display", 10)
//                .queryParam("start", 1)
//                .queryParam("sort", "sim")
//                .encode()
//                .build()
//                .toUri();
//
//        RequestEntity<Void> req = RequestEntity
//                .get(uri)
//                .header("X-Naver-Client-Id", NAVER_CLIENT_ID)
//                .header("X-Naver-Client-Secret", NAVER_CLIENT_SECRET)
//                .build();

        System.out.println(text);

        return "OK";
    }
}