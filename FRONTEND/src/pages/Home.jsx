import React from "react";
import { Link } from "react-router-dom";
import { Leaf, Users, Target, Heart } from "lucide-react";
import Chatbot from "../components/Chatbot";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const Home = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Building a Cleaner Future
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-green-100 max-w-3xl mx-auto">
              Join EcoWaste NGO in our mission to transform waste management and
              create sustainable communities through innovation and
              collaboration.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/stats"
                className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors"
              >
                View Our Impact
              </Link>
              <Link
                to="/register"
                className="bg-green-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-900 transition-colors"
              >
                Join Our Team
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Mission
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're committed to revolutionizing waste management through
              technology, community engagement, and sustainable practices.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="group text-center p-6 bg-white rounded-lg shadow-[0_4px_6px_-1px_rgba(22,163,74,0.5)] hover:shadow-[0_6px_12px_-2px_rgba(22,163,74,0.6)] hover:scale-105 transition-all duration-300 cursor-pointer">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                Environmental Protection
              </h3>
              <p className="text-gray-600">
                Reducing environmental impact through efficient waste collection
                and recycling programs.
              </p>
            </div>

            {/* Card 2 */}
            <div className="group text-center p-6 bg-white rounded-lg shadow-[0_4px_6px_-1px_rgba(37,99,235,0.5)] hover:shadow-[0_6px_12px_-2px_rgba(37,99,235,0.6)] hover:scale-105 transition-all duration-300 cursor-pointer">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                Community Engagement
              </h3>
              <p className="text-gray-600">
                Building partnerships with local communities to promote
                sustainable waste management practices.
              </p>
            </div>

            {/* Card 3 */}
            <div className="group text-center p-6 bg-white rounded-lg shadow-[0_4px_6px_-1px_rgba(147,51,234,0.5)] hover:shadow-[0_6px_12px_-2px_rgba(147,51,234,0.6)] hover:scale-105 transition-all duration-300 cursor-pointer">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                Innovation & Technology
              </h3>
              <p className="text-gray-600">
                Leveraging cutting-edge technology to optimize waste collection
                routes and processes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Preview */}
      <section className="py-16 bg-gray-50" ref={ref}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Impact
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">
                {inView && <CountUp end={2500} duration={2} separator="," />}+
              </div>
              <div className="text-gray-600">Tons Collected</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">
                {inView && <CountUp end={150} duration={2} separator="," />}+
              </div>
              <div className="text-gray-600">Communities Served</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">
                {inView && <CountUp end={75} duration={2} />}%
              </div>
              <div className="text-gray-600">Recycling Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">
                {inView && <CountUp end={500} duration={2} separator="," />}+
              </div>
              <div className="text-gray-600">Volunteers</div>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link
              to="/stats"
              className="inline-flex items-center bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              <Heart className="h-5 w-5 mr-2" />
              View Detailed Statistics
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl mb-8 text-green-100 max-w-2xl mx-auto">
            Join our team of dedicated workers and help us build a cleaner, more
            sustainable future for everyone.
          </p>
          <Link
            to="/register"
            className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors inline-block"
          >
            Get Started Today
          </Link>
        </div>
      </section>

      <Chatbot />
    </div>
  );
};

export default Home;
