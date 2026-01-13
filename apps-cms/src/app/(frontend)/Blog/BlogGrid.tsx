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
    }, [blogs.length]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogs.map((blog: any, index: number) => (
                <div
                    key={blog.id}
                    ref={(el) => {
                        if (el) cardsRef.current[index] = el
                    }}
                    className="bg-white rounded-3xl border border-gray-100 flex flex-col h-full overflow-hidden"
                >
                    {blog.featuredImage?.url && (
                        <div className="overflow-hidden h-64 w-full">
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
