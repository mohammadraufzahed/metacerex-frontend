FROM node:19 as builder


WORKDIR /usr/app

COPY package.json . 

RUN npm install 

COPY . .

RUN npm run build

FROM nginx:latest

COPY --from=builder /usr/app/build /usr/web

COPY ./nginx/default.conf /etc/nginx/conf.d