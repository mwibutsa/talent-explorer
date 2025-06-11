"use client";

import type React from "react";
import {
  Search,
  Users,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import TalentCard from "@/components/TalentCard";
import TalentDetails from "@/components/TalentDetails";
import { IUser } from "@/interfaces";
import ChatBot from "@/components/Chatbot";
import useTalentExplorer from "@/hooks/useTalentExplorer";

interface TalentExplorerClientProps {
  initialUsers: IUser[];
  initialSelectedUser: IUser | null;
  initialShowChat?: boolean;
}

export default function TalentExplorer({
  initialUsers,
  initialSelectedUser,
  initialShowChat = false,
}: TalentExplorerClientProps) {
  const {
    handleChatUserHighlight,
    handleSearch,
    handleUserClick,
    searchQuery,
    users,
    loading,
    selectedUser,
    setSearchQuery,
    setShowChat,
    showChat,
    hasSearched,
    highlightedUsers,
    sidebarCollapsed,
    setSidebarCollapsed,
  } = useTalentExplorer(initialUsers, initialSelectedUser, initialShowChat);
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <main className="px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Section */}
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Find Your Next
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              {" "}
              Dream Team
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Search through millions of talented professionals and discover the
            perfect match for your project
          </p>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for talents by name, skills, or location..."
                className="w-full pl-12 pr-32 py-4 text-lg border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 backdrop-blur-sm shadow-lg"
              />
              <button
                type="submit"
                disabled={loading || !searchQuery.trim()}
                className="absolute right-2 top-2 bottom-2 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium"
              >
                {loading ? "Searching..." : "Search"}
              </button>
            </div>
          </form>
        </div>

        {/* Two Column Layout */}
        {hasSearched && (
          <div className="flex gap-4 h-[calc(100vh-300px)]">
            {/* Left Column - Search Results (Collapsible) */}
            <div
              className={`bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden transition-all duration-300 ${
                sidebarCollapsed ? "w-12" : "w-80"
              }`}
            >
              {/* Collapse Toggle */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                {!sidebarCollapsed && (
                  <h3 className="text-lg font-bold text-gray-900">
                    {loading ? "Searching..." : `Found ${users.length} talents`}
                  </h3>
                )}
                <button
                  onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  title={
                    sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"
                  }
                >
                  {sidebarCollapsed ? (
                    <ChevronRight className="w-5 h-5 text-gray-600" />
                  ) : (
                    <ChevronLeft className="w-5 h-5 text-gray-600" />
                  )}
                </button>
              </div>

              {!sidebarCollapsed && (
                <div className="p-4">
                  {loading && (
                    <div className="flex justify-center items-center py-12">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    </div>
                  )}

                  {!loading && users.length === 0 && (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Search className="w-8 h-8 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        No results found
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Try different search terms
                      </p>
                    </div>
                  )}

                  {users.length > 0 && (
                    <div className="space-y-3 overflow-y-auto max-h-[calc(100vh-450px)]">
                      {users.map((user) => (
                        <TalentCard
                          key={user.ardaId}
                          user={user}
                          onClick={() => handleUserClick(user)}
                          isSelected={selectedUser?.ardaId === user.ardaId}
                          isHighlighted={highlightedUsers.includes(
                            user.username
                          )}
                          compact={true}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Right Column - User Details (Expanded) */}
            <div className="flex-1 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
              {selectedUser ? (
                <TalentDetails user={selectedUser} />
              ) : (
                <div className="flex items-center justify-center h-full text-center p-8">
                  <div>
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="w-12 h-12 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Select a talent to view details
                    </h3>
                    <p className="text-gray-600">
                      Click on any talent from the search results to see their
                      full profile
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* ChatBot */}
      {showChat && (
        <ChatBot
          onClose={() => setShowChat(false)}
          onUserHighlight={handleChatUserHighlight}
          users={users}
        />
      )}

      {/* Floating Chat Toggle Button */}
      <button
        onClick={() => setShowChat(!showChat)}
        className="fixed bottom-6 right-6 p-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl z-30"
        title="Toggle AI Assistant"
      >
        <MessageCircle className="w-6 h-6" />
        <Sparkles className="w-4 h-4 absolute -top-1 -right-1 text-yellow-300" />
      </button>
    </div>
  );
}
