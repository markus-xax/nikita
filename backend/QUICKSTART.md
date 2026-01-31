# 🚀 Быстрый старт

## Шаг 1: Установка зависимостей

```bash
cd backend
npm install
```

## Шаг 2: Настройка PostgreSQL

```bash
# Создайте базу данных
createdb nikita_db

# Или через psql
psql -U postgres -c "CREATE DATABASE nikita_db;"
```

## Шаг 3: Настройка переменных окружения

Создайте файл `.env` в папке `backend/`:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/nikita_db?schema=public"
REDIS_HOST=localhost
REDIS_PORT=6379
```

> 💡 Измените `postgres:postgres` на ваши реальные логин и пароль PostgreSQL

## Шаг 4: Запуск Redis

```bash
# macOS
brew services start redis

# Linux
sudo systemctl start redis

# Docker
docker run -d -p 6379:6379 redis
```

## Шаг 5: Инициализация Prisma

```bash
# Создать и применить миграции
npm run db:migrate

# Сгенерировать Prisma Client
npm run db:generate
```

## Шаг 6: Запуск сервера

```bash
npm start
```

Сервер запустится на `http://localhost:4000`

## ✅ Проверка работы

```bash
# Получить все задачи
curl http://localhost:4000/todos

# Создать задачу
curl -X POST http://localhost:4000/todos \
  -H "Content-Type: application/json" \
  -d '{"text": "Моя первая задача"}'
```

## 📚 Дополнительная информация

- [PRISMA_REDIS_GUIDE.md](./PRISMA_REDIS_GUIDE.md) - подробное руководство по Prisma и Redis
- [DATABASE.md](./DATABASE.md) - настройка базы данных
