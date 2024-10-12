"use client";
import { Remirror, useRemirror } from "@remirror/react";

import { MarkdownExtension } from "remirror/extensions";
import { MarkdownPreview } from "./components/MarkdownPreview";

export const MarkdownViewer = ({ content }: { content: string }) => {
  const { manager } = useRemirror({
    extensions: () => [new MarkdownExtension({ copyAsMarkdown: false })],
    stringHandler: "markdown",
  });
  return (
    <Remirror initialContent={content} manager={manager}>
      <MarkdownPreview />
    </Remirror>
  );
};
