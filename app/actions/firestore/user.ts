import { adminDb } from "@/lib/firebase-admin";
import { User } from "@/types/firestore";

export const getUserById = async (id: string) => {
  const snapshot = await adminDb.collection("users").doc(id).get();

  if (!snapshot.exists) {
    throw new Error("User not found");
  }

  return { id: snapshot.id, ...snapshot.data() } as User;
};
