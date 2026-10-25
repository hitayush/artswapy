'use client';

export type SoundKind = 'click' | 'hover' | 'toggle' | 'stamp' | 'drawer';

const SFX_STORAGE_KEY = 'artswapy-sfx';
const SFX_EVENT = 'artswapy-sfx-change';

let audioContext: AudioContext | null = null;
let audioBuffer: AudioBuffer | null = null;
let isAudioFetching = false;
let isMuted = false;
let lastHoverTime = 0;

/** Initialize sound preferences from localStorage */
export function initSfx() {
  if (typeof window === 'undefined') return;
  try {
    const saved = localStorage.getItem(SFX_STORAGE_KEY);
    // Sound is ON by default unless explicitly turned off
    isMuted = saved === 'off';
  } catch {
    isMuted = false;
  }
}

/** Check if SFX is currently muted */
export function isSfxMuted(): boolean {
  if (typeof window === 'undefined') return false;
  return isMuted;
}

/** Toggle SFX on/off */
export function setSfxMuted(muted: boolean) {
  isMuted = muted;
  try {
    localStorage.setItem(SFX_STORAGE_KEY, muted ? 'off' : 'on');
  } catch {
    // Ignore storage issues in restricted modes
  }
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(SFX_EVENT, { detail: { isMuted: muted } }));
  }
}

/** Toggle muted state and return new state */
export function toggleSfx(): boolean {
  const next = !isMuted;
  setSfxMuted(next);
  if (!next) {
    // Play an instant tactile confirmation when unmuting
    playSfx('toggle');
  }
  return next;
}

/** Ensure AudioContext is initialized and resumed */
function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioContext) {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioCtx) {
      audioContext = new AudioCtx();
    }
  }
  if (audioContext && audioContext.state === 'suspended') {
    audioContext.resume().catch(() => {});
  }
  return audioContext;
}

/** Preload the audio file into memory as an AudioBuffer for zero latency */
export async function preloadSfx(): Promise<void> {
  if (typeof window === 'undefined' || audioBuffer || isAudioFetching) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  isAudioFetching = true;
  try {
    // Try primary path, fallback to root path if needed
    let res = await fetch('/audio/sfx.wav');
    if (!res.ok) {
      res = await fetch('/sfx.wav');
    }
    if (!res.ok) throw new Error(`Failed to load sfx: ${res.status}`);

    const arrayBuffer = await res.arrayBuffer();
    audioBuffer = await ctx.decodeAudioData(arrayBuffer);
  } catch (err) {
    console.warn('[ArtSwapy SFX] Could not preload audio:', err);
  } finally {
    isAudioFetching = false;
  }
}

/** Play a sound with specific volume and pitch profile */
export function playSfx(kind: SoundKind = 'click') {
  if (typeof window === 'undefined' || isMuted) return;

  const now = performance.now();
  if (kind === 'hover') {
    // Throttle hover triggers to avoid buzzing on fast cursor sweeps
    if (now - lastHoverTime < 65) return;
    lastHoverTime = now;
  }

  const ctx = getAudioContext();
  if (!ctx) return;

  // If buffer isn't decoded yet, trigger preload and play on finish
  if (!audioBuffer) {
    preloadSfx().then(() => {
      if (audioBuffer && !isMuted) {
        executePlayback(ctx, audioBuffer, kind);
      }
    });
    return;
  }

  executePlayback(ctx, audioBuffer, kind);
}

function executePlayback(ctx: AudioContext, buffer: AudioBuffer, kind: SoundKind) {
  try {
    const source = ctx.createBufferSource();
    source.buffer = buffer;

    const gainNode = ctx.createGain();
    const startTime = ctx.currentTime;

    switch (kind) {
      case 'hover': {
        // Ultra-soft, high-pitched subtle tick
        source.playbackRate.value = 1.25;
        gainNode.gain.setValueAtTime(0.08, startTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + 0.08);
        break;
      }
      case 'toggle': {
        // Distinct, crisp toggle
        source.playbackRate.value = 1.08;
        gainNode.gain.setValueAtTime(0.32, startTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + 0.35);
        break;
      }
      case 'stamp': {
        // Deeper, firm stamp for copy email and confirmations
        source.playbackRate.value = 0.94;
        gainNode.gain.setValueAtTime(0.38, startTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + 0.42);
        break;
      }
      case 'drawer': {
        // Accordion open / close tactile feedback
        source.playbackRate.value = 1.04;
        gainNode.gain.setValueAtTime(0.28, startTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + 0.3);
        break;
      }
      case 'click':
      default: {
        // Standard tactile click
        source.playbackRate.value = 1.0;
        gainNode.gain.setValueAtTime(0.26, startTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + 0.32);
        break;
      }
    }

    source.connect(gainNode);
    gainNode.connect(ctx.destination);
    source.start(startTime);
  } catch (err) {
    console.warn('[ArtSwapy SFX] Playback error:', err);
  }
}

let lastCharIdx = -1;
let lastCharPlayTime = 0;

/** Play a dynamic pitched tick for hovering over individual letters in the wordmark */
export function playCharHover(charIndex: number, totalChars: number = 8) {
  if (typeof window === 'undefined' || isMuted) return;

  const now = performance.now();
  // If user is hovering the same character and less than 120ms passed, do not repeat
  if (charIndex === lastCharIdx && now - lastCharPlayTime < 120) return;
  // Global char throttle (at least 35ms between characters) so fast sweeps are smooth
  if (now - lastCharPlayTime < 35) return;

  lastCharIdx = charIndex;
  lastCharPlayTime = now;

  const ctx = getAudioContext();
  if (!ctx) return;

  const play = () => {
    if (!audioBuffer || isMuted) return;
    try {
      const source = ctx.createBufferSource();
      source.buffer = audioBuffer;

      // Pentatonic/harmonic scale: 0.94 up to 1.48
      const pitchRatio = 0.94 + (charIndex / Math.max(1, totalChars - 1)) * 0.54;
      source.playbackRate.value = pitchRatio;

      const gainNode = ctx.createGain();
      const startTime = ctx.currentTime;
      // Soft, satisfying micro-tap
      gainNode.gain.setValueAtTime(0.12, startTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + 0.09);

      source.connect(gainNode);
      gainNode.connect(ctx.destination);
      source.start(startTime);
    } catch (err) {
      console.warn('[ArtSwapy SFX] Char playback error:', err);
    }
  };

  if (!audioBuffer) {
    preloadSfx().then(play);
  } else {
    play();
  }
}
