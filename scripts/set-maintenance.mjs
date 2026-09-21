import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const configPath = path.join(root, "client", "src", "siteConfig.ts");
const mode = process.argv[2];

if (!['on', 'off'].includes(mode)) {
  console.error('Uso: pnpm run maintenance:on | pnpm run maintenance:off');
  process.exit(1);
}

const current = fs.readFileSync(configPath, 'utf8');
const updated = current.replace(/maintenanceMode:\s*(true|false)/, `maintenanceMode: ${mode === 'on'}`);
if (updated === current) {
  console.error('No se encontró maintenanceMode en siteConfig.ts');
  process.exit(1);
}
fs.writeFileSync(configPath, updated, 'utf8');
console.log(`Modo de mantenimiento: ${mode === 'on' ? 'ACTIVADO' : 'DESACTIVADO'}`);
