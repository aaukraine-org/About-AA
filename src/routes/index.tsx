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


const DIRECTORY_REGIONS: {
  region: string;
  rows: { name: string; addr: string; time: string; contact: string }[];
}[] = [
  {
    region: "Київ",
    rows: [
      { name: "Лівобережка", addr: "бульвар Перова, 1-б (Костел, м. Дарниця)", time: "Пн–Нд 18:00", contact: "+38 099 782-30-31" },
      { name: "Апельсин", addr: "пров. Деміївський, 5-А (Соціотерапія, м. Голосіївська)", time: "Пн–Нд 19:00; Сб, Нд додатково 13:00", contact: "+38 095 774-30-89" },
      { name: "Десна", addr: "вул. М. Закревського, 29а (ЖЕД 305, Троєщина)", time: "Пн–Нд 19:00", contact: "+38 068 372-68-78" },
      { name: "Либідь", addr: "вул. Велика Китаївська, 83 (м. Деміївська)", time: "Пн, Ср 19:00", contact: "+38 095 273-85-24" },
      { name: "Оболонь", addr: "вул. Героїв полку «Азов», 27/23", time: "Пн–Нд 19:00", contact: "+38 096 631-13-93" },
      { name: "Фенікс", addr: "Печерський узвіз, 19 (м. Кловська)", time: "Пн–Нд 19:00", contact: "+38 098 300-01-01" },
      { name: "Михайлівська", addr: "вул. Трьохсвятительська, 4-Б", time: "Вт, Чт 19:00; Сб 10:00; Нд 9:00", contact: "+38 097 186-58-50" },
      { name: "Житомирська", addr: "вул. Чорнобильська, 2 (Храм)", time: "Пн, Ср, Пт 19:00", contact: "+38 093 694-92-88" },
      { name: "Дім На Горі", addr: "вул. Карпатської Січі, 2А", time: "Вт, Пт 17:00", contact: "+38 095 774-30-89" },
      { name: "Опора", addr: "вул. Каменярів, 68 (притулок)", time: "Ср 19:00", contact: "+38 095 095-2000" },
      { name: "Ти не одна (жіноча)", addr: "Печерський узвіз, 19", time: "Сб 16:00", contact: "+38 098 300-01-01" },
      { name: "На районі (чоловіча)", addr: "вул. Сержа Лифаря, 20 (Троєщина)", time: "Сб 16:00", contact: "+38 097 162-58-08" },
    ],
  },
  {
    region: "Львів",
    rows: [
      { name: "Криниця", addr: "пл. Соборна, 3 (Церква Св. Андрія)", time: "Сб 18:30", contact: "+38 067 944-21-86" },
      { name: "Світло", addr: "вул. Симоненка, 5 (храм Св. Володимира і Ольги)", time: "Пн, Ср, Пт 19:00", contact: "+38 067 420-01-13" },
      { name: "Човник", addr: "вул. Озеркевича, 4 (шпиталь Шептицького)", time: "Нд 17:30", contact: "+38 098 253-57-58, +38 093 929-26-32, +38 066 988-43-35" },
      { name: "Сихів", addr: "пр. Червоної Калини, 70 (церква Різдва Богородиці)", time: "Ср 18:30", contact: "+38 067 947-72-77" },
      { name: "На Привокзальній", addr: "пл. Кропивницького, 1 (церква св. Єлизавети)", time: "Нд 15:30", contact: "+38 098 449-00-69" },
      { name: "Вежа", addr: "вул. Винниченка, 22 (храм Св. Арх. Михаїла)", time: "Вт 19:30", contact: "+38 063 068-69-71 (Юра)" },
      { name: "Вогник", addr: "вул. Ужгородська, 8а (костел Івана Хрестителя)", time: "Ср 18:30", contact: "+38 066 725-58-02" },
      { name: "Свобода", addr: "вул. Городоцька, 321 (Церква Воскресіння)", time: "Вт 18:30", contact: "+38 097 038-74-91" },
      { name: "Переможець", addr: "пл. Св. Юра, 5", time: "Сб 18:00", contact: "+38 097 297-64-25" },
      { name: "Самі свої", addr: "вул. Театральна, 11 (хр. Св. Петра і Павла)", time: "Вт 18:30", contact: "немає даних" },
      { name: "Кроки", addr: "вул. Франка, 56–58 (Церква Непорочного Зачаття)", time: "Сб 16:30", contact: "+38 067 944-21-86" },
      { name: "Бочка", addr: "вул. Винниченка, 32 (Палац єпископів)", time: "Чт 18:30", contact: "+38 098 199-99-95" },
    ],
  },
  {
    region: "Інші регіони",
    rows: [
      { name: "Рубікон (Чернігів)", addr: "вул. Реміснича, 49 (ДОСААФ)", time: "Пн–Нд 18:00", contact: "+38 073 429-89-78" },
      { name: "У Броварах (Київська обл.)", addr: "вул. Симона Петлюри, 34", time: "Пн, Ср, Пт 20:00", contact: "+38 050 071-90-05" },
      { name: "Сходинки (Бородянка)", addr: "вул. Польова, 11", time: "час уточнювати", contact: "+38 097 969-00-98 (Олександр)" },
      { name: "Ми (Черкаси)", addr: "вул. Верхня Горова, 178 (БФ «ВАМ»)", time: "Чт 17:30; Сб 12:00", contact: "+38 096 027-56-10" },
      { name: "Надія (Стрий)", addr: "вул. Успенська (Храм Успенія)", time: "Ср 18:00; Нд 15:00", contact: "+38 073 134-31-73" },
      { name: "Надія (Самбір)", addr: "вул. Франка (Церква Покрови)", time: "Сб 16:00", contact: "+38 096 465-14-99" },
      { name: "Едем (Дрогобич)", addr: "вул. Трускавецька, 2 (Катедральний Собор)", time: "Пн, Чт 17:45", contact: "+38 097 338-43-44" },
      { name: "Гаряча лінія Полтава", addr: "немає адреси", time: "немає розкладу", contact: "+38 095 498-63-31, +38 096 187-11-83" },
    ],
  },
  {
    region: "Онлайн-групи",
    rows: [
      { name: "Промінь", addr: "Онлайн", time: "Щодня 21:00–22:00; Нд 12:00–13:00", contact: "+38 093 744-10-11 (Христина)" },
      { name: "Все Просто", addr: "Онлайн", time: "Щодня 21:30 (Нд — спікерські виступи)", contact: "+38 063 738-10-93 (Сергій)" },
      { name: "Вільна (жіноча)", addr: "Онлайн", time: "Щодня 20:00", contact: "немає даних" },
    ],
  },
];

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

