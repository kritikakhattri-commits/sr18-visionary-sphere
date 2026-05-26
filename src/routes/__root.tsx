import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { Nav } from "@/components/sr18/Nav";
import { AskSR18 } from "@/components/sr18/AskSR18";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl text-display text-foreground">404</h1>
        <p className="mt-3 text-sm uppercase tracking-[0.3em] text-muted-foreground">Page not found</p>
        <a href="/" className="mt-8 inline-block text-sm uppercase tracking-[0.25em] text-gold border-b border-gold pb-1">Return home</a>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-2xl text-display">Something interrupted the experience.</h1>
        <button
          onClick={() => { router.invalidate(); reset(); }}
          className="mt-6 text-sm uppercase tracking-[0.25em] text-gold border-b border-gold pb-1"
        >Try again</button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "SR18 Holdings — Building Tomorrow's Businesses Today" },
      { name: "description", content: "SR18 Holdings is a diversified investment group building an ecosystem of businesses across Gaming, Technology, Real Estate, Textile, Consultancy, Investments and Beverages." },
      { property: "og:title", content: "SR18 Holdings" },
      { property: "og:description", content: "An ecosystem of businesses. Long-term value through strategic investments, execution, and innovation." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500&family=Inter:wght@300;400;500;600&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Nav />
      <Outlet />
      <AskSR18 />
    </QueryClientProvider>
  );
}
