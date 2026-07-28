import { getRuntimeEnv } from "../../../lib/runtime-env";

export async function requireAdmin(request: Request): Promise<Response | null> {
  const env = await getRuntimeEnv();
  const configuredPassword = env.ADMIN_PASSWORD || "";

  if (!configuredPassword) {
    return Response.json(
      { error: "Admin password is not configured. Set ADMIN_PASSWORD before using the orders dashboard." },
      { status: 503 },
    );
  }

  const authorization = request.headers.get("authorization") ?? "";
  const suppliedPassword = authorization.startsWith("Bearer ") ? authorization.slice("Bearer ".length).trim() : "";

  if (suppliedPassword !== configuredPassword) {
    return Response.json({ error: "Invalid admin password." }, { status: 401 });
  }

  return null;
}
