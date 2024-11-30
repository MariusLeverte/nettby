"use client";

import { postGuestbookMessage } from "@/app/actions/firestore/guestbook";
import { Button } from "@/components/button";
import { Modal } from "@/components/modal";
import { SlateEditor } from "@/components/SlateEditor";
import { useState } from "react";
import { Descendant } from "slate";

const initialValue: Descendant[] = [
  {
    type: "paragraph",
    children: [{ text: " " }],
  },
];

export const NewMessage = ({
  userId,
  senderId,
}: {
  userId: string;
  senderId: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState<string>();

  const handleSave = async () => {
    if (!value) return;

    await postGuestbookMessage(value, userId, senderId);
    setIsOpen(false);
  };

  return (
    <>
      <div className="mb-4 text-right">
        <Button onClick={() => setIsOpen(true)}>Skriv i gjesteboka</Button>
      </div>
      {isOpen && (
        <Modal
          title="Send hilsen"
          onClose={() => setIsOpen(false)}
          onSubmit={handleSave}
        >
          <SlateEditor initialValue={initialValue} onChange={setValue} />
        </Modal>
      )}
    </>
  );
};