const EXTRA_CONTACTS = [
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
    name: "Українська група АА (США та Канада)",
    desc: "Зустрічі щопонеділка та щосереди о 20:00 (EST, Нью-Йорк), онлайн. Viber-чат — приєднатися через SMS.",
    lines: [
      { label: "SMS (Філадельфія)", value: "+1 267 902 9217", href: "sms:+12679029217" },
      { label: "SMS (Сакраменто)", value: "+1 916 792 1654", href: "sms:+19167921654" },
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
    ["#faq", "Питання"],
    ["#quiz", "Тест"],
    ["#chat", "Запитати"],
    ["#directory", "Групи"],
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


function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="mx-auto max-w-4xl px-6 pb-24 pt-20 text-center md:pb-32 md:pt-32">
        <p className="mb-6 font-mono text-xs uppercase tracking-[0.28em] text-moss">
          Інформаційний ресурс · українською
        </p>
        <h1 className="font-display text-5xl leading-[1.05] text-forest md:text-7xl">
          Коротко<br />
          <span className="italic text-moss">про АА.</span>
        </h1>
        <p className="mx-auto mt-8 max-w-xl text-lg text-moss">
          Спокійна розмова про Анонімних Алкоголіків та програму 12 Кроків —
          без осуду, без страху, у власному темпі.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
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

function Directory() {
  return (
    <section id="directory" className="border-t border-border/60 bg-linen py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-gold">/ 06 · довідник</p>
            <h2 className="mt-4 font-display text-4xl text-forest md:text-5xl">Групи АА</h2>
          </div>
          <p className="max-w-md text-sm text-muted-foreground">
            Оберіть регіон, щоб побачити перелік груп: адреси, час зустрічей і контактні телефони.
          </p>
        </div>

        <Accordion type="multiple" className="mt-10 space-y-3">
          {DIRECTORY_REGIONS.map((r) => (
            <AccordionItem
              key={r.region}
              value={r.region}
              className="overflow-hidden rounded-2xl border border-border bg-card"
            >
              <AccordionTrigger className="px-5 py-4 text-left font-display text-lg text-forest hover:no-underline md:px-6">
                <span className="flex flex-1 items-baseline justify-between gap-4 pr-3">
                  <span>{r.region}</span>
                  <span className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    {r.rows.length} груп
                  </span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="p-0">
                <div className="hidden grid-cols-[1.1fr_1.6fr_1.1fr_1.2fr] gap-4 border-t border-border bg-sage/50 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-forest md:grid md:px-6">
                  <span>Група</span>
                  <span>Адреса</span>
                  <span>Час зустрічей</span>
                  <span>Контакт</span>
                </div>
                {r.rows.map((row, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-1 gap-1 border-t border-border px-5 py-4 md:grid-cols-[1.1fr_1.6fr_1.1fr_1.2fr] md:gap-4 md:px-6 md:py-3.5"
                  >
                    <span className="font-display text-forest">{row.name}</span>
                    <span className="font-mono text-[13px] text-moss">{row.addr}</span>
                    <span className="font-mono text-[13px] text-moss">{row.time}</span>
                    <span className="font-mono text-[13px] text-moss">{row.contact}</span>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <p className="mt-6 text-xs text-muted-foreground">
          Джерела: aa.kiev.ua, aa.org.ua/groups, aa-zakhid.org.ua. Дані можуть змінюватись — перед візитом рекомендуємо уточнити.
        </p>

        <div className="mt-12">
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-gold">Додаткові контакти</p>
          <h3 className="mt-3 font-display text-2xl text-forest md:text-3xl">
            Реальні контакти підтримки
          </h3>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {EXTRA_CONTACTS.map((c) => (
              <div
                key={c.name}
                className="flex flex-col rounded-2xl bg-sage/60 p-6 transition hover:bg-sage"
              >
                <h4 className="font-display text-lg text-forest">{c.name}</h4>
                <p className="mt-2 text-sm leading-relaxed text-moss">{c.desc}</p>
                <ul className="mt-4 space-y-1.5">
                  {c.lines.map((l, i) => (
                    <li key={i} className="font-mono text-[13px] text-moss">
                      <span className="text-forest/60">{l.label}: </span>
                      <a href={l.href} className="underline decoration-forest/30 underline-offset-2 hover:text-forest">
                        {l.value}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
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
    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 30);
  }

  function reset() {
    setAnswers(Array(QUIZ_QUESTIONS.length).fill(null));
    setShowResult(false);
  }

  return (
    <section id="quiz" className="border-t border-border/60 py-24">
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
    </section>
  );
}


function Footer() {
  return (
    <footer className="border-t border-border/60 bg-forest py-14 text-linen">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="font-display text-2xl">Коротко про АА.</p>
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
      </main>
      <Footer />
    </div>
  );
}
