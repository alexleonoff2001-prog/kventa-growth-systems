const githubPagesOrigin = "https://alexleonoff2001-prog.github.io";

function corsHeaders(request: Request) {
  const origin = request.headers.get("origin");
  const siteOrigin = new URL(request.url).origin;
  const allowedOrigin = origin === siteOrigin || origin === githubPagesOrigin ? origin : siteOrigin;

  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Vary": "Origin",
  };
}

function json(request: Request, body: Record<string, unknown>, status: number) {
  return Response.json(body, { status, headers: corsHeaders(request) });
}

export async function OPTIONS(request: Request) {
  const origin = request.headers.get("origin");
  const siteOrigin = new URL(request.url).origin;
  if (origin !== siteOrigin && origin !== githubPagesOrigin) {
    return json(request, { ok: false, error: "forbidden_origin" }, 403);
  }
  return new Response(null, { status: 204, headers: corsHeaders(request) });
}

export async function POST(request: Request) {
  const requestOrigin = request.headers.get("origin");
  const siteOrigin = new URL(request.url).origin;
  if (requestOrigin && requestOrigin !== siteOrigin && requestOrigin !== githubPagesOrigin) {
    return json(request, { ok: false, error: "forbidden_origin" }, 403);
  }

  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  const webhookToken = process.env.KVENTA_WEBHOOK_TOKEN;
  if (!webhookUrl || !webhookToken) {
    return json(request, { ok: false, error: "lead_storage_not_configured" }, 503);
  }

  try {
    const body = await request.json() as { name?: unknown; phone?: unknown };
    const name = typeof body.name === "string" ? body.name.trim().slice(0, 120) : "";
    const phone = typeof body.phone === "string" ? body.phone.trim().slice(0, 32) : "";
    const phoneDigits = phone.replace(/\D/g, "");

    if (name.length < 2 || phoneDigits.length !== 11) {
      return json(request, { ok: false, error: "invalid_lead" }, 400);
    }

    const id = `KV-${Date.now().toString(36).toUpperCase()}-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ token: webhookToken, id, name, phone }),
      // Apps Script web apps acknowledge a successful POST with a redirect to
      // their ContentService response. Following that redirect from a Worker can
      // produce a false 5xx even though the row has already been written.
      redirect: "manual",
    });
    const acceptedByAppsScript = response.ok || (response.status >= 300 && response.status < 400);
    if (!acceptedByAppsScript) {
      return json(request, { ok: false, error: "lead_storage_failed" }, 502);
    }

    return json(request, { ok: true, id }, 201);
  } catch {
    return json(request, { ok: false, error: "invalid_request" }, 400);
  }
}
