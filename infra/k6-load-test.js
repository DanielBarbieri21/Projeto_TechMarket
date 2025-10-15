import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate } from 'k6/metrics';

// Métricas customizadas
const errorRate = new Rate('errors');

// Configurações do teste
export const options = {
    stages: [
        { duration: '30s', target: 10 }, // Ramp up para 10 usuários
        { duration: '1m', target: 10 },  // Manter 10 usuários
        { duration: '30s', target: 20 }, // Ramp up para 20 usuários
        { duration: '1m', target: 20 },  // Manter 20 usuários
        { duration: '30s', target: 0 },  // Ramp down para 0 usuários
    ],
    thresholds: {
        http_req_duration: ['p(95)<2000'], // 95% das requisições devem ser < 2s
        http_req_failed: ['rate<0.1'],     // Taxa de erro < 10%
        errors: ['rate<0.1'],              // Taxa de erro customizada < 10%
    },
};

// Dados de teste
const testData = {
    transfers: [
        { origem: 1, destino: 2, valor: 100.00 },
        { origem: 2, destino: 3, valor: 50.00 },
        { origem: 3, destino: 1, valor: 200.00 },
        { origem: 1, destino: 3, valor: 75.00 },
        { origem: 2, destino: 1, valor: 150.00 },
    ]
};

export default function() {
    // Selecionar dados aleatórios
    const transfer = testData.transfers[Math.floor(Math.random() * testData.transfers.length)];
    
    // Gerar chave de idempotência única
    const idempotencyKey = `test-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    // Preparar payload
    const payload = JSON.stringify({
        origem: transfer.origem,
        destino: transfer.destino,
        valor: transfer.valor,
        idempotencyKey: idempotencyKey
    });
    
    // Headers
    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    };
    
    // Fazer requisição
    const response = http.post('http://localhost:8080/api/transferencias', payload, { headers });
    
    // Verificações
    const success = check(response, {
        'status is 200': (r) => r.status === 200,
        'response time < 2000ms': (r) => r.timings.duration < 2000,
        'response has codigo': (r) => {
            try {
                const body = JSON.parse(r.body);
                return body.codigo && body.codigo.length > 0;
            } catch (e) {
                return false;
            }
        },
        'response has status success': (r) => {
            try {
                const body = JSON.parse(r.body);
                return body.status === 'success';
            } catch (e) {
                return false;
            }
        }
    });
    
    // Registrar erro se a verificação falhou
    errorRate.add(!success);
    
    // Log de erro se necessário
    if (!success) {
        console.error(`Erro na requisição: ${response.status} - ${response.body}`);
    }
    
    // Aguardar entre requisições
    sleep(1);
}

// Função de setup (executada uma vez no início)
export function setup() {
    console.log('Iniciando teste de carga do TechMarket API...');
    console.log('URL base: http://localhost:8080');
    console.log('Duração total: ~4 minutos');
    console.log('Pico de usuários: 20');
    
    // Verificar se a API está disponível
    const healthCheck = http.get('http://localhost:8080/actuator/health');
    if (healthCheck.status !== 200) {
        console.error('API não está disponível! Verifique se o backend está rodando.');
        return false;
    }
    
    console.log('API está disponível. Iniciando testes...');
    return true;
}

// Função de teardown (executada uma vez no final)
export function teardown(data) {
    console.log('Teste de carga finalizado.');
    console.log('Verifique os resultados no relatório.');
}
