"use server";

import { adminDb } from "@/lib/firebase-admin";
import { Friendship, User } from "@/types/firestore";
import { chunkArray } from "@/utils/array";
import { getFriendshipId } from "@/utils/username-util";
import { revalidateTag } from "next/cache";

export const getUserInfo = async (id: string) => {
  const snapshot = await adminDb.collection("users").doc(id).get();

  if (snapshot.exists) {
    return { id: snapshot.id, ...snapshot.data() } as User;
  }

  throw new Error("User not found");
};

export const updateUserInfo = async (id: string, data: Partial<User>) => {
  const snapshot = await adminDb.collection("users").doc(id).get();

  if (snapshot.exists) {
    await snapshot.ref.update(data);
  } else {
    await snapshot.ref.set(data);
  }
  revalidateTag("users");
};

export const getUserBySlug = async (slug: string) => {
  const snapshot = await adminDb
    .collection("users")
    .where("slug", "==", slug)
    .limit(1)
    .get();

  if (snapshot.empty) {
    throw new Error("User not found");
  }

  return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() } as User;
};

export const sendFriendRequest = async (
  currentUserId: string | undefined,
  friendId: string
): Promise<void> => {
  if (!currentUserId) throw new Error("User not authenticated");

  const friendshipId = getFriendshipId(currentUserId, friendId);

  await adminDb
    .collection("friendships")
    .doc(friendshipId)
    .set({
      users: [currentUserId, friendId],
      status: "pending",
      requestedBy: currentUserId,
      requestedAt: new Date(),
    });
};

// Add type for friendshipId and export the function
export const acceptFriendRequest = async (
  friendshipId: string
): Promise<void> => {
  const friendshipRef = adminDb.collection("friendships").doc(friendshipId);
  await friendshipRef.update({ status: "accepted" });
  revalidateTag("friendships");
};

// Add type for friendshipId and export the function
export const removeFriend = async (friendshipId: string): Promise<void> => {
  await adminDb.collection("friendships").doc(friendshipId).delete();
  revalidateTag("friendships");
};

export const getFriendsAndRequests = async (userId: string) => {
  const friendshipsSnapshot = await adminDb
    .collection("friendships")
    .where("users", "array-contains", userId)
    .get();

  const friendships = friendshipsSnapshot.docs.map((doc) => {
    const data = { id: doc.id, ...doc.data() } as Friendship;
    return data;
  });

  const friendsUserIds = friendshipsSnapshot.docs.map((doc) => {
    const data = doc.data() as Friendship;

    return data.users.find((id: string) => id !== userId);
  });

  const chunkedIds = chunkArray(friendsUserIds, 30);

  const friendsSnapshots = chunkedIds.map((idsChunk) => {
    return adminDb.collection("users").where("__name__", "in", idsChunk).get();
  });

  const querySnapshots = await Promise.all(friendsSnapshots);

  const pendingRequests: {
    id: string;
    user: User;
    requestedBy: string;
    requestedAt: Date;
  }[] = [];
  const friends: User[] = [];

  for (const querySnapshot of querySnapshots) {
    querySnapshot.forEach(async (doc) => {
      const user = {
        id: doc.id,
        ...doc.data(),
      } as User;

      const friendship = friendships.find((f) => f.users.includes(user.id));
      if (friendship?.status === "accepted") {
        friends.push(user);
      } else if (friendship?.status === "pending") {
        pendingRequests.push({
          id: friendship.id,
          user,
          requestedBy: friendship.requestedBy,
          requestedAt: friendship.requestedAt,
        });
      }
    });
  }

  return { friends, pendingRequests };
};
