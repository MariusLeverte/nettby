import {
  getConversationByUserSlug,
  getMessagesInConversation,
} from "@/app/actions/firestore/postkasse";
import { Chat } from "./chat";
import { notFound } from "next/navigation";
import { getUserBySlug } from "@/app/actions/firestore";
import { getCachedCurrentUser } from "@/app/actions/cache";

export default async function Page({
  params,
}: {
  params: { username: string };
}) {
  const conversationId = await getConversationByUserSlug(params.username);
  const user = await getUserBySlug(params.username);
  const me = await getCachedCurrentUser();

  if (!conversationId) return notFound();

  const messages = await getMessagesInConversation(conversationId);

  return (
    <Chat
      conversationId={conversationId}
      initialMessages={JSON.parse(JSON.stringify(messages))}
      user={JSON.parse(JSON.stringify(user))}
      me={JSON.parse(JSON.stringify(me))}
    />
  );
}
