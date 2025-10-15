-- Script para criar as tabelas do sistema TechMarket
-- Execute este script conectado ao banco techmarket

-- Tabela de contas
CREATE TABLE IF NOT EXISTS accounts (
    id BIGSERIAL PRIMARY KEY,
    owner VARCHAR(255) NOT NULL,
    balance DECIMAL(19,2) NOT NULL DEFAULT 0.00,
    version BIGINT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de transferências
CREATE TABLE IF NOT EXISTS transfers (
    id BIGSERIAL PRIMARY KEY,
    origem_account_id BIGINT NOT NULL,
    destino_account_id BIGINT NOT NULL,
    valor DECIMAL(19,2) NOT NULL,
    codigo_uuid VARCHAR(255) NOT NULL UNIQUE,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    idempotency_key VARCHAR(255) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de transações (para o extrato)
CREATE TABLE IF NOT EXISTS transacoes (
    id BIGSERIAL PRIMARY KEY,
    account_id BIGINT NOT NULL,
    tipo VARCHAR(10) NOT NULL CHECK (tipo IN ('CREDIT', 'DEBIT')),
    valor DECIMAL(19,2) NOT NULL,
    data TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    descricao VARCHAR(500),
    transfer_id BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela para controle de idempotência
CREATE TABLE IF NOT EXISTS idempotency_keys (
    id BIGSERIAL PRIMARY KEY,
    key_value VARCHAR(255) NOT NULL UNIQUE,
    transfer_id BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_accounts_owner ON accounts(owner);
CREATE INDEX IF NOT EXISTS idx_transfers_origem ON transfers(origem_account_id);
CREATE INDEX IF NOT EXISTS idx_transfers_destino ON transfers(destino_account_id);
CREATE INDEX IF NOT EXISTS idx_transfers_timestamp ON transfers(timestamp);
CREATE INDEX IF NOT EXISTS idx_transacoes_account_id ON transacoes(account_id);
CREATE INDEX IF NOT EXISTS idx_transacoes_data ON transacoes(data);
CREATE INDEX IF NOT EXISTS idx_transacoes_tipo ON transacoes(tipo);

-- Comentários nas tabelas
COMMENT ON TABLE accounts IS 'Tabela de contas bancárias';
COMMENT ON TABLE transfers IS 'Tabela de transferências entre contas';
COMMENT ON TABLE transacoes IS 'Tabela de transações para extrato';
COMMENT ON TABLE idempotency_keys IS 'Tabela para controle de idempotência';

-- Comentários nas colunas principais
COMMENT ON COLUMN accounts.balance IS 'Saldo atual da conta';
COMMENT ON COLUMN transfers.codigo_uuid IS 'Código único da transferência';
COMMENT ON COLUMN transfers.idempotency_key IS 'Chave para controle de idempotência';
COMMENT ON COLUMN transacoes.tipo IS 'Tipo da transação: CREDIT ou DEBIT';
