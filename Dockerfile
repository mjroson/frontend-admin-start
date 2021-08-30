FROM node:11.15.0

RUN mkdir -p /usr/src/app && cd /usr/src/app

WORKDIR /app

COPY package.json /app/package.json

RUN npm install
