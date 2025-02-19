package com.recycleX.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
public class SecurityConfig {

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        
        // Make sure to allow the correct frontend origin
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000")); // React frontend
        
        // Allow all necessary HTTP methods
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
        
        // Allow headers for authentication and content processing
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type", "X-Requested-With"));
        
        // Allow frontend to access authentication headers
        configuration.setExposedHeaders(Arrays.asList("Authorization"));
        
        // Enable credentials (important for session cookies or tokens)
        configuration.setAllowCredentials(true);
        
        // Cache the CORS config for performance
        configuration.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
            .cors().configurationSource(corsConfigurationSource()) // Apply CORS settings
            .and()
            .csrf().disable() // Disable CSRF for testing (enable in production)
            .authorizeRequests()
            .antMatchers("/admin/**").permitAll() // Allow unrestricted access to admin APIs
            .anyRequest().authenticated() // Require authentication for other requests
            .and()
            .formLogin().disable()
            .httpBasic().disable()
            .build();
    }
}