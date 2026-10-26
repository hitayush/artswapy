'use client';

import { useEffect, useRef, useState } from 'react';

interface ShowreelPlayerProps {
  youtubeId: string;
  title: string;
  caption: string;
}

export default function ShowreelPlayer({ youtubeId, title, caption }: ShowreelPlayerProps) {
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isTheater, setIsTheater] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    if (document.documentElement.dataset.intro !== 'play') {
      setShouldLoad(true);
      return;
    }
    const observer = new MutationObserver(() => {
      if (document.documentElement.dataset.intro !== 'play') {
        setShouldLoad(true);
        observer.disconnect();
      }
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-intro'] });
    return () => observer.disconnect();
  }, []);

  const postToPlayer = (func: string, args: unknown[] = []) => {
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: 'command', func, args }),
      'https://www.youtube-nocookie.com'
    );
  };

  const toggleSound = () => {
    if (isMuted) {
      postToPlayer('unMute');
      postToPlayer('setVolume', [100]);
      postToPlayer('playVideo');
      setIsMuted(false);
      setIsPlaying(true);
    } else {
      postToPlayer('mute');
      setIsMuted(true);
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      postToPlayer('pauseVideo');
      setIsPlaying(false);
    } else {
      postToPlayer('playVideo');
      setIsPlaying(true);
    }
  };

  const toggleFullscreen = () => {
    const el = frameRef.current;
    if (!el) return;
    if (!document.fullscreenElement) {
      el.requestFullscreen().catch(() => {
        setIsTheater(!isTheater);
      });
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  useEffect(() => {
    const onFsChange = () => {
      setIsTheater(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', onFsChange);
    return () => document.removeEventListener('fullscreenchange', onFsChange);
  }, []);

  const embedUrl = `https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&mute=1&loop=1&playlist=${youtubeId}&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&playsinline=1&enablejsapi=1`;

  return (
    <div
      ref={frameRef}
      className={`showreel-frame ${isTheater ? 'theater' : ''}`.trim()}
      data-playing={isPlaying}
      data-muted={isMuted}
    >
      <div className="showreel-video-wrap">
        {shouldLoad && (
          <iframe
            ref={iframeRef}
            src={embedUrl}
            title={title}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
            className="showreel-iframe"
            tabIndex={-1}
          />
        )}
      </div>

      {/* Subtle overlay gradient & interaction cues */}
      <div className="showreel-overlay" onClick={togglePlay}>
        <div className="showreel-badge">
          <span className="pulse-dot" aria-hidden="true" />
          <span className="small">{isPlaying ? 'Live Preview' : 'Paused'}</span>
        </div>

        {!isPlaying && (
          <div className="showreel-center-play" aria-hidden="true">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="6 4 20 12 6 20 6 4" />
            </svg>
          </div>
        )}

        <div className="showreel-bottom-bar" onClick={(e) => e.stopPropagation()}>
          <div className="showreel-caption">
            <span className="caption-title">{title}</span>
            <span className="caption-sub small muted">{caption}</span>
          </div>

          <div className="showreel-actions">
            <button
              type="button"
              className="showreel-btn showreel-sound-btn"
              onClick={toggleSound}
              aria-label={isMuted ? 'Unmute video audio' : 'Mute video audio'}
            >
              {isMuted ? (
                <>
                  <SoundMutedIcon />
                  <span>Play with sound</span>
                </>
              ) : (
                <>
                  <SoundActiveIcon />
                  <span>Mute</span>
                </>
              )}
            </button>

            <button
              type="button"
              className="showreel-btn showreel-icon-only"
              onClick={toggleFullscreen}
              aria-label="Expand to full screen"
              title="Full screen"
            >
              <ExpandIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SoundMutedIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <line x1="23" y1="9" x2="17" y2="15" />
      <line x1="17" y1="9" x2="23" y2="15" />
    </svg>
  );
}

function SoundActiveIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    </svg>
  );
}

function ExpandIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M15 3h6v6" />
      <path d="M9 21H3v-6" />
      <path d="M21 3l-7 7" />
      <path d="M3 21l7-7" />
    </svg>
  );
}
