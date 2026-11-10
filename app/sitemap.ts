import type { MetadataRoute } from "next";
import { games } from "@/content/games";
import { puzzles } from "@/content/puzzles";
import { facts } from "@/content/facts";
import { siteUrl } from "@/lib/site";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "/",
    "/games/",
    "/puzzles/",
    "/fun-facts/",
    "/about/",
    "/contact/",
    "/privacy/",
    ...games.map((x) => "/games/" + x.slug + "/"),
    ...puzzles.map((x) => "/puzzles/" + x.slug + "/"),
    ...facts.map((x) => "/fun-facts/" + x.slug + "/"),
  ].map((path) => ({ url: siteUrl + path }));
}
