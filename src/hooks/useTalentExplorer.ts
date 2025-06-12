import { useUserContext } from "@/context/userContext";
import { IUser } from "@/interfaces";
import { fetchUsers } from "@/services/users";
import { useCallback, useState, useRef, useEffect } from "react";

export default function useTalentExplorer(
  initialUsers: IUser[],
  initialSelectedUser: IUser | null,
  initialShowChat: boolean
) {
  const [searchQuery, setSearchQuery] = useState("");
  const { users, setUsers } = useUserContext();

  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(
    initialSelectedUser
  );
  const [showChat, setShowChat] = useState(initialShowChat);
  const [hasSearched, setHasSearched] = useState(true);
  const [highlightedUsers, setHighlightedUsers] = useState<string[]>([]);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const usersRef = useRef<IUser[]>(initialUsers);
  usersRef.current = users;

  const searchUsers = useCallback(
    async (query: string) => {
      if (!query.trim()) return;

      setLoading(true);
      setHasSearched(true);
      setUsers([]);

      try {
        const data = await fetchUsers(query);

        if (!data) {
          throw new Error("Failed to fetch data");
        }

        for (const user of data) {
          try {
            if (user.ardaId) {
              setUsers((prevUsers) => [...prevUsers, user]);
              if (data.length === 1) {
                setSelectedUser(user);
              }
            }
          } catch (error) {
            console.warn("Skipping invalid JSON line:", user, error);
          }
        }
      } catch (error) {
        console.error("Search failed:", error);
      } finally {
        setLoading(false);
      }
    },
    [setUsers]
  );

  useEffect(() => {
    setUsers(initialUsers);
  }, [initialUsers, setUsers]);

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

  const handleChatUserHighlight = useCallback((usernames: string[]) => {
    setHighlightedUsers(usernames);
    const firstHighlighted = usersRef.current.find((user) =>
      usernames.includes(user.username)
    );
    if (firstHighlighted) {
      setSelectedUser(firstHighlighted);
    }
  }, []);

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
