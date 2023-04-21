FROM ghcr.io/puppeteer/puppeteer:19.9.1

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
COPY . .
CMD [ "node", "server.js" ]
