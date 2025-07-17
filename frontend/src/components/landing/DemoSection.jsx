import React, { useState, useEffect, useRef } from "react";
import {
  Send,
  Bot,
  User,
  Sparkles,
  MessageSquare,
  Paperclip,
  Image,
  FileText,
  X,
  ChevronDown,
  Zap,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3001/api";

const DemoSection = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);
  const [sessionToken, setSessionToken] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState([]);
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const [selectedAiModel, setSelectedAiModel] = useState("akbxr");
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showAttachMenu && !event.target.closest(".attachment-menu")) {
        setShowAttachMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showAttachMenu]);

  // Enhanced markdown components with better styling
  const markdownComponents = {
    p: ({ children }) => (
      <p className="mb-3 last:mb-0 leading-relaxed text-gray-700">{children}</p>
    ),
    strong: ({ children }) => (
      <strong className="font-bold text-gray-900">{children}</strong>
    ),
    em: ({ children }) => <em className="italic text-gray-600">{children}</em>,
    ul: ({ children }) => (
      <ul className="list-disc pl-5 mb-3 space-y-1.5">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal pl-5 mb-3 space-y-1.5">{children}</ol>
    ),
    li: ({ children }) => (
      <li className="text-gray-700 leading-relaxed">{children}</li>
    ),
    code: ({ children }) => (
      <code className="bg-gradient-to-r from-purple-100 to-pink-100 px-2 py-1 rounded-md text-sm font-mono text-purple-800 border border-purple-200">
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="bg-gradient-to-r from-gray-900 to-gray-800 text-gray-100 p-4 rounded-xl text-sm overflow-x-auto mb-3 font-mono shadow-lg border border-gray-700">
        {children}
      </pre>
    ),
    h1: ({ children }) => (
      <h1 className="text-xl font-bold mb-3 text-gray-900 border-b border-gray-200 pb-2">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-lg font-bold mb-2 text-gray-900">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-base font-semibold mb-2 text-gray-800">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-blue-400 pl-4 py-2 mb-3 bg-gradient-to-r from-blue-50 to-indigo-50 text-gray-700 rounded-r-lg">
        {children}
      </blockquote>
    ),
  };

  const initializeDemo = async (e) => {
    try {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }

      console.log("Demo initialization triggered");

      if (isInitializing) {
        console.log("Already initializing, skipping...");
        return;
      }

      setIsInitializing(true);
      console.log("Setting initializing state to true...");

      const response = await axios.post(
        `${API_URL}/demo/session`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response received:", response.status);
      console.log("Data received:", response.data);

      if (response.data.success && response.data.sessionToken) {
        setSessionToken(response.data.sessionToken);
        setShowChat(true);
        setMessages([
          {
            type: "ai",
            content:
              "Hello! 👋 Welcome to **AKBAR AI Demo**. I'm here to help you with questions, provide information, and showcase my capabilities.\n\n**🔧 What I can do:**\n• Answer questions and provide detailed explanations\n• Help with text analysis and creative writing\n• Assist with coding and technical topics\n• Provide guidance and suggestions\n• Process images and documents\n\nWhat would you like to explore today?",
            timestamp: new Date(),
            usedModel: "akbxr",
          },
        ]);
        console.log("Demo session initialized successfully");
      } else {
        console.error("Session creation failed:", response.data);
        alert("Failed to start demo. Please try again.");
      }
    } catch (error) {
      console.error("Error initializing demo:", error);
      alert(
        `Cannot connect to server: ${error.message}. Please check your connection and try again.`
      );
    } finally {
      setIsInitializing(false);
      console.log("Demo initialization completed, resetting state");
    }
  };

  const handleFileAttach = (event) => {
    const files = Array.from(event.target.files);
    const validFiles = files.filter((file) => {
      return (
        file.type.startsWith("image/") ||
        file.type === "application/pdf" ||
        file.type.includes("document") ||
        file.type.includes("text")
      );
    });

    if (validFiles.length !== files.length) {
      alert(
        "Some files were not added. Please upload only images, PDFs, or text documents."
      );
    }

    validFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newFile = {
          id: Date.now() + Math.random(),
          name: file.name,
          type: file.type,
          size: file.size,
          data: e.target.result,
          isImage: file.type.startsWith("image/"),
        };
        setAttachedFiles((prev) => [...prev, newFile]);
      };
      reader.readAsDataURL(file);
    });

    event.target.value = "";
    setShowAttachMenu(false);
  };

  const removeAttachedFile = (fileId) => {
    setAttachedFiles((prev) => prev.filter((file) => file.id !== fileId));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const sendMessage = async () => {
    if (
      (!inputMessage.trim() && attachedFiles.length === 0) ||
      isLoading ||
      !sessionToken
    )
      return;

    const userMessage = inputMessage.trim();
    const files = [...attachedFiles];

    setInputMessage("");
    setAttachedFiles([]);
    setIsLoading(true);

    const newUserMessage = {
      type: "user",
      content: userMessage || "📎 Attached files",
      attachments: files,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newUserMessage]);

    try {
      const requestBody = {
        sessionToken,
        message: userMessage,
        aiModel: selectedAiModel,
        attachments: files.map((file) => ({
          name: file.name,
          type: file.type,
          data: file.data,
        })),
      };

      const response = await axios.post(
        `${API_URL}/demo/message`,
        requestBody,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        const aiMessage = {
          type: "ai",
          content: response.data.message,
          usedModel: response.data.usedModel,
          requestedModel: response.data.requestedModel,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, aiMessage]);

        console.log(
          `🤖 Model requested: ${response.data.requestedModel}, used: ${response.data.usedModel}`
        );
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage = {
        type: "ai",
        content: "Sorry, I encountered an error. Please try again.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <section id="demo" className="py-24 relative overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 rounded-full text-sm font-semibold mb-6 shadow-lg backdrop-blur-sm border border-blue-200">
            <Sparkles className="w-4 h-4 mr-2 animate-pulse" />
            Try It Now - No Sign Up Required
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Experience{" "}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent animate-gradient">
              AKBAR AI
            </span>{" "}
            Live
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            Start chatting with our advanced AI assistant right now and discover
            its incredible capabilities.
            <span className="block mt-2 text-lg text-blue-600 font-medium">
              Multi-model support • File uploads • Real-time responses
            </span>
          </p>
        </div>

        {/* Enhanced Demo Interface */}
        <div className="max-w-5xl mx-auto">
          {!showChat ? (
            /* Enhanced Start Demo Button */
            <div className="text-center px-4">
              <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 sm:p-12 border border-white/20 mx-auto max-w-2xl relative overflow-hidden">
                {/* Decorative background elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full opacity-10 transform translate-x-8 -translate-y-8"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-indigo-400 to-pink-400 rounded-full opacity-10 transform -translate-x-4 translate-y-4"></div>

                <div className="relative z-10">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl rotate-3 hover:rotate-0 transition-transform duration-500">
                    <MessageSquare className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                    Ready to chat with AKBAR AI?
                  </h3>
                  <p className="text-gray-600 mb-8 text-base sm:text-lg leading-relaxed">
                    Start a conversation and see how our multi-model AI can help
                    you with questions, creative tasks, coding assistance, and
                    problem-solving. Experience the future of AI interaction.
                  </p>

                  {/* Feature highlights */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-2">
                        <Zap className="w-6 h-6 text-blue-600" />
                      </div>
                      <p className="text-xs font-medium text-gray-600">
                        Instant Responses
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-2">
                        <Bot className="w-6 h-6 text-purple-600" />
                      </div>
                      <p className="text-xs font-medium text-gray-600">
                        4 AI Models
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-2">
                        <FileText className="w-6 h-6 text-green-600" />
                      </div>
                      <p className="text-xs font-medium text-gray-600">
                        File Support
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-2">
                        <Sparkles className="w-6 h-6 text-orange-600" />
                      </div>
                      <p className="text-xs font-medium text-gray-600">
                        No Sign Up
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={initializeDemo}
                    onTouchStart={(e) => {
                      console.log("Touch started on demo button");
                    }}
                    onTouchEnd={initializeDemo}
                    type="button"
                    disabled={isInitializing}
                    className={`bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 active:from-blue-800 active:via-purple-800 active:to-indigo-800 disabled:from-gray-400 disabled:to-gray-500 text-white px-10 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 active:scale-95 disabled:scale-100 flex items-center justify-center space-x-3 mx-auto cursor-pointer touch-manipulation min-w-[250px] shadow-xl ${
                      isInitializing ? "cursor-not-allowed" : "cursor-pointer"
                    }`}
                    style={{
                      WebkitTapHighlightColor: "rgba(59, 130, 246, 0.3)",
                      touchAction: "manipulation",
                      userSelect: "none",
                      WebkitUserSelect: "none",
                    }}
                  >
                    {isInitializing ? (
                      <>
                        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin flex-shrink-0"></div>
                        <span className="whitespace-nowrap">
                          Initializing...
                        </span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-6 h-6 flex-shrink-0" />
                        <span className="whitespace-nowrap">
                          Start Demo Chat
                        </span>
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Enhanced Chat Interface */
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
              {/* Enhanced Chat Header */}
              <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 px-8 py-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                      <Bot className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-xl">
                        AKBAR AI Demo
                      </h3>
                      <p className="text-blue-100 text-sm font-medium">
                        Free demo • Multi-model support • No registration
                        required
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-white/90 text-sm font-medium">
                      Online
                    </span>
                  </div>
                </div>
              </div>

              {/* Enhanced AI Model Selection */}
              <div className="px-8 py-4 bg-gradient-to-r from-gray-50 to-blue-50 border-b border-gray-200">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Bot className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-semibold text-gray-700">
                      AI Model:
                    </span>
                  </div>
                  <div className="relative">
                    <select
                      value={selectedAiModel}
                      onChange={(e) => setSelectedAiModel(e.target.value)}
                      className="appearance-none bg-white border-2 border-gray-200 rounded-xl px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium text-gray-700 cursor-pointer hover:border-blue-300 transition-colors"
                      disabled={isLoading}
                    >
                      <option value="akbxr">
                        🔶 AKBXR AI - Balanced & Reliable
                      </option>
                      <option value="chatgpt4">
                        🤖 ChatGPT-4 - Advanced Language Model
                      </option>
                      <option value="gemini">💎 Gemini AI - Google's AI</option>
                      <option value="claude">
                        🧠 Claude AI - Anthropic's AI
                      </option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Enhanced Messages */}
              <div className="h-[500px] overflow-y-auto p-8 space-y-6 bg-gradient-to-b from-gray-50/50 to-white/50">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex items-start space-x-4 ${
                      message.type === "user" ? "justify-end" : ""
                    }`}
                  >
                    {message.type === "ai" && (
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                        <Bot className="w-5 h-5 text-white" />
                      </div>
                    )}
                    <div
                      className={`max-w-md lg:max-w-lg px-6 py-4 rounded-2xl shadow-lg ${
                        message.type === "user"
                          ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white ml-auto"
                          : "bg-white border border-gray-200"
                      }`}
                    >
                      {message.type === "user" ? (
                        <div>
                          {message.content && (
                            <p className="text-sm mb-3 leading-relaxed">
                              {message.content}
                            </p>
                          )}
                          {message.attachments &&
                            message.attachments.length > 0 && (
                              <div className="space-y-3">
                                {message.attachments.map((file, idx) => (
                                  <div
                                    key={idx}
                                    className="bg-white/20 rounded-xl p-3 backdrop-blur-sm"
                                  >
                                    {file.isImage ? (
                                      <div>
                                        <img
                                          src={file.data}
                                          alt={file.name}
                                          className="max-w-full h-auto rounded-lg mb-2"
                                          style={{ maxHeight: "200px" }}
                                        />
                                        <p className="text-xs opacity-90 font-medium">
                                          {file.name}
                                        </p>
                                      </div>
                                    ) : (
                                      <div className="flex items-center space-x-3">
                                        <FileText className="w-5 h-5" />
                                        <div>
                                          <p className="text-sm font-medium">
                                            {file.name}
                                          </p>
                                          <p className="text-xs opacity-80">
                                            {formatFileSize(file.size)}
                                          </p>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            )}
                        </div>
                      ) : (
                        <div className="text-sm">
                          {/* Enhanced Model indicator badge */}
                          {message.usedModel && (
                            <div className="mb-3 flex items-center space-x-2">
                              <span
                                className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold ${
                                  message.usedModel === "chatgpt4"
                                    ? "bg-green-100 text-green-700 border border-green-200"
                                    : message.usedModel === "gemini"
                                    ? "bg-purple-100 text-purple-700 border border-purple-200"
                                    : message.usedModel === "claude"
                                    ? "bg-orange-100 text-orange-700 border border-orange-200"
                                    : message.usedModel === "akbxr"
                                    ? "bg-blue-100 text-blue-700 border border-blue-200"
                                    : "bg-gray-100 text-gray-700 border border-gray-200"
                                }`}
                              >
                                {message.usedModel === "chatgpt4"
                                  ? "🤖 ChatGPT-4"
                                  : message.usedModel === "gemini"
                                  ? "💎 Gemini AI"
                                  : message.usedModel === "claude"
                                  ? "🧠 Claude AI"
                                  : message.usedModel === "akbxr"
                                  ? "🔶 AKBXR AI"
                                  : "⚠️ Fallback"}
                              </span>
                              {message.requestedModel !== message.usedModel && (
                                <span className="text-xs text-amber-600 bg-amber-100 px-2 py-1 rounded-full border border-amber-200">
                                  fallback from {message.requestedModel}
                                </span>
                              )}
                            </div>
                          )}
                          <ReactMarkdown components={markdownComponents}>
                            {message.content}
                          </ReactMarkdown>
                        </div>
                      )}
                    </div>
                    {message.type === "user" && (
                      <div className="w-10 h-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                        <User className="w-5 h-5 text-gray-600" />
                      </div>
                    )}
                  </div>
                ))}
                {isLoading && (
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div className="bg-white border border-gray-200 px-6 py-4 rounded-2xl shadow-lg">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-75"></div>
                        <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-150"></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Enhanced Input Area */}
              <div className="border-t border-gray-200 p-8 bg-white">
                {/* Enhanced File attachments preview */}
                {attachedFiles.length > 0 && (
                  <div className="mb-6 flex flex-wrap gap-3">
                    {attachedFiles.map((file) => (
                      <div
                        key={file.id}
                        className="relative bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-3 max-w-xs border border-gray-200 shadow-sm"
                      >
                        {file.isImage ? (
                          <div className="relative">
                            <img
                              src={file.data}
                              alt={file.name}
                              className="max-w-full h-auto rounded-lg"
                              style={{ maxHeight: "100px" }}
                            />
                            <button
                              onClick={() => removeAttachedFile(file.id)}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 shadow-lg transition-colors"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-3">
                            <FileText className="w-5 h-5 text-blue-500 flex-shrink-0" />
                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-medium text-gray-700 truncate">
                                {file.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                {formatFileSize(file.size)}
                              </p>
                            </div>
                            <button
                              onClick={() => removeAttachedFile(file.id)}
                              className="bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600 flex-shrink-0 shadow-lg transition-colors"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex space-x-4">
                  {/* Enhanced Attachment button */}
                  <div className="relative attachment-menu">
                    <button
                      onClick={() => setShowAttachMenu(!showAttachMenu)}
                      className="bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-600 p-4 rounded-2xl transition-all duration-200 flex-shrink-0 shadow-lg hover:shadow-xl"
                      disabled={isLoading}
                    >
                      <Paperclip className="w-5 h-5" />
                    </button>

                    {/* Enhanced Attachment menu */}
                    {showAttachMenu && (
                      <div className="absolute bottom-full mb-3 left-0 bg-white border border-gray-200 rounded-2xl shadow-2xl py-3 min-w-[180px] z-10 backdrop-blur-lg">
                        <button
                          onClick={() => {
                            fileInputRef.current?.click();
                            setShowAttachMenu(false);
                          }}
                          className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-blue-50 w-full text-left transition-colors rounded-xl mx-2"
                        >
                          <Image className="w-5 h-5 text-blue-500" />
                          <span className="text-sm font-medium">
                            Upload Image
                          </span>
                        </button>
                        <button
                          onClick={() => {
                            fileInputRef.current?.click();
                            setShowAttachMenu(false);
                          }}
                          className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-purple-50 w-full text-left transition-colors rounded-xl mx-2"
                        >
                          <FileText className="w-5 h-5 text-purple-500" />
                          <span className="text-sm font-medium">
                            Upload Document
                          </span>
                        </button>
                      </div>
                    )}
                  </div>

                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message or attach files..."
                    className="flex-1 border-2 border-gray-200 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium placeholder-gray-400 shadow-lg"
                    disabled={isLoading}
                  />
                  <button
                    onClick={sendMessage}
                    disabled={
                      (!inputMessage.trim() && attachedFiles.length === 0) ||
                      isLoading
                    }
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-300 disabled:to-gray-400 text-white p-4 rounded-2xl transition-all duration-200 flex-shrink-0 shadow-lg hover:shadow-xl disabled:shadow-sm"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>

                {/* Hidden file input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*,.pdf,.doc,.docx,.txt"
                  onChange={handleFileAttach}
                  className="hidden"
                />

                <p className="text-xs text-gray-500 mt-4 text-center leading-relaxed">
                  🔒 This is a demo environment. Messages and files are not
                  saved permanently.
                  <br />
                  Supports images, PDFs, and documents up to 10MB.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes gradient {
          0%,
          100% {
            background-size: 200% 200%;
            background-position: left center;
          }
          50% {
            background-size: 200% 200%;
            background-position: right center;
          }
        }
        .animate-gradient {
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </section>
  );
};

export default DemoSection;
