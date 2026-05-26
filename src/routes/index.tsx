import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useInView } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { EcosystemCore, SR18_VERTICALS } from "@/components/sr18/EcosystemCore";
import { ArrowRight, ArrowUpRight, Plus } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Home,
});

const EASE = [0.22, 1, 0.36, 1] as const;

function Reveal({ children, delay = 0, y = 30 }: { children: React.ReactNode; delay?: number; y?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ n, label }: { n: string; label: string }) {
  return (
    <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.35em] text-muted-foreground mb-12">
      <span className="text-gold">{n}</span>
      <span className="h-px w-12 bg-border" />
      <span>{label}</span>
    </div>
  );
}

function Counter({ to, suffix = "", duration = 2 }: { to: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / (duration * 1000));
      const eased = 1 - Math.pow(1 - p, 3);
      setV(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);
  return <span ref={ref}>{v.toLocaleString()}{suffix}</span>;
}

// ─────────────────────────────────────────────────────────
// 1 — HERO
// ─────────────────────────────────────────────────────────
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24">
      {/* Background ecosystem */}
      <motion.div
        style={{ y, opacity, scale }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <div className="opacity-40 md:opacity-60">
          <EcosystemCore size={720} showLabels={false} />
        </div>
      </motion.div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE }}
          className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground mb-8"
        >
          SR18 Holdings · Diversified Investment Group
        </motion.div>

        <h1 className="text-display text-[clamp(2.75rem,8vw,7rem)] leading-[0.95] max-w-5xl mx-auto">
          {["Building", "tomorrow's", "businesses"].map((w, i) => (
            <motion.span
              key={i}
              className="inline-block mr-[0.25em]"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: EASE, delay: 0.2 + i * 0.12 }}
            >{w}</motion.span>
          ))}
          <br />
          <motion.span
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.6 }}
            className="text-display italic text-gold-gradient"
          >
            today.
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-10 text-base md:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed"
        >
          An ecosystem of companies across seven industries — engineered for compounding, long-horizon value.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.2 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a href="#portfolio" className="group inline-flex items-center gap-3 px-7 py-4 bg-foreground text-background text-xs uppercase tracking-[0.25em] hover:bg-gold hover:text-foreground transition-all">
            Explore Portfolio
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <Link to="/investor-desk" className="group inline-flex items-center gap-3 px-7 py-4 border border-foreground/80 text-xs uppercase tracking-[0.25em] hover:bg-foreground hover:text-background transition-all">
            Investor Desk
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-10 inset-x-0 flex justify-center"
      >
        <div className="flex flex-col items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          Scroll to discover
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="h-8 w-px bg-gradient-to-b from-foreground/40 to-transparent"
          />
        </div>
      </motion.div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────
