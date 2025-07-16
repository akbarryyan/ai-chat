import React from "react";
import {
  Zap,
  Shield,
  Brain,
  Code,
  Globe,
  Heart,
  Lightbulb,
  Cpu,
} from "lucide-react";

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 bg-white/50 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 px-6 py-2 rounded-full text-sm font-medium mb-4">
            <Cpu className="w-4 h-4 mr-2" />
            🧠 What Makes AKBAR AI Special?
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              AKBAR AI
            </span>
            ?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            🚀 Experience the next generation of AI-powered conversations with
            features that go beyond ordinary chatbots.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 border border-white/50 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform shadow-lg">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                ⚡ Lightning Fast Responses
                <div className="ml-2 w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Get instant, intelligent responses in milliseconds. Our
                optimized AI engine processes complex queries faster than you
                can blink!
              </p>
              <div className="text-sm text-blue-600 font-medium">
                ⏱️ Average response time: &lt;200ms
              </div>
            </div>
          </div>

          <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 border border-white/50 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform shadow-lg">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                🔐 Military-Grade Security
                <div className="ml-2 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Your conversations are protected with enterprise-grade
                encryption. We prioritize your privacy above everything else.
              </p>
              <div className="text-sm text-green-600 font-medium">
                🛡️ 256-bit encryption + Zero data retention
              </div>
            </div>
          </div>

          <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 border border-white/50 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform shadow-lg">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                🧠 Context-Aware Genius
                <div className="ml-2 w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                AKBAR AI remembers your conversation context and learns your
                preferences to provide increasingly personalized responses.
              </p>
              <div className="text-sm text-purple-600 font-medium">
                🎯 99.7% context accuracy rate
              </div>
            </div>
          </div>
        </div>

        {/* Additional features row */}
        <div className="grid md:grid-cols-2 gap-8 mt-12">
          <div className="group bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 relative overflow-hidden">
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative">
              <div className="flex items-center mb-6">
                <Code className="w-8 h-8 mr-3" />
                <h3 className="text-xl font-bold">
                  🎨 Creative & Technical Excellence
                </h3>
              </div>
              <p className="leading-relaxed mb-4">
                From writing poetry to debugging code, from business strategies
                to creative storytelling - AKBAR AI excels in both analytical
                and creative tasks.
              </p>
              <div className="flex items-center text-blue-100">
                <Lightbulb className="w-4 h-4 mr-2" />
                <span className="text-sm">50+ specialized skill domains</span>
              </div>
            </div>
          </div>

          <div className="group bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl p-8 text-white shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 relative overflow-hidden">
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative">
              <div className="flex items-center mb-6">
                <Globe className="w-8 h-8 mr-3" />
                <h3 className="text-xl font-bold">
                  🌍 Always Available, Everywhere
                </h3>
              </div>
              <p className="leading-relaxed mb-4">
                24/7 availability across all devices and time zones. Whether
                it's 3 AM or peak hours, AKBAR AI is always ready to help you
                succeed.
              </p>
              <div className="flex items-center text-green-100">
                <Heart className="w-4 h-4 mr-2" />
                <span className="text-sm">99.99% uptime guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
