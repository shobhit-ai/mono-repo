import React, { useState, useEffect } from 'react'

export const TopBanner = () => {

    const [isIntroDone, setIsIntroDone] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsIntroDone(true), 8000);
        return () => clearTimeout(timer);
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

    return (
        <>

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
        </>
    )
}
