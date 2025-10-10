FROM node:20

WORKDIR /Myapp

COPY package.json yarn.lock jest.setup.js ./

RUN yarn install --frozen-lockfile

COPY . . 

CMD [ "yarn", "start" ]