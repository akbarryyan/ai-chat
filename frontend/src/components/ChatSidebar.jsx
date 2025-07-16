import React from "react";
import { useAuth } from "../contexts/AuthContext";
import {
  User,
  LogOut,
  MessageSquare,
  Trash2,
  Plus,
  X,
  Clock,
  Hash,
} from "lucide-react";

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
    <>
      {/* Mobile Overlay */}
      {showSidebar && (
        <div
          className="fixed inset-0 bg-gray-400 bg-opacity-50 z-40 lg:hidden"
          onClick={() => setShowSidebar(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:relative inset-y-0 left-0 z-50 w-80 bg-gradient-to-b from-gray-50 to-white border-r border-gray-200 flex flex-col overflow-hidden shadow-lg transform transition-transform duration-300 lg:translate-x-0 ${
          showSidebar ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="p-4 border-b border-gray-200 bg-white">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">Riwayat Chat</h2>
            <button
              onClick={() => setShowSidebar(false)}
              className="lg:hidden p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <button
            onClick={onStartNewChat}
            className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 font-medium"
          >
            <Plus className="w-4 h-4 mr-2" />
            Chat Baru
          </button>
        </div>

        {/* Sessions List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {sessions.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-8 h-8 text-blue-500" />
              </div>
              <p className="text-sm font-medium text-gray-600 mb-1">
                Belum ada percakapan
              </p>
              <p className="text-xs text-gray-400">
                Mulai chat baru untuk memulai!
              </p>
            </div>
          ) : (
            sessions.map((session) => (
              <div
                key={session.id}
                className={`group p-4 rounded-xl border transition-all duration-200 cursor-pointer hover:shadow-md ${
                  currentSessionId === session.id
                    ? "bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200 shadow-md"
                    : "bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300"
                }`}
                onClick={() => onLoadSession(session.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-gray-900 truncate mb-2">
                      {session.title}
                    </div>
                    <div className="flex items-center text-xs text-gray-500 mb-2 space-x-3">
                      <div className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {formatTimestamp(session.updated_at)}
                      </div>
                      <div className="flex items-center">
                        <Hash className="w-3 h-3 mr-1" />
                        {session.message_count} pesan
                      </div>
                    </div>
                    {session.last_message && (
                      <div className="text-xs text-gray-400 truncate bg-gray-50 p-2 rounded-lg">
                        {session.last_message}
                      </div>
                    )}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteSession(session.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* User Info */}
        <div className="p-4 border-t border-gray-200 bg-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-sm">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-gray-900 truncate">
                  {user?.username}
                </div>
                <div className="text-xs text-gray-500">Premium User</div>
              </div>
            </div>
            <button
              onClick={logout}
              className="p-2.5 text-gray-400 hover:text-red-500 transition-colors rounded-xl hover:bg-gray-100 hover:shadow-sm"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatSidebar;
