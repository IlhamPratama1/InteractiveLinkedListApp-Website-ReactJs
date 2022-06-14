FROM node:18-alpine as base
WORKDIR /home/node/interactive-linked-website

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "start"]