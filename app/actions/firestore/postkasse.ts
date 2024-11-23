import { adminDb } from "@/lib/firebase-admin";
import { getUserBySlug } from ".";
import { getSessionUser } from "../auth";
import { ChatMessage, Conversation } from "@/types/firestore";

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

  return messagesSnapshot.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() } as ChatMessage)
  );
};
