"use client";

import { useState, useEffect } from "react";
import TalentExplorer from "@/components/TalentExplorer";
import { IUser } from "@/interfaces";
import apiCall from "@/utils/apiCall";

async function getInitialTalents(): Promise<{
  users: IUser[];
  initialUser: IUser | null;
}> {
  try {
    const { data: text } = await apiCall.post(
      "/api/users",
      {
        query: "mwibutsa",
      },
      {
        responseType: "text",
      }
    );

    const lines = text.trim().split("\n");
    const users: IUser[] = [];

    for (const line of lines) {
      if (line.trim()) {
        try {
          const parsed = JSON.parse(line);
          if (parsed.ardaId) {
            users.push(parsed);
          }
        } catch (error) {
          console.warn("Skipping invalid JSON line:", line, error);
        }
      }
    }

    const initialUser =
      users.find(
        (user: IUser) =>
          user.username.toLowerCase().includes("mwibutsa") ||
          user.name.toLowerCase().includes("mwibutsa")
      ) ||
      users[0] ||
      null;

    return { users, initialUser };
  } catch (error) {
    console.error("Failed to fetch initial talents:", error);
    return { users: [], initialUser: null };
  }
}

function TalentExplorerLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <main className="px-4 sm:px-6 lg:px-8 py-8">
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
          <div className="max-w-2xl mx-auto">
            <div className="animate-pulse">
              <div className="h-16 bg-gray-200 rounded-2xl"></div>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </main>
    </div>
  );
}

export default function TalentExplorerPage() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [initialUser, setInitialUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { users, initialUser } = await getInitialTalents();
        setUsers(users);
        setInitialUser(initialUser);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <TalentExplorerLoading />;
  }

  return (
    <TalentExplorer initialUsers={users} initialSelectedUser={initialUser} />
  );
}
