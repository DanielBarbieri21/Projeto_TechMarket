// Configurações da API
const API_BASE_URL = 'http://localhost:8080/api';
const DEFAULT_ACCOUNT_ID = 1; // ID da conta padrão para demonstração

// Estado da aplicação
let currentAccountId = DEFAULT_ACCOUNT_ID;
let currentStartDate = '2025-01-01';
let currentEndDate = '2025-01-31';

// Elementos DOM
const balanceAmount = document.getElementById('balanceAmount');
const balancePeriod = document.getElementById('balancePeriod');
const transactionCount = document.getElementById('transactionCount');
const transactionsList = document.getElementById('transactionsList');
const startDateInput = document.getElementById('startDate');
const endDateInput = document.getElementById('endDate');
const applyFiltersBtn = document.getElementById('applyFilters');

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
});

function initializeApp() {
    // Definir datas padrão
    const today = new Date();
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    
    startDateInput.value = formatDate(firstDay);
    endDateInput.value = formatDate(lastDay);
    
    currentStartDate = startDateInput.value;
    currentEndDate = endDateInput.value;
    
    // Carregar dados iniciais
    loadAccountData();
}

function setupEventListeners() {
    applyFiltersBtn.addEventListener('click', applyFilters);
    
    // Aplicar filtros ao pressionar Enter
    startDateInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') applyFilters();
    });
    
    endDateInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') applyFilters();
    });
}

function applyFilters() {
    const startDate = startDateInput.value;
    const endDate = endDateInput.value;
    
    if (!startDate || !endDate) {
        showError('Por favor, selecione as datas inicial e final.');
        return;
    }
    
    if (new Date(startDate) > new Date(endDate)) {
        showError('A data inicial não pode ser maior que a data final.');
        return;
    }
    
    currentStartDate = startDate;
    currentEndDate = endDate;
    
    loadAccountData();
}

async function loadAccountData() {
    try {
        showLoadingState();
        
        // Simular chamada para a API (em produção, seria uma chamada real)
        const data = await simulateApiCall();
        
        updateBalance(data.balance);
        updateTransactions(data.transactions);
        updateTransactionCount(data.transactions.length);
        
    } catch (error) {
        console.error('Erro ao carregar dados:', error);
        showError('Erro ao carregar os dados. Tente novamente.');
    }
}

function simulateApiCall() {
    // Simular dados de exemplo (em produção, faria uma chamada real para a API)
    return new Promise((resolve) => {
        setTimeout(() => {
            const mockData = generateMockData();
            resolve(mockData);
        }, 1000);
    });
}

function generateMockData() {
    // Dados simulados baseados nos dados de exemplo do banco
    const transactions = [
        {
            id: 1,
            tipo: 'CREDIT',
            valor: 2000.00,
            data: '2025-01-01T10:00:00',
            descricao: 'Depósito inicial'
        },
        {
            id: 2,
            tipo: 'DEBIT',
            valor: 100.00,
            data: '2025-01-02T14:00:00',
            descricao: 'Compra no supermercado'
        },
        {
            id: 3,
            tipo: 'CREDIT',
            valor: 6000.00,
            data: '2025-01-04T08:00:00',
            descricao: 'Transferência recebida'
        },
        {
            id: 4,
            tipo: 'DEBIT',
            valor: 150.00,
            data: '2025-01-05T16:30:00',
            descricao: 'Pagamento de conta de luz'
        },
        {
            id: 5,
            tipo: 'CREDIT',
            valor: 7500.00,
            data: '2025-01-06T09:15:00',
            descricao: 'Salário mensal'
        },
        {
            id: 6,
            tipo: 'DEBIT',
            valor: 1200.00,
            data: '2025-01-07T11:45:00',
            descricao: 'Pagamento de financiamento'
        },
        {
            id: 7,
            tipo: 'DEBIT',
            valor: 300.00,
            data: '2025-01-08T14:20:00',
            descricao: 'Compra de eletrônicos'
        },
        {
            id: 8,
            tipo: 'CREDIT',
            valor: 250.00,
            data: '2025-01-09T10:30:00',
            descricao: 'Cashback'
        },
        {
            id: 9,
            tipo: 'DEBIT',
            valor: 80.00,
            data: '2025-01-10T18:00:00',
            descricao: 'Compra online'
        },
        {
            id: 10,
            tipo: 'DEBIT',
            valor: 450.00,
            data: '2025-01-11T12:15:00',
            descricao: 'Pagamento de aluguel'
        }
    ];
    
    // Calcular saldo
    const balance = transactions.reduce((total, transaction) => {
        return total + (transaction.tipo === 'CREDIT' ? transaction.valor : -transaction.valor);
    }, 0);
    
    return {
        balance: balance,
        transactions: transactions
    };
}

