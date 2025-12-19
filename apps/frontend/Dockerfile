# 1. Базовый образ
FROM node:20-alpine AS base
ENV DO_NOT_TRACK=1
RUN corepack enable

# 2. Установка зависимостей
FROM base AS deps
# libc6-compat нужен для работы некоторых бинарных зависимостей в Alpine
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Копируем файлы манифеста воркспейса
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY apps/backend/package.json ./apps/backend/
COPY apps/frontend/package.json ./apps/frontend/
COPY packages/auth/package.json ./packages/auth/
COPY packages/databases/package.json ./packages/databases/
COPY packages/tooling-config/package.json ./packages/tooling-config/
COPY packages/ui/package.json ./packages/ui/
COPY packages/utils/package.json ./packages/utils/

# Устанавливаем зависимости (включая devDependencies для сборки)
RUN pnpm install --frozen-lockfile

# 3. Сборка приложения
FROM base AS builder
WORKDIR /app

# Копируем ВСЁ из этапа deps (включая структуру node_modules)
COPY --from=deps /app ./
# Копируем исходный код
COPY . .

# Прокидываем билд-аргументы
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_TELEMETRY_DISABLED=1

# Генерируем типы Prisma (обязательно для компиляции фронтенда, если он их использует)
RUN cd packages/databases && DATABASE_URL=postgresql://user:pass@localhost:5432/db pnpm prisma generate

# Запускаем сборку фронтенда через Turbo
RUN pnpm web:build

# 4. Финальный образ (Runner)
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Создаем непривилегированного пользователя для безопасности
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Копируем необходимые файлы для запуска standalone-режима
COPY --from=builder /app/apps/frontend/public ./apps/frontend/public

# Standalone режим Next.js собирает все нужные node_modules в одну папку
COPY --from=builder --chown=nextjs:nodejs /app/apps/frontend/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/frontend/.next/static ./apps/frontend/.next/static

USER nextjs

EXPOSE 3000

# Запускаем сервер (в standalone режиме это server.js)
CMD ["node", "apps/frontend/server.js"]