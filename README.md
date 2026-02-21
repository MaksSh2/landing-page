# Landing page + Node.js backend

## Локальный запуск
1. `npm install`
2. `npm start`
3. Открыть `http://localhost:3000`

## Подготовка к reg.ru
- Установить Node.js 18+ на VPS.
- Склонировать репозиторий и выполнить `npm install --production`.
- Запустить через process manager (например, PM2):
  - `npm i -g pm2`
  - `pm2 start server.js --name landing-page`
  - `pm2 save`
- Проксировать домен через Nginx на порт `3000`.

Пример server блока Nginx:

```nginx
server {
    listen 80;
    server_name your-domain.ru www.your-domain.ru;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```