function updateBalance(balance) {
    const formattedBalance = formatCurrency(balance);
    balanceAmount.innerHTML = `<span class="balance-value">${formattedBalance}</span>`;
    balancePeriod.textContent = `Período: ${formatDateForDisplay(currentStartDate)} a ${formatDateForDisplay(currentEndDate)}`;
}

function updateTransactions(transactions) {
    if (transactions.length === 0) {
        showEmptyState();
        return;
    }
    
    const transactionsHTML = transactions.map(transaction => {
        const isHighValue = transaction.valor > 5000;
        const transactionClass = isHighValue ? 'transaction-item high-value' : 'transaction-item';
        
        return `
            <div class="${transactionClass}">
                <div class="transaction-header">
                    <span class="transaction-type ${transaction.tipo.toLowerCase()}">
                        ${transaction.tipo === 'CREDIT' ? 'Crédito' : 'Débito'}
                    </span>
                    <span class="transaction-amount ${transaction.tipo.toLowerCase()}">
                        ${transaction.tipo === 'CREDIT' ? '+' : '-'}${formatCurrency(transaction.valor)}
                    </span>
                </div>
                <div class="transaction-details">
                    <span class="transaction-date">${formatDateTime(transaction.data)}</span>
                    <span class="transaction-description">${transaction.descricao}</span>
                </div>
            </div>
        `;
    }).join('');
    
    transactionsList.innerHTML = transactionsHTML;
}

function updateTransactionCount(count) {
    transactionCount.innerHTML = `<span class="count-value">${count} transações</span>`;
}

function showLoadingState() {
    balanceAmount.innerHTML = '<span class="loading">Carregando...</span>';
    transactionCount.innerHTML = '<span class="loading">Carregando...</span>';
    transactionsList.innerHTML = `
        <div class="loading-state">
            <div class="spinner"></div>
            <p>Carregando transações...</p>
        </div>
    `;
}

function showEmptyState() {
    transactionsList.innerHTML = `
        <div class="empty-state">
            <div class="empty-state-icon">📄</div>
            <h3>Nenhuma transação encontrada</h3>
            <p>Não há transações para o período selecionado.</p>
        </div>
    `;
}

function showError(message) {
    transactionsList.innerHTML = `
        <div class="empty-state">
            <div class="empty-state-icon">⚠️</div>
            <h3>Erro</h3>
            <p>${message}</p>
        </div>
    `;
}

// Funções utilitárias
function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
}

function formatDate(date) {
    return date.toISOString().split('T')[0];
}

function formatDateForDisplay(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
}

function formatDateTime(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Função para fazer chamadas reais para a API (quando disponível)
async function fetchAccountData(accountId, startDate, endDate) {
    try {
        const response = await fetch(`${API_BASE_URL}/accounts/${accountId}/transacoes?start=${startDate}&end=${endDate}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('Erro na chamada da API:', error);
        throw error;
    }
}

// Função para testar a API (quando o backend estiver rodando)
async function testApiConnection() {
    try {
        const response = await fetch(`${API_BASE_URL}/health`);
        if (response.ok) {
            console.log('API está funcionando!');
            return true;
        }
    } catch (error) {
        console.log('API não está disponível, usando dados simulados.');
    }
    return false;
}

// Verificar conexão com a API na inicialização
testApiConnection();
