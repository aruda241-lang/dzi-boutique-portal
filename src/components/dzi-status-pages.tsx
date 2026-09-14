import { Link, useRouter } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Leaf, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DziLoadingPage() {
  return (
    <section
      className="botanical grid min-h-[calc(100vh-5rem)] place-items-center overflow-hidden px-6 py-20"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="text-center">
        <div className="relative mx-auto mb-8 grid size-24 place-items-center">
          <span className="absolute inset-0 rounded-full border border-border" />
          <span className="dzi-loading-ring absolute inset-0 rounded-full border border-transparent border-t-accent" />
          <Leaf className="size-6 text-accent" aria-hidden="true" />
        </div>
        <p className="font-display text-5xl leading-none">DZI</p>
        <p className="mt-4 text-xs uppercase tracking-[0.18em] text-muted-foreground">
          Preparando tu experiencia
        </p>
      </div>
    </section>
  );
}

export function DziNotFoundPage() {
  return (
    <section className="botanical relative grid min-h-[calc(100vh-5rem)] place-items-center overflow-hidden px-6 py-20">
      <div className="relative max-w-2xl text-center">
        <p className="eyebrow">Página no encontrada / 404</p>
        <p className="mt-5 font-display text-[9rem] leading-[0.72] text-foreground/10 sm:text-[13rem]" aria-hidden="true">
          404
        </p>
        <h1 className="-mt-5 font-display text-5xl leading-none sm:text-7xl">
          Esta pieza no está aquí
        </h1>
        <p className="mx-auto mt-6 max-w-lg leading-7 text-muted-foreground">
          El enlace que buscabas pudo cambiar o ya no forma parte de nuestra colección.
        </p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link to="/">
              <ArrowLeft /> Volver al inicio
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/catalogo">
              Explorar catálogo <ArrowRight />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

export function DziErrorPage({ reset }: { error: Error; reset: () => void }) {
  const router = useRouter();

  return (
    <section className="botanical grid min-h-[calc(100vh-5rem)] place-items-center px-6 py-20">
      <div className="max-w-xl text-center">
        <p className="eyebrow">DZI / Pausa inesperada</p>
        <h1 className="mt-5 font-display text-5xl leading-none sm:text-7xl">Algo interrumpió el recorrido</h1>
        <p className="mx-auto mt-6 max-w-md leading-7 text-muted-foreground">
          Puedes intentarlo nuevamente o regresar al inicio de la colección.
        </p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Button
            size="lg"
            onClick={() => {
              router.invalidate();
              reset();
            }}
          >
            <RefreshCw /> Intentar de nuevo
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/">Volver al inicio</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}