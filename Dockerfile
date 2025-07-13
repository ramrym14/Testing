FROM mcr.microsoft.com/playwright:next-focal

WORKDIR /app

# Copie les dépendances et installe-les
COPY package*.json ./
RUN npm install

# Forcer installation de Cucumber
RUN npm install @cucumber/cucumber --save-dev


# Met les binaires locaux dans le PATH  (cucumber-js, playwright, …)
ENV PATH="/app/node_modules/.bin:${PATH}"

# Mise à jour des certificats + Chrome
RUN apt-get update && apt-get install -y ca-certificates && update-ca-certificates
RUN npx playwright install --with-deps chrome
RUN  apt-get install -y xvfb

# Copie du reste du projet
COPY . .


# 5. Commande par défaut (CMD remplaçable)
CMD ["node", "node_modules/@cucumber/cucumber/bin/cucumber-js"]
