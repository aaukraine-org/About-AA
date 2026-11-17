import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { Nav, Footer } from "@/components/site-chrome";

export const Route = createFileRoute("/")({
  component: Home,
});



const QUIZ_QUESTIONS = [
  "Чи бувало, що Ви вирішували не пити тиждень або більше, але Вас вистачало тільки на день-два?",
  "Чи хотілося Вам, щоб оточуючі перестали говорити Вам про Ваше пияцтво і про те, що Вам треба робити?",
  "Чи намагалися Ви переходити з одного виду випивки на інший в надії, що це допоможе Вам не напитися?",
  "Чи доводилось Вам протягом останнього року випивати вранці, щоб мати можливість почати новий день?",
  "Чи заздрите Ви тим, хто може пити без неприємних наслідків?",
  "Чи траплялися у Вас протягом останнього року проблеми на роботі через надмірне вживання алкоголю?",
  "Чи виникали у Вас через випивку прикрощі вдома чи спілкуванні з родиною?",
  "Чи траплялось так, що, випиваючи в компанії, Ви прагнули перехопити додаткову чарку, тому що Вам не вистачало?",
  "Чи говорите Ви собі, що можете перестати пити в будь-який момент, як тільки захочете, хоча часто напиваєтесь і тоді, коли зовсім не збирались цього робити?",
  "Чи прогулювали Ви роботу або заняття через випивку?",
  "Чи бувають у Вас провали пам'яті?",
  "Чи з'являлось у Вас коли-небудь відчуття, що якби Ви не пили, то Ваше життя було б кращим?",
];






function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="mx-auto max-w-4xl px-6 pb-6 pt-6 text-center md:pb-8 md:pt-10">
        <p className="mb-3 font-display text-sm font-bold text-forest">
          Інформаційний ресурс україномовної групи АА у США та Канади
        </p>
        <h1 className="whitespace-nowrap font-display text-[clamp(0.8rem,3vw,2.25rem)] leading-tight text-forest">
          Коротко про АА
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-sm text-moss">
          Про алкоголізм та Анонімних Алкоголіків 
          — конфіденційно, без осуду, без страху...
        </p>
        <a
          href="/about#subscribe"
          className="mt-5 inline-flex items-center rounded-full bg-forest px-6 py-3 text-sm text-linen transition hover:bg-forest/90"
        >
          Підписатися на розсилку
        </a>
      </div>
    </section>
  );
}


// Перетворює звичайні http(s)-посилання у тексті на клікабельні <a>-теги
// (бот віддає посилання як звичайний текст, напр. "(https://...)" —
// цей рендер перетворює саму адресу на гіперпосилання, дужки/крапки
// навколо лишаються звичайним текстом).
function linkifyText(text: string): React.ReactNode[] {
  const urlRegex = /(https?:\/\/[^\s()]+)/g;
  const trailingPunctRegex = /[.,;:!?]+$/;
  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = urlRegex.exec(text)) !== null) {
    const start = match.index;
    let url = match[0];

    const trailingMatch = url.match(trailingPunctRegex);
    let trail = "";
    if (trailingMatch) {
      trail = trailingMatch[0];
      url = url.slice(0, url.length - trail.length);
    }

    if (start > lastIndex) {
      nodes.push(<span key={key++}>{text.slice(lastIndex, start)}</span>);
    }
    nodes.push(
      <a
        key={key++}
        href={url}
        target="_blank"
        rel="noreferrer"
        className="underline break-all"
      >
        {url}
      </a>,
    );
    if (trail) nodes.push(<span key={key++}>{trail}</span>);

    lastIndex = start + match[0].length;
  }

  if (lastIndex < text.length) {
    nodes.push(<span key={key++}>{text.slice(lastIndex)}</span>);
  }
  return nodes;
}

