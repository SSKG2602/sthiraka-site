export type WorkflowInquiry = {
  name: string;
  email: string;
  company: string;
  role: string;
  workflow: string;
  constraint: string;
  changeRequired?: string;
  consent: boolean;
};

export type WorkflowSubmissionResult =
  | { ok: true }
  | { ok: false; reason: "not-configured" | "request-failed"; message: string };

/**
 * The website never pretends an inquiry was delivered. Configure
 * NEXT_PUBLIC_WORKFLOW_FORM_ENDPOINT with an HTTPS endpoint that accepts JSON
 * before enabling live submissions.
 */
export async function submitWorkflowInquiry(
  inquiry: WorkflowInquiry,
): Promise<WorkflowSubmissionResult> {
  const endpoint = process.env.NEXT_PUBLIC_WORKFLOW_FORM_ENDPOINT?.trim();

  if (!endpoint) {
    return {
      ok: false,
      reason: "not-configured",
      message:
        "Online submission is not connected yet. Your information was not sent.",
    };
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(inquiry),
    });

    if (!response.ok) {
      return {
        ok: false,
        reason: "request-failed",
        message:
          "The inquiry could not be sent. No success was recorded. Please email Sthiraka directly.",
      };
    }

    return { ok: true };
  } catch {
    return {
      ok: false,
      reason: "request-failed",
      message:
        "The inquiry could not be sent. No success was recorded. Please email Sthiraka directly.",
    };
  }
}
