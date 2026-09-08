"use client";

/* eslint-disable @next/next/no-img-element */

import { FormEvent, useEffect, useRef, useState } from "react";
import {
  submitWorkflowInquiry,
  type WorkflowInquiry,
} from "./workflow-form-adapter";

const INTRO_KEY = "sthiraka_intro_seen_v1";
const INTRO_MEDIA_READY =
  process.env.NEXT_PUBLIC_INTRO_MEDIA_READY === "true";

const workflowExamples = [
  {
    short: "Financial",
    title: "Financial intelligence",
    task: "Compare Company A and Company B across Q2 and Q3 revenue.",
    states: [
      ["A/Q2", "supported", "supported"],
      ["A/Q3", "supported", "supported"],
      ["B/Q2", "supported", "supported"],
      ["B/Q3", "missing", "missing"],
    ],
    output: "Blocked — comparison incomplete",
    outputState: "blocked",
    angle: "Completeness before conclusion",
  },
  {
    short: "Contract",
    title: "Contract intelligence",
    task: "Which notice period governs now?",
    states: [
      ["Base agreement", "superseded", "superseded"],
      ["Amendment 2", "governing", "supported"],
      ["Later addendum", "checked", "neutral"],
    ],
    output: "Current obligation resolved",
    outputState: "ready",
    angle: "Version / state correctness",
  },
  {
    short: "Research",
    title: "Research intelligence",
    task: "Prepare a decision brief from seven required sources.",
    states: [
      ["Required sources", "7/7 mapped", "supported"],
      ["Disagreement", "one conflict preserved", "conflict"],
      ["Evidence", "links retained", "neutral"],
    ],
    output: "Ready for reviewer",
    outputState: "ready",
    angle: "Groundedness · conflict visibility · trace",
  },
] as const;

const controlSteps = [
  ["01", "REQUIRED", "Make the work explicit.", "Completeness becomes inspectable instead of assumed."],
  ["02", "GROUNDED", "Keep support attached to each required part.", "Groundedness becomes specific enough to review."],
  ["03", "TIME / STATE", "Use evidence in the state where it actually applies.", "Reduce wrong-time and wrong-version decisions."],
  ["04", "CONFLICT", "Preserve disagreement until the task can resolve it.", "Reviewers see what changed or conflicts before acting."],
  ["05", "TRACE", "Keep a reconstructible path from requirement to evidence to result.", "Traceability supports review, accountability and reconstructible audit trails."],
  ["06", "STOP", "Do not manufacture completion.", "Missing evidence can remain missing instead of becoming a complete-looking answer."],
  ["07", "EXECUTE", "Carry the same controls toward action.", "Move the automation boundary outward without dropping the basis for control."],
] as const;

const workflowRows = [
  ["Financial intelligence", "faster complete multi-source analysis without silently mixing periods", "temporal correctness · completeness · evidence mapping · trace", "Public technical proof environment"],
  ["Legal / contract intelligence", "determine what governs now across amendments and versions", "state/version control · provenance · conflict preservation", "Commercial discovery"],
  ["Life-sciences document intelligence", "keep protocol/document state aligned to site, time and decision", "temporal/state correctness · completeness · traceability", "Commercial discovery"],
  ["Research intelligence", "retain required source coverage, disagreement and decision basis", "groundedness · completeness · provenance · conflict visibility", "Commercial discovery"],
  ["Regulatory / compliance evidence", "determine what obligation applies at a given time and condition", "state/time validity · exception handling · reconstructible basis", "Expansion hypothesis"],
  ["Stateful agents / enterprise execution", "preserve preconditions, evidence and decision trail as AI takes actions", "obligation completeness · action grounding · trace · bounded stop", "Architecture direction"],
  ["Industrial / audit-heavy operations", "reconstruct procedure, asset state and evidence around a decision", "state alignment · traceability · missing approval visibility", "Expansion hypothesis"],
] as const;

const businessMeasures = [
  ["Automation coverage", "How much work moves from human-only control to controlled AI assistance or execution?"],
  ["Review burden", "How much searching, reconciliation and evidence reconstruction remains?"],
  ["Decision cycle", "Does time from question to reviewer-approved result change?"],
  ["Correction / reopen rate", "How often does the workflow have to be reopened because evidence was stale, incomplete, wrongly scoped or unsupported?"],
  ["Evidence completeness", "How often are all required facts supported before close?"],
  ["Trace reconstruction", "Can the reviewer reconstruct the basis without rebuilding the source search?"],
  ["Failure economics", "What is the operational / financial consequence when the wrong evidence state crosses into action?"],
] as const;

const publicLinks = [
  ["Replay", "https://chronorag-g-demo.vercel.app/"],
  ["GitHub", "https://github.com/SSKG2602/ChronoRAG-G"],
  ["DOI", "https://doi.org/10.5281/zenodo.22116070"],
  ["Zenodo", "https://zenodo.org/records/22116070"],
  ["Temporal-GraphRAG", "https://github.com/hanjiale/Temporal-GraphRAG"],
  ["ECT-QA", "https://huggingface.co/datasets/austinmyc/ECT-QA"],
] as const;

