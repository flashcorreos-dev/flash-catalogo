import { describe, expect, it } from "vitest";
import { buildOrderStatusEmail } from "./order-email";

describe("order status email", () => {
  it("builds a Spanish customer email with order details and history link", () => {
    const email = buildOrderStatusEmail({
      customerName: "Ana",
      orderCode: "FL-ABC123",
      status: "confirmed",
      total: 17100,
      items: [{ name: "Arnés", variant: "382 - Regulable", quantity: 1, unitPrice: 17100 }],
      historyUrl: "https://flash.example/cuenta",
      logoUrl: "https://flash.example/manus-storage/flash-paw-logo.png",
    });
    expect(email.subject).toContain("FLASH · Ana, Tu pedido fue confirmado · FL-ABC123");
    expect(email.html).toContain("Tu pedido ya fue confirmado");
    expect(email.html).toContain("podés avanzar con el pago");
    expect(email.html).toContain("Ver estado e historial de mi pedido");
    expect(email.html).toContain("FLASH<span");
    expect(email.html).toContain("flash-paw-logo.png");
    expect(email.text).toContain("Gracias por confiar en nosotros");
  });
});
