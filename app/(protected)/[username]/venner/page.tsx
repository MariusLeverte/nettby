import { getCachedUser } from "@/app/actions/cache";
import { getFriendsAndRequests } from "@/app/actions/firestore";

import Link from "next/link";
import { ProfileCard } from "@/components/profile-card";
import { getIsCurrentUser } from "../user";
import {
  AcceptFriendRequestButton,
  RemoveFriendButton,
} from "../friend-buttons";

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
            <li key={friend.id} className="col-span-6 space-y-2">
              <Link href={`/${friend.user.slug}`}>
                <ProfileCard
                  profileUrl={friend.user.profileUrl}
                  userName={friend.user.userName}
                  status={"Hello world, jeg er kul"}
                />
              </Link>

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
            </li>
          ))}
      </ul>

      <ul className="grid grid-cols-12 gap-4">
        {friends.map((friend) => (
          <li key={friend.userName} className="col-span-6 space-y-2">
            <Link href={`/${friend.slug}`}>
              <ProfileCard
                profileUrl={friend.profileUrl}
                userName={friend.userName}
                status={"Hello world, jeg er kul"}
              />
            </Link>
            {isCurrentUser && (
              <RemoveFriendButton
                currentUserId={user?.id}
                friendId={friend.id}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
