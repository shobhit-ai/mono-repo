"use client";

import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";

export const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const newMode = !prev;
      if (newMode) {
        document.documentElement.classList.add("dark-mode");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark-mode");
        localStorage.setItem("theme", "light");
      }
      return newMode;
    });
  };

  const toggleMenu = () => {
    if (!menuRef.current || gsap.isTweening(menuRef.current)) return;

    const menu = menuRef.current;

    if (!isMenuOpen) {
      setIsMenuOpen(true);

      gsap.to(menu, {
        clipPath: "circle(150% at 100% 0%)",
        duration: 0.9,
        ease: "power3.inOut",
        onStart: () => {
          menu.style.visibility = "visible";
          menu.style.pointerEvents = "auto";
          menu.style.zIndex = "9999";
          document.body.style.overflow = "hidden";
        },
      });
    } else {
      setIsMenuOpen(false);

      gsap.to(menu, {
        clipPath: "circle(0% at 100% 0%)",
        duration: 0.9,
        ease: "power3.inOut",
        onComplete: () => {
          menu.style.visibility = "hidden";
          menu.style.pointerEvents = "none";
          menu.style.zIndex = "auto";
          document.body.style.overflow = "auto";
        },
      });
    }
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'light') {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark-mode');
    }
  }, []);

  useEffect(() => {
    if (!menuRef.current) return;

    gsap.set(menuRef.current, {
      clipPath: "circle(0% at 100% 0%)",
      visibility: "hidden",
      pointerEvents: "none",
    });

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <>
      <div
        ref={menuRef}
        className="full-screen-menu fixed inset-0 bg-black text-white"
      >
        <button
          onClick={toggleMenu}
          className="fixed top-4 right-4 z-[10000] text-lg font-bold md:hidden"
        >
          close
        </button>

        <div className="menu-container h-full flex flex-col justify-between py-10 px-6">
          <nav className="menu-nav flex flex-col gap-2 justify-center flex-grow pl-6 md:pl-0">
            <a href="/" onClick={toggleMenu} className="menu-nav-link">
              home,
            </a>
            <a href="#projects" onClick={toggleMenu} className="menu-nav-link">
              projects,
            </a>
            <a href="#studio" onClick={toggleMenu} className="menu-nav-link">
              studio,
            </a>
            <a
              href="#journal"
              onClick={toggleMenu}
              className="menu-nav-link mt-6"
            >
              journal
            </a>
            <a
              href="#"
              className="pl-2 mt-6 text-xl md:text-2xl font-bold lowercase hover:opacity-60 transition-opacity"
            >
              [ contact us ]
            </a>
          </nav>

          <div className="menu-footer w-full mt-auto">
            <div className="flex justify-between items-center mb-8">
              <a
                href="#careers"
                onClick={toggleMenu}
                className="text-sm md:text-base font-bold lowercase hover:opacity-60"
              >
                careers ↗
              </a>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div className="flex flex-col gap-3 max-w-[200px]">
                <h4 className="text-sm font-bold lowercase">newsletter</h4>
                <input
                  type="text"
                  placeholder="full name"
                  className="bg-transparent border-b border-white/20 pb-2 text-sm font-bold lowercase outline-none placeholder:text-white/30"
                />
                <input
                  type="email"
                  placeholder="email address"
                  className="bg-transparent border-b border-white/20 pb-2 text-sm font-bold lowercase outline-none placeholder:text-white/30"
                />
                <button className="text-left text-sm font-bold lowercase hover:opacity-60">
                  [ subscribe ]
                </button>
              </div>

              <div className="flex flex-col gap-1 items-end text-right">
                <a className="text-sm font-bold lowercase hover:opacity-60">
                  linkedin
                </a>
                <a className="text-sm font-bold lowercase hover:opacity-60">
                  instagram
                </a>
                <a className="text-sm font-bold lowercase hover:opacity-60">
                  facebook
                </a>
                <a className="text-sm font-bold lowercase hover:opacity-60">
                  pinterest
                </a>
                <a className="text-sm font-bold lowercase hover:opacity-60">
                  vimeo
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {!isMenuOpen && (
        <div className="main-header fixed bottom-0 left-0 w-full z-40 md:sticky md:top-0">
          <div className="header-left">
            <a href="/" className="header-logo">
              <span className="home-dot" /> home
            </a>
          </div>

          <div className="header-center hidden md:flex">
            <nav className="header-nav">
              <a href="#projects" className="nav-link">
                projects,
              </a>
              <a href="#studio" className="nav-link">
                studio,
              </a>
              <a href="#journal" className="nav-link">
                journal,
              </a>
              <a href="#careers" className="nav-link">
                careers ↗
              </a>
            </nav>
          </div>

          <div className="header-right">
            <button
              className="theme-toggle hidden md:flex"
              onClick={toggleDarkMode}
            >
              <span className={isDarkMode ? "active" : ""}>dark</span>
              <span className="separator"> / </span>
              <span className={!isDarkMode ? "active" : ""}>light</span>
            </button>

            <button className="menu-toggle" onClick={toggleMenu}>
              menu
            </button>
          </div>
        </div>
      )}
    </>
  );
};




