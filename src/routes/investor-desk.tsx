import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useMemo, useState } from "react";
import { ArrowLeft, Search, Download, FileText, Calendar, Filter } from "lucide-react";

export const Route = createFileRoute("/investor-desk")({
  component: InvestorDesk,
  head: () => ({
    meta: [
      { title: "Investor Desk — SR18 Holdings" },
      { name: "description", content: "Investor relations vault. Company profile, presentations, financial reports, governance, and partnership materials." },
    ],
  }),
});

type Doc = {
  id: string;
  title: string;
  category: string;
  date: string;
  size: string;
  type: "PDF" | "DECK" | "DOC";
};

const DOCS: Doc[] = [
  { id: "1", title: "SR18 Holdings — Company Profile 2026", category: "Company Profile", date: "2026-01-12", size: "8.4 MB", type: "PDF" },
  { id: "2", title: "Investor Presentation — H2 2025", category: "Investor Presentation", date: "2025-12-04", size: "12.1 MB", type: "DECK" },
  { id: "3", title: "Pitch Deck — Gaming Vertical", category: "Pitch Decks", date: "2025-11-18", size: "9.7 MB", type: "DECK" },
  { id: "4", title: "Pitch Deck — Technology Fund I", category: "Pitch Decks", date: "2025-10-22", size: "11.3 MB", type: "DECK" },
  { id: "5", title: "Audited Financial Statements 2024", category: "Financial Reports", date: "2025-03-30", size: "5.2 MB", type: "PDF" },
  { id: "6", title: "Quarterly Portfolio Report — Q3 2025", category: "Portfolio Reports", date: "2025-10-15", size: "4.8 MB", type: "PDF" },
  { id: "7", title: "Portfolio Snapshot — Q4 2025", category: "Portfolio Reports", date: "2026-01-05", size: "3.6 MB", type: "PDF" },
  { id: "8", title: "Governance Charter & Board Composition", category: "Governance", date: "2025-06-20", size: "1.9 MB", type: "DOC" },
  { id: "9", title: "Code of Conduct", category: "Governance", date: "2025-02-11", size: "1.1 MB", type: "DOC" },
  { id: "10", title: "Corporate Structure Memorandum", category: "Legal", date: "2025-04-09", size: "2.4 MB", type: "DOC" },
  { id: "11", title: "Press Release — Real Estate Expansion", category: "Press Releases", date: "2025-09-14", size: "0.6 MB", type: "PDF" },
  { id: "12", title: "Announcement — Aldwyn Labs Series A", category: "Announcements", date: "2025-08-02", size: "0.8 MB", type: "PDF" },
  { id: "13", title: "Partnership Brief — Distribution Network", category: "Partnership Material", date: "2025-07-25", size: "3.1 MB", type: "PDF" },
  { id: "14", title: "Strategic Partner Onboarding Kit", category: "Partnership Material", date: "2025-05-19", size: "6.7 MB", type: "DECK" },
];

const CATEGORIES = [
  "All",
  "Company Profile",
  "Investor Presentation",
  "Pitch Decks",
  "Financial Reports",
  "Portfolio Reports",
  "Governance",
  "Legal",
  "Press Releases",
  "Announcements",
  "Partnership Material",
];

