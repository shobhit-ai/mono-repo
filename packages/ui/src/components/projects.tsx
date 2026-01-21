'use client'

import React, { useEffect,useRef } from 'react'
import gsap from 'gsap';

export const Projects = () => {

    const projectRefs = useRef<(HTMLDivElement | null)[]>([]);
    const footerRefs = useRef<(HTMLDivElement | null)[]>([]);
    const heroRefs = useRef<(HTMLDivElement | null)[]>([]);


    const featuredProjects = [
        {
            name: "Radisson Red",
            image: "https://cdn.prod.website-files.com/67483fb596664fd411a9d07f/67b208fda748d932f1e7b465_radisson.avif",
            location: "V&A Waterfront, Cape Town",
            year: "2022"
        }
    ];

    const footerProjects = [
        {
            img: "https://cdn.prod.website-files.com/67483fb596664fd411a9d07f/69157f48231611da536066e8_00---ProjectCover.jpg",
            title: "City Park at 111 Bree Street",
            year: "2026",
        },
        {
            img: "https://cdn.prod.website-files.com/67483fb596664fd411a9d07f/67b20989c1f60844f1d0b422_seafront.avif",
            title: "Seafront Estate",
            year: "2026",
        },
    ];

    const studioImages = [
        {
            img: "https://cdn.prod.website-files.com/67483fb596664fd411a9d07f/67b205a1c905ac76003fd88b_drostdy.avif",
            alt: "Studio Workspace",
        },
        {
            img: "https://cdn.prod.website-files.com/67483fb596664fd411a9d07f/67bc85cdbd612b2d12ceeaf1_signature_2.avif",
            alt: "Studio Architecture",
        },
    ];

    useEffect(() => {
        projectRefs.current.forEach((card) => {
            if (!card) return;

            const reveal = card.querySelector(".bottom-reveal");
            const name = card.querySelector(".project-name");
            const viewText = card.querySelector(".view-project-text");

            gsap.set(name, { opacity: 0, y: 20 });
            gsap.set(viewText, { opacity: 0 });

            card.addEventListener("mouseenter", () => {
                gsap.to(viewText, { opacity: 1, duration: 0.2 });

                gsap.to(reveal, {
                    height: "5%",
                    duration: 0.5,
                    ease: "power3.out",
                });

                gsap.to(name, {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    delay: 0.2,
                    ease: "power3.out",
                });
            });

            card.addEventListener("mousemove", (e) => {
                const rect = card.getBoundingClientRect();

                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                gsap.to(viewText, {
                    x: x + 10,
                    y: y + 10,
                    duration: 0.1,
                    ease: "power2.out",
                });
            });

            card.addEventListener("mouseleave", () => {
                gsap.to(viewText, { opacity: 0, duration: 0.2 });

                gsap.to(reveal, {
                    height: "0%",
                    duration: 0.5,
                    ease: "power3.out",
                });

                gsap.to(name, {
                    opacity: 0,
                    y: 20,
                    duration: 0.4,
                    ease: "power3.out",
                });
            });
        });
    }, []);


    useEffect(() => {
        const cards = [...footerRefs.current, ...heroRefs.current];
        const handlersMap = new WeakMap<HTMLDivElement, any>();

        cards.forEach((card) => {
            if (!card) return;

            const viewText = card.querySelector(".view-project-text") as HTMLElement | null;
            const reveal = card.querySelector(".bottom-reveal") as HTMLElement | null;

            if (viewText) {
                gsap.set(viewText, { opacity: 0, x: 0, y: 0 });
            }

            if (reveal) {
                gsap.set(reveal, { height: "0%" });
            }

            const handleEnter = () => {
                cards.forEach((c) => {
                    const t = c?.querySelector(".view-project-text");
                    if (t) gsap.to(t, { opacity: 0, duration: 0.1 });
                });

                if (viewText) {
                    gsap.to(viewText, { opacity: 1, duration: 0.2 });
                }

                if (reveal) {
                    gsap.to(reveal, {
                        height: "6%",
                        duration: 0.5,
                        ease: "power3.out",
                    });
                }
            };

            const handleMove = (e: MouseEvent) => {
                if (!viewText) return;

                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                gsap.to(viewText, {
                    x: x + 10,
                    y: y + 10,
                    duration: 0.1,
                    ease: "power2.out",
                });
            };

            const handleLeave = () => {
                if (viewText) {
                    gsap.to(viewText, { opacity: 0, duration: 0.2 });
                }

                if (reveal) {
                    gsap.to(reveal, {
                        height: "0%",
                        duration: 0.5,
                        ease: "power3.out",
                    });
                }
            };

            card.addEventListener("mouseenter", handleEnter);
            card.addEventListener("mousemove", handleMove);
            card.addEventListener("mouseleave", handleLeave);

            handlersMap.set(card, { handleEnter, handleMove, handleLeave });
        });

        return () => {
            cards.forEach((card) => {
                if (!card) return;

                const handlers = handlersMap.get(card);
                if (!handlers) return;

                const { handleEnter, handleMove, handleLeave } = handlers;

                card.removeEventListener("mouseenter", handleEnter);
                card.removeEventListener("mousemove", handleMove);
                card.removeEventListener("mouseleave", handleLeave);
            });
        };

    }, []);


    return (
        <>
            <section id="projects" className="featured-projects">
                <div className="projects-title-grid">
                    <div className="featured-projects-title reveal-on-scroll">
                        featured projects
                    </div>
                </div>

                {featuredProjects.map((project, idx) => (
                    <div
                        key={idx}
                        className="featured-project-item"
                        ref={(el) => {
                            projectRefs.current[idx] = el;
                        }}
                    >
                        <img
                            src={project.image}
                            alt={project.name}
                            className="w-full h-full object-cover"
                        />

                        <div className="view-project-text">[ view project ]</div>

                        <div className="bottom-reveal mobile-visible">
                            <div className="flex justify-between items-center w-full px-5 py-3">
                                <h3 className="project-name text-white text-sm md:text-base font-bold m-0 p-0">
                                    {project.name}
                                </h3>
                                <span className="text-white text-sm md:text-base font-bold">
                                    {project.year}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </section>

            <section id="studio" className="relative">
                <div className="projects-footer-grid">
                    {footerProjects.map((project, index) => (
                        <div
                            key={index}
                            className={`footer-project-box box-${index + 1} reveal-on-scroll hover-trigger-studio`}
                            ref={(el) => {
                                footerRefs.current[index] = el;
                            }}
                        >
                            <img src={project.img} alt={project.title} className="w-full h-full object-cover" />

                            <div className="bottom-reveal mobile-visible">
                                <div className="flex justify-between items-center w-full px-5 py-3">
                                    <span className="text-sm md:text-base font-bold">
                                        {project.title}
                                    </span>
                                    <span className="text-sm md:text-base font-bold">
                                        {project.year}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="footer-project-box box-3">
                        <a href="#projects" className="view-all-projects">
                            [&nbsp;&nbsp;&nbsp;view all projects&nbsp;&nbsp;&nbsp;]
                        </a>
                    </div>
                </div>

                <div className="studio-hero-grid">
                    <div className="studio-hero-box box-black hidden md:block"></div>
                    {studioImages.map((item, index) => (
                        <div
                            key={index}
                            className="studio-hero-box reveal-on-scroll hover-trigger-studio"
                            ref={(el) => {
                                heroRefs.current[index] = el;
                            }}
                        >
                            <img src={item.img} alt={item.alt} className="w-full h-full object-cover" />
                            <div className="bottom-reveal mobile-visible">
                                <span className="text-sm md:text-base font-bold px-5 py-3">
                                    {item.alt}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    )
}
