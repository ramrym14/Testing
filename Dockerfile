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

# 3) Copy everything in your repo
COPY . .
# 3a) Copy our two exporters to the root
COPY metrics-server.js .
COPY test_metrics_exporter.js .

# 4) Make sure CLI scripts are executable
RUN chmod -R a+x /app/node_modules/.bin

# 5) Document the metrics port
EXPOSE 8000

# 6) On container start, launch both exporters in background, then run Cucumber
CMD ["sh", "-c", "\
    node metrics-server.js & \
    node test_metrics_exporter.js & \
    npx cucumber-js \
"]
