FROM node:4.2

# Updating ubuntu packages
RUN apt-get update

ADD . /app

# Set current working directory as /app
WORKDIR /app

# Install npm packages
RUN npm install

CMD  node server.js