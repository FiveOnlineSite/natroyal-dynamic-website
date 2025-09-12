// utils/slugify.js
export const slugify = (str = "") =>
  str
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")         // replace &
    .replace(/\//g, "-")          // replace /
    .replace(/[^a-z0-9]+/g, "-")  // non-alphanumeric → -
    .replace(/^-+|-+$/g, "");     // remove leading/trailing -
