FROM node:20-alpine AS base

# 1. Зависимости
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Включаем corepack для pnpm
RUN corepack enable

# Копируем конфигурации всех пакетов, чтобы lockfile не ругался
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY apps/backend/package.json ./apps/backend/
COPY apps/frontend/package.json ./apps/frontend/
COPY packages/auth/package.json ./packages/auth/
COPY packages/databases/package.json ./packages/databases/
COPY packages/tooling-config/package.json ./packages/tooling-config/
COPY packages/ui/package.json ./packages/ui/
COPY packages/utils/package.json ./packages/utils/

# Устанавливаем зависимости
RUN pnpm install --frozen-lockfile

# 2. Сборка
FROM base AS builder
RUN corepack enable
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Прокидываем переменные для вшивания в билд (Next.js заберет их сам)
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

# Отключаем телеметрию
ENV NEXT_TELEMETRY_DISABLED=1

RUN pnpm web:build

# 3. Продакшн образ
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Копируем публичные файлы и standalone сборку
COPY --from=builder /app/apps/frontend/public ./apps/frontend/public

# Автоматически создается при output: 'standalone'
COPY --from=builder --chown=nextjs:nodejs /app/apps/frontend/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/frontend/.next/static ./apps/frontend/.next/static

USER nextjs

EXPOSE 3000

CMD ["node", "apps/frontend/server.js"]