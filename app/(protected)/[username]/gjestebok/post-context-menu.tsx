"use client";

import { ContextMenu, ContextMenuItem } from "@/components/context-menu";

interface PostContextMenuProps {
  isSender: boolean;
  isRecipient: boolean;
}

export const PostContextMenu = ({
  isSender,
  isRecipient,
}: PostContextMenuProps) => {
  if (!isSender && !isRecipient) return null;

  return (
    <ContextMenu>
      {isSender && <ContextMenuItem icon="✍️" label="Endre" />}
      <ContextMenuItem icon="🗑️" label="Slett" />
    </ContextMenu>
  );
};
