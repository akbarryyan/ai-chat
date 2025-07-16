import React from "react";
import { Send, Paperclip, Smile } from "lucide-react";

const ChatInput = ({ input, setInput, onSendMessage, loading }) => {
  return (
    <div className="p-4 border-t border-gray-200 bg-white shadow-lg">
      <form onSubmit={onSendMessage} className="flex items-end space-x-3">
        <div className="flex-1 relative">
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ketik pesan Anda di sini..."
              className="w-full p-4 pr-12 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none shadow-sm bg-gray-50 focus:bg-white"
              disabled={loading}
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
              <button
                type="button"
                className="p-1.5 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
                disabled={loading}
              >
                <Paperclip className="w-4 h-4" />
              </button>
              <button
                type="button"
                className="p-1.5 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
                disabled={loading}
              >
                <Smile className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <Send className="w-5 h-5" />
          )}
        </button>
      </form>
      <div className="mt-2 text-xs text-gray-500 text-center">
        Tekan Enter untuk mengirim • Powered by AKBAR AI
      </div>
    </div>
  );
};

export default ChatInput;
