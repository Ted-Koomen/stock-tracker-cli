FROM node:latest
    WORKDIR '/app'
    COPY ./package.json ./
    RUN npm install
    RUN npm install -g stock-tracker-node
    COPY . .
    