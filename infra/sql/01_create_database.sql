-- Script para criar o banco de dados TechMarket
-- Execute este script como superuser (postgres)

-- Criar banco de dados
CREATE DATABASE techmarket
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'Portuguese_Brazil.1252'
    LC_CTYPE = 'Portuguese_Brazil.1252'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

-- Conectar ao banco techmarket
\c techmarket;

-- Criar schema se não existir
CREATE SCHEMA IF NOT EXISTS public;

-- Comentário sobre o banco
COMMENT ON DATABASE techmarket IS 'Banco de dados para o sistema TechMarket - Transferências bancárias';
