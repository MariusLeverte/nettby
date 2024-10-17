"use client";

import {
  acceptFriendRequest,
  removeFriend,
  sendFriendRequest,
} from "@/app/actions/firestore";
import { getFriendshipId } from "@/utils/username-util";

export const SendFriendRequestButton = ({
  currentUserId,
  friendId,
}: {
  currentUserId: string | undefined;
  friendId: string;
}) => {
  return (
    <button onClick={() => sendFriendRequest(currentUserId, friendId)}>
      Send venneforespørsel
    </button>
  );
};

export const AcceptFriendRequestButton = ({
  currentUserId,
  friendId,
}: {
  currentUserId: string | undefined;
  friendId: string;
}) => {
  const friendshipId = getFriendshipId(currentUserId, friendId);
  return (
    <button
      className="px-2 py-1 bg-slate-500 text-white text-sm rounded w-full"
      onClick={() => acceptFriendRequest(friendshipId)}
    >
      Godta venneforespørsel
    </button>
  );
};

export const RemoveFriendButton = ({
  currentUserId,
  friendId,
}: {
  currentUserId: string | undefined;
  friendId: string;
}) => {
  const friendshipId = getFriendshipId(currentUserId, friendId);
  return (
    <button
      className="px-2 py-1 bg-slate-500 text-white text-sm rounded w-full"
      onClick={() => removeFriend(friendshipId)}
    >
      Fjern
    </button>
  );
};
