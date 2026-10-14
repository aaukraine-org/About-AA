import { createFileRoute } from "@tanstack/react-router";
import { Nav, Footer } from "@/components/site-chrome";

export const Route = createFileRoute("/contacts")({
  head: () => ({
    meta: [
      { title: "Контакти — Коротко про АА" },
      { name: "description", content: "Контакти та онлайн-групи Анонімних Алкоголіків: куди звернутися за допомогою." },
      { property: "og:title", content: "Контакти — Коротко про АА" },
    ],
  }),
  component: Contacts,
});

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
      { label: "SMS", value: "+1 347 768 4886", href: "sms:+13477684886" },
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
    nameHref: "https://aa.org.ua/",
    desc: "36023, м. Полтава, вул. Героїв АТО, 116/1",
    lines: [
      { label: "Сайт", value: "aa.org.ua/contacts", href: "https://aa.org.ua/contacts/" },
      { label: "Групи АА в Україні", value: "aa.org.ua/group", href: "https://aa.org.ua/contacts/" },
    ],
  },
  {
    name: "Анонімні Алкоголіки",
    nameHref: "https://aa.lviv.ua/",
    desc: "Довідкова інформація про програму АА.",
    lines: [
      { label: "Читати більше про АА", value: "aa.lviv.ua", href: "https://aa.lviv.ua/" },
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
    desc: "Зібрання для військових та ветеранів України у безпечному колі: вівторок 20:00, четвер 20:00, неділя 18:00, субота 10:00.",
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

function ContactCard({
  c,
}: {
  c: { name: string; nameHref?: string; desc: string; lines: { label: string; value: string; href?: string }[] };
}) {
  return (
    <div className="flex flex-col rounded-2xl bg-sage/60 p-6 transition hover:bg-sage">
      <h4 className="font-display text-sm text-forest">
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
      <p className="mt-2 text-xs leading-relaxed text-moss">{c.desc}</p>
      <ul className="mt-4 space-y-1.5">
        {c.lines.map((l, i) => (
          <li key={i} className="font-mono text-[11px] break-words text-moss">
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
    <section id="directory" className="border-t border-border/60 bg-linen py-8 md:py-12">
      <div className="mx-auto max-w-6xl px-6">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-gold">Додаткові контакти</p>
        <h2 className="mt-3 font-display text-xl text-forest md:text-2xl">
          Куди звертатися - інформація доповнюється
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
    <section id="online" className="border-t border-border/60 bg-sage/40 py-8 md:py-12">
      <div className="mx-auto max-w-6xl px-6">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-gold">Онлайн</p>
        <h2 className="mt-3 font-display text-xl text-forest md:text-2xl">
          Група АА он-лайн (час Київ)
        </h2>
        <p className="mt-3 max-w-2xl text-xs text-muted-foreground">
          Українськомовні групи АА он-лайн — із посиланнями на чати груп, сайти та відеозустрічі.
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

function Contacts() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main>
        <Directory />
        <OnlineGroups />
      </main>
      <Footer />
    </div>
  );
}
