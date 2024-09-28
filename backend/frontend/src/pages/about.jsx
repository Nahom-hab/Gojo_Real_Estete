import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useUser from '../zustand/useUser';

const About = () => {
    const { pathname } = useLocation();
    const { isEng } = useUser()

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <div className="p-10 dark:text-white dark:bg-gray-800 mx-auto pt-5">
            <section className="text-center py-12">
                <h1 className="text-4xl mb-4 animate__animated animate__fadeIn animate__delay-1s">
                    {isEng ? 'Welcome to RealEstate Finder' : 'ወደ እውነተኛ እና የሚገኝ ቤት መርሃ ግብር ይቀበሉ'}
                </h1>
                <p className="text-xl dark:text-gray-300 text-gray-700 animate__animated animate__fadeIn animate__delay-2s">
                    {isEng
                        ? 'Your trusted partner in navigating the real estate market, dedicated to making your journey seamless and rewarding. With a commitment to excellence and a focus on your unique needs, we\'re here to help you find your dream property.'
                        : 'የእቅፍ ገጽታ የሚስትእር የሆኑ ነው፣ በዚህ ዓለም የሚኖሩ የገንዘብ ገጽታን ለእናንተ በመርሃ ግብር ይቀበሉ፡፡'}
                </p>
            </section>

            <section className="my-10 px-6">
                <h2 className="text-4xl border-b-2 dark:border-gray-600 dark:bg-gray-900 border-gray-300 pb-2 mb-4 animate__animated animate__fadeIn animate__delay-1s">
                    {isEng ? 'Our Story' : 'የእኛ ታሪክ'}
                </h2>
                <p className="mb-4 animate__animated animate__fadeIn animate__delay-2s">
                    {isEng
                        ? 'Founded in 2010, RealEstate Finder has consistently aimed to redefine the real estate experience. Our journey has been marked by the success of our clients and our unwavering dedication to providing personalized service.'
                        : 'በ2010 ተመሥርቷል፣ የእውነተኛ ማህበር የነበረውን ልምድ እንዲያስተዋውቀው ካለው ወቅት ጀምሮ የታዋቂ ጋዜጣ ነው። ይህ ጉዞ የእኛ ዋስትና ወይም አቅም ይታወቃል።'}
                </p>
                <p className="mb-4 animate__animated animate__fadeIn animate__delay-3s">
                    {isEng
                        ? 'Our experienced team is dedicated to ensuring you receive the highest level of service, whether you\'re looking to buy, sell, or invest.'
                        : 'የእኛ ተሞክሮ የሚያነሱ የእንዲህ ያለው የሚሸጡ ዝርዝሮችን ለማግኘት ይህ የሚይዙ ይህ የሚሸጡ ዝርዝሮችን ለማግኘት ይወዳል።'}
                </p>
            </section>

            <section className="my-10 px-6">
                <h2 className="text-4xl border-b-2 dark:border-gray-600 dark:bg-gray-900 border-gray-300 pb-2 mb-4 animate__animated animate__fadeIn animate__delay-1s">
                    {isEng ? 'Our Values' : 'የእኛ እሴቶች'}
                </h2>
                <div className="flex flex-wrap gap-6">
                    {[{ en: 'Integrity', am: 'እምነት' }, { en: 'Excellence', am: 'እርምጃ' }, { en: 'Customer Focus', am: 'የደንበኛ ትኩረት' }, { en: 'Innovation', am: 'አዳዲስነት' }].map((value, index) => (
                        <div key={index} className="flex-1 min-w-[220px] dark:border-gray-600 dark:bg-gray-900 bg-gray-300 p-5 rounded-lg transition-transform duration-300 transform hover:scale-105 animate__animated animate__fadeIn animate__delay-2s">
                            <h3 className="text-2xl mb-2">{isEng ? value.en : value.am}</h3>
                            <p className="dark:text-gray-300 text-gray-600">
                                {isEng
                                    ? 'We believe in maintaining the highest ethical standards in all our interactions.'
                                    : 'በእንደዚህ የሚኖሩበት የሚሆኑ ትክክለኛ የሚሆኑ አስተያየት እንደሌለ አላቀበውም።'}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="my-10 px-6 text-center">
                <h2 className="text-4xl border-b-2 dark:border-gray-600 dark:bg-gray-900 border-gray-300 pb-2 mb-4 animate__animated animate__fadeIn animate__delay-1s">
                    {isEng ? 'Meet the Team' : 'ቡድን ይዞታ'}
                </h2>
                <div className="flex flex-wrap justify-center">
                    {[
                        { name: "John Doe", role: "Founder & CEO", img: "https://via.placeholder.com/200", description: "With over 15 years in the industry, John has a passion for helping clients find their perfect home." },
                        { name: "Jane Smith", role: "Chief Officer", img: "https://via.placeholder.com/200", description: "Jane ensures that our operations run smoothly, making the real estate process effortless for our clients." },
                    ].map((member, index) => (
                        <div key={index} className="flex-1 max-w-[200px] mx-3 pb-3 rounded-lg dark:bg-gray-900 border-gray-300 mb-6 animate__animated animate__fadeIn animate__delay-2s">
                            <img src={member.img} alt={member.name} className="w-full h-48 object-cover rounded-lg mb-2" />
                            <h3 className="text-lg">{member.name}</h3>
                            <p>{member.role}</p>
                            <p className="text-[12px] dark:text-gray-300 text-gray-600">{member.description}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default About;