import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useDzi } from "@/lib/dzi-store";

export const Route = createFileRoute("/acceso")({
  head: () => ({
    meta: [
      { title: "Acceso — DZI" },
      { name: "description", content: "Ingresa a DZI como cliente o vendedora autorizada." },
      { property: "og:title", content: "Acceso — DZI" },
      { property: "og:description", content: "Inicio de sesión simulado para clientes y vendedoras DZI." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function GoogleMark() {
  return (
    <svg viewBox="0 0 48 48" className="size-5" aria-hidden="true">
      <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.6l6.7-6.7C35.6 2.6 30.2 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.8 6.1C12.3 13.2 17.6 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.2-.4-4.7H24v9h12.7c-.6 3-2.3 5.6-4.9 7.3l7.6 5.9c4.4-4.1 7.1-10.2 7.1-17.5z" />
      <path fill="#FBBC05" d="M10.4 28.7c-.5-1.5-.8-3-.8-4.7s.3-3.2.8-4.7l-7.8-6.1C.9 16.4 0 20.1 0 24s.9 7.6 2.6 10.8l7.8-6.1z" />
      <path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.6-5.9c-2.1 1.4-4.8 2.2-8.3 2.2-6.4 0-11.7-3.7-13.6-9.8l-7.8 6.1C6.5 42.6 14.6 48 24 48z" />
    </svg>
  );
}

function Page() {
  const { signIn, whitelist, account, signOut } = useDzi();
  const navigate = useNavigate();
  const [tab, setTab] = useState<"Cliente" | "Vendedor">("Cliente");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const clean = email.trim().toLowerCase();
    if (!clean || !name.trim()) return setError("Completa tu nombre y tu correo de Google.");
    if (tab === "Vendedor") {
      const seller = whitelist.find((s) => s.email.toLowerCase() === clean);
      if (!seller) return setError("Este correo no está en la lista blanca de vendedoras autorizadas.");
      if (!seller.active) return setError("Tu acceso de vendedora está desactivado. Contacta a administración.");
    }
    setError("");
    signIn({ name: name.trim(), email: clean, role: tab });
    navigate({ to: tab === "Vendedor" ? "/vendedor" : "/" });
  }

  if (account)
    return (
      <div className="page-shell">
        <p className="eyebrow">Sesión activa</p>
        <h1 className="page-title">Hola, {account.name}</h1>
        <p className="mt-4 text-muted-foreground">{account.email} · {account.role}</p>
        <div className="mt-8 flex gap-3">
          <Button onClick={() => navigate({ to: account.role === "Vendedor" ? "/vendedor" : "/" })}>Ir a mi espacio</Button>
          <Button variant="outline" onClick={signOut}>Cerrar sesión</Button>
        </div>
      </div>
    );

  return (
    <div className="page-shell">
      <div className="mx-auto max-w-md">
        <p className="eyebrow">Acceso</p>
        <h1 className="page-title">Entra a DZI</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          Inicio de sesión de demostración. Las vendedoras solo pueden crear su cuenta si su correo está en la lista blanca.
        </p>
        <div className="mt-8 grid grid-cols-2 border border-border">
          {(["Cliente", "Vendedor"] as const).map((t) => (
            <button
              key={t}
              onClick={() => { setTab(t); setError(""); }}
              className={`py-3 text-xs uppercase tracking-[0.16em] transition ${tab === t ? "bg-secondary text-foreground" : "text-muted-foreground"}`}
            >
              {t === "Vendedor" ? "Vendedora" : t}
            </button>
          ))}
        </div>
        <form className="mt-6 grid gap-4" onSubmit={submit}>
          <label className="field">Nombre<input value={name} onChange={(e) => setName(e.target.value)} placeholder="Tu nombre" /></label>
          <label className="field">Correo de Google<input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="nombre@gmail.com" /></label>
          {error && <p className="text-sm text-warning">{error}</p>}
          <Button size="lg" className="w-full gap-3"><GoogleMark /> Continuar con Google</Button>
        </form>
        {tab === "Vendedor" && (
          <p className="mt-5 text-xs text-muted-foreground">
            Correos autorizados de ejemplo: {whitelist.filter((s) => s.active).map((s) => s.email).join(" · ")}
          </p>
        )}
      </div>
    </div>
  );
}
