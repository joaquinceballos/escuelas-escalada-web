FROM node:15.11.0-alpine3.10 as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.19.8-alpine as production-stage
COPY --from=build-stage /app/dist /etc/nginx/html
EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]
