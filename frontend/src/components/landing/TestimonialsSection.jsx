import React, { useState, useEffect } from "react";
import { Heart, Star, Quote } from "lucide-react";

const TestimonialsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      text: "AKBAR AI completely transformed how I work. It's like having a genius colleague who never sleeps!",
      author: "Sarah Chen",
      role: "Software Developer",
      rating: 5,
    },
    {
      text: "The most intuitive AI I've ever used. AKBAR understands context better than any other assistant.",
      author: "Marcus Johnson",
      role: "Content Creator",
      rating: 5,
    },
    {
      text: "From coding to creative writing, AKBAR AI helps me excel in everything. Absolutely game-changing!",
      author: "Elena Rodriguez",
      role: "Digital Marketer",
      rating: 5,
    },
  ];

  // Testimonial rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="testimonials"
      className="py-20 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
        <div
          className="absolute bottom-10 right-10 w-40 h-40 bg-white/5 rounded-full blur-2xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-white/10 rounded-full blur-xl animate-bounce"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-white/20 backdrop-blur-sm text-white px-6 py-2 rounded-full text-sm font-medium mb-4">
            <Heart className="w-4 h-4 mr-2 text-pink-300" />
            💬 What Our Users Say
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Join the{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-300">
              AKBAR AI
            </span>{" "}
            Revolution!
          </h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            🌟 See how AKBAR AI is transforming lives and boosting productivity
            worldwide!
          </p>
        </div>

        <div className="relative">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/20 transition-all duration-500">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <Quote className="w-8 h-8 text-yellow-300" />
              </div>
              <div className="flex-1">
                <p className="text-white text-lg leading-relaxed mb-6 font-medium">
                  "{testimonials[currentTestimonial].text}"
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center font-bold text-white">
                      {testimonials[currentTestimonial].author[0]}
                    </div>
                    <div>
                      <div className="text-white font-semibold">
                        {testimonials[currentTestimonial].author}
                      </div>
                      <div className="text-blue-200 text-sm">
                        {testimonials[currentTestimonial].role}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="flex text-yellow-300 mr-2">
                      {[...Array(testimonials[currentTestimonial].rating)].map(
                        (_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current" />
                        )
                      )}
                    </div>
                    <span className="text-white/80 text-sm">
                      {testimonials[currentTestimonial].rating}.0/5
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonial indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentTestimonial
                    ? "bg-white scale-125"
                    : "bg-white/40 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
