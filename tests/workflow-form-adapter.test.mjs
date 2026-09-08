import assert from "node:assert/strict";
import test from "node:test";

import { submitWorkflowInquiry } from "../app/workflow-form-adapter.ts";

const endpoint = "https://api.web3forms.com/submit";
const inquiry = {
  name: "Sthiraka integration test",
  email: "workflow-test@example.com",
  company: "Sthiraka Test",
  role: "QA",
  workflow: "Clearly marked test workflow",
  constraint: "Test-only human control condition",
  changeRequired: "Test-only evidence condition",
  consent: true,
  botcheck: "",
};

test("Web3Forms adapter sends the complete payload and requires confirmed success", async (t) => {
  const originalFetch = globalThis.fetch;

  t.after(() => {
    globalThis.fetch = originalFetch;
  });

  await t.test("posts Web3Forms JSON with visitor email as Reply-To", async () => {
    let capturedUrl;
    let capturedInit;
    globalThis.fetch = async (url, init) => {
      capturedUrl = url;
      capturedInit = init;
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    };

    assert.deepEqual(await submitWorkflowInquiry(inquiry), { ok: true });
    assert.equal(capturedUrl, endpoint);
    assert.equal(capturedInit.method, "POST");
    const headers = new Headers(capturedInit.headers);
    assert.equal(headers.get("Accept"), "application/json");
    assert.equal(headers.get("Content-Type"), "application/json");
    const body = JSON.parse(capturedInit.body);
    assert.match(body.access_key, /^[0-9a-f-]{36}$/);
    assert.deepEqual(body, {
      access_key: body.access_key,
      subject: "New Sthiraka Workflow Inquiry",
      from_name: "Sthiraka Website",
      name: inquiry.name,
      email: inquiry.email,
      replyto: inquiry.email,
      company: inquiry.company,
      role: inquiry.role,
      workflow: inquiry.workflow,
      humanControlledReason: inquiry.constraint,
      desiredChange: inquiry.changeRequired,
      consent: true,
      botcheck: "",
    });
  });

  await t.test("does not report success for an unconfirmed JSON response", async () => {
    globalThis.fetch = async () =>
      new Response(JSON.stringify({ success: false }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    assert.equal((await submitWorkflowInquiry(inquiry)).ok, false);
  });

  await t.test("does not report success for a failed HTTP response", async () => {
    globalThis.fetch = async () =>
      new Response(JSON.stringify({ success: true }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    assert.equal((await submitWorkflowInquiry(inquiry)).ok, false);
  });

  await t.test("does not report success for malformed JSON", async () => {
    globalThis.fetch = async () => new Response("not json", { status: 200 });
    assert.equal((await submitWorkflowInquiry(inquiry)).ok, false);
  });

  await t.test("omits the optional desired change when it is empty", async () => {
    let capturedBody;
    globalThis.fetch = async (_url, init) => {
      capturedBody = JSON.parse(init.body);
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    };
    assert.deepEqual(
      await submitWorkflowInquiry({ ...inquiry, changeRequired: "" }),
      { ok: true },
    );
    assert.equal("desiredChange" in capturedBody, false);
  });
});
