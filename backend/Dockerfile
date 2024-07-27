# Stage 1: Build stage
FROM node:18 AS build

WORKDIR /app

# Копируем файлы package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальные файлы проекта
COPY . .

# Собираем проект TypeScript
RUN npm run build

# Stage 2: Production stage
FROM node:18-slim

# Устанавливаем Python и pip
RUN apt-get update && \
    apt-get install -y python3 python3-pip && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Копируем собранные файлы и package.json из предыдущего stage
COPY --from=build /app/dist ./dist
COPY --from=build /app/package*.json ./

# Устанавливаем только production зависимости
RUN npm install --only=production

# Копируем папку voice_analyze и файл requirements.txt
COPY /voice_analyze /app/voice_analyze
COPY /voice_analyze/requirements.txt /app/voice_analyze/requirements.txt

# Устанавливаем Python библиотеки
RUN pip3 install -r /app/voice_analyze/requirements.txt

# Открываем порт 3000 для приложения
EXPOSE 3000

# Команда для запуска приложения
CMD ["node", "./dist/index.js"]
