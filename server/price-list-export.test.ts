import { describe, expect, it } from "vitest";
import ExcelJS from "exceljs";
import { buildPriceListExport } from "./price-list-export";

describe("price list export", () => {
  it("fills quantity and formulas in the original template range", async () => {
    const file = await buildPriceListExport([{ sku: "004226000803", variant: "803 - ARNES C/ CORREA 1,50 CM", quantity: 2 }]);
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(file as unknown as ArrayBuffer);
    const worksheet = workbook.worksheets[0];
    expect(worksheet).toBeDefined();
    const articleRow = Array.from({ length: 264 }, (_, index) => index + 3).find(row => worksheet?.getCell(`A${row}`).value === 803);
    expect(articleRow).toBeDefined();
    expect(worksheet?.getCell(`I${articleRow}`).value).toBe(2);
    expect(worksheet?.getCell(`K${articleRow}`).value).toMatchObject({ formula: `I${articleRow}*G${articleRow}` });
    expect(worksheet?.getCell("K267").value).toMatchObject({ formula: "SUM(K3:K266)" });
  });
});
