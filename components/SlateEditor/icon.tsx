import {
  BlockFormats,
  ElementAlignment,
  ListFormats,
  MarkFormats,
} from "./type";
import {
  LuAlignCenter,
  LuAlignJustify,
  LuAlignLeft,
  LuAlignRight,
  LuBold,
  LuCode,
  LuHeading1,
  LuHeading2,
  LuItalic,
  LuList,
  LuListOrdered,
  LuUnderline,
} from "react-icons/lu";

export const Icon = ({
  icon,
}: {
  icon:
    | keyof typeof MarkFormats
    | keyof typeof BlockFormats
    | keyof typeof ListFormats
    | keyof typeof ElementAlignment;
}) => {
  switch (icon) {
    case "bold":
      return <LuBold />;
    case "italic":
      return <LuItalic />;
    case "code":
      return <LuCode />;
    case "underline":
      return <LuUnderline />;
    case "bulleted-list":
      return <LuList />;
    case "numbered-list":
      return <LuListOrdered />;
    case "heading-one":
      return <LuHeading1 />;
    case "heading-two":
      return <LuHeading2 />;
    case "left":
      return <LuAlignLeft />;
    case "center":
      return <LuAlignCenter />;
    case "right":
      return <LuAlignRight />;
    case "justify":
      return <LuAlignJustify />;
    default:
      break;
  }

  return null;
};
