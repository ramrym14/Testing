FROM mcr.microsoft.com/playwright:next-focal
WORKDIR /app

# 1) Install just your deps so Docker can cache this layer
COPY package*.json ./
RUN npm install --no-audit --no-fund \
 && npm install @cucumber/cucumber --save-dev

# 2) Install Playwright browsers
RUN apt-get update \
 && apt-get install -y ca-certificates \
 && update-ca-certificates \
 && npx playwright install --with-deps chrome

# 3) Copy the rest of your app
COPY . .

# 4) **Ensure** the local CLI scripts are executable
RUN chmod -R a+x /app/node_modules/.bin

# Default to running Cucumber if you just do `docker run`
CMD ["npx", "cucumber-js"]
