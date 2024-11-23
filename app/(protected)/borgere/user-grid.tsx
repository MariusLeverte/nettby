"use client";

import { useState } from "react";
import { ProfileCard } from "@/components/profile-card";
import { User } from "@/types/firestore";

interface UserGridProps {
  initialUsers: User[];
  initialHasMore: boolean;
}

export const UserGrid = ({ initialUsers, initialHasMore }: UserGridProps) => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [loading, setLoading] = useState(false);

  const loadMore = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const lastUserId = users[users.length - 1].id;
      const response = await fetch(`/borgere?lastUserId=${lastUserId}`);
      const data = await response.json();

      setUsers((prev) => [...prev, ...data.users]);
      setHasMore(data.hasMore);
    } catch (error) {
      console.error("Failed to load more users:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {users.map((user) => (
          <ProfileCard
            key={user.id}
            profileUrl={user.profileUrl}
            userName={`${user.firstName} ${user.lastName}`}
            // status={user.status}
          />
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-8 mb-8">
          <button
            onClick={loadMore}
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
};
