import { useEffect, useRef } from 'react';
import { perfStore } from './perfStore';
import { handStore } from '../hooks/handStore';

const REFRESH_MS = 250;

/** Overlay de rendimiento (solo con ?debug=1). Se actualiza con textContent, sin estado de React. */
export default function PerfOverlay() {
  const ref = useRef<HTMLPreElement>(null);

  useEffect(() => {
    const id = setInterval(() => {
      const el = ref.current;
      if (!el) return;
      const p = perfStore;
      const detecting = handStore.detectionFps > 0;
      el.textContent =
        `render   ${p.renderFps.toFixed(1)} fps  (peor ${p.worstFrameMs.toFixed(1)} ms)\n` +
        `detecc.  ${detecting ? `${handStore.detectionFps.toFixed(1)} Hz  (${p.detectMs.toFixed(1)} ms)` : '—'}\n` +
        `delegado ${p.delegate ?? '—'}`;
    }, REFRESH_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <pre
      ref={ref}
      aria-hidden="true"
      style={{
        position: 'absolute',
        left: '1rem',
        top: '1rem',
        margin: 0,
        padding: '0.4rem 0.6rem',
        borderRadius: '6px',
        backgroundColor: 'rgba(15, 23, 42, 0.85)',
        border: '1px solid #1e293b',
        color: '#a5f3fc',
        fontSize: '0.7rem',
        lineHeight: 1.35,
        pointerEvents: 'none',
        zIndex: 20,
      }}
    />
  );
}
