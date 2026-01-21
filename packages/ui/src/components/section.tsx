import React from 'react'

export const Section = () => {
    return (
        <div>
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
        </div>
    )
}
