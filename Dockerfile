# Dockerfile.react
FROM node:18 AS build
WORKDIR /LMS_Project_FE
COPY LMS_Project_FE/package*.json ./
RUN npm install
COPY LMS_Project_FE/. ./
RUN npm run build

FROM nginx:latest
COPY --from=build /LMS_Project_FE/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
