package com.example.taskapi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
@SpringBootApplication
public class TaskManagerApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(TaskManagerApiApplication.class, args);
	}
	@Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
        @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                    .allowedOrigins("*")  // You can restrict this to "http://127.0.0.1:3000" if needed
                    .allowedMethods("*");
            }
        };
    }

}
