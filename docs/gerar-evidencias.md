# Guia para Gerar Evidências e Prints

## 📸 Prints Obrigatórios

### Print 1: Backend em Execução
**Objetivo**: Demonstrar que o backend Spring Boot está funcionando

**Como gerar**:
1. Abra um terminal
2. Navegue até a pasta `backend`
3. Execute: `mvn spring-boot:run`
4. Aguarde a aplicação inicializar
5. Faça screenshot do terminal mostrando:
   - Comando executado
   - Logs de inicialização
   - Mensagem "Started TechMarketApplication"
   - Porta 8080 sendo usada

**Legenda sugerida**: "Figura 1 - Backend Spring Boot em execução com logs de inicialização"

### Print 2: Endpoint Testado no Postman
**Objetivo**: Demonstrar que o endpoint de transferências está funcionando

**Como gerar**:
1. Abra o Postman
2. Importe a collection: `infra/TechMarket_API_Tests.postman_collection.json`
3. Execute a requisição "Transferência Válida"
4. Faça screenshot mostrando:
   - URL: `POST http://localhost:8080/api/transferencias`
   - Body JSON com dados de teste
   - Resposta 200 OK
   - JSON de resposta com `codigo`, `status: "success"`, etc.

**Legenda sugerida**: "Figura 2 - Teste do endpoint de transferências via Postman com resposta JSON"

### Print 3: Frontend Responsivo
**Objetivo**: Demonstrar que o frontend está funcionando e é responsivo

**Como gerar**:
1. Abra o Chrome
2. Abra `frontend/index.html`
3. Pressione F12 para abrir DevTools
4. Clique no ícone de dispositivo móvel
5. Selecione "iPhone SE" ou dimensões 360x800
6. Faça screenshot mostrando:
   - Extrato com transações
   - Destaque para valores > R$5.000 (se houver)
   - Layout responsivo funcionando

**Legenda sugerida**: "Figura 3 - Interface responsiva do extrato em dispositivo móvel (360x800)"

## 🧪 Evidências Adicionais

### Testes Unitários
```bash
cd backend
mvn test
```
**Screenshot**: Terminal mostrando "Tests run: X, Failures: 0, Errors: 0"

### Testes de Validação JavaScript
1. Abra `frontend/test-validacoes.html`
2. Execute todos os testes
3. **Screenshot**: Página mostrando todos os testes passando

### Função SQL
```sql
SELECT * FROM public.get_saldo_e_transacoes(1, '2025-01-01', '2025-01-31');
```
**Screenshot**: pgAdmin ou psql mostrando resultado da função

### Docker Compose
```bash
docker-compose up
```
**Screenshot**: Terminal mostrando containers rodando

## 📋 Checklist de Evidências

- [ ] Print 1: Backend rodando
- [ ] Print 2: Endpoint testado no Postman
- [ ] Print 3: Frontend responsivo
- [ ] Screenshot dos testes unitários
- [ ] Screenshot dos testes de validação JS
- [ ] Screenshot da função SQL
- [ ] Screenshot do Docker Compose
- [ ] Collection Postman exportada
- [ ] Scripts SQL documentados
- [ ] README.md completo

## 🎯 Dicas para Screenshots

1. **Resolução**: Use pelo menos 1920x1080
2. **Formato**: PNG ou JPG de alta qualidade
3. **Conteúdo**: Mostre informações relevantes claramente
4. **Legendas**: Adicione legendas descritivas
5. **Organização**: Numere as figuras sequencialmente

## 📝 Como Inserir no Relatório Word

1. Abra o arquivo Word do relatório
2. Vá para a seção correspondente
3. Clique em "Inserir" > "Imagem"
4. Selecione o screenshot
5. Adicione legenda: "Figura X - Descrição"
6. Ajuste o tamanho se necessário
7. Centralize a imagem

## 🔍 Validação das Evidências

Antes de finalizar, verifique se:

- [ ] Todos os prints mostram funcionalidades funcionando
- [ ] As legendas são descritivas e claras
- [ ] As imagens têm qualidade suficiente
- [ ] O conteúdo é relevante para o relatório
- [ ] As evidências cobrem todos os requisitos

## 📊 Métricas para Incluir

- Tempo de resposta da API
- Cobertura de testes
- Número de validações implementadas
- Performance em diferentes dispositivos
- Tempo de build e deploy

---

**Nota**: Este guia garante que todas as evidências necessárias sejam coletadas de forma organizada e profissional para o relatório final.
