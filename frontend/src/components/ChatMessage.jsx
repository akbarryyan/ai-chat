import React from "react";
import { User, Bot } from "lucide-react";

const ChatMessage = ({ message }) => {
  return (
    <div
      className={`flex ${
        message.role === "user" ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`flex items-start space-x-3 max-w-3xl ${
          message.role === "user" ? "flex-row-reverse space-x-reverse" : ""
        }`}
      >
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
            message.role === "user" ? "bg-blue-100" : "bg-gray-100"
          }`}
        >
          {message.role === "user" ? (
            <User className="w-4 h-4 text-blue-600" />
          ) : (
            <Bot className="w-4 h-4 text-gray-600" />
          )}
        </div>
        <div
          className={`p-4 rounded-lg ${
            message.role === "user"
              ? "bg-blue-600 text-white"
              : "bg-white border border-gray-200 text-gray-900"
          }`}
        >
          <p className="whitespace-pre-wrap">{message.content}</p>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
