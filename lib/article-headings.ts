export type ArticleHeading = {
  id: string;
  text: string;
  level: 2 | 3;
};

function cleanHeadingText(value: string) {
  return value
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[`*_~]/g, "")
    .replace(/<[^>]+>/g, "")
    .trim();
}

export function slugifyHeading(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "section";
}

export function getArticleHeadings(source: string): ArticleHeading[] {
  const headings: ArticleHeading[] = [];
  const headingPattern = /^(#{2,3})[ \t]+(.+?)[ \t]*#*[ \t]*$/gm;

  for (const match of source.matchAll(headingPattern)) {
    const text = cleanHeadingText(match[2]);

    headings.push({
      id: slugifyHeading(text),
      text,
      level: match[1].length as 2 | 3,
    });
  }

  return headings;
}
