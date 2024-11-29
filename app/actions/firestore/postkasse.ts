import { adminDb } from "@/lib/firebase-admin";
import { getUserBySlug } from ".";
import { getSessionUser } from "../auth";
import { ChatMessage, Conversation } from "@/types/firestore";
import { Timestamp } from "firebase/firestore";

export const getConversations = async () => {
  const sessionUser = await getSessionUser();

  if (!sessionUser) return;

  const snapshot = await adminDb
    .collection("conversations")
    .where("participants", "array-contains", sessionUser?.uid)
    .get();

  if (snapshot.empty) return [];

  return snapshot.docs.map(
    (doc) => ({ ...doc.data(), id: doc.id } as Conversation)
  );
};

export const getConversationByUserSlug = async (slug: string) => {
  const user = await getUserBySlug(slug);
  if (!user) return null;

  const sessionUser = await getSessionUser();

  const conversationSnapshot = await adminDb
    .collection("conversations")
    .where("participants", "array-contains-any", [sessionUser?.uid, user.id])
    .limit(1)
    .get();

  if (conversationSnapshot.empty) {
    const newConversationSnapshot = await adminDb
      .collection("conversations")
      .add({
        participants: [sessionUser?.uid, user.id],
      });

    return newConversationSnapshot.id;
  }

  const conversationId = conversationSnapshot.docs[0].id;

  return conversationId;
};

export const getMessagesInConversation = async (conversationId: string) => {
  const messagesSnapshot = await adminDb
    .collection("messages")
    .where("conversationId", "==", conversationId)
    .get();

  return messagesSnapshot.docs
    .map((doc) => {
      const createdAt = new Timestamp(
        doc.data().createdAt._seconds,
        doc.data().createdAt._nanoseconds
      );

      return { id: doc.id, ...doc.data(), createdAt } as ChatMessage;
    })
    .sort((a, b) => a.createdAt.seconds - b.createdAt.seconds);
};

export const getLatestMessage = async (conversationId: string) => {
  const messagesSnapshot = await adminDb
    .collection("messages")
    .where("conversationId", "==", conversationId)
    .orderBy("createdAt", "desc")
    .limit(1)
    .get();

  return messagesSnapshot.docs[0].data() as ChatMessage;
};
