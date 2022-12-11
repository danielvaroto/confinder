FROM node:16 as build 
WORKDIR /app
COPY package.json .
COPY yarn.lock .
RUN yarn install
COPY . .
RUN yarn run build
CMD npx --yes serve -s build
