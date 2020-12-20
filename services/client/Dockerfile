FROM node:alpine as builder

# create and set app directory
RUN mkdir -p /usr/src/app/
WORKDIR /usr/src/app/

COPY package.json .
RUN npm install

COPY . .
RUN npm run build

FROM ngnix
EXPOSE 80
COPY --from=builder /usr/src/app/build /usr/share/ngnix/html