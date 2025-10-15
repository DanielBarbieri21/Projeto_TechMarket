package com.techmarket;

import com.techmarket.dto.TransferRequest;
import com.techmarket.entity.Account;
import com.techmarket.exception.AccountNotFoundException;
import com.techmarket.exception.InsufficientBalanceException;
import com.techmarket.repository.AccountRepository;
import com.techmarket.repository.TransferRepository;
import com.techmarket.service.TransferService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class TransferServiceTest {
    
    @Mock
    private AccountRepository accountRepository;
    
    @Mock
    private TransferRepository transferRepository;
    
    @InjectMocks
    private TransferService transferService;
    
    private Account origemAccount;
    private Account destinoAccount;
    private TransferRequest transferRequest;
    
    @BeforeEach
    void setUp() {
        origemAccount = new Account("João Silva", new BigDecimal("1000.00"));
        origemAccount.setId(1L);
        
        destinoAccount = new Account("Maria Santos", new BigDecimal("500.00"));
        destinoAccount.setId(2L);
        
        transferRequest = new TransferRequest(1L, 2L, new BigDecimal("100.00"));
    }
    
    @Test
    void testTransferSuccess() {
        // Given
        when(accountRepository.findByIdWithLock(1L)).thenReturn(Optional.of(origemAccount));
        when(accountRepository.findByIdWithLock(2L)).thenReturn(Optional.of(destinoAccount));
        when(transferRepository.save(any())).thenAnswer(invocation -> invocation.getArgument(0));
        
        // When
        var response = transferService.processTransfer(transferRequest);
        
        // Then
        assertNotNull(response);
        assertEquals("success", response.getStatus());
        assertEquals(new BigDecimal("100.00"), response.getValor());
        assertEquals(1L, response.getOrigemAccountId());
        assertEquals(2L, response.getDestinoAccountId());
        
        verify(accountRepository, times(2)).save(any());
        verify(transferRepository, times(1)).save(any());
    }
    
    @Test
    void testTransferAccountNotFound() {
        // Given
        when(accountRepository.findByIdWithLock(1L)).thenReturn(Optional.empty());
        
        // When & Then
        assertThrows(AccountNotFoundException.class, () -> {
            transferService.processTransfer(transferRequest);
        });
    }
    
    @Test
    void testTransferInsufficientBalance() {
        // Given
        transferRequest.setValor(new BigDecimal("1500.00")); // Mais que o saldo disponível
        when(accountRepository.findByIdWithLock(1L)).thenReturn(Optional.of(origemAccount));
        when(accountRepository.findByIdWithLock(2L)).thenReturn(Optional.of(destinoAccount));
        
        // When & Then
        assertThrows(InsufficientBalanceException.class, () -> {
            transferService.processTransfer(transferRequest);
        });
    }
}
