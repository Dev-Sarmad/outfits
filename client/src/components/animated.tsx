import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function Shutter() {
  const container = useRef<HTMLDivElement>(null);
  const shutter = useRef<HTMLDivElement>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      timeline.current = gsap
        .timeline({ paused: true })
        .fromTo(
          shutter.current,
          {
            scaleY: 0,
            transformOrigin: "top center",
          },
          {
            scaleY: 1,
            duration: 0.8,
            ease: "expo.out",
          }
        );
    },
    { scope: container }
  );

  const handleToggle = () => {
    if (!timeline.current) {
      return;
    }

    if (timeline.current.reversed() || timeline.current.progress() === 0) {
      timeline.current.play();
    } else {
      timeline.current.reverse();
    }
  };

  return (
    <div ref={container} className="flex flex-col gap-4 p-8">
      <button
        className="rounded bg-black px-4 py-2 text-white"
        onClick={handleToggle}
      >
        Toggle Shutter
      </button>

      <div className="overflow-hidden rounded-xl border">
        <div
          ref={shutter}
          className="origin-top bg-zinc-900 p-6 text-white"
          style={{ transform: "scaleY(0)" }}
        >
          <h2 className="text-2xl font-bold">Shutter Animation</h2>
          <p className="mt-2">
            This panel opens downward like a shutter and closes upward.
          </p>
        </div>
      </div>
    </div>
  );
}