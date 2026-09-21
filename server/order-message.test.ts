import { describe, expect, it } from "vitest";
import { buildOrderMessage } from "../shared/order-message";

describe("buildOrderMessage", () => {
  it("formats article, quantity, prices and purchase code in the requested layout", () => {
    const message = buildOrderMessage([
      { name: "Arnes de polipropileno camuflado", variant: "382 - ARNES DE 3,00 CM REGULABLE CON ENCASTRE", sku: "sku-382", quantity: 1, unitPrice: 17100 },
      { name: "Arnes de nato económico s/ribete", variant: "735 - ARNES N° 3 MEDIANO 3,00 CM", sku: "sku-735", quantity: 2, unitPrice: 17500 },
    ], 52100, "FL-MU8YOWJK");

    expect(message).toBe("Hola, quiero realizar el siguiente pedido:\n\n— Arnes de polipropileno camuflado 3,00 cm regulable c/encastre (ART. 382) x 1: *$17.100,00*\n— Arnes de nato económico s/ribete N° 3 mediano 3,00 cm (ART. 735) x 2: *$35.000,00*\n\nTotal estimado: *$52.100,00*\nCódigo de compra: FL-MU8YOWJK");
  });
});
