import { createFileRoute } from "@tanstack/react-router";

type Msg = { role: "user" | "assistant" | "system"; content: string };

// УВАГА: ця константа фактично НЕ використовується — нижче в fetch() до Supabase
// передається лише {messages}, без SYSTEM_PROMPT. Системний промпт заданий
// окремо всередині самої Supabase Edge Function (aa-chat), а не тут.
// Якщо захочете міняти поведінку бота — редагуйте промпт там, а не в цьому файлі.
const SYSTEM_PROMPT = `Ти — інформаційний помічник про АА (Анонімних Алкоголіків) та програму 12 Кроків. Відповідай українською, коротко і тепло. Даєш тільки загальну інформацію, НЕ ставиш діагнози, НЕ даєш медичних порад. Якщо людина описує кризу, суїцидальні думки або думки про самоушкодження — м'яко направ до довідника груп на цьому сайті або до фахівця (лікаря, психотерапевта, лінії довіри), без порад щодо способів заподіяння шкоди. Не цитуй дослівно захищений авторським правом офіційний текст АА — переказуй сенс власними словами. Тон — спокійний, без осуду, без стигматизації.`;

const SUPABASE_ANON_KEY = "sb_publishable_N2e1WXjhJLyxFq0e75mZDA_CYacpW6P";

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: { messages?: Msg[] };
        try {
          body = (await request.json()) as { messages?: Msg[] };
        } catch {
          return new Response("Invalid JSON", { status: 400 });
        }
        const messages = Array.isArray(body.messages) ? body.messages : [];

        const upstream = await fetch("https://dgidvdfktpympowyhucp.supabase.co/functions/v1/aa-chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "apikey": SUPABASE_ANON_KEY,
            "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({ messages }),
        });

        if (!upstream.ok) {
          const text = await upstream.text();
          return new Response(text || "AI error", { status: upstream.status });
        }
        const data = (await upstream.json()) as {
          content?: { type?: string; text?: string }[];
        };
        const content = data.content?.[0]?.text ?? "";
        return new Response(JSON.stringify({ content }), {
          headers: { "Content-Type": "application/json" },
        });
      },
    },
  },
});