type IntroState = "visible" | "leaving" | "hidden";

function IntroOverlay() {
  const [state, setState] = useState<IntroState>("visible");
  const [reduced, setReduced] = useState(false);
  const [mediaFailed, setMediaFailed] = useState(false);
  const skipRef = useRef<HTMLButtonElement>(null);
  const dismissTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(INTRO_KEY) === "true";
    } catch {
      seen = false;
    }

    if (seen) {
      document.documentElement.dataset.introSeen = "true";
      const hideSeenIntro = requestAnimationFrame(() => setState("hidden"));
      return () => cancelAnimationFrame(hideSeenIntro);
    }

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const reduceStateFrame = requestAnimationFrame(() =>
      setReduced(reduceMotion),
    );

    try {
      sessionStorage.setItem(INTRO_KEY, "true");
    } catch {
      // The experience still works if storage is unavailable.
    }

    const page = document.getElementById("page-shell");
    page?.setAttribute("inert", "");
    page?.setAttribute("aria-hidden", "true");
    document.body.classList.add("intro-active");

    const complete = () => {
      setState("hidden");
      document.documentElement.dataset.introSeen = "true";
      page?.removeAttribute("inert");
      page?.removeAttribute("aria-hidden");
      document.body.classList.remove("intro-active");
    };

    dismissTimer.current = setTimeout(
      () => setState("leaving"),
      reduceMotion ? 120 : 4540,
    );
    hideTimer.current = setTimeout(complete, reduceMotion ? 380 : 5000);
    const focusTimer = reduceMotion
      ? null
      : setTimeout(() => skipRef.current?.focus({ preventScroll: true }), 560);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        if (dismissTimer.current) clearTimeout(dismissTimer.current);
        if (hideTimer.current) clearTimeout(hideTimer.current);
        setState("leaving");
        hideTimer.current = setTimeout(complete, 320);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      if (dismissTimer.current) clearTimeout(dismissTimer.current);
      if (hideTimer.current) clearTimeout(hideTimer.current);
      if (focusTimer) clearTimeout(focusTimer);
      cancelAnimationFrame(reduceStateFrame);
      window.removeEventListener("keydown", onKeyDown);
      page?.removeAttribute("inert");
      page?.removeAttribute("aria-hidden");
      document.body.classList.remove("intro-active");
    };
  }, []);

  const skip = () => {
    if (dismissTimer.current) clearTimeout(dismissTimer.current);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    setState("leaving");
    hideTimer.current = setTimeout(() => {
      setState("hidden");
      document.documentElement.dataset.introSeen = "true";
      const page = document.getElementById("page-shell");
      page?.removeAttribute("inert");
      page?.removeAttribute("aria-hidden");
      document.body.classList.remove("intro-active");
    }, 320);
  };

  if (state === "hidden") return null;

  return (
    <div
      className={`intro-overlay ${reduced ? "is-reduced" : ""}`}
      data-state={state}
      role="dialog"
      aria-modal="true"
      aria-label="Sthiraka opening film"
    >
      <div className="intro-fallback" aria-hidden="true">
        <span className="intro-star" />
        <span className="intro-horizon" />
        <span className="intro-ocean intro-ocean-one" />
        <span className="intro-ocean intro-ocean-two" />
      </div>
      {INTRO_MEDIA_READY && !mediaFailed ? (
        <video
          className="intro-video"
          autoPlay
          muted
          playsInline
          preload="metadata"
          poster="/assets/intro/sthiraka-intro-poster.webp"
          aria-hidden="true"
          onError={() => setMediaFailed(true)}
        >
          <source src="/assets/intro/sthiraka-intro.webm" type="video/webm" />
          <source src="/assets/intro/sthiraka-intro.mp4" type="video/mp4" />
        </video>
      ) : null}
      <div className="intro-emblem" aria-hidden="true">
        <img src="/assets/brand/sthiraka-emblem.svg" alt="" />
        <span>STHIRAKA</span>
      </div>
      {!reduced ? (
        <button className="intro-skip" type="button" onClick={skip} ref={skipRef}>
          Skip intro <span aria-hidden="true">↘</span>
        </button>
      ) : null}
    </div>
  );
}

function ArrowLink({ href, children, external = false, className = "" }: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  className?: string;
}) {
  return (
    <a
      className={`arrow-link ${className}`.trim()}
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
    >
      <span>{children}</span>
      <span className="arrow-link-mark" aria-hidden="true">↗</span>
    </a>
  );
}

