"use server";

import { adminDb } from "@/lib/firebase-admin";
import { User } from "@/types/firestore";
import { getFriendshipId } from "@/utils/username-util";
import { revalidateTag } from "next/cache";

// import { QuerySnapshot } from "firebase-admin/firestore";
// import { DecodedIdToken } from "firebase-admin/auth";
// import { App, Content, Term } from "@/types/firestore";
// import { revalidateTag } from "next/cache";

// export const updateAppInfo = async (id: string, data: Partial<App>) => {
//   const snapshot = await adminDb.collection("apps").doc(id).get();

//   if (snapshot.exists) {
//     await snapshot.ref.update(data);
//   } else {
//     await snapshot.ref.set(data);
//   }
//   revalidateTag("apps");
// };

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
export const getFriendsAndRequests = async (
  userId: string | undefined
): Promise<{
  friends: User[];
  pendingRequests: {
    id: string;
    user: User;
    requestedBy: string;
    requestedAt: Date;
  }[];
}> => {
  if (!userId) {
    console.log("No userId provided");
    return { friends: [], pendingRequests: [] };
  }

  const friendshipsSnapshot = await adminDb
    .collection("friendships")
    .where("users", "array-contains", userId)
    .get();

  const friends: User[] = [];
  const pendingRequests: {
    id: string;
    user: User;
    requestedBy: string;
    requestedAt: Date;
  }[] = [];

  for (const doc of friendshipsSnapshot.docs) {
    const friendship = doc.data();
    console.log("Processing friendship:", friendship);

    const otherUserId = friendship.users.find((id: string) => id !== userId);

    if (!otherUserId) {
      console.log("No other user found in friendship:", friendship);
      continue;
    }

    if (friendship.status === "accepted") {
      try {
        const friendUser = await getUserInfo(otherUserId);
        friends.push(friendUser);
      } catch (error) {
        console.error("Error fetching friend user info:", error);
      }
    } else if (
      friendship.status === "pending" &&
      friendship.requestedBy !== userId
    ) {
      try {
        const requestingUser = await getUserInfo(otherUserId);

        console.log({ requestingUser });
        pendingRequests.push({
          id: doc.id,
          user: requestingUser,
          requestedBy: friendship.requestedBy,
          requestedAt: friendship.requestedAt.toDate(),
        });
      } catch (error) {
        console.error("Error fetching requesting user info:", error);
      }
    }
  }

  console.log("Returning friends and requests:", { friends, pendingRequests });
  return { friends, pendingRequests };
};
