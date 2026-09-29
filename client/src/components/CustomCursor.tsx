import { useRef } from "react";

import { useGSAP, gsap } from "@/lib/gsap";

function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    const cursor = cursorRef.current;
    const xTo = gsap.quickTo(cursor, "x", {
      duration: 0.2,
      ease: "power3",
    });
    const yTo = gsap.quickTo(cursor, "y", {
      duration: 0.2,
      ease: "power3",
    });
    const onMouseMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    window.addEventListener("mousemove", onMouseMove);

    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0
    left-0
    -translate-x-1/2
    -translate-y-1/2 pointer-events-none z-50 w-2 h-2 rounded-full bg-red-600"
    />
  );
}

export default CustomCursor;
