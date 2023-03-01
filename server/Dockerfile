FROM node:alpine
WORKDIR "/app"

COPY ./package.json .

RUN npm install
RUN npm build


CMD ["npm", "start"]