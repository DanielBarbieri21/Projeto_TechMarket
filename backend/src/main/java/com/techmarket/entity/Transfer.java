package com.techmarket.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "transfers")
public class Transfer {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotNull(message = "Conta de origem é obrigatória")
    @Column(name = "origem_account_id", nullable = false)
    private Long origemAccountId;
    
    @NotNull(message = "Conta de destino é obrigatória")
    @Column(name = "destino_account_id", nullable = false)
    private Long destinoAccountId;
    
    @NotNull(message = "Valor é obrigatório")
    @Positive(message = "Valor deve ser positivo")
    @Column(name = "valor", nullable = false, precision = 19, scale = 2)
    private BigDecimal valor;
    
    @Column(name = "codigo_uuid", nullable = false, unique = true)
    private String codigoUUID;
    
    @Column(name = "timestamp", nullable = false)
    private LocalDateTime timestamp;
    
    @Column(name = "idempotency_key", unique = true)
    private String idempotencyKey;
    
    // Construtores
    public Transfer() {
        this.codigoUUID = UUID.randomUUID().toString();
        this.timestamp = LocalDateTime.now();
    }
    
    public Transfer(Long origemAccountId, Long destinoAccountId, BigDecimal valor) {
        this();
        this.origemAccountId = origemAccountId;
        this.destinoAccountId = destinoAccountId;
        this.valor = valor;
    }
    
    public Transfer(Long origemAccountId, Long destinoAccountId, BigDecimal valor, String idempotencyKey) {
        this(origemAccountId, destinoAccountId, valor);
        this.idempotencyKey = idempotencyKey;
    }
    
    // Getters e Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
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
    
    public String getCodigoUUID() {
        return codigoUUID;
    }
    
    public void setCodigoUUID(String codigoUUID) {
        this.codigoUUID = codigoUUID;
    }
    
    public LocalDateTime getTimestamp() {
        return timestamp;
    }
    
    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
    
    public String getIdempotencyKey() {
        return idempotencyKey;
    }
    
    public void setIdempotencyKey(String idempotencyKey) {
        this.idempotencyKey = idempotencyKey;
    }
}
