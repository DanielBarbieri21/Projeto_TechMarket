#!/bin/bash

# Script de deploy para o TechMarket
# Este script automatiza o processo de build e deploy da aplicação

set -e

echo "🚀 Iniciando deploy do TechMarket..."

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Função para log
log() {
    echo -e "${BLUE}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1"
    exit 1
}

success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Verificar se Docker está rodando
if ! docker info > /dev/null 2>&1; then
    error "Docker não está rodando. Por favor, inicie o Docker e tente novamente."
fi

# Verificar se Maven está instalado
if ! command -v mvn &> /dev/null; then
    error "Maven não está instalado. Por favor, instale o Maven e tente novamente."
fi

# Função para build do backend
build_backend() {
    log "Construindo backend..."
    
    cd backend
    
    # Limpar e compilar
    mvn clean package -DskipTests
    
    if [ $? -eq 0 ]; then
        success "Backend compilado com sucesso!"
    else
        error "Falha na compilação do backend"
    fi
    
    # Build da imagem Docker
    docker build -t techmarket-api:1.0.0 .
    
    if [ $? -eq 0 ]; then
        success "Imagem Docker do backend criada com sucesso!"
    else
        error "Falha na criação da imagem Docker do backend"
    fi
    
    cd ..
}

# Função para build do frontend
build_frontend() {
    log "Construindo frontend..."
    
    cd frontend
    
    # Build da imagem Docker
    docker build -t techmarket-frontend:1.0.0 .
    
    if [ $? -eq 0 ]; then
        success "Imagem Docker do frontend criada com sucesso!"
    else
        error "Falha na criação da imagem Docker do frontend"
    fi
    
    cd ..
}

# Função para deploy com Docker Compose
deploy_docker_compose() {
    log "Fazendo deploy com Docker Compose..."
    
    # Parar containers existentes
    docker-compose down
    
    # Subir os serviços
    docker-compose up -d
    
    if [ $? -eq 0 ]; then
        success "Deploy com Docker Compose concluído!"
        log "Acesse: http://localhost"
        log "API: http://localhost:8080"
        log "PgAdmin: http://localhost:8081 (admin@techmarket.com / admin123)"
    else
        error "Falha no deploy com Docker Compose"
    fi
}

# Função para deploy com Kubernetes
deploy_kubernetes() {
    log "Fazendo deploy com Kubernetes..."
    
    # Verificar se kubectl está disponível
    if ! command -v kubectl &> /dev/null; then
        error "kubectl não está instalado. Por favor, instale o kubectl e tente novamente."
    fi
    
    # Aplicar manifests
    kubectl apply -f infra/k8s/namespace.yaml
    kubectl apply -f infra/k8s/postgres-deployment.yaml
    kubectl apply -f infra/k8s/backend-deployment.yaml
    kubectl apply -f infra/k8s/frontend-deployment.yaml
    kubectl apply -f infra/k8s/ingress.yaml
    
    if [ $? -eq 0 ]; then
        success "Deploy com Kubernetes concluído!"
        log "Verificando status dos pods..."
        kubectl get pods -n techmarket
    else
        error "Falha no deploy com Kubernetes"
    fi
}

# Função para executar testes
run_tests() {
    log "Executando testes..."
    
    cd backend
    mvn test
    
    if [ $? -eq 0 ]; then
        success "Todos os testes passaram!"
    else
        warning "Alguns testes falharam. Verifique os logs."
    fi
    
    cd ..
}

# Função para mostrar status
show_status() {
    log "Status dos serviços:"
    
    if command -v docker-compose &> /dev/null; then
        docker-compose ps
    fi
    
    if command -v kubectl &> /dev/null; then
        kubectl get pods -n techmarket 2>/dev/null || echo "Kubernetes não configurado"
    fi
}

# Função para limpeza
cleanup() {
    log "Limpando recursos..."
    
    # Parar Docker Compose
    docker-compose down -v
    
    # Remover imagens
    docker rmi techmarket-api:1.0.0 techmarket-frontend:1.0.0 2>/dev/null || true
    
    # Limpar Kubernetes (se disponível)
    if command -v kubectl &> /dev/null; then
        kubectl delete namespace techmarket 2>/dev/null || true
    fi
    
    success "Limpeza concluída!"
}

# Menu principal
case "${1:-help}" in
    "build")
        build_backend
        build_frontend
        ;;
    "deploy")
        build_backend
        build_frontend
        deploy_docker_compose
        ;;
    "k8s")
        build_backend
        build_frontend
        deploy_kubernetes
        ;;
    "test")
        run_tests
        ;;
    "status")
        show_status
        ;;
    "cleanup")
        cleanup
        ;;
    "help"|*)
        echo "Uso: $0 {build|deploy|k8s|test|status|cleanup|help}"
        echo ""
        echo "Comandos:"
        echo "  build   - Construir imagens Docker"
        echo "  deploy  - Deploy completo com Docker Compose"
        echo "  k8s     - Deploy com Kubernetes"
        echo "  test    - Executar testes"
        echo "  status  - Mostrar status dos serviços"
        echo "  cleanup - Limpar recursos"
        echo "  help    - Mostrar esta ajuda"
        ;;
esac
