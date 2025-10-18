# Dockerfile para o frontend
FROM nginx:alpine

# Metadados
LABEL maintainer="TechMarket Team"
LABEL description="TechMarket Frontend - Interface de Usuário"
LABEL version="1.0.0"

# Copiar arquivos estáticos
COPY . /usr/share/nginx/html/

# Copiar configuração customizada do nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Criar usuário não-root
RUN addgroup -g 1001 -S appgroup && \
    adduser -u 1001 -S appuser -G appgroup

# Alterar propriedade dos arquivos
RUN chown -R appuser:appgroup /usr/share/nginx/html && \
    chown -R appuser:appgroup /var/cache/nginx && \
    chown -R appuser:appgroup /var/log/nginx && \
    chown -R appuser:appgroup /etc/nginx/conf.d

# Criar diretório para PID
RUN mkdir -p /var/run/nginx && \
    chown -R appuser:appgroup /var/run/nginx

# Atualizar nginx.conf para usar o usuário correto
RUN sed -i 's/user nginx;/user appuser;/' /etc/nginx/nginx.conf

# Mudar para usuário não-root
USER appuser

# Expor porta
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:80 || exit 1

# Comando para executar o nginx
CMD ["nginx", "-g", "daemon off;"]
