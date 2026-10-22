import { ImageResponse } from 'next/og';
import { site } from '@/content/site';

export const socialImageSize = { width: 1200, height: 630 };
export const socialImageAlt = 'ArtSwapy — independent brand strategy, identity and packaging design';

export function createSocialImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '58px 68px',
          backgroundColor: '#f6f4ef',
          color: '#161614',
          fontFamily: 'Arial, sans-serif'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 24, fontWeight: 700, letterSpacing: '-0.04em' }}>{site.name}</span>
          <span style={{ fontSize: 17, color: '#5b5850' }}>INDEPENDENT BRAND PRACTICE</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <span style={{ fontSize: 100, lineHeight: 0.95, fontWeight: 700, letterSpacing: '-0.07em' }}>
            Brand, with meaning.
          </span>
          <span style={{ fontSize: 28, color: '#5b5850' }}>
            Strategy · Identity · Packaging · Communications
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ width: 104, height: 5, backgroundColor: '#b23506' }} />
          <span style={{ fontSize: 20 }}>Swapnil Gathibandhe</span>
        </div>
      </div>
    ),
    socialImageSize
  );
}
