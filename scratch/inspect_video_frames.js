const { chromium } = require('playwright');
const path = require('path');
const ARTIFACT_DIR = 'C:\\Users\\HITAYUSH\\.gemini\\antigravity-ide\\brain\\9bd36c58-099c-4b80-98b1-06cb39d2f28f';

(async () => {
  const browser = await chromium.launch({ executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe' });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  // Directly load the video file to inspect its frames
  await page.goto('http://localhost:3000/images/projects/softtouch/softtouch-logo-reveal.mp4');
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'raw_video_t0.png') });

  await page.evaluate(() => {
    const v = document.querySelector('video');
    v.currentTime = 0.5;
  });
  await page.waitForTimeout(300);
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'raw_video_t0_5.png') });

  await page.evaluate(() => {
    const v = document.querySelector('video');
    v.currentTime = 1.0;
  });
  await page.waitForTimeout(300);
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'raw_video_t1_0.png') });

  await page.evaluate(() => {
    const v = document.querySelector('video');
    v.currentTime = 1.8;
  });
  await page.waitForTimeout(300);
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'raw_video_t1_8.png') });

  await browser.close();
})();
