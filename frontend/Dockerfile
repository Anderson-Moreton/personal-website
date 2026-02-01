# Build Angular
FROM node:20 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Nginx
FROM nginx:alpine
COPY --from=build /app/dist/personal-website /usr/share/nginx/html
EXPOSE 80