-- Script para testar a função get_saldo_e_transacoes
-- Execute este script conectado ao banco techmarket

-- Teste 1: Saldo e transações da conta 1 (João Silva) no período de 2025-01-01 a 2025-01-31
SELECT 'Teste 1 - Conta 1 (João Silva) - Período: 2025-01-01 a 2025-01-31' as teste;
SELECT * FROM public.get_saldo_e_transacoes(1, '2025-01-01', '2025-01-31');

-- Teste 2: Saldo e transações da conta 2 (Maria Santos) no período de 2025-01-01 a 2025-01-31
SELECT 'Teste 2 - Conta 2 (Maria Santos) - Período: 2025-01-01 a 2025-01-31' as teste;
SELECT * FROM public.get_saldo_e_transacoes(2, '2025-01-01', '2025-01-31');

-- Teste 3: Saldo e transações da conta 3 (Pedro Oliveira) no período de 2025-01-01 a 2025-01-31
SELECT 'Teste 3 - Conta 3 (Pedro Oliveira) - Período: 2025-01-01 a 2025-01-31' as teste;
SELECT * FROM public.get_saldo_e_transacoes(3, '2025-01-01', '2025-01-31');

-- Teste 4: Período específico (apenas janeiro de 2025)
SELECT 'Teste 4 - Conta 1 - Período específico: 2025-01-01 a 2025-01-05' as teste;
SELECT * FROM public.get_saldo_e_transacoes(1, '2025-01-01', '2025-01-05');

-- Teste 5: Conta sem transações no período
SELECT 'Teste 5 - Conta 1 - Período sem transações: 2025-02-01 a 2025-02-28' as teste;
SELECT * FROM public.get_saldo_e_transacoes(1, '2025-02-01', '2025-02-28');

-- Verificar se a função está funcionando corretamente
SELECT 'Verificação - Contagem de transações por conta:' as info;
SELECT 
    account_id,
    COUNT(*) as total_transacoes,
    SUM(CASE WHEN tipo = 'CREDIT' THEN valor ELSE 0 END) as total_creditos,
    SUM(CASE WHEN tipo = 'DEBIT' THEN valor ELSE 0 END) as total_debitos,
    SUM(CASE WHEN tipo = 'CREDIT' THEN valor ELSE -valor END) as saldo_calculado
FROM transacoes 
GROUP BY account_id 
ORDER BY account_id;
