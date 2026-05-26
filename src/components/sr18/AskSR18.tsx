import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Send, X, Sparkles } from "lucide-react";

type Lang = "English" | "العربية" | "हिन्दी";

const GREETINGS: Record<Lang, string> = {
  English: "Ask anything about SR18 Holdings — our ecosystem, leadership, portfolio, or investor materials.",
  "العربية": "اسأل عن أي شيء يتعلق بـ SR18 Holdings — منظومتنا، قيادتنا، محفظتنا أو وثائق المستثمرين.",
  "हिन्दी": "SR18 Holdings के बारे में कुछ भी पूछें — हमारा इकोसिस्टम, नेतृत्व, पोर्टफोलियो या निवेशक सामग्री।",
};

const SUGGESTIONS: Record<Lang, string[]> = {
  English: ["What is SR18 Holdings?", "Show me the business verticals", "How can I invest?"],
  "العربية": ["ما هي SR18؟", "ما هي قطاعات الأعمال؟", "كيف يمكنني الاستثمار؟"],
  "हिन्दी": ["SR18 क्या है?", "व्यापारिक क्षेत्र क्या हैं?", "मैं कैसे निवेश करूँ?"],
};

export function AskSR18() {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<Lang | null>(null);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
      body: () => ({ language: lang ?? "English" }),
    }),
  });

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, status]);

  const submit = async (text: string) => {
    if (!text.trim()) return;
    setInput("");
    await sendMessage({ text });
  };

  return (
    <>
      {/* Floating launcher */}
      <motion.button
        onClick={() => setOpen(true)}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: open ? 0 : 1, y: open ? 20 : 0 }}
        transition={{ duration: 0.4 }}
        className="fixed bottom-6 right-6 z-50 group flex items-center gap-3 pl-4 pr-5 py-3 rounded-full bg-foreground text-background shadow-2xl hover:shadow-[0_20px_60px_-15px_oklch(0.78_0.085_82_/_0.5)] transition-all"
        aria-label="Open Ask SR18"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inset-0 rounded-full bg-gold animate-ping opacity-75" />
          <span className="relative rounded-full h-2 w-2 bg-gold" />
        </span>
        <span className="text-xs uppercase tracking-[0.25em]">Ask SR18</span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-foreground/40 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.aside
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 right-0 bottom-0 z-50 w-full sm:w-[480px] bg-background border-l border-border flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full gold-gradient flex items-center justify-center">
                    <Sparkles className="h-4 w-4 text-background" />
                  </div>
                  <div>
                    <div className="text-display text-base">Ask SR18</div>
                    <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Corporate Intelligence</div>
                  </div>
                </div>
                <button onClick={() => setOpen(false)} aria-label="Close" className="p-2 hover:bg-mist rounded-full transition-colors">
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Language selection */}
              {!lang ? (
                <div className="flex-1 flex flex-col items-center justify-center px-8 text-center gap-8">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-3">Select Language</p>
                    <h3 className="text-display text-2xl">Choose your preferred language</h3>
                  </div>
                  <div className="grid grid-cols-1 gap-3 w-full max-w-xs">
                    {(["English", "العربية", "हिन्दी"] as Lang[]).map((l) => (
                      <button
                        key={l}
                        onClick={() => setLang(l)}
                        className="px-6 py-4 border border-border hover:border-gold hover:bg-bone transition-all text-left flex items-center justify-between group"
                      >
                        <span className="text-display text-lg">{l}</span>
                        <span className="text-gold opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
                    {messages.length === 0 && (
                      <div className="space-y-6">
                        <p className="text-muted-foreground leading-relaxed">{GREETINGS[lang]}</p>
                        <div className="space-y-2">
                          {SUGGESTIONS[lang].map((s) => (
                            <button
                              key={s}
                              onClick={() => submit(s)}
                              className="block w-full text-left px-4 py-3 text-sm border border-border hover:border-gold hover:bg-bone transition-all"
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                    {messages.map((m) => {
                      const text = m.parts.map((p) => (p.type === "text" ? p.text : "")).join("");
                      if (m.role === "user") {
                        return (
                          <div key={m.id} className="flex justify-end">
                            <div className="max-w-[85%] px-4 py-3 bg-foreground text-background text-sm leading-relaxed">
                              {text}
                            </div>
                          </div>
                        );
                      }
                      return (
                        <div key={m.id} className="text-sm leading-relaxed text-foreground whitespace-pre-wrap">
                          {text || <span className="text-muted-foreground italic">Thinking…</span>}
                        </div>
                      );
                    })}
                    {status === "submitted" && (
                      <div className="flex gap-1.5 items-center text-muted-foreground">
                        <span className="h-1.5 w-1.5 rounded-full bg-gold animate-bounce" />
                        <span className="h-1.5 w-1.5 rounded-full bg-gold animate-bounce [animation-delay:120ms]" />
                        <span className="h-1.5 w-1.5 rounded-full bg-gold animate-bounce [animation-delay:240ms]" />
                      </div>
                    )}
                  </div>
                  <form
                    onSubmit={(e) => { e.preventDefault(); submit(input); }}
                    className="border-t border-border p-4 flex items-end gap-2"
                  >
                    <textarea
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); submit(input); }
                      }}
                      placeholder="Ask anything…"
                      rows={1}
                      className="flex-1 resize-none bg-mist px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-gold transition-all max-h-32"
                    />
                    <button
                      type="submit"
                      disabled={!input.trim() || status === "streaming" || status === "submitted"}
                      className="h-11 w-11 flex items-center justify-center bg-foreground text-background disabled:opacity-40 hover:bg-gold hover:text-foreground transition-colors"
                      aria-label="Send"
                    >
                      <Send className="h-4 w-4" />
                    </button>
                  </form>
                </>
              )}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
