import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { DziErrorPage, DziLoadingPage, DziNotFoundPage } from "./components/dzi-status-pages";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    defaultPendingComponent: DziLoadingPage,
    defaultPendingMs: 150,
    defaultPendingMinMs: 450,
    defaultErrorComponent: DziErrorPage,
    defaultNotFoundComponent: DziNotFoundPage,
  });

  return router;
};
