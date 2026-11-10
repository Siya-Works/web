import { puzzles } from "../content/puzzles";
import { facts } from "../content/facts";
import { games } from "../content/games";
export function validateCollection(items: readonly object[], fields: string[]) {
  const slugs = new Set();
  if (!items.length) throw Error("Empty collection");
  for (const item of items) {
    const row = item as Record<string, unknown>;
    for (const field of fields)
      if (typeof row[field] !== "string" || !(row[field] as string).trim())
        throw Error("Missing " + field);
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(String(row.slug)))
      throw Error("Invalid slug");
    if (slugs.has(row.slug)) throw Error("Duplicate slug: " + row.slug);
    slugs.add(row.slug);
    if (row.source && !String(row.source).startsWith("https://"))
      throw Error("Source must use HTTPS");
  }
}
export function validateContent() {
  validateCollection(puzzles, [
    "slug",
    "title",
    "category",
    "question",
    "hint",
    "answer",
    "explanation",
  ]);
  validateCollection(facts, [
    "slug",
    "title",
    "category",
    "summary",
    "detail",
    "source",
    "sourceName",
  ]);
  validateCollection(games, [
    "slug",
    "title",
    "category",
    "description",
    "instructions",
  ]);
}
