FROM node:18.16.0 as builder

COPY package.json package.json
COPY package-lock.json package-lock.json
COPY tailwind.config.js tailwind.config.js

RUN npm install

COPY public ./public/
COPY nginx ./nginx/
COPY src src
COPY .env.local ./

RUN npm run build

FROM nginx:latest AS front

COPY --from=builder nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder nginx/ssl/ /etc/ssl/
COPY --chown=www-data:www-data --from=builder build/ /usr/share/nginx/html/