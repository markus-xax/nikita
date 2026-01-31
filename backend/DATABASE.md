# Настройка PostgreSQL и Redis

> ⚠️ **Важно:** Этот проект использует **Prisma ORM** для работы с PostgreSQL и **Redis** для кеширования. Подробное руководство см. в [PRISMA_REDIS_GUIDE.md](./PRISMA_REDIS_GUIDE.md)

## Требования

- PostgreSQL установлен и запущен
- Redis установлен и запущен
- Создана база данных PostgreSQL

## Настройка подключения

Создайте файл `.env` в папке `backend/`:

```bash
# PostgreSQL (через Prisma)
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/nikita_db?schema=public"

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=        # Опционально, если Redis защищен паролем
```

Или используйте отдельные переменные (они будут собраны в DATABASE_URL автоматически):

```bash
DB_HOST=localhost          # Хост БД (по умолчанию: localhost)
DB_PORT=5432              # Порт БД (по умолчанию: 5432)
DB_NAME=nikita_db         # Имя базы данных (по умолчанию: nikita_db)
DB_USER=postgres          # Пользователь БД (по умолчанию: postgres)
DB_PASSWORD=postgres      # Пароль БД (по умолчанию: postgres)
```

## Создание базы данных

Если база данных еще не создана, выполните:

```bash
# Подключитесь к PostgreSQL
psql -U postgres

# Создайте базу данных
CREATE DATABASE nikita_db;

# Выйдите из psql
\q
```

## Инициализация Prisma

После установки зависимостей выполните миграции:

```bash
# Создать и применить миграции
npm run db:migrate

# Сгенерировать Prisma Client
npm run db:generate
```

## Установка зависимостей

```bash
cd backend
npm install
```

## Запуск Redis

```bash
# macOS (через Homebrew)
brew services start redis

# Linux
sudo systemctl start redis

# Docker
docker run -d -p 6379:6379 redis

# Проверка работы
redis-cli ping  # Должно вернуть PONG
```

## Запуск сервера

```bash
npm start
```

Сервер автоматически:
1. Подключится к PostgreSQL через Prisma
2. Подключится к Redis (если доступен)
3. Запустится на порту 4000 (или указанном в PORT)

> ⚠️ **Примечание:** Если Redis недоступен, сервер все равно запустится, но кеширование работать не будет.

## Структура базы данных

### Таблица `todos`

| Поле | Тип | Описание |
|------|-----|----------|
| id | SERIAL PRIMARY KEY | Уникальный идентификатор |
| text | TEXT NOT NULL | Текст задачи |
| completed | BOOLEAN NOT NULL DEFAULT false | Статус выполнения |
| created_at | TIMESTAMP WITH TIME ZONE | Дата создания |
| updated_at | TIMESTAMP WITH TIME ZONE | Дата последнего обновления |

## API Endpoints

После настройки БД все endpoints `/todos` будут работать с PostgreSQL (через Prisma) и Redis (для кеширования):

- `GET /todos` - получить все задачи (кешируется в Redis на 5 минут)
- `GET /todos/:id` - получить задачу по ID (кешируется в Redis на 10 минут)
- `POST /todos` - создать новую задачу (инвалидирует кеш)
- `PUT /todos/:id` - обновить задачу (инвалидирует кеш)
- `DELETE /todos/:id` - удалить задачу (инвалидирует кеш)

## Полезные команды

```bash
# Prisma Studio - визуальный редактор БД
npm run db:studio

# Создать новую миграцию
npm run db:migrate

# Сгенерировать Prisma Client
npm run db:generate
```

## Подробная документация

Для подробного объяснения использования Prisma и Redis см. [PRISMA_REDIS_GUIDE.md](./PRISMA_REDIS_GUIDE.md)
