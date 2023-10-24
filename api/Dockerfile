FROM node:21-bullseye-slim

WORKDIR /app

COPY ./src ./test /app
COPY ./*.json ./*.js /app

RUN npm ci \
    && npm prune --production

CMD ["npm", "run", "start:prod"]