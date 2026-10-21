import RevealRoot from '@/components/primitives/RevealRoot';
import { showreel } from '@/content/site';
import ShowreelPlayer from './ShowreelPlayer.client';

export default function Showreel() {
  return (
    <RevealRoot as="section" id="showreel" className="showreel" aria-label="Studio Showreel">
      <div className="showreel-header">
        <div className="showreel-meta">
          <span className="ph-tag">{showreel.tag}</span>
          <span className="small muted">Craft in motion</span>
        </div>
        <span className="small muted showreel-cue">Sound off by default</span>
      </div>
      <div className="showreel-wrapper" data-r="shutter">
        <ShowreelPlayer
          youtubeId={showreel.youtubeId}
          title={showreel.title}
          caption={showreel.caption}
        />
      </div>
    </RevealRoot>
  );
}
