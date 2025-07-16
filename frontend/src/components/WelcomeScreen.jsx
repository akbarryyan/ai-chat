import React from "react";
import { Sparkles, MessageSquare, Zap, Brain, Heart } from "lucide-react";

const WelcomeScreen = () => {
  const features = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: "AI Pintar",
      description: "Didukung oleh teknologi AI terdepan",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Respon Cepat",
      description: "Jawaban instan untuk setiap pertanyaan",
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Ramah Pengguna",
      description: "Interface yang mudah dan menyenangkan",
    },
  ];

  return (
    <div className="text-center py-16 px-6 max-w-4xl mx-auto">
      {/* Main Welcome Section */}
      <div className="mb-12">
        <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
          <Sparkles className="w-10 h-10 text-white" />
        </div>
        <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Selamat Datang di AKBAR AI
        </h3>
        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
          Asisten AI pintar yang siap membantu Anda kapan saja.
          <br />
          Mulai percakapan dengan mengetik pesan di bawah ini.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {features.map((feature, index) => (
          <div
            key={index}
            className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 hover:border-gray-300"
          >
            <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4 text-blue-600">
              {feature.icon}
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">
              {feature.title}
            </h4>
            <p className="text-sm text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* Quick Start Tips */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
        <h4 className="text-lg font-semibold text-gray-900 mb-3">
          💡 Tips Memulai:
        </h4>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
          <div className="text-left">
            <p className="mb-2">• Tanyakan apa saja yang Anda ingin tahu</p>
            <p className="mb-2">• Minta bantuan untuk tugas atau proyek</p>
          </div>
          <div className="text-left">
            <p className="mb-2">• Diskusikan ide atau konsep baru</p>
            <p className="mb-2">• Cari solusi untuk masalah Anda</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
