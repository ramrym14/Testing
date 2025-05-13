FROM mcr.microsoft.com/playwright:next-focal

WORKDIR /app

# Copy package files and install Node.js dependencies
COPY package*.json ./
RUN npm install
RUN apt-get update && apt-get install -y ca-certificates && update-ca-certificates
# Install Google Chrome inside the container
RUN npx playwright install --with-deps chrome

# Copy the rest of your project files
COPY . .

# Entrypoint for Cucumber tests / run  auto tests using cucumber to run BDD test 
ENTRYPOINT ["npx", "cucumber-js"]