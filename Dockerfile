FROM node:20-alpine

WORKDIR /app

COPY . .

RUN rm -rf node_modules

RUN npm i

EXPOSE 8000

CMD [ "npm", "start" ]