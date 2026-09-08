# STHIRAKA WEBSITE — FINAL CODEX HANDOFF V3
## Approved commercial structure + cinematic intro + dynamic website + embedded ChronoRAG-G replay

**Version:** 2026-09-08  
**Target:** `https://sthiraka.com/`  
**Status:** Final founder-review specification before Codex implementation  
**Supersedes:** `STHIRAKA_FINAL_WEBSITE_TEXTUAL_DESIGN_V2_2026-09-08.md` where this V3 differs  
**Core rule:** Do not re-decide the positioning while coding. Implement this specification faithfully.

---

# 0. Final Decisions

## Hero — LOCKED

> # **We enable enterprises to automate high-value workflows they cannot safely hand to AI today.**

This is the primary commercial opening.

Do **not** replace it with:
- “The answer is instant. The verification is still manual.”
- Mission language.
- Vision language.
- evidence-contract language.
- RAG/GraphRAG language.
- safety/risk-first language.

Those can appear deeper where useful.

---

## OETRA — public category language

> **OETRA is a class of evidence-and-execution systems for enterprise AI operating on changing state.**

OETRA must be expressed through multiple business angles:

- automation coverage;
- evidence groundedness;
- temporal correctness;
- state / version correctness;
- required-information completeness;
- conflict visibility;
- traceability;
- reconstructible audit trails;
- bounded refusal / stop behavior;
- reduced manual verification as a measurable commercial target;
- faster review / decision cycles as a measurable commercial target;
- movement from answers toward controlled execution.

Do not make “verification” the entire company story.

---

## Commercial surfaces

There are **two** customer-facing OETRA surfaces.

### 1. Applied OETRA

A tailored OETRA-class system for a defined enterprise workflow.

This is the service-led path.

Do **not** use the childish phrase:

> “A managed commercial path for one high-value workflow.”

Public language:

> **Apply OETRA to a workflow where evidence, time, state, completeness or trace still prevents AI from taking on more of the work.**

Commercial sequence:

**Workflow definition → evaluation → paid pilot → operational expansion**

This is still the service motion, but the website should present it as an applied system, not a consulting package.

---

### 2. Agentic OETRA

This is the product.

> **Agentic OETRA is the reusable product direction that carries OETRA's evidence, state, obligation and trace controls from reasoning into multi-step AI execution.**

Buyer-facing product promise:

- reusable workflow definitions;
- explicit task / evidence obligations;
- grounded evidence ownership;
- temporal and state compatibility;
- conflict visibility;
- reconstructible traces;
- bounded stop / refusal behavior;
- stateful multi-step agent execution;
- movement from answers toward controlled action.

Do not expose private internal architecture, runtime, deployment, ranking, cloud, connector, prompt, security or evaluation internals on the homepage.

Stage wording:

> **The OETRA architecture is implemented. Agentic OETRA is the reusable product direction being built from what survives real workflow evaluation and deployment.**

Do not claim GA, enterprise readiness or autonomous production execution today.

---

## ChronoRAG-G

Use:

> **ChronoRAG-G is the first public implemented and evaluated OETRA-class system in Sthiraka's current technical lineage.**

It is:
- implemented;
- publicly inspectable;
- evaluated;
- the public technical proof.

It is **not**:
- the commercial product;
- a customer deployment;
- production certification;
- cross-domain product proof.

---

# 1. Required Asset Inventory

Codex must use these exact supplied assets when available.

## Canonical emblem

`STHIRAKA_Master_Monochrome_Emblem_VECTOR(1).svg`

White version:

`STHIRAKA_Master_Monochrome_Emblem_VECTOR_WHITE(1).svg`

Rules:
- preserve geometry;
- preserve aspect ratio;
- never redraw;
- never trace;
- never generate a substitute;
- never distort;
- do not separate the single-path emblem into fake animated components.

---

## Founder portrait

Source:

`IMG_1577.jpg`

Optimized website asset:

`STHIRAKA_Founder_Shreyas_Gowda.webp`

Display:
- circular crop;
- `aspect-ratio: 1 / 1`;
- `object-fit: cover`;
- centered crop;
- no AI retouching;
- no generated substitute;
- no extra decorative frame beyond a subtle 1 px rule or quiet shadow.

Alt:

`Shreyas Gowda S, Founder and CEO of Sthiraka`

---

## Intro animation media — production asset slot

Preferred production files:

- `assets/intro/sthiraka-intro.webm`
- `assets/intro/sthiraka-intro.mp4`
- `assets/intro/sthiraka-intro-poster.webp`

These cinematic media files are **not contained in the current handoff bundle**.

Codex must build the complete intro controller and graceful fallback now.

If the production video is absent:
- show the poster/fallback composition;
- do not procedurally invent a detailed fake bird and pretend it is final;
- retain the exact 5-second timeline controller so the rendered media can be dropped in later without rewriting the site.

---

# 2. Five-Second Opening Animation

## Purpose

The opening is a **brand film**, not a loading spinner.

It must communicate the emblem story visually before the business website appears.

It is not Mission/Vision copy and contains no explanatory paragraphs.

## Duration

Exactly approximately **5.0 seconds** from visible start to homepage reveal.

