const CHARS: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

export const escapeHtml = (str: string) =>
  str.replace(/[&<>"']/g, (c) => CHARS[c] ?? "");
