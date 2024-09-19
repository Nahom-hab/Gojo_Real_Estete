import React from 'react';

const About = () => {
    return (
        <div className="max-w-6xl mx-auto p-5">
            <section className="text-center py-12">
                <h1 className="text-4xl mb-4">About Us</h1>
                <p className="text-xl text-gray-700">
                    Welcome to RealEstate Finder, where your real estate journey becomes a smooth and successful experience. Established with a vision to transform the real estate landscape, we pride ourselves on offering personalized and professional services tailored to your unique needs. Our commitment is to guide you through every step of buying, selling, or investing in real estate with expertise, integrity, and dedication.
                </p>
            </section>
            <section className="my-10 px-6">
                <h2 className="text-4xl border-b-2 border-gray-300 pb-2 mb-4">Our Story</h2>
                <p className="mb-4">
                    Founded in 2010, RealEstate Finder started with a mission to revolutionize the real estate industry. What began as a small local agency has now evolved into a prominent real estate firm known for its exceptional service and innovative approach. Over the years, we have built a reputation for our commitment to transparency, customer satisfaction, and market expertise. Our journey has been marked by countless success stories, happy clients, and a relentless drive to exceed expectations.
                </p>
                <p className="mb-4">
                    Our team of dedicated professionals brings a wealth of experience and knowledge to every transaction, ensuring that our clients receive the highest level of service. Whether you're looking to buy your dream home, sell a property, or invest in real estate, we are here to provide the guidance and support you need to achieve your goals.
                </p>
                <p>
                    At RealEstate Finder, our mission is to make the real estate process as smooth and stress-free as possible. We aim to deliver exceptional results by leveraging our deep market knowledge, personalized service, and cutting-edge technology. Our goal is to build lasting relationships with our clients based on trust, integrity, and mutual success.
                </p>
            </section>
            <section className="my-10 px-6">
                <h2 className="text-4xl border-b-2 border-gray-300 pb-2 mb-4">Our Values</h2>
                <div className="flex flex-wrap gap-6">
                    <div className="flex-1 min-w-[220px] bg-gray-300 p-5 rounded-lg">
                        <h3 className="text-2xl mb-2">Integrity</h3>
                        <p className="text-gray-600">We conduct our business with honesty and transparency, always prioritizing our clients' best interests.</p>
                    </div>
                    <div className="flex-1 min-w-[220px] bg-gray-300 p-5 rounded-lg">
                        <h3 className="text-2xl mb-2">Excellence</h3>
                        <p className="text-gray-600">We are committed to delivering high-quality service and surpassing expectations in every transaction.</p>
                    </div>
                    <div className="flex-1 min-w-[220px] bg-gray-300 p-5 rounded-lg">
                        <h3 className="text-2xl mb-2">Customer Focus</h3>
                        <p className="text-gray-600">Our clients are central to everything we do. We listen, understand, and tailor our services to meet their needs.</p>
                    </div>
                    <div className="flex-1 min-w-[220px] bg-gray-300 p-5 rounded-lg">
                        <h3 className="text-2xl mb-2">Innovation</h3>
                        <p className="text-gray-600">We embrace new technologies and ideas to enhance our services and stay ahead in the ever-evolving real estate market.</p>
                    </div>
                </div>
            </section>
            <section className="my-10 px-6 text-center">
                <h2 className="text-4xl border-b-2 border-gray-300 pb-2 mb-4">Meet the Team</h2>
                <div className="flex flex-wrap justify-center">
                    <div className="flex-1 max-w-[200px] mx-3 mb-6">
                        <img src="https://img.freepik.com/premium-photo/face-young-confident-software-developer-diversity-programmer_236854-37226.jpg" alt="John Doe" className="w-full h-48 object-cover rounded-lg mb-2" />
                        <h3 className="text-lg">John Doe</h3>
                        <p>Founder & CEO</p>
                        <p className="text-gray-600">With over 20 years in the real estate industry, John has a wealth of experience in both residential and commercial properties. His leadership and vision have been instrumental in shaping the company's success.</p>
                    </div>
                    <div className="flex-1 max-w-[200px] mx-3 mb-6">
                        <img src="https://t4.ftcdn.net/jpg/03/69/19/81/360_F_369198116_K0sFy2gRTo1lmIf5jVGeQmaIEibjC3NN.jpg" alt="Jane Smith" className="w-full h-48 object-cover rounded-lg mb-2" />
                        <h3 className="text-lg">Jane Smith</h3>
                        <p>Chief Operating Officer</p>
                        <p className="text-gray-600">Jane oversees the day-to-day operations of the business, ensuring that all processes run smoothly and efficiently. Her expertise in operations management helps drive the company's growth and success.</p>
                    </div>
                    <div className="flex-1 max-w-[200px] mx-3 mb-6">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBLCcv9zQgU6t-0QVR507J1H-WgyFaf7s9qw&s" alt="Michael Johnson" className="w-full h-48 object-cover rounded-lg mb-2" />
                        <h3 className="text-lg">Michael Johnson</h3>
                        <p>Lead Real Estate Agent</p>
                        <p className="text-gray-600">Michael is a seasoned real estate agent with a keen eye for market trends and a deep understanding of client needs. His dedication and client-centric approach make him a valuable asset to the team.</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;