Target:
`4.8–5.2 s`

## Playback frequency

Show:
- on the first entrance to the site in a browser-tab session.

Do not replay:
- on every anchor click;
- on internal navigation;
- on ordinary reload inside the same tab session.

Implementation:
use `sessionStorage`.

Suggested key:

`sthiraka_intro_seen_v1`

A new tab may show it again.

---

## Scene Timeline

### 0.0–0.65 s — Chaotic ocean / fixed star

Full-screen cosmic-dark environment.

Lower 45%:
a chaotic cosmic ocean.

The ocean must feel:
- turbulent;
- deep;
- black-teal;
- physically wet;
- slightly otherworldly;
- not like a generic neon particle field.

Upper-right / upper-center:
one stable bright star.

Critical rule:

**The star does not move.**

It may emit steady light, but its position must remain fixed through the sequence.

No text.

---

### 0.65–1.85 s — Great Flame Bird rises

The Great Flame Bird rises out of the ocean.

Flames:
- reddish orange;
- deep ember-red core;
- brighter orange edges;
- no blue flame;
- no purple flame;
- no gold luxury-fire effect.

Primary flame tones:

`#D93616`
`#F4511E`
`#FF6A22`
`#FF8A2A`

Its wings emerge wet and partially folded.

Water remains visibly attached to the wing edges.

---

### 1.85–3.05 s — Wings open / water evaporates

The bird opens its wings to full span.

This is the most important movement in the sequence.

Water:
- drips from feather / wing edges;
- falls in cool blue-grey droplets;
- some droplets cross the heat boundary and evaporate into thin steam / mist;
- droplets must feel physical, not like spark particles.

The bird's flame becomes more coherent as the wings open.

The cosmic ocean remains below.

The stable star remains ahead.

---

### 3.05–4.35 s — Flight toward the star

The bird accelerates upward toward the fixed star.

Camera:
- mild forward / upward push;
- no violent camera spin;
- no roller-coaster motion.

The bird gets smaller relative to the star as depth opens.

Ocean chaos recedes below.

No text appears yet.

---

### 4.35–5.0 s — Stable light → Sthiraka

The star blooms brighter but **does not move**.

The bird enters / approaches the star's light.

Use a clean crossfade.

Do **not** morph the animated bird into the canonical emblem by deforming the emblem SVG.

Instead:

1. cinematic bird disappears into light;
2. light fills frame;
3. canonical Sthiraka emblem appears intact for a brief beat;
4. homepage hero is revealed.

Optional final micro-mark:

`STHIRAKA`

No Mission/Vision text during the intro.

---

## Intro interaction

Lower-right after ~0.5 s:

**Skip intro**

Keyboard:

`Escape` skips immediately.

No autoplay audio.

The intro is silent.

---

## Reduced motion

Respect:

`prefers-reduced-motion: reduce`

For reduced motion:
- do not play flight;
- do not pan;
- do not scale the full screen;
- show a static final frame / emblem for ~250–400 ms;
- dissolve directly into the hero.

This is mandatory.

---

## Performance implementation

Preferred production implementation:

`<video autoplay muted playsinline>`

Sources:
1. WebM
2. MP4 fallback

Use a poster frame.

Do not block HTML parsing or hero rendering behind the intro.

The homepage DOM must exist behind the overlay from first paint.

The intro is an overlay, not a fake loading page.

Use:
- `transform`;
- `opacity`;

for transition work where possible.

Do not animate expensive layout properties.

---

# 3. Color Strategy

## Failure modes being avoided

Do not produce the standard applied-AI visual formula:

- full-page near-black;
- purple/blue neon gradient;
- glowing nodes;
- glass cards;
- gold “premium” accent;
- particles everywhere;
- black + electric cyan observability-dashboard aesthetic.

The cinematic intro may be dark.

The **website itself is predominantly light, institutional and precise**.

This creates contrast between:
- mythic opening;
- business operating surface.

---

## Main Site Palette

### Warm Paper

`#F5F1E8`

Primary page background.

### Clean Surface

`#FFFDF8`

Cards, evidence records, demo framing and forms.

### Primary Ink

`#14181D`

Main copy.

### Secondary Ink

`#5F666D`

Metadata and supporting text.

### Documentary Rule

`#D9D2C6`

Borders, evidence separators, tables.

### OETRA Structural Blue

`#255B6C`

Use for:
- links;
- structural lines;
- selected evidence;
- system labels.

Not as a glowing neon accent.

### Supported / Governing

`#246B55`

Use with text label/icon.

### Missing / Review Required

`#B56C1A`

Use with text label/icon.

### Superseded / Invalid State

`#98423C`

Use with text label/icon.

### Flame Action Accent

`#F2551D`

Brand-motion accent.

Use sparingly for:
- active CTA edge;
- hover rule;
- key motion point;
- selected progress state.

Do not use it as error red.

### Star Light

`#FFE5A0`

Use:
- intro star;
- tiny brand highlight only.

Do not turn the website into black-and-gold luxury branding.

---

# 4. Gradient System

Gradients are allowed only where they explain atmosphere or state.

No decorative purple gradient.

## Intro Cosmic Sky

