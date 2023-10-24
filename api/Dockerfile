FROM node:21-bullseye

WORKDIR /app

COPY ./src ./test /app
COPY ./*.json ./*.js /app

RUN npm ci \
    && npm prune --production

CMD ["npm", "run", "start:prod"]