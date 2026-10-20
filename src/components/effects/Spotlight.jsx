import { useEffect, useRef } from "react";

// A faint accent glow that follows the cursor across the page. Mouse/trackpad only; off for reduced motion.
// Sits behind all content (fixed, negative z-index) and updates two CSS variables at most once per frame.
function Spotlight() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!el || !finePointer || reduce) return undefined;

    let raf = 0;
    let x = 0;
    let y = 0;

    const onMove = (event) => {
      x = event.clientX;
      y = event.clientY;
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        el.style.setProperty("--spot-x", `${x}px`);
        el.style.setProperty("--spot-y", `${y}px`);
        el.style.opacity = "1";
      });
    };
    const onLeave = () => {
      el.style.opacity = "0";
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(600px_circle_at_var(--spot-x)_var(--spot-y),rgb(var(--accent)/0.07),transparent_60%)] opacity-0 transition-opacity duration-slow"
    />
  );
}

export default Spotlight;