```css
background:
  radial-gradient(circle at 76% 18%,
    rgba(255, 229, 160, 0.98) 0%,
    rgba(255, 229, 160, 0.28) 4%,
    rgba(255, 229, 160, 0) 14%),
  linear-gradient(180deg,
    #090B10 0%,
    #0C1219 42%,
    #0A202A 72%,
    #082D35 100%);
```

## Intro Ocean

```css
background:
  radial-gradient(circle at 50% 95%,
    rgba(242, 85, 29, 0.12),
    rgba(242, 85, 29, 0) 38%),
  linear-gradient(180deg,
    #0B2933 0%,
    #0A2028 38%,
    #07171D 100%);
```

The orange reflection comes from the bird, not from generic gradient decoration.

---

## Main Hero Background

```css
background:
  radial-gradient(circle at 78% 28%,
    rgba(37, 91, 108, 0.065),
    rgba(37, 91, 108, 0) 32%),
  linear-gradient(180deg,
    #FFFDF8 0%,
    #F5F1E8 72%,
    #F1EEE6 100%);
```

---

## OETRA Capability Flow

```css
background:
  linear-gradient(90deg,
    rgba(37, 91, 108, 0.07) 0%,
    rgba(36, 107, 85, 0.045) 46%,
    rgba(242, 85, 29, 0.035) 100%);
```

Subtle only.

---

## Public Proof Dark Section

The page may use **one** major dark section for contrast:

```css
background:
  radial-gradient(circle at 85% 20%,
    rgba(37, 91, 108, 0.26),
    rgba(37, 91, 108, 0) 36%),
  linear-gradient(145deg,
    #111419 0%,
    #0C1A21 56%,
    #0D2930 100%);
```

Text:
`#F6F2E8`

Metrics:
not neon.

---

# 5. Typography

## Display

**Source Serif 4**

Use for:
- H1;
- major section claims;
- Mission;
- Vision;
- Governing Principle.

## Body / Product

**IBM Plex Sans**

Use for:
- navigation;
- body;
- UI;
- CTA;
- workflow labels;
- forms.

## Evidence / Data

**IBM Plex Mono**

Use sparingly for:
- dates;
- source IDs;
- metrics;
- state labels;
- fractions.

Avoid a full-page mono / terminal aesthetic.

---

# 6. Global Navigation

## Left

Canonical emblem + `STHIRAKA`

## Links

**OETRA**  
**Workflows**  
**How We Work**  
**Public Proof**  
**Company**

## Right

Primary:

**Discuss a workflow**

Secondary:

**Inspect OETRA**

Header behavior:
- transparent / paper at top;
- sticky after hero;
- slight backdrop blur allowed;
- thin documentary bottom rule;
- no mega-menu.

---

# 7. SECTION 1 — Hero

## Eyebrow

**STHIRAKA · OETRA**

## H1 — LOCKED

> # **We enable enterprises to automate high-value workflows they cannot safely hand to AI today.**

## Subheadline

> **OETRA-class systems keep the required evidence, time, state, scope, conflicts and decision trail attached as AI moves from answering questions toward executing work.**

## Support line

> **The result is not “better chat.” It is a larger automation boundary for work where the basis of the decision still has to hold.**

## Primary CTA

**Discuss a workflow**

## Secondary CTA

**Inspect an OETRA-class system**

## Proof microline

**Implemented research system · public paper · repository · frozen replay · evaluated on 1,005 temporal questions**

---

## Hero Dynamic Visual

Use a **Multi-Workflow Control Surface**, not a legal-only receipt.

Three rows:

### Financial intelligence

Task:

`Compare Company A and Company B across Q2 and Q3 revenue.`

State:
- A/Q2 · supported
- A/Q3 · supported
- B/Q2 · supported
- B/Q3 · missing

Output:

`Blocked — comparison incomplete`

Business angle:

`Completeness before conclusion`

---

### Contract intelligence

Task:

`Which notice period governs now?`

State:
- Base agreement · superseded
- Amendment 2 · governing
- Later addendum · checked

Output:

`Current obligation resolved`

Business angle:

`Version / state correctness`

---

### Research intelligence

Task:

`Prepare a decision brief from seven required sources.`

State:
- 7/7 required sources mapped
- one conflict preserved
- evidence links retained

Output:

`Ready for reviewer`

Business angle:

`Groundedness · conflict visibility · trace`

---

## Hero interaction

Desktop:
three rows visible.

Each row may animate once as it enters.

Mobile:
tabs:
- Financial
- Contract
- Research

No carousel auto-rotation.

---

# 8. SECTION 2 — Enterprise Automation Boundary

## Eyebrow

**WHY HIGH-VALUE WORK STAYS HUMAN-CONTROLLED**

## H2

> # **The model is rarely the only thing blocking automation.**

## Intro

Enterprises already have capable models, cloud, data and AI initiatives.

The work that remains difficult to hand over is often the work where the organization needs more than a plausible answer.

It needs to know:
- whether the right evidence was used;
- whether that evidence was valid for the required time or state;
- whether every required fact existed;
- whether conflicts were preserved;
- whether the output can be reconstructed later;
- whether the system should have stopped instead.

