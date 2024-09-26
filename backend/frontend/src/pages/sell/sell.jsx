import React, { useEffect } from 'react';
import img1 from '../../assets/images/landing.jpg';
import img2 from '../../assets/images/landing2.jpg';
import img3 from '../../assets/images/lux.jpeg';
import img4 from '../../assets/images/hom.jpeg';
import { useLocation, useNavigate } from 'react-router-dom';
import useUser from '../../zustand/useUser';
// import Footer from '../component/Footer';

const SellYourHomePage = () => {
    const { pathname } = useLocation();
    const { user, isEng } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    const handleRoute = () => {
        if (user) {
            navigate("/addadress");
        } else {
            navigate("/signupSell");
        }
    };

    return (
        <div className="bg-gray-100">
            {/* Hero Section */}
            <section className="relative md:h-screen h-[60vh]">
                <img src={img1} alt="Hero Background" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="relative flex items-center justify-center h-full text-center text-white">
                    <div className="p-8">
                        <h1 className="text-4xl md:text-6xl font-bold mb-4">{isEng ? 'Sell Your Home with Gojo Real Estate' : 'ቤትዎን በጎጆ ሪል እስቴት ይሽጡ'}</h1>
                        <p className="text-xl mb-6">{isEng ? 'Discover why working with us makes selling your home effortless and rewarding.' : 'ለምን ከኛ ጋር መስራት ቤትዎን መሸጥ ብዙ ድካም እና ጠቃሚ እንደሚያደርገው ይወቁ።'}</p>
                        <button
                            onClick={handleRoute}
                            className="bg-yellow-500 text-black px-6 py-3 rounded-full text-lg font-semibold hover:bg-yellow-400 transition">
                            {isEng ? 'Get Started' : 'እንጀምር'}
                        </button>
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="py-16 px-8 bg-white">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-8">{isEng ? 'Why Selling Your Home with Us is the Best Choice' : 'ለምን ቤትዎን ከኛ ጋር መሸጥ በጣም የጥሩ እርምጃ ነው'}</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-gray-50 p-6 rounded-lg shadow-lg">
                            <img src={img2} alt="Personalized Service" className="w-full h-48 object-cover rounded-t-lg" />
                            <h3 className="text-xl font-semibold mt-4">{isEng ? 'Personalized Service' : 'የግለሰቦች አገልግሎት'}</h3>
                            <p className="mt-2">{isEng ? 'We provide a tailored approach to meet your unique needs and goals.' : 'የእርስዎን የበለጠ ገቢ እና እይታ ለማግኘት የተከበሩ እና ወይን ያለውን የማስረጃ ስርአት እንስጣለን።'}</p>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-lg shadow-lg">
                            <img src={img3} alt="Market Expertise" className="w-full h-48 object-cover rounded-t-lg" />
                            <h3 className="text-xl font-semibold mt-4">{isEng ? 'Market Expertise' : 'የገበያ ብቃት'}</h3>
                            <p className="mt-2">{isEng ? 'Leverage our deep knowledge of the local market to get the best price for your home.' : 'የአካባቢውን ዕውቀት ተጠቀም ለቤትዎ ምርጥ ዋጋ ለማግኘት።'}</p>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-lg shadow-lg">
                            <img src={img4} alt="Professional Network" className="w-full h-48 object-cover rounded-t-lg" />
                            <h3 className="text-xl font-semibold mt-4">{isEng ? 'Professional Network' : 'የሙያ መስመር'}</h3>
                            <p className="mt-2">{isEng ? 'Access our extensive network of potential buyers and real estate professionals.' : 'የሚመጡ ገቢያ ገበያ ወይን አደራ መስመር ይቀበሉ።'}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How to Sell Your Home Section */}
            <section className="py-16 px-8 bg-gray-200">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-8">{isEng ? 'Your Step-by-Step Guide to Selling Your Home' : 'የቤትዎን መሸጥ እርምጃ በድረስ መመሪያ'}</h2>
                    <div className="space-y-8">
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <h3 className="text-xl font-semibold">1. የቤትዎን ዝግጅት</h3>
                            <p className="mt-2">{isEng ? 'Clean, declutter, and stage your home to make it appealing to buyers.' : 'አንዳንድ ይቀርባብ ወይን አሳሳ ዝግጅት ይደረግ።'}</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <h3 className="text-xl font-semibold">2. የቤትዎን ፎቶ ይወርዳችሁ</h3>
                            <p className="mt-2">{isEng ? 'Take high-quality photographs of your home, focusing on its best features and lighting to make it attractive to potential buyers.' : 'በሚልክ ዝግጁ እንዲቆሞች የቤትዎን ዝምድነ ፎቶዎች ይወርዳችሁ።'}</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <h3 className="text-xl font-semibold">3. የቤትዎን ገበያ ይገለጽ</h3>
                            <p className="mt-2">{isEng ? 'Use the photographs and create compelling listings with detailed descriptions to attract buyers.' : 'ተደጋጋሚ ብቸኛ ማወቅ እንዲሳርዎች እንዲቆም ወይን የእንደሆነ ዝምድነ ይገለጹ።'}</p>
                        </div>
                    </div>
                </div>
            </section>


        </div>
    );
};

export default SellYourHomePage;
