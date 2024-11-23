import { getConversations } from "@/app/actions/firestore/postkasse";
import { ConversationItem } from "./conversation-item";
import { getSessionUser } from "@/app/actions/auth";

export default async function Page() {
  const sessionUser = await getSessionUser();
  const conversations = await getConversations();

  return (
    <ul>
      {conversations?.map((conversation) => (
        <li key={conversation.id}>
          <ConversationItem
            userId={
              conversation.participants.find((p) => p !== sessionUser?.uid) ||
              ""
            }
          />
        </li>
      ))}
    </ul>
  );
}
