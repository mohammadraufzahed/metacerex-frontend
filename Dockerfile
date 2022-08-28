FROM node:18-alpine as builder


WORKDIR /usr/app

COPY package.json . 

RUN yarn config set "strict-ssl" false -g

RUN yarn 

COPY . .

RUN yarn build

FROM nginx:latest

COPY --from=builder /usr/app/dist /usr/web

COPY ./nginx/default.conf /etc/nginx/conf.d