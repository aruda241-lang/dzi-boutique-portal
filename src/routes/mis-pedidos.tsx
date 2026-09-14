import { createFileRoute, Link } from "@tanstack/react-router";
import { PackageSearch } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDzi } from "@/lib/dzi-store";
import { money } from "@/lib/dzi-data";

export const Route = createFileRoute("/mis-pedidos")({
  head: () => ({
    meta: [
      { title: "Mis pedidos — DZI" },
      { name: "description", content: "Consulta el detalle de tus pedidos DZI ya pagados." },
      { property: "og:title", content: "Mis pedidos — DZI" },
      { property: "og:description", content: "Historial de compras confirmadas en DZI." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  const { purchases, refunds } = useDzi();
  return (
    <div className="page-shell max-w-5xl">
      <p className="eyebrow">Tu cuenta</p>
      <h1 className="page-title">Mis pedidos</h1>
      <p className="mt-4 max-w-xl text-muted-foreground">Aquí aparecen las compras que ya han sido pagadas durante esta demostración.</p>

      {refunds.length > 0 && (
        <section className="mt-12">
          <h2 className="font-display text-3xl">Devoluciones</h2>
          <div className="mt-5 space-y-4">
            {refunds.map((r) => (
              <article key={r.id} className="border border-border bg-card p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <b className="font-display text-2xl">{r.purchaseId}</b>
                  <span className="status">Devolución {r.id}</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{r.productName} · {r.date}</p>
                <p className="mt-3 text-sm text-warning">{r.reason}. Lamentamos el inconveniente: la pieza se vendió en nuestra tienda física antes de preparar tu envío.</p>
                <p className="mt-3 text-sm">Se reembolsaron <b>{money(r.amount)}</b> a tu medio de pago original.</p>
              </article>
            ))}
          </div>
        </section>
      )}

      {purchases.length === 0 ? (
        <div className="mt-12 grid place-items-center border border-border bg-card p-16 text-center">
          <PackageSearch className="mb-4 size-8 text-muted-foreground" />
          <p className="text-muted-foreground">Todavía no tienes pedidos pagados.</p>
          <Button asChild className="mt-6"><Link to="/catalogo">Ver catálogo</Link></Button>
        </div>
      ) : (

        <div className="mt-12 space-y-6">
          {purchases.map((o) => (
            <article key={o.id} className="border border-border bg-card p-7">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
                <div>
                  <p className="font-display text-2xl">{o.id}</p>
                  <p className="text-sm text-muted-foreground">{o.date}</p>
                </div>
                <span className="status">{o.status}</span>
              </div>
              <div className="mt-4 space-y-2 text-sm">
                {o.items.map((i) => (
                  <p key={i.product.id} className="flex justify-between">
                    <span>{i.product.name} × {i.quantity}</span>
                    <span>{money(i.product.price * i.quantity)}</span>
                  </p>
                ))}
              </div>
              <p className="mt-4 flex justify-between border-t border-border pt-4 text-lg">
                <b>Total pagado</b><b>{money(o.total)}</b>
              </p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
