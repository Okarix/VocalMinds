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

# Добавляем команду для вывода содержимого requirements.txt
RUN cat /app/voice_analyze/requirements.txt

# Устанавливаем дополнительные системные зависимости
RUN apt-get update && \
    apt-get install -y build-essential libssl-dev libffi-dev python3-dev ffmpeg

# Устанавливаем Python библиотеки по одной для диагностики
RUN pip3 install --no-cache-dir librosa==0.10.2.post1 && \
    pip3 install --no-cache-dir numpy==1.26.0 && \
    pip3 install --no-cache-dir soundfile==0.12.1 && \
    pip3 install --no-cache-dir matplotlib==3.9.1 && \
    pip3 install --no-cache-dir praat-parselmouth==0.4.3 && \
    pip3 install --no-cache-dir pydub==0.25.1

# Выводим установленные версии библиотек
RUN pip3 freeze

# Открываем порт 3000 для приложения
EXPOSE 3000

# Команда для запуска приложения
CMD ["node", "./dist/index.js"]
