import { createFileRoute } from "@tanstack/react-router";
import { AA_KNOWLEDGE_BASE, AA_GUARDRAILS, AA_CRISIS_PROTOCOL } from "@/lib/aa-knowledge-base";

type Msg = { role: "user" | "assistant" | "system"; content: string };

// Стисла версія правил — для швидкого орієнтування. Повні правила
// (guardrails, кризовий протокол) і довідковий контент підвантажуються
// нижче з src/lib/aa-knowledge-base.ts і йдуть у system-промпт автоматично.
const SYSTEM_PROMPT = `Ти — інформаційний помічник про АА (Анонімних Алкоголіків) та програму 12 Кроків. Відповідай українською, коротко і тепло. Даєш тільки загальну інформацію, НЕ ставиш діагнози, НЕ даєш медичних порад. Якщо людина описує кризу, суїцидальні думки або думки про самоушкодження — м'яко направ до довідника груп на цьому сайті або до фахівця (лікаря, психотерапевта, лінії довіри), без порад щодо способів заподіяння шкоди. Не цитуй дослівно захищений авторським правом офіційний текст АА — переказуй сенс власними словами. Тон — спокійний, без осуду, без стигматизації.`;

// Anthropic API — напряму, без проміжного Supabase. Ключ читається з
// змінної середовища ANTHROPIC_API_KEY (Cloudflare Pages → Settings →
// Environment variables → додати як Secret). НІКОЛИ не хардкодити ключ
// тут — цей репозиторій публічний.
const MODEL = "claude-haiku-4-5-20251001";
const MAX_TOKENS = 1024;
// Скільки останніх повідомлень історії передавати в модель (обмеження
// вартості/довжини запиту — цього достатньо для короткого FAQ-діалогу).
const MAX_HISTORY_MESSAGES = 20;

function buildSystemPrompt(): string {
  return [
    SYSTEM_PROMPT,
    "",
    "### Обов'язкові правила (дотримуйся їх завжди, без винятків):",
    AA_GUARDRAILS,
    "",
    "### Протокол дій у кризовій ситуації:",
    AA_CRISIS_PROTOCOL,
    "",
    "### Довідковий контент для відповідей (переказ суті, не дослівна цитата):",
    AA_KNOWLEDGE_BASE,
  ].join("\n");
}

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const apiKey = process.env.ANTHROPIC_API_KEY;
        if (!apiKey) {
          console.error("ANTHROPIC_API_KEY не задано в змінних середовища Cloudflare Pages");
          return new Response(
            JSON.stringify({ content: "Чат тимчасово недоступний. Спробуйте пізніше." }),
            { status: 500, headers: { "Content-Type": "application/json" } },
          );
        }

        let body: { messages?: Msg[] };
        try {
          body = (await request.json()) as { messages?: Msg[] };
        } catch {
          return new Response("Invalid JSON", { status: 400 });
        }

        const history = Array.isArray(body.messages) ? body.messages : [];
        const messages = history
          .filter((m): m is Msg & { role: "user" | "assistant" } => m.role === "user" || m.role === "assistant")
          .slice(-MAX_HISTORY_MESSAGES)
          .map((m) => ({ role: m.role, content: m.content }));

        if (messages.length === 0) {
          return new Response(JSON.stringify({ content: "" }), {
            headers: { "Content-Type": "application/json" },
          });
        }

        let upstream: Response;
        try {
          upstream = await fetch("https://api.anthropic.com/v1/messages", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-api-key": apiKey,
              "anthropic-version": "2023-06-01",
            },
            body: JSON.stringify({
              model: MODEL,
              max_tokens: MAX_TOKENS,
              system: buildSystemPrompt(),
              messages,
            }),
          });
        } catch (error) {
          console.error("Не вдалось звʼязатися з Anthropic API:", error);
          return new Response("AI error", { status: 502 });
        }

        if (!upstream.ok) {
          const text = await upstream.text();
          console.error("Anthropic API повернув помилку:", upstream.status, text);
          return new Response(text || "AI error", { status: upstream.status });
        }

        const data = (await upstream.json()) as {
          content?: { type?: string; text?: string }[];
        };
        const content = data.content?.find((block) => block.type === "text")?.text ?? "";

        return new Response(JSON.stringify({ content }), {
          headers: { "Content-Type": "application/json" },
        });
      },
    },
  },
});
