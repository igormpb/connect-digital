FROM node:22-alpine

WORKDIR /app

COPY package.json yarn.lock ./
COPY tsconfig*.json ./
COPY vite.config.ts ./
COPY . .

RUN yarn install --frozen-lockfile
RUN yarn build

EXPOSE 4173

CMD ["yarn", "preview", "--host"]
