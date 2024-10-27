"use server";

import { adminDb } from "@/lib/firebase-admin";
import { GuestbookMessage } from "@/types/firestore";
import { FieldValue } from "firebase-admin/firestore";
import { revalidateTag, unstable_cache } from "next/cache";

export const postGuestbookMessage = async (
  message: string,
  recipient: string,
  sender: string
) => {
  await adminDb.collection("guestbook").add({
    message,
    recipientId: recipient,
    senderId: sender,
    createdAt: FieldValue.serverTimestamp(),
  });

  revalidateTag("guestbook");
};

export const getGuestbookMessagesCount = async (userId: string) => {
  const snapshot = await adminDb
    .collection("guestbook")
    .where("recipientId", "==", userId)
    .get();
  return snapshot.size;
};

export const getGuestbookMessages = async (
  userId: string,
  page: number = 0,
  limit: number = 15
) => {
  const getPosts = unstable_cache(
    async () => {
      const messagesRef = adminDb
        .collection("guestbook")
        .where("recipientId", "==", userId)
        .orderBy("createdAt", "desc")
        .limit(limit);

      const messagesSnapshot = await messagesRef.get();

      const messages = messagesSnapshot.docs.map((doc) => {
        const createdAt = doc.data().createdAt.toDate();

        return { id: doc.id, ...doc.data(), createdAt } as GuestbookMessage;
      });

      return messages;
    },
    ["guestbook"],
    { revalidate: 3600, tags: ["guestbook"] }
  );

  return getPosts();
};
