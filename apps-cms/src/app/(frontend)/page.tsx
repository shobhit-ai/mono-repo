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
      <Footer />
      <div className="hidden md:block cursor-view-project-label">
        [ view project ]
      </div>
    </div>
  );
};

export default HomePage;






