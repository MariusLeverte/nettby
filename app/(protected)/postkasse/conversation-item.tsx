import { getUserById } from "@/app/actions/firestore/user";

interface ConversationItemProps {
  userId: string;
}

export const ConversationItem = async ({ userId }: ConversationItemProps) => {
  const user = await getUserById(userId);

  return <div>{user.userName}</div>;
};
