'use client'

import { useState, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const MediaGallery = ({ media }: { media: any[] }) => {
    const [selectedImage, setSelectedImage] = useState<any | null>(null)
    const cardsRef = useRef<(HTMLDivElement | null)[]>([])

    useLayoutEffect(() => {
        const elements = cardsRef.current.filter((el): el is HTMLDivElement => el !== null)
        ScrollTrigger.getAll().forEach(t => t.kill())

        if (elements.length === 0) return

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: elements[0],
                start: "top 90%",
                toggleActions: "play none none none",
            },
            defaults: { duration: 0.5, ease: "power1.out" }
        });

        tl.from(elements, {
            y: 50,
            opacity: 0,
            stagger: 0.1,
        })
            .to(elements, {
                scale: 1.05,
                rotation: 2,
                stagger: 0.1,
                yoyo: true,
                repeat: 1
            });

        tl.from(".card-title", {
            y: 20,
            opacity: 0,
            stagger: 0.2,
            duration: 0.8,
            ease: "power2.out",
        });

        elements.forEach((card) => {
            const hoverIn = () => {
                gsap.to(card, {
                    scale: 1.1,
                    y: -15,
                    zIndex: 10,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                    duration: 0.4,
                    ease: "power2.out",
                });
            };

            const hoverOut = () => {
                gsap.to(card, {
                    scale: 1,
                    y: 0,
                    zIndex: 1,
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                    duration: 0.4,
                    ease: "power2.out",
                });
            };

            card.addEventListener("mouseenter", hoverIn);
            card.addEventListener("mouseleave", hoverOut);

            gsap.to(card, {
                y: "-=8",
                duration: 2 + Math.random(),
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: 2,
            });
        });

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
            gsap.killTweensOf(elements);
        };
    }, [media.length]);

    return (
        <>
            {media.length === 0 && (
                <p className="text-center text-gray-500 text-lg">No media found.</p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {media.map((m: any, index: number) => (
                    <div
                        key={m.id}
                        ref={(el) => {
                            if (el) cardsRef.current[index] = el
                        }}
                        onClick={() => setSelectedImage(m)}
                        className="bg-white rounded-3xl shadow-sm overflow-hidden border border-gray-100 flex flex-col h-full cursor-pointer"
                    >
                        <div className="relative overflow-hidden h-64 w-full">
                            <img
                                src={m.url}
                                alt={m.alt || m.title}
                                className="w-full h-full object-cover"
                                loading="lazy"
                            />
                        </div>

                        <div className="p-6 flex flex-col flex-grow">
                            <h2 className="card-title text-xl font-bold text-gray-900 mb-2">
                                {m.title || 'Untitled'}
                            </h2>
                            <p className="text-gray-600 text-sm leading-relaxed flex-grow">
                                {m.filename}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {selectedImage && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4"
                    onClick={() => setSelectedImage(null)}
                >
                    <button
                        onClick={() => setSelectedImage(null)}
                        className="absolute top-4 right-4 text-white/50 p-2"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-8 h-8"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>

                    <img
                        src={selectedImage.url}
                        alt={selectedImage.alt || selectedImage.title}
                        className="max-h-[90vh] max-w-full object-contain rounded-lg shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    />

                    <div className="absolute bottom-8 text-white text-center">
                        <h3 className="text-xl font-bold">{selectedImage.title}</h3>
                        <p className="text-gray-400">{selectedImage.filename}</p>
                    </div>
                </div>
            )}
        </>
    )
}
