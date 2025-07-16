import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { User, LogOut, MessageSquare, Trash2, Plus, X } from "lucide-react";

const ChatSidebar = ({
  showSidebar,
  setShowSidebar,
  sessions,
  currentSessionId,
  onLoadSession,
  onStartNewChat,
  onDeleteSession,
  formatTimestamp,
}) => {
  const { user, logout } = useAuth();

  return (
    <div
      className={`${
        showSidebar ? "w-80" : "w-0"
      } lg:w-80 transition-all duration-300 bg-white border-r border-gray-200 flex flex-col overflow-hidden`}
    >
      {/* Sidebar Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Chat History</h2>
          <button
            onClick={() => setShowSidebar(false)}
            className="lg:hidden p-1 text-gray-400 hover:text-gray-600 rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <button
          onClick={onStartNewChat}
          className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Chat
        </button>
      </div>

      {/* Sessions List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {sessions.length === 0 ? (
          <div className="text-center py-8">
            <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-sm text-gray-500">No chat sessions yet</p>
            <p className="text-xs text-gray-400 mt-1">
              Start a new conversation!
            </p>
          </div>
        ) : (
          sessions.map((session) => (
            <div
              key={session.id}
              className={`group p-3 rounded-lg border transition-colors cursor-pointer ${
                currentSessionId === session.id
                  ? "bg-blue-50 border-blue-200"
                  : "bg-gray-50 border-gray-200 hover:bg-gray-100"
              }`}
              onClick={() => onLoadSession(session.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-900 truncate">
                    {session.title}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {formatTimestamp(session.updated_at)} •{" "}
                    {session.message_count} messages
                  </div>
                  {session.last_message && (
                    <div className="text-xs text-gray-400 mt-1 truncate">
                      {session.last_message}
                    </div>
                  )}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteSession(session.id);
                  }}
                  className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-red-500 transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* User Info */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-sm font-medium text-gray-900 truncate">
              {user?.username}
            </div>
          </div>
          <button
            onClick={logout}
            className="p-2 text-gray-400 hover:text-red-500 transition-colors rounded-lg hover:bg-gray-100"
            title="Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatSidebar;
