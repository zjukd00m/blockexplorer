# Installing step
FROM node:lts AS installer

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn install

# Building step
FROM node:lts AS builder

WORKDIR /app

COPY package.json .
COPY yarn.lock .
COPY --from=installer /app/node_modules /app/node_modules
COPY src/ /app/src
COPY public/ /app/public
COPY tailwind.config.js .

RUN yarn build

# Server step
FROM nginx:latest AS runner

COPY --from=builder /app/build/ /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

CMD [ "nginx", "-g", "daemon off;" ]