function InvestorDesk() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState<"newest" | "oldest" | "title">("newest");
  const [selected, setSelected] = useState<Doc | null>(null);

  const filtered = useMemo(() => {
    let r = DOCS.filter((d) =>
      (category === "All" || d.category === category) &&
      d.title.toLowerCase().includes(query.toLowerCase())
    );
    r.sort((a, b) => {
      if (sort === "title") return a.title.localeCompare(b.title);
      if (sort === "oldest") return a.date.localeCompare(b.date);
      return b.date.localeCompare(a.date);
    });
    return r;
  }, [query, category, sort]);

  return (
    <main className="min-h-screen bg-bone pt-32 pb-24 px-6">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <Link to="/" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground hover:text-foreground transition-colors mb-10">
            <ArrowLeft className="h-3 w-3" /> Back to SR18
          </Link>
          <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.35em] text-muted-foreground mb-8">
            <span className="text-gold">Investor Desk</span>
            <span className="h-px w-12 bg-border" />
            <span>Confidential Knowledge Vault</span>
          </div>
          <h1 className="text-display text-[clamp(2.5rem,6vw,5rem)] leading-[1] max-w-4xl">
            Documents, disclosures, and <span className="italic text-gold-gradient">diligence</span>.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
            A curated archive for capital partners and prospective investors.
          </p>
        </motion.div>

        {/* Toolbar */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-background border border-border p-6 mb-8 flex flex-col lg:flex-row gap-4 items-stretch lg:items-center"
        >
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search documents…"
              className="w-full pl-11 pr-4 py-3 bg-mist text-sm outline-none focus:ring-1 focus:ring-gold"
            />
          </div>
          <div className="flex items-center gap-2 text-xs">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as typeof sort)}
              className="bg-mist px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-gold uppercase tracking-wider"
            >
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
              <option value="title">Title A–Z</option>
            </select>
          </div>
        </motion.div>

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-4 py-2 text-[10px] uppercase tracking-[0.25em] border transition-all ${
                category === c
                  ? "bg-foreground text-background border-foreground"
                  : "border-border hover:border-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </motion.div>

        {/* Document grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
          {filtered.map((d, i) => (
            <motion.button
              key={d.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.04 }}
              onClick={() => setSelected(d)}
              className="bg-background p-7 text-left group hover:bg-background hover:shadow-xl transition-all"
            >
              <div className="flex items-start justify-between mb-8">
                <div className="h-12 w-12 bg-mist flex items-center justify-center group-hover:bg-gold transition-colors">
                  <FileText className="h-5 w-5 text-foreground" />
                </div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-gold">{d.type}</span>
              </div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-2">{d.category}</div>
              <h3 className="text-display text-xl leading-tight mb-6">{d.title}</h3>
              <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.25em] text-muted-foreground border-t border-border pt-4">
                <span className="flex items-center gap-2"><Calendar className="h-3 w-3" />{d.date}</span>
                <span>{d.size}</span>
              </div>
            </motion.button>
          ))}
          {filtered.length === 0 && (
            <div className="bg-background p-16 text-center md:col-span-2 lg:col-span-3 text-muted-foreground">
              No documents match your filters.
            </div>
          )}
        </div>
      </div>

      {/* Document preview modal */}
      {selected && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 bg-foreground/60 backdrop-blur-md p-6 flex items-center justify-center"
          onClick={() => setSelected(null)}
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-background w-full max-w-3xl max-h-[85vh] overflow-auto"
          >
            <div className="p-8 border-b border-border flex items-start justify-between gap-6">
              <div>
                <div className="text-[10px] uppercase tracking-[0.3em] text-gold mb-2">{selected.category}</div>
                <h2 className="text-display text-3xl">{selected.title}</h2>
                <div className="mt-3 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                  {selected.date} · {selected.size} · {selected.type}
                </div>
              </div>
              <button onClick={() => setSelected(null)} className="text-2xl text-muted-foreground hover:text-foreground">×</button>
            </div>
            <div className="p-8">
              <div className="aspect-[4/3] bg-mist flex flex-col items-center justify-center gap-4 mb-6">
                <FileText className="h-16 w-16 text-muted-foreground" />
                <div className="text-sm text-muted-foreground">Preview unavailable — request access to download</div>
              </div>
              <button className="w-full flex items-center justify-center gap-3 bg-foreground text-background py-4 text-xs uppercase tracking-[0.25em] hover:bg-gold hover:text-foreground transition-colors">
                <Download className="h-4 w-4" /> Request Document Access
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </main>
  );
}
