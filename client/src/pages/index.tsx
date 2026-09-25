import { useRef } from "react";

import { useAuth } from "@/features/auth/hooks/useAuth";
import DefaultLayout from "@/layouts/default";
import { SplitText, useGSAP, gsap } from "@/lib/gsap";
export default function IndexPage() {
  const { user } = useAuth();
  const preLoadImgInitRotations = [7.5, -2.5, -10, 12.5, -5, 5];
  const counterRef = useRef<HTMLParagraphElement | null>(null);

  useGSAP(() => {
    const preLoaderHeaderSplit = SplitText.create(".preloader-header h1", {
      type: "chars",
      charsClass: "char",
      mask: "chars",
    });

    const headerSplit = SplitText.create(".header", {
      type: "chars",
      charsClass: "char",
    });

    gsap.set(".preloader-img", {
      rotate: (i) => preLoadImgInitRotations[i],
    });
    gsap.set(".preloader-header .char", {
      yPercent: 100,
    });
    gsap.set(".header .char", {
      yPercent: 100,
    });
    const t1 = gsap.timeline({ delay: 0.5 });

    t1.to(".preloader-img", {
      scale: 1,
      clipPath: "polygon(0% 0% , 100% 0%, 100% 100%, 0% 100%)",
      duration: 1.5,
      ease: "hop",
      stagger: 0.2,
    });
    t1.to(
      ".preloader-header h1 .char",
      {
        yPercent: 0,
        duration: 1,
        ease: "hop2",
        stagger: { each: 0.125, from: "random" },
      },
      "0.35",
    );
    t1.to(
      ".preloader-counter p",
      {
        y: "0%",
        duration: 1,
        ease: "hop2",
        onStart: () => {
          let counter = { value: 0 };

          gsap.to(counter, {
            value: 100,
            duration: 2,
            delay: 0.5,
            ease: "power2.inOut",
            onUpdate: () => {
              if (counterRef.current) {
                counterRef.current.textContent = String(
                  Math.round(counter.value),
                ).padStart(3, "0");
              }
            },
          });
        },
      },
      "<",
    );
    t1.to(
      ".preloader-counter p",
      {
        y: "-100%",
        duration: 0.75,
        ease: "hop2",
      },
      3.25,
    );
    t1.to(
      ".preloader-header h1 .char",
      {
        y: "-100%",
        duration: 0.75,
        ease: "hop2",
      },
      3.25,
    );
    t1.to(
      ".preloader-images .preloader-img",
      {
        scale: 0,
        stagger: -0.075,
        ease: "hop2",
        duration: 1,
        clipPath: "polygon(20% 20%, 80% 20%, 80% 80% ,20% 80%)",
      },
      3.25,
    );
    t1.to(".preloader ", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
      ease: "hop",
      duration: 1,
    });
    t1.to(
      ".header h1 .char",
      {
        y: "0",
        duration: 1,
        stagger: { each: 0.075, from: "random" },
      },
      4.65,
    );
    t1.to(
      ".header .char",
      {
        yPercent: 0,
        duration: 1,
        ease: "hop",
        stagger: { each: 0.075, from: "random" },
      },
      4.65,
    );

    return () => {
      preLoaderHeaderSplit.revert();
      headerSplit.revert();
    };
  });

  return (
    <DefaultLayout>
      <div
        className="preloader fixed top-0 left-0 w-full h-full overflow-hidden z-[2]"
        style={{
          clipPath: "polygon(0 0,100% 0,100% 100%,0 100%)",
          willChange: "clip-path",
        }}
      >
        <div className="preloader-images bg-black absolute top-0 left-0 w-full h-full">
          <img
            alt=""
            className="preloader-img absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 scale-0 w-[250px] h-[300px] origin-center"
            src="https://picsum.photos/200/300?random=4"
            style={{
              clipPath: "polygon(20% 20%, 80% 20%, 80% 80%, 20% 80%)",
              willChange: "clip-path transform",
            }}
          />
          <img
            alt=""
            className="preloader-img absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 scale-0 w-[250px] h-[300px] origin-center"
            src="https://picsum.photos/200/300?random=3"
            style={{
              clipPath: "polygon(20% 20%, 80% 20%, 80% 80%, 20% 80%)",
              willChange: "clip-path transform",
            }}
          />
          <img
            alt=""
            className="preloader-img absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 scale-0 w-[250px] h-[300px] origin-center"
            src="https://picsum.photos/200/300?random=2"
            style={{
              clipPath: "polygon(20% 20%, 80% 20%, 80% 80%, 20% 80%)",
              willChange: "clip-path transform",
            }}
          />
          <img
            alt=""
            className="preloader-img absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 scale-0 w-[250px] h-[300px] origin-center"
            src="https://picsum.photos/200/300?random=1"
            style={{
              clipPath: "polygon(20% 20%, 80% 20%, 80% 80%, 20% 80%)",
              willChange: "clip-path transform",
            }}
          />
        </div>
        <div className="preloader-header uppercase absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <h1 className="text-[clamp(2rem,10vw,15rem)] leading-[0.85] text-white">
            Outfits
          </h1>
          <div className="preloader-counter absolute left-[calc(100%+1.5rem)] overflow-hidden top-[-1.5rem]">
            <p
              ref={counterRef}
              className="text-[clamp(1rem,1.5rem,2rem)] leading-[0.85] text-white"
            >
              000
            </p>
          </div>
        </div>
      </div>
      {/* home  */}
      <div className="hero w-full h-full flex items-center justify-center overflow-hidden relative">
        <h1 className="header absolute top-1/2 left-1/2 overflow-hidden transform -translate-x-1/2 -translate-y-1/2 text-center font-bold tracking-wide text-7xl md:text-[22vw] leading-none">
          OUTFIT
        </h1>
        <span className="text-2xl md:text-5xl font-bold absolute bottom-0 right-0 md:right-15 lg:right-22">
          &reg;
        </span>
      </div>
      <div className="mt-5 h-2 bg-white" />
      <footer className="hero-footer max-w-6xl grid grid-cols-2 gap-3 py-8 md:flex md:items-center md:justify-between md:py-10">
        <div className="md:mb-20 font-semibold tracking-tighter">OUTFIT</div>

        <div className="flex flex-col gap-2 font-semibold">
          Why
          <p className="text-left md:max-w-sm text-sm">
            Created by the ++hellohello team, this store and signature
            collection celebrates our collective creativity and passion for
            apparel. Carefully designed.
          </p>
        </div>

        <div className="md:mb-20 font-semibold"> Shipping & Returns</div>

        <div className="md:mb-20 font-semibold">© 2026</div>
        {user?.name}
      </footer>
    </DefaultLayout>
  );
}
