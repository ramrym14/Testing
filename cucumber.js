module.exports = {
  default: [
    '--require ./utils/hooks.js',           // ✅ Load hooks from utils
    '--require ./steps/**/*.js',           // ✅ Load step definitions
    '--format json:./report/cucumber-report.json',
    '--format progress',
    '--publish'
  ].join(' ')
};
