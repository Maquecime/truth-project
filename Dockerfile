# FROM node:16

# # Create app directory
# WORKDIR /usr/src/app

# # Install app dependencies
# # A wildcard is used to ensure both package.json AND package-lock.json are copied
# # where available (npm@5+)
# COPY package*.json ./

# RUN npm install
# # If you are building your code for production
# # RUN npm ci --only=production

# # Bundle app source
# COPY . .

# #EXPOSE 8080
# CMD [ "npm", "run", "dev" ]

# New cleaner Dockerfile

# develop stage
FROM node:lts as develop-stage
WORKDIR /usr/src/app
COPY package*.json ./
RUN yarn install
COPY . .
# build stage
FROM develop-stage as build-stage
RUN yarn build
# production stage
FROM nginx:1.15.7-alpine as production-stage
COPY default.conf /etc/nginx/conf.d/
COPY --from=build-stage /usr/src/app/dist/ /usr/share/nginx/html/
# To Heroku you can't expose a port
# EXPOSE 80
# To Heroku you need set port from env $PORT
CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'

