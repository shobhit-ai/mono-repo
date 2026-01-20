'use client'
import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import "./styles.css";

gsap.registerPlugin(ScrollTrigger);

interface JournalItem {
  type: string;
  title: string;
  image: string;
  description?: string;
}

const HomePage = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [journalItems, setJournalItems] = useState<JournalItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [windowWidth, setWindowWidth] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredAwardIndex, setHoveredAwardIndex] = useState<number | null>(null);
  const [awardTop, setAwardTop] = useState(0);
  const [isIntroDone, setIsIntroDone] = useState(false);

  const col1Ref = useRef(null);
  const col2Ref = useRef(null);
  const col3Ref = useRef(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);
  const studioRefs = useRef<(HTMLDivElement | null)[]>([]);
  const footerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const heroRefs = useRef<(HTMLDivElement | null)[]>([]);

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsIntroDone(true), 8000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const heroColumns = [
    [
      "https://cdn.prod.website-files.com/6746d4e7508fcde5d1dbac6c/67a35bcec1e6dee368c62d25_dhk_Logo.webp",
      'https://cdn.prod.website-files.com/6746d4e7508fcde5d1dbac6c/6913007efd068dff00aabfe4_01---H0_HERO_3of9.jpg'
    ],
    [
      'https://cdn.prod.website-files.com/6746d4e7508fcde5d1dbac6c/691300f826c9e59084f1de99_01---H0_HERO_1of9.jpg',
      'https://cdn.prod.website-files.com/6746d4e7508fcde5d1dbac6c/6913011d3d3a260559af0846_01---H0_HERO_4of9.jpg'
    ],
    [
      'https://cdn.prod.website-files.com/6746d4e7508fcde5d1dbac6c/6913013db3ed936bd259f69e_01---H0_HERO_2of9.jpg',
      'https://cdn.prod.website-files.com/6746d4e7508fcde5d1dbac6c/6913015d65650b87232a69a3_01---H0_HERO_5of9.jpg'
    ]
  ];

  const awards = [
    {
      year: "2025",
      project: "Canopy by Hilton Cape Town Longkloof",
      category: "API Awards Winner",
      subtext: "Hotel & Hospitality Development",
      logo: "https://cdn.prod.website-files.com/67483fb596664fd411a9d07f/68e900709e0706a4a4ae8d7f_01---H8_AwardsLogos.jpg"
    },
    {
      year: "2025",
      project: "Longkloof Precinct",
      category: "API Awards Winner",
      subtext: "Mixed-Use Development of the Year",
      logo: "https://cdn.prod.website-files.com/67483fb596664fd411a9d07f/68e900709e0706a4a4ae8d7f_01---H8_AwardsLogos.jpg"
    },
    {
      year: "2025",
      project: "dhk Website",
      category: "Awwwards Winner",
      subtext: "Site of the Day",
      logo: "https://cdn.prod.website-files.com/67483fb596664fd411a9d07f/68e8ffa934e357170d4c32dd_01---H8_AwardsLogos_FWA.jpg"
    },
    {
      year: "2025",
      project: "The Rubik",
      category: "CIfA Commendation",
      subtext: "Architecture & Design",
      logo: "https://cdn.prod.website-files.com/67483fb596664fd411a9d07f/68e8fc145c7f588ab350151c_67a9d9668538a46682fdd5b8_Untitled%20design%20(13).avif"
    },
    {
      year: "2025",
      project: "Longkloof Precinct",
      category: "CIfA Winner",
      subtext: "Heritage Award",
      logo: "https://cdn.prod.website-files.com/67483fb596664fd411a9d07f/68e900709e0706a4a4ae8d7f_01---H8_AwardsLogos.jpg"
    },
    {
      year: "2025",
      project: "dhk Website",
      category: "FWA of the Day Winner",
      subtext: "Favourite Website Awards (FWA) of the Day",
      logo: "https://cdn.prod.website-files.com/67483fb596664fd411a9d07f/68e8ffa934e357170d4c32dd_01---H8_AwardsLogos_FWA.jpg"
    },
    {
      year: "2025",
      project: "Brookfield at Royal",
      category: "Reside Awards Winner",
      subtext: "Residential Development",
      logo: "https://cdn.prod.website-files.com/67483fb596664fd411a9d07f/68e8fc145c7f588ab350151c_67a9d9668538a46682fdd5b8_Untitled%20design%20(13).avif"
    },
    {
      year: "2025",
      project: "The Rubik",
      category: "Reside Awards Winner",
      subtext: "High Density Urban Living",
      logo: "https://cdn.prod.website-files.com/67483fb596664fd411a9d07f/68e8fc145c7f588ab350151c_67a9d9668538a46682fdd5b8_Untitled%20design%20(13).avif"
    },
    {
      year: "2025",
      project: "Canopy by Hilton Cape Town Longkloof",
      category: "SAPOA Awards Winner",
      subtext: "Innovative Design",
      logo: "https://cdn.prod.website-files.com/67483fb596664fd411a9d07f/68e901dbf12d7b863f72125b_67aa00c8e347a1b615d19523_3.avif"
    },
    {
      year: "2025",
      project: "Canopy by Hilton Cape Town Longkloof",
      category: "SAPOA Awards Winner",
      subtext: "Excellence in Construction",
      logo: "https://cdn.prod.website-files.com/67483fb596664fd411a9d07f/68e901dbf12d7b863f72125b_67aa00c8e347a1b615d19523_3.avif"
    },
  ];

  const featuredProjects = [
    {
      name: "Radisson Red",
      image: "https://cdn.prod.website-files.com/67483fb596664fd411a9d07f/67b208fda748d932f1e7b465_radisson.avif",
      location: "V&A Waterfront, Cape Town",
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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) {
      gsap.to(menuRef.current, {
        clipPath: 'circle(150% at 100% 0%)',
        duration: 1,
        ease: 'power3.inOut'
      });
      document.body.style.overflow = 'hidden';
    } else {
      gsap.to(menuRef.current, {
        clipPath: 'circle(0% at 100% 0%)',
        duration: 1,
        ease: 'power3.inOut'
      });
      document.body.style.overflow = 'auto';
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark-mode');
  };

  useLayoutEffect(() => {
    document.documentElement.classList.add('dark-mode');

    gsap.fromTo('.main-header',
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.2 }
    );

    gsap.fromTo('.hero-content',
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.5 }
    );

    const heroTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".home-intro-wrapper",
        start: "top top",
        end: "+=150%",
        pin: true,
        scrub: 0.1,
        snap: {
          snapTo: [0, 1],
          duration: { min: 0.1, max: 0.5 },
          delay: 0.05,
          ease: "power2.inOut",
          inertia: false
        },
        anticipatePin: 1
      }
    });

    heroColumns.forEach((_, colIndex) => {
      const visibleImage = document.querySelector(`.col-${colIndex} .hero-stack-image:first-child`);

      if (visibleImage) {
        heroTl.to(visibleImage, {
          yPercent: -100,
          ease: "none",
          duration: 1,
        }, colIndex * 0.2);
      }
    });

    if (!isIntroDone) {
      heroColumns.forEach((_, colIndex) => {
        gsap.fromTo(`.col-${colIndex} .hero-stack-image:first-child img`,
          { scale: 1.1 },
          { scale: 1, duration: 9, ease: "power1.out" }
        );
      });
    }

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
    setJournalItems(items);
    setIsLoading(false);

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 1,
      infinite: false,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    const updateWeSection = () => {
      const weSection = document.querySelector('.we_section');
      const weScroll = document.querySelector('.we_scroll') as HTMLElement;
      const weItems = document.querySelectorAll('.we_item');

      if (weSection && weScroll && weItems.length > 0) {
        ScrollTrigger.getAll().forEach(t => {
          if ((t.vars as any).id?.startsWith('we-trigger-')) {
            t.kill();
          }
        });

        const weLayoutTop = document.querySelector('.we_layout-top') as HTMLElement;
        const weRight = document.querySelector('.we_right') as HTMLElement;
        const totalDistance = weRight.offsetHeight - weScroll.offsetHeight;

        gsap.to(weScroll, {
          y: totalDistance,
          ease: "none",
          scrollTrigger: {
            id: "we-trigger-main",
            trigger: ".we_layout-top",
            start: "top 85%",
            end: "bottom 20%",
            scrub: 2.5,
            invalidateOnRefresh: true
          }
        });
      }
    };

    const handleResize = () => {
      lenis.resize();
      updateWeSection();
    };

    window.addEventListener('resize', handleResize);

    setTimeout(() => {
      lenis.scrollTo(0, { immediate: true });
      handleResize();
    }, 100);

    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    revealElements.forEach((el) => {
      gsap.fromTo(el,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );
    });

    const imageWrappers = document.querySelectorAll('.story_image_wrapper');
    imageWrappers.forEach((wrapper) => {
      const img = wrapper.querySelector('img');
      if (img) {
        gsap.fromTo(img,
          { scale: 1.3, clipPath: 'inset(100% 0% 0% 0%)' },
          {
            scale: 1,
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.6,
            ease: "power4.out",
            scrollTrigger: {
              trigger: wrapper,
              start: "top 75%",
            }
          }
        );
      }
    });

    const awardRows = document.querySelectorAll('.award-row');
    gsap.fromTo(awardRows,
      { x: -30, opacity: 0 },
      {
        x: 0,
        opacity: 0.25,
        duration: 0.8,
        stagger: 0.05,
        ease: "power2.out",
        scrollTrigger: {
          trigger: '.awards-list',
          start: "top 70%",
        }
      }
    );

    const studioImages = document.querySelectorAll('.studio-hero-box img');
    studioImages.forEach((img, index) => {
      gsap.fromTo(img,
        { scale: 1.2 },
        {
          scale: 1,
          duration: 1.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: img,
            start: "top 80%",
          }
        }
      );
    });

    const titles = document.querySelectorAll('.section-title-large, .featured-projects-title, .awards-title');
    titles.forEach((title) => {
      gsap.fromTo(title,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: title,
            start: "top 85%",
          }
        }
      );
    });

    const magneticElements = document.querySelectorAll('.load-more-btn, .view-all-projects, .contact-btn, .subscribe-link');

    const magneticHandlers = Array.from(magneticElements).map((el) => {
      const element = el as HTMLElement;

      const onMouseEnter = () => {
        gsap.to(element, { scale: 1.05, duration: 0.3, ease: "power2.out" });
      };

      const onMouseLeave = () => {
        gsap.to(element, { scale: 1, x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
      };

      const onMouseMove = (e: MouseEvent) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(element, {
          x: x * 0.2,
          y: y * 0.2,
          duration: 0.3,
          ease: "power2.out"
        });
      };

      element.addEventListener('mouseenter', onMouseEnter);
      element.addEventListener('mouseleave', onMouseLeave);
      element.addEventListener('mousemove', onMouseMove);

      return { element, onMouseEnter, onMouseLeave, onMouseMove };
    });

    const weSection = document.querySelector('.we_section');
    const weScroll = document.querySelector('.we_scroll') as HTMLElement;
    const weItems = document.querySelectorAll('.we_item');

    if (weSection && weScroll && weItems.length > 0) {
      gsap.set(weItems, { opacity: 0.1 });
      gsap.set(weScroll, { y: 0 });
      updateWeSection();
    }

    const journalCards = document.querySelectorAll('.journal-card');
    if (journalCards.length > 0) {
      gsap.fromTo(journalCards,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".journal-grid",
            start: "top 80%",
          }
        }
      );
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      magneticHandlers.forEach(({ element, onMouseEnter, onMouseLeave, onMouseMove }) => {
        element.removeEventListener('mouseenter', onMouseEnter);
        element.removeEventListener('mouseleave', onMouseLeave);
        element.removeEventListener('mousemove', onMouseMove);
      });
      lenis.destroy();
      ScrollTrigger.getAll().forEach(t => t.kill());
      document.documentElement.classList.remove('dark-mode');
    };
  }, []);

  useEffect(() => {
    cardsRef.current.forEach((card) => {
      if (!card) return;

      const desc = card.querySelector(".blog-desc");
      const overlay = card.querySelector(".view-article");

      if (desc) gsap.set(desc, { height: 0, opacity: 0, marginTop: 0, overflow: 'hidden' });
      if (overlay) gsap.set(overlay, { opacity: 0, y: 20 });

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
          y: 0,
          duration: 0.5,
          ease: "power3.out",
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
          y: 20,
          duration: 0.4,
          ease: "power3.out",
        });
      };
      card.addEventListener("mouseenter", onMouseEnter);
      card.addEventListener("mouseleave", onMouseLeave);

      (card as any)._cleanup = () => {
        card.removeEventListener("mouseenter", onMouseEnter);
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
  }, [journalItems]);


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


  useEffect(() => {
    const cursorLabel = document.querySelector('.cursor-view-project-label');
    const triggers = document.querySelectorAll('.hover-trigger-studio');

    if (cursorLabel && triggers.length > 0 && windowWidth > 768) {
      gsap.set(cursorLabel, { xPercent: -50, yPercent: -50, scale: 0, opacity: 0 });

      const xTo = gsap.quickTo(cursorLabel, "x", { duration: 0.1, ease: "power3" });
      const yTo = gsap.quickTo(cursorLabel, "y", { duration: 0.1, ease: "power3" });

      const moveCursor = (e: MouseEvent) => {
        xTo(e.clientX);
        yTo(e.clientY);
      };

      window.addEventListener('mousemove', moveCursor);

      const onEnter = () => gsap.to(cursorLabel, { scale: 1, opacity: 1, duration: 0.3, ease: 'power2.out' });
      const onLeave = () => gsap.to(cursorLabel, { scale: 0, opacity: 0, duration: 0.3, ease: 'power2.in' });

      triggers.forEach(el => {
        el.addEventListener('mouseenter', onEnter);
        el.addEventListener('mouseleave', onLeave);
      });

      return () => {
        window.removeEventListener('mousemove', moveCursor);
        triggers.forEach(el => {
          el.removeEventListener('mouseenter', onEnter);
          el.removeEventListener('mouseleave', onLeave);
        });
      };
    }
  }, [windowWidth]);

  const getColumnVisibility = (colIndex: number) => {
    if (windowWidth < 640) {
      return colIndex === 0 ? '' : 'hidden';
    } else if (windowWidth < 1024) {
      return colIndex === 1 ? 'hidden' : '';
    } else {
      return '';
    }
  };

  return (
    <div className="dhk-website">
      <div className="full-screen-menu" ref={menuRef}>
        <div className="menu-container">
          <nav className="menu-nav">
            <a href="#projects" onClick={toggleMenu} className="menu-nav-link"><span>01</span> projects</a>
            <a href="#studio" onClick={toggleMenu} className="menu-nav-link"><span>02</span> studio</a>
            <a href="#journal" onClick={toggleMenu} className="menu-nav-link"><span>03</span> journal</a>
            <a href="#careers" onClick={toggleMenu} className="menu-nav-link"><span>04</span> careers ↗</a>
          </nav>

          <div className="menu-footer">
            <div className="menu-footer-col">
              <h4>social</h4>
              <a href="#">instagram</a>
              <a href="#">linkedin</a>
            </div>
            <div className="menu-footer-col">
              <h4>contact</h4>
              <a href="#">cape town</a>
              <a href="#">johannesburg</a>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden"
        onClick={toggleMenu}
        style={{
          display: isMenuOpen ? 'none' : 'block',
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          background: '#000',
          color: '#fff',
          border: '1px solid #fff',
          padding: '10px 20px',
          zIndex: 100,
          fontSize: '0.9rem',
          fontWeight: '700',
          textTransform: 'lowercase',
          borderRadius: '4px'
        }}
      >
        menu
      </button>

      <div className="home-intro-wrapper w-full relative">
        <section
          className="hero-section relative w-full overflow-hidden bg-black text-white"
          style={{ height: 'calc(80vh - 80px)' }}
        >
          {!isIntroDone && (
            <div className="absolute top-0 left-0 w-full h-1 bg-gray-800 z-50">
              <div
                className="h-full bg-white transition-all duration-[8000ms] ease-linear w-full"
                style={{ width: isIntroDone ? '100%' : '0%' }}
              ></div>
            </div>
          )}

          <div className="absolute inset-0 z-0 grid grid-cols-1 md:grid-cols-3 w-full h-full gap-0">
            {heroColumns.map((colImages, colIndex) => (
              <div
                key={colIndex}
                className={`col-${colIndex} relative w-full h-full overflow-hidden ${getColumnVisibility(colIndex)}`}
              >
                {colImages.map((src, imgIndex) => (
                  <div
                    key={imgIndex}
                    className="hero-stack-image absolute inset-0 w-full h-full"
                    style={{
                      zIndex: colImages.length - imgIndex
                    }}
                  >
                    <img
                      src={src}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>

        <header
          className="main-header w-full z-40 absolute bottom-0 left-0 md:sticky md:top-0"
          style={{ mixBlendMode: isMenuOpen ? 'difference' : 'normal' }}
        >
          <div className="header-left">
            <a href="/" className="header-logo" style={{ color: isMenuOpen ? '#fff' : 'inherit' }}>
              <span className="home-dot"></span> home
            </a>
          </div>

          {/* Hide on mobile, show on desktop */}
          <div className="header-center hidden md:flex">
            <nav className="header-nav">
              <a href="#projects" className="nav-link">projects,</a>
              <a href="#studio" className="nav-link">studio,</a>
              <a href="#journal" className="nav-link">journal,</a>
              <a href="#careers" className="nav-link">careers ↗</a>
            </nav>
          </div>

          <div className="header-right">
            {/* Hide theme toggle on mobile */}
            <button className="theme-toggle hidden md:flex" onClick={toggleDarkMode}>
              <span className={isDarkMode ? 'active' : ''}>dark</span>
              <span className="separator"> / </span>
              <span className={!isDarkMode ? 'active' : ''}>light</span>
            </button>
            <button className="menu-toggle" onClick={toggleMenu}>
              menu
            </button>
          </div>
        </header>
      </div>

      <section className="we_section">
        <div className="we_contain">
          <div className="we_layout-top">
            <div className="we_scroll">
              <h4 className="we_text">we</h4>
            </div>
            <div className="we_right">
              <div className="we_item">stay curious, always.</div>
              <div className="we_item">collaborate.</div>
              <div className="we_item">nurture talent.</div>
              <div className="we_item">design for the future.</div>
            </div>
          </div>

          <div className="we_layout-bottom">
            <div className="we_left">
              <div className="we_text-bold">services</div>
            </div>
            <div className="we_right-bottom">
              <div className="we_text-normal">
                We're architects, urban designers and interior designers. We deliver buildings, public spaces and interiors that are contextually sensitive, environmentally responsible and technically resilient.
              </div>
            </div>
          </div>
          <div className="we_story-image reveal-on-scroll">
            <img
              src="https://cdn.prod.website-files.com/6746d4e7508fcde5d1dbac6c/691301c8f33b310cff4aba02_01---H1_OurStory.jpg"
              alt="dhk story break"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="story_section">
        <div className="story_grid">
          <div className="story_image_wrapper reveal-on-scroll">
            <img
              src="https://cdn.prod.website-files.com/6746d4e7508fcde5d1dbac6c/691301e20d8074332e2f77bd_01---H2_OurStory.jpg"
              alt="Our Story"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="story_label reveal-on-scroll">[&nbsp;&nbsp;&nbsp;our story&nbsp;&nbsp;&nbsp;]</div>
          <div className="story_content reveal-on-scroll">
            <p>dhk Architects was established in 1998 in a merger between Derick Henstra Architects and KCvR Architects. Today, we're one of the largest and leading architectural studios in Africa. Since then, we've delivered award-winning buildings, urban designs and interior spaces in South Africa, across the continent and beyond. We have studios in Cape Town and Johannesburg and deliver for clients all over the world.</p>
            <p>Our team of over 140 people comprises multidisciplinary design professionals and technologists, supported by experienced and talented BIM experts, architectural visualisers, graphic designers, communication specialists, administrators, HR and finance specialists. We also work collaboratively with experts in other disciplines at all stages of our projects, from design concept to practical completion.</p>
          </div>
        </div>
      </section>

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

            <div className="bottom-reveal">
              <h3 className="project-name" style={{ paddingLeft: "20px" }}>
                {project.name}
              </h3>
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

              <div className="bottom-reveal">
                <div className="flex justify-between items-center w-full px-5 py-3">
                  <span className="text-white text-sm md:text-base font-bold">
                    {project.title}
                  </span>
                  <span className="text-white text-sm md:text-base font-bold">
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
              <div className="bottom-reveal">
                <span className="text-white text-sm md:text-base font-bold px-5 py-3">
                  {item.alt}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container awards-section">
        <div className="awards-title reveal-on-scroll">awards</div>
        <div className="awards-reveal-container hidden md:block">
          {hoveredAwardIndex !== null && awards[hoveredAwardIndex].logo && (
            <div
              className="awards-logo-reveal"
              style={{
                position: 'absolute',
                top: awardTop,
                left: 0,
                right: 0,
                margin: '0 auto',
                zIndex: 20,
                transition: 'top 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              <img src={awards[hoveredAwardIndex].logo} alt="award logo" />
            </div>
          )}
        </div>
        <div className="awards-list">
          {awards.map((award, idx) => (
            <div
              key={idx}
              className={`award-row reveal-on-scroll ${hoveredAwardIndex === idx ? 'active' : ''}`}
              onMouseEnter={(e) => {
                if (windowWidth > 768) {
                  setHoveredAwardIndex(idx);
                  setAwardTop(e.currentTarget.offsetTop);
                }
              }}
              onMouseLeave={() => {
                if (windowWidth > 768) setHoveredAwardIndex(null);
              }}
              onClick={() => {
                if (windowWidth <= 768) {
                  setHoveredAwardIndex(hoveredAwardIndex === idx ? null : idx);
                }
              }}
            >
              <div className="award-year">{award.year}</div>
              <div className="award-project-info">
                <div className="award-project">{award.project}</div>
                {(hoveredAwardIndex === idx || windowWidth <= 768) && award.subtext && (
                  <div className="award-subtext">{award.subtext}</div>
                )}
              </div>
              <div className="award-category">{award.category}</div>
            </div>
          ))}
          <button className="load-more-btn">[ load more ]</button>
        </div>
      </section>
      <section id="journal" className="container">
        <div className="section-title-large reveal-on-scroll">journal</div>
        <div className="journal-grid">
          {journalItems.map((item, idx) => (
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

      <footer className="bg-black text-white px-4 md:px-8 !pt-40 !md:pt-96 pb-12 !mt-40 !md:mt-80">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-6 items-start md:items-end">
          <div className="order-last md:order-first col-span-1 md:col-span-3 flex flex-col md:flex-row gap-4 text-sm md:text-base font-medium leading-snug items-start md:items-center opacity-50 md:opacity-100">
            <div className="lowercase">all rights reserved. dhk@2025</div>
            <a href="#" className="lowercase transition-opacity duration-300 hover:opacity-60">
              POPI + PAIA
            </a>
          </div>
          <div className="col-span-1 md:col-span-9 flex flex-col md:flex-row flex-wrap justify-between md:justify-end gap-8 md:gap-16 w-full">
            <div className="w-full md:w-auto flex flex-col gap-4">
              <a href="#" className="flex items-center text-base font-bold leading-snug lowercase transition-opacity duration-300 hover:opacity-60">
                <span className="w-3 flex justify-start">
                  <span className="w-1.5 h-1.5 bg-white rounded-full mr-0.5"></span>
                </span>
                home
              </a>
              <a href="#projects" className="text-base font-bold leading-snug lowercase hover:opacity-60">projects</a>
              <a href="#studio" className="text-base font-bold leading-snug lowercase hover:opacity-60">studio</a>
              <a href="#journal" className="text-base font-bold leading-snug lowercase hover:opacity-60">journal</a>
              <a href="#careers" className="text-base font-bold leading-snug lowercase hover:opacity-60">careers ↗</a>
            </div>
            <div className="w-full md:w-auto flex flex-col gap-1">
              <a href="#" className="text-base font-bold leading-snug lowercase hover:opacity-60">instagram</a>
              <a href="#" className="text-base font-bold leading-snug lowercase hover:opacity-60">linkedin</a>
              <a href="#" className="text-base font-bold leading-snug lowercase hover:opacity-60">facebook</a>
              <a href="#" className="text-base font-bold leading-snug lowercase hover:opacity-60">pinterest</a>
              <a href="#" className="text-base font-bold leading-snug lowercase hover:opacity-60">vimeo</a>
            </div>
            <div className="w-full md:w-auto flex flex-col gap-3">
              <h4 className="text-base font-bold leading-snug lowercase mb-0">newsletter</h4>
              <input
                type="text"
                placeholder="full name"
                className="w-full md:w-64 bg-transparent border-b border-white/15 pb-2.5 text-white text-base font-bold lowercase outline-none focus:border-white/40 placeholder:text-white/40"
              />
              <input
                type="email"
                placeholder="email address"
                className="w-full md:w-64 bg-transparent border-b border-white/15 pb-2.5 text-white text-base font-bold lowercase outline-none focus:border-white/40 placeholder:text-white/40"
              />
              <button className="subscribe-link text-left text-base font-bold lowercase hover:opacity-60 mt-2">
                [ subscribe ]
              </button>
            </div>
            <div className="w-full md:w-auto flex justify-start md:justify-end mt-4 md:mt-0">
              <button className="contact-btn text-base font-bold lowercase transition-opacity duration-300 hover:opacity-60">
                [ contact us ]
              </button>
            </div>
          </div>
        </div>
      </footer>

      {windowWidth > 768 && (
        <div className="cursor-view-project-label">[ view project ]</div>
      )}
    </div>
  );
};

export default HomePage;