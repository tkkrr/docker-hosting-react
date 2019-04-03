FROM nginx:latest

COPY . /app/

WORKDIR /app

RUN apt update && \
    apt install -y curl && \
    curl -sL https://deb.nodesource.com/setup_10.x | bash - && \
    apt install -y nodejs && \
    npm install && \
    npm run build && \
    cp -r ./dist/* /usr/share/nginx/html