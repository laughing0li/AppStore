# First image, build angular app
FROM node:18.16-alpine as node

ENV appdir /usr/src/app

WORKDIR ${appdir}

# Copy in npm files
COPY package*.json ./

# Install required npm packages
RUN npm install

# Copy all the other files
COPY . .

# Build angular's static website files
RUN npm run build --prod
COPY docker/apache.htaccess ./dist/.htaccess
RUN chmod a+r ./dist/.htaccess

# Second image, install website
FROM debian:bookworm-slim

ENV appdir /usr/src/app

WORKDIR ${appdir}

# Copy in the static website files from first image
COPY --chown=www-data:www-data --from=node /usr/src/app/dist /var/www/html/

# Website set up
COPY docker/000-default.conf /etc/apache2/sites-enabled/

# Install things necessary for apache & python
RUN apt-get update && apt-get upgrade -y && apt-get -y install apt-utils
RUN apt-get install -y apache2 apache2-dev libxml2-dev
RUN a2enmod rewrite && a2enmod proxy && a2enmod proxy_http && a2enmod proxy_html 

# Start services
COPY docker/startup.sh startup.sh
CMD ./startup.sh

EXPOSE 80