function WorkflowInquiryForm() {
  const [errors, setErrors] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const errorRef = useRef<HTMLDivElement>(null);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const requiredFields = [
      ["name", "Name"],
      ["email", "Work email"],
      ["company", "Company"],
      ["role", "Role"],
      ["workflow", "Describe the workflow"],
      ["constraint", "What keeps this workflow human-controlled today?"],
    ] as const;
    const nextErrors = requiredFields
      .filter(([name]) => !String(data.get(name) ?? "").trim())
      .map(([, label]) => `${label} is required.`);
    const email = String(data.get("email") ?? "").trim();
    if (email && !/^\S+@\S+\.\S+$/.test(email)) nextErrors.push("Enter a valid work email address.");
    if (data.get("consent") !== "yes") nextErrors.push("Consent is required before sending this inquiry.");

    if (nextErrors.length) {
      setErrors(nextErrors);
      setStatus("error");
      setStatusMessage("Review the fields below. Nothing has been sent.");
      requestAnimationFrame(() => errorRef.current?.focus());
      return;
    }

    setErrors([]);
    setStatus("submitting");
    setStatusMessage("Sending your workflow inquiry…");
    const inquiry: WorkflowInquiry = {
      name: String(data.get("name")),
      email,
      company: String(data.get("company")),
      role: String(data.get("role")),
      workflow: String(data.get("workflow")),
      constraint: String(data.get("constraint")),
      changeRequired: String(data.get("changeRequired") ?? ""),
      consent: true,
    };
    const result = await submitWorkflowInquiry(inquiry);
    if (result.ok) {
      setStatus("success");
      setStatusMessage("Your workflow inquiry was sent to Sthiraka.");
      form.reset();
    } else {
      setStatus("error");
      setStatusMessage(result.message);
      requestAnimationFrame(() => errorRef.current?.focus());
    }
  };

  return (
    <form className="inquiry-form" noValidate onSubmit={onSubmit}>
      {errors.length > 0 ? (
        <div className="form-error-summary" role="alert" tabIndex={-1} ref={errorRef}>
          <strong>Please review {errors.length === 1 ? "this field" : "these fields"}:</strong>
          <ul>{errors.map((error) => <li key={error}>{error}</li>)}</ul>
        </div>
      ) : null}
      <div className="form-grid">
        <label><span>Name <b aria-hidden="true">*</b></span><input name="name" autoComplete="name" required /></label>
        <label><span>Work email <b aria-hidden="true">*</b></span><input name="email" type="email" autoComplete="email" required /></label>
        <label><span>Company <b aria-hidden="true">*</b></span><input name="company" autoComplete="organization" required /></label>
        <label><span>Role <b aria-hidden="true">*</b></span><input name="role" autoComplete="organization-title" required /></label>
      </div>
      <label><span>Describe the workflow <b aria-hidden="true">*</b></span><textarea name="workflow" rows={4} required /></label>
      <label><span>What keeps this workflow human-controlled today? <b aria-hidden="true">*</b></span><textarea name="constraint" rows={4} required /></label>
      <label><span>What would have to change for AI to take on more of it? <small>Optional</small></span><textarea name="changeRequired" rows={3} /></label>
      <label className="consent-row">
        <input name="consent" type="checkbox" value="yes" required />
        <span>Sthiraka may use this information to respond to this inquiry. Do not submit confidential, privileged, regulated or personal source material. Read the <a href="/privacy">privacy notice</a>.</span>
      </label>
      <div className="form-submit-row">
        <button className="button button-primary" type="submit" disabled={status === "submitting"}>
          {status === "submitting" ? "Sending…" : "Send workflow"} <span aria-hidden="true">↗</span>
        </button>
        <p className={`form-status is-${status}`} role="status" aria-live="polite">
          {statusMessage}
          {status === "error" && statusMessage ? <> <a href="mailto:shreyas@sthiraka.com">Email Sthiraka directly.</a></> : null}
        </p>
      </div>
    </form>
  );
}

