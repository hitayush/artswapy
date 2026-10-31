const { chromium } = require('playwright');
const path = require('path');
const ARTIFACT_DIR = 'C:\\Users\\HITAYUSH\\.gemini\\antigravity-ide\\brain\\9bd36c58-099c-4b80-98b1-06cb39d2f28f';

(async () => {
  const browser = await chromium.launch({ executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe' });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  await page.goto('http://localhost:3000/work/softtouch/', { waitUntil: 'networkidle' });
  
  // Check if poster is being displayed instead of video
  const test1 = await page.evaluate(() => {
    const video = document.querySelector('.cs-st-logo-video');
    return {
      poster: video.poster,
      currentTime: video.currentTime,
      paused: video.paused,
      readyState: video.readyState
    };
  });
  console.log('Test 1 before scroll:', test1);

  // Scroll smoothly through the section like a real user
  for (let y = 0; y <= 3500; y += 100) {
    await page.evaluate((pos) => window.scrollTo(0, pos), y);
    await page.waitForTimeout(50);
  }

  const test2 = await page.evaluate(() => {
    const video = document.querySelector('.cs-st-logo-video');
    return {
      currentTime: video.currentTime,
      paused: video.paused,
      scrollY: window.scrollY
    };
  });
  console.log('Test 2 after scroll to 3500:', test2);
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'test_user_scrolled_to_video.png') });

  await browser.close();
})();
