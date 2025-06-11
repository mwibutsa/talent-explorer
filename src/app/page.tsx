import { Suspense } from "react";
import TalentExplorer from "@/components/TalentExplorer";
import { IUser } from "@/interfaces";

// Server component that fetches initial data
async function getInitialTalents(): Promise<{
  users: IUser[];
  initialUser: IUser | null;
}> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/api/users`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: "mwibutsa",
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Handle streaming NDJSON response
    const text = await response.text();
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
          // Skip invalid JSON lines
          console.warn("Skipping invalid JSON line:", line, error);
        }
      }
    }

    // Find initial user (mwibutsa) or use first user
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

// Loading component for suspense
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

// Server component wrapper
async function TalentExplorerServer() {
  const { users, initialUser } = await getInitialTalents();

  return (
    <TalentExplorer initialUsers={users} initialSelectedUser={initialUser} />
  );
}

// Main page component (Server Component)
export default function TalentExplorerPage() {
  return (
    <Suspense fallback={<TalentExplorerLoading />}>
      <TalentExplorerServer />
    </Suspense>
  );
}