---

## Five business angles

### Automation coverage

**High-value work stays human-controlled.**

### Verification burden

**Experts still search, reconcile and re-check after AI responds.**

### Decision speed

**Review can become the bottleneck after generation becomes fast.**

### Decision quality

**One missing or wrong-state fact can change an otherwise fluent result.**

### Accountability

**Teams need a basis they can inspect when the output matters.**

---

## Callout

> **The problem is not that AI cannot answer. The problem is that enterprises still cannot hand it all of the work.**

---

# 9. SECTION 3 — OETRA-Class Systems

## Eyebrow

**OETRA-CLASS SYSTEMS**

## H2

> # **Keep the decision requirements alive through the full AI workflow.**

## Definition

> **OETRA is a class of evidence-and-execution systems for enterprise AI operating on changing state.**

A task is not treated as one pooled retrieval request.

Required facts, conditions and action obligations remain identifiable through the workflow.

---

## Continuous control chain

Render as one connected horizontal flow.

### REQUIRED

**Make the work explicit.**

Business translation:

**Completeness becomes inspectable instead of assumed.**

---

### GROUNDED

**Keep support attached to each required part.**

Business translation:

**Groundedness becomes specific enough to review.**

---

### TIME / STATE

**Use evidence in the state where it actually applies.**

Business translation:

**Reduce wrong-time and wrong-version decisions.**

Do not publish a percentage reduction without commercial / evaluation evidence.

---

### CONFLICT

**Preserve disagreement until the task can resolve it.**

Business translation:

**Reviewers see what changed or conflicts before acting.**

---

### TRACE

**Keep a reconstructible path from requirement to evidence to result.**

Business translation:

**Traceability supports review, accountability and reconstructible audit trails.**

Do not claim formal audit certification.

---

### STOP

**Do not manufacture completion.**

Business translation:

**Missing evidence can remain missing instead of becoming a complete-looking answer.**

---

### EXECUTE

**Carry the same controls toward action.**

Business translation:

**Move the automation boundary outward without dropping the basis for control.**

---

## Rotating callout lines

Do not rotate automatically.

Use scroll-triggered reveals or user hover/focus.

> **Grounded is not enough if the evidence is from the wrong time.**

> **Fluency is not completeness.**

> **A trace matters when it tells you what the system relied on.**

---

# 10. SECTION 4 — Horizontal Workflow Surface

## Eyebrow

**HORIZONTAL BY ARCHITECTURE**

## H2

> # **One class of system. Different reasons enterprises need it.**

## Subheadline

The workflow, evidence and buyer change.

The underlying control problem can remain the same.

---

## Matrix

Use rows, not cards.

| Environment | Business reason | OETRA angle | Status |
|---|---|---|---|
| Financial intelligence | faster complete multi-source analysis without silently mixing periods | temporal correctness · completeness · evidence mapping · trace | **Public technical proof environment** |
| Legal / contract intelligence | determine what governs now across amendments and versions | state/version control · provenance · conflict preservation | **Commercial discovery** |
| Life-sciences document intelligence | keep protocol/document state aligned to site, time and decision | temporal/state correctness · completeness · traceability | **Commercial discovery** |
| Research intelligence | retain required source coverage, disagreement and decision basis | groundedness · completeness · provenance · conflict visibility | **Commercial discovery** |
| Regulatory / compliance evidence | determine what obligation applies at a given time and condition | state/time validity · exception handling · reconstructible basis | **Expansion hypothesis** |
| Stateful agents / enterprise execution | preserve preconditions, evidence and decision trail as AI takes actions | obligation completeness · action grounding · trace · bounded stop | **Architecture direction** |
| Industrial / audit-heavy operations | reconstruct procedure, asset state and evidence around a decision | state alignment · traceability · missing approval visibility | **Expansion hypothesis** |

## Closing line

> **OETRA is not a collection of vertical AI applications. It is a reusable class of systems whose business value changes with the workflow.**

---

# 11. SECTION 5 — How Enterprises Work With Sthiraka

## Eyebrow

**APPLY · PROVE · COMPOUND**

## H2

> # **Start with the workflow. Build what repeats.**

Do not title this section “Service + Product” in giant marketing text.

The commercial distinction is shown through the two system paths below.

---

## A. Applied OETRA

### Label

**APPLIED OETRA**

### H3

> ## **Apply OETRA to a high-value workflow that AI still cannot carry end to end.**

### Copy

Sthiraka maps the workflow's real decision structure, evidence requirements and human review boundary into an OETRA-class system and tests what changes.

The first work should establish:
- exact task / decision;
- current human-controlled step;
- evidence and state requirements;
- current review / reconstruction work;
- failure consequence;
- measurable acceptance criteria.

### Commercial sequence

**Workflow definition → evaluation → paid pilot → operational expansion**

### Measure

- automation coverage;
- review effort;
- decision cycle time;
- correction / reopen rate;
- evidence completeness;
- unsupported-pass rate;
- trace reconstruction effort.

### CTA

**Discuss an Applied OETRA workflow**

---

## B. Agentic OETRA

### Label

**PRODUCT · AGENTIC OETRA**

### H3

