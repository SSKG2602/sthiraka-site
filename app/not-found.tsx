import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main-content" className="legal-page not-found-page" tabIndex={-1}>
      <section className="legal-shell" aria-labelledby="not-found-title">
        <Link className="legal-brand" href="/" aria-label="Sthiraka home">
          STHIRAKA
        </Link>
        <p className="legal-kicker">404 · NOT FOUND</p>
        <h1 id="not-found-title">That page isn&apos;t here.</h1>
        <p className="legal-intro">
          The address may have changed, or the page may no longer be available.
        </p>
        <Link className="legal-back-link" href="/">
          Return to the homepage
        </Link>
      </section>
    </main>
  );
}
