'use client'

import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'

export const BlogGrid = ({ blogs }: { blogs: any[] }) => {
    const cardsRef = useRef<HTMLDivElement[]>([])

    useEffect(() => {
        cardsRef.current = cardsRef.current.slice(0, blogs.length)
        const elements = cardsRef.current;
        gsap.set(elements, {
            transformPerspective: 1000,
            transformStyle: "preserve-3d",
            backfaceVisibility: "hidden",
            opacity: 1,
        });
        const cards = cardsRef.current

        if (cards.length === 0) return
        gsap.set(cards, { opacity: 1 })

        gsap.from(cards, {
            y: 50,
            opacity: 0,
            scale: 0.95,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
        })

        const cleanups: (() => void)[] = []

        cards.forEach((card) => {
            if (!card) return

            const hoverIn = () => {
                gsap.to(card, {
                    scale: 1.05,
                    y: -5,
                    boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                    duration: 0.3,
                    ease: 'power2.out',
                })
            }

            const hoverOut = () => {
                gsap.to(card, {
                    scale: 1,
                    y: 0,
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                    duration: 0.3,
                    ease: 'power2.out',
                })
            }

            card.addEventListener('mouseenter', hoverIn)
            card.addEventListener('mouseleave', hoverOut)

            cleanups.push(() => {
                card.removeEventListener('mouseenter', hoverIn)
                card.removeEventListener('mouseleave', hoverOut)
            })
        })

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

        cardsRef.current.forEach((card) => {
            gsap.to(card, {
                y: "-=10",
                duration: 1.5,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
            });
        });

        gsap.to(cards, {
            y: '-=10',
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            stagger: 0.2,
        })

        return () => {
            cleanups.forEach((cleanup) => cleanup())
            gsap.killTweensOf(cards)
        }
    }, [blogs])

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
                        <h2 className="text-xl font-bold text-gray-900 mb-2">
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
