'use client'
import React, { useState, useRef,useEffect } from 'react'
import gsap from 'gsap';

interface JournalItem {
    type: string;
    title: string;
    image: string;
    description?: string;
}

export const Jurnal = () => {

    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    const items = [
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


     useEffect(() => {
    cardsRef.current.forEach((card) => {
      if (!card) return;

      const desc = card.querySelector(".blog-desc");
      const overlay = card.querySelector(".view-article") as HTMLElement;

      if (desc) gsap.set(desc, { height: 0, opacity: 0, marginTop: 0, overflow: 'hidden' });
      if (overlay) gsap.set(overlay, { opacity: 0, left: 0, top: 0 });

      const onMouseEnter = () => {
        gsap.to(desc, {
          height: "auto",
          opacity: 1,
          marginTop: "40px",
          duration: 0.5,
          ease: "power3.out",
        });

        gsap.to(overlay, {
          opacity: 1,
          duration: 0.5,
          ease: "power3.out",
        });
      };

      const onMouseMove = (e: MouseEvent) => {
        if (!overlay) return;

        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        gsap.to(overlay, {
          left: x,
          top: y,
          duration: 0.15,
          ease: "power2.out",
        });
      };

      const onMouseLeave = () => {
        gsap.to(desc, {
          height: 0,
          opacity: 0,
          marginTop: 0,
          duration: 0.4,
          ease: "power3.out",
        });

        gsap.to(overlay, {
          opacity: 0,
          left: 0,
          top: 0,
          duration: 0.4,
          ease: "power3.out",
        });
      };

      card.addEventListener("mouseenter", onMouseEnter);
      card.addEventListener("mousemove", onMouseMove);
      card.addEventListener("mouseleave", onMouseLeave);

      (card as any)._cleanup = () => {
        card.removeEventListener("mouseenter", onMouseEnter);
        card.removeEventListener("mousemove", onMouseMove);
        card.removeEventListener("mouseleave", onMouseLeave);
      };
    });

    return () => {
      cardsRef.current.forEach(card => {
        if (card && (card as any)._cleanup) {
          (card as any)._cleanup();
        }
      });
    };
  }, []);

    return (
        <>
            <section id="journal" className="container">
                <div className="section-title-large reveal-on-scroll">journal</div>
                <div className="journal-grid">
                    {items.map((item, idx) => (
                        <div className="journal-card" key={idx} ref={(el) => { cardsRef.current[idx] = el; }}>
                            <div className="journal-image-wrapper">
                                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                <div className="journal-view-article view-article">[ view article ]</div>
                                <div className="journal-meta">
                                    <div className="journal-header">
                                        <span className="journal-tag">{item.type}</span>
                                        <h3 className="journal-card-title">{item.title}</h3>
                                    </div>
                                    <div className="journal-card-description blog-desc">{item.description}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="journal-card flex items-center justify-center p-8">
                        <button className="load-more-btn text-lg md:text-xl">[ view more ]</button>
                    </div>
                </div>
            </section>
        </>
    )
}