// 2 — WHO WE ARE
// ─────────────────────────────────────────────────────────
function WhoWeAre() {
  return (
    <section id="who" className="relative py-40 px-6">
      <div className="mx-auto max-w-6xl">
        <Reveal><SectionLabel n="01" label="Who we are" /></Reveal>
        <div className="grid md:grid-cols-12 gap-12">
          <div className="md:col-span-7">
            <Reveal>
              <h2 className="text-display text-[clamp(2rem,5vw,4.5rem)] leading-[1.05]">
                We invest in companies that <span className="text-display italic text-gold-gradient">outlast cycles</span> — not chase them.
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-5 md:pt-4">
            <Reveal delay={0.15}>
              <p className="text-lg leading-relaxed text-muted-foreground">
                SR18 Holdings is a privately-held investment group operating across seven industries. We build, acquire, and scale businesses with disciplined capital and long-horizon ownership.
              </p>
              <div className="mt-10 space-y-4 text-sm">
                {[
                  ["Mission", "Compound enduring value across generations."],
                  ["Philosophy", "Patient capital. Operator-led companies."],
                  ["Horizon", "Decades, not quarters."],
                ].map(([k, v]) => (
                  <div key={k} className="flex gap-6 border-t border-border pt-4">
                    <span className="w-24 text-[10px] uppercase tracking-[0.25em] text-gold">{k}</span>
                    <span className="flex-1 text-foreground">{v}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────
// 3 — THE ECOSYSTEM
// ─────────────────────────────────────────────────────────
const ECOSYSTEM_DATA = [
  { name: "Gaming", focus: "Studios, esports & interactive entertainment", opportunity: "$300B+ global market", vision: "Backing the next generation of category-defining studios." },
  { name: "Technology", focus: "AI ventures, SaaS & digital infrastructure", opportunity: "Compounding software economies", vision: "Investing where intelligence becomes infrastructure." },
  { name: "Real Estate", focus: "Premium residential, hospitality & mixed-use", opportunity: "High-growth metropolitan corridors", vision: "Architecture that appreciates with time." },
  { name: "Textile", focus: "Heritage manufacturing & modern brands", opportunity: "Global supply chain integration", vision: "Craft, scaled with precision." },
  { name: "Consultancy", focus: "Cross-border strategy & execution advisory", opportunity: "Enterprises scaling globally", vision: "The operator's advisor." },
  { name: "Investments", focus: "Private equity & venture capital", opportunity: "Category-defining founders", vision: "Capital with conviction." },
  { name: "Beverages", focus: "Premium lifestyle beverage brands", opportunity: "Modern consumer segments", vision: "Taste, designed deliberately." },
];

function Ecosystem() {
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });

  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      const idx = Math.min(ECOSYSTEM_DATA.length - 1, Math.floor(v * ECOSYSTEM_DATA.length));
      setActive(idx);
    });
  }, [scrollYProgress]);

  return (
    <section id="ecosystem" ref={sectionRef} className="relative bg-bone" style={{ height: `${ECOSYSTEM_DATA.length * 90}vh` }}>
      <div className="sticky top-0 h-screen flex flex-col px-6 overflow-hidden">
        <div className="mx-auto max-w-7xl w-full pt-32">
          <SectionLabel n="02" label="The SR18 Ecosystem" />
        </div>
        <div className="flex-1 mx-auto max-w-7xl w-full grid md:grid-cols-2 gap-12 items-center">
          {/* Left: visual */}
          <div className="flex justify-center">
            <EcosystemCore size={520} highlight={ECOSYSTEM_DATA[active]?.name} />
          </div>
          {/* Right: content */}
          <div className="relative h-[420px]">
            {ECOSYSTEM_DATA.map((v, i) => (
              <motion.div
                key={v.name}
                className="absolute inset-0"
                initial={false}
                animate={{
                  opacity: active === i ? 1 : 0,
                  y: active === i ? 0 : 30,
                  pointerEvents: active === i ? "auto" : "none",
                }}
                transition={{ duration: 0.7, ease: EASE }}
              >
                <div className="text-[10px] uppercase tracking-[0.35em] text-gold mb-4">
                  Vertical · {String(i + 1).padStart(2, "0")} / {String(ECOSYSTEM_DATA.length).padStart(2, "0")}
                </div>
                <h3 className="text-display text-[clamp(2.5rem,5vw,5rem)] leading-none mb-8">{v.name}</h3>
                <div className="space-y-5 max-w-md">
                  {[
                    ["Focus", v.focus],
                    ["Opportunity", v.opportunity],
                    ["Vision", v.vision],
                  ].map(([k, val]) => (
                    <div key={k} className="border-t border-border pt-3 flex gap-6">
                      <span className="w-20 text-[10px] uppercase tracking-[0.25em] text-muted-foreground pt-0.5">{k}</span>
                      <span className="flex-1 text-foreground">{val}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        {/* Progress bar */}
        <div className="mx-auto max-w-7xl w-full pb-10">
          <div className="flex gap-1">
            {ECOSYSTEM_DATA.map((_, i) => (
              <div key={i} className="flex-1 h-px bg-border overflow-hidden">
                <motion.div
                  className="h-full bg-gold origin-left"
                  animate={{ scaleX: i < active ? 1 : i === active ? 0.5 : 0 }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────
// 4 — PORTFOLIO
// ─────────────────────────────────────────────────────────
const PORTFOLIO = [
  { code: "P/01", name: "Vanta Studios", sector: "Gaming", growth: "+148% YoY", future: "Next-gen narrative IP — multi-platform launch 2026.", tone: "from-stone-900 to-stone-700" },
  { code: "P/02", name: "Meridian Realty", sector: "Real Estate", growth: "$420M AUM", future: "Three new vertical mixed-use towers underway.", tone: "from-amber-900/80 to-stone-800" },
  { code: "P/03", name: "Aldwyn Labs", sector: "Technology", growth: "+220% ARR", future: "AI infrastructure platform — enterprise rollout.", tone: "from-zinc-900 to-zinc-700" },
  { code: "P/04", name: "Casa Vellora", sector: "Beverages", growth: "12 new markets", future: "Premium beverage line expanding across MENA.", tone: "from-stone-800 to-amber-900/70" },
  { code: "P/05", name: "Atelier Soren", sector: "Textile", growth: "Heritage label", future: "Limited-run collections, global distribution.", tone: "from-neutral-900 to-neutral-700" },
  { code: "P/06", name: "Kestrel Advisory", sector: "Consultancy", growth: "60+ engagements", future: "Cross-border M&A and growth strategy.", tone: "from-slate-900 to-slate-700" },
];

function Portfolio() {
  return (
    <section id="portfolio" className="relative py-40 px-6">
      <div className="mx-auto max-w-7xl">
        <Reveal><SectionLabel n="03" label="Portfolio" /></Reveal>
        <div className="flex items-end justify-between mb-16">
          <Reveal>
            <h2 className="text-display text-[clamp(2rem,5vw,4.5rem)] leading-[1.02] max-w-3xl">
              Companies engineered for the <span className="italic text-gold-gradient">long arc</span>.
            </h2>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-2 gap-px bg-border">
          {PORTFOLIO.map((p, i) => (
            <Reveal key={p.code} delay={i * 0.05}>
              <motion.article
                whileHover="hover"
                className="group relative bg-background aspect-[5/4] overflow-hidden cursor-pointer"
              >
                <motion.div
                  variants={{ hover: { scale: 1.08 } }}
                  transition={{ duration: 1.2, ease: EASE }}
                  className={`absolute inset-0 bg-gradient-to-br ${p.tone}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                <div className="absolute inset-0 p-8 flex flex-col justify-between text-background">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-[0.3em] opacity-80">{p.code}</span>
                    <motion.span variants={{ hover: { rotate: 45 } }} transition={{ duration: 0.5 }}>
                      <Plus className="h-5 w-5" />
                    </motion.span>
                  </div>

                  <div>
                    <div className="text-[10px] uppercase tracking-[0.3em] text-gold mb-3">{p.sector}</div>
                    <h3 className="text-display text-4xl md:text-5xl leading-none">{p.name}</h3>
                    <motion.div
                      variants={{ hover: { opacity: 1, height: "auto", marginTop: 16 } }}
                      initial={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.5, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <p className="text-sm opacity-90 max-w-md leading-relaxed">{p.future}</p>
                    </motion.div>
                    <div className="mt-4 text-sm font-medium tracking-wider">{p.growth}</div>
                  </div>
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────
// 5 — GROWTH DASHBOARD
// ─────────────────────────────────────────────────────────
function GrowthDashboard() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  return (
    <section className="relative py-40 px-6 bg-foreground text-background overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.35em] text-background/60 mb-12">
            <span className="text-gold">04</span>
            <span className="h-px w-12 bg-background/30" />
            <span>Growth Dashboard</span>
          </div>
        </Reveal>
        <Reveal>
          <h2 className="text-display text-[clamp(2rem,5vw,4.5rem)] leading-[1.02] max-w-3xl mb-20">
            Capital deployed with <span className="italic text-gold-gradient">precision</span>.
          </h2>
        </Reveal>

        {/* Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-background/15 mb-20">
          {[
            { v: 7, label: "Industries", suf: "" },
            { v: 24, label: "Portfolio companies", suf: "" },
            { v: 420, label: "Assets deployed", suf: "M+" },
            { v: 148, label: "Avg growth YoY", suf: "%" },
          ].map((m) => (
            <div key={m.label} className="bg-foreground p-8">
              <div className="text-display text-5xl md:text-6xl text-gold-gradient">
                <Counter to={m.v} suffix={m.suf} />
              </div>
              <div className="mt-3 text-[10px] uppercase tracking-[0.3em] text-background/60">{m.label}</div>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div ref={ref} className="grid md:grid-cols-3 gap-12">
          <div className="md:col-span-2 border border-background/15 p-8">
            <div className="flex items-baseline justify-between mb-8">
              <div>
                <div className="text-[10px] uppercase tracking-[0.3em] text-background/60">Portfolio Value Growth</div>
                <div className="text-display text-3xl mt-2">2019 — 2026</div>
              </div>
              <div className="text-gold text-display text-2xl">+340%</div>
            </div>
            <svg viewBox="0 0 600 220" className="w-full h-56">
              <defs>
                <linearGradient id="area" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.78 0.085 82)" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="oklch(0.78 0.085 82)" stopOpacity="0" />
                </linearGradient>
              </defs>
              {/* grid */}
              {[0, 1, 2, 3].map((i) => (
                <line key={i} x1="0" y1={40 + i * 50} x2="600" y2={40 + i * 50} stroke="oklch(1 0 0 / 0.06)" />
              ))}
              <motion.path
                d="M0,200 L85,180 L170,150 L255,140 L340,110 L425,75 L510,55 L600,20 L600,220 L0,220 Z"
                fill="url(#area)"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 1.5, delay: 0.6 }}
              />
              <motion.path
                d="M0,200 L85,180 L170,150 L255,140 L340,110 L425,75 L510,55 L600,20"
                fill="none"
                stroke="oklch(0.85 0.07 85)"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={inView ? { pathLength: 1 } : {}}
                transition={{ duration: 2.5, ease: EASE }}
              />
              {[0, 85, 170, 255, 340, 425, 510, 600].map((x, i) => {
                const ys = [200, 180, 150, 140, 110, 75, 55, 20];
                return (
                  <motion.circle key={x} cx={x} cy={ys[i]} r="3" fill="oklch(0.85 0.07 85)"
                    initial={{ scale: 0 }}
                    animate={inView ? { scale: 1 } : {}}
                    transition={{ delay: 0.5 + i * 0.25, duration: 0.4 }}
                  />
                );
              })}
            </svg>
            <div className="flex justify-between text-[10px] uppercase tracking-[0.25em] text-background/50 mt-4">
              {["'19","'20","'21","'22","'23","'24","'25","'26"].map((y) => <span key={y}>{y}</span>)}
            </div>
          </div>

          {/* Sector distribution */}
          <div className="border border-background/15 p-8">
            <div className="text-[10px] uppercase tracking-[0.3em] text-background/60 mb-8">Capital Allocation</div>
            <div className="space-y-5">
              {[
                ["Technology", 28],
                ["Real Estate", 22],
                ["Gaming", 18],
                ["Investments", 14],
                ["Beverages", 8],
                ["Textile", 6],
                ["Consultancy", 4],
              ].map(([label, pct], i) => (
                <div key={label as string}>
                  <div className="flex justify-between text-xs mb-2">
                    <span className="text-background/80">{label}</span>
                    <span className="text-gold">{pct}%</span>
                  </div>
                  <div className="h-px bg-background/15 overflow-hidden">
                    <motion.div
                      className="h-full bg-gold origin-left"
                      style={{ height: 2 }}
                      initial={{ scaleX: 0 }}
                      animate={inView ? { scaleX: (pct as number) / 30 } : {}}
                      transition={{ duration: 1.2, delay: 0.3 + i * 0.08, ease: EASE }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────
// 6 — FOUNDERS
// ─────────────────────────────────────────────────────────
const FOUNDERS = [
  {
    name: "Suhail R.",
    role: "Founding Partner & Chairman",
    bio: "Architect of the SR18 thesis. Two decades building operator-led businesses across emerging markets.",
    philosophy: "Conviction outlasts consensus.",
    milestones: [
      ["2008", "First venture — manufacturing & textiles."],
      ["2014", "Cross-border investment platform launch."],
      ["2019", "SR18 Holdings established."],
      ["2024", "Ecosystem expands to seven verticals."],
    ],
  },
  {
    name: "Rayan M.",
    role: "Founding Partner & CEO",
    bio: "Operator-investor. Leads capital allocation, portfolio strategy, and the firm's expansion agenda.",
    philosophy: "Execution is the only true compounding.",
    milestones: [
      ["2011", "Early-stage venture investing."],
      ["2017", "Built tech & gaming investment desk."],
      ["2020", "Joined SR18 as Founding Partner."],
      ["2025", "Leads global expansion strategy."],
    ],
  },
];

function Founders() {
  return (
    <section id="founders" className="relative py-40 px-6">
      <div className="mx-auto max-w-7xl">
        <Reveal><SectionLabel n="05" label="The Founders" /></Reveal>
        <Reveal>
          <h2 className="text-display text-[clamp(2rem,5vw,4.5rem)] leading-[1.02] max-w-3xl mb-24">
            Two partners. <span className="italic text-gold-gradient">One conviction.</span>
          </h2>
        </Reveal>

        <div className="space-y-40">
          {FOUNDERS.map((f, i) => (
            <Reveal key={f.name}>
              <div className={`grid md:grid-cols-12 gap-12 items-start ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
                {/* Portrait */}
                <div className="md:col-span-5">
                  <div className="aspect-[4/5] relative overflow-hidden bg-gradient-to-br from-stone-200 to-stone-400">
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900/30 to-transparent" />
                    <div className="absolute bottom-0 inset-x-0 p-8 text-background">
                      <div className="text-display text-7xl text-gold-gradient leading-none">
                        {f.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                    </div>
                    <div className="absolute top-6 right-6 text-[10px] uppercase tracking-[0.3em] text-background/80">
                      0{i + 1} / 02
                    </div>
                  </div>
                </div>
                <div className="md:col-span-7 md:pl-8">
                  <div className="text-[10px] uppercase tracking-[0.3em] text-gold mb-3">{f.role}</div>
                  <h3 className="text-display text-5xl mb-6">{f.name}</h3>
                  <p className="text-lg leading-relaxed text-muted-foreground mb-8 max-w-xl">{f.bio}</p>
                  <blockquote className="text-display italic text-2xl border-l-2 border-gold pl-6 mb-12 text-foreground">
                    "{f.philosophy}"
                  </blockquote>
                  <div className="space-y-4">
                    {f.milestones.map(([y, m]) => (
                      <div key={y} className="flex gap-8 border-t border-border pt-4">
                        <span className="text-display text-gold text-xl w-20">{y}</span>
                        <span className="flex-1 text-foreground pt-1">{m}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────
// 7 — LEADERSHIP
// ─────────────────────────────────────────────────────────
const LEADERS = [
  ["Amara K.", "Chief Investment Officer", "Capital strategy & portfolio construction"],
  ["Idris N.", "Chief Operating Officer", "Cross-vertical execution & infrastructure"],
  ["Lina F.", "Head of Technology", "AI ventures & digital platforms"],
  ["Omar S.", "Head of Real Estate", "Acquisitions & development"],
  ["Naya R.", "Head of Investor Relations", "Capital partners & disclosures"],
  ["Ravi P.", "Head of Strategy", "Long-horizon planning & M&A"],
];

function Leadership() {
  return (
    <section id="leadership" className="relative py-40 px-6 bg-bone">
      <div className="mx-auto max-w-7xl">
        <Reveal><SectionLabel n="06" label="Leadership" /></Reveal>
        <Reveal>
          <h2 className="text-display text-[clamp(2rem,5vw,4.5rem)] leading-[1.02] max-w-3xl mb-20">
            The team behind the <span className="italic text-gold-gradient">ecosystem.</span>
          </h2>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
          {LEADERS.map((l, i) => (
            <Reveal key={l[0]} delay={i * 0.05}>
              <motion.div
                whileHover="hover"
                className="bg-bone p-10 aspect-[4/5] flex flex-col justify-between group cursor-pointer"
              >
                <div className="text-[10px] uppercase tracking-[0.3em] text-gold">0{i + 1}</div>
                <div>
                  <motion.div
                    variants={{ hover: { y: -8 } }}
                    transition={{ duration: 0.5, ease: EASE }}
                  >
                    <h3 className="text-display text-3xl leading-tight">{l[0]}</h3>
                    <div className="text-sm text-muted-foreground mt-2">{l[1]}</div>
                  </motion.div>
                  <motion.p
                    variants={{ hover: { opacity: 1, height: "auto", marginTop: 16 } }}
                    initial={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.5, ease: EASE }}
                    className="text-sm text-foreground overflow-hidden"
                  >
                    {l[2]}
                  </motion.p>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────
// 8 — ROADMAP
// ─────────────────────────────────────────────────────────
const ROADMAP = [
  ["2025", "Foundation", "Consolidate seven-vertical ecosystem. Strengthen portfolio operations."],
  ["2026", "Expansion", "Enter two new geographies. Launch AI ventures fund."],
  ["2027", "Acceleration", "Public-facing brands across beverages and gaming."],
  ["2028", "Globalisation", "Cross-border platforms operating at scale across MENA, South Asia, Europe."],
  ["2030", "Compounding", "Targeted $2B+ in assets under management. Multi-generational governance."],
];

function Roadmap() {
  return (
    <section className="relative py-40 px-6">
      <div className="mx-auto max-w-7xl">
        <Reveal><SectionLabel n="07" label="Future Roadmap" /></Reveal>
        <Reveal>
          <h2 className="text-display text-[clamp(2rem,5vw,4.5rem)] leading-[1.02] max-w-3xl mb-20">
            The next <span className="italic text-gold-gradient">decade</span>.
          </h2>
        </Reveal>

        <div className="relative">
          <div className="absolute left-0 right-0 top-12 h-px bg-border hidden md:block" />
          <div className="grid md:grid-cols-5 gap-12 md:gap-4">
            {ROADMAP.map(([year, title, desc], i) => (
              <Reveal key={year} delay={i * 0.08}>
                <div className="relative md:pt-0">
                  <div className="hidden md:block absolute -top-1 left-0 h-3 w-3 rounded-full bg-gold ring-4 ring-background" />
                  <div className="text-display text-gold-gradient text-4xl md:text-5xl mb-3 md:mt-20">{year}</div>
                  <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-3">{title}</div>
                  <p className="text-sm leading-relaxed text-foreground">{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────
// 9 — INVESTOR PREVIEW
// ─────────────────────────────────────────────────────────
function InvestorPreview() {
  return (
    <section className="relative py-40 px-6 bg-bone overflow-hidden">
      <div className="mx-auto max-w-7xl grid md:grid-cols-12 gap-12 items-center">
        <div className="md:col-span-7">
          <Reveal><SectionLabel n="08" label="Investor Desk" /></Reveal>
          <Reveal>
            <h2 className="text-display text-[clamp(2rem,5vw,4.5rem)] leading-[1.02]">
              The <span className="italic text-gold-gradient">knowledge vault</span> for our capital partners.
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-8 text-lg text-muted-foreground max-w-xl leading-relaxed">
              Company profiles, investor presentations, financial reports, governance, and partnership materials — curated in one premium repository.
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <Link to="/investor-desk" className="mt-10 inline-flex items-center gap-3 px-7 py-4 bg-foreground text-background text-xs uppercase tracking-[0.25em] hover:bg-gold hover:text-foreground transition-all group">
              Enter the Investor Desk
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
        <div className="md:col-span-5">
          <Reveal delay={0.2}>
            <div className="relative aspect-[4/5] bg-background border border-border p-8 shadow-2xl">
              <div className="text-[10px] uppercase tracking-[0.3em] text-gold mb-6">Confidential · Investor Desk</div>
              <div className="space-y-3">
                {[
                  "Company Profile · 2026",
                  "Investor Presentation",
                  "Portfolio Report Q3",
                  "Financial Statements",
                  "Governance Charter",
                  "Pitch Deck — Gaming",
                  "Press Release Archive",
                ].map((d, i) => (
                  <motion.div
                    key={d}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.5 }}
                    className="flex items-center justify-between py-3 border-b border-border text-sm"
                  >
                    <span>{d}</span>
                    <ArrowUpRight className="h-3 w-3 text-muted-foreground" />
                  </motion.div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────
// 10 — PARTNERSHIP CTA
// ─────────────────────────────────────────────────────────
function PartnershipCTA() {
  return (
    <section className="relative py-40 px-6 bg-foreground text-background overflow-hidden">
      <div className="absolute inset-0 opacity-30 flex items-center justify-center pointer-events-none">
        <EcosystemCore size={900} showLabels={false} />
      </div>
      <div className="relative mx-auto max-w-5xl text-center">
        <Reveal>
          <div className="text-[10px] uppercase tracking-[0.4em] text-background/60 mb-8">09 · Partnership</div>
        </Reveal>
        <Reveal>
          <h2 className="text-display text-[clamp(2.5rem,7vw,6rem)] leading-[0.95]">
            Build with us. <br /><span className="italic text-gold-gradient">For decades.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-10 text-lg text-background/70 max-w-2xl mx-auto">
            Investors. Strategic partners. Distributors. Operators. Venture opportunities. The door is open to those who think in decades.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="mailto:partners@sr18.holdings" className="inline-flex items-center gap-3 px-8 py-4 bg-gold text-foreground text-xs uppercase tracking-[0.25em] hover:bg-background hover:text-foreground transition-all">
              Initiate Conversation <ArrowRight className="h-4 w-4" />
            </a>
            <Link to="/investor-desk" className="inline-flex items-center gap-3 px-8 py-4 border border-background/40 text-xs uppercase tracking-[0.25em] hover:bg-background hover:text-foreground transition-all">
              Investor Materials
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────
// 12 — FOOTER
// ─────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="relative bg-background px-6 pt-24 pb-10 border-t border-border">
      <div className="mx-auto max-w-7xl">
        <div className="grid md:grid-cols-12 gap-12 mb-20">
          <div className="md:col-span-5">
            <Link to="/" className="flex items-center gap-2 mb-8">
              <span className="text-display text-3xl">SR<span className="text-gold-gradient">18</span></span>
              <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground border-l border-border pl-3 ml-1">Holdings</span>
            </Link>
            <p className="text-muted-foreground max-w-md leading-relaxed">
              A diversified investment group building enduring businesses across seven industries.
            </p>
          </div>
          {[
            ["Ecosystem", ["Gaming", "Technology", "Real Estate", "Textile", "Beverages"]],
            ["Company", ["About", "Leadership", "Portfolio", "Roadmap"]],
            ["Investors", ["Investor Desk", "Reports", "Governance", "Contact"]],
          ].map(([title, items]) => (
            <div key={title as string} className="md:col-span-2">
              <div className="text-[10px] uppercase tracking-[0.3em] text-gold mb-5">{title}</div>
              <ul className="space-y-3 text-sm">
                {(items as string[]).map((it) => (
                  <li key={it}><a href="#" className="text-foreground hover:text-gold transition-colors">{it}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="hairline" />
        <div className="pt-8 flex flex-col md:flex-row justify-between gap-4 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          <div>© {new Date().getFullYear()} SR18 Holdings. All rights reserved.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Terms</a>
            <a href="#" className="hover:text-foreground">LinkedIn</a>
          </div>
        </div>

        <div className="mt-20 text-[18vw] md:text-[14vw] text-display leading-none text-mist text-center select-none -mb-8">
          SR18
        </div>
      </div>
    </footer>
  );
}

function Home() {
  return (
    <main className="overflow-hidden">
      <Hero />
      <WhoWeAre />
      <Ecosystem />
      <Portfolio />
      <GrowthDashboard />
      <Founders />
      <Leadership />
      <Roadmap />
      <InvestorPreview />
      <PartnershipCTA />
      <Footer />
    </main>
  );
}

// Silence unused import warning if SR18_VERTICALS not used elsewhere
void SR18_VERTICALS;
