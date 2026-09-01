import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Сторінку не знайдено</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Такої сторінки не існує або її було переміщено.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            На головну
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          Сторінка не завантажилась
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Щось пішло не так. Спробуйте оновити або поверніться на головну.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Спробувати ще раз
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            На головну
          </a>
        </div>
      </div>
    </div>
  );
}

// Підключаємо асинхронно (preload + media="print", який скрипт нижче перемикає
// на "all" щойно стиль завантажився) — а не звичайним блокуючим
// <link rel="stylesheet">, який був головною причиною Lighthouse-попередження
// "Render-blocking requests" (~1.7с втрати на слабких мережах). <noscript> у
// RootShell — фолбек, якщо JS вимкнено. Один URL, один запит — навмисно без
// дублювання. Вага 700 включена, бо реально використовується (font-bold в UI).
const GOOGLE_FONTS_HREF =
  "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap";

const SITE_TITLE = "Коротко про АА";
const SITE_DESC =
  "Інформаційний ресурс українською про Анонімних Алкоголіків, програму 12 Кроків, відповіді на поширені запитання та довідник груп.";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: SITE_TITLE },
      { name: "description", content: SITE_DESC },
      { property: "og:title", content: SITE_TITLE },
      { property: "og:description", content: SITE_DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Коротко про АА" },
      { property: "og:title", content: "Коротко про АА" },
      { name: "twitter:title", content: "Коротко про АА" },
      { name: "description", content: "Коротко про хворобу алкоголізм та програму Анонімні Алкоголіки" },
      { property: "og:description", content: "Коротко про хворобу алкоголізм та програму Анонімні Алкоголіки" },
      { name: "twitter:description", content: "Коротко про хворобу алкоголізм та програму Анонімні Алкоголіки" },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/a6290904-5108-4f5f-bc37-bcffc79a93d8" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/a6290904-5108-4f5f-bc37-bcffc79a93d8" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "canonical", href: "https://aaukraine.org/" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "preload",
        as: "style",
        href: GOOGLE_FONTS_HREF,
      },
      {
        rel: "stylesheet",
        href: GOOGLE_FONTS_HREF,
        media: "print",
        id: "gfonts",
      } as unknown as React.DetailedHTMLProps<React.LinkHTMLAttributes<HTMLLinkElement>, HTMLLinkElement>,
    ],
    scripts: [
      {
        children:
          "var l=document.getElementById('gfonts');if(l){var u=function(){l.media='all'};l.addEventListener('load',u);if(l.sheet){u()}}",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="uk">
      <head>
        <HeadContent />
        {/* Асинхронне підключення шрифтів уже налаштоване вище через
            head().links (preload + media="print") і head().scripts
            (перемикач media на "all"). Тут лишається тільки фолбек
            для користувачів із вимкненим JS. */}
        <noscript>
          <link rel="stylesheet" href={GOOGLE_FONTS_HREF} />
        </noscript>
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
