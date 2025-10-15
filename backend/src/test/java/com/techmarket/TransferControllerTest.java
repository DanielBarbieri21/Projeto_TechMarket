package com.techmarket;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.techmarket.dto.TransferRequest;
import com.techmarket.entity.Account;
import com.techmarket.repository.AccountRepository;
import com.techmarket.repository.TransferRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureWebMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.WebApplicationContext;

import java.math.BigDecimal;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureWebMvc
@ActiveProfiles("test")
@Transactional
class TransferControllerTest {
    
    @Autowired
    private WebApplicationContext webApplicationContext;
    
    @Autowired
    private AccountRepository accountRepository;
    
    @Autowired
    private TransferRepository transferRepository;
    
    private MockMvc mockMvc;
    private ObjectMapper objectMapper;
    
    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
        objectMapper = new ObjectMapper();
        
        // Criar contas de teste
        Account origem = new Account("João Silva", new BigDecimal("1000.00"));
        Account destino = new Account("Maria Santos", new BigDecimal("500.00"));
        
        accountRepository.save(origem);
        accountRepository.save(destino);
    }
    
    @Test
    void testTransferSuccess() throws Exception {
        TransferRequest request = new TransferRequest(1L, 2L, new BigDecimal("100.00"));
        
        mockMvc.perform(post("/api/transferencias")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("success"))
                .andExpect(jsonPath("$.valor").value(100.00))
                .andExpect(jsonPath("$.origemAccountId").value(1))
                .andExpect(jsonPath("$.destinoAccountId").value(2))
                .andExpect(jsonPath("$.codigo").exists());
    }
    
    @Test
    void testTransferInsufficientBalance() throws Exception {
        TransferRequest request = new TransferRequest(1L, 2L, new BigDecimal("1500.00"));
        
        mockMvc.perform(post("/api/transferencias")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.error").value("Insufficient balance"));
    }
    
    @Test
    void testTransferAccountNotFound() throws Exception {
        TransferRequest request = new TransferRequest(999L, 2L, new BigDecimal("100.00"));
        
        mockMvc.perform(post("/api/transferencias")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.error").value("Account not found"));
    }
    
    @Test
    void testTransferValidationError() throws Exception {
        TransferRequest request = new TransferRequest(1L, 2L, new BigDecimal("-100.00"));
        
        mockMvc.perform(post("/api/transferencias")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.error").value("Validation failed"));
    }
}
