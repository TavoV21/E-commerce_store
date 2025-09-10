FROM node

WORKDIR /Myapp

COPY package.json yarn.lock ./

RUN yarn install 

COPY . . 

CMD [ "yarn", "dev" ]