> ## **Carry OETRA's controls from evidence-grounded reasoning into stateful AI execution.**

### Copy

Agentic OETRA is Sthiraka's reusable product direction.

It is intended for recurring enterprise workflows where the system must preserve task obligations, evidence ownership, time/state, conflicts and trace as AI moves through multiple steps and actions.

### Buyer-facing capabilities

- reusable workflow definitions;
- explicit evidence / action obligations;
- grounded evidence ownership;
- temporal / state compatibility;
- conflict visibility;
- reconstructible traces;
- bounded stop / refusal;
- stateful multi-step execution;
- progression from answer generation toward controlled action.

### Stage statement

> **The OETRA architecture is implemented. Agentic OETRA is the reusable product direction being built from what survives real workflow evaluation and deployment.**

### CTA

**Discuss Agentic OETRA**

---

## Relationship visual

One connected line:

**APPLY TO ONE WORKFLOW**  
→ **MEASURE VALUE**  
→ **REUSE THE CONTROL**  
→ **EXPAND INTO AGENTIC EXECUTION**

Small caption:

**Applied OETRA establishes the workflow. Agentic OETRA compounds what becomes repeatable.**

---

# 12. SECTION 6 — One OETRA-Class Workflow

Use a financial example because it is closest to the public evaluated proof.

## Eyebrow

**ONE WORKFLOW · FOUR REQUIRED FACTS**

## H2

> # **Three correct facts are still an incomplete decision.**

Question:

**Compare Company A and Company B across Q2 and Q3 revenue.**

Required:
- Company A / Q2
- Company A / Q3
- Company B / Q2
- Company B / Q3

### Incomplete state

Three supported.

One missing.

System result:

**Comparison incomplete — B/Q3 unsupported**

### Complete state

Four supported.

Each cell retains:
- source;
- target period;
- relevant reported period;
- evidence ownership.

Result:

**Reviewable comparison**

## Buyer translation

**Completeness**  
The task cannot silently skip a required operand.

**Temporal correctness**  
Publication time does not have to be confused with the period described.

**Groundedness**  
Each required fact retains identifiable support.

**Traceability**  
The reviewer can reconstruct the basis.

**Bounded refusal**  
Missing support can stop the workflow.

## Callout

> **A complete-looking answer is not the same as a complete decision.**

---

# 13. SECTION 7 — Public OETRA-Class Proof + Embedded Demo

## Eyebrow

**IMPLEMENTED · PUBLICLY INSPECTABLE · EVALUATED**

## H2

> # **ChronoRAG-G is the first public implemented and evaluated OETRA-class system in Sthiraka's current technical lineage.**

## Copy

ChronoRAG-G applies ordered evidence obligations, stable evidence ownership, temporal compatibility, grounding, trace and bounded refusal in a financial temporal question-answering setting.

It is not the commercial product.

It is public evidence that an OETRA-class architecture has been built and measured.

---

## Embedded Replay

### Source

`https://chronorag-g-demo.vercel.app/`

### Preferred implementation

Embed the real demo in a bordered responsive frame.

Use:

```html
<iframe
  src="https://chronorag-g-demo.vercel.app/"
  title="ChronoRAG-G public replay"
  loading="lazy"
  referrerpolicy="strict-origin-when-cross-origin"
></iframe>
```

Do **not** add an iframe `sandbox` attribute blindly because it may break the replay.

Test the actual site first.

### Important framing check

The browser may refuse the embed if the replay sends:
- `Content-Security-Policy: frame-ancestors ...`
- `X-Frame-Options`

Codex must test this in a real browser.

If embedding works:
- keep the iframe;
- desktop minimum height ~720 px;
- mobile provide a full-width preview and `Open full replay`.

If embedding is blocked:
- use a real screenshot / capture from the public replay;
- add **Open public replay**;
- do not create a fake replacement UI.

### Performance

The iframe is below the fold.

Use `loading="lazy"`.

Add a poster / static preview before the iframe is activated if necessary.

---

## Research scope

**1,005 temporal questions**

**480 updated earnings-call transcripts**

---

## Public results

### Audited answer accuracy

**811 / 1,005 — 80.70%**

### Required evidence coverage

**3,837 / 3,889 — 98.66% micro required-slot coverage**

### Hybrid evidence resolution

**978 / 1,005 — 97.31%**

### Complete strict traces

**846 / 882 — 95.92% in eligible multi-part cases**

### New-query unanswerables

**101 / 101 designated cases**

Do not translate this into generic “100% refusal accuracy.”

---

## Whole-pipeline comparison

**ChronoRAG-G: 80.70%**

**Cited TG-RAG result: 59.74%**

**Observed result-level gap: +20.95 percentage points**

Caveat must remain adjacent:

**Whole-pipeline result-level comparison. Retrieval, prompting and adjudication protocols differ. Not an identical controlled reimplementation.**

---

## Important limitation

**167 rejected answers had complete strict traces.**

Use:

> **The evidence path can be strong while answer construction still fails. That separation is why OETRA evaluates the path instead of hiding everything inside one accuracy number.**

---

## Public links

**Replay**  
`https://chronorag-g-demo.vercel.app/`

