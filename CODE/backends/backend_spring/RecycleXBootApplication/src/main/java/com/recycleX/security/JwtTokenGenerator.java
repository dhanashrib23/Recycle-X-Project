//package com.recycleX.security;
//import io.jsonwebtoken.Jwts;
//import io.jsonwebtoken.SignatureAlgorithm;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.stereotype.Component;
//
//import java.util.Map;
//
//
//@Component
//public class JwtTokenGenerator {
//	@Value("${jwt.secret}")
//    private String secret;
//
//    // Generate token
//    public String generateToken(Map<String, Object> payload) {
//        return Jwts.builder()
//                .setClaims(payload) 
//                .signWith(SignatureAlgorithm.HS256, secret) 
//                .compact();
//    }
//}
//
//
