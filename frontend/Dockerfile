FROM node:18-alpine

WORKDIR /app

COPY package*.json /app/

RUN npm ci

COPY . .

RUN npm run build 


EXPOSE 9000

CMD ["npm", "run", "start"]

