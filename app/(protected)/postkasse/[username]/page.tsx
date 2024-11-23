import {
  getConversationByUserSlug,
  getMessagesInConversation,
} from "@/app/actions/firestore/postkasse";
import { Chat } from "./chat";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: { username: string };
}) {
  const conversationId = await getConversationByUserSlug(params.username);

  if (!conversationId) return notFound();

  const messages = await getMessagesInConversation(conversationId);

  return (
    <Chat
      conversationId={conversationId}
      initialMessages={JSON.parse(JSON.stringify(messages))}
    />
  );
}
