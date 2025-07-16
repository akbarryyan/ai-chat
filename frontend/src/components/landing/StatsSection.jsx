import React, { useState, useEffect, useRef } from "react";
import { TrendingUp, Users, MessageCircle, Zap, Star } from "lucide-react";

const StatsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedStats, setAnimatedStats] = useState({
    users: 0,
    messages: 0,
    uptime: 0,
    rating: 0,
  });
  const sectionRef = useRef(null);

  const stats = [
    {
      id: "users",
      icon: Users,
      value: 50000,
      suffix: "+",
      label: "Happy Users",
      emoji: "😊",
      gradient: "from-blue-500 via-blue-600 to-indigo-600",
      bgGradient: "from-blue-50 to-indigo-50",
      detail: "+500 daily",
      detailColor: "text-blue-600",
    },
    {
      id: "messages",
      icon: MessageCircle,
      value: 10000000,
      suffix: "+",
      label: "Messages Processed",
      emoji: "💬",
      gradient: "from-green-500 via-emerald-600 to-teal-600",
      bgGradient: "from-green-50 to-emerald-50",
      detail: "+50K daily",
      detailColor: "text-green-600",
    },
    {
      id: "uptime",
      icon: Zap,
      value: 99.9,
      suffix: "%",
      label: "Uptime",
      emoji: "⚡",
      gradient: "from-purple-500 via-purple-600 to-pink-600",
      bgGradient: "from-purple-50 to-pink-50",
      detail: "Industry leading",
      detailColor: "text-purple-600",
    },
    {
      id: "rating",
      icon: Star,
      value: 4.9,
      suffix: "★",
      label: "User Rating",
      emoji: "⭐",
      gradient: "from-yellow-500 via-orange-500 to-red-500",
      bgGradient: "from-yellow-50 to-orange-50",
      detail: "From 10K+ reviews",
      detailColor: "text-yellow-600",
    },
  ];

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Animate numbers when visible
  useEffect(() => {
    if (isVisible) {
      const duration = 2000; // 2 seconds
      const steps = 60; // 60 FPS
      const stepDuration = duration / steps;

      stats.forEach((stat) => {
        let currentStep = 0;
        const increment = stat.value / steps;

        const timer = setInterval(() => {
          currentStep++;
          const currentValue = Math.min(increment * currentStep, stat.value);

          setAnimatedStats((prev) => ({
            ...prev,
            [stat.id]:
              stat.id === "rating"
                ? currentValue.toFixed(1)
                : Math.floor(currentValue),
          }));

          if (currentStep >= steps) {
            clearInterval(timer);
          }
        }, stepDuration);
      });
    }
  }, [isVisible]);

  const formatNumber = (num, id) => {
    if (id === "messages" && num >= 1000000) {
      return (num / 1000000).toFixed(0) + "M";
    }
    if (id === "users" && num >= 1000) {
      return (num / 1000).toFixed(0) + "K";
    }
    return num;
  };
  return (
    <section
      ref={sectionRef}
      id="impact"
      className="py-16 sm:py-20 bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-200/30 rounded-full blur-xl animate-pulse"></div>
        <div
          className="absolute bottom-10 right-10 w-40 h-40 bg-purple-200/30 rounded-full blur-2xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/3 w-24 h-24 bg-green-200/30 rounded-full blur-xl animate-bounce"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center bg-white/80 backdrop-blur-sm border border-gray-200 text-gray-700 px-4 sm:px-6 py-2 rounded-full text-sm font-medium mb-6 shadow-sm">
            <TrendingUp className="w-4 h-4 mr-2 text-blue-600" />
            <span>📊 Impact & Results</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            🚀 AKBAR AI by the{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
              Numbers
            </span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Real impact, real results, real users loving AKBAR AI every single
            day
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={stat.id}
                className={`group relative bg-gradient-to-br ${
                  stat.bgGradient
                } rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-white/50 backdrop-blur-sm ${
                  isVisible ? "animate-fadeInUp" : "opacity-0"
                }`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Background Gradient Overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 rounded-2xl sm:rounded-3xl transition-opacity duration-500`}
                ></div>

                {/* Icon */}
                <div className="relative mb-4">
                  <div
                    className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r ${stat.gradient} rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}
                  >
                    <IconComponent className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <span className="absolute -top-2 -right-2 text-lg sm:text-xl animate-bounce">
                    {stat.emoji}
                  </span>
                </div>

                {/* Number */}
                <div
                  className={`text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${stat.gradient} mb-2 group-hover:scale-105 transition-transform duration-300 leading-none`}
                >
                  {formatNumber(animatedStats[stat.id], stat.id)}
                  {stat.suffix}
                </div>

                {/* Label */}
                <p className="text-gray-700 font-semibold text-xs sm:text-sm lg:text-base mb-2 group-hover:text-gray-900 transition-colors">
                  {stat.label}
                </p>

                {/* Detail */}
                <div
                  className={`text-xs sm:text-sm ${stat.detailColor} font-medium bg-white/70 px-2 sm:px-3 py-1 rounded-full inline-block backdrop-blur-sm border border-white/50`}
                >
                  {stat.detail}
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              </div>
            );
          })}
        </div>

        {/* Additional Trust Indicators */}
        <div className="mt-12 sm:mt-16 text-center">
          <div className="inline-flex flex-wrap justify-center items-center gap-4 sm:gap-8 text-gray-600 text-xs sm:text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="font-medium">Real-time processing</span>
            </div>
            <div className="flex items-center space-x-2">
              <div
                className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"
                style={{ animationDelay: "0.5s" }}
              ></div>
              <span className="font-medium">Global availability</span>
            </div>
            <div className="flex items-center space-x-2">
              <div
                className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"
                style={{ animationDelay: "1s" }}
              ></div>
              <span className="font-medium">Enterprise ready</span>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default StatsSection;
