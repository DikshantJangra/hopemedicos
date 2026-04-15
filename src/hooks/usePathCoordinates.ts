import { useState, useEffect, RefObject } from 'react';

export function usePathCoordinates(
  containerRef: RefObject<HTMLElement | null>,
  startRef: RefObject<HTMLElement | null>,
  endRef: RefObject<HTMLElement | null>,
  isScrolled: boolean
) {
  const [path, setPath] = useState("");

  useEffect(() => {
    const calculatePath = () => {
      if (!containerRef.current || !startRef.current || !endRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const startRect = startRef.current.getBoundingClientRect();
      const endRect = endRef.current.getBoundingClientRect();

      // Start at right edge of logo, center Y
      const startX = startRect.right - containerRect.left;
      const startY = startRect.top + startRect.height / 2 - containerRect.top;

      // End at left edge of locate button, center Y
      const endX = endRect.left - containerRect.left;
      const endY = endRect.top + endRect.height / 2 - containerRect.top;

      // Create a sinuous S-curve (Bezier)
      const cp1X = startX + (endX - startX) * 0.3;
      const cp1Y = startY - 20; // Upward wave
      const cp2X = startX + (endX - startX) * 0.7;
      const cp2Y = startY + 20; // Downward wave

      setPath(`M ${startX} ${startY} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${endX} ${endY}`);
    };

    calculatePath();
    window.addEventListener('resize', calculatePath);
    // Also recalculate on a slight delay to ensure navbar layout transition finishes
    const timer = setTimeout(calculatePath, 600); 

    return () => {
      window.removeEventListener('resize', calculatePath);
      clearTimeout(timer);
    };
  }, [isScrolled, startRef, endRef, containerRef]);

  return path;
}
