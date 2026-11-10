# Siya Works

A cheerful static Next.js site for **siyaworks.in**: three browser games, 15 puzzles, and 20 sourced fun facts. Built with TypeScript, App Router, and Tailwind CSS. No runtime server, database, analytics, or account system.

## Local development

Use Node.js 22 LTS and npm.

```sh
npm ci
npm run dev
```

Visit http://localhost:3000. Optional configuration: copy `.env.example` to `.env.local`. All `NEXT_PUBLIC_` values are public and compiled into the site; never put secrets in them.

```sh
npm test
npm run build
npm run typecheck
npm run verify:export
python3 -m http.server 3000 --directory out
```

The production artifact is `out/`. Use a static file server to preview it; `next start` does not serve static exports. Direct URLs use trailing slashes and have their own `index.html`. All page text is generated at build time; game interactions and daily picks run in the browser. Daily picks rotate at midnight UTC without a rebuild. Best scores stay in local storage. System fonts and CSS/SVG illustrations avoid external font/image requests.

## Update content in GitHub

1. Open `content/puzzles.ts` or `content/facts.ts` in your repository and click the pencil (Edit).
2. Copy an existing entry and change its fields. Puzzle entries are objects; fact entries are ordered tuples: slug, title, category, summary, detail, source URL, source name. Use a unique lowercase hyphenated slug. Keep published slugs stable so bookmarks keep working.
3. For puzzles, include a question, helpful hint, answer, and explanation. Categories are Logic, Numbers, or Wordplay. For facts, use Space, Our planet, or Nature and verify the claim against the linked authoritative HTTPS source. Update the source-check date displayed in the fact page when rechecking the collection.
4. Preview through a pull request if desired, then commit to `main`. GitHub Actions checks and deploys the updated site automatically. A build failure leaves the previous deployment in place.

Editing an entry updates its existing URL. Removing an entry removes its generated page and results in a 404 for old bookmarks. Prefer updating old content rather than renaming/removing it. Game descriptions and instructions live in `content/games.ts`; adding a new game also requires its component implementation. Global colors/layout are in `app/globals.css`.

## Repository and publishing

The source repository is [Siya-Works/web](https://github.com/Siya-Works/web). Its Pages project URL is `https://siya-works.github.io/web/` until the custom domain is connected.

In repository **Settings → Pages → Build and deployment**, select **GitHub Actions**. The workflow builds on pushes to `main`, validates pull requests without publishing them, and supports manual runs. It reads the actual Pages base URL and base path automatically, including when a custom domain is configured. The contact page links to this repository’s Issues page.

After deployment, open and refresh a nested game, puzzle, and fact URL. Check the custom 404 with a nonexistent path. If the first workflow ran before Pages was enabled, rerun it. An optional Actions repository variable `SITE_URL` overrides canonical URLs; normally leave it unset so it follows Pages settings.

### Connect siyaworks.in

Verify domain ownership in GitHub account Pages settings using its generated TXT record, then set the repository Pages **Custom domain** to `siyaworks.in` before pointing DNS to GitHub.

At your DNS provider, replace conflicting website records and add apex (`@`) A records for:

```text
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

Set `www` CNAME to `siya-works.github.io` (no scheme or repository path). Leave unrelated mail/TXT records intact. Optional IPv6 records are documented by GitHub below.

Remove any temporary `SITE_URL` override and rerun the workflow. Pages metadata will automatically switch the build to the custom-domain root. Allow DNS and certificate provisioning to finish, then enable **Enforce HTTPS** in Pages. Verify both apex and `www`, with `www` redirecting to the canonical apex. An Actions deployment does not need a `CNAME` file; domain configuration lives in Pages settings.

References: [GitHub custom domains](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site), [custom Pages workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

## Google AdSense (off by default)

No ad script, ad requests, or ad containers render in the default configuration. Publishing the website does not require AdSense. Approval and actual ad serving are controlled by Google.

1. Create an AdSense account, add `siyaworks.in`, and use your actual public publisher ID (format `ca-pub-` followed by 16 digits). Set the Actions variable `ADSENSE_PUBLISHER_ID` and rebuild. This adds the `google-adsense-account` verification meta tag and generates `out/ads.txt` using Google's standard seller format. Verify the line against the exact value supplied by your AdSense account. Never invent an ID.
2. Request site review using Google's supported meta-tag verification method. Provide substantive original content and accurate About, Contact, and Privacy pages; this starter does not guarantee approval. Confirm the live contact link works before submission.
3. After approval, create a responsive display ad unit and set `ADSENSE_SLOT_ID`. Placements are between homepage sections and after detail-page content/instructions, away from controls. Keep Auto ads off if you want to preserve these deliberate placements.
4. Configure and publish a Google-certified CMP, such as AdSense **Privacy & messaging**, for applicable regions. Verify consent, rejection, and preference-reopening controls using the real publisher account. The `ADS_CONSENT_READY` flag is a deployment gate, **not** a consent manager or visitor consent signal. The selected CMP must handle actual consent before ad serving, and the privacy page must reflect the final configuration.
5. Only when ready, set both `ADS_CONSENT_READY=true` and `ADS_ENABLED=true`, then rebuild. To disable advertising, set `ADS_ENABLED=false` and redeploy. The privacy page reflects the compiled enabled state. No private API key is needed.
6. In a browser with the real account, check ads after accepted/refused consent, navigation, mobile sizing, and empty inventory. Ad space reserves at least 300px; larger responsive formats may need further layout adjustment. Never click your own ads to test them.

Local equivalents use the `NEXT_PUBLIC_` names in `.env.example`; Actions maps the shorter repository variable names. All changes require a rebuild. `ads.txt` generation loads Next.js environment files as well as process environment.

References: [AdSense consent requirements](https://support.google.com/adsense/answer/13554116?hl=en), [Google partner-site privacy information](https://policies.google.com/technologies/partner-sites).

## Checks and rollback

Unit tests cover game rules, legal/solvable shuffles, memory pairs, daily selection, blocked/corrupt browser storage, and content validation. Export checks verify every content URL, canonicals, local links/assets, sitemap/robots, and disabled ad markup. Before publishing, check keyboard/touch play, hints and answers, mobile layout, game resets, and browser storage persistence.

For rollback, revert the problematic commit and push to `main`; the same workflow redeploys the previous content. Check the Actions run and deployment URL after each change. This project has no migrations or server-side state.
