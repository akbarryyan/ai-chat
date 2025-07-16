import React, { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../contexts/AuthContext";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Brain,
  ArrowLeft,
  Sparkles,
  Shield,
  Zap,
} from "lucide-react";

const Login = ({ onBack }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login, register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Show loading toast
    const loadingToast = toast.loading(
      isLogin ? "Signing you in..." : "Creating your account..."
    );

    try {
      // Add minimum loading delay for better UX
      const [result] = await Promise.all([
        isLogin
          ? login(formData.email, formData.password)
          : register(formData.username, formData.email, formData.password),
        new Promise((resolve) => setTimeout(resolve, 1500)), // 1.5 second delay
      ]);

      toast.dismiss(loadingToast);

      if (!result.success) {
        setError(result.error);
        // Error toast is already shown in AuthContext
      }
    } catch (err) {
      toast.dismiss(loadingToast);
      toast.error("An unexpected error occurred");
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex relative overflow-hidden">
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

      {/* Left Content Section */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <div className="w-full flex flex-col justify-center items-center p-12 relative">
          {/* Content Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-indigo-600/10 backdrop-blur-sm"></div>

          {/* Floating elements */}
          <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-32 right-16 w-24 h-24 bg-gradient-to-r from-indigo-400/20 to-pink-400/20 rounded-full blur-2xl animate-bounce"></div>

          <div className="relative z-10 text-center max-w-lg">
            {/* Main Logo */}
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 rounded-3xl mb-6 shadow-2xl relative">
                <Brain className="w-16 h-16 text-white" />
                <div className="absolute inset-0 bg-white/20 rounded-3xl animate-pulse"></div>
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-indigo-600/30 rounded-3xl blur-xl"></div>
              </div>
              <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 mb-4">
                AKBAR AI
              </h1>
              <div className="inline-flex items-center bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 px-6 py-2 rounded-full font-medium">
                <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                The Future of AI Conversation
              </div>
            </div>

            {/* Features List */}
            <div className="space-y-6 mb-8">
              <div className="flex items-center text-left bg-white/30 backdrop-blur-sm rounded-xl p-4 hover:bg-white/40 transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mr-4">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">
                    🧠 Advanced AI Intelligence
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Powered by cutting-edge language models
                  </p>
                </div>
              </div>

              <div className="flex items-center text-left bg-white/30 backdrop-blur-sm rounded-xl p-4 hover:bg-white/40 transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg flex items-center justify-center mr-4">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">
                    ⚡ Lightning Fast Responses
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Get instant answers to your questions
                  </p>
                </div>
              </div>

              <div className="flex items-center text-left bg-white/30 backdrop-blur-sm rounded-xl p-4 hover:bg-white/40 transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-lg flex items-center justify-center mr-4">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">
                    🔒 Secure & Private
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Your conversations are always protected
                  </p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                <div className="text-2xl font-bold text-blue-600">10K+</div>
                <div className="text-xs text-gray-600">Happy Users</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                <div className="text-2xl font-bold text-purple-600">1M+</div>
                <div className="text-xs text-gray-600">Conversations</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                <div className="text-2xl font-bold text-indigo-600">24/7</div>
                <div className="text-xs text-gray-600">Available</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 lg:p-8 relative">
        <div className="w-full max-w-md relative">
          {/* Back Button - only show on small screens or when onBack exists */}
          {onBack && (
            <button
              onClick={onBack}
              className="flex items-center text-gray-600 hover:text-blue-600 mb-6 transition-all duration-200 hover:scale-105 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20 lg:hidden"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </button>
          )}

          <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/30 p-8 relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-xl"></div>
              <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-r from-indigo-400/10 to-pink-400/10 rounded-full blur-xl"></div>
            </div>

            {/* Header - simplified for right column */}
            <div className="text-center mb-8 relative">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 rounded-2xl mb-6 shadow-lg relative lg:hidden">
                <Brain className="w-8 h-8 text-white" />
                <div className="absolute inset-0 bg-white/20 rounded-2xl animate-pulse"></div>
              </div>
              <div className="mb-4">
                <h2 className="text-3xl lg:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 mb-2 lg:hidden">
                  AKBAR AI
                </h2>
                <div className="lg:hidden inline-flex items-center bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 px-4 py-1 rounded-full text-xs font-medium mb-4">
                  <Sparkles className="w-3 h-3 mr-1 animate-spin" />
                  Your AI Genius Awaits
                </div>
                <h2 className="hidden lg:block text-2xl font-bold text-gray-800 mb-2">
                  {isLogin ? "Welcome Back!" : "Join AKBAR AI"}
                </h2>
              </div>
              <p className="text-gray-600 text-lg lg:text-base">
                {isLogin ? (
                  <>
                    🎉 <strong>Ready to continue</strong> your AI journey?
                  </>
                ) : (
                  <>
                    🚀 <strong>Start your AI journey</strong> today!
                  </>
                )}
              </p>
            </div>

            {/* Toggle buttons */}
            <div className="flex bg-gray-100/80 rounded-xl p-1 mb-8 relative overflow-hidden">
              <div
                className={`absolute top-1 bottom-1 w-1/2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg transition-all duration-300 ease-out shadow-lg ${
                  isLogin ? "left-1" : "left-1/2"
                }`}
              ></div>
              <button
                type="button"
                onClick={() => {
                  setIsLogin(true);
                  setError("");
                  setFormData({ username: "", email: "", password: "" });
                }}
                className={`flex-1 py-3 px-4 text-center font-medium transition-all duration-200 rounded-lg relative z-10 ${
                  isLogin ? "text-white" : "text-gray-600 hover:text-gray-800"
                }`}
              >
                <div className="flex items-center justify-center">
                  <Shield className="w-4 h-4 mr-2" />
                  Sign In
                </div>
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsLogin(false);
                  setError("");
                  setFormData({ username: "", email: "", password: "" });
                }}
                className={`flex-1 py-3 px-4 text-center font-medium transition-all duration-200 rounded-lg relative z-10 ${
                  !isLogin ? "text-white" : "text-gray-600 hover:text-gray-800"
                }`}
              >
                <div className="flex items-center justify-center">
                  <Zap className="w-4 h-4 mr-2" />
                  Sign Up
                </div>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 relative">
              {!isLogin && (
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                  </div>
                  <input
                    type="text"
                    name="username"
                    required
                    className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 bg-white/50 backdrop-blur-sm placeholder-gray-400 text-gray-700 hover:border-gray-300"
                    placeholder="Choose your username"
                    value={formData.username}
                    onChange={handleChange}
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none"></div>
                </div>
              )}

              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                </div>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 bg-white/50 backdrop-blur-sm placeholder-gray-400 text-gray-700 hover:border-gray-300"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={handleChange}
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none"></div>
              </div>

              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  className="w-full pl-12 pr-12 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 bg-white/50 backdrop-blur-sm placeholder-gray-400 text-gray-700 hover:border-gray-300"
                  placeholder={
                    isLogin ? "Enter your password" : "Create a secure password"
                  }
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-4 flex items-center hover:scale-110 transition-transform"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-blue-500 transition-colors" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-blue-500 transition-colors" />
                  )}
                </button>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none"></div>
              </div>

              {error && (
                <div className="bg-red-50/80 backdrop-blur-sm border border-red-200 rounded-xl p-4 text-red-700 text-sm relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-pink-500/5"></div>
                  <div className="relative flex items-center">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-3 animate-pulse"></div>
                    {error}
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 text-white font-semibold py-4 px-6 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                <div className="relative flex items-center justify-center">
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                      <span>
                        {isLogin
                          ? "🔑 Signing you in..."
                          : "🚀 Creating your account..."}
                      </span>
                    </>
                  ) : (
                    <div className="flex items-center">
                      {isLogin ? (
                        <>
                          <Shield className="w-5 h-5 mr-3" />
                          <span>✨ Sign In to AKBAR AI</span>
                        </>
                      ) : (
                        <>
                          <Zap className="w-5 h-5 mr-3" />
                          <span>🎉 Join AKBAR AI</span>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </button>
            </form>

            <div className="mt-8 text-center relative">
              <div className="relative inline-block">
                <button
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setError("");
                    setFormData({ username: "", email: "", password: "" });
                  }}
                  className="group text-gray-600 hover:text-blue-600 transition-all duration-300 text-sm font-medium relative px-4 py-2 rounded-lg hover:bg-blue-50"
                >
                  <div className="flex items-center">
                    {isLogin ? (
                      <>
                        <span>New to AKBAR AI? </span>
                        <span className="font-bold ml-1 text-blue-600 hover:text-purple-600 transition-colors">
                          🚀 Join the revolution!
                        </span>
                      </>
                    ) : (
                      <>
                        <span>Already part of AKBAR AI? </span>
                        <span className="font-bold ml-1 text-blue-600 hover:text-purple-600 transition-colors">
                          ✨ Welcome back!
                        </span>
                      </>
                    )}
                  </div>
                </button>
              </div>
            </div>

            {/* Bottom decoration */}
            <div className="mt-6 text-center">
              <div className="inline-flex items-center text-xs text-gray-400 bg-white/30 px-3 py-1 rounded-full">
                <Sparkles className="w-3 h-3 mr-1 animate-pulse" />
                Powered by AKBAR AI Technology
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
