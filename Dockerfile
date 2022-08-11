FROM node:18-alpine as builder

WORKDIR /src/app

COPY package.json .

RUN yarn

COPY . .

RUN yarn build

ENV NODE_ENV=production

CMD ["yarn", "remix-serve", "build"]