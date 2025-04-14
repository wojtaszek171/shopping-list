# Stage 1: Build
FROM node:18 AS build

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Copy .htaccess into build output
RUN cp public/.htaccess dist/.htaccess

# Stage 2: Apache server
FROM httpd:alpine AS production

# Enable mod_rewrite
RUN sed -i '/^#LoadModule rewrite_module/s/^#//' /usr/local/apache2/conf/httpd.conf

# Copy build files
COPY --from=build /usr/src/app/dist /usr/local/apache2/htdocs/

# Enable .htaccess usage
RUN sed -i 's/AllowOverride None/AllowOverride All/g' /usr/local/apache2/conf/httpd.conf && \
    printf '\n<Directory "/usr/local/apache2/htdocs">\n  AllowOverride All\n</Directory>\n' >> /usr/local/apache2/conf/httpd.conf

EXPOSE 80

CMD ["httpd-foreground"]