import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Globe, Shield, History } from "lucide-react";
import RobotExcavationPipeline from "@/components/RobotExcavationPipeline";
import heroBg from "@assets/generated_images/digital_archaeology_interface_background.png";

export default function Home() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative rounded-3xl overflow-hidden min-h-[500px] flex items-center justify-center text-center border border-primary/20 shadow-[0_0_50px_rgba(0,255,255,0.1)]">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={heroBg} 
            alt="Digital Archaeology Interface" 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
          <div className="absolute inset-0 hologram-grid opacity-30" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-3xl px-6 space-y-6">
          <div className="inline-block px-3 py-1 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-md mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="font-mono text-xs text-primary tracking-widest uppercase">
              Mission: Protect Human Identity
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-display font-bold text-white tracking-tight drop-shadow-lg animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
            Diggity
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
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
