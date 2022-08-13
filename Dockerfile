FROM node:18-alpine

WORKDIR /app

COPY package.json .

RUN yarn

COPY . .

RUN yarn build

CMD [ "yarn", "serve" ]

EXPOSE 9000