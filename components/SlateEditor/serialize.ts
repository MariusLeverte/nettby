import escapeHtml from "escape-html";
import { Descendant, Text } from "slate";

const serialize = (node: Descendant): string => {
  if (Text.isText(node)) {
    let string = escapeHtml(node.text);
    if (node.bold) string = `<strong>${string}</strong>`;
    if (node.italic) string = `<em>${string}</em>`;
    if (node.underline) string = `<u>${string}</u>`;
    if (node.code) string = `<code>${string}</code>`;

    return string;
  }

  const children = node.children.map((n) => serialize(n)).join(" ");

  switch (node.type) {
    case "heading-one":
      return `<h1>${children}</h1>`;
    case "heading-two":
      return `<h2>${children}</h2>`;
    case "numbered-list":
      return `<ol>${children}</ol>`;
    case "bulleted-list":
      return `<ul>${children}</ul>`;
    case "list-item":
      return `<li>${children}</li>`;
    case "paragraph":
      return `<p>${children}</p>`;
    default:
      return children;
  }
};

export const serializer = (nodes: Descendant[]) => {
  return nodes.map(serialize);
};
