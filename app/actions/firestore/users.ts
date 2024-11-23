import { adminDb } from "@/lib/firebase-admin";
import { User } from "@/types/firestore";

export const getUsersCount = async () => {
  const snapshot = await adminDb.collection("users").get();
  return snapshot.size;
};

export async function getAllUsers(
  pageSize: number = 20,
  lastUserId?: string
): Promise<{ users: User[]; hasMore: boolean }> {
  // Start with the base query
  let query = adminDb
    .collection("users")
    .orderBy("__name__")
    .limit(pageSize + 1);

  // If we have a lastUserId, start after that document
  if (lastUserId) {
    const lastUserDoc = await adminDb.collection("users").doc(lastUserId).get();
    if (lastUserDoc.exists) {
      query = query.startAfter(lastUserDoc);
    }
  }

  const users = await query.get();

  // Check if there are more results
  const hasMore = users.docs.length > pageSize;
  // Remove the extra item we fetched to check for more
  const userDocs = hasMore ? users.docs.slice(0, -1) : users.docs;

  return {
    users: userDocs.map((user) => {
      const userData = user.data();
      return {
        id: user.id,
        userName: userData.userName,
        profileUrl: userData.profileUrl,
        slug: userData.slug,
        firstName: userData.firstName,
        lastName: userData.lastName,
        birthdate: userData.birthdate,
        lastActive: userData.lastActive?.toDate(),
      };
    }),
    hasMore,
  };
}
