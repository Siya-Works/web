import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { basePath, siteUrl, publisher, adsenseScriptEnabled } from "@/lib/site";
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Siya Works — A little play. A little wonder.",
    template: "%s | Siya Works",
  },
  description:
    "Make room for a little fun. Free games, curious puzzles, and surprising facts for your everyday brain break.",
  icons: { icon: basePath + "/favicon.svg" },
  ...(/^ca-pub-\d{16}$/.test(publisher)
    ? { other: { "google-adsense-account": publisher } }
    : {}),
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {adsenseScriptEnabled && (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${publisher}`}
            crossOrigin="anonymous"
          />
        )}
      </head>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <header className="site-header">
          <Link className="brand" href="/" aria-label="Siya Works home">
            <span className="brand-icon" aria-hidden="true">
              ✳
            </span>{" "}
            siya<span>works</span>
            <span className="brand-dot">.</span>
          </Link>
          <nav aria-label="Main navigation">
            <Link href="/games/">Games</Link>
            <Link href="/puzzles/">Puzzles</Link>
            <Link href="/fun-facts/">Fun facts</Link>
            <Link href="/about/" className="about-nav">
              Our little world ↗
            </Link>
          </nav>
        </header>
        <main id="main">{children}</main>
        <footer>
          <div className="footer-top">
            <Link className="brand" href="/">
              ✳ siya<span>works.</span>
            </Link>
            <p>Small breaks. Big smiles. A curious mind.</p>
            <span className="footer-spark" aria-hidden="true">
              ✧
            </span>
          </div>
          <div className="footer-bottom">
            <span>Made for the joy of figuring things out.</span>
            <nav aria-label="Footer navigation">
              <Link href="/about/">About</Link>
              <Link href="/contact/">Contact</Link>
              <Link href="/privacy/">Privacy</Link>
            </nav>
            <span>© Siya Works</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
