type RuntimeEnv = {
  ADMIN_PASSWORD?: string;
  DB?: unknown;
};

let cloudflareEnvPromise: Promise<RuntimeEnv> | null = null;

async function getCloudflareEnv(): Promise<RuntimeEnv> {
  cloudflareEnvPromise ??= (async () => {
    try {
      const moduleName = "cloudflare" + ":workers";
      const mod = (await import(/* @vite-ignore */ moduleName)) as { env?: RuntimeEnv };
      return mod.env ?? {};
    } catch {
      return {};
    }
  })();

  return cloudflareEnvPromise;
}

export async function getRuntimeEnv(): Promise<RuntimeEnv> {
  const cloudflareEnv = await getCloudflareEnv();

  return {
    ADMIN_PASSWORD: cloudflareEnv.ADMIN_PASSWORD ?? process.env.ADMIN_PASSWORD,
    DB: cloudflareEnv.DB,
  };
}
