FROM node:24-alpine AS builder

ENV DO_NOT_TRACK=1
RUN corepack enable

WORKDIR /app

COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./
COPY apps/frontend/package.json ./apps/frontend/
COPY packages/utils/package.json ./packages/utils/
COPY packages/ui/package.json ./packages/ui/
COPY packages/tooling-config/package.json ./packages/tooling-config/

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm web:build

FROM nginx:alpine

# LABEL org.opencontainers.image.source=https://gitlab.prodcontest.com/team-26/frontend
LABEL org.opencontainers.image.title=frontend
LABEL org.opencontainers.image.description="Next.js frontend"


COPY --from=builder /app/apps/frontend/out /usr/share/nginx/html

COPY assets/docker/nginx.conf /etc/nginx/conf.d/default.conf


EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]
