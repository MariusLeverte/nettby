import { getConversations } from "@/app/actions/firestore/postkasse";
import { ConversationItem } from "./conversation-item";
import { getSessionUser } from "@/app/actions/auth";

export default async function Page() {
  const sessionUser = await getSessionUser();
  const conversations = await getConversations();

  return (
    <div className="pt-10 px-6">
      <h1 className="text-3xl font-bold">Postkasse</h1>
      <ul className="mt-10">
        {conversations?.map((conversation) => (
          <li key={conversation.id}>
            <ConversationItem
              userId={
                conversation.participants.find((p) => p !== sessionUser?.uid) ||
                ""
              }
              conversationId={conversation.id}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
