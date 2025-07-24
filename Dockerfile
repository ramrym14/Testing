FROM mcr.microsoft.com/playwright:next-focal

WORKDIR /app

# 1. Copier les dépendances
COPY package*.json ./

# 2. Installer les dépendances du projet
RUN npm install

# 3. Installer Cucumber (BDD)
RUN npm install @cucumber/cucumber --save-dev

# ✅ 4. Corriger les permissions sur les binaires locaux
RUN chmod -R a+x node_modules/.bin

# 5. Ajouter les binaires locaux dans le PATH (pour pouvoir appeler cucumber-js, playwright, etc.)
ENV PATH="/app/node_modules/.bin:${PATH}"

# 6. Mise à jour des certificats et installation Chrome
RUN apt-get update && apt-get install -y ca-certificates && update-ca-certificates
RUN npx playwright install --with-deps chrome

# 7. (Optionnel) Installer xvfb, utile uniquement si tu utilises Chrome en mode headful
RUN apt-get install -y xvfb

# 8. Copier le reste du code
COPY . .

# ✅ 9. Commande par défaut — peut être remplacée dans Jenkins par `npx cucumber-js`
CMD ["npx", "cucumber-js"]

