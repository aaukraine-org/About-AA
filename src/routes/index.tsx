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



const FAQ = [
  { q: "Чи АА — це релігійна організація?", a: "Ні. АА не пов'язана з жодною конфесією, партією чи установою. У програмі йдеться про «силу більшу за нас» — кожен розуміє це по-своєму: хтось як Бога, хтось як спільноту, природу чи власне сумління." },
  { q: "Чи потрібно платити?", a: "Ні, членських внесків немає. Спільнота існує на добровільні пожертви самих учасників — зазвичай кілька гривень у «капелюх» на оренду приміщення й каву. Прийти й слухати можна безкоштовно." },
  { q: "Що буде на першій зустрічі?", a: "Люди сідають у коло, хтось веде зустріч, читають короткі тексти, потім по черзі бажаючі коротко говорять про себе. Вас ніхто не змусить говорити — можна просто слухати. Виходити теж можна будь-коли." },
  { q: "Як прийти на першу зустріч?", a: "Найпростіше — зателефонувати на гарячу лінію свого міста, там підкажуть найближчу за часом і місцем групу. Київ: +38 098 300-01-01. Львів: +38 067 788-35-34. Можна також просто прийти за адресою з довідника нижче — зайти й сісти. Вас зустрінуть спокійно, без запитань." },
  { q: "Чи це справді анонімно?", a: "Так. Прийнято називати лише ім'я (або й вигадане), не запитувати прізвищ і не переказувати почуте за межами зустрічі. Анонімність — духовна основа спільноти." },
  { q: "Чи є онлайн-зустрічі?", a: "Так, українських онлайн-груп зараз чимало — у Zoom і месенджерах. Це зручний спосіб спробувати вперше, не виходячи з дому." },
  { q: "Що робити, якщо стався зрив?", a: "Зрив — не кінець шляху й не привід для сорому. Найкоротший крок: прийти на найближчу зустріч і сказати про це вголос. Досвід спільноти показує, що зрив, проговорений відкрито, рідко повторюється тим самим способом." },
  { q: "Чи можуть прийти родичі?", a: "Для близьких людей залежних існує окрема спільнота — Ал-Анон. Там рідні діляться власним досвідом і вчаться піклуватися про себе, поки близька людина шукає свій шлях." },
  { q: "Як зрозуміти, що варто прийти?", a: "Не потрібно ставити собі діагноз. Якщо алкоголь дедалі частіше з'являється у ваших думках або створює проблеми, які ви вже помітили, — цього достатньо, щоб просто послухати одну зустріч." },
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

const EXTRA_CONTACTS: {
  name: string;
  nameHref?: string;
  desc: string;
  lines: { label: string; value: string; href?: string }[];
}[] = [
  {
    name: "Українська група АА (США та Канада)",
    desc: "Зустрічі відбуваються в мережі ZOOM у понеділок та середу о 20:00 за часом Нью-Йорка. Також є Viber-чат для спілкування — щоб доєднатися, надішліть SMS на +1 916 792 1654.",
    lines: [
      { label: "ZOOM", value: "us06web.zoom.us/j/4201339480", href: "https://us06web.zoom.us/j/4201339480?pwd=vlF69iVIZlTbbKxcSHFuaUibJqnpTt.1" },
      { label: "Meeting ID", value: "420 133 9480" },
      { label: "SMS (Філадельфія)", value: "+1 267 902 9217", href: "sms:+12679029217" },
      { label: "SMS (Сакраменто)", value: "+1 916 792 1654", href: "sms:+19167921654" },
    ],
  },
  {
    name: "Група АА «Свобода», м. Чикаго",
    desc: "Проводить свої зустрічі щосереди.",
    lines: [
      { label: "Адреса", value: "5000 N Cumberland Ave, Chicago, IL 60656, США" },
    ],
  },
  {
    name: "Ал-Анон Україна",
    desc: "Всеукраїнський Центр Обслуговування Родинних груп Ал-Анон в Україні.",
    lines: [
      { label: "Сайт", value: "www.al-anon.org.ua", href: "https://www.al-anon.org.ua" },
      { label: "Телефон", value: "+38 095 838 29 33 (9:00–19:00)", href: "tel:+380958382933" },
      { label: "Email", value: "ukralanon@gmail.com", href: "mailto:ukralanon@gmail.com" },
    ],
  },
  {
    name: "Український Центр Обслуговування груп АА",
    nameHref: "https://aa.org.ua/contacts/",
    desc: "36023, м. Полтава, вул. Героїв АТО, 116/1",
    lines: [
      { label: "Email", value: "aa.ua.gso@gmail.com", href: "mailto:aa.ua.gso@gmail.com" },
      { label: "Сайт", value: "aa.org.ua/contacts", href: "https://aa.org.ua/contacts/" },
    ],
  },
];

const ONLINE_GROUPS: {
  name: string;
  desc: string;
  lines: { label: string; value: string; href?: string }[];
}[] = [
  {
    name: "Швидка допомога АА",
    desc: "Група створена командою україномовної групи АА «День незалежності» для швидкої допомоги та підтримки. Мета — комунікація для надання допомоги та підтримки.",
    lines: [{ label: "Telegram", value: "t.me/aa_idchat", href: "https://t.me/aa_idchat" }],
  },
  {
    name: "Група АА «День незалежності» 🇺🇦",
    desc: "Зібрання проходять кожного дня 20:00–21:00 за Києвом.",
    lines: [
      { label: "Telegram", value: "t.me/aaindependencedaychat", href: "https://t.me/aaindependencedaychat" },
      { label: "YouTube", value: "@aaindependenceday", href: "https://youtube.com/@aaindependenceday" },
      { label: "Сайт", value: "aa-id.com.ua", href: "https://aa-id.com.ua" },
    ],
  },
  {
    name: "Група АА «Все Просто»",
    desc: "Основна мета — допомогти іншим алкоголікам, які все ще страждають. Зібрання щодня о 21:30, у п'ятницю та вихідні об 11:00.",
    lines: [
      { label: "Telegram", value: "t.me/AA_VseProsto", href: "https://t.me/AA_VseProsto" },
      { label: "Сайт", value: "aa-vseprosto.org.ua", href: "https://aa-vseprosto.org.ua/" },
      { label: "Пошук спонсорів", value: "t.me/Aasponsors", href: "https://t.me/Aasponsors" },
      { label: "10 крок", value: "t.me/step10vseprosto", href: "https://t.me/step10vseprosto" },
      { label: "Вільне спілкування", value: "t.me/Vilne_spilkuvannya", href: "https://t.me/Vilne_spilkuvannya" },
      { label: "11 крок (7:00 та 23:00)", value: "t.me/AA_VseProsto_11_krok", href: "https://t.me/AA_VseProsto_11_krok" },
    ],
  },
  {
    name: "ВААУ — Військові Анонімні Алкоголіки",
    desc: "Збори для військових та ветеранів України у безпечному колі: вівторок 20:00, четвер 20:00, неділя 18:00, субота 10:00.",
    lines: [
      { label: "Telegram", value: "приєднатися", href: "https://t.me/+4_ieUfB-lp4wNmRi" },
      { label: "Гаряча лінія", value: "095-817-91-61", href: "tel:+380958179161" },
      { label: "Гаряча лінія", value: "096-196-21-29", href: "tel:+380961962129" },
    ],
  },
  {
    name: "Жіноча група АА «Вільна»",
    desc: "Запрошує всіх жінок, у яких можливо є проблеми з алкоголем. Збори кожного дня о 20:00.",
    lines: [{ label: "Telegram", value: "приєднатися", href: "https://t.me/+GYUUjgTXpGJiMjFi" }],
  },
  {
    name: "Група АА «Промінь»",
    desc: "Щоденні вечірні зібрання о 21:00 та в неділю о 12:00 за київським часом.",
    lines: [
      { label: "Telegram", value: "t.me/prominorgaa", href: "https://t.me/prominorgaa" },
      { label: "YouTube", value: "@aapromin", href: "https://www.youtube.com/@aapromin" },
    ],
  },
  {
    name: "Група АА «МИ»",
    desc: "Збори щодня о 13:00 за Києвом. Щоп'ятниці о 19:00 — спікерський виступ.",
    lines: [
      { label: "Сайт", value: "we-aa.org.ua", href: "https://we-aa.org.ua/" },
      { label: "YouTube", value: "@weaa13", href: "https://www.youtube.com/@weaa13" },
      { label: "Telegram", value: "t.me/weaa13", href: "https://t.me/weaa13" },
    ],
  },
  {
    name: "Закрита чоловіча група АА «Клан»",
    desc: "Гасло: «Ми є частиною рішення, а не частиною проблеми.» Розклад за Києвом: понеділок 20:00, середа 20:00, субота 10:00.",
    lines: [{ label: "Telegram", value: "t.me/mgklanaa", href: "https://t.me/mgklanaa" }],
  },
];


function Nav() {
  const links = [
    ["#about", "Про АА"],
    ["#faq", "Питання"],
    ["#quiz", "Тест"],
    ["#chat", "Запитати"],
    ["#directory", "Контакти"],
    ["#online", "Онлайн"],
  ];
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#top" className="font-display text-lg text-forest">
          <span className="text-gold">·</span> Коротко про АА
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
      </nav>
    </header>
  );
}


