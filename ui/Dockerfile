FROM node:21-bullseye-slim

WORKDIR /app

COPY . /app

ENV SENTRY_DSN=$SENTRY_DSN_UI

RUN apt-get update \
    && apt-get install -y ca-certificates \
    && apt-get clean

RUN npm ci \
    && npm run build \
    && npm prune --production

CMD ["npm", "run", "start"]