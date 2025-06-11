import { CheckCircle, TrendingUp, Award } from "lucide-react";
import Image from "next/image";
import { IUser } from "@/interfaces";

interface UserCardProps {
  user: IUser;
  onClick: () => void;
  isSelected?: boolean;
  isHighlighted?: boolean;
  compact?: boolean;
}

export default function TalentCard({
  user,
  onClick,
  isSelected = false,
  isHighlighted = false,
  compact = false,
}: UserCardProps) {
  const rankInfo = getPageRankLevel(user.pageRank);

  if (compact) {
    return (
      <div
        onClick={onClick}
        className={`bg-white/80 backdrop-blur-sm rounded-lg p-3 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer border-2 group ${
          isSelected
            ? "border-blue-500 bg-blue-50/80"
            : isHighlighted
            ? "border-yellow-400 bg-yellow-50/80 ring-1 ring-yellow-200"
            : "border-white/20 hover:border-blue-200"
        }`}
      >
        <div className="flex items-center space-x-3">
          <div className="relative flex-shrink-0">
            <Image
              src={user.imageUrl || "/placeholder.svg?height=40&width=40"}
              alt={user.name}
              className="w-10 h-10 rounded-lg object-cover ring-1 ring-white shadow-sm"
              width={40}
              height={40}
            />
            {user.verified && (
              <CheckCircle className="w-4 h-4 text-blue-500 absolute -bottom-1 -right-1 bg-white rounded-full" />
            )}
            {isHighlighted && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h3
              className={`text-sm font-semibold truncate transition-colors ${
                isSelected
                  ? "text-blue-700"
                  : "text-gray-900 group-hover:text-blue-600"
              }`}
            >
              {user.name}
            </h3>
            <p className="text-xs text-gray-500 truncate">
              {user.professionalHeadline}
            </p>

            <div className="flex items-center justify-between mt-1">
              <div
                className={`px-2 py-0.5 rounded-full text-xs font-medium ${getCompletionColor(
                  user.completion
                )}`}
              >
                {Math.round(user.completion * 100)}%
              </div>
              <div
                className={`w-2 h-2 rounded-full ${
                  user.isSearchable ? "bg-green-400" : "bg-gray-400"
                }`}
              ></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      className={`bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer border-2 group ${
        isSelected
          ? "border-blue-500 bg-blue-50/80"
          : isHighlighted
          ? "border-yellow-400 bg-yellow-50/80 ring-2 ring-yellow-200"
          : "border-white/20 hover:border-blue-200"
      }`}
    >
      {/* ... rest of the original card content remains the same ... */}
      <div className="flex items-start space-x-4">
        <div className="relative flex-shrink-0">
          <Image
            src={user.imageUrl || "/placeholder.svg?height=60&width=60"}
            alt={user.name}
            className="w-14 h-14 rounded-xl object-cover ring-2 ring-white shadow-sm"
          />
          {user.verified && (
            <CheckCircle className="w-5 h-5 text-blue-500 absolute -bottom-1 -right-1 bg-white rounded-full" />
          )}
          {isHighlighted && (
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full animate-pulse"></div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <h3
                className={`text-lg font-semibold truncate transition-colors ${
                  isSelected
                    ? "text-blue-700"
                    : "text-gray-900 group-hover:text-blue-600"
                }`}
              >
                {user.name}
              </h3>
              <p className="text-sm text-gray-500 mb-1">@{user.username}</p>
            </div>

            <div className="flex items-center space-x-1 ml-2">
              {user.totalStrength > 0 && (
                <div className="flex items-center">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span className="text-xs text-green-600 ml-1">
                    {user.totalStrength.toFixed(1)}
                  </span>
                </div>
              )}
            </div>
          </div>

          <p className="text-sm text-gray-700 mb-3 line-clamp-2 font-medium">
            {user.professionalHeadline}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {/* Profile Completion */}
              <div
                className={`px-2 py-1 rounded-full text-xs font-medium ${getCompletionColor(
                  user.completion
                )}`}
              >
                {Math.round(user.completion * 100)}% Complete
              </div>

              {/* Page Rank */}
              <div
                className={`px-2 py-1 rounded-full text-xs font-medium ${rankInfo.color}`}
              >
                <Award className="w-3 h-3 inline mr-1" />
                {rankInfo.level}
              </div>
            </div>

            <div className="text-xs text-gray-500">ID: {user.ggId}</div>
          </div>

          {/* Connection indicator */}
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
            <div className="flex items-center space-x-2">
              <div
                className={`w-2 h-2 rounded-full ${
                  user.isSearchable ? "bg-green-400" : "bg-gray-400"
                }`}
              ></div>
              <span className="text-xs text-gray-500">
                {user.isSearchable ? "Available" : "Not Available"}
              </span>
            </div>

            {user.relationDegree && (
              <span className="text-xs text-gray-500">
                {user.relationDegree}° connection
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const getCompletionColor = (completion: number) => {
  if (completion >= 0.8) return "text-green-600 bg-green-100";
  if (completion >= 0.6) return "text-yellow-600 bg-yellow-100";
  return "text-red-600 bg-red-100";
};

const getPageRankLevel = (pageRank: number) => {
  if (pageRank >= 2)
    return { level: "High", color: "text-purple-600 bg-purple-100" };
  if (pageRank >= 1)
    return { level: "Medium", color: "text-blue-600 bg-blue-100" };
  return { level: "Low", color: "text-gray-600 bg-gray-100" };
};
