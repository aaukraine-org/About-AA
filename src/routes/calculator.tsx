import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Nav, Footer } from "@/components/site-chrome";

export const Route = createFileRoute("/calculator")({
  head: () => ({
    meta: [
      { title: "Калькулятор тверезості — Коротко про АА" },
      {
        name: "description",
        content:
          "Безкоштовний калькулятор тверезості: введіть дату — і побачите, скільки днів, тижнів і місяців ви тверезі та скільки лишилось до наступної позначки.",
      },
      { property: "og:title", content: "Калькулятор тверезості — Коротко про АА" },
    ],
  }),
  component: Calculator,
});

const STORAGE_KEY = "aa-sobriety-date";
const DAY = 86_400_000;

// Віхи тверезості у днях (після року — кожна річниця)
const MILESTONES: { days: number; label: string }[] = [
  { days: 1, label: "24 години" },
  { days: 7, label: "1 тиждень" },
  { days: 30, label: "30 днів" },
  { days: 60, label: "60 днів" },
  { days: 90, label: "90 днів" },
  { days: 180, label: "6 місяців" },
  { days: 270, label: "9 місяців" },
];

function parseLocalDate(value: string): Date | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!m) return null;
  const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  return Number.isNaN(d.getTime()) ? null : d;
}

function addYears(d: Date, n: number) {
  return new Date(d.getFullYear() + n, d.getMonth(), d.getDate());
}

function plural(n: number, one: string, few: string, many: string) {
  const a = Math.abs(n) % 100;
  const b = a % 10;
  if (a > 10 && a < 20) return many;
  if (b > 1 && b < 5) return few;
  if (b === 1) return one;
  return many;
}

function calendarDiff(start: Date, end: Date) {
  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();
  let days = end.getDate() - start.getDate();
  if (days < 0) {
    months -= 1;
    days += new Date(end.getFullYear(), end.getMonth(), 0).getDate();
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }
  return { years, months, days };
}

function nextMilestone(start: Date, now: Date, totalDays: number) {
  for (const m of MILESTONES) {
    if (totalDays < m.days) {
      return { label: m.label, daysLeft: m.days - totalDays };
    }
  }
  // 1 рік і далі — річниці
  let y = 1;
  for (;;) {
    const date = addYears(start, y);
    if (date.getTime() > now.getTime()) {
      const daysLeft = Math.ceil((date.getTime() - now.getTime()) / DAY);
      return { label: `${y} ${plural(y, "рік", "роки", "років")}`, daysLeft };
    }
    y += 1;
  }
}

function Stat({ value, label }: { value: number | string; label: string }) {
  return (
    <div className="rounded-2xl bg-sage/60 p-5 text-center">
      <p className="font-display text-2xl text-forest md:text-3xl">{value}</p>
      <p className="mt-1 text-xs text-moss">{label}</p>
    </div>
  );
}

