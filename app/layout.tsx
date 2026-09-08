import type { Metadata, Viewport } from "next";
import "./globals.css";

/* eslint-disable @next/next/no-page-custom-font */

const title = "Sthiraka | OETRA for High-Value Enterprise AI Work";
const description =
  "Sthiraka builds OETRA-class evidence-and-execution systems for high-value enterprise workflows that require grounded evidence, time/state correctness, completeness, traceability and controlled AI execution.";

export const metadata: Metadata = {
  metadataBase: new URL("https://sthiraka.com"),
  title,
  description,
  applicationName: "Sthiraka",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Sthiraka",
    title: "Sthiraka · OETRA",
    description:
      "Evidence-and-execution systems for high-value enterprise AI operating on changing state.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Sthiraka — OETRA for high-value enterprise AI work",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sthiraka · OETRA",
    description:
      "Evidence-and-execution systems for high-value enterprise AI operating on changing state.",
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F5F1E8",
  colorScheme: "light",
};

const introBootstrap = `
try {
  if (sessionStorage.getItem("sthiraka_intro_seen_v1") === "true") {
    document.documentElement.dataset.introSeen = "true";
  }
} catch (_) {}
`;

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Sthiraka",
  url: "https://sthiraka.com/",
  logo: "https://sthiraka.com/assets/brand/sthiraka-emblem.svg",
  description:
    "Sthiraka builds OETRA-class evidence-and-execution systems for high-value enterprise workflows operating on changing state.",
  email: "contact@sthiraka.com",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon-32x32.png" sizes="32x32" type="image/png" />
        <link rel="icon" href="/favicon-16x16.png" sizes="16x16" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
        <link rel="manifest" href="/site.webmanifest" />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=IBM+Plex+Sans:wght@400;500;600&family=Source+Serif+4:opsz,wght@8..60,400;8..60,500;8..60,600&display=swap"
          rel="stylesheet"
        />
        <script dangerouslySetInnerHTML={{ __html: introBootstrap }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
