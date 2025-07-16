import React from "react";
import { Menu, MessageSquare, Sparkles } from "lucide-react";

const ChatHeader = ({ onToggleSidebar }) => {
  return (
    <div className="p-4 border-b border-gray-200 bg-white shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-sm">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AKBAR AI Assistant
            </h1>
            <p className="text-sm text-gray-500 font-medium">
              Siap membantu Anda hari ini
            </p>
          </div>
        </div>
        <div className="hidden md:flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-xs text-gray-500 font-medium">Online</span>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
