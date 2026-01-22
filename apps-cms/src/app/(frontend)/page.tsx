'use client'
import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import "./styles.css"
import { Header } from "@repo/ui";
import { Footer } from "@repo/ui";
import { Award } from "@repo/ui";
import { Jurnal } from '@repo/ui';
import { Projects } from "@repo/ui";
import { Section } from "@repo/ui";

gsap.registerPlugin(ScrollTrigger);


const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [windowWidth, setWindowWidth] = useState(0);
  const [isIntroDone, setIsIntroDone] = useState(false);

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
    ],
    [
      'https://cdn.prod.website-files.com/6746d4e7508fcde5d1dbac6c/6915957f07025e43a5ef65eb_01---H0_HERO_7of9.jpg',
      'https://cdn.prod.website-files.com/6746d4e7508fcde5d1dbac6c/6915959befbd44da7d5e1890_01---H0_HERO_8of9.jpg'
    ]
  ];

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

        gsap.set(weScroll, { clearProps: "transform" });
        const isMobile = window.innerWidth <= 768;
        const weRight = document.querySelector('.we_right') as HTMLElement;
        const totalDistance = isMobile ? 80 : (weRight.offsetHeight - weScroll.offsetHeight);

        gsap.to(weScroll, {
          y: totalDistance,
          x: isMobile ? 0 : 0,
          ease: "none",
          scrollTrigger: {
            id: "we-trigger-main",
            trigger: isMobile ? weSection : ".we_layout-top",
            start: isMobile ? "top bottom" : "top 85%",
            end: isMobile ? "bottom top" : "bottom 20%",
            scrub: isMobile ? 0.5 : 2.5,
            invalidateOnRefresh: true,
          }
        });

        weItems.forEach((item, index) => {
          gsap.fromTo(item,
            { opacity: 0.1 },
            {
              opacity: 1,
              ease: "power2.out",
              scrollTrigger: {
                id: `we-trigger-item-${index}`,
                trigger: item,
                start: isMobile ? "top 85%" : "top 85%",
                end: isMobile ? "top 50%" : "top 50%",
                scrub: true,
              }
            }
          );
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


  return (
    <div className="dhk-website">
      <div className="home-intro-wrapper w-full relative">
        <section
          className="hero-section relative w-full overflow-hidden"
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
          <div className="absolute inset-0 z-0 grid grid-cols-2 md:grid-cols-3 w-full h-full gap-0">
            {heroColumns.map((colImages, colIndex) => (
              <div
                key={colIndex}
                className={`col-${colIndex} relative w-full h-full overflow-hidden ${colIndex === 3 ? 'block md:hidden' : 'block'}`}
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
        <Header />
      </div>
      <Section />
      <Projects />
      <Award />
      <Jurnal />
       <footer className="dhk-footer !pl-8 !pb-6 md:!pl-16 md:!pb-8 pr-4 md:px-8 !pt-40 !md:pt-96 !mt-40 !md:mt-40">

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-6 items-start md:items-end">
                    <div className="order-last md:order-first col-span-1 md:col-span-3 flex flex-col md:flex-row gap-4 text-sm md:text-base font-medium leading-snug items-start md:items-center opacity-50 md:opacity-100">
                        <div className=" font-bold lowercase">all rights reserved. dhk@2025</div>
                        <a href="#" className="lowercase transition-opacity duration-300 hover:opacity-60 font-bold">
                            POPI + PAIA
                        </a>
                    </div>
                    <div className="col-span-1 md:col-span-9 flex flex-col md:flex-row flex-wrap justify-between md:justify-end gap-8 md:gap-16 w-full">
                        <div className="w-full grid grid-cols-2 gap-x-4 gap-y-8 md:contents">
                            <div className="w-full md:w-auto flex flex-col gap-1">
                                <a href="#" className="flex items-center gap-3 text-base font-bold lowercase">
                                    <span className="w-1.5 h-1.5 bg-white ml-12"></span>
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
                        <div className="hidden md:flex w-full md:w-auto justify-start md:justify-end mt-4 md:mt-0">
                            <button className="contact-btn text-base font-bold lowercase transition-opacity duration-300 hover:opacity-60">
                                [ contact us ]
                            </button>
                        </div>
                    </div>
                </div>
            </footer>
      <div className="hidden md:block cursor-view-project-label">
        [ view project ]
      </div>
    </div>
  );
};

export default HomePage;





