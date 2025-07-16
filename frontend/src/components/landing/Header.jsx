import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Brain, Menu, X } from "lucide-react";

const Header = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleGetStarted = () => {
    navigate("/login");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleNavClick = (sectionId) => {
    const element =
      document.getElementById(sectionId) ||
      document.querySelector(`#${sectionId}`);
    element?.scrollIntoView({ behavior: "smooth" });
    closeMobileMenu();
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-gray-200/50 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">AKBAR AI</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("home")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="relative text-gray-600 hover:text-blue-600 transition-all duration-300 font-medium px-4 py-2 rounded-lg hover:bg-blue-50 group cursor-pointer"
            >
              <span className="relative z-10">Home</span>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></div>
            </a>
            <a
              href="#features"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("features")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="relative text-gray-600 hover:text-blue-600 transition-all duration-300 font-medium px-4 py-2 rounded-lg hover:bg-blue-50 group cursor-pointer"
            >
              <span className="relative z-10">Features</span>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></div>
            </a>
            <a
              href="#impact"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("impact")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="relative text-gray-600 hover:text-blue-600 transition-all duration-300 font-medium px-4 py-2 rounded-lg hover:bg-blue-50 group cursor-pointer"
            >
              <span className="relative z-10">Impact</span>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></div>
            </a>
            <a
              href="#testimonials"
              onClick={(e) => {
                e.preventDefault();
                document
                  .querySelector("#testimonials")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="relative text-gray-600 hover:text-blue-600 transition-all duration-300 font-medium px-4 py-2 rounded-lg hover:bg-blue-50 group cursor-pointer"
            >
              <span className="relative z-10">Reviews</span>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></div>
            </a>
            <div className="w-px h-6 bg-gray-300"></div>
            <button
              onClick={handleGetStarted}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center space-x-2 relative overflow-hidden group cursor-pointer"
            >
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              <span className="relative">Get Started</span>
              <ArrowRight className="w-4 h-4 relative group-hover:translate-x-1 transition-transform" />
            </button>
          </nav>
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="relative z-50 p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-40 md:hidden">
            <div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm"
              onClick={closeMobileMenu}
            ></div>
            <div className="fixed top-0 right-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out">
              <div className="flex flex-col h-full pt-20 pb-6 px-6">
                {/* Navigation Links */}
                <nav className="flex flex-col space-y-4 mb-8">
                  <button
                    onClick={() => handleNavClick("home")}
                    className="flex items-center justify-between py-3 px-4 text-left text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 group"
                  >
                    <span className="font-medium">Home</span>
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
                  </button>

                  <button
                    onClick={() => handleNavClick("features")}
                    className="flex items-center justify-between py-3 px-4 text-left text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 group"
                  >
                    <span className="font-medium">Features</span>
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
                  </button>

                  <button
                    onClick={() => handleNavClick("impact")}
                    className="flex items-center justify-between py-3 px-4 text-left text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 group"
                  >
                    <span className="font-medium">Impact</span>
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
                  </button>

                  <button
                    onClick={() => handleNavClick("testimonials")}
                    className="flex items-center justify-between py-3 px-4 text-left text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 group"
                  >
                    <span className="font-medium">Reviews</span>
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
                  </button>
                </nav>

                {/* CTA Button */}
                <div className="mt-auto">
                  <button
                    onClick={() => {
                      handleGetStarted();
                      closeMobileMenu();
                    }}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center justify-center space-x-2 relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                    <span className="relative">🚀 Get Started</span>
                    <ArrowRight className="w-4 h-4 relative group-hover:translate-x-1 transition-transform" />
                  </button>

                  {/* Social proof in mobile menu */}
                  <div className="mt-4 text-center">
                    <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 mb-2">
                      <div className="flex -space-x-1">
                        <div className="w-6 h-6 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full border-2 border-white"></div>
                        <div className="w-6 h-6 bg-gradient-to-r from-green-400 to-blue-400 rounded-full border-2 border-white"></div>
                        <div className="w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full border-2 border-white"></div>
                      </div>
                      <span>50K+ users</span>
                    </div>
                    <div className="flex items-center justify-center space-x-1 text-sm text-gray-500">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className="text-xs">
                            ★
                          </span>
                        ))}
                      </div>
                      <span>4.9/5 rating</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
