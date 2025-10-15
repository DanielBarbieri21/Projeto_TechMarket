package com.techmarket.exception;

public class DuplicateIdempotencyKeyException extends RuntimeException {
    
    public DuplicateIdempotencyKeyException(String message) {
        super(message);
    }
    
    public DuplicateIdempotencyKeyException(String message, Throwable cause) {
        super(message, cause);
    }
}
