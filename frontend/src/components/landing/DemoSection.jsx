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
} from "lucide-react";
import ReactMarkdown from "react-markdown";

const DemoSection = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);
  const [sessionToken, setSessionToken] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState([]);
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Close attachment menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showAttachMenu && !event.target.closest(".attachment-menu")) {
        setShowAttachMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showAttachMenu]);

  // Custom markdown components for styling
  const markdownComponents = {
    p: ({ children }) => (
      <p className="mb-2 last:mb-0 leading-relaxed">{children}</p>
    ),
    strong: ({ children }) => (
      <strong className="font-bold text-gray-900">{children}</strong>
    ),
    em: ({ children }) => <em className="italic text-gray-800">{children}</em>,
    ul: ({ children }) => (
      <ul className="list-disc pl-4 mb-2 space-y-1">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal pl-4 mb-2 space-y-1">{children}</ol>
    ),
    li: ({ children }) => <li className="text-gray-700">{children}</li>,
    code: ({ children }) => (
      <code className="bg-gray-200 px-1.5 py-0.5 rounded text-sm font-mono text-gray-800">
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="bg-gray-200 p-3 rounded-lg text-sm overflow-x-auto mb-2 font-mono">
        {children}
      </pre>
    ),
    h1: ({ children }) => (
      <h1 className="text-lg font-bold mb-2 text-gray-900">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-base font-bold mb-2 text-gray-900">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-sm font-bold mb-1 text-gray-900">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-blue-400 pl-3 py-1 mb-2 bg-blue-50 text-gray-700">
        {children}
      </blockquote>
    ),
  };

  // Initialize demo session with mobile support
  const initializeDemo = async (e) => {
    try {
      // Prevent default behavior and stop propagation for mobile
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }

      console.log("Demo initialization triggered"); // Enhanced debug log

      if (isInitializing) {
        console.log("Already initializing, skipping...");
        return; // Prevent double clicks
      }

      setIsInitializing(true);
      console.log("Setting initializing state to true..."); // Debug log

      // Check if backend is accessible - using correct endpoint
      const response = await fetch("http://localhost:3001/api/demo/session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Response received:", response.status); // Debug log

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Data received:", data); // Debug log

      if (data.success && data.sessionToken) {
        setSessionToken(data.sessionToken);
        setShowChat(true);
        // Add welcome message
        setMessages([
          {
            type: "ai",
            content:
              "Hello! 👋 Welcome to AKBAR AI Demo. I'm here to help you with questions, provide information, and showcase my capabilities.\n\n**🔧 What I can do:**\n• Answer questions and provide explanations\n• Help with text analysis and writing\n• Assist with coding and technical topics\n• Provide guidance and suggestions\n\n**📁 File Upload:**\n• Upload images or documents using the 📎 button\n• For images: describe what you see for better assistance\n• For documents: let me know what you need help with\n\nWhat would you like to know?",
            timestamp: new Date(),
          },
        ]);
        console.log("Demo session initialized successfully"); // Debug log
      } else {
        console.error("Session creation failed:", data);
        alert("Failed to start demo. Please try again.");
      }
    } catch (error) {
      console.error("Error initializing demo:", error);
      // Fallback for offline mode or API issues
      alert(
        `Cannot connect to server: ${error.message}. Please check your connection and try again.`
      );
    } finally {
      setIsInitializing(false);
      console.log("Demo initialization completed, resetting state");
    }
  };

  // Handle file attachment
  const handleFileAttach = (event) => {
    const files = Array.from(event.target.files);
    const validFiles = files.filter((file) => {
      // Accept images and documents
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

    // Convert files to base64 for demo purposes
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

    event.target.value = ""; // Reset input
    setShowAttachMenu(false);
  };

  // Remove attached file
  const removeAttachedFile = (fileId) => {
    setAttachedFiles((prev) => prev.filter((file) => file.id !== fileId));
  };

  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  // Send message with attachments
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

    // Add user message to chat
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
        attachments: files.map((file) => ({
          name: file.name,
          type: file.type,
          data: file.data,
        })),
      };

      const response = await fetch("http://localhost:3001/api/demo/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      if (data.success) {
        // Add AI response to chat
        const aiMessage = {
          type: "ai",
          content: data.message,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, aiMessage]);
      } else {
        throw new Error(data.message);
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
    <section id="demo" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold mb-4">
            <Sparkles className="w-4 h-4 mr-2" />
            Try It Now
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Experience{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              AKBAR AI
            </span>{" "}
            Live
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-4">
            No signup required! Start chatting with our AI assistant right now
            and discover its capabilities firsthand.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-2xl mx-auto">
            <p className="text-sm text-blue-800">
              <strong>📁 File Upload Demo:</strong> You can upload images and
              documents! For best results with images, describe what you see or
              what you need help with.
            </p>
          </div>
        </div>

        {/* Demo Interface */}
        <div className="max-w-4xl mx-auto">
          {!showChat ? (
            /* Start Demo Button */
            <div className="text-center px-4">
              <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100 mx-auto max-w-lg">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <MessageSquare className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                  Ready to chat with AKBAR AI?
                </h3>
                <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">
                  Start a conversation and see how our AI can help you with
                  questions, creative tasks, and problem-solving.
                </p>
                <button
                  onClick={initializeDemo}
                  onTouchStart={(e) => {
                    // Handle touch start for mobile
                    console.log("Touch started on demo button");
                  }}
                  onTouchEnd={initializeDemo}
                  type="button"
                  disabled={isInitializing}
                  className={`bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 active:from-blue-800 active:to-indigo-800 disabled:from-gray-400 disabled:to-gray-500 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95 disabled:scale-100 flex items-center justify-center space-x-2 mx-auto cursor-pointer touch-manipulation w-auto min-w-[200px] sm:w-auto ${
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
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin flex-shrink-0"></div>
                      <span className="whitespace-nowrap">Starting...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 flex-shrink-0" />
                      <span className="whitespace-nowrap">Start Demo Chat</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : (
            /* Chat Interface */
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              {/* Chat Header */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">AKBAR AI Demo</h3>
                    <p className="text-blue-100 text-sm">
                      Free demo • No registration required
                    </p>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="h-96 overflow-y-auto p-6 space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex items-start space-x-3 ${
                      message.type === "user" ? "justify-end" : ""
                    }`}
                  >
                    {message.type === "ai" && (
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                    )}
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                        message.type === "user"
                          ? "bg-blue-600 text-white ml-auto"
                          : "bg-gray-100 text-gray-900"
                      }`}
                    >
                      {message.type === "user" ? (
                        <div>
                          {message.content && (
                            <p className="text-sm mb-2">{message.content}</p>
                          )}
                          {message.attachments &&
                            message.attachments.length > 0 && (
                              <div className="space-y-2">
                                {message.attachments.map((file, idx) => (
                                  <div
                                    key={idx}
                                    className="bg-white/20 rounded-lg p-2"
                                  >
                                    {file.isImage ? (
                                      <div>
                                        <img
                                          src={file.data}
                                          alt={file.name}
                                          className="max-w-full h-auto rounded mb-1"
                                          style={{ maxHeight: "200px" }}
                                        />
                                        <p className="text-xs opacity-80">
                                          {file.name}
                                        </p>
                                      </div>
                                    ) : (
                                      <div className="flex items-center space-x-2">
                                        <FileText className="w-4 h-4" />
                                        <div>
                                          <p className="text-xs font-medium">
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
                          <ReactMarkdown components={markdownComponents}>
                            {message.content}
                          </ReactMarkdown>
                        </div>
                      )}
                    </div>
                    {message.type === "user" && (
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="w-4 h-4 text-gray-600" />
                      </div>
                    )}
                  </div>
                ))}
                {isLoading && (
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-gray-100 px-4 py-3 rounded-2xl">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="border-t border-gray-200 p-6">
                {/* File attachments preview */}
                {attachedFiles.length > 0 && (
                  <div className="mb-4 flex flex-wrap gap-2">
                    {attachedFiles.map((file) => (
                      <div
                        key={file.id}
                        className="relative bg-gray-100 rounded-lg p-2 max-w-xs"
                      >
                        {file.isImage ? (
                          <div className="relative">
                            <img
                              src={file.data}
                              alt={file.name}
                              className="max-w-full h-auto rounded"
                              style={{ maxHeight: "80px" }}
                            />
                            <button
                              onClick={() => removeAttachedFile(file.id)}
                              className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-2">
                            <FileText className="w-4 h-4 text-gray-500 flex-shrink-0" />
                            <div className="min-w-0 flex-1">
                              <p className="text-xs font-medium text-gray-700 truncate">
                                {file.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                {formatFileSize(file.size)}
                              </p>
                            </div>
                            <button
                              onClick={() => removeAttachedFile(file.id)}
                              className="bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs hover:bg-red-600 flex-shrink-0"
                            >
                              <X className="w-2 h-2" />
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex space-x-2">
                  {/* Attachment button */}
                  <div className="relative attachment-menu">
                    <button
                      onClick={() => setShowAttachMenu(!showAttachMenu)}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-600 p-3 rounded-xl transition-colors duration-200 flex-shrink-0"
                      disabled={isLoading}
                    >
                      <Paperclip className="w-5 h-5" />
                    </button>

                    {/* Attachment menu */}
                    {showAttachMenu && (
                      <div className="absolute bottom-full mb-2 left-0 bg-white border border-gray-200 rounded-lg shadow-lg py-2 min-w-[160px] z-10">
                        <button
                          onClick={() => {
                            fileInputRef.current?.click();
                            setShowAttachMenu(false);
                          }}
                          className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-50 w-full text-left"
                        >
                          <Image className="w-4 h-4" />
                          <span className="text-sm">Upload Image</span>
                        </button>
                        <button
                          onClick={() => {
                            fileInputRef.current?.click();
                            setShowAttachMenu(false);
                          }}
                          className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-50 w-full text-left"
                        >
                          <FileText className="w-4 h-4" />
                          <span className="text-sm">Upload Document</span>
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
                    className="flex-1 border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={isLoading}
                  />
                  <button
                    onClick={sendMessage}
                    disabled={
                      (!inputMessage.trim() && attachedFiles.length === 0) ||
                      isLoading
                    }
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white p-3 rounded-xl transition-colors duration-200 flex-shrink-0"
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

                <p className="text-xs text-gray-500 mt-2 text-center">
                  This is a demo. Messages and files are not saved permanently.
                  Supports images, PDFs, and documents.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default DemoSection;
