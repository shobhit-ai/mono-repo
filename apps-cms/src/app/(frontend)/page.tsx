'use client'

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';

type Card = {
  id: number;
  title: string;
};
gsap.registerPlugin(ScrollTrigger);


export default async function HomePage() {

  const cardsRef = useRef<HTMLDivElement[]>([]);
  cardsRef.current = [];
  cardsRef.current = [];


  const cards = [
    {
      id: 1,
      title: 'Mountains',
      description: 'Beautiful mountain landscape with snow peaks.',
      image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800',
    },
    {
      id: 2,
      title: 'Beach',
      description: 'Relaxing beach view with blue ocean.',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
    },
    {
      id: 3,
      title: 'Forest',
      description: 'Green forest with sunlight and trees.',
      image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800',
    },
    {
      id: 4,
      title: 'City',
      description: 'Modern city skyline at night.',
      image: 'https://images.unsplash.com/photo-1494526585095-c41746248156?w=800',
    },
    {
      id: 5,
      title: 'Desert',
      description: 'Golden sand dunes under a clear sky.',
      image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800',
    },
    {
      id: 6,
      title: 'Waterfall',
      description: 'Waterfall flowing through green rocks.',
      image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=800',
    },
    {
      id: 7,
      title: 'Lake',
      description: 'Calm lake surrounded by mountains.',
      image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800',
    },
    {
      id: 8,
      title: 'Snow',
      description: 'Snow-covered trees in winter.',
      image: 'https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?w=800',
    },
    {
      id: 10,
      title: 'Road Trip',
      description: 'Open road with scenic view.',
      image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800',
    },
    {
      id: 11,
      title: 'Sunset',
      description: 'Sunset with orange and purple sky.',
      image: 'https://images.unsplash.com/photo-1495567720989-cebdbdd97913?w=800',
    },
    {
      id: 12,
      title: 'Flowers',
      description: 'Colorful flowers blooming in spring.',
      image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800',
    },
    {
      id: 13,
      title: 'Ocean',
      description: 'Deep blue ocean waves.',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
    },
    {
      id: 14,
      title: 'Canyon',
      description: 'Massive canyon carved by nature.',
      image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800',
    },
    {
      id: 15,
      title: 'Island',
      description: 'Tropical island surrounded by water.',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
    },
  ]

  useLayoutEffect(() => {
    cardsRef.current = cardsRef.current.slice(0, cards.length);
    const elements = cardsRef.current;

    ScrollTrigger.refresh(); // Refresh all ScrollTriggers
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());

    gsap.set(elements, {
      transformPerspective: 800,
      transformStyle: "preserve-3d",
      backfaceVisibility: "hidden",
    });

    elements.forEach((card) => {
      
      card.onmouseenter = () => gsap.to(card, {
        scale: 1.04, y: -8, duration: 0.2, ease: "power2.out"
      });
      card.onmouseleave = () => gsap.to(card, {
        scale: 1, y: 0, duration: 0.2, ease: "power2.out"
      });
    });

    gsap.killTweensOf(elements);

    const tl = gsap.timeline({
      defaults: { duration: 0.12, ease: "power2.out" }
    });

    tl.from(elements, {
      y: 30, opacity: 0, stagger: 0.04
    });

    tl.to(elements, {
      scale: 0.95, rotation: 1,
      stagger: 0.03, yoyo: true, repeat: 1
    });

    tl.to(elements, {
      y: 0, opacity: 1, scale: 1,
      stagger: 0.02
    }, "-=0.05");

    tl.fromTo(elements,
      { rotationY: 35 },
      { rotationY: 0, stagger: 0.02, duration: 0.2 },
      "-=0.03"
    );

    setTimeout(() => {
      if (cards.length === elements.length) {
        tl.to(elements, {
          y: "-=3", duration: 1, repeat: -1,
          yoyo: true, ease: "sine.inOut", stagger: 0.05
        }, "+=0.05");
      }
    }, 200);

    return () => {
      gsap.killTweensOf(elements);
      elements.forEach(card => {
        card.onmouseenter = null;
        card.onmouseleave = null;
      });
    };
  }, [cards.length]);

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
            Welcome To Monorepo
          </h1>
          <p className="max-w-2xl text-lg text-gray-600 text-center">
            Explore our collection of stunning landscapes and urban views.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card) => (
            <div
              key={card.id}
              ref={(el) => el && cardsRef.current.push(el)}
              className="bg-white rounded-3xl overflow-hidden border border-gray-100 flex flex-col h-full cursor-pointer"
              style={{ boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}
            >
              <div className="relative overflow-hidden h-64 w-full">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300" />
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  {card.title}
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed flex-grow">
                  {card.description}
                </p>

                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Gallery Item
                  </span>
                  <button className="text-sm font-semibold text-blue-600 opacity-100">
                    View Details &rarr;
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