export default function Home() {
  const [activeWorkflow, setActiveWorkflow] = useState(0);
  const [evidenceComplete, setEvidenceComplete] = useState(false);
  const [traceOpen, setTraceOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [headerPinned, setHeaderPinned] = useState(false);

  useEffect(() => {
    const onScroll = () => setHeaderPinned(window.scrollY > window.innerHeight * 0.72);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    document.documentElement.classList.add("reveal-ready");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
      document.documentElement.classList.remove("reveal-ready");
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <IntroOverlay />
      <a className="skip-link" href="#main-content">Skip to content</a>
      <div id="page-shell">
        <header className={`site-header ${headerPinned ? "is-pinned" : ""}`}>
          <div className="nav-shell">
            <a className="brand" href="#top" aria-label="Sthiraka home" onClick={closeMenu}>
              <img src="/assets/brand/sthiraka-emblem.svg" alt="" />
              <span>STHIRAKA</span>
            </a>
            <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="site-navigation" onClick={() => setMenuOpen((open) => !open)}>
              <span>{menuOpen ? "Close" : "Menu"}</span><span aria-hidden="true">{menuOpen ? "×" : "≡"}</span>
            </button>
            <nav id="site-navigation" className={menuOpen ? "is-open" : ""} aria-label="Primary">
              <div className="nav-links">
                <a href="#oetra" onClick={closeMenu}>OETRA</a><a href="#workflows" onClick={closeMenu}>Workflows</a><a href="#how-we-work" onClick={closeMenu}>How We Work</a><a href="#public-proof" onClick={closeMenu}>Public Proof</a><a href="#company" onClick={closeMenu}>Company</a>
              </div>
              <div className="nav-actions">
                <a className="nav-secondary" href="#public-proof" onClick={closeMenu}>Inspect OETRA</a>
                <a className="button button-small" href="#contact" onClick={closeMenu}>Discuss a workflow</a>
              </div>
            </nav>
          </div>
        </header>

        <main id="main-content" tabIndex={-1}>
          <section className="hero" id="top" aria-labelledby="hero-title">
            <div className="hero-shell section-shell">
              <div className="hero-copy">
                <p className="eyebrow"><span>STHIRAKA</span><i />OETRA</p>
                <h1 id="hero-title">We enable enterprises to automate high-value workflows they cannot safely hand to AI today.</h1>
                <p className="hero-subheadline">OETRA-class systems keep the required evidence, time, state, scope, conflicts and decision trail attached as AI moves from answering questions toward executing work.</p>
                <p className="hero-support">The result is not “better chat.” It is a larger automation boundary for work where the basis of the decision still has to hold.</p>
                <div className="button-row">
                  <a className="button button-primary" href="#contact">Discuss a workflow <span aria-hidden="true">↗</span></a>
                  <a className="button button-secondary" href="#public-proof">Inspect an OETRA-class system <span aria-hidden="true">↓</span></a>
                </div>
                <p className="proof-microline"><span aria-hidden="true">●</span> Implemented research system · public paper · repository · frozen replay · evaluated on 1,005 temporal questions</p>
              </div>
              <div className="control-surface" aria-label="Examples of OETRA workflow control states">
                <div className="surface-topline"><span>OETRA / WORKFLOW CONTROL</span><span className="surface-live"><i aria-hidden="true" /> STATE VISIBLE</span></div>
                <div className="workflow-tabs" role="tablist" aria-label="Workflow example">
                  {workflowExamples.map((workflow, index) => (
                    <button key={workflow.short} type="button" role="tab" aria-selected={activeWorkflow === index} aria-controls={`workflow-panel-${index}`} id={`workflow-tab-${index}`} onClick={() => setActiveWorkflow(index)}>{workflow.short}</button>
                  ))}
                </div>
                <div className="workflow-stack">
                  {workflowExamples.map((workflow, index) => (
                    <article className="workflow-example" data-active={activeWorkflow === index} id={`workflow-panel-${index}`} role="tabpanel" aria-labelledby={`workflow-tab-${index}`} key={workflow.title} onMouseEnter={() => setActiveWorkflow(index)}>
                      <div className="workflow-heading">
                        <span className="workflow-index">0{index + 1}</span>
                        <div><h2>{workflow.title}</h2><p>{workflow.task}</p></div>
                        <span className={`state-badge is-${workflow.outputState}`}>{workflow.outputState === "blocked" ? "BLOCKED" : "READY"}</span>
                      </div>
                      <div className="state-list">
                        {workflow.states.map(([label, value, tone]) => <div className={`state-item is-${tone}`} key={label}><span><i aria-hidden="true" />{label}</span><strong>{value}</strong></div>)}
                      </div>
                      <div className="workflow-result"><span>{workflow.angle}</span><strong>{workflow.output}</strong></div>
                    </article>
                  ))}
                </div>
                <p className="surface-caption">Task requirements remain attached from evidence to outcome.</p>
              </div>
            </div>
          </section>

          <section className="section boundary-section reveal" aria-labelledby="boundary-title">
            <div className="section-shell">
              <div className="section-heading split-heading">
                <div><p className="eyebrow">WHY HIGH-VALUE WORK STAYS HUMAN-CONTROLLED</p><h2 id="boundary-title">The model is rarely the only thing blocking automation.</h2></div>
                <div className="section-intro"><p>Enterprises already have capable models, cloud, data and AI initiatives.</p><p>The work that remains difficult to hand over is often the work where the organization needs more than a plausible answer.</p><p className="intro-emphasis">It needs to know:</p></div>
              </div>
              <div className="boundary-grid">
                <ol className="requirement-list">
                  {["whether the right evidence was used;", "whether that evidence was valid for the required time or state;", "whether every required fact existed;", "whether conflicts were preserved;", "whether the output can be reconstructed later;", "whether the system should have stopped instead."].map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, "0")}</span>{item}</li>)}
                </ol>
                <div className="business-angles">
                  {[["Automation coverage", "High-value work stays human-controlled."], ["Verification burden", "Experts still search, reconcile and re-check after AI responds."], ["Decision speed", "Review can become the bottleneck after generation becomes fast."], ["Decision quality", "One missing or wrong-state fact can change an otherwise fluent result."], ["Accountability", "Teams need a basis they can inspect when the output matters."]].map(([title, copy], index) => <div className="angle-row" key={title}><span className="angle-number">0{index + 1}</span><h3>{title}</h3><p>{copy}</p></div>)}
                </div>
              </div>
              <blockquote className="statement-callout">The problem is not that AI cannot answer. The problem is that enterprises still cannot hand it all of the work.</blockquote>
            </div>
          </section>

          <section className="section oetra-section reveal" id="oetra" aria-labelledby="oetra-title">
            <div className="section-shell">
              <div className="section-heading narrow-heading">
                <p className="eyebrow">OETRA-CLASS SYSTEMS</p><h2 id="oetra-title">Keep the decision requirements alive through the full AI workflow.</h2>
                <div className="definition-copy"><p>OETRA is a class of evidence-and-execution systems for enterprise AI operating on changing state.</p><p>A task is not treated as one pooled retrieval request. Required facts, conditions and action obligations remain identifiable through the workflow.</p></div>
              </div>
              <ol className="control-chain" aria-label="OETRA continuous control chain">
                {controlSteps.map(([number, label, action, translation]) => <li key={label} tabIndex={0}><span className="control-number">{number}</span><h3>{label}</h3><p>{action}</p><span className="control-translation">{translation}</span></li>)}
              </ol>
              <div className="truth-lines" aria-label="OETRA operating principles">
                <p><span>01</span>Grounded is not enough if the evidence is from the wrong time.</p><p><span>02</span>Fluency is not completeness.</p><p><span>03</span>A trace matters when it tells you what the system relied on.</p>
              </div>
            </div>
          </section>

          <section className="section workflows-section reveal" id="workflows" aria-labelledby="workflows-title">
            <div className="section-shell">
              <div className="section-heading split-heading compact">
                <div><p className="eyebrow">HORIZONTAL BY ARCHITECTURE</p><h2 id="workflows-title">One class of system. Different reasons enterprises need it.</h2></div>
                <p className="large-support">The workflow, evidence and buyer change.<br />The underlying control problem can remain the same.</p>
              </div>
              <div className="workflow-table" role="table" aria-label="Enterprise workflow surfaces">
                <div className="workflow-table-head" role="row"><span role="columnheader">Environment</span><span role="columnheader">Business reason</span><span role="columnheader">OETRA angle</span><span role="columnheader">Status</span></div>
                {workflowRows.map(([environment, reason, angle, rowStatus], index) => (
                  <details className="workflow-row" role="row" key={environment} open>
                    <summary><span className="row-index">0{index + 1}</span><strong>{environment}</strong><span className="mobile-row-status">{rowStatus}</span><span className="row-toggle" aria-hidden="true">+</span></summary>
                    <div className="workflow-row-detail"><p data-label="Business reason">{reason}</p><p data-label="OETRA angle">{angle}</p><p data-label="Status"><span className="status-rule">{rowStatus}</span></p></div>
                  </details>
                ))}
              </div>
              <p className="closing-line">OETRA is not a collection of vertical AI applications. It is a reusable class of systems whose business value changes with the workflow.</p>
            </div>
          </section>

          <section className="section commercial-section reveal" id="how-we-work" aria-labelledby="commercial-title">
            <div className="section-shell">
              <div className="section-heading narrow-heading"><p className="eyebrow">APPLY · PROVE · COMPOUND</p><h2 id="commercial-title">Start with the workflow. Build what repeats.</h2></div>
              <div className="commercial-paths">
                <article className="commercial-path applied-path">
                  <p className="path-label">APPLIED OETRA</p><h3>Apply OETRA to a high-value workflow that AI still cannot carry end to end.</h3>
                  <p>Sthiraka maps the workflow&apos;s real decision structure, evidence requirements and human review boundary into an OETRA-class system and tests what changes.</p>
                  <p className="path-public-line">Apply OETRA to a workflow where evidence, time, state, completeness or trace still prevents AI from taking on more of the work.</p>
                  <div className="path-detail-grid">
                    <div><h4>The first work establishes</h4><ul className="plain-list"><li>exact task / decision;</li><li>current human-controlled step;</li><li>evidence and state requirements;</li><li>current review / reconstruction work;</li><li>failure consequence;</li><li>measurable acceptance criteria.</li></ul></div>
                    <div><h4>Measure</h4><p className="measure-list">automation coverage · review effort · decision cycle time · correction / reopen rate · evidence completeness · unsupported-pass rate · trace reconstruction effort</p></div>
                  </div>
                  <ol className="commercial-sequence" aria-label="Applied OETRA commercial sequence">{["Workflow definition", "evaluation", "paid pilot", "operational expansion"].map((item, index) => <li key={item}><span>0{index + 1}</span>{item}</li>)}</ol>
                  <ArrowLink href="#contact">Discuss an Applied OETRA workflow</ArrowLink>
                </article>
                <article className="commercial-path agentic-path">
                  <p className="path-label">PRODUCT · AGENTIC OETRA</p><h3>Carry OETRA&apos;s controls from evidence-grounded reasoning into stateful AI execution.</h3><p>Agentic OETRA is Sthiraka&apos;s reusable product direction.</p><p>It is intended for recurring enterprise workflows where the system must preserve task obligations, evidence ownership, time/state, conflicts and trace as AI moves through multiple steps and actions.</p>
                  <div className="agentic-capabilities">{["reusable workflow definitions", "explicit evidence / action obligations", "grounded evidence ownership", "temporal / state compatibility", "conflict visibility", "reconstructible traces", "bounded stop / refusal", "stateful multi-step execution", "progression from answer generation toward controlled action"].map((item, index) => <span key={item}><i>{String(index + 1).padStart(2, "0")}</i>{item}</span>)}</div>
                  <p className="stage-statement">The OETRA architecture is implemented. Agentic OETRA is the reusable product direction being built from what survives real workflow evaluation and deployment.</p>
                  <ArrowLink href="#contact">Discuss Agentic OETRA</ArrowLink>
                </article>
              </div>
              <div className="relationship-line">
                {["APPLY TO ONE WORKFLOW", "MEASURE VALUE", "REUSE THE CONTROL", "EXPAND INTO AGENTIC EXECUTION"].map((item, index) => <span key={item}>{item}{index < 3 ? <i aria-hidden="true">→</i> : null}</span>)}
                <p>Applied OETRA establishes the workflow. Agentic OETRA compounds what becomes repeatable.</p>
              </div>
            </div>
          </section>

          <section className="section evidence-section reveal" aria-labelledby="evidence-title">
            <div className="section-shell evidence-shell">
              <div className="evidence-copy">
                <p className="eyebrow">ONE WORKFLOW · FOUR REQUIRED FACTS</p><h2 id="evidence-title">Three correct facts are still an incomplete decision.</h2>
                <div className="evidence-question"><span>QUESTION</span><p>Compare Company A and Company B across Q2 and Q3 revenue.</p></div>
                <div className="buyer-translations">{[["Completeness", "The task cannot silently skip a required operand."], ["Temporal correctness", "Publication time does not have to be confused with the period described."], ["Groundedness", "Each required fact retains identifiable support."], ["Traceability", "The reviewer can reconstruct the basis."], ["Bounded refusal", "Missing support can stop the workflow."]].map(([title, copy]) => <p key={title}><strong>{title}</strong>{copy}</p>)}</div>
              </div>
              <div className="evidence-demo">
                <div className="demo-toolbar"><span>REQUIRED EVIDENCE / 04</span><button type="button" className="text-button" onClick={() => setTraceOpen((open) => !open)} aria-expanded={traceOpen}>{traceOpen ? "Hide trace" : "Reveal trace"}</button></div>
                <div className="evidence-matrix">
                  {[["Company A", "Q2"], ["Company A", "Q3"], ["Company B", "Q2"], ["Company B", "Q3"]].map(([company, period], index) => {
                    const supported = index < 3 || evidenceComplete;
                    return <div className={`evidence-cell ${supported ? "is-supported" : "is-missing"}`} key={`${company}-${period}`}><span className="cell-state"><i aria-hidden="true" />{supported ? "SUPPORTED" : "MISSING"}</span><strong>{company}</strong><b>{period}</b><div className={`cell-trace ${traceOpen ? "is-open" : ""}`}>{supported ? <><span>Source · earnings transcript</span><span>Target period · {period}</span><span>Reported period · {period}</span><span>Evidence owner · {company} / {period}</span></> : <span>No qualifying evidence attached.</span>}</div></div>;
                  })}
                </div>
                <div className={`system-result ${evidenceComplete ? "is-ready" : "is-blocked"}`} aria-live="polite">
                  <div><span>SYSTEM RESULT</span><strong>{evidenceComplete ? "Reviewable comparison" : "Comparison incomplete — B/Q3 unsupported"}</strong><p>{evidenceComplete ? "Four supported. Evidence ownership retained." : "Three supported. One missing."}</p></div>
                  <button type="button" onClick={() => setEvidenceComplete((complete) => !complete)}>{evidenceComplete ? "Reset state" : "Resolve missing evidence"}</button>
                </div>
              </div>
              <blockquote className="statement-callout evidence-callout">A complete-looking answer is not the same as a complete decision.</blockquote>
            </div>
          </section>

          <section className="section proof-section reveal" id="public-proof" aria-labelledby="proof-title">
            <div className="section-shell">
              <div className="proof-heading"><p className="eyebrow">IMPLEMENTED · PUBLICLY INSPECTABLE · EVALUATED</p><h2 id="proof-title">{"ChronoRAG-G is the first public implemented and evaluated OETRA-class system in Sthiraka's current technical lineage."}</h2><div className="proof-intro"><p>ChronoRAG-G applies ordered evidence obligations, stable evidence ownership, temporal compatibility, grounding, trace and bounded refusal in a financial temporal question-answering setting.</p><p><strong>It is not the commercial product.</strong> It is public evidence that an OETRA-class architecture has been built and measured.</p></div></div>
              <div className="scope-strip"><div><span>FROZEN EVALUATION SCOPE</span><strong>1,005</strong><p>temporal questions</p></div><div><span>SOURCE CORPUS</span><strong>480</strong><p>updated earnings-call transcripts</p></div></div>
              <div className="metric-ledger" aria-label="ChronoRAG-G public results">
                {[["Audited answer accuracy", "811 / 1,005", "80.70%"], ["Required evidence coverage", "3,837 / 3,889", "98.66% micro required-slot coverage"], ["Hybrid evidence resolution", "978 / 1,005", "97.31%"], ["Complete strict traces", "846 / 882", "95.92% in eligible multi-part cases"], ["New-query unanswerables", "101 / 101", "designated cases"]].map(([label, fraction, result]) => <div className="metric-row" key={label}><span>{label}</span><strong>{fraction}</strong><b>{result}</b></div>)}
              </div>
              <div className="comparison-block">
                <div className="comparison-bars" aria-label="Whole-pipeline result-level comparison"><div><span>ChronoRAG-G</span><i style={{ "--bar": "80.70%" } as React.CSSProperties} /><strong>80.70%</strong></div><div><span>Cited TG-RAG result</span><i style={{ "--bar": "59.74%" } as React.CSSProperties} /><strong>59.74%</strong></div><p>Observed result-level gap <strong>+20.95 percentage points</strong></p></div>
                <p className="comparison-caveat"><span>CAVEAT</span>Whole-pipeline result-level comparison. Retrieval, prompting and adjudication protocols differ. Not an identical controlled reimplementation.</p>
              </div>
              <div className="limitation-block"><span>IMPORTANT LIMITATION · 167 rejected answers had complete strict traces</span><p>The evidence path can be strong while answer construction still fails. That separation is why OETRA evaluates the path instead of hiding everything inside one accuracy number.</p></div>
              <div className="demo-frame-shell">
                <div className="demo-frame-header"><div><span className="demo-status-dot" aria-hidden="true" /><p><strong>ChronoRAG-G</strong> / public frozen replay</p></div><a href="https://chronorag-g-demo.vercel.app/" target="_blank" rel="noreferrer">Open public replay <span aria-hidden="true">↗</span></a></div>
                <a className="demo-capture" href="https://chronorag-g-demo.vercel.app/" target="_blank" rel="noreferrer" aria-label="Open the live ChronoRAG-G public replay in a new tab">
                  <img src="/assets/proof/chronorag-g-replay.webp" alt="The ChronoRAG-G public replay showing a seven-fact financial question and its inspectable evidence trace" loading="lazy" width="1440" height="900" />
                  <span>Captured from the live public replay. Embedding is blocked by <strong>X-Frame-Options: DENY</strong>. Open the interactive replay <b aria-hidden="true">↗</b></span>
                </a>
              </div>
              <div className="public-link-grid">{publicLinks.map(([label, href]) => <ArrowLink href={href} external key={label}>{label}</ArrowLink>)}</div>
            </div>
          </section>

          <section className="section value-section reveal" aria-labelledby="value-title">
            <div className="section-shell">
              <div className="section-heading split-heading compact"><div><p className="eyebrow">WHAT A COMMERCIAL TEST HAS TO CHANGE</p><h2 id="value-title">Technical proof earns the test. Business value decides whether the system stays.</h2></div><p className="large-support">A commercial test measures whether the workflow changes—not only whether the system can answer.</p></div>
              <ol className="measure-ledger">{businessMeasures.map(([title, copy], index) => <li key={title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{copy}</p></li>)}</ol>
              <p className="closing-line value-close">The architecture wins only if the workflow economics move.</p>
            </div>
          </section>

          <section className="section company-section reveal" id="company" aria-labelledby="company-title">
            <div className="section-shell company-shell">
              <div className="company-mark" aria-hidden="true"><img src="/assets/brand/sthiraka-emblem.svg" alt="" /><span>STHIRAKA</span></div>
              <div className="company-copy"><p className="eyebrow">WHY STHIRAKA</p><h2 id="company-title">Power becomes durable when it remains aligned with purpose.</h2><div className="company-story"><p>Sthiraka is built around the idea of remaining steady under change. Its emblem depicts an original Great Flame Bird rising from a changing ocean toward one fixed star.</p><p>The ocean represents a reality that never stops moving. The bird represents intelligence and capability. The star represents direction—the reference that must not be lost as power grows and conditions change.</p><p>The principle is simple: power by itself is unstable. Power becomes durable when it remains aligned with purpose.</p><p>Sthiraka applies that principle to intelligent systems. As AI becomes capable of taking on more consequential work, its decisions must remain connected to the evidence and reality that make those decisions valid.</p></div></div>
              <div className="identity-statements">
                <article id="mission"><span>MISSION</span><h3>Put AI to work in high-value enterprise workflows while preserving the evidence needed to defend each decision.</h3><p>Sthiraka puts AI to work in high-value enterprise workflows while preserving the evidence needed to defend each decision. We build systems that keep changing information, source lineage, and decision boundaries attached to AI outputs so organizations can move more work forward without turning verification into a second manual process.</p></article>
                <article id="vision"><span>VISION</span><h3>A world where intelligent systems remain aligned with reality as it changes.</h3><p>We envision a world where intelligent systems can operate through constant change without drifting away from reality. As information, conditions, and decisions evolve, the systems acting on them should remain anchored to the evidence and constraints that make their conclusions valid.</p></article>
              </div>
            </div>
          </section>

          <section className="section founder-section reveal" id="founder" aria-labelledby="founder-name">
            <div className="section-shell founder-shell">
              <div className="founder-image-wrap"><img className="founder-photo" src="/assets/founder/shreyas-gowda.webp" alt="Shreyas Gowda S, Founder and CEO of Sthiraka" loading="lazy" width="960" height="960" /></div>
              <div className="founder-copy"><p className="eyebrow">FOUNDER &amp; CEO</p><h2 id="founder-name">Shreyas Gowda S</h2><p>Builder of Sthiraka and the OETRA / ChronoRAG-G technical lineage.</p><div className="founder-links"><ArrowLink href="mailto:shreyas@sthiraka.com">Email</ArrowLink><ArrowLink href="https://www.linkedin.com/in/shreyasshashi/" external>LinkedIn</ArrowLink><ArrowLink href="https://x.com/shreyasskg" external>X</ArrowLink></div></div>
            </div>
          </section>

          <section className="section contact-section reveal" id="contact" aria-labelledby="contact-title">
            <div className="section-shell contact-shell">
              <div className="contact-heading"><p className="eyebrow">ONE WORKFLOW IS ENOUGH TO START</p><h2 id="contact-title">What high-value work are you still keeping human-controlled?</h2><p>If AI already helps but the workflow still depends on manual evidence checks, version reconciliation, complete fact coverage, conflict review or reconstructing the decision basis, that is the conversation.</p><div className="first-discussion"><span>FIRST DISCUSSION / ESTABLISH</span><p>workflow · business owner · current human-controlled step · evidence / state constraint · failure economics · what an OETRA evaluation must prove</p></div><a className="text-cta" href="#public-proof">Inspect OETRA in action first <span aria-hidden="true">↓</span></a></div>
              <WorkflowInquiryForm />
            </div>
          </section>
        </main>

        <footer className="site-footer">
          <div className="section-shell footer-grid">
            <div className="footer-brand"><a className="brand brand-light" href="#top" aria-label="Sthiraka home"><img src="/assets/brand/sthiraka-emblem.svg" alt="" /><span>STHIRAKA</span></a><p>We enable enterprises to automate high-value workflows they cannot safely hand to AI today.</p></div>
            <div className="footer-column"><h2>OETRA</h2><a href="#how-we-work">Applied OETRA</a><a href="#how-we-work">Agentic OETRA</a><a href="#workflows">Workflows</a><a href="#public-proof">Public proof</a></div>
            <div className="footer-column"><h2>Company</h2><a href="#company">Why Sthiraka</a><a href="#mission">Mission</a><a href="#vision">Vision</a><a href="#founder">Founder</a><a href="#contact">Contact</a><a href="/privacy">Privacy</a></div>
            <div className="footer-column"><h2>Public proof</h2><a href="#public-proof">ChronoRAG-G</a><a href="https://github.com/SSKG2602/ChronoRAG-G" target="_blank" rel="noreferrer">GitHub</a><a href="https://doi.org/10.5281/zenodo.22116070" target="_blank" rel="noreferrer">DOI</a><a href="https://zenodo.org/records/22116070" target="_blank" rel="noreferrer">Zenodo</a><a href="https://chronorag-g-demo.vercel.app/" target="_blank" rel="noreferrer">Replay</a><a href="https://huggingface.co/datasets/austinmyc/ECT-QA" target="_blank" rel="noreferrer">ECT-QA</a></div>
            <div className="footer-column footer-contact"><h2>Contact</h2><a href="mailto:contact@sthiraka.com">contact@sthiraka.com</a><a href="mailto:shreyas@sthiraka.com">shreyas@sthiraka.com</a></div>
          </div>
          <div className="section-shell footer-bottom"><p>Sthiraka — company · OETRA — class of systems / architecture · ChronoRAG-G — public implemented and evaluated research system</p><span>© {new Date().getFullYear()} Sthiraka</span></div>
        </footer>
      </div>
    </>
  );
}
