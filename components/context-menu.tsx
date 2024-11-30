"use client";

import { EllipsisVerticalIcon, XMarkIcon } from "@heroicons/react/16/solid";
import { useState } from "react";

interface ContextMenuProps {
  children: React.ReactNode;
}

export const ContextMenu = ({ children }: ContextMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        className="bg-neutral-100 rounded-full w-8 h-8 flex items-center justify-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <XMarkIcon className="w-4" />
        ) : (
          <EllipsisVerticalIcon className="w-4" />
        )}
      </button>
      {isOpen && (
        <div className="absolute top-10 right-3 bg-white border shadow-md rounded-md">
          <ul className="divide-y divide-neutral-200">{children}</ul>
        </div>
      )}
    </div>
  );
};

interface ContextMenuItemProps {
  label: string;
  icon?: string;
}

export const ContextMenuItem = ({ icon, label }: ContextMenuItemProps) => {
  return (
    <li>
      <button className="px-4 py-2 flex gap-5 items-center justify-between text-sm text-neutral-500">
        <div className="flex items-center gap-3">
          {icon && <span className="text-xs">{icon}</span>}
          <span>{label}</span>
        </div>
      </button>
    </li>
  );
};
