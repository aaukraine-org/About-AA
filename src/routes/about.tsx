import { createFileRoute } from "@tanstack/react-router";
import { Nav, Footer } from "@/components/site-chrome";

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
    <section id="about" className="relative border-t border-border/60 bg-linen py-8 md:py-12">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-14 md:grid-cols-[1fr_1.2fr]">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-gold">/ 01 · спільнота</p>
            <h2 className="mt-4 font-display text-2xl text-forest md:text-3xl">Що таке АА</h2>
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

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c) => (
            <div
              key={c.t}
              className="rounded-2xl bg-sage/60 p-6 transition hover:bg-sage"
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

function Subscribe() {
  return (
    <section id="subscribe" className="scroll-mt-20 border-t border-border/60 bg-sage/40 py-8 md:py-12">
      <div className="mx-auto max-w-6xl px-6">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-gold">/ 02 · розсилка</p>
        <h2 className="mt-4 font-display text-2xl text-forest md:text-3xl">Підписка на розсилку</h2>
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
        <Subscribe />
      </main>
      <Footer />
    </div>
  );
}
