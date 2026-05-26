import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "glass py-3" : "py-6"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="text-display text-xl tracking-tight">SR<span className="text-gold-gradient">18</span></span>
          <span className="hidden sm:block text-[10px] uppercase tracking-[0.3em] text-muted-foreground border-l border-border pl-2 ml-1">Holdings</span>
        </Link>
        <nav className="hidden md:flex items-center gap-10 text-xs uppercase tracking-[0.25em] text-muted-foreground">
          <a href="/#ecosystem" className="hover:text-foreground transition-colors">Ecosystem</a>
          <a href="/#portfolio" className="hover:text-foreground transition-colors">Portfolio</a>
          <a href="/#leadership" className="hover:text-foreground transition-colors">Leadership</a>
          <Link to="/investor-desk" className="hover:text-foreground transition-colors">Investor Desk</Link>
        </nav>
        <Link
          to="/investor-desk"
          className="text-xs uppercase tracking-[0.25em] px-4 py-2 border border-foreground/80 text-foreground hover:bg-foreground hover:text-background transition-all"
        >
          Connect
        </Link>
      </div>
    </header>
  );
}
