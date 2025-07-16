import React, { useState, useEffect } from "react";
import { Heart, Star, Quote } from "lucide-react";

const TestimonialsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const testimonials = [
    {
      text: "AKBAR AI completely transformed how I work. It's like having a genius colleague who never sleeps!",
      author: "Sarah Chen",
      role: "Software Developer",
      rating: 5,
      avatar: "SC",
      color: "from-pink-400 to-purple-500",
    },
    {
      text: "The most intuitive AI I've ever used. AKBAR understands context better than any other assistant.",
      author: "Marcus Johnson",
      role: "Content Creator",
      rating: 5,
      avatar: "MJ",
      color: "from-blue-400 to-indigo-500",
    },
    {
      text: "From coding to creative writing, AKBAR AI helps me excel in everything. Absolutely game-changing!",
      author: "Elena Rodriguez",
      role: "Digital Marketer",
      rating: 5,
      avatar: "ER",
      color: "from-green-400 to-teal-500",
    },
  ];

  // Testimonial rotation with smooth animation
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
        setIsAnimating(false);
      }, 300);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleTestimonialChange = (index) => {
    if (index !== currentTestimonial) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentTestimonial(index);
        setIsAnimating(false);
      }, 300);
    }
  };

  return (
    <section
      id="testimonials"
      className="py-16 sm:py-20 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden"
    >
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 bg-black/30"></div>
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-purple-400/20 rounded-full blur-xl animate-pulse"></div>
        <div
          className="absolute bottom-10 right-10 w-40 h-40 bg-pink-400/20 rounded-full blur-2xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/3 right-1/4 w-24 h-24 bg-blue-400/20 rounded-full blur-xl animate-bounce"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-1/3 left-1/4 w-28 h-28 bg-indigo-400/20 rounded-full blur-xl animate-pulse"
          style={{ animationDelay: "3s" }}
        ></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center bg-white/20 backdrop-blur-sm text-white px-4 sm:px-6 py-2 rounded-full text-sm font-medium mb-6 border border-white/20 shadow-lg">
            <Heart className="w-4 h-4 mr-2 text-pink-300 animate-pulse" />
            <span className="hidden sm:inline">💬 What Our Users Say</span>
            <span className="sm:hidden">💬 Testimonials</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
            Join the{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 animate-pulse">
              AKBAR AI
            </span>{" "}
            Revolution!
          </h2>
          <p className="text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
            🌟 See how AKBAR AI is transforming lives and boosting productivity
            worldwide!
          </p>
        </div>

        {/* Testimonial Card */}
        <div className="relative max-w-4xl mx-auto">
          <div
            className={`bg-white/15 backdrop-blur-lg rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/30 transition-all duration-500 transform hover:scale-105 ${
              isAnimating ? "opacity-0 scale-95" : "opacity-100 scale-100"
            }`}
          >
            <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6">
              {/* Quote Icon */}
              <div className="flex-shrink-0 self-start sm:self-center">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center shadow-lg">
                  <Quote className="w-6 h-6 text-white" />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 space-y-6">
                {/* Testimonial Text */}
                <div className="relative">
                  <p className="text-white text-base sm:text-lg leading-relaxed font-medium">
                    "{testimonials[currentTestimonial].text}"
                  </p>
                  <div className="absolute -top-2 -left-2 text-yellow-300/30 text-6xl font-serif">
                    "
                  </div>
                </div>

                {/* Author Info & Rating */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                  {/* Author */}
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-12 h-12 bg-gradient-to-r ${testimonials[currentTestimonial].color} rounded-full flex items-center justify-center font-bold text-white shadow-lg ring-2 ring-white/20`}
                    >
                      {testimonials[currentTestimonial].avatar}
                    </div>
                    <div>
                      <div className="text-white font-semibold text-lg">
                        {testimonials[currentTestimonial].author}
                      </div>
                      <div className="text-blue-200 text-sm font-medium">
                        {testimonials[currentTestimonial].role}
                      </div>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                    <div className="flex text-yellow-300">
                      {[...Array(testimonials[currentTestimonial].rating)].map(
                        (_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 fill-current animate-pulse"
                            style={{ animationDelay: `${i * 0.1}s` }}
                          />
                        )
                      )}
                    </div>
                    <span className="text-white/90 text-sm font-medium">
                      {testimonials[currentTestimonial].rating}.0
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Testimonial Indicators */}
          <div className="flex justify-center mt-8 space-x-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => handleTestimonialChange(index)}
                className={`relative transition-all duration-300 transform hover:scale-110 ${
                  index === currentTestimonial
                    ? "w-8 h-3 bg-white rounded-full shadow-lg"
                    : "w-3 h-3 bg-white/40 hover:bg-white/60 rounded-full"
                }`}
              >
                {index === currentTestimonial && (
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-pink-400 rounded-full animate-pulse"></div>
                )}
              </button>
            ))}
          </div>

          {/* Progress Bar */}
          <div className="mt-6 max-w-xs mx-auto">
            <div className="w-full bg-white/20 rounded-full h-1">
              <div
                className="bg-gradient-to-r from-yellow-400 to-pink-400 h-1 rounded-full transition-all duration-5000 ease-linear"
                style={{
                  width: `${
                    ((currentTestimonial + 1) / testimonials.length) * 100
                  }%`,
                  animation: "progressBar 5s linear infinite",
                }}
              ></div>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 sm:mt-16 text-center">
          <div className="flex flex-wrap justify-center items-center space-x-4 sm:space-x-8 text-white/70 text-sm">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Trusted by 10K+ users</span>
            </div>
            <div className="flex items-center space-x-2 mb-2">
              <div
                className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"
                style={{ animationDelay: "0.5s" }}
              ></div>
              <span>4.9/5 average rating</span>
            </div>
            <div className="flex items-center space-x-2 mb-2">
              <div
                className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"
                style={{ animationDelay: "1s" }}
              ></div>
              <span>24/7 AI assistance</span>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for progress animation */}
      <style jsx>{`
        @keyframes progressBar {
          0% {
            width: 0%;
          }
          100% {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
};

export default TestimonialsSection;
