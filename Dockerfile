FROM php:8.1-apache

RUN apt-get update && apt-get install -y \
    libzip-dev zip  zlib1g-dev libpng-dev acl curl apt-transport-https locales wget gnupg supervisor \
 && rm -rf /var/lib/apt/lists/*
RUN docker-php-ext-install pdo gd zip mysqli pdo_mysql
RUN docker-php-ext-enable pdo_mysql

COPY docker/php.ini /usr/local/etc/php/

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php \
    && mv composer.phar /usr/local/bin/composer \
    && chmod +x /usr/local/bin/composer

# Install Yarn
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update && apt-get install -y yarn

WORKDIR /var/www/project

ENV APP_ENV=prod
ENV HTTPDUSER='www-data'

EXPOSE 8080

COPY docker/000-default.conf /etc/apache2/sites-available/

COPY . /var/www/project/
RUN cd /var/www/project && composer install \
    && composer clear-cache
RUN cd /var/www/project && yarn install && yarn build

RUN setfacl -dR -m u:"$HTTPDUSER":rwX -m u:$(whoami):rwX /var
RUN setfacl -R -m u:"$HTTPDUSER":rwX -m u:$(whoami):rwX /var
RUN echo "Listen 8080" >> /etc/apache2/ports.conf
RUN mkdir -p /var/www/project/var/log/
RUN mkdir -p /var/www/project/var/cache/
RUN usermod -u 1000 www-data
RUN chown -R www-data:www-data /var/www/
RUN a2enmod rewrite
USER www-data

RUN php bin/console cache:clear --no-warmup && \
    php bin/console cache:warmup

ADD docker/conf.d/supervisor.conf /etc/supervisor/conf.d/supervisor.conf
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisor.conf"]