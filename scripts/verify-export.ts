import { readFileSync, existsSync } from "node:fs";
import assert from "node:assert/strict";
import { games } from "../content/games";
import { puzzles } from "../content/puzzles";
import { facts } from "../content/facts";
import {
  adsEnabled,
  adsenseScriptEnabled,
  publisher,
  basePath,
  siteUrl,
} from "../lib/site";
const routes = [
  "",
  "games/",
  "puzzles/",
  "fun-facts/",
  "about/",
  "contact/",
  "privacy/",
  ...games.map((x) => "games/" + x.slug + "/"),
  ...puzzles.map((x) => "puzzles/" + x.slug + "/"),
  ...facts.map((x) => "fun-facts/" + x.slug + "/"),
];
for (const route of routes) {
  const html = readFileSync("out/" + route + "index.html", "utf8");
  assert.ok(
    html.includes('rel="canonical" href="' + siteUrl + "/" + route + '"'),
    "canonical: " + route,
  );
  assert.ok(html.includes("<h1"), "heading: " + route);
  const head = html.split("</head>")[0];
  const scripts = [
    ...head.matchAll(/<script[^>]+src="https:\/\/pagead2[^>]*>/g),
  ];
  assert.equal(
    scripts.length,
    adsenseScriptEnabled ? 1 : 0,
    "AdSense script count in head: " + route,
  );
  if (adsenseScriptEnabled) {
    assert.ok(scripts[0][0].includes("client=" + publisher), "publisher ID");
    assert.ok(scripts[0][0].includes("async="), "async script");
    assert.ok(
      scripts[0][0].includes('crossorigin="anonymous"'),
      "cross-origin attribute",
    );
  }
  if (!adsEnabled)
    assert.ok(!/<ins[^>]+adsbygoogle/.test(html), "ad slots disabled");
  for (const match of html.matchAll(/(?:href|src)="([^"?#]+)"/g)) {
    const href = match[1];
    if (!href.startsWith("/") || href.startsWith("//")) continue;
    assert.ok(
      !basePath || href === basePath || href.startsWith(basePath + "/"),
      "base path: " + href,
    );
    const path = decodeURIComponent(href.slice(basePath.length));
    assert.ok(
      existsSync("out" + (path.endsWith("/") ? path + "index.html" : path)),
      "local link or asset: " + href,
    );
  }
}
for (const file of ["404.html", "robots.txt", "sitemap.xml", "favicon.svg"])
  assert.ok(existsSync("out/" + file), file);
if (/^ca-pub-\d{16}$/.test(publisher))
  assert.equal(
    readFileSync("out/ads.txt", "utf8"),
    `google.com, ${publisher.replace("ca-", "")}, DIRECT, f08c47fec0942fa0\n`,
  );
console.log(
  `Verified ${routes.length} exported routes, canonical URLs, local links/assets, and ad defaults.`,
);
