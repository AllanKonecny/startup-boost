FROM node:alpine

COPY . ./usr/src/app

WORKDIR /usr/src/app

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]
