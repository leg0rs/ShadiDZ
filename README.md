# Country APP
Приложение для поиска и просмотра стран: поиск, сортировка, пагинация и детальная карточка (Имееться говнокод, много, ___очень много___)

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![NestJS](https://img.shields.io/badge/NestJS-11-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-7-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![pnpm](https://img.shields.io/badge/pnpm-10.18+-F69220?style=for-the-badge&logo=pnpm&logoColor=white)
![Turborepo](https://img.shields.io/badge/Turborepo-EF4444?style=for-the-badge&logo=turborepo&logoColor=white)

## 🔎 Что внутри
- Монорепо: Turborepo + pnpm workspaces (frontend, backend, shared packages)
- Функционал: поиск, сортировка, пагинация, детальная карточка страны
- Auth: Better-auth (email/password + Google OAuth)
- БД: Prisma + PostgreSQL (пользователи, сессии)
- UI: Next.js 16, React 19, Tailwind CSS 4, shadcn/ui
- API-клиент: сгенерированный OpenAPI в `packages/utils`

## 🖥️ Бэкенд (NestJS)
- Стек: NestJS 11 + Swagger
- Роуты: `GET /countries?start=&end=&search=&sortBy=`, `GET /countries/:countryId`, `GET /countries/health`
- Валидация: `class-validator` + `ValidationPipe (transform, whitelist)`
- CORS: настраивается через `FRONTEND_URL`
- Swagger: `/api` (UI), `/api/docs` (JSON)

## 🎥 Видео демо
<video controls width="720">
  <source src="https://github.com/leg0rs/ShadiDZ/blob/master/docs/2025-12-13-23-15-12_1.mp4" type="video/mp4">
  Ваш браузер не поддерживает видео.
</video>


## 🚀 Быстрый старт
```bash
git clone <url-репозитория>
cd ShadiDZ
pnpm install         # требуется pnpm 10.18.3+
```

### Переменные окружения
Скопируйте примеры и заполните:
```bash
cp apps/frontend/.env.example apps/frontend/.env
cp packages/databases/.env.example packages/databases/.env
cp apps/backend/.env.example apps/backend/.env
```
Ключевые значения:
- `DATABASE_URL` — строка подключения к Postgres (оба .env)
- `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL` — секрет и базовый URL auth
- `NEXT_PUBLIC_APP_URL` — публичный URL фронта
- `BACKEND_URL` или `NEXT_PUBLIC_API_URL` — URL бэкенда
- `GOOGLE_CLIENT_ID/SECRET` — для OAuth

### Подготовка БД
```bash
cd packages/databases
pnpm db:push
pnpm db:generate
```

### Запуск
```bash
# фронтенд (Next.js)
pnpm web:dev
# бэкенд (NestJS)
pnpm bac:dev
```
Откройте http://localhost:3000

## 📁 Структура
```
apps/
  frontend/          # Next.js приложение
  backend/           # NestJS сервис стран
packages/
  auth/              # Better-auth настройки
  databases/         # Prisma схема и миграции
  ui/                # shadcn/ui компоненты
  utils/             # OpenAPI клиент и утилиты
```

## 🛠 Полезные команды
```bash
pnpm web:dev     # фронт dev
pnpm web:build   # фронт build
pnpm bac:dev     # бэк dev
pnpm lint        # линт всего
pnpm fix         # автофикс линтера
```

## 🔑 Google OAuth (опционально)
1) Создайте OAuth2 в Google Cloud Console
2) Redirect URI: `http://localhost:3000/api/auth/callback/google`
3) Заполните `GOOGLE_CLIENT_ID/SECRET` в `apps/frontend/.env`