'use client'

import React, { useLayoutEffect, useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const BlogGrid = ({ blogs }: { blogs: any[] }) => {
    const cardsRef = useRef<(HTMLDivElement | null)[]>([])

    useLayoutEffect(() => {
        const elements = cardsRef.current.filter((el): el is HTMLDivElement => el !== null)

        if (elements.length === 0) return

        // Set initial state to avoid flash of unstyled content
        gsap.set(elements, { opacity: 0, y: 50 });

        const batch = ScrollTrigger.batch(elements, {
            onEnter: batch => gsap.to(batch, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: "power3.out",
                overwrite: true
            }),
            start: "top 90%",
            once: true
        });

        const titleAnim = gsap.fromTo(".card-title",
            { y: 20, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                stagger: 0.1,
                duration: 0.6,
                ease: "power2.out",
                delay: 0.2
            }
        );

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


        });

        return () => {
            // Kill the specific ScrollTrigger batch instance
            // Note: ScrollTrigger.batch returns an array of ScrollTriggers
            // type casting to unknown as any to handle various GSAP TS defs
            if (Array.isArray(batch)) {
                batch.forEach(t => t.kill());
            }

            if (titleAnim) titleAnim.kill();
            gsap.killTweensOf(elements);
        };
    }, [blogs.length]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {blogs.map((blog: any, index: number) => (
                <div
                    key={blog.id}
                    ref={(el) => {
                        if (el) cardsRef.current[index] = el
                    }}
                    className="bg-white rounded-3xl border border-gray-100 flex flex-col h-full overflow-hidden"
                >
                    {blog.featuredImage?.url && (
                        <div className="overflow-hidden h-96 w-full">
                            <img
                                src={`http://localhost:3000${blog.featuredImage.url}`}
                                alt={blog.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}
                    <div className="p-6 flex flex-col flex-grow">
                        <h2 className="card-title text-xl font-bold text-gray-900 mb-2">
                            {blog.title}
                        </h2>
                        <p className="text-gray-600 text-sm mb-4 flex-grow">
                            {blog.description}
                        </p>
                        <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                            <span className="text-xs font-medium text-gray-400 uppercase">
                                Article
                            </span>
                            <Link
                                href={`/Blog/${blog.slug ?? blog.id}`}
                                className="text-sm font-semibold text-blue-600 flex items-center"
                            >
                                Read More <span>&rarr;</span>
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
