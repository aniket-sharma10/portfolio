import { useEffect, useState } from "react";

// Returns the id of the section whose top has passed the marker line (30% down the viewport), or null above the first
export default function useActiveSection(ids) {
  const [activeId, setActiveId] = useState(null);
  const key = ids.join(",");

  useEffect(() => {
    const targets = key.split(",");
    let frame = 0;

    const update = () => {
      frame = 0;
      const marker = window.innerHeight * 0.3;
      let current = null;
      for (const id of targets) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= marker) current = id;
      }
      // A short final section may never reach the marker, so the page bottom selects it
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      if (atBottom && document.getElementById(targets[targets.length - 1])) current = targets[targets.length - 1];
      setActiveId(current);
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [key]);

  return activeId;
}
