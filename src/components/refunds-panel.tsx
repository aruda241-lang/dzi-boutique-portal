import { RotateCcw } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ConfirmAction } from "@/components/confirm-action";
import { useDzi, refundReasons } from "@/lib/dzi-store";
import { money } from "@/lib/dzi-data";

export function RefundsPanel({ by }: { by: string }) {
  const { purchases, refunds, refundPurchase } = useDzi();
  const [reasons, setReasons] = useState<Record<string, string>>({});
  const pending = purchases.filter((p) => p.status !== "Devuelto");

  return (
    <section className="mt-16">
      <div className="flex items-center gap-3">
        <RotateCcw />
        <h2 className="font-display text-4xl">Devoluciones</h2>
      </div>
      <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
        Si una pieza se vendió en tienda física al mismo tiempo que en la web, registra aquí la devolución del pedido en línea. La clienta verá el motivo en su cuenta.
      </p>

      <div className="mt-6 grid gap-3">
        {pending.length === 0 && <p className="border border-border bg-card p-6 text-sm text-muted-foreground">No hay pedidos en línea pendientes de gestionar.</p>}
        {pending.map((p) => {
          const reason = reasons[p.id] ?? refundReasons[0] ?? "Devolución";
          return (
            <div key={p.id} className="flex flex-col gap-3 border border-border bg-card p-5 lg:flex-row lg:items-center">
              <div className="flex-1">
                <b className="font-display text-2xl">{p.id}</b>
                <p className="text-sm text-muted-foreground">{p.items.map((i) => `${i.product.name} × ${i.quantity}`).join(" · ")}</p>
                <p className="mt-1 text-sm">{money(p.total)} · {p.date}</p>
              </div>
              <select className="control lg:w-72" value={reason} onChange={(e) => setReasons((v) => ({ ...v, [p.id]: e.target.value }))}>
                {refundReasons.map((r) => <option key={r}>{r}</option>)}
              </select>
              <ConfirmAction
                title={`¿Está seguro de que quiere devolver el pedido ${p.id}?`}
                description={`Se reembolsará ${money(p.total)} y la clienta verá el motivo: "${reason}".`}
                confirmLabel="Sí, devolver"
                onConfirm={() => refundPurchase(p.id, reason, by)}
              >
                <Button variant="outline" size="sm"><RotateCcw /> Devolver</Button>
              </ConfirmAction>
            </div>
          );
        })}
      </div>

      {refunds.length > 0 && (
        <div className="mt-6 overflow-x-auto border border-border">
          <table className="data-table">
            <thead><tr><th>Devolución</th><th>Pedido</th><th>Piezas</th><th>Monto</th><th>Motivo</th><th>Gestionado por</th></tr></thead>
            <tbody>
              {refunds.map((r) => (
                <tr key={r.id}>
                  <td>{r.id}</td><td>{r.purchaseId}</td><td>{r.productName}</td><td>{money(r.amount)}</td><td>{r.reason}</td><td>{r.by}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
