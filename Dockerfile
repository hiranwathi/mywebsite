FROM php:8.2-apache
# Copy all your files into the server's public folder
COPY . /var/www/html/
# Expose port 80
EXPOSE 80