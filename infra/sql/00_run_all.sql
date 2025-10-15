-- Script principal para executar todos os scripts SQL
-- Execute este script como superuser (postgres)

-- 1. Criar banco de dados
\i 01_create_database.sql

-- 2. Conectar ao banco techmarket
\c techmarket;

-- 3. Criar tabelas
\i 02_create_tables.sql

-- 4. Criar funções e triggers
\i 03_create_function.sql

-- 5. Inserir dados de exemplo
\i 04_insert_sample_data.sql

-- 6. Testar função
\i 05_test_function.sql

-- Mensagem de sucesso
SELECT 'Setup do banco de dados TechMarket concluído com sucesso!' as status;
