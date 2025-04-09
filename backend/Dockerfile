# Stage 1: Build Stage
FROM node:18 AS build

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Production Stage
FROM node:18 AS production

WORKDIR /usr/src/app

COPY --from=build /usr/src/app .
EXPOSE 3000

CMD ["npm", "run", "start:prod"]
