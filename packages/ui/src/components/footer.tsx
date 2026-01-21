'use client'

import React from 'react';

export const Footer = () => {
    return (
        <>
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
        </>
    );
};

