import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Sparkles, Zap, Shield, Heart } from "lucide-react";

const CTASection = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/login");
  };

  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-black/20"></div>
        <div className="absolute top-20 left-20 w-64 h-64 bg-yellow-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-20 w-80 h-80 bg-pink-400/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-spin"
          style={{ animationDuration: "20s" }}
        ></div>
      </div>

      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative">
        <div className="inline-flex items-center bg-white/20 backdrop-blur-sm text-white px-6 py-2 rounded-full text-sm font-medium mb-6 animate-bounce">
          <Sparkles className="w-4 h-4 mr-2 text-yellow-300" />
          🎉 Limited Time: Free Premium Access!
        </div>
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
          Ready to{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-300 to-yellow-300 animate-pulse">
            Supercharge
          </span>{" "}
          Your Life?
        </h2>
        <p className="text-xl text-blue-100 mb-8 leading-relaxed max-w-2xl mx-auto">
          🚀 Join over 50,000 users who are already experiencing the magic of
          AKBAR AI.
          <br />
          <strong className="text-white">
            Your AI-powered future starts NOW!
          </strong>
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
          <button
            onClick={handleGetStarted}
            className="group bg-white text-blue-600 hover:bg-gray-50 px-12 py-5 rounded-xl font-bold text-lg transition-all duration-300 hover:shadow-2xl hover:scale-110 inline-flex items-center relative overflow-hidden cursor-pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-pink-400/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative flex items-center">
              <Zap className="w-6 h-6 mr-3 text-yellow-500" />
              🔥 Start FREE Today
              <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform" />
            </div>
          </button>

          <div className="flex items-center text-white/80">
            <div className="flex -space-x-2 mr-3">
              <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-400 rounded-full border-2 border-white"></div>
              <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full border-2 border-white"></div>
              <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-red-400 rounded-full border-2 border-white"></div>
            </div>
            <div className="text-sm">
              <div className="font-semibold">Join 1,247 users today!</div>
              <div className="text-blue-200">⭐ No credit card required</div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto text-white/90">
          <div className="flex items-center justify-center">
            <Shield className="w-5 h-5 mr-2 text-green-400" />
            <span className="text-sm">🔒 100% Secure</span>
          </div>
          <div className="flex items-center justify-center">
            <Zap className="w-5 h-5 mr-2 text-yellow-400" />
            <span className="text-sm">⚡ Instant Setup</span>
          </div>
          <div className="flex items-center justify-center">
            <Heart className="w-5 h-5 mr-2 text-pink-400" />
            <span className="text-sm">💝 30-Day Guarantee</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
