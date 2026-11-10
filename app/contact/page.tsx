import { metadata as meta } from "@/lib/site";
export const metadata = meta(
  "Contact",
  "Share a puzzle idea, report an issue, or suggest a correction to Siya Works.",
  "/contact/",
);
export default function Page() {
  const repo = process.env.NEXT_PUBLIC_GITHUB_REPOSITORY || "Siya-Works/web";
  const valid = repo && /^[\w.-]+\/[\w.-]+$/.test(repo);
  return (
    <section className="section page-section narrow prose">
      <span className="eyebrow">LET’S MAKE THIS LITTLE WORLD BETTER</span>
      <h1>Have a spark to share?</h1>
      <p>
        A puzzle idea? A fact that needs a second look? A game that is behaving
        a little strangely? We welcome thoughtful suggestions and corrections.
      </p>
      {valid ? (
        <>
          <h2>Start a conversation</h2>
          <p>
            <a
              href={`https://github.com/${repo}/issues/new/choose`}
              target="_blank"
              rel="noreferrer"
            >
              Open an issue on GitHub ↗
            </a>
          </p>
          <p>
            A GitHub account is required. Issues are public, so please do not
            include private or sensitive information. For a bug, tell us the
            page, your browser, and what happened.
          </p>
        </>
      ) : (
        <p>
          Our public feedback channel is not open yet. Please check back after
          launch.
        </p>
      )}
    </section>
  );
}
