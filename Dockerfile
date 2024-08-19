FROM node:20-slim AS development

WORKDIR /usr/src/app

ENV NODE_OPTIONS=--max_old_space_size=4096

COPY package*.json ./
COPY pnpm-lock.yaml ./

RUN apt-get update -y && apt-get install -y openssl procps && \
    npm install -g prisma && npm install --global pnpm

COPY . .

COPY tsconfig.json ./

RUN pnpm install && pnpm prisma generate

CMD ["pnpm", "start:dev"]
