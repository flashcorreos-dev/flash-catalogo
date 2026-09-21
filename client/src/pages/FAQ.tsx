import { ChevronDown, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { makeWhatsAppUrl } from "@/components/StorefrontLayout";

const FAQS = [
  { question: "¿El envío es gratis?", answer: "No, los cargos de envío corren por cuenta del consumidor." },
  { question: "¿Hacen envíos a todo el país?", answer: "Sí, llegamos a todas las provincias de Argentina. El costo y la modalidad se coordinan según tu localidad." },
  { question: "¿Cómo realizo un pedido?", answer: "Elegí los productos y las cantidades en el catálogo, agregalos al carrito y confirmá el pedido para enviarlo por WhatsApp." },
  { question: "¿Emiten facturas?", answer: "Sí, sólo emitimos Factura C." },
  { question: "¿Cuánto demora la entrega?", answer: "El tiempo depende de la disponibilidad y del destino. Te confirmamos los detalles al coordinar tu pedido." },
  { question: "¿Qué medios de pago aceptan?", answer: "Solamente trabajamos con transferencia y depósito bancario." },
];

export default function FAQ() {
  const [query, setQuery] = useState("");
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);
  const filteredFaqs = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return FAQS;
    return FAQS.filter(item => `${item.question} ${item.answer}`.toLowerCase().includes(normalized));
  }, [query]);
  const hasUnansweredQuestion = query.trim().length > 0 && filteredFaqs.length === 0;
  const sendQuestionToWhatsApp = () => {
    const question = query.trim();
    if (!question) return;
    window.open(makeWhatsAppUrl(`Hola Flash, quería hacer una consulta: ${question}`), "_blank", "noopener,noreferrer");
  };

  return <section className="mx-auto max-w-[980px] px-4 pb-16 pt-12 sm:px-6 lg:px-8 lg:pt-16">
    <div className="faq-hero"><p className="eyebrow text-[#c6e65c]">Antes de comprar</p><h1 className="mt-3 text-4xl font-semibold leading-[1.04] tracking-tight text-white sm:text-6xl">Preguntas<br /><em className="text-[#f1c6a8]">frecuentes.</em></h1><p className="mt-6 max-w-xl text-base leading-relaxed text-[#bec9bd]">Encontrá respuestas rápidas sobre envíos, pedidos y la atención de FLASH.</p><label className="faq-search"><Search size={18} /><input value={query} onChange={event => setQuery(event.target.value)} onKeyDown={event => event.key === "Enter" && hasUnansweredQuestion && sendQuestionToWhatsApp()} placeholder="Escribí tu pregunta..." aria-label="Buscar una pregunta frecuente" /></label></div>
    <div className="mt-10"><div className="section-heading"><div><p className="eyebrow">Respuestas rápidas</p><h2 className="section-title mt-2">Lo que suelen preguntarnos</h2></div><span className="faq-count">{filteredFaqs.length} {filteredFaqs.length === 1 ? "pregunta" : "preguntas"}</span></div><div className="faq-list">{filteredFaqs.map(item => { const isOpen = openQuestion === item.question; return <article className={`faq-item ${isOpen ? "faq-item-open" : ""}`} key={item.question}><button type="button" className="faq-question" onClick={() => setOpenQuestion(isOpen ? null : item.question)} aria-expanded={isOpen}><span>{item.question}</span><ChevronDown size={18} /></button>{isOpen && <div className="faq-answer"><p>{item.answer}</p></div>}</article>; })}</div>{hasUnansweredQuestion && <div className="empty-state mt-4"><Search size={28} /><h2>No encontramos una respuesta</h2><p>Podés enviar tu consulta directamente a FLASH.</p><button type="button" onClick={sendQuestionToWhatsApp} className="cta-dark mt-4">Enviar consulta por WhatsApp</button></div>}</div>
  </section>;
}
