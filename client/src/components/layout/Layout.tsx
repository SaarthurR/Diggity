import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { History, Scan, Globe, BookOpen, Menu, X, ScrollText, Map, Camera } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Mission", icon: Globe },
    { href: "/analyze", label: "Analyze", icon: Scan },
    { href: "/decoder", label: "Decoder", icon: History },
    { href: "/civilizations", label: "Civilizations", icon: Map },
    { href: "/story", label: "Story Mode", icon: ScrollText },
    { href: "/impact", label: "Impact", icon: BookOpen },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground overflow-hidden relative selection:bg-primary/30">
      {/* Background Grid Effect */}
      <div className="fixed inset-0 hologram-grid opacity-20 pointer-events-none z-0" />
      
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/">
            <a className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center border border-primary/50 group-hover:bg-primary/30 transition-colors shadow-[0_0_15px_rgba(0,255,255,0.3)]">
                <Scan className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h1 className="font-display font-bold text-xl tracking-wider text-foreground leading-none">
                  DIGGITY
                </h1>
                <p className="font-mono text-[10px] text-primary tracking-widest uppercase">
                  Digital Archaeologist
                </p>
              </div>
            </a>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location === item.href;
              return (
                <Link key={item.href} href={item.href}>
                  <a
                    className={cn(
                      "flex items-center gap-2 px-3 py-2 rounded-md font-mono text-xs transition-all duration-300",
                      isActive
                        ? "bg-primary/10 text-primary border border-primary/20 shadow-[0_0_10px_rgba(0,255,255,0.1)]"
                        : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                    )}
                  >
                    <Icon className="w-3 h-3" />
                    {item.label}
                  </a>
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-16 left-0 right-0 bg-background border-b border-border p-4 flex flex-col gap-2 animate-in slide-in-from-top-2 shadow-2xl z-50">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location === item.href;
              return (
                <Link key={item.href} href={item.href}>
                  <a
                    onClick={() => setIsMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-2 px-4 py-3 rounded-md font-mono text-sm",
                      isActive
                        ? "bg-primary/10 text-primary border border-primary/20"
                        : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </a>
                </Link>
              );
            })}
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8 relative z-10">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-card/30 backdrop-blur-sm mt-auto relative z-10">
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="font-display text-lg mb-2 text-foreground/80">
            "Understanding Yesterday to Protect Tomorrow."
          </p>
          <p className="font-mono text-xs text-muted-foreground">
            Technology can preserve what makes us human.
          </p>
          <div className="mt-4 flex justify-center gap-4 opacity-50">
             {/* Decorative small elements */}
             <div className="w-1.5 h-1.5 rounded-full bg-primary/50" />
             <div className="w-1.5 h-1.5 rounded-full bg-secondary/50" />
             <div className="w-1.5 h-1.5 rounded-full bg-primary/50" />
          </div>
        </div>
      </footer>
    </div>
  );
}
