import { Node } from "slate";

export const serialize = (value) => {
  return value.map((node) => Node.string(node)).join("\n");
};

export const deserialize = (value) => {
  if (typeof value === "string" && value.trim().length > 0) {
    const lines = value.split("\n").filter(Boolean);
    return lines.map((line) => ({
      type: "paragraph",
      children: [{ text: line }],
    }));
  }

  // Fallback always returns valid array
  return [
    {
      type: "paragraph",
      children: [{ text: "" }],
    },
  ];
};
