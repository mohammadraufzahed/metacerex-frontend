FROM node:18


WORKDIR /usr/app

COPY package.json . 

RUN npm i --location=global tailwindcss

RUN yarn 

COPY . .

RUN yarn build

CMD [ "yarn", "serve" ]

EXPOSE 9000