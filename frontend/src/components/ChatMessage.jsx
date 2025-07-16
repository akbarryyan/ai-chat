import React from "react";
import { User, Bot, Sparkles } from "lucide-react";

const ChatMessage = ({ message }) => {
  const getModelBadge = (usedModel, requestedModel) => {
    if (!usedModel) return null;

    const models = {
      chatgpt4: {
        label: "ChatGPT-4",
        icon: "🤖",
        color: "bg-green-100 text-green-800",
      },
      gemini: {
        label: "Gemini",
        icon: "🤯",
        color: "bg-purple-100 text-purple-800",
      },
      claude: {
        label: "Claude",
        icon: "🧠",
        color: "bg-orange-100 text-orange-800",
      },
      akbxr: { label: "AKBXR", icon: "🔶", color: "bg-blue-100 text-blue-800" },
      error: { label: "Error", icon: "⚠️", color: "bg-red-100 text-red-800" },
    };

    const model = models[usedModel] || models.error;
    const isFallback = requestedModel && requestedModel !== usedModel;

    return (
      <div className="mb-2 flex items-center space-x-1">
        <span
          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${model.color}`}
        >
          <span className="mr-1">{model.icon}</span>
          {model.label}
        </span>
        {isFallback && (
          <span className="text-xs text-gray-500">
            (fallback dari {models[requestedModel]?.label || requestedModel})
          </span>
        )}
      </div>
    );
  };

  return (
    <div
      className={`flex ${
        message.role === "user" ? "justify-end" : "justify-start"
      } mb-6`}
    >
      <div
        className={`flex items-start space-x-3 max-w-4xl ${
          message.role === "user" ? "flex-row-reverse space-x-reverse" : ""
        }`}
      >
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm ${
            message.role === "user"
              ? "bg-gradient-to-r from-blue-500 to-blue-600"
              : "bg-gradient-to-r from-purple-500 to-indigo-600"
          }`}
        >
          {message.role === "user" ? (
            <User className="w-5 h-5 text-white" />
          ) : (
            <Sparkles className="w-5 h-5 text-white" />
          )}
        </div>
        <div
          className={`p-4 rounded-2xl shadow-sm ${
            message.role === "user"
              ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white max-w-md"
              : "bg-white border border-gray-200 text-gray-800 shadow-md"
          }`}
        >
          {/* Model badge for AI messages */}
          {message.role === "assistant" &&
            (message.usedModel || message.requestedModel) &&
            getModelBadge(message.usedModel, message.requestedModel)}

          <p className="whitespace-pre-wrap leading-relaxed text-sm md:text-base">
            {message.content}
          </p>
          <div
            className={`text-xs mt-2 ${
              message.role === "user" ? "text-blue-100" : "text-gray-400"
            }`}
          >
            {new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
