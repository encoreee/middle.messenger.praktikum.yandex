FROM node:16-alpine AS builder

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

FROM node:16-alpine AS production

WORKDIR /production

COPY --from=builder /app/package.json /app/yarn.lock ./

RUN yarn install --production

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server.js ./

EXPOSE 3000

CMD ["node", "./server.js"]
