"use client";
import { auth, db } from "@/lib/firebase";
import { ChatMessage } from "@/types/firestore";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";

interface ChatProps {
  conversationId: string;
  initialMessages: ChatMessage[];
}

export const Chat = ({ conversationId, initialMessages = [] }: ChatProps) => {
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

      setMessages(newMessages);
    });

    return () => unsubscribe();
  }, [conversationId]);

  const sendMessage = async () => {
    await addDoc(collection(db, "messages"), {
      conversationId: conversationId,
      sender: auth.currentUser?.uid,
      message: message,
      createdAt: new Date(),
    } as ChatMessage);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="flex-1">
        <div className="h-screen overflow-y-auto p-4 pb-36">
          {messages.map((message) => (
            <div className="flex items-start gap-2.5" key={message.id}>
              <div className="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">
                  {message.message}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white border-t border-gray-300 p-4 absolute bottom-0 w-3/4">
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Type a message..."
              className="w-full p-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"
              onChange={({ target: { value } }) => setMessage(value)}
            />
            <button
              className="bg-indigo-500 text-white px-4 py-2 rounded-md ml-2"
              onClick={sendMessage}
              disabled={!message}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
