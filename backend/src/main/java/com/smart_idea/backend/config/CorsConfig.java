package com.smart_idea.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

public class CorsConfig {
    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();

        config.addAllowedOrigin("http://localhost:5173"); // Allow all origins

        config.addAllowedMethod("*"); // Allow all HTTP methods

        config.addAllowedHeader("*"); // Allow all headers

        config.setAllowCredentials(true); // Allow credentials

        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }
}
