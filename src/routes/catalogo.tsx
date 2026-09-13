import { createFileRoute } from "@tanstack/react-router";
import { Search, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { useDzi } from "@/lib/dzi-store";
import { money } from "@/lib/dzi-data";

export const Route = createFileRoute("/catalogo")({
  head: () => ({
    meta: [
      { title: "Catálogo — DZI" },
      { name: "description", content: "Explora abrigos, capas y accesorios DZI creados con fibras nobles." },
      { property: "og:title", content: "Catálogo — DZI" },
      { property: "og:description", content: "Piezas atemporales de lujo consciente." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Catalog,
});

function Catalog() {
  const { products } = useDzi();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("Todas");
  const [color, setColor] = useState("Todos");
  const [material, setMaterial] = useState("Todos");
  const [stock, setStock] = useState("Todos");
  const maxPrice = useMemo(() => Math.max(...products.map((p) => p.price)), [products]);
  const [price, setPrice] = useState(maxPrice);

  const colors = useMemo(() => [...new Set(products.map((p) => p.color))], [products]);
  const materials = useMemo(() => [...new Set(products.map((p) => p.material))], [products]);

  const filtered = useMemo(
    () =>
      products.filter(
        (p) =>
          (cat === "Todas" || p.category === cat) &&
          (color === "Todos" || p.color === color) &&
          (material === "Todos" || p.material === material) &&
          (stock === "Todos" || (stock === "Disponible" ? p.stock > 0 : stock === "Stock bajo" ? p.stock > 0 && p.stock < 5 : p.stock === 0)) &&
          p.price <= price &&
          p.name.toLowerCase().includes(q.toLowerCase()),
      ),
    [products, q, cat, color, material, stock, price],
  );

  const reset = () => { setQ(""); setCat("Todas"); setColor("Todos"); setMaterial("Todos"); setStock("Todos"); setPrice(maxPrice); };

  return (
    <div className="page-shell">
      <p className="eyebrow">Colección completa</p>
      <h1 className="page-title">Catálogo</h1>

      <div className="mt-10 border-y border-border py-5">
        <label className="flex items-center gap-3 border-b border-border pb-4">
          <Search className="size-4" />
          <input value={q} onChange={(e) => setQ(e.target.value)} className="w-full bg-transparent outline-none" placeholder="Buscar una pieza" />
        </label>
        <div className="mt-5 flex flex-wrap items-end gap-5 text-sm">
          <span className="flex items-center gap-2 text-muted-foreground"><SlidersHorizontal className="size-4" /> Filtros</span>
          <label className="grid gap-1">
            <span className="text-xs uppercase tracking-[.12em] text-muted-foreground">Categoría</span>
            <select value={cat} onChange={(e) => setCat(e.target.value)} className="control">
              <option>Todas</option><option>Abrigos</option><option>Chaquetas</option><option>Accesorios</option><option>Prendas</option>
            </select>
          </label>
          <label className="grid gap-1">
            <span className="text-xs uppercase tracking-[.12em] text-muted-foreground">Color</span>
            <select value={color} onChange={(e) => setColor(e.target.value)} className="control">
              <option>Todos</option>{colors.map((c) => <option key={c}>{c}</option>)}
            </select>
          </label>
          <label className="grid gap-1">
            <span className="text-xs uppercase tracking-[.12em] text-muted-foreground">Material</span>
            <select value={material} onChange={(e) => setMaterial(e.target.value)} className="control">
              <option>Todos</option>{materials.map((m) => <option key={m}>{m}</option>)}
            </select>
          </label>
          <label className="grid gap-1">
            <span className="text-xs uppercase tracking-[.12em] text-muted-foreground">Disponibilidad</span>
            <select value={stock} onChange={(e) => setStock(e.target.value)} className="control">
              <option>Todos</option><option>Disponible</option><option>Stock bajo</option><option>Agotado</option>
            </select>
          </label>
          <label className="grid gap-1">
            <span className="text-xs uppercase tracking-[.12em] text-muted-foreground">Precio hasta {money(price)}</span>
            <input type="range" min={100} max={maxPrice} step={20} value={price} onChange={(e) => setPrice(Number(e.target.value))} className="w-48 accent-primary" />
          </label>
          <Button variant="outline" size="sm" onClick={reset}>Limpiar</Button>
        </div>
      </div>

      <p className="my-8 text-sm text-muted-foreground">{filtered.length} piezas</p>
      <div className="grid gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => <ProductCard key={p.id} p={p} />)}
      </div>
      {filtered.length === 0 && <p className="py-16 text-center text-muted-foreground">Ninguna pieza coincide con estos filtros.</p>}
    </div>
  );
}
