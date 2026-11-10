"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { puzzles } from "@/content/puzzles";
import { dailyIndex } from "@/lib/game-logic";
export function DailyPick() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const refresh = () => setIndex(dailyIndex(new Date(), puzzles.length));
    refresh();
    const timer = setInterval(refresh, 60000);
    return () => clearInterval(timer);
  }, []);
  const puzzle = puzzles[index];
  return (
    <section className="daily">
      <div className="daily-symbol" aria-hidden="true">
        ✦
      </div>
      <div>
        <span className="eyebrow">YOUR DAILY BRAIN STRETCH</span>
        <h2>{puzzle.title}</h2>
        <p>A fresh little challenge to make today a little more interesting.</p>
      </div>
      <Link className="button dark" href={"/puzzles/" + puzzle.slug + "/"}>
        Try today’s puzzle <span aria-hidden="true">↗</span>
      </Link>
    </section>
  );
}
