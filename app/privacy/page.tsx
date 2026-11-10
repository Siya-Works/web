import Link from "next/link";
import { adsEnabled, metadata as meta } from "@/lib/site";
export const metadata = meta(
  "Privacy",
  "How Siya Works handles browser storage, hosting, and optional advertising.",
  "/privacy/",
);
export default function Page() {
  return (
    <section className="section page-section narrow prose">
      <span className="eyebrow">THE SMALL PRINT, IN PLAIN WORDS</span>
      <h1>Your privacy matters.</h1>
      <p>Last updated: November 10, 2026.</p>
      <h2>No account needed</h2>
      <p>
        Siya Works does not ask you to create an account. We do not run
        analytics, a mailing list, or a database of players.
      </p>
      <h2>Scores stay in your browser</h2>
      <p>
        Memory Match and Sliding Tiles use local storage to remember your best
        number of turns on this device. These scores are not sent to us. You can
        delete them by clearing this site’s browser data. If storage is blocked,
        you can still play.
      </p>
      <h2>Hosting and external links</h2>
      <p>
        The site is designed to be hosted on GitHub Pages. GitHub may process
        connection information, including IP addresses, to serve and secure the
        website. See{" "}
        <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement">
          GitHub’s privacy statement
        </a>
        . Source links take you to other websites, which have their own privacy
        practices. Public feedback on GitHub is handled by GitHub.
      </p>
      <h2>Advertising</h2>
      {adsEnabled ? (
        <p>
          This version enables Google AdSense. Google and its partners may use
          cookies, local storage, and connection or browsing information to
          serve, personalize, and measure ads, subject to applicable consent
          choices. Where required, use the consent message to choose or change
          your advertising preferences.
        </p>
      ) : (
        <p>
          Advertising is currently disabled. This version does not load the
          Google AdSense advertising script or request ads. If advertising is
          enabled later, this page and the relevant consent controls will
          describe that setup.
        </p>
      )}
      <p>
        Learn how Google uses information on partner sites at{" "}
        <a href="https://policies.google.com/technologies/partner-sites">
          Google’s partner-site privacy information
        </a>
        .
      </p>
      <h2>Questions or corrections</h2>
      <p>
        Visit our <Link href="/contact/">contact page</Link> for the available
        feedback channel. Please do not post sensitive personal information in
        public feedback.
      </p>
    </section>
  );
}
