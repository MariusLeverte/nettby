import { getSessionUser } from "@/app/actions/auth";
import { getLatestMessage } from "@/app/actions/firestore/postkasse";
import { getUserById } from "@/app/actions/firestore/user";
import { ChevronRightIcon } from "@heroicons/react/16/solid";
import Image from "next/image";
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

  const isCurrentUserLastSender = message.sender === currentUser?.id;

  return (
    <Link href={`/postkasse/${user.slug}`} className="flex gap-4">
      <div className="relative w-10 h-10 bg-neutral-200 rounded-lg overflow-hidden">
        {user?.profileUrl && (
          <Image
            src={user.profileUrl}
            alt={`${user.userName} - profilbilde`}
            width={40}
            height={40}
            className="object-fit object-cover w-full h-full"
          />
        )}
      </div>
      <div className="flex-1">
        <span className="font-semibold text-sm">{user.userName}</span>
        <div className="flex gap-2 text-xs text-neutral-500">
          <span>
            {isCurrentUserLastSender ? "Du: " : ""}
            {message.message}
          </span>
        </div>
      </div>
      <ChevronRightIcon className="w-4" />
    </Link>
  );
};
