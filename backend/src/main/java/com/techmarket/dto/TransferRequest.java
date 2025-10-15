package com.techmarket.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import java.math.BigDecimal;

public class TransferRequest {
    
    @NotNull(message = "Conta de origem é obrigatória")
    private Long origem;
    
    @NotNull(message = "Conta de destino é obrigatória")
    private Long destino;
    
    @NotNull(message = "Valor é obrigatório")
    @Positive(message = "Valor deve ser positivo")
    private BigDecimal valor;
    
    private String idempotencyKey;
    
    // Construtores
    public TransferRequest() {}
    
    public TransferRequest(Long origem, Long destino, BigDecimal valor) {
        this.origem = origem;
        this.destino = destino;
        this.valor = valor;
    }
    
    public TransferRequest(Long origem, Long destino, BigDecimal valor, String idempotencyKey) {
        this.origem = origem;
        this.destino = destino;
        this.valor = valor;
        this.idempotencyKey = idempotencyKey;
    }
    
    // Getters e Setters
    public Long getOrigem() {
        return origem;
    }
    
    public void setOrigem(Long origem) {
        this.origem = origem;
    }
    
    public Long getDestino() {
        return destino;
    }
    
    public void setDestino(Long destino) {
        this.destino = destino;
    }
    
    public BigDecimal getValor() {
        return valor;
    }
    
    public void setValor(BigDecimal valor) {
        this.valor = valor;
    }
    
    public String getIdempotencyKey() {
        return idempotencyKey;
    }
    
    public void setIdempotencyKey(String idempotencyKey) {
        this.idempotencyKey = idempotencyKey;
    }
}
