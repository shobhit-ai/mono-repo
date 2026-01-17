'use client';

import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const columns = [
    // Column 1
    [
        "https://cdn.prod.website-files.com/6746d4e7508fcde5d1dbac6c/67a35bcec1e6dee368c62d25_dhk_Logo.webp",
        'https://cdn.prod.website-files.com/6746d4e7508fcde5d1dbac6c/6913007efd068dff00aabfe4_01---H0_HERO_3of9.jpg',
    ],
    // Column 2
    [
        'https://cdn.prod.website-files.com/6746d4e7508fcde5d1dbac6c/6913011d3d3a260559af0846_01---H0_HERO_4of9.jpg',
        'https://images.unsplash.com/photo-1479839672679-a472b80d8863?w=800&auto=format&fit=crop',
    ],
    // Column 3
    [
        'https://cdn.prod.website-files.com/6746d4e7508fcde5d1dbac6c/67a35bcec1e6dee368c62d25_dhk_Logo.webp',
        'https://images.unsplash.com/photo-1486333698504-68795087e877?w=800&auto=format&fit=crop',
    ],
];

const HeroScroller = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isIntroDone, setIsIntroDone] = useState(false);

    // 8 Second Intro Delay Logic
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsIntroDone(true);
        }, 8000); // 8 seconds wait as requested

        return () => clearTimeout(timer);
    }, []);

    // Key implementation details:
    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Pin the container for 300% of the viewport height
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top top', // Start when top of section hits top of viewport
                    end: '+=300%',    // Duration of pixel scrolling
                    pin: true,        // Pin the section
                    scrub: 1,         // Smooth scrubbing
                },
            });

            // Staggered slide-up animation for images
            columns.forEach((colImages, colIndex) => {
                const images = gsap.utils.toArray(`.col-${colIndex} .image-card`);
                // ... animation logic ...
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    // Intro Animation for the first 8 seconds (Ken Burns effect)
    // Key implementation details:



    return (
        <section
            ref={containerRef}
            className="relative w-full h-screen overflow-hidden bg-black text-white"
        >
            {/* Intro Overlay / Status */}
            {!isIntroDone && (
                <div className="absolute top-0 left-0 w-full h-1 bg-gray-800 z-50">
                    <div className="h-full bg-white transition-all duration-[8000ms] ease-linear w-full" style={{ width: isIntroDone ? '100%' : '0%' }}></div>
                </div>
            )}

            <div className="grid grid-cols-3 w-full h-full gap-4 px-4 sm:px-8 bg-black">
                {columns.map((colImages, colIndex) => (
                    <div key={colIndex} className={`col-${colIndex} relative w-full h-full overflow-hidden flex flex-col justify-end`}>
                        {/* Render images in Reverse order if we want normal stacking with CSS? 
                 Actually, absolute positioning:
                 If we map normally, last is on top by default z-order.
                 We want FIRST on top. So we modify z-index.
             */}
                        {colImages.map((src, imgIndex) => (
                            <div
                                key={imgIndex}
                                className="image-card absolute top-0 left-0 w-full h-full"
                                style={{ zIndex: colImages.length - imgIndex }}
                            >
                                <div className="w-full h-full overflow-hidden relative">
                                    <img
                                        src={src}
                                        alt={`Column ${colIndex} Image ${imgIndex}`}
                                        className="w-full h-full object-cover"
                                    />
                                    {/* Overlay for depth? */}
                                    {/* <div className="absolute inset-0 bg-black/20"></div> */}
                                </div>
                            </div>
                        ))}

                        {/* Text or content can go here if needed, like "Architecture" etc */}
                    </div>
                ))}
            </div>

            {/* Center Text or Overlay elements like DHK */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[100] mix-blend-difference">
                <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-white opacity-80">
                    {/* Optional Text */}
                </h1>
            </div>

        </section>
    );
};

export default HeroScroller;
