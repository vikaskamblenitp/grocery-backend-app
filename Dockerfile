FROM node:18.18.1-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN apk update && \
    apk upgrade && \
    apk add make

RUN npm ci --ignore-scripts

COPY . .

EXPOSE 3001

CMD [ "npm", "run", "start:prod" ]
