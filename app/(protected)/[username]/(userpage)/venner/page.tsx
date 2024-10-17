import { getCachedUser } from "@/app/actions/cache";
import { getFriendsAndRequests } from "@/app/actions/firestore";
import Image from "next/image";
import {
  AcceptFriendRequestButton,
  RemoveFriendButton,
} from "../../friend-buttons";

export default async function VennerPage() {
  const currentUser = await getCachedUser();
  const { friends, pendingRequests } = await getFriendsAndRequests(
    currentUser?.id
  );

  return (
    <div className="w-full space-y-4">
      <p className="font-semibold">Antall venner: {friends.length}</p>

      <ul className="grid grid-cols-12 gap-4">
        {pendingRequests.map((friend) => (
          <li
            key={friend.user.userName}
            className="col-span-4 rounded bg-slate-50 overflow-hidden"
          >
            <div className="h-40 bg-slate-200">
              <Image src={""} alt={""} />
            </div>
            <div className="p-4 flex flex-col gap-2">
              <p>{friend.user.userName}</p>

              <AcceptFriendRequestButton
                currentUserId={currentUser?.id}
                friendId={friend.user.id}
              />
              <RemoveFriendButton
                currentUserId={currentUser?.id}
                friendId={friend.user.id}
              />
            </div>
          </li>
        ))}
      </ul>

      <ul className="grid grid-cols-12 gap-4">
        {friends.map((friend) => (
          <li
            key={friend.userName}
            className="col-span-4 rounded bg-slate-50 overflow-hidden"
          >
            <div className="h-40 bg-slate-200">
              <Image src={""} alt={""} />
            </div>
            <div className="p-4 flex flex-col gap-2">
              <p>{friend.userName}</p>

              <RemoveFriendButton
                currentUserId={currentUser?.id}
                friendId={friend.id}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
