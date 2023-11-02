FROM node:21-bullseye-slim

WORKDIR /app

COPY . /app

RUN apt-get update \
    && apt-get install ca-certificates \
    && apt-get clean

RUN npm ci \
    && npm run build \
    && npm prune --production

CMD ["npm", "run", "start"]