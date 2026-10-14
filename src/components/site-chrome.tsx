import { useState } from "react";

export const NAV_LINKS: [string, string][] = [
  ["/#about", "Про АА"],
  ["/#faq", "Відповіді"],
  ["/#quiz", "Тест"],
  ["/#chat", "Є питання?"],
  ["/calculator", "Калькулятор"],
  ["/contacts", "Контакти"],
  ["/#calendar", "Календар"],
];

export function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/95 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="/" className="font-display text-sm font-bold text-forest underline underline-offset-4">
          Коротко про АА
        </a>
        <ul className="hidden gap-7 text-xs text-moss md:flex">
          {NAV_LINKS.map(([href, label]) => (
            <li key={href}>
              <a href={href} className="transition hover:text-forest">
                {label}
              </a>
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Закрити меню" : "Відкрити меню"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-forest/40 text-forest md:hidden"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </nav>
      {open && (
        <ul id="mobile-menu" className="border-t border-border/60 bg-background px-6 py-2 md:hidden">
          {NAV_LINKS.map(([href, label]) => (
            <li key={href}>
              <a
                href={href}
                onClick={() => setOpen(false)}
                className="block border-b border-border/40 py-3 text-sm text-forest last:border-b-0"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-forest py-6 text-linen">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-display text-lg">Коротко про АА</p>
            <p className="mt-2 font-mono text-xs uppercase tracking-[0.24em] text-sage">
              Інформаційний ресурс
            </p>
          </div>
          <p className="max-w-md text-xs leading-relaxed text-sage">
            Цей сайт має суто інформаційний характер. Він не є офіційним ресурсом
            АА, не надає медичних чи психологічних послуг і не замінює консультації
            фахівця. Якщо ви або близька людина в кризі — зверніться до лікаря
            або на лінію психологічної допомоги.
          </p>
        </div>
        <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-sage/70">
          © {new Date().getFullYear()} · Зроблено з турботою
        </p>
      </div>
    </footer>
  );
}
