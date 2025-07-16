import React, { useState, useEffect } from "react";
import {
  MessageCircle,
  Zap,
  Shield,
  Globe,
  ArrowRight,
  Sparkles,
  Brain,
  Users,
  Star,
  Trophy,
  Heart,
  Cpu,
  Code,
  Lightbulb,
  Quote,
  Play,
  ChevronRight,
} from "lucide-react";

const LandingPage = ({ onGetStarted }) => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [typingText, setTypingText] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  const words = [
    "Intelligent",
    "Creative",
    "Powerful",
    "Reliable",
    "Innovative",
  ];
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

  // Testimonial rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-indigo-400 rounded-full animate-pulse"></div>
        <div className="absolute bottom-40 left-20 w-3 h-3 bg-purple-400 rounded-full animate-bounce"></div>
        <div
          className="absolute top-60 left-1/2 w-1 h-1 bg-blue-500 rounded-full animate-ping"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-20 right-10 w-2 h-2 bg-indigo-500 rounded-full animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-gray-200/50 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">AKBAR AI</span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a
                href="#features"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Features
              </a>
              <a
                href="#about"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                About
              </a>
              <button
                onClick={onGetStarted}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-all duration-200 hover:shadow-lg hover:scale-105"
              >
                Get Started
              </button>
            </nav>
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={onGetStarted}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-200 text-sm"
              >
                Start
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
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
                🎯 Meet AKBAR AI - Not just another chatbot, but your personal
                AI genius!
                <br />✨ <strong>Think faster.</strong>{" "}
                <strong>Create better.</strong> <strong>Achieve more.</strong>
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                <button
                  onClick={onGetStarted}
                  className="group bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-2xl hover:scale-105 flex items-center justify-center animate-pulse"
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
                    <span className="text-gray-600 text-xs font-medium">
                      You
                    </span>
                  </div>
                  <p className="text-gray-700 text-sm">
                    🤔 Can you help me create a marketing strategy for my
                    startup?
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

      {/* Features Section */}
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
                  From writing poetry to debugging code, from business
                  strategies to creative storytelling - AKBAR AI excels in both
                  analytical and creative tasks.
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

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 relative overflow-hidden">
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
              🌟 See how AKBAR AI is transforming lives and boosting
              productivity worldwide!
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
                        {[
                          ...Array(testimonials[currentTestimonial].rating),
                        ].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current" />
                        ))}
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

      {/* Stats Section */}
      <section className="py-20 bg-white/80 backdrop-blur-sm">
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
              <div className="mt-2 text-xs text-purple-500">
                Industry leading
              </div>
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

      {/* CTA Section */}
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
              onClick={onGetStarted}
              className="group bg-white text-blue-600 hover:bg-gray-50 px-12 py-5 rounded-xl font-bold text-lg transition-all duration-300 hover:shadow-2xl hover:scale-110 inline-flex items-center relative overflow-hidden"
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

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-purple-500/10 rounded-full blur-2xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                  <Brain className="w-7 h-7 text-white" />
                </div>
                <div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    AKBAR AI
                  </span>
                  <div className="text-xs text-gray-400">The Future of AI</div>
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed mb-6 max-w-md">
                🚀 Empowering conversations through advanced artificial
                intelligence. Experience the future of human-AI interaction with
                personality, creativity, and intelligence that adapts to you.
              </p>
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-gray-400 text-sm">
                  Rated 4.9/5 by 10,000+ users
                </span>
              </div>
              <div className="text-sm text-gray-500">
                © 2025 AKBAR AI. All rights reserved.
                <br />
                <span className="text-blue-400">
                  Built with ❤️ for the future of AI interaction.
                </span>
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-6 text-lg flex items-center">
                <Zap className="w-5 h-5 mr-2 text-yellow-400" />
                Product
              </h3>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <a
                    href="#features"
                    className="hover:text-blue-400 transition-colors flex items-center"
                  >
                    <ChevronRight className="w-4 h-4 mr-1" />
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-blue-400 transition-colors flex items-center"
                  >
                    <ChevronRight className="w-4 h-4 mr-1" />
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-blue-400 transition-colors flex items-center"
                  >
                    <ChevronRight className="w-4 h-4 mr-1" />
                    API Access
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-blue-400 transition-colors flex items-center"
                  >
                    <ChevronRight className="w-4 h-4 mr-1" />
                    Enterprise
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-6 text-lg flex items-center">
                <Heart className="w-5 h-5 mr-2 text-pink-400" />
                Support
              </h3>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <a
                    href="#"
                    className="hover:text-blue-400 transition-colors flex items-center"
                  >
                    <ChevronRight className="w-4 h-4 mr-1" />
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-blue-400 transition-colors flex items-center"
                  >
                    <ChevronRight className="w-4 h-4 mr-1" />
                    Contact Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-blue-400 transition-colors flex items-center"
                  >
                    <ChevronRight className="w-4 h-4 mr-1" />
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-blue-400 transition-colors flex items-center"
                  >
                    <ChevronRight className="w-4 h-4 mr-1" />
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom section */}
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              🌟 Made with cutting-edge AI technology and endless passion
            </div>
            <div className="flex items-center space-x-6">
              <div className="flex items-center text-gray-400 text-sm">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                All systems operational
              </div>
              <button
                onClick={onGetStarted}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105"
              >
                Try AKBAR AI Free
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
