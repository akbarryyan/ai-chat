import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Brain, Menu, X } from "lucide-react";

const Header = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showItems, setShowItems] = useState(false);

  useEffect(() => {
    if (isMobileMenuOpen) {
      // Delay showing items to create stagger effect
      const timer = setTimeout(() => {
        setShowItems(true);
      }, 50);
      return () => clearTimeout(timer);
    } else {
      setShowItems(false);
    }
  }, [isMobileMenuOpen]);

  const handleGetStarted = () => {
    navigate("/login");
  };

  const toggleMobileMenu = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    setIsMobileMenuOpen(!isMobileMenuOpen);

    // Prevent body scroll when menu is open
    if (!isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      document.body.style.position = "unset";
      document.body.style.width = "unset";
      document.documentElement.style.overflow = "unset";
    }

    // Reset animation state after transition
    setTimeout(() => {
      setIsAnimating(false);
    }, 300);
  };

  const closeMobileMenu = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    setIsMobileMenuOpen(false);

    // Restore body scroll
    document.body.style.overflow = "unset";
    document.body.style.position = "unset";
    document.body.style.width = "unset";
    document.documentElement.style.overflow = "unset";

    // Reset animation state after transition
    setTimeout(() => {
      setIsAnimating(false);
    }, 300);
  };

  const handleNavClick = (sectionId) => {
    const element =
      document.getElementById(sectionId) ||
      document.querySelector(`#${sectionId}`);
    element?.scrollIntoView({ behavior: "smooth" });
    closeMobileMenu();
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 ${
        isMobileMenuOpen ? "bg-white" : "bg-white/80"
      } backdrop-blur-md border-b border-gray-200/50 z-[1001]`}
    >
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
              href="#demo"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("demo")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="relative text-gray-600 hover:text-blue-600 transition-all duration-300 font-medium px-4 py-2 rounded-lg hover:bg-blue-50 group cursor-pointer"
            >
              <span className="relative z-10">Try Demo</span>
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
              className="relative z-[1002] p-2 rounded-lg bg-white/90 backdrop-blur-sm hover:bg-gray-100 transition-colors duration-200 shadow-lg border border-gray-200/50"
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
        {(isMobileMenuOpen || isAnimating) && (
          <>
            {/* Backdrop overlay - covers ALL content behind */}
            <div
              className={`fixed inset-0 z-[998] md:hidden transition-all duration-300 ease-out ${
                isMobileMenuOpen ? "opacity-100" : "opacity-0"
              }`}
              onClick={closeMobileMenu}
              style={{
                top: "0",
                left: "0",
                width: "100vw",
                height: "100vh",
                backgroundColor: "rgba(0, 0, 0, 0.85)",
                backdropFilter: "blur(20px) saturate(180%)",
                WebkitBackdropFilter: "blur(20px) saturate(180%)",
                position: "fixed",
                zIndex: 998,
              }}
            ></div>

            {/* Menu panel */}
            <div
              className={`fixed top-0 right-0 h-full w-80 shadow-2xl border-l border-gray-200 z-[999] md:hidden transition-all duration-300 ease-out ${
                isMobileMenuOpen
                  ? "translate-x-0 opacity-100"
                  : "translate-x-full opacity-0"
              }`}
              style={{
                backgroundColor: "white",
                position: "fixed",
                zIndex: 999,
                height: "100vh",
                boxShadow: "-10px 0 50px rgba(0, 0, 0, 0.3)",
              }}
            >
              <div className="flex flex-col min-h-screen">
                {/* Header dengan Logo dan Close Button */}
                <div
                  className="flex items-center justify-between p-4 border-b border-gray-200 flex-shrink-0"
                  style={{
                    backgroundColor: "white",
                  }}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                      <Brain className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-lg font-bold text-gray-900">
                      AKBAR AI
                    </span>
                  </div>
                  <button
                    onClick={closeMobileMenu}
                    className="p-2 rounded-lg bg-gray-100/80 hover:bg-gray-200/80 transition-colors duration-200"
                    aria-label="Close menu"
                  >
                    <X className="w-5 h-5 text-gray-700" />
                  </button>
                </div>

                <div
                  className="flex flex-col flex-1 pt-6 pb-6 px-6"
                  style={{
                    backgroundColor: "white",
                  }}
                >
                  {/* Navigation Links */}
                  <nav className="flex flex-col space-y-3 mb-8 flex-shrink-0">
                    <button
                      onClick={() => handleNavClick("home")}
                      className={`flex items-center justify-between py-3 px-4 text-left text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-300 group transform ${
                        showItems
                          ? "translate-x-0 opacity-100"
                          : "translate-x-8 opacity-0"
                      }`}
                      style={{
                        transitionDelay: showItems ? "100ms" : "0ms",
                      }}
                    >
                      <span className="font-medium">Home</span>
                      <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
                    </button>

                    <button
                      onClick={() => handleNavClick("features")}
                      className={`flex items-center justify-between py-3 px-4 text-left text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-300 group transform ${
                        showItems
                          ? "translate-x-0 opacity-100"
                          : "translate-x-8 opacity-0"
                      }`}
                      style={{
                        transitionDelay: showItems ? "150ms" : "0ms",
                      }}
                    >
                      <span className="font-medium">Features</span>
                      <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
                    </button>

                    <button
                      onClick={() => handleNavClick("demo")}
                      className={`flex items-center justify-between py-3 px-4 text-left text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-300 group transform ${
                        showItems
                          ? "translate-x-0 opacity-100"
                          : "translate-x-8 opacity-0"
                      }`}
                      style={{
                        transitionDelay: showItems ? "175ms" : "0ms",
                      }}
                    >
                      <span className="font-medium">Try Demo</span>
                      <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
                    </button>

                    <button
                      onClick={() => handleNavClick("impact")}
                      className={`flex items-center justify-between py-3 px-4 text-left text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-300 group transform ${
                        showItems
                          ? "translate-x-0 opacity-100"
                          : "translate-x-8 opacity-0"
                      }`}
                      style={{
                        transitionDelay: showItems ? "200ms" : "0ms",
                      }}
                    >
                      <span className="font-medium">Impact</span>
                      <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
                    </button>

                    <button
                      onClick={() => handleNavClick("testimonials")}
                      className={`flex items-center justify-between py-3 px-4 text-left text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-300 group transform ${
                        showItems
                          ? "translate-x-0 opacity-100"
                          : "translate-x-8 opacity-0"
                      }`}
                      style={{
                        transitionDelay: showItems ? "225ms" : "0ms",
                      }}
                    >
                      <span className="font-medium">Reviews</span>
                      <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
                    </button>
                  </nav>

                  {/* CTA Button */}
                  <div
                    className={`mt-auto flex-shrink-0 transform transition-all duration-300 ${
                      showItems
                        ? "translate-y-0 opacity-100"
                        : "translate-y-8 opacity-0"
                    }`}
                    style={{
                      transitionDelay: showItems ? "275ms" : "0ms",
                    }}
                  >
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
                    <div
                      className={`mt-4 text-center bg-gray-50 rounded-xl p-3 mb-4 transform transition-all duration-300 ${
                        showItems
                          ? "scale-100 opacity-100"
                          : "scale-95 opacity-0"
                      }`}
                      style={{
                        transitionDelay: showItems ? "325ms" : "0ms",
                      }}
                    >
                      <div className="flex items-center justify-center space-x-2 text-sm text-gray-600 mb-2">
                        <div className="flex -space-x-1">
                          <div className="w-6 h-6 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full border-2 border-white"></div>
                          <div className="w-6 h-6 bg-gradient-to-r from-green-400 to-blue-400 rounded-full border-2 border-white"></div>
                          <div className="w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full border-2 border-white"></div>
                        </div>
                        <span className="font-medium">50K+ users</span>
                      </div>
                      <div className="flex items-center justify-center space-x-1 text-sm text-gray-600">
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className="text-xs">
                              ★
                            </span>
                          ))}
                        </div>
                        <span className="font-medium">4.9/5 rating</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
