FROM node:18.16.0

WORKDIR /app

EXPOSE 80

COPY package*.json ./

RUN npm install -g serve

COPY . .

CMD ["serve", "-s", "build", "-l", "80"]