function Chat() {
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([
    {
      role: "assistant",
      content:
        "Привіт. Тут можна задати загальні питання про Програму АА чи про \"12 Кроків\" — і я коротко відповім. Наша розмова не зберігається і нікому не передається.",
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
    <section id="chat" className="border-t border-border/60 py-5 md:py-7">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center">
          <h2 className="font-display text-2xl text-forest md:text-3xl">
            Запитати напряму
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-moss">
            Коротка загальна інформація про АА та 12 Кроків. Без діагнозів і медичних порад.
          </p>
        </div>

        <div className="mt-5 overflow-hidden rounded-2xl border border-border bg-card">
          <div
            ref={scrollRef}
            className="max-h-[440px] min-h-[280px] space-y-4 overflow-y-auto px-4 py-3"
          >
            {messages.map((m, i) => (
              <div
                key={i}
                className={m.role === "user" ? "flex justify-end" : "flex justify-start"}
              >
                <div
                  className={
                    m.role === "user"
                      ? "max-w-[80%] rounded-2xl rounded-br-sm bg-forest px-4 py-2.5 text-xs text-linen"
                      : "max-w-[80%] whitespace-pre-wrap text-[12px] leading-relaxed text-forest"
                  }
                >
                  {linkifyText(m.content)}
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
              placeholder="у цьому рядку - напишіть своє запитання…"
              disabled={loading}
              className="flex-1 rounded-full border border-border bg-card px-4 py-2.5 text-xs text-forest outline-none placeholder:text-muted-foreground focus:border-forest"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="rounded-full bg-forest px-5 py-2.5 text-xs font-medium text-linen transition hover:bg-moss disabled:opacity-50"
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



function EventsCalendar() {
  return (
    <section id="calendar" className="border-t border-border/60 bg-linen py-5 md:py-7">
      <div className="mx-auto max-w-6xl px-6">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-gold">Календар</p>
        <h2 className="mt-3 font-display text-xl text-forest md:text-2xl">
          Розклад зустрічей, форумів та конвенцій АА
        </h2>
        <p className="mt-3 max-w-2xl text-xs text-muted-foreground">
          Загальнонаціональний календар зустрічей, форумів та конвенцій АА українською мовою — синхронізується щодня. Це неофіційний ресурс, який веде один з учасників спільноти (не офіційний сайт aa.org.ua).
        </p>
        <div className="mt-6 w-full overflow-hidden rounded-2xl border border-border">
          <iframe
            src="https://calendar.google.com/calendar/embed?height=600&wkst=2&ctz=Europe%2FKyiv&showPrint=0&mode=MONTH&src=de1a01983c7fa86c70825ca9be3b1580ab51de81a869e8e7fab59d17040e0ec0%40group.calendar.google.com"
            style={{ border: 0 }}
            width="100%"
            height="600"
            frameBorder={0}
            scrolling="no"
            loading="lazy"
            title="Календар зустрічей, форумів та конвенцій АА"
          />
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Джерело:{" "}
          <a
            href="https://aa.lviv.ua/events/"
            target="_blank"
            rel="noreferrer"
            className="underline hover:text-forest"
          >
            aa.lviv.ua/events
          </a>
        </p>
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
  const isAffected = yesCount >= 4;

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
    <section id="quiz" className="border-t border-border/60 py-5 md:py-7">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center">
          <h2 className="font-display text-2xl text-forest md:text-3xl">
            Наскільки серйозна проблема?
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-moss">
            12 запитань — тільки для вас. Відповіді нікуди не надсилаються - це лише бачите ви !
          </p>
        </div>

        <ol className="mt-5 space-y-2">
          {QUIZ_QUESTIONS.map((q, i) => {
            const n = String(i + 1).padStart(2, "0");
            const value = answers[i];
            return (
              <li
                key={i}
                className="rounded-2xl border border-border bg-card px-4 py-3 md:px-5 md:py-3"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between md:gap-6">
                  <div className="flex items-baseline gap-4">
                    <span className="font-display text-base text-gold">{n}</span>
                    <p className="text-[12px] leading-relaxed text-forest">{q}</p>
                  </div>
                  <div className="flex shrink-0 gap-1.5 md:pt-1">
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
                              ? "min-w-[68px] rounded-full bg-forest px-4 py-2 text-xs font-medium text-linen transition"
                              : "min-w-[68px] rounded-full border border-forest/40 px-4 py-2 text-xs text-forest transition hover:border-forest hover:bg-forest/5"
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

        <div className="mt-5 flex flex-col items-center gap-3">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
            Відповіли: {answeredCount} / {QUIZ_QUESTIONS.length}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={reveal}
              disabled={!allAnswered}
              className="rounded-full bg-forest px-7 py-3 text-xs font-medium text-linen transition hover:bg-moss disabled:cursor-not-allowed disabled:opacity-40"
            >
              Показати результат
            </button>
            {(showResult || answeredCount > 0) && (
              <button
                type="button"
                onClick={reset}
                className="rounded-full border border-forest/40 px-7 py-3 text-xs text-forest transition hover:border-forest"
              >
                Почати спочатку
              </button>
            )}
          </div>
        </div>

        {showResult && (
          <div
            ref={resultRef}
            className="mt-10 rounded-2xl border border-border bg-sage/40 p-4 md:p-5"
          >
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-gold">
              Ваших «Так»: {yesCount} з {QUIZ_QUESTIONS.length}
            </p>
            <p className="mt-4 font-display text-lg leading-snug text-forest md:text-xl">
              Тільки ви можете вирішити, чи є для вас сенс у цих відповідях.
            </p>
            <p className="mt-4 text-[12px] leading-relaxed text-moss">
              АА нічого не вказує і не змушує — просто ділиться досвідом тих,
              хто через це вже пройшов. Якщо відчуваєте, що варто поговорити —
              сторінка «Контакти» і чат завжди відкриті.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="/contacts"
                className="rounded-full bg-forest px-6 py-2.5 text-xs font-medium text-linen transition hover:bg-moss"
              >
                Контакти
              </a>
              <a
                href="#chat"
                className="rounded-full border border-forest px-6 py-2.5 text-xs text-forest transition hover:bg-forest hover:text-linen"
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
              className="absolute right-4 top-4 rounded-full border border-forest/30 px-3 py-1 text-xs text-forest transition hover:bg-forest hover:text-linen"
            >
              ✕
            </button>
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-gold">
              Ваших «Так»: {yesCount} з {QUIZ_QUESTIONS.length}
            </p>
            <h3
              id="quiz-modal-title"
              className="mt-3 font-display text-lg leading-snug text-forest md:text-xl"
            >
              Отже, що у Вас вийшло?
            </h3>

            <div className="mt-5 space-y-4 text-[12px] leading-relaxed text-forest/90">
              {isAffected ? (
                <>
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
                  <p className="font-display text-base text-forest">Будьмо чесними!</p>
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
                </>
              ) : (
                <>
                  <p>
                    Ви відповіли «Так» менш ніж на 4 запитання. Це не означає,
                    що проблеми немає — і не означає, що вона точно є. Тільки
                    ви можете оцінити власну ситуацію.
                  </p>
                  <p>
                    Якщо щось у ваших відповідях зачіпило вас, або ви просто
                    хочете зрозуміти більше про АА — ніхто не заперечуватиме.
                    АА нічого не нав'язує: ми просто ділимося досвідом людей,
                    які через це пройшли. Сторінка «Контакти» і чат відкриті для
                    вас, без жодних зобов'язань.
                  </p>
                </>
              )}
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="/contacts"
                onClick={() => setShowModal(false)}
                className="rounded-full bg-forest px-6 py-2.5 text-xs font-medium text-linen transition hover:bg-moss"
              >
                Контакти
              </a>
              <a
                href="#chat"
                onClick={() => setShowModal(false)}
                className="rounded-full border border-forest px-6 py-2.5 text-xs text-forest transition hover:bg-forest hover:text-linen"
              >
                Поговорити в чаті
              </a>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="ml-auto rounded-full border border-forest/40 px-6 py-2.5 text-xs text-forest transition hover:border-forest"
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




function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main>
        <Hero />
        <Quiz />
        <Chat />
        <EventsCalendar />
      </main>
      <Footer />
    </div>
  );
}
