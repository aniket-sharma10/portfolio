import { useLayoutEffect, useState } from "react";

// Each item's node is 16px tall and sits 4px below the item's top, so its centre is 12px down
const NODE_CENTER = 12;

// Drives a scroll-linked timeline. The rail spans exactly from the first node's centre to the last node's centre;
// the beam fills it as that span scrolls past `anchor` (a fraction of the viewport height), and the optional tip
// rides the beam's end. Items count as reached once the beam passes their node. Positions are measured from the
// real layout, and re-measured when it changes (fonts loading, resizing, content revealing).
// The rail, beam and tip are written to the DOM directly (no re-render per frame); `reached` only updates when it
// changes. Under reduced motion the beam is fully drawn and every item is reached.
export default function useTimelineProgress({ listRef, railRef, beamRef, tipRef, anchor = 0.6 }) {
  const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
  const [reached, setReached] = useState(0);

  useLayoutEffect(() => {
    const list = listRef.current;
    const rail = railRef.current;
    const beam = beamRef.current;
    const tip = tipRef?.current;
    if (!list || !rail || !beam) return undefined;

    let frame = 0;
    const update = () => {
      frame = 0;
      const items = [...list.children];
      if (!items.length) return;
      // offsetTop is relative to the positioned wrapper, which starts where the list starts
      const start = items[0].offsetTop + NODE_CENTER;
      const length = Math.max(items[items.length - 1].offsetTop + NODE_CENTER - start, 1);
      rail.style.top = `${start}px`;
      rail.style.height = `${length}px`;

      const head = reduce
        ? length
        : Math.min(Math.max(window.innerHeight * anchor - (list.getBoundingClientRect().top + start), 0), length);
      const progress = head / length;
      beam.style.transform = `scaleY(${progress})`;
      if (tip) {
        tip.style.transform = `translate(-50%, ${head}px) translateY(-50%)`;
        tip.style.opacity = !reduce && progress > 0.005 && progress < 0.995 ? "1" : "0";
      }

      const count = head > 0 ? items.filter((item) => item.offsetTop + NODE_CENTER - start <= head + 0.5).length : 0;
      setReached((previous) => (previous === count ? previous : count));
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    const resizeObserver = new ResizeObserver(schedule);
    resizeObserver.observe(list);
    window.addEventListener("resize", schedule);
    if (!reduce) window.addEventListener("scroll", schedule, { passive: true });
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", schedule);
      window.removeEventListener("scroll", schedule);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [listRef, railRef, beamRef, tipRef, anchor, reduce]);

  return reached;
}