function Calculator() {
  const [dateStr, setDateStr] = useState("");
  const [remember, setRemember] = useState(false);
  const [now, setNow] = useState<Date>(() => new Date());
  const today = useMemo(() => {
    const n = new Date();
    const mm = String(n.getMonth() + 1).padStart(2, "0");
    const dd = String(n.getDate()).padStart(2, "0");
    return `${n.getFullYear()}-${mm}-${dd}`;
  }, []);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && parseLocalDate(saved)) {
        setDateStr(saved);
        setRemember(true);
      }
    } catch {
      /* сховище недоступне — не страшно */
    }
  }, []);

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    try {
      if (remember && dateStr && parseLocalDate(dateStr)) {
        localStorage.setItem(STORAGE_KEY, dateStr);
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      /* ігноруємо */
    }
  }, [remember, dateStr]);

  const start = parseLocalDate(dateStr);
  const isFuture = start ? start.getTime() > now.getTime() : false;
  const result = useMemo(() => {
    if (!start || isFuture) return null;
    const ms = now.getTime() - start.getTime();
    const totalDays = Math.floor(ms / DAY);
    const { years, months, days } = calendarDiff(start, now);
    return {
      totalDays,
      years,
      months,
      days,
      weeks: Math.floor(totalDays / 7),
      hours: Math.floor(ms / 3_600_000),
      minutes: Math.floor(ms / 60_000),
      next: nextMilestone(start, now, totalDays),
    };
  }, [start, isFuture, now]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main>
        <section className="border-t border-border/60 bg-linen py-8 md:py-12">
          <div className="mx-auto max-w-3xl px-6">
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-gold">Інструмент</p>
            <h1 className="mt-3 font-display text-2xl text-forest md:text-3xl">
              Калькулятор тверезості
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-moss">
              Введіть дату, коли ви востаннє випили, — і побачите, скільки часу ви
              тверезі. Один день за раз — це вже результат.
            </p>

            <div className="mt-8 rounded-2xl border border-border bg-card p-6">
              <label htmlFor="sober-date" className="text-xs text-forest">
                Дата початку тверезості
              </label>
              <div className="mt-2 flex flex-wrap items-center gap-3">
                <input
                  id="sober-date"
                  type="date"
                  value={dateStr}
                  max={today}
                  onChange={(e) => setDateStr(e.target.value)}
                  className="rounded-full border border-border bg-background px-4 py-2.5 text-xs text-forest outline-none focus:border-forest"
                />
                {dateStr && (
                  <button
                    type="button"
                    onClick={() => setDateStr("")}
                    className="rounded-full border border-forest/40 px-5 py-2.5 text-xs text-forest transition hover:border-forest"
                  >
                    Скинути дату
                  </button>
                )}
              </div>
              <label className="mt-4 flex items-center gap-2 text-xs text-moss">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />
                Запам'ятати дату на цьому пристрої
              </label>
              <p className="mt-3 text-xs text-muted-foreground">
                Розрахунок відбувається у вашому браузері. Дата нікуди не надсилається;
                якщо не ставити позначку вище — не зберігається взагалі.
              </p>
            </div>

            {isFuture && (
              <p className="mt-6 rounded-2xl bg-sage/60 p-5 text-sm text-forest">
                Ця дата ще не настала. Оберіть сьогоднішню або попередню.
              </p>
            )}

            {result && (
              <div className="mt-8 space-y-6">
                <div className="rounded-2xl bg-forest p-8 text-center text-linen">
                  <p className="font-mono text-xs uppercase tracking-[0.24em] text-sage">
                    Ви тверезі
                  </p>
                  <p className="mt-3 font-display text-5xl md:text-6xl">{result.totalDays}</p>
                  <p className="mt-1 text-sm">
                    {plural(result.totalDays, "день", "дні", "днів")}
                  </p>
                  {(result.years > 0 || result.months > 0) && (
                    <p className="mt-4 text-xs text-sage">
                      {result.years > 0 &&
                        `${result.years} ${plural(result.years, "рік", "роки", "років")} `}
                      {result.months > 0 &&
                        `${result.months} ${plural(result.months, "місяць", "місяці", "місяців")} `}
                      {result.days > 0 &&
                        `${result.days} ${plural(result.days, "день", "дні", "днів")}`}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  <Stat value={result.years} label="років" />
                  <Stat value={result.months + result.years * 12} label="місяців (всього)" />
                  <Stat value={result.weeks.toLocaleString("uk-UA")} label="тижнів" />
                  <Stat value={result.hours.toLocaleString("uk-UA")} label="годин" />
                </div>
                <p className="text-center text-xs text-muted-foreground">
                  Це {result.minutes.toLocaleString("uk-UA")}{" "}
                  {plural(result.minutes, "хвилина", "хвилини", "хвилин")} без алкоголю.
                </p>

                <div className="rounded-2xl border border-border bg-card p-6 text-center">
                  <p className="font-mono text-xs uppercase tracking-[0.24em] text-gold">
                    Наступна позначка
                  </p>
                  <p className="mt-2 font-display text-xl text-forest">{result.next.label}</p>
                  <p className="mt-1 text-xs text-moss">
                    ще {result.next.daysLeft}{" "}
                    {plural(result.next.daysLeft, "день", "дні", "днів")}
                  </p>
                </div>
              </div>
            )}

            <div className="mt-10 rounded-2xl bg-sage/40 p-6 text-xs leading-relaxed text-moss">
              <p className="font-display text-sm text-forest">Позначки тверезості</p>
              <p className="mt-2">
                У спільноті прийнято відзначати 24 години, 30, 60 та 90 днів, пів року, рік і
                кожну наступну річницю. Важливі не цифри, а те, що сьогодні ви не пили.
              </p>
              <p className="mt-3">
                Якщо стався зрив — це не кінець. Просто оберіть нову дату і продовжуйте;
                найкраще поговорити про це на зустрічі.{" "}
                <a href="/contacts" className="underline hover:text-forest">
                  Контакти груп
                </a>
              </p>
              <p className="mt-3 text-muted-foreground">
                Це неофіційний інструмент, не пов'язаний з Анонімними Алкоголіками як
                організацією.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
