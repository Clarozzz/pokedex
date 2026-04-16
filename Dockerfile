FROM node:24.14.0

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npx", "ng", "serve", "--host", "0.0.0.0"]