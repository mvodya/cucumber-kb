FROM node:21-bullseye-slim

WORKDIR /app

COPY . /app

RUN npm ci \
    && npm run build \
    && npm prune --production

CMD ["npm", "run", "start"]