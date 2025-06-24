const { execSync } = require('child_process');
const fs = require('fs');

// List of countries you want to test
const countries = ['Tunisia', 'Algeria ', 'Libya','IvoryCoast','BurkinaFaso','Kuwait','Iraq','SaudiArabia','Oman','UAE'];

// Load AI-prioritized scenario list
const prioritized = JSON.parse(fs.readFileSync('prioritized.json', 'utf-8'));

for (const country of countries) {
  console.log(`🌍 Running scenarios for: ${country.toUpperCase()}\n`);

  // Set the country filter
  process.env.RUN_COUNTRY = country;

  for (const { name, priority, reason } of prioritized) {
    console.log(`▶ Running: ${name} [${priority}] for ${country}`);
    console.log(`🧠 Reason: ${reason}`);

    try {
      execSync(`npx cucumber-js --name "${name}"`, { stdio: 'inherit' });
    } catch (err) {
      console.warn(`❌ Failed for: ${country} — ${name}`);
    }

    console.log('---\n');
  }
}
