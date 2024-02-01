FROM node:20.11.0-alpine AS development

WORKDIR /usr/src/app

ENV NODE_OPTIONS=--max_old_space_size=4096

COPY package*.json ./
COPY pnpm-lock.yaml ./

RUN npm install -g pnpm

RUN pnpm install

COPY . .

RUN npx prisma generate

RUN pnpm build
