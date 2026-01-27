'use client'

import React, { useState, useEffect } from 'react'


export const Award = () => {
    const [windowWidth, setWindowWidth] = useState(0);
    const [hoveredAwardIndex, setHoveredAwardIndex] = useState<number | null>(null);
    const [awardTop, setAwardTop] = useState(0);


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


    useEffect(() => {
        setWindowWidth(window.innerWidth);
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>
            <section className="container awards-section">
                <div className="awards-title reveal-on-scroll">awards</div>
                <div className="awards-reveal-container hidden md:block">
                    {hoveredAwardIndex !== null && awards[hoveredAwardIndex]?.logo && (
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
                            <img src={awards[hoveredAwardIndex]?.logo} alt="award logo" />
                        </div>
                    )}
                </div>
                <div className="awards-list">
                    {awards?.map((award, idx) => {
                        const showYear = idx === 0 || awards[idx - 1]?.year !== award.year;
                        const isActive = hoveredAwardIndex === idx;

                        return (
                            <React.Fragment key={idx}>
                                {windowWidth <= 768 && showYear && (
                                    <div className="w-full text-white font-bold text-lg mb-2 mt-8 pb-1 reveal-on-scroll">
                                        {award.year}
                                    </div>
                                )}
                                <div
                                    className={`award-row reveal-on-scroll ${isActive ? 'active' : ''}`}
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
                                            setHoveredAwardIndex(isActive ? null : idx);
                                        }
                                    }}
                                >
                                    <div className="award-year hidden md:block">{award.year}</div>
                                    <div className="award-project-info w-full">
                                        <div className="flex justify-between items-start w-full">
                                            <div className="award-project">{award.project}</div>
                                            <div className="md:hidden pl-4 font-mono text-sm opacity-50 shrink-0">
                                                {isActive ? '[ - ]' : '[ + ]'}
                                            </div>
                                        </div>
                                        {isActive && award.subtext && (
                                            <div className="award-subtext">{award.subtext}</div> 
                                        )}
                                    </div>
                                    <div className="award-category hidden md:block">{award.category}</div>
                                </div>
                            </React.Fragment>
                        );
                    })}
                    <button className="load-more-btn mt-12 md:mt-20">[ load more ]</button>
                </div>
            </section>
        </>
    )
}
