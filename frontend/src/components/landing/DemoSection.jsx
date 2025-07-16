import React, { useState, useEffect, useRef } from "react";
import { Send, Bot, User, Sparkles, MessageSquare } from "lucide-react";

const DemoSection = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sessionToken, setSessionToken] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize demo session
  const initializeDemo = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/demo/session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (data.success) {
        setSessionToken(data.sessionToken);
        setShowChat(true);
        // Add welcome message
        setMessages([
          {
            type: "ai",
            content:
              "Hello! 👋 Welcome to AKBAR AI Demo. I'm here to help you with questions, provide information, and showcase my capabilities. What would you like to know?",
            timestamp: new Date(),
          },
        ]);
      }
    } catch (error) {
      console.error("Error initializing demo:", error);
    }
  };

  // Send message
  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading || !sessionToken) return;

    const userMessage = inputMessage.trim();
    setInputMessage("");
    setIsLoading(true);

    // Add user message to chat
    const newUserMessage = {
      type: "user",
      content: userMessage,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newUserMessage]);

    try {
      const response = await fetch("http://localhost:3001/api/demo/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sessionToken,
          message: userMessage,
        }),
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
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            No signup required! Start chatting with our AI assistant right now
            and discover its capabilities firsthand.
          </p>
        </div>

        {/* Demo Interface */}
        <div className="max-w-4xl mx-auto">
          {!showChat ? (
            /* Start Demo Button */
            <div className="text-center">
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <MessageSquare className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Ready to chat with AKBAR AI?
                </h3>
                <p className="text-gray-600 mb-8 max-w-lg mx-auto">
                  Start a conversation and see how our AI can help you with
                  questions, creative tasks, and problem-solving.
                </p>
                <button
                  onClick={initializeDemo}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center space-x-2 mx-auto"
                >
                  <Sparkles className="w-5 h-5" />
                  <span>Start Demo Chat</span>
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
                      <p className="text-sm">{message.content}</p>
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
                <div className="flex space-x-4">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="flex-1 border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={isLoading}
                  />
                  <button
                    onClick={sendMessage}
                    disabled={!inputMessage.trim() || isLoading}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white p-3 rounded-xl transition-colors duration-200"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  This is a demo. Messages are not saved permanently.
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
