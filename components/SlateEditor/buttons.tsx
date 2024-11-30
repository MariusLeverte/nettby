"use client";

import clsx from "clsx";
import { ReactNode } from "react";
import { useSlate } from "slate-react";
import { Icon } from "./icon";
import {
  BlockFormats,
  ElementAlignment,
  ListFormats,
  MarkFormats,
} from "./type";
import {
  isBlockActive,
  isMarkActive,
  TEXT_ALIGN_TYPES,
  toggleBlock,
  toggleMark,
} from "./utils";

const Button = ({
  isActive,
  onClick,
  children,
}: {
  isActive: boolean;
  onClick: () => void;
  children: ReactNode;
}) => (
  <button
    className={clsx("text-neutral-500 flex items-center rounded p-1", {
      "text-neutral-50 bg-neutral-800": isActive,
    })}
    onClick={(e) => {
      e.preventDefault();
      onClick();
    }}
  >
    {children}
  </button>
);

export const MarkButton = ({
  format,
}: {
  format: keyof typeof MarkFormats;
}) => {
  const editor = useSlate();
  return (
    <Button
      isActive={isMarkActive(editor, format)}
      onClick={() => {
        toggleMark(editor, format);
      }}
    >
      <Icon icon={format} />
    </Button>
  );
};

export const BlockButton = ({
  format,
}: {
  format:
    | keyof typeof BlockFormats
    | keyof typeof ListFormats
    | keyof typeof ElementAlignment;
}) => {
  const editor = useSlate();
  const isButtonActive = isBlockActive(
    editor,
    format,
    TEXT_ALIGN_TYPES.includes(format) ? "align" : "type"
  );

  return (
    <Button
      isActive={isButtonActive}
      onClick={() => {
        toggleBlock(editor, format);
      }}
    >
      <Icon icon={format} />
    </Button>
  );
};
