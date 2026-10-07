'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import carImage from '../public/car.png';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollPromptRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const blackCoverRef = useRef<HTMLDivElement>(null);
  const carRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=2200',
          scrub: 1,
          pin: true,
        },
      });

      scrollTl.to(
        scrollPromptRef.current,
        { opacity: 0, duration: 0.3, ease: 'none' },
        0
      );
      scrollTl.to(
        stripRef.current,
        { opacity: 1, duration: 0.6, ease: 'power2.out' },
        0.3
      );
      scrollTl.to(
        carRef.current,
        { opacity: 1, duration: 0.3, ease: 'none' },
        0.3
      );

      scrollTl.fromTo(
        carRef.current,
        { xPercent: -120 },
        { xPercent: 250, duration: 3.7, ease: 'none' },
        0.3
      );

      scrollTl.fromTo(
        blackCoverRef.current,
        { xPercent: 0 },
        { xPercent: 100, duration: 3.7, ease: 'none' },
        0.3
      );

      const cardConfig = [
        { selector: '.metric-card-0', at: 1.0 },
        { selector: '.metric-card-1', at: 2.0 },
        { selector: '.metric-card-2', at: 3.0 },
        { selector: '.metric-card-3', at: 4.0 },
      ];

      cardConfig.forEach(({ selector, at }) => {
        scrollTl.fromTo(
          selector,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
          },
          at - 0.3
        );
      });
    },
    { scope: containerRef }
  );

  const cards = [
    {
      value: '58%',
      desc: 'Increase in pick up point use',
      bg: 'bg-yellow-300',
      text: 'text-black',
    },
    {
      value: '27%',
      desc: 'Increase in pick up point use',
      bg: 'bg-neutral-800',
      text: 'text-white',
    },
    {
      value: '23%',
      desc: 'Decreased in customer phone calls',
      bg: 'bg-blue-400',
      text: 'text-black',
    },
    {
      value: '40%',
      desc: 'Decreased in customer phone calls',
      bg: 'bg-orange-500',
      text: 'text-black',
    },
  ];

  const positions = [
    { top: '18%', left: '8%' },
    { bottom: '18%', left: '30%' },
    { top: '18%', left: '52%' },
    { bottom: '18%', left: '74%' },
  ];

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-neutral-300"
    >
      {/* Green strip + headline + black cover */}
      <div
        ref={stripRef}
        className="absolute left-0 right-0 z-10 bg-green-400 overflow-hidden opacity-0"
        style={{
          top: '50%',
          height: '24vh',
          transform: 'translateY(-50%)',
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight uppercase text-black whitespace-nowrap">
            WELCOME ITZFIZZ
          </h1>
        </div>

        <div
          ref={blackCoverRef}
          className="absolute inset-0 bg-black z-10"
          style={{ transform: 'translateX(0%)' }}
        />
      </div>

      {/* Scroll prompt */}
      <div
        ref={scrollPromptRef}
        className="absolute z-40 flex items-center gap-4 w-full max-w-5xl px-6"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div className="flex-1 h-px bg-black" />
        <span className="text-black font-bold tracking-[0.3em] text-xs md:text-sm uppercase whitespace-nowrap">
          Scroll to move forward
        </span>
        <div className="flex-1 h-px bg-black" />
      </div>

      {/* Car */}
      <div
        ref={carRef}
        className="absolute top-1/2 left-0 z-50 w-[40vw] md:w-[35vw] max-w-[550px] pointer-events-none opacity-0"
        style={{ transform: 'translateY(-50%)' }}
      >
        <img 
          src={carImage.src} 
          alt="Car" 
          className="w-full h-auto drop-shadow-2xl"
        />
      </div>

      {/* Metric cards — start INVISIBLE via inline style */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        {cards.map((card, i) => (
          <div
            key={i}
            className={`metric-card metric-card-${i} absolute flex flex-col items-start justify-center rounded-2xl ${card.bg} ${card.text} shadow-2xl pointer-events-auto`}
            style={{
              ...positions[i],
              padding: '24px 28px',
              minWidth: '200px',
              maxWidth: '240px',
              minHeight: '110px',
              opacity: 0,    
              transform: 'translateY(60px)', 
            }}
          >
            <span className="text-3xl md:text-4xl font-black leading-none">
              {card.value}
            </span>
            <span className="text-xs md:text-sm mt-3 font-medium leading-snug">
              {card.desc}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}