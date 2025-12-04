FROM node:24-slim AS build
WORKDIR /app
COPY package*.json ./

# Instalar dependencias
RUN npm ci

# Copiar el código fuente
COPY . .

# Argumentos de construcción
ARG VITE_BACKEND_API_URL
ARG VITE_PORT

# Hacerlos disponibles como variables de entorno durante el build
ENV VITE_BACKEND_API_URL=$VITE_BACKEND_API_URL
ENV VITE_PORT=$VITE_PORT

RUN npm run build-only

FROM nginx:alpine

# Copiar los archivos compilados desde la etapa de build
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 8080

# Corregir la ruta de default.conf (no se puede acceder a directorios padres)
COPY ./build/default.conf /etc/nginx/conf.d/default.conf

# Iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]