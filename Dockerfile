FROM node:alpine

WORKDIR /usr/src/app

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
COPY tsconfig.json tsconfig.json

# Install app dependencies
RUN npm install
