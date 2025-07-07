import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Leaf, Users, Target, Heart } from "lucide-react";
import Chatbot from "../components/Chatbot";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { LanguageContext } from "../context/LanguageContext";

const Home = () => {
  const { language } = useContext(LanguageContext);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const content = {
    en: {
      heroTitle: "Building a Cleaner Future",
      heroDesc:
        "Join EcoWaste NGO in our mission to transform waste management and create sustainable communities through innovation and collaboration.",
      viewImpact: "View Our Impact",
      joinTeam: "Join Our Team",
      missionTitle: "Our Mission",
      missionDesc:
        "We're committed to revolutionizing waste management through technology, community engagement, and sustainable practices.",
      card1Title: "Environmental Protection",
      card1Desc:
        "Reducing environmental impact through efficient waste collection and recycling programs.",
      card2Title: "Community Engagement",
      card2Desc:
        "Building partnerships with local communities to promote sustainable waste management practices.",
      card3Title: "Innovation & Technology",
      card3Desc:
        "Leveraging cutting-edge technology to optimize waste collection routes and processes.",
      impactTitle: "Our Impact",
      tons: "Tons Collected",
      communities: "Communities Served",
      recycling: "Recycling Rate",
      volunteers: "Volunteers",
      detailedStats: "View Detailed Statistics",
      ctaTitle: "Ready to Make a Difference?",
      ctaDesc:
        "Join our team of dedicated workers and help us build a cleaner, more sustainable future for everyone.",
      getStarted: "Get Started Today",
    },
    hi: {
      heroTitle: "स्वच्छ भविष्य का निर्माण",
      heroDesc:
        "EcoWaste NGO के साथ जुड़ें और हमारे मिशन में सहयोग करें ताकि कचरा प्रबंधन में सुधार हो और टिकाऊ समुदाय बनाए जा सकें।",
      viewImpact: "हमारे प्रयास देखें",
      joinTeam: "हमारी टीम से जुड़ें",
      missionTitle: "हमारा मिशन",
      missionDesc:
        "हम प्रौद्योगिकी, सामुदायिक सहभागिता और टिकाऊ प्रथाओं के माध्यम से कचरा प्रबंधन में क्रांति लाने के लिए प्रतिबद्ध हैं।",
      card1Title: "पर्यावरण संरक्षण",
      card1Desc:
        "प्रभावी कचरा संग्रह और पुनर्चक्रण कार्यक्रमों के माध्यम से पर्यावरणीय प्रभाव को कम करना।",
      card2Title: "सामुदायिक सहभागिता",
      card2Desc:
        "स्थानीय समुदायों के साथ साझेदारी करके टिकाऊ कचरा प्रबंधन को बढ़ावा देना।",
      card3Title: "नवाचार और तकनीक",
      card3Desc:
        "कचरा संग्रह मार्गों और प्रक्रियाओं को अनुकूलित करने के लिए अत्याधुनिक तकनीक का उपयोग।",
      impactTitle: "हमारा प्रभाव",
      tons: "संग्रहित टन",
      communities: "सेवा प्राप्त समुदाय",
      recycling: "पुनर्चक्रण दर",
      volunteers: "स्वयंसेवक",
      detailedStats: "विस्तृत आंकड़े देखें",
      ctaTitle: "बदलाव लाने के लिए तैयार हैं?",
      ctaDesc:
        "हमारी समर्पित टीम में शामिल हों और सभी के लिए एक स्वच्छ, टिकाऊ भविष्य बनाएं।",
      getStarted: "आज ही शुरुआत करें",
    },
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {content[language].heroTitle}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-green-100 max-w-3xl mx-auto">
              {content[language].heroDesc}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/stats"
                className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors"
              >
                {content[language].viewImpact}
              </Link>
              <Link
                to="/register"
                className="bg-green-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-900 transition-colors"
              >
                {content[language].joinTeam}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {content[language].missionTitle}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {content[language].missionDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="group text-center p-6 bg-white rounded-lg shadow-[0_4px_6px_-1px_rgba(22,163,74,0.5)] hover:shadow-[0_6px_12px_-2px_rgba(22,163,74,0.6)] hover:scale-105 transition-all duration-300 cursor-pointer">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                {content[language].card1Title}
              </h3>
              <p className="text-gray-600">{content[language].card1Desc}</p>
            </div>

            {/* Card 2 */}
            <div className="group text-center p-6 bg-white rounded-lg shadow-[0_4px_6px_-1px_rgba(37,99,235,0.5)] hover:shadow-[0_6px_12px_-2px_rgba(37,99,235,0.6)] hover:scale-105 transition-all duration-300 cursor-pointer">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                {content[language].card2Title}
              </h3>
              <p className="text-gray-600">{content[language].card2Desc}</p>
            </div>

            {/* Card 3 */}
            <div className="group text-center p-6 bg-white rounded-lg shadow-[0_4px_6px_-1px_rgba(147,51,234,0.5)] hover:shadow-[0_6px_12px_-2px_rgba(147,51,234,0.6)] hover:scale-105 transition-all duration-300 cursor-pointer">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                {content[language].card3Title}
              </h3>
              <p className="text-gray-600">{content[language].card3Desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Preview */}
      <section className="py-16 bg-gray-50" ref={ref}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {content[language].impactTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">
                {inView && <CountUp end={2500} duration={2} separator="," />}+
              </div>
              <div className="text-gray-600">{content[language].tons}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">
                {inView && <CountUp end={150} duration={2} separator="," />}+
              </div>
              <div className="text-gray-600">
                {content[language].communities}
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">
                {inView && <CountUp end={75} duration={2} />}%
              </div>
              <div className="text-gray-600">{content[language].recycling}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">
                {inView && <CountUp end={500} duration={2} separator="," />}+
              </div>
              <div className="text-gray-600">
                {content[language].volunteers}
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link
              to="/stats"
              className="inline-flex items-center bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              <Heart className="h-5 w-5 mr-2" />
              {content[language].detailedStats}
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {content[language].ctaTitle}
          </h2>
          <p className="text-xl mb-8 text-green-100 max-w-2xl mx-auto">
            {content[language].ctaDesc}
          </p>
          <Link
            to="/register"
            className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors inline-block"
          >
            {content[language].getStarted}
          </Link>
        </div>
      </section>

      <Chatbot />
    </div>
  );
};

export default Home;