**GitHub**  
`https://github.com/SSKG2602/ChronoRAG-G`

**DOI**  
`https://doi.org/10.5281/zenodo.22116070`

**Zenodo**  
`https://zenodo.org/records/22116070`

**Temporal-GraphRAG**  
`https://github.com/hanjiale/Temporal-GraphRAG`

**ECT-QA**  
`https://huggingface.co/datasets/austinmyc/ECT-QA`

---

# 14. SECTION 8 — Business Value Measurement

## Eyebrow

**WHAT A COMMERCIAL TEST HAS TO CHANGE**

## H2

> # **Technical proof earns the test. Business value decides whether the system stays.**

Do not make the commercial case only about legal/safety risk.

Measure several business outcomes.

### Automation coverage

How much work moves from human-only control to controlled AI assistance or execution?

### Review burden

How much searching, reconciliation and evidence reconstruction remains?

### Decision cycle

Does time from question to reviewer-approved result change?

### Correction / reopen rate

How often does the workflow have to be reopened because evidence was stale, incomplete, wrongly scoped or unsupported?

### Evidence completeness

How often are all required facts supported before close?

### Trace reconstruction

Can the reviewer reconstruct the basis without rebuilding the source search?

### Failure economics

What is the operational / financial consequence when the wrong evidence state crosses into action?

## Close

> **The architecture wins only if the workflow economics move.**

---

# 15. SECTION 9 — Why Sthiraka

This is company identity.

It is deliberately separated from the sales argument.

## Eyebrow

**WHY STHIRAKA**

## Governing Principle — LOCKED

> # **Power becomes durable when it remains aligned with purpose.**

## Company Story — LOCKED

> **Sthiraka is built around the idea of remaining steady under change. Its emblem depicts an original Great Flame Bird rising from a changing ocean toward one fixed star.**
>
> **The ocean represents a reality that never stops moving. The bird represents intelligence and capability. The star represents direction—the reference that must not be lost as power grows and conditions change.**
>
> **The principle is simple: power by itself is unstable. Power becomes durable when it remains aligned with purpose.**
>
> **Sthiraka applies that principle to intelligent systems. As AI becomes capable of taking on more consequential work, its decisions must remain connected to the evidence and reality that make those decisions valid.**

Do not add the private “open wings” metaphor to the website.

---

## Mission — LOCKED

### Formal

> **Put AI to work in high-value enterprise workflows while preserving the evidence needed to defend each decision.**

### Full readable version

> **Sthiraka puts AI to work in high-value enterprise workflows while preserving the evidence needed to defend each decision. We build systems that keep changing information, source lineage, and decision boundaries attached to AI outputs so organizations can move more work forward without turning verification into a second manual process.**

---

## Vision — LOCKED

### Formal

> **A world where intelligent systems remain aligned with reality as it changes.**

### Full readable version

> **We envision a world where intelligent systems can operate through constant change without drifting away from reality. As information, conditions, and decisions evolve, the systems acting on them should remain anchored to the evidence and constraints that make their conclusions valid.**

---

## Visual

Use the canonical emblem at meaningful scale.

Do not:
- redraw;
- generate another flaming bird;
- animate the canonical emblem itself;
- add a starfield behind the section;
- add a religious illustration;
- add a phoenix label.

---

# 16. SECTION 10 — Founder

Keep this short.

Do not turn the founder section into a biography wall.

## Layout

Desktop:
- portrait left or right;
- text opposite;
- 40–44% portrait column max.

Mobile:
- circular portrait centered;
- text below.

## Portrait

Use:

`STHIRAKA_Founder_Shreyas_Gowda.webp`

CSS intent:

```css
.founder-photo {
  width: clamp(180px, 24vw, 300px);
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 50%;
}
```

---

## Copy

### Label

**FOUNDER & CEO**

### Name

# **Shreyas Gowda S**

### One-line descriptor

**Builder of Sthiraka and the OETRA / ChronoRAG-G technical lineage.**

Do not add a long founder-role list.

---

## Links only

### Email

`shreyas@sthiraka.com`

Use:

`mailto:shreyas@sthiraka.com`

### LinkedIn

`https://www.linkedin.com/in/shreyasshashi/`

### X

`https://x.com/shreyasskg`

Do not add GitHub to the founder card.

GitHub remains in the public research section.

---

# 17. SECTION 11 — Final Enterprise CTA

## Eyebrow

**ONE WORKFLOW IS ENOUGH TO START**

## H2

> # **What high-value work are you still keeping human-controlled?**

## Subheadline

If AI already helps but the workflow still depends on manual evidence checks, version reconciliation, complete fact coverage, conflict review or reconstructing the decision basis, that is the conversation.

## First discussion

Establish:
1. workflow;
2. business owner;
3. current human-controlled step;
4. evidence / state constraint;
5. failure economics;
6. what an OETRA evaluation must prove.

## CTA

**Discuss a workflow**

Secondary:

**Inspect OETRA in action first**

---

## Form

Required:
- Name
- Work email
- Company
- Role
- Describe the workflow
- What keeps this workflow human-controlled today?

Optional:
- What would have to change for AI to take on more of it?

Consent:

