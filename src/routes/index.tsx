import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/")({
  component: Home,
});

const STEPS: { title: string; body: string }[] = [
  { title: "Визнання", body: "Визнати, що алкоголь взяв над нами гору, і що життя стало некерованим." },
  { title: "Надія", body: "Повірити, що є сила більша за нашу — щось, що здатне повернути ясність." },
  { title: "Рішення", body: "Ухвалити рішення довіритися цій силі так, як ми її розуміємо." },
  { title: "Чесний погляд", body: "Спокійно й безстрашно подивитися на себе — свої вчинки, страхи, шаблони." },
  { title: "Поділитися", body: "Проговорити цей досвід із собою, з тією силою, і ще з однією людиною, якій довіряємо." },
  { title: "Готовність", body: "Стати готовим відпустити те, що нас руйнує зсередини." },
  { title: "Прохання", body: "Смиренно попросити про допомогу зі своїми недоліками." },
  { title: "Список", body: "Скласти список тих, кому ми завдали шкоди, і бути готовими виправити це." },
  { title: "Виправлення", body: "Там, де можливо, зробити прямі кроки на виправлення — крім випадків, коли це зашкодить іншим." },
  { title: "Щоденна практика", body: "Продовжувати чесно дивитися на себе — і коли помиляємось, одразу це визнавати." },
  { title: "Тиша", body: "Через роздуми й тишу шукати кращого контакту з тією силою, яку розуміємо." },
  { title: "Передати далі", body: "Пробудившись, ділитися цим досвідом із іншими і застосовувати ці принципи щодня." },
];

const FAQ = [
  { q: "Чи АА — це релігійна організація?", a: "Ні. АА не пов'язана з жодною конфесією, партією чи установою. У програмі йдеться про «силу більшу за нас» — кожен розуміє це по-своєму: хтось як Бога, хтось як спільноту, природу чи власне сумління." },
  { q: "Чи потрібно платити?", a: "Ні, членських внесків немає. Спільнота існує на добровільні пожертви самих учасників — зазвичай кілька гривень у «капелюх» на оренду приміщення й каву. Прийти й слухати можна безкоштовно." },
  { q: "Що буде на першій зустрічі?", a: "Люди сідають у коло, хтось веде зустріч, читають короткі тексти, потім по черзі бажаючі коротко говорять про себе. Вас ніхто не змусить говорити — можна просто слухати. Виходити теж можна будь-коли." },
  { q: "Чи це справді анонімно?", a: "Так. Прийнято називати лише ім'я (або й вигадане), не запитувати прізвищ і не переказувати почуте за межами зустрічі. Анонімність — духовна основа спільноти." },
  { q: "Чи є онлайн-зустрічі?", a: "Так, українських онлайн-груп зараз чимало — у Zoom і месенджерах. Це зручний спосіб спробувати вперше, не виходячи з дому." },
  { q: "Що робити, якщо стався зрив?", a: "Зрив — не кінець шляху й не привід для сорому. Найкоротший крок: прийти на найближчу зустріч і сказати про це вголос. Досвід спільноти показує, що зрив, проговорений відкрито, рідко повторюється тим самим способом." },
  { q: "Чи можуть прийти родичі?", a: "Для близьких людей залежних існує окрема спільнота — Ал-Анон. Там рідні діляться власним досвідом і вчаться піклуватися про себе, поки близька людина шукає свій шлях." },
  { q: "Як зрозуміти, що варто прийти?", a: "Не потрібно ставити собі діагноз. Якщо алкоголь дедалі частіше з'являється у ваших думках або створює проблеми, які ви вже помітили, — цього достатньо, щоб просто послухати одну зустріч." },
];

const DIRECTORY = [
  { city: "Київ", name: "Група «Ранок» (приклад)", addr: "вул. Прикладна, 1", time: "Пн, Ср, Пт — 19:00", contact: "+380 XX XXX XX XX" },
  { city: "Київ", name: "Група «Тиша» (приклад)", addr: "просп. Тестовий, 42", time: "Щодня — 18:30", contact: "aa-kyiv@example.org" },
  { city: "Львів", name: "Група «Стежка» (приклад)", addr: "вул. Демо, 7", time: "Вт, Чт — 19:30", contact: "+380 XX XXX XX XX" },
  { city: "Львів", name: "Онлайн-група (приклад)", addr: "Zoom", time: "Нд — 20:00", contact: "aa-lviv@example.org" },
];

