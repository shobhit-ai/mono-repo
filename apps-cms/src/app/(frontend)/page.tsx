'use client'
import React, { useState, useEffect, useRef } from 'react';
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

  const col1Ref = useRef(null);
  const col2Ref = useRef(null);
  const col3Ref = useRef(null);
  const [hoveredAwardIndex, setHoveredAwardIndex] = useState<number | null>(null);

  const heroImages = [
    "https://cdn.prod.website-files.com/6746d4e7508fcde5d1dbac6c/6913015d65650b87232a69a3_01---H0_HERO_5of9.jpg",
    "https://cdn.prod.website-files.com/6746d4e7508fcde5d1dbac6c/6915957f07025e43a5ef65eb_01---H0_HERO_7of9.jpg",
    "https://cdn.prod.website-files.com/6746d4e7508fcde5d1dbac6c/6915959befbd44da7d5e1890_01---H0_HERO_8of9.jpg"
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
      name: "radisson red ",
      image: "https://cdn.prod.website-files.com/67483fb596664fd411a9d07f/67b208fda748d932f1e7b465_radisson.avif"
    }
  ];

  useEffect(() => {
    document.documentElement.classList.add('dark-mode');

    gsap.fromTo('.main-header',
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.2 }
    );

    gsap.fromTo('.hero-content',
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.5 }
    );

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top top",
        end: "bottom top",
        scrub: 1,
      }
    });

    if (col1Ref.current && col2Ref.current && col3Ref.current) {
      tl.to(col1Ref.current, { y: -150 }, 0)
        .to(col2Ref.current, { y: -300 }, 0)
        .to(col3Ref.current, { y: -220 }, 0);
    }

    const items = [
      {
        type: "insights",
        title: "key themes + takeaways from the architecture.za 2025 conference",
        image: "https://cdn.prod.website-files.com/67483fb596664fd411a9d07f/68ed0cf6195f31e04fb2e628_CBD_1_REVB_-Recovered.jpg",
        description: "The AZA2025 conference in Johannesburg revealed a profession at a crossroads, wrestling with tradition, disruption and an expanding definition of architectural practice. Three central themes emerged from under the umbrella of Architecture Meets Us/Planet/Future."
      },
      {
        type: "press",
        title: "dhk architects wins two prestigious development awards for longkloof precinct",
        image: "https://cdn.prod.website-files.com/67483fb596664fd411a9d07f/68f0ad1165476c3d9484c8e0_LongkloofAwards.jpg",
        description: "dhk Architects was awarded two wins at the Africa Property Investment Awards in a ceremony held in Cape Town last night."
      },
      {
        type: "insights",
        title: "dhk in the cape town cbd: chapter 1",
        image: "https://cdn.prod.website-files.com/67483fb596664fd411a9d07f/68caa6ce541744ec81a36b35_07---J1_Cover.avif",
        description: "As the city's fortunes have evolved, so too has the skyline. And we look back through time from then to now."
      },
      {
        type: "people",
        title: "celebrating women 24/7/365",
        image: "https://cdn.prod.website-files.com/67483fb596664fd411a9d07f/689d9875379e930c3fb7d022_diversity.avif",
        description: "The history of the commemoration of Women's Day is a vital reminder of how important women's voices are in driving change."
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

    // const lenis = new Lenis({
    //   duration: 1.2,
    //   easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    //   smoothWheel: true,
    //   smoothTouch: false,
    //   wheelMultiplier: 1,
    //   touchMultiplier: 2,
    //   infinite: false,
    // });

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

    // const updateWeSection = () => {
    //   const weSection = document.querySelector('.we_section');
    //   const weScroll = document.querySelector('.we_scroll') as HTMLElement;
    //   const weItems = document.querySelectorAll('.we_item');

    //   if (weSection && weScroll && weItems.length > 0) {
    //     weItems.forEach((item, idx) => {
    //       const itemEl = item as HTMLElement;
    //       const firstItemEl = weItems[0] as HTMLElement;
    //       const distance = itemEl.offsetTop - firstItemEl.offsetTop;

    //       // Find and kill existing triggers for this item to avoid duplicates
    //       ScrollTrigger.getAll().forEach(t => {
    //         if (t.vars.trigger === itemEl && (t.vars as any).id === `we-trigger-${idx}`) {
    //           t.kill();
    //         }
    //       });

    //       ScrollTrigger.create({
    //         id: `we-trigger-${idx}`,
    //         trigger: itemEl,
    // start: "top 45%",
    // end: "bottom 45%",
    //         scrub: 1.5,
    //         onEnter: () => {
    //           gsap.to(weScroll, { y: distance, duration: 0.4, ease: "power2.inOut" });
    //         },
    //         onEnterBack: () => {
    //           gsap.to(weScroll, { y: distance, duration: 0.4, ease: "power2.inOut" });
    //         }
    //       });
    //     });
    //   }
    // };

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

        const totalDistance =
          (weItems[weItems.length - 1] as HTMLElement).offsetTop -
          (weItems[0] as HTMLElement).offsetTop;

        gsap.to(weScroll, {
          y: totalDistance,
          ease: "none",
          scrollTrigger: {
            id: "we-trigger-main",
            trigger: ".we_section",
            start: "top 75%",
            end: () => "+=" + (document.querySelector('.we_section') as HTMLElement).offsetHeight,
            scrub: 1.5,
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

    const journalCards = document.querySelectorAll('.journal-card');
    journalCards.forEach((card) => {
      const imageWrapper = card.querySelector('.journal-image-wrapper');
      const img = card.querySelector('img');
      const content = card.querySelector('.journal-content'); // We will add this class to the text wrapper

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
        }
      });

      if (imageWrapper && img) {
        tl.fromTo(imageWrapper,
          { clipPath: 'inset(100% 0% 0% 0%)' },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.2,
            ease: "power3.inOut"
          }
        )
          .fromTo(img,
            { scale: 1.3 },
            { scale: 1, duration: 1.2, ease: "power3.out" },
            "<"
          );
      }

      if (content) {
        tl.fromTo(content,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out"
          },
        );
      }
    });

    const imageWrappers = document.querySelectorAll('.story_image_wrapper'); // Removed .journal-image-wrapper to prevent double animation
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

    const featuredProjectItems = document.querySelectorAll('.featured-project-item img');
    featuredProjectItems.forEach((img) => {
      gsap.to(img, {
        y: -100,
        ease: "none",
        scrollTrigger: {
          trigger: img,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        }
      });
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





  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

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

  return (
    <div className={`dhk-website`}>
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
      <section className="hero-section">
        <div className="hero-slider-container">
          <div className="hero-column" ref={col1Ref}>
            <div className="hero-slide"><img src={heroImages[0]} alt="p1" /></div>
            <div className="hero-slide"><img src={heroImages[1]} alt="p2" /></div>
          </div>
          <div className="hero-column" ref={col2Ref}>
            <div className="hero-slide"><img src={heroImages[1]} alt="p2" /></div>
            <div className="hero-slide"><img src={heroImages[2]} alt="p3" /></div>
          </div>
          <div className="hero-column" ref={col3Ref}>
            <div className="hero-slide"><img src={heroImages[2]} alt="p3" /></div>
            <div className="hero-slide"><img src={heroImages[0]} alt="p1" /></div>
          </div>
        </div>
        <div className="hero-content">
          <div className="header-left" style={{ color: '#fff' }}>
            <span className="hero-title-large">welcome to dhk</span>
          </div>
          <div style={{ fontSize: '0.8rem', opacity: 0.8, fontWeight: 700 }}>
            architects, urban designers, interior designers →
          </div>
        </div>
      </section>

      <header className="main-header" style={{ mixBlendMode: isMenuOpen ? 'difference' : 'normal' }}>
        <div className="header-left">
          <a href="/" className="header-logo" style={{ color: isMenuOpen ? '#fff' : 'inherit' }}>
            <span className="home-dot"></span> home
          </a>
        </div>
        <div className="header-center">
          <nav className="header-nav">
            <a href="#projects" className="nav-link">projects,</a>
            <a href="#studio" className="nav-link">studio,</a>
            <a href="#journal" className="nav-link">journal,</a>
            <a href="#careers" className="nav-link">careers ↗</a>
          </nav>
        </div>
        <div className="header-right">
          <button className="theme-toggle" onClick={toggleDarkMode}>
            <span className={isDarkMode ? 'active' : ''}>dark</span>
            <span className="separator"> / </span>
            <span className={!isDarkMode ? 'active' : ''}>light</span>
          </button>
          <button className="menu-toggle" onClick={toggleMenu}>
            menu
          </button>
        </div>
      </header>

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
            />
          </div>
        </div >
      </section >

      <section className="story_section">
        <div className="story_grid">
          <div className="story_image_wrapper reveal-on-scroll">
            <img
              src="https://cdn.prod.website-files.com/6746d4e7508fcde5d1dbac6c/691301e20d8074332e2f77bd_01---H2_OurStory.jpg"
              alt="Our Story"
            />
          </div>
          <div className="story_label reveal-on-scroll">[&nbsp;&nbsp;&nbsp;our story&nbsp;&nbsp;&nbsp;]</div>
          <div className="story_content reveal-on-scroll">
            <p>dhk Architects was established in 1998 in a merger between Derick Henstra Architects and KCvR Architects. Today, we’re one of the largest and leading architectural studios in Africa. Since then, we’ve delivered award-winning buildings, urban designs and interior spaces in South Africa, across the continent and beyond. We have studios in Cape Town and Johannesburg and deliver for clients all over the world.</p>
            <p>Our team of over 140 people comprises multidisciplinary design professionals and technologists, supported by experienced and talented BIM experts, architectural visualisers, graphic designers, communication specialists, administrators, HR and finance specialists. We also work collaboratively with experts in other disciplines at all stages of our projects, from design concept to practical completion.</p>
          </div>
        </div>
      </section>

      <section id="projects" className="featured-projects">
        <div className="projects-title-grid">
          <div className="featured-projects-title reveal-on-scroll">featured projects</div>
        </div>
        {featuredProjects.map((project, idx) => (
          <div key={idx} className="featured-project-item">
            <img src={project.image} alt={project.name} />
            <div className="project-overlay-title">{project.name}</div>
          </div>
        ))}

        <div className="projects-footer-grid">
          <div className="footer-project-box box-1 reveal-on-scroll">
            <img
              src="https://cdn.prod.website-files.com/67483fb596664fd411a9d07f/69157f48231611da536066e8_00---ProjectCover.jpg"
              alt="City Park at 111 Bree Street"
            />
            <div className="footer-project-info">
              <span>City Park at 111 Bree Street</span>
              <span>2026</span>
            </div>
          </div>
          <div className="footer-project-box box-2 reveal-on-scroll">
            <img
              src="https://cdn.prod.website-files.com/67483fb596664fd411a9d07f/67b20989c1f60844f1d0b422_seafront.avif"
              alt="Seafront Estate"
            />
            <div className="footer-project-info">
              <span>Seafront Estate</span>
              <span>2026</span>
            </div>
          </div>
          <div className="footer-project-box box-3 reveal-on-scroll">
            <a href="#projects" className="view-all-projects">[&nbsp;&nbsp;&nbsp;view all projects&nbsp;&nbsp;&nbsp;]</a>
          </div>
        </div>
      </section>

      <section id="studio">
        <div className="studio-hero-grid">
          <div className="studio-hero-box box-black"></div>
          <div className="studio-hero-box reveal-on-scroll">
            <img
              src="https://cdn.prod.website-files.com/67483fb596664fd411a9d07f/67b205a1c905ac76003fd88b_drostdy.avif"
              alt="Studio Workspace"
            />
          </div>
          <div className="studio-hero-box reveal-on-scroll">
            <img
              src="https://cdn.prod.website-files.com/67483fb596664fd411a9d07f/67bc85cdbd612b2d12ceeaf1_signature_2.avif"
              alt="Studio Architecture"
            />
          </div>
        </div>
      </section>

      <section className="container awards-section">
        <div className="awards-title reveal-on-scroll">awards</div>

        <div className="awards-reveal-container">
          {hoveredAwardIndex !== null && awards[hoveredAwardIndex].logo && (
            <div className="awards-logo-reveal">
              <img src={awards[hoveredAwardIndex].logo} alt="award logo" />
            </div>
          )}
        </div>

        <div className="awards-list">
          {awards.map((award, idx) => (
            <div
              key={idx}
              className={`award-row reveal-on-scroll ${hoveredAwardIndex === idx ? 'active' : ''}`}
              onMouseEnter={() => setHoveredAwardIndex(idx)}
              onMouseLeave={() => setHoveredAwardIndex(null)}
            >
              <div className="award-year">{award.year}</div>
              <div className="award-project-info">
                <div className="award-project">{award.project}</div>
                {hoveredAwardIndex === idx && award.subtext && (
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
            <div key={idx} className="journal-card">
              <div className="journal-image-wrapper">
                <img src={item.image} alt={item.title} />
                <div className="journal-view-article">[ view article ]</div>
              </div>
              <div className="journal-content">
                <div className="journal-meta">
                  <span className="journal-tag">{item.type}</span>
                  <h3 className="journal-card-title">{item.title}</h3>
                </div>
              </div>
              <div className="journal-card-description">{item.description}</div>
            </div>
          ))}
          <div className="journal-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <button className="load-more-btn" style={{ fontSize: '1.2rem' }}>[ view more ]</button>
          </div>
        </div>
      </section>
      <footer className="bg-black text-white px-8 md:px-8 pt-20 md:pt-48 pb-10 mt-20 md:mt-20" style={{ marginTop: "100px", paddingBottom: "20px" }}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-1.5 items-start md:items-end">
          <div className="order-last md:order-first col-span-1 md:col-span-3 flex flex-col md:flex-row gap-4 text-sm md:text-base font-medium leading-snug items-start md:items-center opacity-50 md:opacity-100">
            <div className="lowercase">all rights reserved. dhk@2025</div>
            <a href="#" className="lowercase transition-opacity duration-300 hover:opacity-60">
              POPI + PAIA
            </a>
          </div>

          <div className="col-span-1 md:col-span-9 flex flex-wrap md:flex-row justify-between md:justify-end gap-y-10 gap-x-4 md:gap-16 w-full">
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
                className="w-full bg-transparent border-b border-white/15 pb-2.5 text-white text-base font-bold lowercase outline-none focus:border-white/40 placeholder:text-white/40"
              />
              <input
                type="email"
                placeholder="email address"
                className="w-full bg-transparent border-b border-white/15 pb-2.5 text-white text-base font-bold lowercase outline-none focus:border-white/40 placeholder:text-white/40"
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
      </footer >
    </div >
  );
};

export default HomePage;



