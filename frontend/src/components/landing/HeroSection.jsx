import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Sparkles,
  Brain,
  Star,
  Trophy,
  Zap,
  Play,
} from "lucide-react";

const HeroSection = () => {
  const navigate = useNavigate();
  const [typingText, setTypingText] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  const handleGetStarted = () => {
    navigate("/login");
  };

  const words = [
    "Intelligent",
    "Creative",
    "Powerful",
    "Reliable",
    "Innovative",
  ];

  // Typing animation effect
  useEffect(() => {
    const currentWord = words[currentWordIndex];
    let i = 0;
    const typing = setInterval(() => {
      if (i <= currentWord.length) {
        setTypingText(currentWord.slice(0, i));
        i++;
      } else {
        clearInterval(typing);
        setTimeout(() => {
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }, 2000);
      }
    }, 100);

    return () => clearInterval(typing);
  }, [currentWordIndex]);

  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 px-6 py-3 rounded-full text-sm font-medium mb-6 shadow-lg">
              <Sparkles className="w-4 h-4 mr-2 animate-spin" />
              🚀 Powered by Advanced AI Technology
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 relative">
                {typingText}
                <span className="animate-pulse">|</span>
              </span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                AI Assistant
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              🎯 Meet AKBAR AI - Not just another chatbot, but your personal AI
              genius!
              <br />✨ <strong>Think faster.</strong>{" "}
              <strong>Create better.</strong> <strong>Achieve more.</strong>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <button
                onClick={handleGetStarted}
                className="group bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-2xl hover:scale-105 flex items-center justify-center animate-pulse cursor-pointer"
              >
                🔥 Start Your AI Journey
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
              </button>
              <button className="border-2 border-gray-300 hover:border-blue-400 text-gray-700 hover:text-blue-600 px-8 py-4 rounded-xl font-semibold transition-all duration-200 hover:shadow-lg hover:bg-blue-50 flex items-center justify-center">
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </button>
            </div>

            {/* Social proof */}
            <div className="flex items-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full border-2 border-white"></div>
                  <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-400 rounded-full border-2 border-white"></div>
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full border-2 border-white"></div>
                  <div className="w-8 h-8 bg-gray-300 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold">
                    +50K
                  </div>
                </div>
                <span className="ml-3">Happy users</span>
              </div>
              <div className="flex items-center">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="ml-2">4.9/5 rating</span>
              </div>
            </div>
          </div>
          <div className="relative">
            {/* Main chat preview */}
            <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-6 transform rotate-2 hover:rotate-0 transition-all duration-500 hover:scale-105 border border-white/20">
              <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 rounded-lg p-4 mb-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-white/10 animate-pulse"></div>
                <div className="relative flex items-center space-x-3 mb-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center animate-bounce">
                    <Brain className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-white font-medium">AKBAR AI</span>
                  <div className="ml-auto flex space-x-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
                    <span className="text-white/80 text-xs">Online</span>
                  </div>
                </div>
                <p className="text-white/95 text-sm leading-relaxed">
                  🚀 Hello! I'm AKBAR AI, your super-intelligent assistant. I
                  can help you with:
                  <br />
                  💡 Creative writing & brainstorming
                  <br />
                  🔧 Coding & technical solutions
                  <br />
                  📊 Data analysis & insights
                  <br />
                  🎯 And so much more! What's your challenge today?
                </p>
              </div>
              <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg p-4 border-l-4 border-blue-400">
                <div className="flex items-center mb-2">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-2">
                    <span className="text-blue-600 text-xs font-bold">U</span>
                  </div>
                  <span className="text-gray-600 text-xs font-medium">You</span>
                </div>
                <p className="text-gray-700 text-sm">
                  🤔 Can you help me create a marketing strategy for my startup?
                </p>
              </div>

              {/* Typing indicator */}
              <div className="mt-3 flex items-center space-x-2 text-gray-500">
                <Brain className="w-4 h-4 text-blue-500 animate-pulse" />
                <span className="text-sm">AKBAR is thinking...</span>
                <div className="flex space-x-1">
                  <div className="w-1 h-1 bg-blue-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-1 h-1 bg-blue-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-1 h-1 bg-blue-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full blur-xl opacity-70 animate-pulse"></div>
            <div
              className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-2xl opacity-50 animate-pulse"
              style={{ animationDelay: "1s" }}
            ></div>
            <div
              className="absolute top-1/2 -right-8 w-16 h-16 bg-gradient-to-r from-green-400 to-blue-400 rounded-full blur-xl opacity-60 animate-bounce"
              style={{ animationDelay: "2s" }}
            ></div>

            {/* Feature badges */}
            <div className="absolute -top-6 -left-6 bg-white rounded-full p-3 shadow-lg animate-bounce">
              <Zap className="w-6 h-6 text-yellow-500" />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-white rounded-full p-3 shadow-lg animate-pulse">
              <Trophy className="w-6 h-6 text-purple-500" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
