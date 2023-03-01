FROM node:alpine as builder
WORKDIR '/app'
COPY ./package.json ./
RUN npm install
RUN npm run build
COPY . .


FROM nginx
COPY --from=builder /app/dist /usr/nginx/html

# CMD ["npm", "run", "dev"]
# this production mode does not work as intended major code refactoring is required to properly function