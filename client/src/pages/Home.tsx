import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Globe, Shield, History, Search, Zap, Brain, Target } from "lucide-react";
import RobotExcavationPipeline from "@/components/RobotExcavationPipeline";
import heroBg from "@/assets/generated_images/archaeology_field_notes_bg.png";

export default function Home() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative rounded-3xl overflow-hidden min-h-[500px] flex items-center justify-center text-center border border-primary/10 shadow-[0_0_50px_rgba(120,80,50,0.05)]">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={heroBg} 
            alt="Archaeological Field Notes" 
            className="w-full h-full object-cover opacity-40 mix-blend-multiply"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          <div className="absolute inset-0 hologram-grid opacity-20" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-3xl px-6 space-y-6">
          <h1 className="text-5xl md:text-7xl font-display font-bold text-primary tracking-tight drop-shadow-sm animate-in fade-in slide-in-from-bottom-6 duration-700">
            Diggity
          </h1>
          
          <p className="text-xl md:text-2xl text-foreground font-light leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            "Understanding yesterday so we can <span className="text-primary font-medium">protect tomorrow</span>."
          </p>

          <p className="text-sm md:text-base text-muted-foreground max-w-xl mx-auto animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
            Lost history leads to lost identity. Join the digital excavation to preserve cultures, languages, and civilizations before they fade away.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6 animate-in fade-in slide-in-from-bottom-12 duration-700 delay-400">
            <Link href="/analyze">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-mono tracking-wider">
                START DIGGING <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link href="/mission">
              <Button variant="outline" size="lg" className="border-primary/30 text-primary hover:bg-primary/10 font-mono">
                LEARN MISSION
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Robot Excavation Pipeline Section */}
      <section className="py-12">
        <RobotExcavationPipeline />
      </section>

      {/* Our Solution Section */}
      <section className="space-y-8">
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white">Our Solution</h2>
          <p className="text-lg text-muted-foreground">
            A connected system for discovering, analyzing, and protecting history.
          </p>
        </div>

        {/* The Problem */}
        <div className="p-8 rounded-xl bg-card/50 border border-border/30 backdrop-blur-sm">
          <h3 className="text-lg font-display font-bold mb-3 text-foreground">The Problem</h3>
          <p className="text-muted-foreground leading-relaxed">
            Archaeology is often fragmented — discovery, excavation, and analysis happen as disconnected steps, 
            increasing the risk of damage and lost context. Without a unified approach, critical information 
            vanishes in the gaps between processes.
          </p>
        </div>

        {/* The Solution */}
        <div className="p-8 rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/30 backdrop-blur-sm">
          <h3 className="text-lg font-display font-bold mb-3 text-primary">The Solution</h3>
          <p className="text-foreground leading-relaxed text-lg">
            <span className="font-semibold">Diggity unifies archaeology into one data-driven system</span> where 
            understanding happens before, during, and after excavation. Every step informs the next. 
            Every artifact tells a story.
          </p>
        </div>

        {/* How The System Works */}
        <div className="space-y-4">
          <h3 className="text-lg font-display font-bold text-foreground">How the System Works</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-6 rounded-lg bg-card border border-border/50 group hover:border-primary/50 transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Search className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-mono text-xs text-primary uppercase font-bold mb-1">Step 1</p>
                  <p className="text-sm text-muted-foreground">
                    A robot carefully discovers and extracts artifacts with precision
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-lg bg-card border border-border/50 group hover:border-secondary/50 transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Zap className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <p className="font-mono text-xs text-secondary uppercase font-bold mb-1">Step 2</p>
                  <p className="text-sm text-muted-foreground">
                    A lightweight module captures critical data during excavation
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-lg bg-card border border-border/50 group hover:border-accent/50 transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-accent/30 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Brain className="w-5 h-5 text-accent-foreground" />
                </div>
                <div>
                  <p className="font-mono text-xs text-accent-foreground uppercase font-bold mb-1">Step 3</p>
                  <p className="text-sm text-muted-foreground">
                    Digital analysis interprets artifacts and historical context
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-lg bg-card border border-border/50 group hover:border-green-500/50 transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Target className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <p className="font-mono text-xs text-green-500 uppercase font-bold mb-1">Step 4</p>
                  <p className="text-sm text-muted-foreground">
                    Past discoveries inform future excavation decisions
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Closing Statement */}
        <div className="p-8 rounded-xl bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/20 text-center">
          <p className="text-lg text-foreground italic leading-relaxed">
            "Diggity turns archaeology into understanding — and understanding into protection."
          </p>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="grid md:grid-cols-3 gap-8">
        <div className="p-6 rounded-xl bg-card border border-border/50 hover:border-primary/50 transition-colors group">
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Globe className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-xl font-display mb-2 text-foreground">Explore Civilizations</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Travel through time to discover how ancient people lived, loved, and invented the world we know today.
          </p>
        </div>

        <div className="p-6 rounded-xl bg-card border border-border/50 hover:border-secondary/50 transition-colors group">
          <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <History className="w-6 h-6 text-secondary" />
          </div>
          <h3 className="text-xl font-display mb-2 text-foreground">Decode Languages</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Unlock the secrets of Cuneiform and Hieroglyphs. See what wisdom would be lost if these voices went silent.
          </p>
        </div>

        <div className="p-6 rounded-xl bg-card border border-border/50 hover:border-accent-foreground/50 transition-colors group">
          <div className="w-12 h-12 rounded-lg bg-accent/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Shield className="w-6 h-6 text-accent-foreground" />
          </div>
          <h3 className="text-xl font-display mb-2 text-foreground">Protect Heritage</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Learn why preserving artifacts matters. When we understand history, we are more likely to protect it.
          </p>
        </div>
      </section>
    </div>
  );
}
