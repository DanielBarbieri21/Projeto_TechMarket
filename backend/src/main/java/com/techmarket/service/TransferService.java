package com.techmarket.service;

import com.techmarket.dto.TransferRequest;
import com.techmarket.dto.TransferResponse;
import com.techmarket.entity.Account;
import com.techmarket.entity.Transfer;
import com.techmarket.exception.AccountNotFoundException;
import com.techmarket.exception.InsufficientBalanceException;
import com.techmarket.repository.AccountRepository;
import com.techmarket.repository.TransferRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.Optional;

@Service
@Transactional
public class TransferService {
    
    @Autowired
    private AccountRepository accountRepository;
    
    @Autowired
    private TransferRepository transferRepository;
    
    public TransferResponse processTransfer(TransferRequest request) {
        // Verificar idempotência
        if (request.getIdempotencyKey() != null) {
            Optional<Transfer> existingTransfer = transferRepository.findByIdempotencyKey(request.getIdempotencyKey());
            if (existingTransfer.isPresent()) {
                Transfer transfer = existingTransfer.get();
                return new TransferResponse(
                    transfer.getCodigoUUID(),
                    "success",
                    transfer.getOrigemAccountId(),
                    transfer.getDestinoAccountId(),
                    transfer.getValor(),
                    transfer.getTimestamp()
                );
            }
        }
        
        // Validar contas existem
        Account origemAccount = accountRepository.findByIdWithLock(request.getOrigem())
            .orElseThrow(() -> new AccountNotFoundException("Conta de origem não encontrada: " + request.getOrigem()));
        
        Account destinoAccount = accountRepository.findByIdWithLock(request.getDestino())
            .orElseThrow(() -> new AccountNotFoundException("Conta de destino não encontrada: " + request.getDestino()));
        
        // Validar saldo suficiente
        if (origemAccount.getBalance().compareTo(request.getValor()) < 0) {
            throw new InsufficientBalanceException("Saldo insuficiente na conta de origem");
        }
        
        // Validar que não é a mesma conta
        if (request.getOrigem().equals(request.getDestino())) {
            throw new IllegalArgumentException("Conta de origem e destino não podem ser iguais");
        }
        
        // Executar transferência
        BigDecimal novoSaldoOrigem = origemAccount.getBalance().subtract(request.getValor());
        BigDecimal novoSaldoDestino = destinoAccount.getBalance().add(request.getValor());
        
        origemAccount.setBalance(novoSaldoOrigem);
        destinoAccount.setBalance(novoSaldoDestino);
        
        accountRepository.save(origemAccount);
        accountRepository.save(destinoAccount);
        
        // Criar registro da transferência
        Transfer transfer = new Transfer(
            request.getOrigem(),
            request.getDestino(),
            request.getValor(),
            request.getIdempotencyKey()
        );
        
        transfer = transferRepository.save(transfer);
        
        return new TransferResponse(
            transfer.getCodigoUUID(),
            "success",
            transfer.getOrigemAccountId(),
            transfer.getDestinoAccountId(),
            transfer.getValor(),
            transfer.getTimestamp()
        );
    }
}
