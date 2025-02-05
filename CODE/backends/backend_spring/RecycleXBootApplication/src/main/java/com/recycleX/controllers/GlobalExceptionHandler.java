package com.recycleX.controllers;

import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.recycleX.models.ResponseStructure;


@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    public ResponseStructure handleException(Exception ex) {
        return ResponseStructure.onError(500, ex, ex.getMessage());
    }
}

