import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy | Sthiraka",
  description: "How Sthiraka handles information submitted through its workflow inquiry form.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <main id="main-content" className="legal-page" tabIndex={-1}>
      <article className="legal-shell" aria-labelledby="privacy-title">
        <header className="legal-header">
          <Link className="legal-brand" href="/" aria-label="Sthiraka home">
            STHIRAKA
          </Link>
          <p className="legal-kicker">PRIVACY</p>
          <h1 id="privacy-title">Privacy notice</h1>
          <p className="legal-intro">
            This notice covers information you choose to send through Sthiraka&apos;s
            workflow inquiry form.
          </p>
        </header>

        <div className="legal-copy">
          <section className="legal-section" aria-labelledby="information-heading">
            <h2 id="information-heading">Information in an inquiry</h2>
            <p>The form asks for:</p>
            <ul>
              <li>your name, work email, company and role;</li>
              <li>a description of the workflow;</li>
              <li>what keeps that workflow human-controlled today; and</li>
              <li>
                optionally, what would have to change for AI to take on more of it.
              </li>
            </ul>
          </section>

          <section className="legal-section" aria-labelledby="use-heading">
            <h2 id="use-heading">How the information may be used</h2>
            <p>
              Sthiraka may use the information you submit to review and respond to
              your inquiry.
            </p>
          </section>

          <section className="legal-section" aria-labelledby="do-not-submit-heading">
            <h2 id="do-not-submit-heading">What not to submit</h2>
            <p>
              Do not submit confidential, privileged, regulated or personal source
              material through the form.
            </p>
          </section>

          <section className="legal-section" aria-labelledby="submission-heading">
            <h2 id="submission-heading">Submission status</h2>
            <p>
              The form requires a connected submission endpoint. If the site reports
              that your inquiry could not be sent, treat it as not submitted and use
              the contact address below instead.
            </p>
          </section>

          <section className="legal-section" aria-labelledby="session-heading">
            <h2 id="session-heading">Intro preference</h2>
            <p>
              The site uses a session-only browser flag to avoid replaying its opening
              sequence in the same tab. That flag does not contain information from
              the workflow inquiry form.
            </p>
          </section>

          <section className="legal-section" aria-labelledby="contact-heading">
            <h2 id="contact-heading">Questions</h2>
            <p>
              For questions about this notice or an inquiry you sent, email{" "}
              <a href="mailto:contact@sthiraka.com">contact@sthiraka.com</a>.
            </p>
          </section>
        </div>

        <Link className="legal-back-link" href="/">
          Return to Sthiraka
        </Link>
      </article>
    </main>
  );
}
