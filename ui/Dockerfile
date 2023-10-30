FROM node:21-bullseye-slim

WORKDIR /app

COPY . /app/

RUN npm ci \
    && npx next build \
    && npm prune --production

CMD ["npm", "run", "start"]