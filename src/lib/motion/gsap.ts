'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CustomEase } from 'gsap/CustomEase';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, CustomEase, useGSAP);

  // Register ArtSwapy custom cubic-bezier easings mirrored from DESIGN.md §2
  CustomEase.create('art.out', '0.23, 1, 0.32, 1');
  CustomEase.create('art.inOut', '0.77, 0, 0.175, 1');
  CustomEase.create('art.drawer', '0.32, 0.72, 0, 1');
  CustomEase.create('art.soft', '0.33, 1, 0.68, 1');
  CustomEase.create('art.color', '0.4, 0, 0.2, 1');
}

export { gsap, ScrollTrigger, CustomEase, useGSAP };
