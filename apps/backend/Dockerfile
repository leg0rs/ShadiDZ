FROM node:20-alpine AS builder

ENV DO_NOT_TRACK=1
RUN corepack enable

WORKDIR /app

# Копируем ВСЕ package.json для корректной работы lockfile
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./
COPY apps/backend/package.json ./apps/backend/
COPY apps/frontend/package.json ./apps/frontend/
COPY packages/databases/package.json ./packages/databases/
COPY packages/auth/package.json ./packages/auth/
COPY packages/tooling-config/package.json ./packages/tooling-config/
COPY packages/ui/package.json ./packages/ui/
COPY packages/utils/package.json ./packages/utils/

RUN pnpm install --frozen-lockfile

# Копируем исходный код
COPY . .

# Генерируем клиент Prisma
RUN pnpm db:generate

# Собираем бэкенд
RUN pnpm bac:build

# Production stage
FROM node:20-alpine AS production

ENV DO_NOT_TRACK=1
ENV NODE_ENV=production
RUN corepack enable

WORKDIR /app

# Копируем package.json файлы снова для prod install
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./
COPY apps/backend/package.json ./apps/backend/
COPY packages/databases/package.json ./packages/databases/
COPY packages/auth/package.json ./packages/auth/
COPY packages/tooling-config/package.json ./packages/tooling-config/
# UI и Frontend тут не нужны для работы бэка

RUN pnpm install --frozen-lockfile --prod

# Копируем собранный код
COPY --from=builder /app/apps/backend/dist ./apps/backend/dist
COPY --from=builder /app/packages ./packages
COPY --from=builder /app/apps/backend/data ./apps/backend/data
# Копируем схему призмы, она нужна для работы клиента
COPY --from=builder /app/packages/databases/prisma ./packages/databases/prisma

WORKDIR /app/apps/backend

EXPOSE 8080

CMD ["node", "dist/main.js"]