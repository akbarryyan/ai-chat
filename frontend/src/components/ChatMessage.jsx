import React from "react";
import { User, Bot, Sparkles } from "lucide-react";

const ChatMessage = ({ message }) => {
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