**Sthiraka may use this information to respond to this inquiry. Do not submit confidential, privileged, regulated or personal source material.**

Button:

**Send workflow**

---

# 18. Footer

## STHIRAKA

> **We enable enterprises to automate high-value workflows they cannot safely hand to AI today.**

### OETRA
- Applied OETRA
- Agentic OETRA
- Workflows
- Public proof

### Company
- Why Sthiraka
- Mission
- Vision
- Founder
- Contact
- Privacy

### Public proof
- ChronoRAG-G
- GitHub
- DOI
- Zenodo
- Replay
- ECT-QA

### Contact

`contact@sthiraka.com`

`shreyas@sthiraka.com`

### Hierarchy

**Sthiraka — company · OETRA — class of systems / architecture · ChronoRAG-G — public implemented and evaluated research system**

---

# 19. Dynamic Interaction System

The site must be simple to understand but visibly alive.

Dynamic behavior must explain state.

Do not add motion simply because the site is AI-related.

## Allowed motion

### Evidence state transitions
- supported;
- missing;
- superseded;
- conflict;
- blocked;
- ready.

### Requirement completion
Cells fill only when evidence resolves.

### Temporal transitions
A version / period change updates the governing result.

### Trace reveal
A requirement expands to show evidence.

### Demo activation
The embedded replay loads when requested / near viewport.

### Section reveal
Use subtle translate + opacity:
- 8–16 px;
- 180–360 ms;
- once.

---

## Forbidden motion

- floating blobs;
- infinite particles;
- auto-moving carousels;
- rotating 3D cards;
- mouse-following glow;
- logo spin;
- random graph edges;
- neon pulse;
- endless flame motif after the intro;
- scroll-jacking;
- forced horizontal scrolling.

---

# 20. Responsive Behavior

## Desktop

Max content width:
`1280px`

Grid:
`12 columns`

Hero:
copy ~5 columns / dynamic visual ~7 columns.

## Tablet

6-column layout.

Hero may stack after 900–960 px if necessary.

## Mobile

4-column layout.

Priority order:
1. H1
2. subheadline
3. CTA
4. proof microline
5. interactive visual

Never shrink complex desktop tables unreadably.

Convert:
- matrices → disclosure rows;
- control chain → vertical sequence;
- metrics → stacked ledger;
- demo → responsive frame + full-replay link.

---

# 21. Accessibility

Target:

**WCAG 2.2 AA**

Required:
- `prefers-reduced-motion`;
- skip link;
- semantic headings;
- one H1;
- visible keyboard focus;
- persistent labels;
- form error summary;
- status text in addition to color;
- minimum practical 44×44 controls;
- no hover-only critical content;
- no flashing;
- no rapidly oscillating high-contrast animation.

Red / green states must also include:
- text;
- icon / shape.

---

# 22. Performance

The cinematic intro must not become a performance excuse.

## Main rules

- hero HTML exists immediately;
- intro is an overlay;
- no JS framework required for intro controller;
- use video media rather than heavy procedural WebGL for final cinematic quality;
- use `transform` and `opacity` for UI motion;
- lazy-load demo iframe;
- use `content-visibility: auto` on heavy offscreen sections where appropriate;
- founder image lazy-loads;
- SVG emblem remains vector;
- no autoplay background video after intro.

## Field targets

Aim:
- LCP ≤ 2.5 s at p75;
- INP ≤ 200 ms at p75;
- CLS ≤ 0.1 at p75.

Do not publish these as achieved until measured.

---

# 23. SEO / Social

## HTML title

**Sthiraka | OETRA for High-Value Enterprise AI Work**

## Meta description

**Sthiraka builds OETRA-class evidence-and-execution systems for high-value enterprise workflows that require grounded evidence, time/state correctness, completeness, traceability and controlled AI execution.**

## H1

**We enable enterprises to automate high-value workflows they cannot safely hand to AI today.**

## Open Graph title

**Sthiraka · OETRA**

## Open Graph description

**Evidence-and-execution systems for high-value enterprise AI operating on changing state.**

## Social card

Do not use Mission/Vision.

Use:
- canonical emblem;
- H1;
- one simple three-state OETRA visual.

Background:
warm paper.

Accent:
structural blue + flame-orange micro-accent.

---

# 24. Claims Register

## Publicly supportable

- Sthiraka is the company.
- OETRA is the broader architecture / class-of-systems direction.
- ChronoRAG-G is an implemented and evaluated OETRA-class research system.
- public paper / DOI / repository / replay exist.
- frozen evaluation scope is 1,005 questions / 480 transcripts.
- audited answer accuracy: 811/1,005 = 80.70%.
- complete strict traces: 846/882 = 95.92% in eligible multi-part cases.
- micro required-slot coverage: 3,837/3,889 = 98.66%.
- hybrid evidence resolution: 978/1,005 = 97.31%.
- designated new-query unanswerables: 101/101.
- 167 rejected answers had complete strict traces.
- cited TG-RAG whole-pipeline result: 59.74% versus ChronoRAG-G 80.70%, +20.95 percentage-point observed result-level gap, with protocol caveat.

---

## Commercial hypotheses

