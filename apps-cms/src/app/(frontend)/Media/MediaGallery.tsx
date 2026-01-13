'use client'

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

export const MediaGallery = ({ media }: { media: any[] }) => {
    const [selectedImage, setSelectedImage] = useState<any | null>(null)
    const cardsRef = useRef<HTMLDivElement[]>([])

    useEffect(() => {
        cardsRef.current = cardsRef.current.slice(0, media.length)
        const cards = cardsRef.current
        if (cards.length === 0) return
        gsap.set(cards, { opacity: 1 })

        gsap.from(cards, {
            y: 50,
            opacity: 0,
            scale: 0.95,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
        });

        const cleanups: (() => void)[] = []

        cards.forEach((card) => {
            if (!card) return

            const hoverIn = () => {
                gsap.to(card, {
                    scale: 1.05,
                    y: -5,
                    boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
                    duration: 0.3,
                    ease: "power2.out",
                });
            };

            const hoverOut = () => {
                gsap.to(card, {
                    scale: 1,
                    y: 0,
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                    duration: 0.3,
                    ease: "power2.out",
                });
            };

            card.addEventListener("mouseenter", hoverIn);
            card.addEventListener("mouseleave", hoverOut);

            cleanups.push(() => {
                card.removeEventListener("mouseenter", hoverIn);
                card.removeEventListener("mouseleave", hoverOut);
            });
        });

        gsap.to(cards, {
            y: "-=10",
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            stagger: 0.2,
        });

        const tl = gsap.timeline({ defaults: { duration: 0.5, ease: "power1.out" } });
        tl.from(cardsRef.current, { y: 50, opacity: 0, stagger: 0.1 })
            .to(cardsRef.current, { scale: 1.05, rotation: 2, stagger: 0.1, yoyo: true, repeat: 1 });

        gsap.from(".card-title", {
            y: 20,
            opacity: 0,
            stagger: 0.2,
            duration: 0.8,
            ease: "power2.out",
        });

        return () => {
            cleanups.forEach((cleanup) => cleanup())
            gsap.killTweensOf(cards)
        };
    }, [media]);

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
                        style={{ opacity: 0 }} // Start hidden for GSAP
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
                            <h2 className="text-xl font-bold text-gray-900 mb-2">
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
