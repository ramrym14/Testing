// make sure this is in your root folder
const reporter = require('multiple-cucumber-html-reporter');

reporter.generate({
  jsonDir: './report', // where the JSON was written
  reportPath: './report/html',
  pageTitle: 'Playwright Test Report - Delivery Module',
  reportName: 'Playwright BDD Execution Results',
  displayDuration: true,
  displayReportTime: true,
  pageFooter: `
    <div style="text-align:center; font-size: 14px; color: gray;">
      📘 Report generated by QA Automation Team – rim aissa <br>
      🔗 <a href="https://your-docs-link.com" target="_blank">Test Documentation</a>
    </div>
  `,
  metadata: {
    browser: { name: 'chrome', version: '123' },
    device: 'Local Machine',
    platform: { name: 'windows', version: '11' }
  },
  customData: {
    title: 'Test Run Info',
    data: [
      { label: 'Project', value: 'BDD + Playwright Tests' },
      { label: 'Module', value: 'Delivery Address Management' },
      { label: 'Release', value: 'v1.0' },
      { label: 'Executed By', value: 'rim aissa' },
      { label: 'Execution Type', value: 'Automated via CI/CD' },
      { label: 'Execution Date', value: new Date().toLocaleString() }
    ]
  }
});
