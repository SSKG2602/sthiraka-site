export type WorkflowInquiry = {
  name: string;
  email: string;
  company: string;
  role: string;
  workflow: string;
  constraint: string;
  changeRequired?: string;
  consent: boolean;
  botcheck?: string;
};

export type WorkflowSubmissionResult =
  | { ok: true }
  | { ok: false; reason: "not-configured" | "request-failed"; message: string };

/**
 * The website never pretends an inquiry was delivered. Configure
 * NEXT_PUBLIC_WORKFLOW_ENDPOINT and NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY before
 * enabling live submissions.
 */
export async function submitWorkflowInquiry(
  inquiry: WorkflowInquiry,
): Promise<WorkflowSubmissionResult> {
  const endpoint = process.env.NEXT_PUBLIC_WORKFLOW_ENDPOINT?.trim();
  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY?.trim();

  if (!endpoint || !accessKey || accessKey === "PASTE_YOUR_ACCESS_KEY_HERE") {
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
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        access_key: accessKey,
        subject: "New Sthiraka Workflow Inquiry",
        from_name: "Sthiraka Website",
        name: inquiry.name,
        email: inquiry.email,
        replyto: inquiry.email,
        company: inquiry.company,
        role: inquiry.role,
        workflow: inquiry.workflow,
        constraint: inquiry.constraint,
        changeRequired: inquiry.changeRequired ?? "",
        consent: inquiry.consent,
        botcheck: inquiry.botcheck ?? "",
      }),
    });
    const responseBody: unknown = await response.json();

    if (
      !response.ok ||
      typeof responseBody !== "object" ||
      responseBody === null ||
      !("success" in responseBody) ||
      responseBody.success !== true
    ) {
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
