interface Env {
  GOOGLE_SHEETS_WEBHOOK_URL: string;
  KVENTA_WEBHOOK_TOKEN: string;
}

type LeadPayload = {
  name?: unknown;
  phone?: unknown;
};

const responseHeaders = {
  "Content-Type": "application/json; charset=utf-8",
  "Cache-Control": "no-store",
  "X-Content-Type-Options": "nosniff",
};

const json = (body: Record<string, unknown>, status: number) =>
  new Response(JSON.stringify(body), { status, headers: responseHeaders });

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  if (!env.GOOGLE_SHEETS_WEBHOOK_URL || !env.KVENTA_WEBHOOK_TOKEN) {
    return json({ ok: false, error: "lead_storage_not_configured" }, 503);
  }

  try {
    const body = await request.json<LeadPayload>();
    const name = typeof body.name === "string" ? body.name.trim().slice(0, 120) : "";
    const phone = typeof body.phone === "string" ? body.phone.trim().slice(0, 32) : "";
    const phoneDigits = phone.replace(/\D/g, "");

    if (name.length < 2 || phoneDigits.length !== 11) {
      return json({ ok: false, error: "invalid_lead" }, 400);
    }

    const id = `KV-${Date.now().toString(36).toUpperCase()}-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
    const webhookResponse = await fetch(env.GOOGLE_SHEETS_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ token: env.KVENTA_WEBHOOK_TOKEN, id, name, phone }),
      redirect: "manual",
    });

    const accepted = webhookResponse.ok || (webhookResponse.status >= 300 && webhookResponse.status < 400);
    if (!accepted) return json({ ok: false, error: "lead_storage_failed" }, 502);

    return json({ ok: true, id }, 201);
  } catch {
    return json({ ok: false, error: "invalid_request" }, 400);
  }
};
