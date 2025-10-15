# Dockerfile para o backend Spring Boot
FROM eclipse-temurin:17-jre-alpine

# Metadados
LABEL maintainer="TechMarket Team"
LABEL description="TechMarket API - Sistema de Transferências Bancárias"
LABEL version="1.0.0"

# Criar usuário não-root para segurança
RUN addgroup -g 1001 -S appgroup && \
    adduser -u 1001 -S appuser -G appgroup

# Definir diretório de trabalho
WORKDIR /app

# Copiar o JAR da aplicação
COPY target/techmarket-api-1.0.0.jar app.jar

# Alterar propriedade do arquivo para o usuário app
RUN chown appuser:appgroup app.jar

# Mudar para usuário não-root
USER appuser

# Expor porta
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=60s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:8080/actuator/health || exit 1

# Comando para executar a aplicação
ENTRYPOINT ["java", "-jar", "app.jar"]
