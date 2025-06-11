import { IUser } from "@/interfaces";
import { fetchUsers } from "@/services/users";
import { useCallback, useState } from "react";

export default function useTalentExplorer(
  initialUsers: IUser[],
  initialSelectedUser: IUser | null,
  initialShowChat: boolean
) {
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState<IUser[]>(initialUsers);
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(
    initialSelectedUser
  );
  const [showChat, setShowChat] = useState(initialShowChat);
  const [hasSearched, setHasSearched] = useState(true); // Set to true since we have initial data
  const [highlightedUsers, setHighlightedUsers] = useState<string[]>([]);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const searchUsers = useCallback(async (query: string) => {
    if (!query.trim()) return;

    setLoading(true);
    setHasSearched(true);
    setUsers([]);

    try {
      const data = await fetchUsers(query);

      if (!data) {
        throw new Error("Failed to fetch data");
      }

      // Handle streaming NDJSON response
      const reader = data.getReader();
      const decoder = new TextDecoder();
      const newUsers: IUser[] = [];

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.trim().split("\n");

        for (const line of lines) {
          if (line.trim()) {
            try {
              const parsed = JSON.parse(line);
              if (parsed.ardaId) {
                newUsers.push(parsed);
                setUsers([...newUsers]); // Update state with each new user
                if (newUsers.length === 1) {
                  setSelectedUser(parsed); // Select first user as they come in
                }
              }
            } catch (error) {
              console.warn("Skipping invalid JSON line:", line, error);
            }
          }
        }
      }
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      searchUsers(searchQuery);
    },
    [searchUsers, searchQuery]
  );

  const handleUserClick = useCallback((user: IUser) => {
    setSelectedUser(user);
  }, []);

  const handleChatUserHighlight = useCallback(
    (usernames: string[]) => {
      setHighlightedUsers(usernames);
      // Auto-select the first highlighted user if available
      const firstHighlighted = users.find((user) =>
        usernames.includes(user.username)
      );
      if (firstHighlighted) {
        setSelectedUser(firstHighlighted);
      }
    },
    [users]
  );

  return {
    handleChatUserHighlight,
    handleSearch,
    handleUserClick,
    searchQuery,
    users,
    loading,
    selectedUser,
    setSearchQuery,
    setSelectedUser,
    setShowChat,
    setHasSearched,
    setHighlightedUsers,
    setSidebarCollapsed,
    showChat,
    hasSearched,
    highlightedUsers,
    sidebarCollapsed,
  };
}