function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="mx-auto max-w-4xl px-6 pb-12 pt-10 text-center md:pb-16 md:pt-16">
        <p className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-moss">
          Інформаційний ресурс україномовної групи АА у США та Канаді
        </p>
        <h1 className="whitespace-nowrap font-display text-[clamp(1.25rem,4.5vw,3.5rem)] leading-tight text-forest">
          Коротко <span className="italic text-moss">про АА</span>
        </h1>
        <p className="mx-auto mt-8 max-w-xl text-lg text-moss">
          Про алкоголізм та Анонімних Алкоголіків — конфіденційно та
          самостійно, без осуду, без страху...
        </p>
      </div>
    </section>
  );
}

function About() {
  const cards = [
    { t: "Анонімність", d: "Ми використовуємо лише ім'я. Почуте на зустрічі залишається на зустрічі." },
    { t: "Без оцінки", d: "Ніхто не судить і не порівнює. Кожен говорить лише про свій досвід виходу з алкогольної залежностві." },
    { t: "Самофінансування", d: "При потребі оплатити ZOOM кімнату чи інші видатки — лише добровільні датки учасників. Жодних членських внесків." },
    { t: "Рівність", d: "Немає керівників чи експертів — усі рівні, усі одужують поряд." },
  ];
  return (
    <section id="about" className="relative border-t border-border/60 bg-linen py-12">
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


function Faq() {
  return (
    <section id="faq" className="border-t border-border/60 bg-sage/40 py-12">
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
    <section id="chat" className="border-t border-border/60 py-12">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center">
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-gold">/ 05 · розмова</p>
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

function ContactCard({
  c,
}: {
  c: { name: string; nameHref?: string; desc: string; lines: { label: string; value: string; href?: string }[] };
}) {
  return (
    <div className="flex flex-col rounded-2xl bg-sage/60 p-6 transition hover:bg-sage">
      <h4 className="font-display text-lg text-forest">
        {c.nameHref ? (
          <a
            href={c.nameHref}
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-forest/30 underline-offset-4 hover:decoration-forest"
          >
            {c.name}
          </a>
        ) : (
          c.name
        )}
      </h4>
      <p className="mt-2 text-sm leading-relaxed text-moss">{c.desc}</p>
      <ul className="mt-4 space-y-1.5">
        {c.lines.map((l, i) => (
          <li key={i} className="font-mono text-[13px] break-words text-moss">
            <span className="text-forest/60">{l.label}: </span>
            {l.href ? (
              <a
                href={l.href}
                target={l.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="underline decoration-forest/30 underline-offset-2 hover:text-forest"
              >
                {l.value}
              </a>
            ) : (
              <span>{l.value}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Directory() {
  return (
    <section id="directory" className="border-t border-border/60 bg-linen py-12">
      <div className="mx-auto max-w-6xl px-6">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-gold">Додаткові контакти</p>
        <h2 className="mt-3 font-display text-3xl text-forest md:text-4xl">
          Реальні контакти підтримки
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {EXTRA_CONTACTS.map((c) => (
            <ContactCard key={c.name} c={c} />
          ))}
        </div>
      </div>
    </section>
  );
}

function OnlineGroups() {
  return (
    <section id="online" className="border-t border-border/60 bg-sage/40 py-12">
      <div className="mx-auto max-w-6xl px-6">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-gold">Онлайн · час Київ</p>
        <h2 className="mt-3 font-display text-3xl text-forest md:text-4xl">
          Група АА он-лайн (час Київ)
        </h2>
        <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
          Українськомовні групи АА он-лайн — із посиланнями на чати, сайти та відеозустрічі.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ONLINE_GROUPS.map((g) => (
            <ContactCard key={g.name} c={g} />
          ))}
        </div>
      </div>
    </section>
  );
}


function Quiz() {
  const [answers, setAnswers] = useState<(boolean | null)[]>(
    () => Array(QUIZ_QUESTIONS.length).fill(null),
  );
  const [showResult, setShowResult] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  const answeredCount = answers.filter((a) => a !== null).length;
  const yesCount = answers.filter((a) => a === true).length;
  const allAnswered = answeredCount === QUIZ_QUESTIONS.length;

  function setAnswer(i: number, value: boolean) {
    setAnswers((prev) => {
      const next = [...prev];
      next[i] = value;
      return next;
    });
  }

  function reveal() {
    setShowResult(true);
    setShowModal(true);
    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 30);
  }

  function reset() {
    setAnswers(Array(QUIZ_QUESTIONS.length).fill(null));
    setShowResult(false);
    setShowModal(false);
  }

  return (
    <section id="quiz" className="border-t border-border/60 py-12">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center">
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-gold">/ 04 · роздуми</p>
          <h2 className="mt-4 font-display text-4xl text-forest md:text-5xl">
            Наскільки серйозна проблема?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-moss">
            12 спокійних питань — тільки для вас. Відповіді нікуди не надсилаються
            і залишаються у вашому браузері.
          </p>
        </div>

        <ol className="mt-12 space-y-4">
          {QUIZ_QUESTIONS.map((q, i) => {
            const n = String(i + 1).padStart(2, "0");
            const value = answers[i];
            return (
              <li
                key={i}
                className="rounded-2xl border border-border bg-card p-5 md:p-6"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between md:gap-6">
                  <div className="flex items-baseline gap-4">
                    <span className="font-display text-xl text-gold">{n}</span>
                    <p className="text-[15px] leading-relaxed text-forest">{q}</p>
                  </div>
                  <div className="flex shrink-0 gap-2 md:pt-1">
                    {[
                      { label: "Так", val: true },
                      { label: "Ні", val: false },
                    ].map((opt) => {
                      const active = value === opt.val;
                      return (
                        <button
                          key={opt.label}
                          type="button"
                          onClick={() => setAnswer(i, opt.val)}
                          className={
                            active
                              ? "min-w-[68px] rounded-full bg-forest px-4 py-2 text-sm font-medium text-linen transition"
                              : "min-w-[68px] rounded-full border border-forest/40 px-4 py-2 text-sm text-forest transition hover:border-forest hover:bg-forest/5"
                          }
                          aria-pressed={active}
                        >
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </li>
            );
          })}
        </ol>

        <div className="mt-8 flex flex-col items-center gap-3">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
            Відповіли: {answeredCount} / {QUIZ_QUESTIONS.length}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={reveal}
              disabled={!allAnswered}
              className="rounded-full bg-forest px-7 py-3 text-sm font-medium text-linen transition hover:bg-moss disabled:cursor-not-allowed disabled:opacity-40"
            >
              Показати результат
            </button>
            {(showResult || answeredCount > 0) && (
              <button
                type="button"
                onClick={reset}
                className="rounded-full border border-forest/40 px-7 py-3 text-sm text-forest transition hover:border-forest"
              >
                Почати спочатку
              </button>
            )}
          </div>
        </div>

        {showResult && (
          <div
            ref={resultRef}
            className="mt-10 rounded-2xl border border-border bg-sage/40 p-7 md:p-9"
          >
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-gold">
              Ваших «Так»: {yesCount} з {QUIZ_QUESTIONS.length}
            </p>
            <p className="mt-4 font-display text-2xl leading-snug text-forest md:text-3xl">
              Тільки ви можете вирішити, чи є для вас сенс у цих відповідях.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-moss">
              АА нічого не вказує і не змушує — просто ділиться досвідом тих,
              хто через це вже пройшов. Якщо відчуваєте, що варто поговорити —
              довідник груп і чат нижче завжди відкриті.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#directory"
                className="rounded-full bg-forest px-6 py-2.5 text-sm font-medium text-linen transition hover:bg-moss"
              >
                Довідник груп
              </a>
              <a
                href="#chat"
                className="rounded-full border border-forest px-6 py-2.5 text-sm text-forest transition hover:bg-forest hover:text-linen"
              >
                Поговорити в чаті
              </a>
            </div>
          </div>
        )}
      </div>

      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-forest/70 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="quiz-modal-title"
          onClick={() => setShowModal(false)}
        >
          <div
            className="relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-linen p-7 shadow-2xl md:p-10"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setShowModal(false)}
              aria-label="Закрити"
              className="absolute right-4 top-4 rounded-full border border-forest/30 px-3 py-1 text-sm text-forest transition hover:bg-forest hover:text-linen"
            >
              ✕
            </button>
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-gold">
              Ваших «Так»: {yesCount} з {QUIZ_QUESTIONS.length}
            </p>
            <h3
              id="quiz-modal-title"
              className="mt-3 font-display text-2xl leading-snug text-forest md:text-3xl"
            >
              Отже, що у Вас вийшло?
            </h3>

            <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-forest/90">
              <p>
                Ви відповіли <strong>ТАК</strong> на 4 або більше запитань?
                Ймовірно Ви потрапили у лихо.
              </p>
              <p>
                Тільки Ви можете прийняти рішення щодо Вашого одужання, щоб
                прийти в АА.
              </p>
              <p className="pl-4 border-l-2 border-gold/60 italic text-moss">
                В АА ми не вказуємо, що треба робити комусь.
              </p>
              <p>
                Ми просто розповідаємо, як пили самі, до яких негараздів це
                призвело, і як нам вдалось це припинити. Ми будемо раді
                допомогти і Вам, якщо Ви цього захочете.
              </p>
              <p>
                Багато хто з нас дурив себе, вважаючи, ніби ми п'ємо за
                бажанням. Багато хто з нас починав пити тому, що випиваючи,
                життя здавалося кращим (принаймні на деякий час).
              </p>
              <p>
                Доки ми не прийшли в АА, багато хто з нас казав, що нас
                підштовхують до випивки проблеми або люди у дома. Багато хто з
                нас визнає, що досить-таки часто не виходили на роботу, кажучи,
                що захворіли — хоча насправді були п'яні або у важкому
                похміллі. Час від часу багато хто з нас замислювався, чому ми
                відрізняємося від більшості інших людей, які можуть
                контролювати свою випивку.
              </p>
              <p className="font-display text-xl text-forest">Будьмо чесними!</p>
              <p>
                Лікарі стверджують, якщо виникає пов'язана з алкоголем
                проблема, а Ви продовжуєте пити, то ця проблема може тільки
                погіршуватися — вона ніколи не полегшується.
              </p>
              <p>
                Ми утримуємося тільки від цієї першої чарки. Якщо не буде
                першої, то не буде і десятої. Ми залишаємося тверезими лише
                сьогодні — день за днем, година за годиною.
              </p>
              <p>
                Тверезість підтримується завдяки обміну досвідом, силами і
                надіями на зборах групи АА і завдяки програмі «Дванадцять
                Кроків», яка пропонуються як програма одужання.
              </p>
              <p>
                Більшість членів АА будуть раді дати Вам свій номер телефону,
                і їм буде приємно, якщо Ви зателефонуєте, і попросите
                відповісти на запитання.
              </p>
              <p>
                Ми, учасники Анонімних Алкоголіків, — не обіцяємо вирішення
                усіх ваших проблем, але багатьом з нас вдалося вирішити
                проблему свого алкоголізму.
              </p>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#directory"
                onClick={() => setShowModal(false)}
                className="rounded-full bg-forest px-6 py-2.5 text-sm font-medium text-linen transition hover:bg-moss"
              >
                Довідник груп
              </a>
              <a
                href="#chat"
                onClick={() => setShowModal(false)}
                className="rounded-full border border-forest px-6 py-2.5 text-sm text-forest transition hover:bg-forest hover:text-linen"
              >
                Поговорити в чаті
              </a>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="ml-auto rounded-full border border-forest/40 px-6 py-2.5 text-sm text-forest transition hover:border-forest"
              >
                Закрити
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}



function Footer() {
  return (
    <footer className="border-t border-border/60 bg-forest py-8 text-linen">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="font-display text-2xl">Коротко про АА</p>
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
        
        <Faq />
        <Quiz />
        <Chat />
        <Directory />
        <OnlineGroups />
      </main>
      <Footer />
    </div>
  );
}
