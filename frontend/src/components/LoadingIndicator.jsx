import React from "react";
import { Bot } from "lucide-react";

const LoadingIndicator = () => {
  return (
    <div className="flex justify-start">
      <div className="flex items-start space-x-3 max-w-3xl">
        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
          <Bot className="w-4 h-4 text-gray-600" />
        </div>
        <div className="bg-white border border-gray-200 p-4 rounded-lg">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
            <div
              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
              style={{ animationDelay: "0.1s" }}
            ></div>
            <div
              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingIndicator;
