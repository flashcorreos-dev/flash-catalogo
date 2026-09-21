export type OrderMessageItem = {
  name: string;
  variant: string;
  quantity: number;
  unitPrice: number;
  sku: string;
};

function formatARS(value: number) {
  return `$${new Intl.NumberFormat("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value)}`;
}

function sentenceCase(value: string) {
  const normalized = value.trim().toLocaleLowerCase("es-AR");
  return normalized ? normalized.charAt(0).toLocaleUpperCase("es-AR") + normalized.slice(1) : normalized;
}

function cleanVariant(value: string) {
  return value
    .replace(/^(arnes|collar|correa|manopla|pretal|bozal|set)(?:\s+de)?\s+/i, "")
    .replace(/\bcon encastre\b/i, "c/encastre");
}

export function buildOrderMessage(items: OrderMessageItem[], total: number, orderCode: string) {
  const lines = items.map(item => {
    const [article, rawVariant = ""] = item.variant.split(" - ");
    const variant = sentenceCase(cleanVariant(rawVariant));
    const product = sentenceCase(item.name);
    return `— ${product}${variant ? ` ${variant}` : ""} (ART. ${article || item.sku}) x ${item.quantity}: *${formatARS(item.unitPrice * item.quantity)}*`;
  });
  return `Hola, quiero realizar el siguiente pedido:\n\n${lines.join("\n")}\n\nTotal estimado: *${formatARS(total)}*\nCódigo de compra: ${orderCode}`;
}