const QUIZ_QUESTIONS = [
  "Чи бувало, що Ви вирішували не пити тиждень або більше, але Вас вистачало тільки на день-два?",
  "Чи хотілося Вам, щоб оточуючі перестали говорити Вам про Ваше пияцтво і про те, що Вам треба робити?",
  "Чи намагалися Ви переходити з одного виду випивки на інший в надії, що це допоможе Вам не напитися?",
  "Чи доводилось Вам протягом останнього року випивати вранці, щоб мати можливість почати новий день?",
  "Чи заздрите Ви тим, хто може пити без неприємних наслідків?",
  "Чи траплялися у Вас протягом останнього року проблеми через випивку?",
  "Чи виникали у Вас через випивку прикрощі вдома?",
  "Чи траплялось так, що, випиваючи в компанії, Ви прагнули перехопити додаткову чарку, тому що Вам не вистачало?",
  "Чи говорите Ви собі, що можете перестати пити в будь-який момент, як тільки захочете, хоча часто напиваєтесь і тоді, коли зовсім не збирались цього робити?",
  "Чи прогулювали Ви роботу або заняття через випивку?",
  "Чи бувають у Вас провали пам'яті?",
  "Чи з'являлось у Вас коли-небудь відчуття, що якби Ви не пили, то Ваше життя було б кращим?",
];

const EXTRA_CONTACTS = [
  {
    name: "Ал-Анон Україна",
    desc: "Всеукраїнський Центр Обслуговування Родинних груп Ал-Анон в Україні — для близьких людей залежних.",
    lines: [
      { label: "Сайт", value: "www.al-anon.org.ua", href: "https://www.al-anon.org.ua" },
      { label: "Телефон", value: "+38 095 838 29 33 (9:00–19:00)", href: "tel:+380958382933" },
      { label: "Email", value: "ukralanon@gmail.com", href: "mailto:ukralanon@gmail.com" },
    ],
  },
  {
    name: "Українська група АА · США та Канада",
    desc: "Онлайн-зустрічі щопонеділка та щосереди о 20:00 (EST, Нью-Йорк). Спілкування також у Viber-чаті — приєднатися можна через SMS.",
    lines: [
      { label: "Філадельфія", value: "+1 267 902 9217", href: "sms:+12679029217" },
      { label: "Сакраменто", value: "+1 916 792 1654", href: "sms:+19167921654" },
    ],
  },
  {
    name: "Дорослі Діти Алкоголіків",
    desc: "Спільнота для дорослих, які виросли в родинах із залежністю.",
    lines: [
      { label: "Сайт", value: "www.dda.org.ua", href: "https://www.dda.org.ua" },
      { label: "Телефон", value: "+38 (066) 218 55 40", href: "tel:+380662185540" },
      { label: "Телефон", value: "+38 (096) 162 30 02", href: "tel:+380961623002" },
      { label: "Email", value: "dda.ukraina@gmail.com", href: "mailto:dda.ukraina@gmail.com" },
    ],
  },
];

