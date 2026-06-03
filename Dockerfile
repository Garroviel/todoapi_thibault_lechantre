FROM node:18-alpine AS dependencies

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production


FROM node:18-alpine

WORKDIR /app

ENV NODE_ENV=production

COPY --from=dependencies /app/node_modules ./node_modules

COPY src ./src
COPY package*.json ./

EXPOSE 3000

CMD ["npm", "start"]