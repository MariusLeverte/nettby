import { getCachedUser } from "@/app/actions/cache";
import { getFriendsAndRequests } from "@/app/actions/firestore";
import Image from "next/image";
import {
  AcceptFriendRequestButton,
  RemoveFriendButton,
} from "../../friend-buttons";
import Link from "next/link";
import { getIsCurrentUser } from "../../user";

export default async function VennerPage({
  params,
}: {
  params: { username: string };
}) {
  const user = await getCachedUser(params.username);
  const isCurrentUser = await getIsCurrentUser(params.username);
  const { friends, pendingRequests } = await getFriendsAndRequests(user.id);

  return (
    <div className="w-full space-y-4">
      <p className="font-semibold">Antall venner: {friends.length}</p>

      <ul className="grid grid-cols-12 gap-4">
        {isCurrentUser &&
          pendingRequests.map((friend) => (
            <li
              key={friend.id}
              className="col-span-4 rounded bg-slate-50 overflow-hidden"
            >
              <Link href={`/${friend.user.slug}`}>
                <div className="h-40 bg-slate-200 relative overflow-hidden rounded-t">
                  {friend.user.profileUrl && (
                    <Image
                      src={friend.user.profileUrl}
                      alt={`Profilbilde - ${friend.user.userName}`}
                      className="object-cover"
                    />
                  )}
                </div>
                <div className="p-4 flex flex-col gap-2">
                  <p>{friend.user.userName}</p>
                  {isCurrentUser && (
                    <>
                      <AcceptFriendRequestButton
                        currentUserId={user?.id}
                        friendId={friend.user.id}
                      />
                      <RemoveFriendButton
                        currentUserId={user?.id}
                        friendId={friend.user.id}
                      />
                    </>
                  )}
                </div>
              </Link>
            </li>
          ))}
      </ul>

      <ul className="grid grid-cols-12 gap-4">
        {friends.map((friend) => (
          <li
            key={friend.userName}
            className="col-span-4 rounded bg-slate-50 overflow-hidden"
          >
            <Link href={`/${friend.slug}`}>
              <div className="h-40 bg-slate-200 relative overflow-hidden rounded-t">
                {friend.profileUrl && (
                  <Image
                    src={friend.profileUrl}
                    alt={`Profilbilde - ${friend.userName}`}
                    fill
                    className="object-cover"
                  />
                )}
              </div>
              <div className="p-4 flex flex-col gap-2">
                <p>{friend.userName}</p>

                {isCurrentUser && (
                  <RemoveFriendButton
                    currentUserId={user?.id}
                    friendId={friend.id}
                  />
                )}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
