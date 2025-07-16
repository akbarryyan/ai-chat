import React from "react";
import { useNavigate } from "react-router-dom";
import { Brain, Star, Zap, Heart, ChevronRight } from "lucide-react";

const Footer = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/login");
  };

  return (
    <footer
      id="about"
      className="bg-gray-900 text-white py-16 relative overflow-hidden"
    >
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-purple-500/10 rounded-full blur-2xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                <Brain className="w-7 h-7 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  AKBAR AI
                </span>
                <div className="text-xs text-gray-400">The Future of AI</div>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6 max-w-md">
              🚀 Empowering conversations through advanced artificial
              intelligence. Experience the future of human-AI interaction with
              personality, creativity, and intelligence that adapts to you.
            </p>
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-gray-400 text-sm">
                Rated 4.9/5 by 10,000+ users
              </span>
            </div>
            <div className="text-sm text-gray-500">
              © 2025 AKBAR AI. All rights reserved.
              <br />
              <span className="text-blue-400">
                Built with ❤️ for the future of AI interaction.
              </span>
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-6 text-lg flex items-center">
              <Zap className="w-5 h-5 mr-2 text-yellow-400" />
              Product
            </h3>
            <ul className="space-y-3 text-gray-400">
              <li>
                <a
                  href="#features"
                  className="hover:text-blue-400 transition-colors flex items-center"
                >
                  <ChevronRight className="w-4 h-4 mr-1" />
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-blue-400 transition-colors flex items-center"
                >
                  <ChevronRight className="w-4 h-4 mr-1" />
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-blue-400 transition-colors flex items-center"
                >
                  <ChevronRight className="w-4 h-4 mr-1" />
                  API Access
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-blue-400 transition-colors flex items-center"
                >
                  <ChevronRight className="w-4 h-4 mr-1" />
                  Enterprise
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-6 text-lg flex items-center">
              <Heart className="w-5 h-5 mr-2 text-pink-400" />
              Support
            </h3>
            <ul className="space-y-3 text-gray-400">
              <li>
                <a
                  href="#"
                  className="hover:text-blue-400 transition-colors flex items-center"
                >
                  <ChevronRight className="w-4 h-4 mr-1" />
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-blue-400 transition-colors flex items-center"
                >
                  <ChevronRight className="w-4 h-4 mr-1" />
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-blue-400 transition-colors flex items-center"
                >
                  <ChevronRight className="w-4 h-4 mr-1" />
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-blue-400 transition-colors flex items-center"
                >
                  <ChevronRight className="w-4 h-4 mr-1" />
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            🌟 Made with cutting-edge AI technology and endless passion
          </div>
          <div className="flex items-center space-x-6">
            <div className="flex items-center text-gray-400 text-sm">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
              All systems operational
            </div>
            <button
              onClick={handleGetStarted}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 cursor-pointer"
            >
              Try AKBAR AI Free
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
