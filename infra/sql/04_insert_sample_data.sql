-- Script para inserir dados de exemplo
-- Execute este script conectado ao banco techmarket

-- Inserir contas de exemplo
INSERT INTO accounts (owner, balance) VALUES 
('João Silva', 2000.00),
('Maria Santos', 1500.00),
('Pedro Oliveira', 3000.00),
('Ana Costa', 800.00),
('Carlos Ferreira', 2500.00);

-- Inserir algumas transações de exemplo
INSERT INTO transacoes (account_id, tipo, valor, data, descricao) VALUES 
(1, 'CREDIT', 2000.00, '2025-01-01 10:00:00', 'Depósito inicial'),
(2, 'CREDIT', 1500.00, '2025-01-01 10:30:00', 'Depósito inicial'),
(3, 'CREDIT', 3000.00, '2025-01-01 11:00:00', 'Depósito inicial'),
(4, 'CREDIT', 800.00, '2025-01-01 11:30:00', 'Depósito inicial'),
(5, 'CREDIT', 2500.00, '2025-01-01 12:00:00', 'Depósito inicial'),
(1, 'DEBIT', 100.00, '2025-01-02 14:00:00', 'Compra no supermercado'),
(2, 'DEBIT', 50.00, '2025-01-02 15:00:00', 'Pagamento de conta'),
(3, 'CREDIT', 500.00, '2025-01-03 09:00:00', 'Depósito de salário'),
(4, 'DEBIT', 200.00, '2025-01-03 10:00:00', 'Transferência para poupança'),
(5, 'DEBIT', 300.00, '2025-01-03 11:00:00', 'Pagamento de aluguel'),
(1, 'CREDIT', 6000.00, '2025-01-04 08:00:00', 'Transferência recebida'),
(2, 'DEBIT', 75.00, '2025-01-04 09:00:00', 'Compra online'),
(3, 'DEBIT', 1200.00, '2025-01-04 10:00:00', 'Pagamento de financiamento'),
(4, 'CREDIT', 150.00, '2025-01-05 14:00:00', 'Cashback'),
(5, 'DEBIT', 450.00, '2025-01-05 15:00:00', 'Compra de eletrônicos');

-- Verificar os dados inseridos
SELECT 'Contas criadas:' as info;
SELECT id, owner, balance FROM accounts ORDER BY id;

SELECT 'Transações inseridas:' as info;
SELECT id, account_id, tipo, valor, data, descricao FROM transacoes ORDER BY data DESC LIMIT 10;
