FROM mcr.microsoft.com/playwright:next-focal
WORKDIR /app

# 1) Install your deps + prom-client + cucumber
COPY package*.json ./
RUN npm install --no-audit --no-fund \
 && npm install @cucumber/cucumber prom-client --save-dev

# 2) Install Playwright browsers
RUN apt-get update \
 && apt-get install -y ca-certificates \
 && update-ca-certificates \
 && npx playwright install --with-deps chrome

# 3) Copy app + metrics server
COPY . .
COPY metrics-server.js .

# 4) Make sure CLI scripts are executable
RUN chmod -R a+x /app/node_modules/.bin

# 5) Document the metrics port
EXPOSE 8000

# 6) Start both exporter & tests automatically
CMD ["sh", "-c", "node metrics-server.js & npx cucumber-js"]
