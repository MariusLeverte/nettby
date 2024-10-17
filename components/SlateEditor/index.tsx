"use client";
import { Editable, withReact, Slate } from "slate-react";
import isHotkey from "is-hotkey";
import { createEditor, Descendant } from "slate";
import { withHistory } from "slate-history";
import { useCallback, useMemo } from "react";
import { Element } from "./element";
import { BlockButton, MarkButton } from "./buttons";
import { Mark } from "./mark";
import { BLOCK_TYPES, LIST_TYPES, TEXT_ALIGN_TYPES, toggleMark } from "./utils";
import {
  BlockFormats,
  ElementAlignment,
  ListFormats,
  MarkFormats,
} from "./type";

const HOTKEYS: Record<string, keyof typeof MarkFormats> = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
  "mod+`": "code",
};

const initialValue: Descendant[] = [
  {
    type: "paragraph",
    align: "left",
    children: [{ text: "Skriv en profiltekst" }],
  },
];

interface SlateEditorProps {
  initialValue?: Descendant[];
  onChange: (value: string) => void;
}

export const SlateEditor = (props: SlateEditorProps) => {
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Mark {...props} />, []);
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  return (
    <div className="prose border border-neutral-500 shadow-md max-w-none">
      <Slate
        editor={editor}
        initialValue={props.initialValue || initialValue}
        onChange={(value) => {
          const isAstChange = editor.operations.some(
            (op) => "set_selection" !== op.type
          );
          if (isAstChange) {
            const content = JSON.stringify(value);
            props.onChange(content);
          }
        }}
      >
        <div className="flex space-x-2 border-b border-neutral-500 p-2">
          {Object.keys(MarkFormats).map((key) => (
            <MarkButton key={key} format={key as keyof typeof MarkFormats} />
          ))}
          {BLOCK_TYPES.filter((b) => b !== "paragraph").map((key) => (
            <BlockButton key={key} format={key as keyof typeof BlockFormats} />
          ))}
          {LIST_TYPES.map((key) => (
            <BlockButton key={key} format={key as keyof typeof ListFormats} />
          ))}
          {TEXT_ALIGN_TYPES.map((key) => (
            <BlockButton
              key={key}
              format={key as keyof typeof ElementAlignment}
            />
          ))}
        </div>
        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          placeholder=""
          spellCheck
          autoFocus
          className="focus:outline-none px-4 py-2"
          onKeyDown={(event) => {
            for (const hotkey in HOTKEYS) {
              if (isHotkey(hotkey, event as any)) {
                event.preventDefault();
                const mark = HOTKEYS[hotkey];
                toggleMark(editor, mark);
              }
            }
          }}
        />
      </Slate>
    </div>
  );
};
