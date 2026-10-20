import { useEffect, useRef, useState } from "react";

const prefersReducedMotion = () => window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

// Returns [ref, revealed]: revealed flips to true the first time the element is `threshold` visible.
// Starts revealed under reduced motion (or without IntersectionObserver), so nothing ever waits on animation.
export default function useRevealOnce(threshold = 0.3) {
  const ref = useRef(null);
  const [revealed, setRevealed] = useState(() => prefersReducedMotion() || !("IntersectionObserver" in window));

  useEffect(() => {
    const el = ref.current;
    if (revealed || !el) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [revealed, threshold]);

  return [ref, revealed];
}
