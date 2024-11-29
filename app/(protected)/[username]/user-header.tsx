import { getCachedCurrentUser, getCachedUser } from "@/app/actions/cache";
import Image from "next/image";
import { SendFriendRequestButton } from "./friend-buttons";
import Link from "next/link";
import { PencilIcon } from "@heroicons/react/16/solid";

interface UserHeaderProps {
  username: string;
}

export const UserHeader = async ({ username }: UserHeaderProps) => {
  const currentUser = await getCachedCurrentUser();
  const user = await getCachedUser(username);
  const isCurrentUser = currentUser?.id === user.id;

  return (
    <div className="w-full">
      <div className="relative h-48 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

      <div className="relative px-6 flex gap-6">
        <div className="relative w-40 h-40 rounded-full border-4 border-white overflow-hidden bg-neutral-200 -mt-12">
          {user.profileUrl && (
            <Image
              src={user.profileUrl}
              alt="Profile picture"
              width={250}
              height={250}
              className="object-center object-cover w-full h-full"
            />
          )}
        </div>

        <div className="mt-4 flex-1">
          <h1 className="text-3xl font-bold">{user.userName}</h1>
          <h3>Klar for relansering!</h3>
          <p className="underline text-xs">@Oslo</p>
        </div>
        <div className="mt-4">
          {isCurrentUser ? (
            <div>
              <Link
                href={`/${user.slug}/rediger`}
                className="flex items-center gap-2 font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-400 bg-neutral-200 p-2 rounded-full transition-colors"
              >
                <PencilIcon className="w-4" />
              </Link>
            </div>
          ) : (
            <SendFriendRequestButton
              currentUserId={currentUser?.id}
              friendId={user.id}
            />
          )}
        </div>
      </div>
    </div>
  );
};
