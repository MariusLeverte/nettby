"use client";
import clsx from "clsx";
import * as React from "react";

interface ToolbarButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  active: boolean;
}

export const ToolbarButton: React.FC<ToolbarButtonProps> = ({
  onClick,
  active,
  children,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        "w-8 h-8 flex items-center justify-center flex-shrink-0 rounded-md hover:bg-core-greys-neutralAlpha-s3",
        active &&
          "bg-core-greys-neutralAlpha-s4 hover:bg-core-greys-neutralAlpha-s5"
      )}
    >
      <div
        className={clsx(
          "h-5 w-5 flex-shrink-0 text-fg-muted",
          active && "text-fg"
        )}
      >
        {children}
      </div>
    </button>
  );
};
