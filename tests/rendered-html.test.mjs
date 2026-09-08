import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the complete Sthiraka homepage", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Sthiraka \| OETRA for High-Value Enterprise AI Work<\/title>/i);
  assert.match(
    html,
    /We enable enterprises to automate high-value workflows they cannot safely hand to AI today\./,
  );
  assert.equal((html.match(/<h1\b/gi) ?? []).length, 1);
  assert.match(html, /Applied OETRA/);
  assert.match(html, /Agentic OETRA/);
  assert.match(html, /811 \/ 1,005/);
  assert.match(html, /98\.66% micro required-slot coverage/);
  assert.match(html, /X-Frame-Options: DENY/);
  assert.doesNotMatch(html, /<iframe\b/i);
  assert.doesNotMatch(html, /github\.com\/hanjiale\/Temporal-GraphRAG/i);
});

test("renders privacy and branded not-found routes", async () => {
  const privacy = await render("/privacy");
  assert.equal(privacy.status, 200);
  const privacyHtml = await privacy.text();
  assert.match(privacyHtml, /Privacy notice/i);
  assert.match(privacyHtml, /processed by Web3Forms for delivery to Sthiraka/i);

  const missing = await render("/this-route-does-not-exist");
  assert.equal(missing.status, 404);
  assert.match(await missing.text(), /That page isn(?:'|&#x27;)t here\./i);
});

test("keeps intro, proof and form behavior explicit in source", async () => {
  const [page, layout, adapter, css] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/workflow-form-adapter.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);
  const normalizedPage = page.replaceAll("&apos;", "'");

  for (const requiredCopy of [
    "We enable enterprises to automate high-value workflows they cannot safely hand to AI today.",
    "OETRA is a class of evidence-and-execution systems for enterprise AI operating on changing state.",
    "Apply OETRA to a workflow where evidence, time, state, completeness or trace still prevents AI from taking on more of the work.",
    "Agentic OETRA is Sthiraka's reusable product direction.",
    "ChronoRAG-G is the first public implemented and evaluated OETRA-class system in Sthiraka's current technical lineage.",
    "Power becomes durable when it remains aligned with purpose.",
    "Put AI to work in high-value enterprise workflows while preserving the evidence needed to defend each decision.",
    "A world where intelligent systems remain aligned with reality as it changes.",
    "Builder of Sthiraka and the OETRA / ChronoRAG-G technical lineage.",
    "Open public replay",
  ]) {
    assert.ok(normalizedPage.includes(requiredCopy), `missing required copy: ${requiredCopy}`);
  }

  assert.doesNotMatch(
    normalizedPage,
    /trusted by|production-ready|enterprise-ready|SOC 2|ISO 27001|HIPAA|GDPR-compliant|hallucination-free|98\.66% accurate|100% reliable|universal RAG replacement|product-market fit|customer ROI|hours saved|autonomous enterprise execution/i,
  );

  assert.match(page, /sthiraka_intro_seen_v1/);
  assert.match(page, /prefers-reduced-motion: reduce/);
  assert.match(page, /const INTRO_PLAYBACK_RATE = 1\.4/);
  assert.match(page, /reduceMotion \? 380 : introDuration\(5000\)/);
  assert.match(page, /playbackRate = INTRO_PLAYBACK_RATE/);
  assert.match(page, /event\.key === "Escape"/);
  assert.match(page, /NEXT_PUBLIC_INTRO_MEDIA_READY/);
  assert.match(page, /chronorag-g-replay\.webp/);
  assert.doesNotMatch(page, /<iframe\b/i);

  assert.match(layout, /application\/ld\+json/);
  assert.match(layout, /\/og\.png/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);

  assert.match(adapter, /const WEB3FORMS_ENDPOINT = "https:\/\/api\.web3forms\.com\/submit"/);
  assert.match(adapter, /const WEB3FORMS_ACCESS_KEY = "[0-9a-f-]{36}"/);
  assert.doesNotMatch(adapter, /process\.env\.NEXT_PUBLIC_WORKFLOW/);
  assert.doesNotMatch(adapter, /Online submission is not connected yet/);
  assert.match(adapter, /responseBody\.success !== true/);
  assert.match(adapter, /humanControlledReason/);
  assert.match(adapter, /desiredChange/);
  assert.match(adapter, /return \{ ok: true \}/);
  assert.match(page, /name="botcheck"/);
});

test("ships the required brand, proof, discovery and crawler assets", async () => {
  const files = [
    "public/assets/brand/sthiraka-emblem.svg",
    "public/assets/brand/sthiraka-emblem-white.svg",
    "public/assets/founder/shreyas-gowda.webp",
    "public/assets/proof/chronorag-g-replay.webp",
    "public/favicon.ico",
    "public/favicon.svg",
    "public/apple-touch-icon.png",
    "public/site.webmanifest",
    "public/og.png",
    "public/robots.txt",
    "public/sitemap.xml",
    "public/404.html",
    ".env.example",
  ];

  await Promise.all(files.map((path) => access(new URL(path, root))));
});
