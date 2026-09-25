import gsap from "gsap";
import { CustomEase } from "gsap/all";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(useGSAP, SplitText, CustomEase);
CustomEase.create("hop", "0.8, 0, 0.2,1");
CustomEase.create("hop2", "0.9, 0, 0.1,1");

export { gsap, SplitText, CustomEase, useGSAP };
