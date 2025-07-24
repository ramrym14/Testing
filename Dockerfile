FROM mcr.microsoft.com/playwright:next-focal

WORKDIR /app

# Copy dependencies and install
COPY package*.json ./
RUN npm install
RUN npm install @cucumber/cucumber --save-dev

# ✅  les permissions
RUN chmod -R +x /app/node_modules/.bin

# ✅ Add local binaries to PATH (so npx works)
ENV PATH="/app/node_modules/.bin:${PATH}"

# Install certs and Chrome
RUN apt-get update && apt-get install -y ca-certificates && update-ca-certificates
RUN npx playwright install --with-deps chrome

# ❌ xvfb is unnecessary unless you use headful (so we skip it)
# RUN apt-get install -y xvfb

# Copy the full project
COPY . .

# Optional default command
CMD ["npx", "cucumber-js"]
