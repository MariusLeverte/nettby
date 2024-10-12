"use client";
import React from "react";
import { FC, PropsWithChildren, useCallback } from "react";
import { css } from "@emotion/css";
import {
  BoldExtension,
  BulletListExtension,
  HardBreakExtension,
  HeadingExtension,
  ItalicExtension,
  MarkdownExtension,
  PlaceholderExtension,
  StrikeExtension,
} from "remirror/extensions";
import { EditorComponent, Remirror, useRemirror } from "@remirror/react";

import { MarkdownToolbar } from "./MarkdownToolbar";
import type { ReactEditorProps } from "../types";

export interface MarkdownEditorProps
  extends Partial<Omit<ReactEditorProps, "stringHandler">> {
  showToolbar?: boolean;
}

/**
 * The editor which is used to create the annotation. Supports formatting.
 */
export const MarkdownEditor: FC<PropsWithChildren<MarkdownEditorProps>> = ({
  placeholder,
  children,
  ...rest
}) => {
  const extensions = useCallback(
    () => [
      new PlaceholderExtension({ placeholder }),
      new BoldExtension(600),
      new ItalicExtension(),
      new HeadingExtension({ levels: [1, 2] }),
      new BulletListExtension({ enableSpine: true }),
      new MarkdownExtension({ copyAsMarkdown: false }),
      new HardBreakExtension(),
      new StrikeExtension(),
    ],
    [placeholder]
  );

  const { manager } = useRemirror({
    extensions,
    stringHandler: "markdown",
  });

  return (
    <Remirror
      manager={manager}
      {...rest}
      classNames={[
        css`
          &.ProseMirror {
            padding: 1rem;
            outline: none;

            p {
              padding: 0.25rem 0;
            }

            p.remirror-is-empty:first-of-type::before {
              position: absolute;
              color: #aaa;
              pointer-events: none;
              height: 0;
              font-style: italic;
              content: attr(data-placeholder);
            }

            ul,
            ol {
              margin-left: 1rem;
            }

            h1,
            h2 {
              font-weight: 600;
              padding: 0.25rem 0;
              margin-bottom: 0.5rem;
            }

            h1 {
              font-size: 1.25rem;
              line-height: 1.875rem;
            }

            h2 {
              font-size: 1.125rem;
              line-height: 1.75rem;
            }
          }
        `,
      ]}
    >
      <div className="max-h-96 overflow-auto shadow rounded ">
        <MarkdownToolbar />
        <EditorComponent />
      </div>

      {children}
    </Remirror>
  );
};
