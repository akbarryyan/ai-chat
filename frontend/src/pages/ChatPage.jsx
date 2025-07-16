import React, { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";

// Import modular components
import {
  ChatSidebar,
  ChatHeader,
  ChatMessage,
  LoadingIndicator,
  ChatInput,
  WelcomeScreen,
  AiModelSelector,
} from "../components";

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [currentSessionId, setCurrentSessionId] = useState(null);
  const [selectedAiModel, setSelectedAiModel] = useState("akbxr"); // AI model selection
  const messagesEndRef = useRef(null);
  const { user, logout } = useAuth();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Only load sessions when user is authenticated and ready
    if (user) {
      loadChatSessions();
    }
  }, [user]);

  const loadChatSessions = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/chat/sessions"
      );
      setSessions(response.data);
    } catch (error) {
      console.error("Failed to load chat sessions:", error);

      // Silent fail for user experience - no error toasts for loading sessions
      // New users or auth issues should not see error messages
      setSessions([]);
    }
  };

  const loadSessionHistory = async (sessionId) => {
    try {
      // Add delay for better UX
      const [response] = await Promise.all([
        axios.get(`http://localhost:3001/api/chat/history/${sessionId}`),
        new Promise((resolve) => setTimeout(resolve, 400)), // 0.4 second delay
      ]);

      const history = response.data;

      const formattedMessages = [];
      history.forEach((chat) => {
        formattedMessages.push({ role: "user", content: chat.user_message });
        formattedMessages.push({
          role: "assistant",
          content: chat.ai_reply,
          // Note: Historical messages may not have model info
          usedModel: chat.used_model || "akbxr",
          requestedModel: chat.requested_model,
        });
      });

      setMessages(formattedMessages);
      setCurrentSessionId(sessionId);
      setShowSidebar(false);

      // Show session loaded toast with delay
      const sessionTitle =
        sessions.find((s) => s.id === sessionId)?.title || "Chat";
      setTimeout(() => {
        toast.success(`Loaded: ${sessionTitle}`);
      }, 200);
    } catch (error) {
      console.error("Failed to load session history:", error);
      toast.error("Failed to load chat history");
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput("");
    setLoading(true);

    // Add user message to chat
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);

    try {
      // Add minimum delay for better UX
      const [response] = await Promise.all([
        axios.post("http://localhost:3001/api/chat", {
          message: userMessage,
          sessionId: currentSessionId,
          aiModel: selectedAiModel, // Include selected AI model
        }),
        new Promise((resolve) => setTimeout(resolve, 800)), // 0.8 second delay
      ]);

      // Add AI response to chat
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: response.data.aiReply,
          usedModel: response.data.usedModel,
          requestedModel: response.data.requestedModel,
        },
      ]);

      // Update current session ID if it was a new session
      if (!currentSessionId) {
        setCurrentSessionId(response.data.sessionId);
        // Show new chat created toast with delay
        setTimeout(() => {
          toast.success("New chat session created!");
        }, 300);
      }

      // Reload sessions
      loadChatSessions();
    } catch (error) {
      console.error("Chat error:", error);
      toast.error("Failed to send message. Please try again.");
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const startNewChat = () => {
    setMessages([]);
    setCurrentSessionId(null);
    setShowSidebar(false);
    toast.success("Started new chat");
  };

  const deleteSession = async (sessionId) => {
    try {
      // Add delay for better UX
      const [_] = await Promise.all([
        axios.delete(`http://localhost:3001/api/chat/sessions/${sessionId}`),
        new Promise((resolve) => setTimeout(resolve, 600)), // 0.6 second delay
      ]);

      if (currentSessionId === sessionId) {
        startNewChat();
      }
      loadChatSessions();

      // Show success toast with delay
      setTimeout(() => {
        toast.success("Chat session deleted");
      }, 200);
    } catch (error) {
      console.error("Failed to delete session:", error);
      toast.error("Failed to delete session");
    }
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleDateString();
  };

  return (
    <div className="h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 flex">
      {/* Sidebar Component */}
      <ChatSidebar
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
        sessions={sessions}
        currentSessionId={currentSessionId}
        onLoadSession={loadSessionHistory}
        onStartNewChat={startNewChat}
        onDeleteSession={deleteSession}
        formatTimestamp={formatTimestamp}
      />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-white/50 backdrop-blur-sm lg:ml-0">
        {/* Header Component */}
        <ChatHeader onToggleSidebar={() => setShowSidebar(true)} />

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.length === 0 && <WelcomeScreen />}

          {messages.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}

          {loading && <LoadingIndicator />}

          <div ref={messagesEndRef} />
        </div>

        {/* AI Model Selector */}
        <AiModelSelector
          selectedModel={selectedAiModel}
          onModelChange={setSelectedAiModel}
          disabled={loading}
        />

        {/* Input Component */}
        <ChatInput
          input={input}
          setInput={setInput}
          onSendMessage={sendMessage}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default ChatPage;
