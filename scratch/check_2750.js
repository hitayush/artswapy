const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe' });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3000/work/softtouch/', { waitUntil: 'networkidle' });
  await page.evaluate(() => window.scrollTo(0, 2750));
  await page.waitForTimeout(300);
  await page.screenshot({ path: 'C:\\Users\\HITAYUSH\\.gemini\\antigravity-ide\\brain\\9bd36c58-099c-4b80-98b1-06cb39d2f28f\\video_at_2750.png' });
  await browser.close();
})();
