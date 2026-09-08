# Sthiraka website

The production website for [sthiraka.com](https://sthiraka.com/), implemented with
[vinext](https://github.com/cloudflare/vinext) for deployment to Cloudflare Workers
Static Assets.

## Local preview

Use Node.js `22.13.0` or newer.

```bash
npm install
npm run dev
```

Open the local URL printed by the development server. Site routes include the
homepage at `/` and the workflow-form privacy notice at `/privacy`.

## Production build

```bash
npm run build
```

The build must complete before deployment. The repository keeps the Sites/Cloudflare
configuration in `.openai/hosting.json` and `vite.config.ts`.

No production deployment is part of this handoff. Review the local and production
preview, connect the form endpoint, add the approved intro media and complete the
organization's release review before publishing.

The App Router renders the document HTML through the Cloudflare Worker entry point;
there is intentionally no competing hand-written `index.html` beside that route.

## Public replay integration

The live ChronoRAG-G replay currently returns `X-Frame-Options: DENY`. Browsers
therefore refuse an iframe on another origin. The proof section uses a real capture
of the public replay plus an **Open public replay** link; it does not proxy or imitate
the application. Recheck the header before changing this integration.

## Connect the workflow inquiry form

The workflow inquiry UI posts directly from the browser to Web3Forms using the
public client access key in `app/workflow-form-adapter.ts`.

The website sends a JSON `POST` request with `Accept: application/json` and
`Content-Type: application/json`. The payload contains these fields:

```text
access_key
subject
from_name
name
email
replyto
company
role
workflow
humanControlledReason
desiredChange (when provided)
consent
botcheck
```

The site reports success only when Web3Forms returns a successful HTTP status and a
JSON response whose `success` value is `true`. Restart the local preview after
changing the adapter. A failed endpoint request is shown as a failure, so the visitor
can email `shreyas@sthiraka.com` instead.

The endpoint, its access controls, retention policy and production privacy terms are
deployment responsibilities; do not publish the form until those are configured and
reviewed.

## Add the final intro media

The site currently includes the specified dignified fallback for the five-second
opening sequence. When the approved cinematic export is ready, add these files:

```text
public/assets/intro/sthiraka-intro.webm
public/assets/intro/sthiraka-intro.mp4
public/assets/intro/sthiraka-intro-poster.webp
```

They are served at:

```text
/assets/intro/sthiraka-intro.webm
/assets/intro/sthiraka-intro.mp4
/assets/intro/sthiraka-intro-poster.webp
```

Keep the filenames exact. Provide both video formats and the poster, preserve the
approximately five-second duration, keep the video silent, and do not replace or
deform the canonical Sthiraka emblem within the media.

## Brand assets

The authoritative emblem and founder portrait are supplied in `assets/`. Preserve
their geometry and source pixels; do not redraw, regenerate, retouch or distort them.

## Useful checks

```bash
npm run build
npm run lint
```

For release review, also verify the intro Skip/Escape/session behavior, reduced motion,
keyboard navigation, mobile and desktop layouts, workflow-form failure handling, and
the ChronoRAG-G replay in a real browser.
