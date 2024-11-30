import { getSessionUser } from "@/app/actions/auth";
import { getLatestMessage } from "@/app/actions/firestore/postkasse";
import { getUserById } from "@/app/actions/firestore/user";
import { UserProfileTeaser } from "@/components/user-link";
import { ChevronRightIcon } from "@heroicons/react/16/solid";
import Link from "next/link";

interface ConversationItemProps {
  userId: string;
  conversationId: string;
}

export const ConversationItem = async ({
  userId,
  conversationId,
}: ConversationItemProps) => {
  const currentUser = await getSessionUser();
  const user = await getUserById(userId);
  const message = await getLatestMessage(conversationId);

  const isCurrentUserLastSender = message.sender === currentUser?.uid;

  return (
    <Link
      href={`/postkasse/${user.slug}`}
      className="flex gap-4 justify-between"
    >
      <UserProfileTeaser userName={user.userName} profileUrl={user.profileUrl}>
        <div className="flex gap-2 text-xs text-neutral-500">
          <span>
            {isCurrentUserLastSender ? "Du: " : ""}
            {message.message}
          </span>
        </div>
      </UserProfileTeaser>
      <ChevronRightIcon className="w-4" />
    </Link>
  );
};
