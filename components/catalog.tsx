"use client";
import { useState } from "react";
import Link from "next/link";
export type CatalogItem = {
  slug: string;
  title: string;
  category: string;
  description: string;
};
export function Catalog({
  items,
  base,
}: {
  items: CatalogItem[];
  base: string;
}) {
  const [category, setCategory] = useState("All");
  const categories = ["All", ...new Set(items.map((x) => x.category))];
  const visible = items.filter(
    (x) => category === "All" || x.category === category,
  );
  return (
    <>
      <div className="filters" aria-label="Filter by category">
        {categories.map((c) => (
          <button
            key={c}
            aria-pressed={c === category}
            onClick={() => setCategory(c)}
          >
            {c}
          </button>
        ))}
      </div>
      <p className="result-count" aria-live="polite">
        {visible.length} little discoveries
      </p>
      <div className="content-grid">
        {visible.map((item, i) => (
          <Link
            className="content-card"
            key={item.slug}
            href={`/${base}/${item.slug}/`}
          >
            <span className="eyebrow">{item.category}</span>
            <span className="card-number">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h2>{item.title}</h2>
            <p>{item.description}</p>
            <span className="text-link">
              {base === "puzzles" ? "Give it a go" : "Get curious"}{" "}
              <span aria-hidden="true">↗</span>
            </span>
          </Link>
        ))}
      </div>
    </>
  );
}
