# Stage 1: Build Stage
FROM node:18 AS build

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build
RUN cp public/.htaccess dist/.htaccess

# Stage 2: Apache Server
FROM httpd:alpine

# Enable mod_rewrite
RUN sed -i '/^#LoadModule rewrite_module/s/^#//' /usr/local/apache2/conf/httpd.conf

# Create temporary app directory
RUN mkdir /app

# Copy built app to temporary location
COPY --from=build /usr/src/app/dist /app

# Enable .htaccess
RUN sed -i 's/AllowOverride None/AllowOverride All/g' /usr/local/apache2/conf/httpd.conf && \
    printf '\n<Directory "/usr/local/apache2/htdocs">\n  AllowOverride All\n</Directory>\n' >> /usr/local/apache2/conf/httpd.conf

# Start-up script to copy files only if volume is empty
CMD sh -c ' \
  echo "window.__RUNTIME_CONFIG__ = {" \
  "API_URL: \"${API_URL}\"," \
  "FEATURE_X: \"${FEATURE_X}\"" \
  "};" > /usr/local/apache2/htdocs/runtime-env.js && \
  httpd-foreground'
