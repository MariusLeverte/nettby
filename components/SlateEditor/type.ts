import { BaseEditor } from "slate";
import { ReactEditor } from "slate-react";
import { HistoryEditor } from "slate-history";

export enum MarkFormats {
  "bold" = "bold",
  "italic" = "italic",
  "underline" = "underline",
  "code" = "code",
}

export enum BlockFormats {
  "paragraph" = "paragraph",
  "heading-one" = "heading-one",
  "heading-two" = "heading-two",
}

export enum ListFormats {
  "numbered-list" = "numbered-list",
  "bulleted-list" = "bulleted-list",
}

export enum ElementAlignment {
  "left" = "left",
  "center" = "center",
  "right" = "right",
  "justify" = "justify",
}

export type CustomElement = {
  type: keyof typeof BlockFormats | keyof typeof ListFormats | "list-item";
  align?: keyof typeof ElementAlignment;
  children: CustomText[];
};

type CustomText = {
  text: string;
} & {
  [key in keyof typeof MarkFormats]?: boolean;
};

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}
