import React from "react";
import { MessageSquare } from "lucide-react";

const WelcomeScreen = () => {
  return (
    <div className="text-center py-12">
      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <MessageSquare className="w-8 h-8 text-blue-600" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        Welcome to AI Chat Assistant
      </h3>
      <p className="text-gray-500">
        Start a conversation by typing a message below
      </p>
    </div>
  );
};

export default WelcomeScreen;
