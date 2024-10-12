"use client";
import { useHelpers } from "@remirror/react";

export function MarkdownPreview() {
  const { getMarkdown } = useHelpers(true);
  return getMarkdown();
}
