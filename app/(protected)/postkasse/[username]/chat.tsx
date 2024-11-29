"use client";

import { auth, db } from "@/lib/firebase";
import { ChatMessage, User } from "@/types/firestore";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { ChatBubble } from "./chat-bubble";
import Image from "next/image";
import clsx from "clsx";
import { Button } from "@/components/button";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/16/solid";

interface ChatProps {
  conversationId: string;
  initialMessages: ChatMessage[];
  user: User;
  me: User;
}

export const Chat = ({
  conversationId,
  initialMessages = [],
  user,
  me,
}: ChatProps) => {
  const [message, setMessage] = useState<string>();
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);

  useEffect(() => {
    const q = query(
      collection(db, "messages"),
      where("conversationId", "==", conversationId)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const newMessages = querySnapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          } as ChatMessage)
      );

      setMessages(
        newMessages.sort((a, b) => a.createdAt.seconds - b.createdAt.seconds)
      );
    });

    return () => unsubscribe();
  }, [conversationId]);

  const sendMessage = async () => {
    await addDoc(collection(db, "messages"), {
      conversationId: conversationId,
      sender: auth.currentUser?.uid,
      message: message,
      createdAt: new Date(),
    });
    setMessage("");
  };

  const groupedMessages = messages.reduce(
    (
      groups: {
        sender: {
          id: string;
          userName: string;
          profileUrl: string | undefined;
          isCurrent: boolean;
        };
        messages: ChatMessage[];
      }[],
      message
    ) => {
      const lastGroup = groups[groups.length - 1];
      const sender = message.sender === me.id ? me : user;
      const senderInfo = {
        id: sender.id,
        userName: sender.userName,
        profileUrl: sender.profileUrl,
        isCurrent: message.sender === me.id,
      };

      if (lastGroup && lastGroup.sender.id === message.sender) {
        lastGroup.messages.push(message);
      } else {
        groups.push({
          sender: senderInfo,
          messages: [message],
        });
      }

      return groups;
    },
    []
  );

  return (
    <>
      <Link
        href={`/postkasse`}
        className="px-4 pt-4 flex items-center gap-2 font-bold text-xs"
      >
        <ArrowLeftIcon className="w-4" />
        Tilbake
      </Link>
      <div className="flex h-[calc(100vh-100px)] overflow-hidden relative">
        <div className="flex-1 overflow-y-auto px-4 pt-8 pb-36">
          {groupedMessages.map((messageGroup, groupIndex) => (
            <div
              className={clsx("grid pb-10", {
                "justify-end": messageGroup.sender.isCurrent,
              })}
              key={groupIndex}
            >
              <div className="flex gap-2.5 mb-4">
                <div
                  className={clsx(
                    "w-10 h-10 bg-neutral-200 rounded-lg overflow-hidden",
                    {
                      "order-last": messageGroup.sender.isCurrent,
                    }
                  )}
                >
                  <Image
                    src={messageGroup.sender.profileUrl || ""}
                    alt="Shanay image"
                    width={40}
                    height={40}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <div
                  className={clsx("flex flex-col", {
                    "items-end": messageGroup.sender.isCurrent,
                  })}
                >
                  <h5 className="text-gray-900 text-sm font-semibold leading-snug pb-1">
                    {messageGroup.sender.userName}
                  </h5>
                  {messageGroup.messages.map((message) => (
                    <ChatBubble
                      key={message.id}
                      message={message}
                      isCurrentUser={message.sender === me.id}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-white border-t border-gray-300 p-4 absolute bottom-0 w-full">
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Melding.."
              value={message}
              className="w-full p-2 rounded-full border border-gray-400 focus:outline-none focus:border-blue-500 text-sm px-4"
              onChange={({ target: { value } }) => setMessage(value)}
            />
            <Button
              className="bg-indigo-500 text-white px-4 py-2 rounded-md ml-2"
              onClick={sendMessage}
              disabled={!message}
            >
              Send
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
