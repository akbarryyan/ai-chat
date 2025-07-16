import React from "react";

const StatsSection = () => {
  return (
    <section id="impact" className="py-20 bg-white/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            🚀 AKBAR AI by the Numbers
          </h2>
          <p className="text-gray-600">
            Real impact, real results, real users loving AKBAR AI
          </p>
        </div>
        <div className="grid md:grid-cols-4 gap-8 text-center">
          <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-2 group-hover:scale-110 transition-transform">
              50K+
            </div>
            <p className="text-gray-600 font-medium">😊 Happy Users</p>
            <div className="mt-2 text-xs text-blue-500">+500 daily</div>
          </div>
          <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600 mb-2 group-hover:scale-110 transition-transform">
              10M+
            </div>
            <p className="text-gray-600 font-medium">💬 Messages Processed</p>
            <div className="mt-2 text-xs text-green-500">+50K daily</div>
          </div>
          <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-2 group-hover:scale-110 transition-transform">
              99.9%
            </div>
            <p className="text-gray-600 font-medium">⚡ Uptime</p>
            <div className="mt-2 text-xs text-purple-500">Industry leading</div>
          </div>
          <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-orange-600 mb-2 group-hover:scale-110 transition-transform">
              4.9★
            </div>
            <p className="text-gray-600 font-medium">⭐ User Rating</p>
            <div className="mt-2 text-xs text-yellow-500">
              From 10K+ reviews
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
