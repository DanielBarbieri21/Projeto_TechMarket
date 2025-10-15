package com.techmarket.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class TransferResponse {
    
    private String codigo;
    private String status;
    private Long origemAccountId;
    private Long destinoAccountId;
    private BigDecimal valor;
    private LocalDateTime timestamp;
    
    // Construtores
    public TransferResponse() {}
    
    public TransferResponse(String codigo, String status, Long origemAccountId, Long destinoAccountId, BigDecimal valor, LocalDateTime timestamp) {
        this.codigo = codigo;
        this.status = status;
        this.origemAccountId = origemAccountId;
        this.destinoAccountId = destinoAccountId;
        this.valor = valor;
        this.timestamp = timestamp;
    }
    
    // Getters e Setters
    public String getCodigo() {
        return codigo;
    }
    
    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }
    
    public String getStatus() {
        return status;
    }
    
    public void setStatus(String status) {
        this.status = status;
    }
    
    public Long getOrigemAccountId() {
        return origemAccountId;
    }
    
    public void setOrigemAccountId(Long origemAccountId) {
        this.origemAccountId = origemAccountId;
    }
    
    public Long getDestinoAccountId() {
        return destinoAccountId;
    }
    
    public void setDestinoAccountId(Long destinoAccountId) {
        this.destinoAccountId = destinoAccountId;
    }
    
    public BigDecimal getValor() {
        return valor;
    }
    
    public void setValor(BigDecimal valor) {
        this.valor = valor;
    }
    
    public LocalDateTime getTimestamp() {
        return timestamp;
    }
    
    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
}
