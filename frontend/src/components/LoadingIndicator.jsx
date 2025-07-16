import React from "react";
import { Sparkles } from "lucide-react";

const LoadingIndicator = () => {
  return (
    <div className="flex justify-start mb-6">
      <div className="flex items-start space-x-3 max-w-4xl">
        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full flex items-center justify-center shadow-sm">
          <Sparkles className="w-5 h-5 text-white animate-pulse" />
        </div>
        <div className="bg-white border border-gray-200 p-4 rounded-2xl shadow-md">
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-bounce"></div>
              <div
                className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-bounce"
                style={{ animationDelay: "0.1s" }}
              ></div>
              <div
                className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}
              ></div>
            </div>
            <span className="text-sm text-gray-500 ml-2 animate-pulse">
              AKBAR AI sedang mengetik...
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingIndicator;
