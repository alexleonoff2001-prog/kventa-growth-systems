export async function POST(request: Request) {
  const requestOrigin = request.headers.get("origin");
  const siteOrigin = new URL(request.url).origin;
  if (requestOrigin && requestOrigin !== siteOrigin) {
    return Response.json({ ok: false, error: "forbidden_origin" }, { status: 403 });
  }

  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  const webhookToken = process.env.KVENTA_WEBHOOK_TOKEN;
  if (!webhookUrl || !webhookToken) {
    return Response.json({ ok: false, error: "lead_storage_not_configured" }, { status: 503 });
  }

  try {
    const body = await request.json() as { name?: unknown; phone?: unknown };
    const name = typeof body.name === "string" ? body.name.trim().slice(0, 120) : "";
    const phone = typeof body.phone === "string" ? body.phone.trim().slice(0, 32) : "";
    const phoneDigits = phone.replace(/\D/g, "");

    if (name.length < 2 || phoneDigits.length !== 11) {
      return Response.json({ ok: false, error: "invalid_lead" }, { status: 400 });
    }

    const id = `KV-${Date.now().toString(36).toUpperCase()}-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ token: webhookToken, id, name, phone }),
      redirect: "follow",
    });
    const result = await response.json().catch(() => null) as { ok?: boolean } | null;

    if (!response.ok || result?.ok !== true) {
      return Response.json({ ok: false, error: "lead_storage_failed" }, { status: 502 });
    }

    return Response.json({ ok: true, id }, { status: 201 });
  } catch {
    return Response.json({ ok: false, error: "invalid_request" }, { status: 400 });
  }
}
