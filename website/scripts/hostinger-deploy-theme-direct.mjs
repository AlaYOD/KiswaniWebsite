import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const cacheRoot = 'C:\\Users\\hp\\AppData\\Local\\npm-cache\\_npx\\a7204b5813574340\\node_modules';
const sdkRoot = path.join(cacheRoot, '@modelcontextprotocol', 'sdk', 'dist', 'esm');
const serverEntry = path.join(cacheRoot, 'hostinger-api-mcp', 'src', 'servers', 'all.js');
const configPath = 'C:\\Users\\hp\\.codex\\config.toml';

const { Client } = await import(pathToFileURL(path.join(sdkRoot, 'client', 'index.js')).href);
const { StdioClientTransport } = await import(pathToFileURL(path.join(sdkRoot, 'client', 'stdio.js')).href);

const config = fs.readFileSync(configPath, 'utf8');
const tokenMatch = config.match(/HOSTINGER_API_TOKEN\s*=\s*'([^']+)'/);

if (!tokenMatch) {
  throw new Error(`HOSTINGER_API_TOKEN was not found in ${configPath}`);
}

const workspace = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const themePath = path.join(workspace, 'wordpress-theme', 'kiswani-lights-v2');

const transport = new StdioClientTransport({
  command: process.execPath,
  args: [serverEntry],
  env: {
    ...process.env,
    HOSTINGER_API_TOKEN: tokenMatch[1],
  },
});

const client = new Client(
  { name: 'kiswani-hostinger-deployer', version: '1.0.0' },
  { capabilities: {} },
);

await client.connect(transport);

try {
  const result = await client.callTool({
    name: 'hosting_deployWordpressTheme',
    arguments: {
      domain: 'kiswanilights.com',
      themePath,
      slug: 'kiswani-lights-v2',
      activate: true,
    },
  });

  console.log(JSON.stringify(result, null, 2));
} finally {
  await client.close();
}
