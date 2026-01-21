"use client";

import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';

export const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark-mode');
  };

  const toggleMenu = () => {
    if (!menuRef.current) return;

    const menu = menuRef.current;

    if (!isMenuOpen) {
      setIsMenuOpen(true);

      gsap.to(menu, {
        clipPath: 'circle(150% at 100% 0%)',
        duration: 0.9,
        ease: 'power3.inOut',
        onStart: () => {
          menu.style.pointerEvents = 'auto';
          menu.style.zIndex = '9999'; 
          document.body.style.overflow = 'hidden';
        },
      });
    } else {
      setIsMenuOpen(false);

      gsap.to(menu, {
        clipPath: 'circle(0% at 100% 0%)',
        duration: 0.9,
        ease: 'power3.inOut',
        onComplete: () => {
          menu.style.pointerEvents = 'none';
          menu.style.zIndex = 'auto';
          document.body.style.overflow = 'auto';
        },
      });
    }
  };

  useEffect(() => {
    if (!menuRef.current) return;

    gsap.set(menuRef.current, {
      clipPath: 'circle(0% at 100% 0%)',
      pointerEvents: 'none',
    });

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <>
      <div className="full-screen-menu" ref={menuRef}>
        <button 
          className="absolute top-6 right-6 text-white font-bold text-lg md:hidden z-50" 
          onClick={toggleMenu}
        >
          close
        </button>
        <div className="menu-container h-full flex flex-col justify-between py-8 md:py-12">
          <div className="flex flex-col justify-center flex-grow">
            <nav className="menu-nav flex flex-col gap-2">
              <a href="/" onClick={toggleMenu} className="menu-nav-link">home,</a>
              <a href="#projects" onClick={toggleMenu} className="menu-nav-link">projects,</a>
              <a href="#studio" onClick={toggleMenu} className="menu-nav-link">studio,</a>
              <a href="#journal" onClick={toggleMenu} className="menu-nav-link mt-6">
                journal
              </a>
              <a
                href="#"
                className="pl-2 mt-6 text-xl md:text-2xl font-bold lowercase text-white hover:opacity-60 transition-opacity"
              >
                [ contact us ]
              </a>
            </nav>
          </div>
          <div className="menu-footer w-full mt-auto">
            <div className="flex justify-between items-center w-full">
              <a
                href="#careers"
                onClick={toggleMenu}
                className="text-sm md:text-base font-bold lowercase hover:opacity-60"
              >
                careers ↗
              </a>
              <a
                href="#"
                className="text-sm md:text-base font-bold lowercase hover:opacity-60"
              >
                instagram
              </a>
            </div>
            <div className="grid grid-cols-2 gap-8 w-full">
              <div className="flex flex-col gap-3 w-full max-w-[200px]">
                <h4 className="text-sm font-bold lowercase mb-0">newsletter</h4>
                <input
                  type="text"
                  placeholder="full name"
                  className="w-full bg-transparent border-b border-white/20 pb-2 text-white text-sm font-bold lowercase outline-none focus:border-white/50 placeholder:text-white/30"
                />
                <input
                  type="email"
                  placeholder="email address"
                  className="w-full bg-transparent border-b border-white/20 pb-2 text-white text-sm font-bold lowercase outline-none focus:border-white/50 placeholder:text-white/30"
                />
                <button className="text-left text-sm font-bold lowercase hover:opacity-60 mt-1">
                  [ subscribe ]
                </button>
              </div>
              <div className="flex flex-col gap-1 items-end text-right">
                <a href="#" className="text-sm md:text-base font-bold lowercase hover:opacity-60">linkedin</a>
                <a href="#" className="text-sm md:text-base font-bold lowercase hover:opacity-60">facebook</a>
                <a href="#" className="text-sm md:text-base font-bold lowercase hover:opacity-60">pinterest</a>
                <a href="#" className="text-sm md:text-base font-bold lowercase hover:opacity-60">vimeo</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {!isMenuOpen && (
        <div
          className="main-header w-full z-40 absolute bottom-0 left-0 md:sticky md:top-0"
          style={{ mixBlendMode: 'normal' }}
        >
          <div className="header-left">
            <a href="/" className="header-logo" style={{ color: 'inherit' }}>
              <span className="home-dot"></span> home
            </a>
          </div>

          <div className="header-center hidden md:flex">
            <nav className="header-nav">
              <a href="#projects" className="nav-link">projects,</a>
              <a href="#studio" className="nav-link">studio,</a>
              <a href="#journal" className="nav-link">journal,</a>
              <a href="#careers" className="nav-link">careers ↗</a>
            </nav>
          </div>

          <div className="header-right">
            <button className="theme-toggle hidden md:flex" onClick={toggleDarkMode}>
              <span className={isDarkMode ? 'active' : ''}>dark</span>
              <span className="separator"> / </span>
              <span className={!isDarkMode ? 'active' : ''}>light</span>
            </button>
            <button
              className="menu-toggle"
              onClick={toggleMenu}
              disabled={gsap.isTweening(menuRef.current)}
            >
              menu
            </button>
          </div>
        </div>
      )}
    </>
  );
};



