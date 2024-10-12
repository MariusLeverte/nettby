"use client";
import React from "react";
import { useEffect, useCallback } from "react";
import { useHelpers } from "@remirror/react";
import { MarkdownEditor } from "./components/MarkdownEditor";

function Context({ onChange }: { onChange: (saveContent: string) => void }) {
  const { getMarkdown } = useHelpers(true);

  const markdown = getMarkdown();
  const memoizedOnChange = useCallback(() => {
    onChange(markdown);
  }, [markdown, onChange]);

  useEffect(() => {
    memoizedOnChange();
  }, [memoizedOnChange]);

  return null;
}

export const Editor = ({
  initialContent,
  placeholder,
  onChange,
}: {
  initialContent: string;
  onChange: (saveContent: string) => void;
  placeholder?: string;
}) => {
  return (
    <MarkdownEditor placeholder={placeholder} initialContent={initialContent}>
      <Context onChange={onChange} />
    </MarkdownEditor>
  );
};