function Nav() {
  const links = [
    ["#about", "Про АА"],
    ["#steps", "12 Кроків"],
    ["#faq", "Питання"],
    ["#quiz", "Тест"],
    ["#chat", "Запитати"],
    ["#directory", "Групи"],
  ];
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#top" className="font-display text-lg text-forest">
          <span className="text-gold">·</span> Один крок
        </a>
        <ul className="hidden gap-7 text-sm text-moss md:flex">
          {links.map(([href, label]) => (
            <li key={href}>
              <a href={href} className="transition hover:text-forest">
                {label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#directory"
          className="rounded-full border border-forest px-4 py-1.5 text-xs font-medium text-forest transition hover:bg-forest hover:text-linen"
        >
          Знайти групу
        </a>
      </nav>
    </header>
  );
}

/** Signature meandering path connecting sections */
function PathTrail() {
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute left-1/2 top-0 -z-0 h-full w-[200px] -translate-x-1/2 opacity-40"
      viewBox="0 0 200 3000"
      preserveAspectRatio="none"
      fill="none"
    >
      <path
        d="M100 0 C 40 200, 160 400, 100 600 S 40 1000, 100 1200 S 160 1600, 100 1800 S 40 2200, 100 2400 S 160 2800, 100 3000"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeDasharray="3 8"
        className="text-moss"
      />
    </svg>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="mx-auto max-w-4xl px-6 pb-24 pt-20 text-center md:pb-32 md:pt-32">
        <p className="mb-6 font-mono text-xs uppercase tracking-[0.28em] text-moss">
          Інформаційний ресурс · українською
        </p>
        <h1 className="font-display text-5xl leading-[1.05] text-forest md:text-7xl">
          Один день.<br />
          <span className="italic text-moss">Один крок.</span><br />
          Разом.
        </h1>
        <p className="mx-auto mt-8 max-w-xl text-lg text-moss">
          Спокійна розмова про Анонімних Алкоголіків та програму 12 Кроків —
          без осуду, без страху, у власному темпі.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="#steps"
            className="rounded-full bg-forest px-7 py-3 text-sm font-medium text-linen transition hover:bg-moss"
          >
            Про 12 Кроків
          </a>
          <a
            href="#directory"
            className="rounded-full border border-forest px-7 py-3 text-sm font-medium text-forest transition hover:bg-forest hover:text-linen"
          >
            Знайти групу поруч
          </a>
        </div>
      </div>
    </section>
  );
}

function About() {
  const cards = [
    { t: "Анонімність", d: "У колі — лише ім'я. Почуте на зустрічі залишається на зустрічі." },
    { t: "Без оцінки", d: "Ніхто не судить і не порівнює. Кожен говорить лише про свій досвід." },
    { t: "Самофінансування", d: "Тільки добровільні пожертви учасників. Жодних членських внесків." },
    { t: "Рівність", d: "Немає керівників чи експертів — усі рівні, усі одужують поряд." },
  ];
  return (
    <section id="about" className="relative border-t border-border/60 bg-linen py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-14 md:grid-cols-[1fr_1.2fr]">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-gold">/ 01 · спільнота</p>
            <h2 className="mt-4 font-display text-4xl text-forest md:text-5xl">Що таке АА</h2>
          </div>
          <div className="space-y-5 text-lg leading-relaxed text-moss">
            <p>
              Анонімні Алкоголіки — це спільнота людей, які діляться між собою досвідом,
              силою й надією, щоби разом одужувати від залежності від алкоголю.
            </p>
            <p>
              Єдина умова, щоб приєднатися — власне бажання перестати пити. АА не пов'язана
              з жодною релігією, партією чи установою. Спільнота існує на добровільні
              пожертви самих учасників — тут немає членських внесків і немає керівництва
              у звичному сенсі.
            </p>
          </div>
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c) => (
            <div
              key={c.t}
              className="rounded-2xl bg-sage/60 p-6 transition hover:bg-sage"
            >
              <h3 className="font-display text-xl text-forest">{c.t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-moss">{c.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Steps() {
  return (
    <section id="steps" className="relative overflow-hidden border-t border-border/60 py-24">
      <PathTrail />
      <div className="relative mx-auto max-w-5xl px-6">
        <div className="text-center">
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-gold">/ 02 · шлях</p>
          <h2 className="mt-4 font-display text-4xl text-forest md:text-5xl">
            Програма <span className="italic">12 Кроків</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-moss">
            Не інструкція й не правила. Радше — 12 орієнтирів, за якими люди
            в спільноті йдуть у власному темпі. Нижче — переказ їхнього сенсу
            своїми словами.
          </p>
        </div>

        <ol className="mt-16 space-y-4">
          {STEPS.map((s, i) => {
            const n = String(i + 1).padStart(2, "0");
            const offset = i % 2 === 0 ? "md:pr-24 md:mr-auto" : "md:pl-24 md:ml-auto";
            return (
              <li
                key={s.title}
                className={`relative max-w-2xl rounded-2xl border border-border bg-card p-6 shadow-[0_1px_0_rgba(30,43,34,0.04)] md:p-7 ${offset}`}
              >
                <div className="flex items-baseline gap-5">
                  <span className="font-display text-3xl text-gold md:text-4xl">{n}</span>
                  <div>
                    <h3 className="font-display text-xl text-forest">{s.title}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-moss">{s.body}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>

        <p className="mx-auto mt-12 max-w-xl text-center text-sm text-muted-foreground">
          Тексти вище — авторський переказ. Офіційне формулювання 12 Кроків
          належить AA World Services, Inc.
        </p>
      </div>
    </section>
  );
}

function Faq() {
  return (
    <section id="faq" className="border-t border-border/60 bg-sage/40 py-24">
      <div className="mx-auto max-w-4xl px-6">
        <div className="text-center">
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-gold">/ 03 · питання</p>
          <h2 className="mt-4 font-display text-4xl text-forest md:text-5xl">
            Що люди питають найчастіше
          </h2>
        </div>

        <Accordion type="single" collapsible className="mt-12">
          {FAQ.map((item, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="border-b border-forest/15"
            >
              <AccordionTrigger className="py-5 text-left font-display text-lg text-forest hover:no-underline">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="pb-5 pr-6 text-[15px] leading-relaxed text-moss">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

function Chat() {
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([
    {
      role: "assistant",
      content:
        "Вітаю. Тут можна поставити загальне питання про АА чи 12 Кроків — коротко відповім. Розмова не зберігається на сервері.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  async function send(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;
    const next = [...messages, { role: "user" as const, content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      if (!res.ok) {
        const err = res.status === 429
          ? "Забагато запитів. Спробуйте за хвилину."
          : res.status === 402
            ? "Тимчасово недоступно. Спробуйте пізніше."
            : "Не вдалось отримати відповідь. Спробуйте ще раз.";
        setMessages((m) => [...m, { role: "assistant", content: err }]);
      } else {
        const data = (await res.json()) as { content?: string };
        setMessages((m) => [...m, { role: "assistant", content: data.content ?? "" }]);
      }
    } catch {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "Немає зв'язку. Спробуйте ще раз." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="chat" className="border-t border-border/60 py-24">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center">
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-gold">/ 04 · розмова</p>
          <h2 className="mt-4 font-display text-4xl text-forest md:text-5xl">
            Запитати напряму
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-moss">
            Коротка загальна інформація про АА та 12 Кроків. Без діагнозів
            і медичних порад.
          </p>
        </div>

        <div className="mt-10 overflow-hidden rounded-2xl border border-border bg-card">
          <div
            ref={scrollRef}
            className="max-h-[440px] min-h-[280px] space-y-4 overflow-y-auto px-5 py-6"
          >
            {messages.map((m, i) => (
              <div
                key={i}
                className={m.role === "user" ? "flex justify-end" : "flex justify-start"}
              >
                <div
                  className={
                    m.role === "user"
                      ? "max-w-[80%] rounded-2xl rounded-br-sm bg-forest px-4 py-2.5 text-sm text-linen"
                      : "max-w-[80%] whitespace-pre-wrap text-[15px] leading-relaxed text-forest"
                  }
                >
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="flex gap-1.5 px-1 py-2">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-moss [animation-delay:-0.3s]" />
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-moss [animation-delay:-0.15s]" />
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-moss" />
                </div>
              </div>
            )}
          </div>

          <form onSubmit={send} className="flex gap-2 border-t border-border bg-background/60 p-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Напишіть питання…"
              disabled={loading}
              className="flex-1 rounded-full border border-border bg-card px-4 py-2.5 text-sm text-forest outline-none placeholder:text-muted-foreground focus:border-forest"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="rounded-full bg-forest px-5 py-2.5 text-sm font-medium text-linen transition hover:bg-moss disabled:opacity-50"
            >
              Надіслати
            </button>
          </form>
        </div>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          Помічник не замінює терапію чи живу зустріч.
        </p>
      </div>
    </section>
  );
}

function Directory() {
  return (
    <section id="directory" className="border-t border-border/60 bg-linen py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-gold">/ 05 · довідник</p>
            <h2 className="mt-4 font-display text-4xl text-forest md:text-5xl">Групи АА</h2>
          </div>
          <p className="max-w-md text-sm text-muted-foreground">
            Наведені рядки — приклади для демонстрації структури довідника.
            Актуальний список груп у вашому місті шукайте на офіційному сайті АА України.
          </p>
        </div>

        <div className="mt-10 overflow-hidden rounded-2xl border border-border bg-card">
          <div className="hidden grid-cols-[100px_1fr_1.4fr_1fr_1.2fr] gap-4 border-b border-border bg-sage/50 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-forest md:grid">
            <span>Місто</span>
            <span>Група</span>
            <span>Адреса</span>
            <span>Час</span>
            <span>Контакт</span>
          </div>
          {DIRECTORY.map((row, i) => (
            <div
              key={i}
              className="grid grid-cols-1 gap-1 border-b border-border px-5 py-4 last:border-b-0 md:grid-cols-[100px_1fr_1.4fr_1fr_1.2fr] md:gap-4 md:py-3.5"
            >
              <span className="font-display text-forest">{row.city}</span>
              <span className="text-sm text-forest">{row.name}</span>
              <span className="font-mono text-[13px] text-moss">{row.addr}</span>
              <span className="font-mono text-[13px] text-moss">{row.time}</span>
              <span className="font-mono text-[13px] text-moss">{row.contact}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border/60 bg-forest py-14 text-linen">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="font-display text-2xl">Один день. Один крок. Разом.</p>
            <p className="mt-2 font-mono text-xs uppercase tracking-[0.24em] text-sage">
              Інформаційний ресурс
            </p>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-sage">
            Цей сайт має суто інформаційний характер. Він не є офіційним ресурсом
            АА, не надає медичних чи психологічних послуг і не замінює консультації
            фахівця. Якщо ви або близька людина в кризі — зверніться до лікаря
            або на лінію психологічної допомоги.
          </p>
        </div>
        <p className="mt-10 font-mono text-[11px] uppercase tracking-[0.2em] text-sage/70">
          © {new Date().getFullYear()} · Зроблено з турботою
        </p>
      </div>
    </footer>
  );
}

function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main>
        <Hero />
        <About />
        <Steps />
        <Faq />
        <Chat />
        <Directory />
      </main>
      <Footer />
    </div>
  );
}
