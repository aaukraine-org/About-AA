import { createFileRoute } from "@tanstack/react-router";
import { Nav, Footer } from "@/components/site-chrome";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const BREVO_FORM_SRC = "https://c0c6a5ab.sibforms.com/v2/serve/MUIFAD2iNkK40B5Eq1hnXnyL2V4GvKOxOcs5G2aUgGoDoJMy_zzb4e_-0iHJT3oVWqOFYpZte8KZprSY78N3-v4Z5xG5vuM-Ekm1aY_88R8LmwGr_E-KiRHGDVpC5oyudqFOK9JX-fx3fXT5Y4MXyrLHiTwSAyfsUgeLnVzB5DS3oiBbqy5GQkNJtS_UP6DmaPcVmGi7tFkZyFL4oQ==";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Про АА — Коротко про АА" },
      { name: "description", content: "Що таке Анонімні Алкоголіки: анонімність, рівність, самофінансування та єдина умова участі — бажання перестати пити." },
      { property: "og:title", content: "Про АА — Коротко про АА" },
    ],
  }),
  component: AboutPage,
});

function About() {
  const cards = [
    { t: "Анонімність", d: "Ми використовуємо лише ім'я. Почуте на зустрічі залишається на зустрічі." },
    { t: "Без оцінки", d: "Ніхто не осуджує і не порівнює. Кожен говорить лише про свій досвід виходу з алкогольної залежності." },
    { t: "Самофінансування", d: "При потребі оплатити ZOOM кімнату чи інші видатки — лише добровільні датки учасників АА. Жодних членських внесків." },
    { t: "Рівність", d: "Немає керівників чи експертів — усі рівні, перед хворобою усі рівні." },
  ];
  return (
    <section id="about" className="relative border-t border-border/60 bg-linen py-5 md:py-7">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-14 md:grid-cols-[1fr_1.2fr]">
          <div>
            <h2 className="font-display text-2xl text-forest md:text-3xl">Що таке АА</h2>
          </div>
          <div className="space-y-5 text-sm leading-relaxed text-moss">
            <p>
              Анонімні Алкоголіки — це об'єднання людей, які діляться між собою досвідом,
              силою й надіями, щоби разом одужувати від алкоголізму.
            </p>
            <p>
              Єдина умова, щоб приєднатися — власне бажання перестати пити.
            </p>
            <p>
              АА не пов'язана з жодною релігією, партією чи установою.
            </p>
            <p>
              Спільнота існує на добровільні пожертви самих учасників — тут немає членських внесків і немає керівництва
              у звичному сенсі.
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c) => (
            <div
              key={c.t}
              className="rounded-2xl bg-sage/60 p-4 transition hover:bg-sage"
            >
              <h3 className="font-display text-base text-forest">{c.t}</h3>
              <p className="mt-3 text-xs leading-relaxed text-moss">{c.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const FAQ = [
  { q: "Чи АА — це релігійна організація?", a: "Ні. АА не пов'язана з жодною конфесією, партією чи установою. У програмі йдеться про «силу більшу за нас» — кожен розуміє це по-своєму: хтось як Бога, хтось як спільноту, природу чи власне сумління." },
  { q: "Чи потрібно платити?", a: "Ні, членських внесків немає. Товариство існує на добровільні пожертви самих учасників — зазвичай кілька гривень у «капелюх» на оренду приміщення й каву. Прийти й слухати можна безкоштовно." },
  { q: "Що буде на першій зустрічі?", a: "Люди сідають у коло, хтось веде зустріч, читають короткі тексти, потім по черзі бажаючі коротко говорять про себе. Вас ніхто не змусить говорити — можна просто слухати. Виходити теж можна будь-коли." },
  { q: "Як прийти на першу зустріч?", a: "Найпростіше — зателефонувати на вказані номери, які подані нижче на цьому сайті, і там підкажуть варіанти. Можна також просто прийти за адресою що подана на цьому сайті нижче." },
  { q: "Чи це справді анонімно?", a: "Так. Прийнято називати лише ім'я (або й вигадане), ми не питаємо про ваше минуле, яким би не були ваші проблеми - серед нас є ті, хто пережив їх також. Анонімність — духовна основа спільноти." },
  { q: "Чи є онлайн-зустрічі?", a: "Так, українських онлайн-груп зараз чимало — у Zoom і інших месенджерах. Це зручний спосіб спробувати долучитися до учасників Програми, не виходячи з дому." },
  { q: "Що робити, якщо стався зрив?", a: "Найзручніше це прийти на зібрання і після завершення поговорити з тим, чия історія вам найбільше відгукнулася." },
  { q: "Чи можуть прийти родичі?", a: "Для близьких людей залежних існує окрема спільнота — Ал-Анон. Там рідні діляться власним досвідом і вчаться піклуватися про себе, поки близька людина шукає свій шлях." },
  { q: "Як зрозуміти, що варто прийти?", a: "Не потрібно ставити собі діагноз. Якщо алкоголь дедалі частіше з'являється у ваших думках або створює проблеми, які ви вже помітили, — цього достатньо, щоб просто послухати одну зустріч." },
];

function Faq() {
  return (
    <section id="faq" className="scroll-mt-20 border-t border-border/60 bg-sage/40 py-5 md:py-7">
      <div className="mx-auto max-w-4xl px-6">
        <div className="text-center">
          <h2 className="font-display text-2xl text-forest md:text-3xl">
            Що люди питають найчастіше
          </h2>
        </div>

        <Accordion type="single" collapsible className="mt-4">
          {FAQ.map((item, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="border-b border-forest/15"
            >
              <AccordionTrigger className="py-5 text-left font-display text-sm text-forest hover:no-underline">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="pb-5 pr-6 text-[12px] leading-relaxed text-moss">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

function Subscribe() {
  return (
    <section id="subscribe" className="scroll-mt-20 border-t border-border/60 bg-linen py-5 md:py-7">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="font-display text-2xl text-forest md:text-3xl">Підписка на розсилку</h2>
        <div className="mt-8">
          <iframe
            src={BREVO_FORM_SRC}
            title="Підписка на розсилку АА"
            width="100%"
            height="430"
            loading="lazy"
            style={{ border: 0, display: "block", maxWidth: 540, margin: "0 auto" }}
          />
        </div>
      </div>
    </section>
  );
}

function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main>
        <About />
        <Faq />
        <Subscribe />
      </main>
      <Footer />
    </div>
  );
}
