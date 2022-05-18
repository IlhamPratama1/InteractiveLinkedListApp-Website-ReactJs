FROM node:18-alpine as base
WORKDIR /home/node/interactive-linked-list-api

COPY package*.json ./

RUN npm install

COPY . .