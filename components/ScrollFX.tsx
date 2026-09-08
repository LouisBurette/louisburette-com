'use client';
import { useEffect } from 'react';

export default function ScrollFX() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const revealAll = () => {
      document.querySelectorAll<HTMLElement>('[data-reveal]').forEach(el => {
        el.dataset.shown = '1';
        el.style.transition = '';
      });
      document.querySelectorAll<HTMLElement>('[data-strike-bar]').forEach(bar => {
        bar.style.transform = 'scaleX(1)';
      });
    };

    if (reduced) {
      revealAll();
      return;
    }

    // Stagger index within a group of siblings, computed once.
    const prepare = () => {
      document.querySelectorAll<HTMLElement>('[data-reveal]').forEach(el => {
        if (el.dataset.revealDelay) return;
        const parent = el.parentElement;
        const sibs = parent ? Array.from(parent.children).filter(c => c.hasAttribute('data-reveal')) : [el];
        el.dataset.revealDelay = String(Math.min(Math.max(sibs.indexOf(el), 0), 3) * 110);
      });
    };

    const tickReveal = () => {
      const vh = window.innerHeight;
      document.querySelectorAll<HTMLElement>('[data-reveal]').forEach(el => {
        if (el.dataset.shown) return;
        const r = el.getBoundingClientRect();
        if (r.top < vh * 0.9 && r.bottom > 0) {
          const d = el.dataset.revealDelay || '0';
          el.dataset.shown = '1';
          el.style.transition = `clip-path .82s cubic-bezier(.65,0,.35,1) ${d}ms, transform .82s cubic-bezier(.65,0,.35,1) ${d}ms`;
          window.setTimeout(() => { el.style.transition = ''; }, 900 + Number(d));
        }
      });
    };

    const tickStrike = () => {
      const vh = window.innerHeight;
      document.querySelectorAll<HTMLElement>('[data-strike]').forEach((el, i) => {
        if (el.dataset.struck) return;
        const r = el.getBoundingClientRect();
        if (r.top > vh * 0.88 || r.bottom < 0) return;
        el.dataset.struck = '1';
        const bar = el.querySelector<HTMLElement>('[data-strike-bar]');
        if (!bar) return;
        window.setTimeout(() => {
          bar.style.transition = 'transform .42s cubic-bezier(.2,.75,.3,1)';
          bar.style.transform = 'scaleX(1)';
          el.style.transition = 'color .42s ease';
          el.style.color = '#645F57';
        }, i * 110);
      });
    };

    const tickParallax = () => {
      const vh = window.innerHeight;
      document.querySelectorAll<HTMLElement>('[data-parallax]').forEach(el => {
        const amt = Number(el.dataset.parallax) || 12;
        const r = el.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) return;
        const c = (r.top + r.height / 2 - vh / 2) / vh;
        const scale = el.dataset.parallaxScale || '1.06';
        el.style.transform = `translateY(${(-c * amt).toFixed(1)}px) scale(${scale})`;
      });
    };

    let raf = 0;
    const tick = () => { tickReveal(); tickStrike(); tickParallax(); };
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => { raf = 0; tick(); });
    };

    prepare();
    tick();
    const settle = window.setTimeout(() => { prepare(); tick(); }, 600);
    const safety = window.setTimeout(revealAll, 8000);

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    /* ---------- custom cursor ---------- */
    let cursorEl: HTMLDivElement | null = null;
    let cursorRaf = 0;
    let onMove: ((e: MouseEvent) => void) | null = null;

    if (window.matchMedia('(pointer: fine)').matches) {
      const el = document.createElement('div');
      el.style.cssText =
        'position:fixed;top:0;left:0;width:20px;height:20px;background:#F3F1EC;mix-blend-mode:difference;pointer-events:none;z-index:9999;transform:translate3d(-100px,-100px,0);transition:width .14s ease,height .14s ease;';
      document.body.appendChild(el);
      cursorEl = el;

      let tx = -100, ty = -100, x = -100, y = -100, mode = 'idle';
      onMove = (e: MouseEvent) => {
        tx = e.clientX; ty = e.clientY;
        const target = e.target as HTMLElement | null;
        const hit = target?.closest?.('a,button,input,textarea');
        // Inline text links shrink the blob instead of growing it: a large
        // difference-blended square over 12px type makes the link unreadable.
        const inline = !!(hit && hit.tagName === 'A' && (hit as HTMLElement).offsetHeight < 44);
        const next = !hit ? 'idle' : inline ? 'small' : 'big';
        if (next !== mode) {
          mode = next;
          const size = next === 'big' ? 38 : next === 'small' ? 8 : 20;
          el.style.width = `${size}px`;
          el.style.height = `${size}px`;
        }
      };
      window.addEventListener('mousemove', onMove, { passive: true });

      const loop = () => {
        x += (tx - x) * 0.22;
        y += (ty - y) * 0.22;
        const s = mode === 'big' ? 19 : mode === 'small' ? 4 : 10;
        el.style.transform = `translate3d(${x - s}px,${y - s}px,0)`;
        cursorRaf = requestAnimationFrame(loop);
      };
      loop();
    }

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
      window.clearTimeout(settle);
      window.clearTimeout(safety);
      if (onMove) window.removeEventListener('mousemove', onMove);
      if (cursorRaf) cancelAnimationFrame(cursorRaf);
      cursorEl?.remove();
    };
  }, []);

  return null;
}
