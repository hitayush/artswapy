const { chromium } = require('playwright');
const path = require('path');
const ARTIFACT_DIR = 'C:\\Users\\HITAYUSH\\.gemini\\antigravity-ide\\brain\\9bd36c58-099c-4b80-98b1-06cb39d2f28f';

(async () => {
  const browser = await chromium.launch({ executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe' });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  const networkRequests = [];
  page.on('response', (res) => {
    if (res.url().includes('mp4') || res.url().includes('softtouch')) {
      networkRequests.push({ url: res.url(), status: res.status(), headers: res.headers() });
    }
  });

  await page.goto('http://localhost:3000/work/softtouch/', { waitUntil: 'networkidle' });
  
  // Scroll down to the video section
  const videoInfo = await page.evaluate(async () => {
    const video = document.querySelector('.cs-st-logo-video');
    if (!video) return { error: 'No video element found' };
    
    // Scroll video into view
    video.scrollIntoView({ behavior: 'instant', block: 'center' });
    
    return {
      src: video.currentSrc,
      readyState: video.readyState,
      networkState: video.networkState,
      duration: video.duration,
      currentTime: video.currentTime,
      paused: video.paused,
      muted: video.muted,
      videoWidth: video.videoWidth,
      videoHeight: video.videoHeight,
      error: video.error ? { code: video.error.code, message: video.error.message } : null,
      computedStyle: {
        width: window.getComputedStyle(video).width,
        height: window.getComputedStyle(video).height,
        display: window.getComputedStyle(video).display,
        visibility: window.getComputedStyle(video).visibility,
        opacity: window.getComputedStyle(video).opacity
      }
    };
  });

  console.log('Video Info:', JSON.stringify(videoInfo, null, 2));
  console.log('Network Requests:', JSON.stringify(networkRequests, null, 2));

  // Take screenshot of video in view
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'debug_video_section.png') });

  // Now let's try scrubbing or playing the video
  const playResult = await page.evaluate(async () => {
    const video = document.querySelector('.cs-st-logo-video');
    if (!video) return 'no video';
    try {
      video.muted = true;
      video.currentTime = video.duration ? video.duration / 2 : 1;
      return { currentTime: video.currentTime, duration: video.duration };
    } catch (e) {
      return { error: e.message };
    }
  });
  console.log('Play/Scrub test:', playResult);
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'debug_video_mid.png') });

  await browser.close();
})();
