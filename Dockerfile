FROM node:16.15.1

WORKDIR /app

COPY package*.json ./

RUN yarn install

COPY . .

EXPOSE 3030

CMD ["node", "server.js"]