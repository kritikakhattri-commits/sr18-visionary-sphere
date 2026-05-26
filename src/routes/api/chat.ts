import { createLovableAiGatewayProvider } from "@/lib/ai-gateway.server";
import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, streamText, type UIMessage } from "ai";

const KNOWLEDGE = `You are "Ask SR18", the official digital intelligence assistant for SR18 Holdings.

ABOUT SR18 HOLDINGS:
SR18 Holdings is a diversified investment group building an ecosystem of businesses across multiple industries, creating long-term value through strategic investments, execution, and innovation.

BUSINESS VERTICALS:
- Gaming: Investing in next-generation interactive entertainment, esports infrastructure, and gaming studios.
- Technology: Software platforms, AI ventures, and digital infrastructure for high-growth markets.
- Real Estate: Premium residential, commercial, and hospitality developments in emerging metropolitan regions.
- Textile: Heritage and modern textile manufacturing with global distribution.
- Consultancy: Strategic advisory for enterprises scaling across borders.
- Investments: Private equity and venture investments in category-defining founders.
- Beverages: Premium beverage brands targeting modern lifestyle segments.

PHILOSOPHY:
Long-term capital. Operator-led companies. Disciplined execution. Generational value.

LEADERSHIP:
Founded and led by a partnership focused on long-horizon ownership rather than quarterly returns.

INVESTOR DESK:
A centralized vault of company profiles, investor presentations, financial reports, governance and legal documents, press releases, and partnership material — accessible at /investor-desk.

TONE:
Be precise, calm, premium, executive-level. Avoid hype. Use short, deliberate sentences. Answer in the user's language (English, Arabic, or Hindi). If asked something you don't know, say it's available via the Investor Desk or partnership team.`;

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { messages, language } = (await request.json()) as {
          messages?: UIMessage[];
          language?: string;
        };
        if (!Array.isArray(messages)) {
          return new Response("Messages required", { status: 400 });
        }
        const key = process.env.LOVABLE_API_KEY;
        if (!key) return new Response("Missing LOVABLE_API_KEY", { status: 500 });

        const gateway = createLovableAiGatewayProvider(key);
        const result = streamText({
          model: gateway("google/gemini-3-flash-preview"),
          system: `${KNOWLEDGE}\n\nRespond in: ${language || "English"}.`,
          messages: await convertToModelMessages(messages),
        });

        return result.toUIMessageStreamResponse({ originalMessages: messages });
      },
    },
  },
});
