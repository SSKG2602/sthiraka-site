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
  | { ok: false; reason: "request-failed"; message: string };

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const WEB3FORMS_ACCESS_KEY = "cd219ffb-cc2a-4a10-9d47-db22e38c3764";

export async function submitWorkflowInquiry(
  inquiry: WorkflowInquiry,
): Promise<WorkflowSubmissionResult> {
  try {
    const response = await fetch(WEB3FORMS_ENDPOINT, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: "New Sthiraka Workflow Inquiry",
        from_name: "Sthiraka Website",
        name: inquiry.name,
        email: inquiry.email,
        replyto: inquiry.email,
        company: inquiry.company,
        role: inquiry.role,
        workflow: inquiry.workflow,
        humanControlledReason: inquiry.constraint,
        ...(inquiry.changeRequired
          ? { desiredChange: inquiry.changeRequired }
          : {}),
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
