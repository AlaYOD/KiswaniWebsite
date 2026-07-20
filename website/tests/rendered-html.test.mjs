import assert from "node:assert/strict";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

async function expectPage(pathname, patterns) {
  const response = await render(pathname);
  assert.equal(response.status, 200, `${pathname} should render successfully`);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  const html = await response.text();
  for (const pattern of patterns) assert.match(html, pattern);
  assert.doesNotMatch(html, /Your site is taking shape|Codex is working|react-loading-skeleton/i);
  return html;
}

test("renders the Kiswani homepage and primary discovery links", async () => {
  const html = await expectPage("/", [
    /<title>Architectural lighting for memorable spaces \| Kiswani Lights<\/title>/i,
    /Lighting is the soul of the space/i,
    /href="\/collections\/decorative"/i,
    /href="\/products\/kl-hc-120"/i,
    /href="\/checkout"/i,
  ]);
  assert.match(html, /name="description"/i);
  assert.match(html, /property="og:title"/i);
});

test("renders collection, product, information, and checkout routes", async () => {
  await expectPage("/collections/decorative", [/Decorative lighting/i, /KL-HC-120/i]);
  await expectPage("/products/kl-hc-120", [/Halo Chandelier/i, /96W/i, /\/downloads\/KL-HC-120\.pdf/i]);
  await expectPage("/about", [/About Kiswani/i]);
  await expectPage("/support", [/Support/i]);
  await expectPage("/checkout", [/Complete your lighting order/i, /Customer &amp; delivery details/i]);
});

test("returns a not-found response for unknown catalog routes", async () => {
  const response = await render("/products/not-a-product");
  assert.equal(response.status, 404);
});
