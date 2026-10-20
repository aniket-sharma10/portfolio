import { useEffect, useRef, useState } from "react";

// Returns [ref, inView]: whether the element currently overlaps the viewport (with `rootMargin` slack).
// Used to run ambient animations only while they can be seen.
export default function useInView(rootMargin = "100px") {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return undefined;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { rootMargin });
    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  return [ref, inView];
}
