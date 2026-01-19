// 'use client'

// import React, { useLayoutEffect, useRef } from 'react'
// import Link from 'next/link'
// import gsap from 'gsap'
// import { ScrollTrigger } from 'gsap/ScrollTrigger'

// gsap.registerPlugin(ScrollTrigger)

// export const BlogGrid = ({ blogs }: { blogs: any[] }) => {
//     const cardsRef = useRef<(HTMLDivElement | null)[]>([])

//     useLayoutEffect(() => {
//         const elements = cardsRef.current.filter((el): el is HTMLDivElement => el !== null)

//         if (elements.length === 0) return

//         gsap.set(elements, { opacity: 0, y: 50 });

//         const batch = ScrollTrigger.batch(elements, {
//             onEnter: batch => gsap.to(batch, {
//                 opacity: 1,
//                 y: 0,
//                 duration: 0.8,
//                 stagger: 0.15,
//                 ease: "power3.out",
//                 overwrite: true
//             }),
//             start: "top 90%",
//             once: true
//         });

//         const titleAnim = gsap.fromTo(".card-title",
//             { y: 20, opacity: 0 },
//             {
//                 y: 0,
//                 opacity: 1,
//                 stagger: 0.1,
//                 duration: 0.6,
//                 ease: "power2.out",
//                 delay: 0.2
//             }
//         );

//         elements.forEach((card) => {
//             const hoverIn = () => {
//                 gsap.to(card, {
//                     scale: 1.1,
//                     y: -15,
//                     zIndex: 10,
//                     boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
//                     duration: 0.4,
//                     ease: "power2.out",
//                 });
//             };

//             const hoverOut = () => {
//                 gsap.to(card, {
//                     scale: 1,
//                     y: 0,
//                     zIndex: 1,
//                     boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
//                     duration: 0.4,
//                     ease: "power2.out",
//                 });
//             };

//             card.addEventListener("mouseenter", hoverIn);
//             card.addEventListener("mouseleave", hoverOut);


//         });

//         return () => {
//             if (Array.isArray(batch)) {
//                 batch.forEach(t => t.kill());
//             }

//             if (titleAnim) titleAnim.kill();
//             gsap.killTweensOf(elements);
//         };
//     }, [blogs.length]);

//     return (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
//             {blogs.map((blog: any, index: number) => (
//                 <div
//                     key={blog.id}
//                     ref={(el) => {
//                         if (el) cardsRef.current[index] = el
//                     }}
//                     className="bg-white rounded-3xl border border-gray-100 flex flex-col h-full overflow-hidden"
//                 >
//                     {blog.featuredImage?.url && (
//                         <div className="overflow-hidden h-96 w-full">
//                             <img
//                                 src={`http://localhost:3000${blog.featuredImage.url}`}
//                                 alt={blog.title}
//                                 className="w-full h-full object-cover"
//                             />
//                         </div>
//                     )}
//                     <div className="p-6 flex flex-col flex-grow">
//                         <h2 className="card-title text-xl font-bold text-gray-900 mb-2">
//                             {blog.title}
//                         </h2>
//                         <p className="text-gray-600 text-sm mb-4 flex-grow">
//                             {blog.description}
//                         </p>
//                         <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
//                             <span className="text-xs font-medium text-gray-400 uppercase">
//                                 Article
//                             </span>
//                             <Link
//                                 href={`/Blog/${blog.slug ?? blog.id}`}
//                                 className="text-sm font-semibold text-blue-600 flex items-center"
//                             >
//                                 Read More <span>&rarr;</span>
//                             </Link>
//                         </div>
//                     </div>
//                 </div>
//             ))}
//         </div>
//     )
// }

'use client'

import { useEffect, useRef } from "react";
import gsap from "gsap";


const data = [
    {
        type: "people",
        title: "celebrating women 24/7/365",
        image: "https://cdn.prod.website-files.com/67483fb596664fd411a9d07f/689d9875379e930c3fb7d022_diversity.avif",
        description: "The history of the commemoration of Women's Day is a vital reminder of how important women's voices are in driving change."
    },
    {
        type: "press",
        title: "dhk architects wins two prestigious development awards for longkloof precinct",
        image: "https://cdn.prod.website-files.com/67483fb596664fd411a9d07f/68f0ad1165476c3d9484c8e0_LongkloofAwards.jpg",
        description: "dhk Architects was awarded two wins at the Africa Property Investment Awards in a ceremony held in Cape Town last night."
    },
    {
        type: "insights",
        title: "key themes + takeaways from the architecture.za 2025 conference",
        image: "https://cdn.prod.website-files.com/67483fb596664fd411a9d07f/6968c0e7e596b3748b5cc3a5_07---J1_Cover_6.jpg",
        description: "The AZA2025 conference in Johannesburg revealed a profession at a crossroads, wrestling with tradition, disruption and an expanding definition of architectural practice. Three central themes emerged from under the umbrella of Architecture Meets Us/Planet/Future."
    },

    {
        type: "insights",
        title: "dhk in the cape town cbd: chapter 1",
        image: "https://cdn.prod.website-files.com/67483fb596664fd411a9d07f/68caa6ce541744ec81a36b35_07---J1_Cover.avif",
        description: "As the city's fortunes have evolved, so too has the skyline. And we look back through time from then to now."
    },

    {
        type: "career",
        title: "in conversation with dhk associate sarah tarr",
        image: "https://cdn.prod.website-files.com/67483fb596664fd411a9d07f/6890b9e9be994eecbd17c84d_Sarah%20T2.avif",
        description: "In this article, we're profiling Associate Sarah Tarr, who has been with the studio for 10 years."
    }
];

export const BlogGrid = () => {
    const cardsRef = useRef([]);

    useEffect(() => {
        cardsRef.current.forEach((card) => {
            if (!card) return;

            const reveal = card.querySelector(".bottom-reveal");
            const desc = card.querySelector(".blog-desc");
            const overlay = card.querySelector(".view-article");

            gsap.set(desc, { opacity: 0, y: 20 });
            gsap.set(overlay, { opacity: 0, y: 20 });

            card.addEventListener("mouseenter", () => {

                gsap.to(reveal, {
                    height: "30%",
                    duration: 0.5,
                    ease: "power3.out",
                });

                gsap.to(desc, {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    delay: 0.2,
                    ease: "power3.out",
                });

                gsap.to(overlay, {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    ease: "power3.out",
                });
            });

            card.addEventListener("mouseleave", () => {

                gsap.to(reveal, {
                    height: "0%",
                    duration: 0.5,
                    ease: "power3.out",
                });

                gsap.to(desc, {
                    opacity: 0,
                    y: 20,
                    duration: 0.4,
                    ease: "power3.out",
                });

                gsap.to(overlay, {
                    opacity: 0,
                    y: 20,
                    duration: 0.4,
                    ease: "power3.out",
                });
            });
        });
    }, []);

    return (
        <section className="blog-section">
            <div className="blog-grid">
                {data.map((item, index) => (
                    <div
                        key={index}
                        className="blog-card"
                        ref={(el) => (cardsRef.current[index] = el)}
                    >
                        <div className="image-wrapper">
                            <img className="blog-img" src={item.image} alt={item.type} />

                            <div className="bottom-reveal"></div>
                        </div>
                        <div className="view-article">
                            [ view article ]
                        </div>

                        <h3 className="blog-title">{item.title}</h3>

                        <p className="blog-desc">{item.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};


