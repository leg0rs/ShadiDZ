# Frontend Template

Современный Next.js 16 шаблон с аутентификацией, Prisma ORM и Tailwind CSS.

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-7-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![pnpm](https://img.shields.io/badge/pnpm-10.18+-F69220?style=for-the-badge&logo=pnpm&logoColor=white)
![Turborepo](https://img.shields.io/badge/Turborepo-EF4444?style=for-the-badge&logo=turborepo&logoColor=white)

## 🚀 Быстрый старт

### 1. Клонирование проекта

```bash
git clone <url-репозитория>
cd nextjs-frontend-template
```

### 2. Установка зависимостей

```bash
pnpm install
```

*Требуется pnpm 10.18.3+*

### 3. Настройка базы данных

Убедитесь, что у вас установлен и запущен PostgreSQL.

### 4. Настройка переменных окружения

Скопируйте файлы `.env.example` и создайте `.env` на их основе:

**`apps/frontend/.env`:**

```bash
cp apps/frontend/.env.example apps/frontend/.env
```

```env
# === БАЗА ДАННЫХ ===
DATABASE_URL=postgresql://<name>:<password>@localhost:<port>/<db_name>

# === АВТОРИЗАЦИЯ ===
BETTER_AUTH_SECRET="secret"
BETTER_AUTH_URL="http://localhost:3000"

# === ФРОНТЕНД ===
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# === БЕКЕНД ===

BACKEND_URL="http://localhost:8080/v0"

# === GOOGLE ===
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

**`packages/databases/.env`:**

```bash
cp packages/databases/.env.example packages/databases/.env
```

```env
DATABASE_URL=postgresql://<name>:<password>@localhost:<port>/<db_name>
```

*Замените `<name>`, `<password>`, `<port>` и `<db_name>` на ваши данные PostgreSQL*

### 5. Применение БД

```bash
cd packages/databases
pnpm db:push
pnpm db:generate
```

### 6. Запуск проекта

```bash
pnpm web:dev
```

Откройте [http://localhost:3000](http://localhost:3000)

## 📦 Что включено

- **Next.js 16** с Turbopack
- **Better-auth** - современная аутентификация
- **Prisma 7** - типобезопасная работа с БД
- **Tailwind CSS 4** - стилизация
- **shadcn/ui** - компоненты
- **TypeScript** - типизация
- **Monorepo** - Turborepo + pnpm workspaces

## 🔑 Google OAuth (опционально)

Для входа через Google:

1. Создайте проект в [Google Cloud Console](https://console.cloud.google.com/)
2. Настройте OAuth 2.0 credentials
3. Добавьте redirect URI: `http://localhost:3000/api/auth/callback/google`
4. Скопируйте Client ID и Secret в `.env`

## 📁 Структура проекта

```
apps/
  frontend/          # Next.js приложение
packages/
  auth/             # Better-auth настройки
  databases/        # Prisma схема и миграции
  ui/               # UI компоненты (shadcn)
  utils/            # Утилиты и API клиент
```

## 🛠 Полезные команды

```bash
pnpm web:dev        # Запуск dev сервера
pnpm web:build      # Сборка проекта
pnpm lint           # Проверка кода
pnpm fix            # Автофикс линтера
```

## 📝 Дополнительно

- Prisma Studio: `cd packages/databases && pnpm prisma studio`
- Генерация Prisma клиента: `cd packages/databases && pnpm prisma generate`
- Создание новой миграции: `cd packages/databases && pnpm prisma migrate dev --name <название>`
