import React from "react";
import { Menu, MessageSquare } from "lucide-react";

const ChatHeader = ({ onToggleSidebar }) => {
  return (
    <div className="p-4 border-b border-gray-200 bg-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <MessageSquare className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-gray-900">
              AI Assistant
            </h1>
            <p className="text-sm text-gray-500">How can I help you today?</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
