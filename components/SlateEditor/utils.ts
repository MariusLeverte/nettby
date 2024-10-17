import { Editor, Element as SlateElement, Transforms } from "slate";
import {
  BlockFormats,
  CustomElement,
  ElementAlignment,
  ListFormats,
  MarkFormats,
} from "./type";

export const LIST_TYPES = Object.keys(ListFormats);
export const TEXT_ALIGN_TYPES = Object.keys(ElementAlignment);
export const BLOCK_TYPES = Object.keys(BlockFormats);

export const isMarkActive = (
  editor: Editor,
  format: keyof typeof MarkFormats
) => {
  const marks = Editor.marks(editor);

  return marks ? marks[format] === true : false;
};

export const toggleMark = (
  editor: Editor,
  format: keyof typeof MarkFormats
) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

export const isBlockActive = (
  editor: Editor,
  format: CustomElement["type"] | CustomElement["align"],
  blockType = "type"
) => {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        n[blockType] === format,
    })
  );

  return !!match;
};

export const toggleBlock = (
  editor: Editor,
  format: CustomElement["type"] | keyof typeof ElementAlignment
) => {
  const isActive = isBlockActive(
    editor,
    format,
    TEXT_ALIGN_TYPES.includes(format) ? "align" : "type"
  );
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      LIST_TYPES.includes(n.type) &&
      !TEXT_ALIGN_TYPES.includes(format),
    split: true,
  });
  let newProperties: Partial<SlateElement>;
  if (TEXT_ALIGN_TYPES.includes(format)) {
    newProperties = {
      align: isActive ? undefined : format,
    };
  } else {
    newProperties = {
      type: isActive ? "paragraph" : isList ? "list-item" : format,
    };
  }
  Transforms.setNodes<SlateElement>(editor, newProperties);

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};
