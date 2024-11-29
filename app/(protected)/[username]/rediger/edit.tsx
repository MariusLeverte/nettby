"use client";

import { updateUserInfo } from "@/app/actions/firestore";
import { Button } from "@/components/button";
import { SlateEditor } from "@/components/SlateEditor";
import { User } from "@/types/firestore";
import { useState } from "react";

interface EditProfileProps {
  user: Pick<User, "id" | "bio">;
}

export const EditProfile = ({ user }: EditProfileProps) => {
  const [value, setValue] = useState<string>(user.bio || "[]");

  const handleSave = async () => {
    await updateUserInfo(user.id, { bio: value }).then(() => {});
  };

  return (
    <div>
      <div className="mb-10 flex justify-end">
        <Button onClick={handleSave}>Lagre</Button>
      </div>
      <SlateEditor initialValue={JSON.parse(value)} onChange={setValue} />
    </div>
  );
};
