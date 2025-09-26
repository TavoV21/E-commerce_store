FROM node:20

WORKDIR /Myapp

COPY package.json yarn.lock ./

ENV NODE_ENV=production

RUN yarn install 

COPY . . 

CMD [ "yarn", "start" ]