package com.techmarket.controller;

import com.techmarket.dto.TransferRequest;
import com.techmarket.dto.TransferResponse;
import com.techmarket.service.TransferService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class TransferController {
    
    @Autowired
    private TransferService transferService;
    
    @PostMapping("/transferencias")
    public ResponseEntity<TransferResponse> createTransfer(@Valid @RequestBody TransferRequest request) {
        try {
            TransferResponse response = transferService.processTransfer(request);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            // Em um cenário real, você usaria um GlobalExceptionHandler
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }
}
