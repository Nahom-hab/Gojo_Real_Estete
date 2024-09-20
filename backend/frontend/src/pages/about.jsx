import React from 'react';

const About = () => {
    return (
        <div className="max-w-6xl mx-auto p-5">
            <section className="text-center py-12">
                <h1 className="text-4xl mb-4 animate__animated animate__fadeIn animate__delay-1s">Welcome to RealEstate Finder</h1>
                <p className="text-xl text-gray-700 animate__animated animate__fadeIn animate__delay-2s">
                    Your trusted partner in navigating the real estate market, dedicated to making your journey seamless and rewarding.
                    With a commitment to excellence and a focus on your unique needs, we're here to help you find your dream property.
                </p>
            </section>

            <section className="my-10 px-6">
                <h2 className="text-4xl border-b-2 border-gray-300 pb-2 mb-4 animate__animated animate__fadeIn animate__delay-1s">Our Story</h2>
                <p className="mb-4 animate__animated animate__fadeIn animate__delay-2s">
                    Founded in 2010, RealEstate Finder has consistently aimed to redefine the real estate experience.
                    Our journey has been marked by the success of our clients and our unwavering dedication to providing personalized service.
                </p>
                <p className="mb-4 animate__animated animate__fadeIn animate__delay-3s">
                    Our experienced team is dedicated to ensuring you receive the highest level of service, whether you're looking to buy, sell, or invest.
                </p>
            </section>

            <section className="my-10 px-6">
                <h2 className="text-4xl border-b-2 border-gray-300 pb-2 mb-4 animate__animated animate__fadeIn animate__delay-1s">Our Values</h2>
                <div className="flex flex-wrap gap-6">
                    {['Integrity', 'Excellence', 'Customer Focus', 'Innovation'].map((value, index) => (
                        <div key={index} className="flex-1 min-w-[220px] bg-gray-300 p-5 rounded-lg transition-transform duration-300 transform hover:scale-105 animate__animated animate__fadeIn animate__delay-2s">
                            <h3 className="text-2xl mb-2">{value}</h3>
                            <p className="text-gray-600">We believe in maintaining the highest ethical standards in all our interactions.</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="my-10 px-6 text-center">
                <h2 className="text-4xl border-b-2 border-gray-300 pb-2 mb-4 animate__animated animate__fadeIn animate__delay-1s">Meet the Team</h2>
                <div className="flex flex-wrap justify-center">
                    {[
                        { name: "John Doe", role: "Founder & CEO", img: "https://via.placeholder.com/200", description: "With over 15 years in the industry, John has a passion for helping clients find their perfect home." },
                        { name: "Jane Smith", role: "Chief Officer", img: "https://via.placeholder.com/200", description: "Jane ensures that our operations run smoothly, making the real estate process effortless for our clients." },
                    ].map((member, index) => (
                        <div key={index} className="flex-1 max-w-[200px] mx-3 mb-6 animate__animated animate__fadeIn animate__delay-2s">
                            <img src={member.img} alt={member.name} className="w-full h-48 object-cover rounded-lg mb-2" />
                            <h3 className="text-lg">{member.name}</h3>
                            <p>{member.role}</p>
                            <p className="text-[12px] text-gray-600">{member.description}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default About;
