# Instruções para Criar o Relatório Word

## 📝 Preparação do Documento

### 1. Configuração Inicial
1. Abra o Microsoft Word
2. Crie um novo documento
3. Configure as margens: Superior 3cm, Inferior 2cm, Esquerda 3cm, Direita 2cm
4. Fonte: Arial 12pt
5. Espaçamento: 1,5 entre linhas

### 2. Estrutura do Documento

#### Capa (NÃO incluir conforme solicitado)
- Pular a capa conforme especificado no enunciado

#### Sumário
1. Vá em "Referências" > "Sumário"
2. Escolha "Sumário Automático 1"
3. O sumário será gerado automaticamente

#### Numeração de Páginas
1. Vá em "Inserir" > "Número de Página"
2. Escolha "Início da Página" > "Número Simples 2"
3. Configure para começar na página 2 (pular capa)

## 📋 Conteúdo do Relatório

### 1. Introdução
- Contexto do projeto
- Objetivos
- Tecnologias utilizadas
- Estrutura do documento

### 2. Desenvolvimento

#### 2.1 Backend - Endpoint de Transferências
- Explicação da implementação
- Código principal (usar fonte monospace)
- Validações implementadas
- Controle de concorrência

#### 2.2 Banco de Dados - Função SQL
- Explicação da função
- Código SQL completo
- Testes realizados
- Resultados obtidos

#### 2.3 Frontend - Interface Responsiva
- Design mobile-first
- Destaque para valores > R$5.000
- Código CSS responsivo
- Testes de responsividade

#### 2.4 Validações JavaScript
- Validação de CPF
- Validação de data
- Validação de telefone
- Testes de validação

### 3. Testes

#### 3.1 Testes Unitários
- Backend (JUnit)
- Frontend (JavaScript)
- Resultados obtidos

#### 3.2 Testes de Integração
- Collection Postman
- Cenários testados
- Resultados

#### 3.3 Testes de Carga
- Script k6
- Métricas de performance
- Resultados

### 4. Deploy e Infraestrutura
- Docker e Docker Compose
- Kubernetes
- CI/CD com GitHub Actions

### 5. Resultados e Evidências

#### 5.1 Prints Obrigatórios
**Print 1: Backend em Execução**
- Inserir screenshot do terminal
- Legenda: "Figura 1 - Backend Spring Boot em execução"

**Print 2: Endpoint Testado**
- Inserir screenshot do Postman
- Legenda: "Figura 2 - Teste do endpoint via Postman"

**Print 3: Frontend Responsivo**
- Inserir screenshot do Chrome DevTools
- Legenda: "Figura 3 - Interface responsiva em dispositivo móvel"

#### 5.2 Métricas
- Tabela com métricas de performance
- Resultados dos testes
- Cobertura de código

### 6. Conclusão
- Objetivos alcançados
- Dificuldades encontradas
- Soluções implementadas
- Melhorias futuras

### 7. Referências
- Links para documentação
- Artigos consultados
- Recursos utilizados

### 8. Anexos
- Collection Postman
- Scripts SQL
- Scripts de deploy
- Manifests Kubernetes

## 🖼️ Como Inserir Imagens

### 1. Inserir Screenshots
1. Vá em "Inserir" > "Imagens" > "Este Dispositivo"
2. Selecione o arquivo de imagem
3. Ajuste o tamanho se necessário
4. Centralize a imagem

### 2. Adicionar Legendas
1. Clique com botão direito na imagem
2. Selecione "Inserir Legenda"
3. Digite a legenda: "Figura X - Descrição"
4. Escolha posição "Abaixo do item selecionado"

### 3. Formatação de Imagens
- Tamanho: máximo 15cm de largura
- Resolução: pelo menos 300 DPI
- Formato: PNG ou JPG
- Centralizar na página

## 💻 Como Inserir Código

### 1. Código Java/SQL/JavaScript
1. Vá em "Inserir" > "Caixa de Texto"
2. Digite ou cole o código
3. Formate com fonte monospace (Courier New 10pt)
4. Adicione fundo cinza claro
5. Adicione borda

### 2. Exemplo de Formatação
```
@Service
@Transactional
public class TransferService {
    // Código aqui
}
```

## 📊 Como Criar Tabelas

### 1. Inserir Tabela
1. Vá em "Inserir" > "Tabela"
2. Escolha o número de colunas e linhas
3. Preencha com os dados

### 2. Formatação de Tabelas
- Cabeçalho em negrito
- Bordas em todas as células
- Centralizar conteúdo
- Alternar cores das linhas (opcional)

## 🔗 Como Inserir Links

### 1. Links Externos
1. Selecione o texto
2. Vá em "Inserir" > "Link"
3. Cole a URL
4. Configure para abrir em nova aba

### 2. Referências Internas
1. Selecione o texto
2. Vá em "Inserir" > "Marcador"
3. Crie o marcador
4. Use "Inserir" > "Referência Cruzada" para referenciar

## ✅ Checklist Final

Antes de finalizar, verifique:

- [ ] Sumário atualizado
- [ ] Numeração de páginas correta
- [ ] Todas as 3 imagens inseridas
- [ ] Legendas em todas as imagens
- [ ] Código formatado corretamente
- [ ] Tabelas com bordas
- [ ] Links funcionando
- [ ] Referências completas
- [ ] Ortografia verificada
- [ ] Formatação consistente

## 📄 Estrutura Final

```
1. Introdução
2. Desenvolvimento
   2.1 Backend
   2.2 Banco de Dados
   2.3 Frontend
   2.4 Validações JavaScript
3. Testes
4. Deploy e Infraestrutura
5. Resultados e Evidências
6. Conclusão
7. Referências
8. Anexos
```

## 🎯 Dicas Importantes

1. **Consistência**: Use a mesma formatação em todo o documento
2. **Clareza**: Escreva de forma clara e objetiva
3. **Evidências**: Inclua todas as 3 imagens obrigatórias
4. **Código**: Formate o código de forma legível
5. **Referências**: Cite todas as fontes utilizadas
6. **Revisão**: Revise o documento antes de finalizar

---

**Tempo estimado**: 2-3 horas  
**Páginas esperadas**: 15-20 páginas  
**Status**: ✅ Template pronto para uso
