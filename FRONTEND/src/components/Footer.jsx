import React from "react";
import { Leaf, Mail, Phone, MapPin } from "lucide-react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-green-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-30 items-center">
          {/* Column 1: EcoWaste Description */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Leaf className="h-8 w-8" />
              <span className="font-bold text-2xl">EcoWaste NGO</span>
            </div>
            <p className="text-green-100 mb-6 text-justify max-w-md">
              Dedicated to creating a cleaner, greener future through innovative
              waste management solutions and community engagement. Together, we
              can build a more sustainable world.
            </p>

            <div className="flex space-x-4">
              <a
                href="#"
                className="text-green-100 hover:text-white transition-colors"
              >
                <FaFacebook size={22} />
              </a>
              <a
                href="#"
                className="text-green-100 hover:text-white transition-colors"
              >
                <FaTwitter size={22} />
              </a>
              <a
                href="#"
                className="text-green-100 hover:text-white transition-colors"
              >
                <FaInstagram size={22} />
              </a>
            </div>
          </div>

          {/* Column 2: Contact Us */}
          <div>
            <h3 className="font-semibold text-xl mb-4">Contact Us</h3>
            <div className="space-y-4 text-green-100">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5" />
                <span>info@ecowaste.org</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5" />
                <span>123 Green Street, Eco City, EC 12345</span>
              </div>
            </div>
          </div>

          {/* Column 3: Floating Leaf with Text */}
          <div className="flex flex-col items-center justify-center h-50 relative">
            <Leaf className="h-50 w-50 text-green-300 animate-bounce-slow" />
            <p className="mt-6 text-lg font-semibold text-green-100 text-center">
              Growing a Greener Future
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-green-700 mt-8 pt-8 text-center">
          <p className="text-green-100">
            © 2024 EcoWaste NGO. All rights reserved. Built with care for our
            planet.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
