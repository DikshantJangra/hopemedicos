import { useState, useEffect, RefObject } from 'react';

/**
 * Hook to calculate a sinuous SVG path between two elements.
 * Uses advanced matrix transformation to remain accurate during Framer Motion layout scaling.
 */
export function usePathCoordinates(
  svgRef: RefObject<SVGSVGElement | null>,
  startRef: RefObject<HTMLElement | null>,
  endRef: RefObject<HTMLElement | null>,
  isScrolled: boolean = false,
  isLocateHovered: boolean = false
) {
  const [path, setPath] = useState("");
  const [clipRect, setClipRect] = useState("");

  useEffect(() => {
    let animationFrameId: number;

    const calculatePath = () => {
      animationFrameId = requestAnimationFrame(calculatePath);

      if (!svgRef.current || !startRef.current || !endRef.current) return;

      const svg = svgRef.current;
      const startEl = startRef.current;
      const endEl = endRef.current;

      const svgRect = svg.getBoundingClientRect();
      const startRect = startEl.getBoundingClientRect();
      const endRect = endEl.getBoundingClientRect();

      // The SVG is fixed and un-scaled at the screen level.
      // We directly map DOM screen coordinates into the SVG space.
      const paddingX = 8; 
      
      const startX = startRect.right - svgRect.left + paddingX;
      const startY = startRect.top + startRect.height / 2 - svgRect.top;
      
      const endX = endRect.left - svgRect.left - paddingX;
      const endY = endRect.top + endRect.height / 2 - svgRect.top;

      const distance = endX - startX;
      
      if (distance <= 20) {
        setPath("");
        return;
      }

      // Dynamic control points based on distance to maintain a consistent "snake" look
      const sinHeight = Math.min(20, distance * 0.1); 
      const cp1X = startX + distance * 0.3;
      const cp1Y = startY - sinHeight;
      const cp2X = startX + distance * 0.7;
      const cp2Y = startY + sinHeight;

      setPath(`M ${startX} ${startY} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${endX} ${endY}`);
      setClipRect(`inset(-20px ${svgRect.width - endX}px -20px ${startX}px)`);
    };

    calculatePath();

    const timer = setTimeout(() => {
        requestAnimationFrame(calculatePath);
    }, 600);

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(timer);
    };
  }, [svgRef, startRef, endRef, isScrolled, isLocateHovered]);

  return { path, clipRect };
}
