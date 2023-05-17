FROM node:16-alpine

WORKDIR /app

COPY package.json package.json
COPY yarn.lock yarn.lock

RUN yarn

COPY . .

CMD ["sh", "-c", "yarn build;yarn start"]