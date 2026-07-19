import { createFileRoute } from "@tanstack/react-router";

type Msg = { role: "user" | "assistant" | "system"; content: string };

const SYSTEM_PROMPT = `Ти — інформаційний помічник про АА (Анонімних Алкоголіків) та програму 12 Кроків. Відповідай українською, коротко і тепло. Даєш тільки загальну інформацію, НЕ ставиш діагнози, НЕ даєш медичних порад. Якщо людина описує кризу, суїцидальні думки або думки про самоушкодження — м'яко направ до довідника груп на цьому сайті або до фахівця (лікаря, психотерапевта, лінії довіри), без порад щодо способів заподіяння шкоди. Не цитуй дослівно захищений авторським правом офіційний текст АА — переказуй сенс власними словами. Тон — спокійний, без осуду, без стигматизації.`;

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const key = process.env.LOVABLE_API_KEY;
        if (!key) return new Response("Missing LOVABLE_API_KEY", { status: 500 });

        let body: { messages?: Msg[] };
        try {
          body = (await request.json()) as { messages?: Msg[] };
        } catch {
          return new Response("Invalid JSON", { status: 400 });
        }
        const messages = Array.isArray(body.messages) ? body.messages : [];

        const upstream = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Lovable-API-Key": key,
          },
          body: JSON.stringify({
            model: "google/gemini-3-flash-preview",
            messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
          }),
        });

        if (!upstream.ok) {
          const text = await upstream.text();
          return new Response(text || "AI error", { status: upstream.status });
        }
        const data = (await upstream.json()) as {
          choices?: { message?: { content?: string } }[];
        };
        const content = data.choices?.[0]?.message?.content ?? "";
        return new Response(JSON.stringify({ content }), {
          headers: { "Content-Type": "application/json" },
        });
      },
    },
  },
});