May be framed as:
- designed to;
- intended to;
- measured in evaluation;
- commercial test.

Not quantified yet:

- increased automation coverage;
- reduced manual verification;
- reduced temporal / state errors;
- faster review cycles;
- lower correction / reopen rate;
- improved evidence completeness;
- lower reconstruction effort;
- reusable product value across workflows;
- controlled agentic execution.

---

## Forbidden until new evidence exists

- customer logos;
- “trusted by”;
- LOIs;
- pilots presented as deployments;
- ARR;
- revenue;
- production deployment;
- production-ready;
- enterprise-ready;
- SOC 2;
- ISO;
- HIPAA;
- GDPR-compliant product claim;
- secure as an absolute;
- cross-domain validated;
- hallucination-free;
- 98.66% accurate;
- 100% reliable;
- universal RAG replacement;
- product-market fit;
- customer ROI;
- hours saved;
- quantified risk reduction;
- autonomous enterprise execution today.

---

# 25. Codex Implementation Rules

## Do not re-invent copy

Use this MD as the content source.

## Do not use filler

No:
- “Revolutionize your business”
- “Unlock the future”
- “Transform with AI”
- “Enterprise-grade intelligence”
- “Seamless”
- “Next-generation”
- fake social proof.

## Stack

Prefer:
- semantic HTML;
- CSS;
- minimal vanilla JS;
- DOM / SVG for interactive state visuals.

If a framework already exists in the target repo, preserve it instead of rewriting without reason.

## Intro

Codex implements:
- overlay;
- video sources;
- poster fallback;
- sessionStorage;
- Skip;
- Escape;
- reduced motion;
- crossfade to hero.

## Demo

Codex tests iframe framing in a browser.

If frame embedding is blocked:
- do not hack around security headers with an unsafe proxy;
- use real capture + direct replay link;
- document which response header blocks the frame.

## Founder

Use the supplied photo.

No generated portrait.

---

# 26. Current Primary Reference URLs

## Applied / horizontal B2B

Stripe  
https://stripe.com/

Cloudflare  
https://www.cloudflare.com/

ServiceNow  
https://www.servicenow.com/platform.html

Palantir AIP  
https://www.palantir.com/docs/foundry/aip

Sierra  
https://sierra.ai/

Abridge  
https://www.abridge.com/

Glean  
https://www.glean.com/

Linear  
https://linear.app/

---

## Public Sthiraka / OETRA proof

Sthiraka  
https://sthiraka.com/

ChronoRAG-G  
https://github.com/SSKG2602/ChronoRAG-G

DOI  
https://doi.org/10.5281/zenodo.22116070

Zenodo  
https://zenodo.org/records/22116070

Replay  
https://chronorag-g-demo.vercel.app/

Temporal-GraphRAG  
https://github.com/hanjiale/Temporal-GraphRAG

ECT-QA  
https://huggingface.co/datasets/austinmyc/ECT-QA

Founder LinkedIn  
https://www.linkedin.com/in/shreyasshashi/

Founder X  
https://x.com/shreyasskg

---

# 27. Final Acceptance Test

Codex output is not acceptable unless all of these are true.

## 1. Opening

The first commercial sentence is exactly:

> **We enable enterprises to automate high-value workflows they cannot safely hand to AI today.**

## 2. OETRA breadth

The site communicates:
- automation;
- groundedness;
- temporal/state correctness;
- completeness;
- conflict visibility;
- trace;
- auditability;
- refusal;
- execution.

It does not collapse to legal risk or manual verification.

## 3. Hybrid model

The site clearly distinguishes:
- **Applied OETRA**
- **Agentic OETRA**

without exposing private deployment details.

## 4. Product correction

Agentic OETRA is the product direction.

Do not call a generic reusable OETRA system “the product” without the Agentic OETRA name.

## 5. Public proof

ChronoRAG-G is shown as real implemented and evaluated OETRA-class proof.

The real replay is embedded if technically permitted.

## 6. Intro

The 5-second sequence contains:
- cosmic chaotic ocean;
- stable bright star;
- Great Flame Bird;
- red/orange flame;
- rise from water;
- full wing expansion;
- dripping water;
- evaporation / mist;
- flight toward the fixed star;
- intact Sthiraka emblem reveal.

## 7. Founder

Use the supplied founder portrait in a circular crop.

Founder card contains only:
- name / role;
- one-line descriptor;
- email;
- LinkedIn;
- X.

## 8. Identity separation

Mission, Vision, Governing Principle and Company Story remain in the Company identity section.

They do not become sales filler.

## 9. Visual failure test

The site does not look like:
- generic dark AI;
- neon purple SaaS;
- glass-card AI;
- legal-tech-only;
- research-paper-only;
- black-and-gold luxury.

## 10. Business retell

A qualified visitor should leave with this model:

> **Sthiraka helps enterprises move more high-value work into AI.**
>
> **OETRA keeps task requirements, evidence, time/state and trace intact as the work moves from reasoning toward execution.**
>
> **Applied OETRA proves the workflow. Agentic OETRA compounds the reusable product capability.**
>
> **ChronoRAG-G is the public implemented and evaluated proof that an OETRA-class system already exists.**
