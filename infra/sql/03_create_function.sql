-- Script para criar a função PL/pgSQL get_saldo_e_transacoes
-- Execute este script conectado ao banco techmarket

-- Função para calcular saldo e retornar últimas 10 transações
CREATE OR REPLACE FUNCTION public.get_saldo_e_transacoes(
    p_account_id bigint, 
    p_start date, 
    p_end date
)
RETURNS TABLE(
    saldo numeric, 
    transacao_id bigint, 
    data timestamp, 
    tipo text, 
    valor numeric
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    (SELECT COALESCE(SUM(CASE WHEN tipo='CREDIT' THEN valor ELSE -valor END),0) 
     FROM transacoes 
     WHERE account_id = p_account_id 
     AND data::date BETWEEN p_start AND p_end) as saldo,
    t.id, 
    t.data, 
    t.tipo, 
    t.valor
  FROM transacoes t
  WHERE t.account_id = p_account_id 
  AND t.data::date BETWEEN p_start AND p_end
  ORDER BY t.data DESC
  LIMIT 10;
END;
$$ LANGUAGE plpgsql;

-- Comentário na função
COMMENT ON FUNCTION public.get_saldo_e_transacoes(bigint, date, date) IS 
'Função para calcular saldo e retornar últimas 10 transações de uma conta em um período específico';

-- Função auxiliar para inserir transações automaticamente
CREATE OR REPLACE FUNCTION public.insert_transacao_from_transfer()
RETURNS TRIGGER AS $$
BEGIN
    -- Inserir débito na conta de origem
    INSERT INTO transacoes (account_id, tipo, valor, data, descricao, transfer_id)
    VALUES (
        NEW.origem_account_id, 
        'DEBIT', 
        NEW.valor, 
        NEW.timestamp,
        'Transferência para conta ' || NEW.destino_account_id,
        NEW.id
    );
    
    -- Inserir crédito na conta de destino
    INSERT INTO transacoes (account_id, tipo, valor, data, descricao, transfer_id)
    VALUES (
        NEW.destino_account_id, 
        'CREDIT', 
        NEW.valor, 
        NEW.timestamp,
        'Transferência da conta ' || NEW.origem_account_id,
        NEW.id
    );
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para inserir transações automaticamente quando uma transferência é criada
CREATE OR REPLACE TRIGGER trigger_insert_transacoes
    AFTER INSERT ON transfers
    FOR EACH ROW
    EXECUTE FUNCTION public.insert_transacao_from_transfer();

-- Comentário no trigger
COMMENT ON TRIGGER trigger_insert_transacoes ON transfers IS 
'Trigger para inserir transações automaticamente quando uma transferência é criada';
