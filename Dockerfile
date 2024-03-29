FROM node:18.19.0-alpine

WORKDIR /usr/src/app

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
COPY . .

# Install app dependencies
RUN npm install

RUN npm run build
CMD [ "node", "dist/index.js" ]