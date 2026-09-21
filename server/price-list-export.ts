import ExcelJS from "exceljs";
import { readFile } from "node:fs/promises";
import path from "node:path";

export type ExportOrderItem = {
  sku: string;
  variant: string;
  quantity: number;
};

const TEMPLATE_PATH = path.resolve(process.cwd(), "server/templates/LISTAJUNIO2026.xlsx");
const FIRST_DATA_ROW = 3;
const LAST_DATA_ROW = 267;
const TOTAL_ROW = 267;

function articleCandidates(item: ExportOrderItem): string[] {
  const values = [item.variant, item.sku];
  const candidates: string[] = [];
  for (const value of values) {
    const matches = value.match(/(?:^|\D)(\d{3,4})(?=\D|$)/g) ?? [];
    for (const match of matches) {
      const code = match.replace(/\D/g, "");
      if (code.length >= 3) candidates.push(code);
    }
  }
  return Array.from(new Set(candidates));
}

function articleCode(value: ExcelJS.CellValue): string | null {
  if (typeof value === "number") return String(Math.trunc(value));
  if (typeof value === "string" && /^\d{3,4}$/.test(value.trim())) return value.trim();
  return null;
}

export async function buildPriceListExport(items: ExportOrderItem[]): Promise<Uint8Array> {
  const template = await readFile(TEMPLATE_PATH);
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.load(template as unknown as ArrayBuffer);
  const worksheet = workbook.worksheets[0];
  if (!worksheet) throw new Error("No se encontró la hoja principal de la lista de precios.");

  const knownArticles = new Set<string>();
  for (let row = FIRST_DATA_ROW; row < TOTAL_ROW; row += 1) {
    const code = articleCode(worksheet.getCell(`A${row}`).value);
    if (code) knownArticles.add(code);
  }

  const quantityByArticle = new Map<string, number>();
  for (const item of items) {
    const candidates = articleCandidates(item);
    const selected = candidates.find(candidate => knownArticles.has(candidate));
    if (selected) quantityByArticle.set(selected, (quantityByArticle.get(selected) ?? 0) + item.quantity);
  }

  for (let row = FIRST_DATA_ROW; row < TOTAL_ROW; row += 1) {
    const code = articleCode(worksheet.getCell(`A${row}`).value);
    if (!code) continue;
    const quantity = quantityByArticle.get(code) ?? 0;
    worksheet.getCell(`I${row}`).value = quantity;
    worksheet.getCell(`K${row}`).value = { formula: `I${row}*G${row}` };
  }

  worksheet.getCell(`K${TOTAL_ROW}`).value = { formula: `SUM(K${FIRST_DATA_ROW}:K${TOTAL_ROW - 1})` };
  worksheet.getCell(`K${TOTAL_ROW}`).numFmt = '$#,##0.00';
  return Buffer.from(await workbook.xlsx.writeBuffer());
}
