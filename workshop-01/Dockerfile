# set runtime
FROM node:22-bullseye

WORKDIR /app

COPY package.json .
COPY package-lock.json .
COPY public public
COPY views views
COPY main.js .


RUN npm ci

ENV  APP_PORT=3000
EXPOSE ${APP_PORT}

ENTRYPOINT node main.js