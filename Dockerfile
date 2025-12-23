# ======================
# STAGE 1: Frontend build (Vite)
# ======================
FROM node:20-alpine AS node-builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY postcss.config.js tailwind.config.js vite.config.* ./
COPY resources resources
RUN npm run build


# ======================
# STAGE 2: PHP + Nginx
# ======================
FROM php:8.3-fpm

# Install system deps + nginx + PHP extensions
RUN apt-get update && apt-get install -y \
    nginx git unzip libzip-dev libpq-dev libonig-dev curl \
    && docker-php-ext-install pdo pdo_mysql pdo_pgsql zip \
    && rm -rf /var/lib/apt/lists/*

# 🔴 ROOT LARAVEL STANDAR
WORKDIR /var/www/html

# Copy Laravel source
COPY . .

# Copy Vite build result
COPY --from=node-builder /app/public/build public/build

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer
RUN composer install --no-dev --optimize-autoloader --no-interaction

# Nginx config
COPY nginx/default.conf /etc/nginx/sites-available/default

# Permissions (penting untuk volume)
RUN chown -R www-data:www-data storage bootstrap/cache \
    && chmod -R 775 storage bootstrap/cache

# Healthcheck untuk monitoring (compatible dengan LXC)
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
    CMD pgrep php-fpm && pgrep nginx || exit 1

EXPOSE 80

# 🔴 storage:link DI RUNTIME (AMAN DENGAN VOLUME)
CMD ["sh", "-c", "php artisan config:cache && php artisan route:cache && php artisan storage:link || true && php-fpm -D && nginx -g 'daemon off;'"]
