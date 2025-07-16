import React from "react";
import { Menu, MessageSquare, Sparkles } from "lucide-react";

const ChatHeader = ({ onToggleSidebar }) => {
  return (
    <div className="px-3 py-3 sm:px-4 sm:py-4 border-b border-gray-200 bg-white shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-1.5 sm:p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-sm">
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="text-base sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent truncate">
              AKBAR AI Assistant
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 font-medium hidden sm:block">
              Siap membantu Anda hari ini
            </p>
            <p className="text-xs text-gray-400 sm:hidden">AI Assistant</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-xs text-gray-500 font-medium hidden sm:inline">
            Online
          </span>
          <span className="text-xs text-gray-500 font-medium sm:hidden">●</span>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
