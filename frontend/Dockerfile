FROM node:19.4.0-alpine as builder

WORKDIR /frontend_t

COPY package*.json ./

RUN npm install


COPY . . 

RUN npm run build

FROM nginx:alpine

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /frontend_t/dist /usr/share/nginx/html

EXPOSE 5173

ENTRYPOINT ["nginx", "-g", "daemon off;"]
