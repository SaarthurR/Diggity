import { ArrowLeft, Heart, Globe, Shield, Users, Zap } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function Mission() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link href="/">
          <Button variant="outline" size="icon">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white">
            Our Mission
          </h1>
          <p className="text-muted-foreground mt-2">
            Protecting human identity through digital archaeology
          </p>
        </div>
      </div>

      {/* Core Mission Statement */}
      <section className="p-8 md:p-12 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 backdrop-blur-sm">
        <h2 className="text-3xl font-display font-bold mb-6 text-primary">
          "Understanding Yesterday to Protect Tomorrow"
        </h2>
        <p className="text-lg text-gray-300 leading-relaxed mb-6">
          Lost history leads to lost identity. At Diggity, we believe that by understanding 
          the civilizations, languages, and cultures of the past, we can better protect 
          the heritage and identity of humanity in the future.
        </p>
        <p className="text-lg text-gray-300 leading-relaxed">
          We leverage cutting-edge AI and digital archaeology to preserve what would otherwise 
          fade into obscurity—unlocking the secrets of ancient languages, reconstructing lost 
          civilizations, and ensuring that future generations can connect with their roots.
        </p>
      </section>

      {/* Three Pillars */}
      <section className="space-y-6">
        <h2 className="text-3xl font-display font-bold text-white mb-8">Our Three Pillars</h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          {/* Pillar 1 */}
          <div className="p-8 rounded-xl bg-card border border-border/50 hover:border-primary/50 transition-all group hover:shadow-lg hover:shadow-primary/10">
            <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Globe className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-xl font-display font-bold mb-4 text-foreground">
              Preserve History
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              We digitally preserve ancient artifacts, languages, and civilizations before 
              they disappear forever. Every artifact tells a story that deserves to be told.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="p-8 rounded-xl bg-card border border-border/50 hover:border-secondary/50 transition-all group hover:shadow-lg hover:shadow-secondary/10">
            <div className="w-14 h-14 rounded-lg bg-secondary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Zap className="w-7 h-7 text-secondary" />
            </div>
            <h3 className="text-xl font-display font-bold mb-4 text-foreground">
              Unlock Knowledge
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Using AI and machine learning, we decode ancient languages and uncover hidden 
              insights in historical data. Knowledge that was lost can be recovered.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="p-8 rounded-xl bg-card border border-border/50 hover:border-accent/50 transition-all group hover:shadow-lg hover:shadow-accent/10">
            <div className="w-14 h-14 rounded-lg bg-accent/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Heart className="w-7 h-7 text-accent-foreground" />
            </div>
            <h3 className="text-xl font-display font-bold mb-4 text-foreground">
              Protect Identity
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              We believe that understanding our shared human heritage strengthens our collective 
              identity and makes us more committed to protecting cultural diversity.
            </p>
          </div>
        </div>
      </section>

      {/* Why It Matters */}
      <section className="space-y-6">
        <h2 className="text-3xl font-display font-bold text-white">Why It Matters</h2>
        
        <div className="space-y-4">
          <div className="p-6 rounded-lg bg-card border border-border/30 hover:border-primary/30 transition-colors">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <Users className="w-6 h-6 text-primary mt-1" />
              </div>
              <div>
                <h4 className="font-display font-bold text-foreground mb-2">Human Connection</h4>
                <p className="text-muted-foreground">
                  Thousands of languages and cultural traditions are dying every year. When we lose 
                  these, we lose not just words, but entire worldviews and ways of understanding 
                  humanity.
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-lg bg-card border border-border/30 hover:border-secondary/30 transition-colors">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <Shield className="w-6 h-6 text-secondary mt-1" />
              </div>
              <div>
                <h4 className="font-display font-bold text-foreground mb-2">Cultural Protection</h4>
                <p className="text-muted-foreground">
                  By understanding history and preserving it digitally, we create a resilient archive 
                  that cannot be destroyed by physical disaster, war, or the passage of time.
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-lg bg-card border border-border/30 hover:border-accent/30 transition-colors">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <Zap className="w-6 h-6 text-accent-foreground mt-1" />
              </div>
              <div>
                <h4 className="font-display font-bold text-foreground mb-2">Future Knowledge</h4>
                <p className="text-muted-foreground">
                  Archaeological and linguistic insights can inform modern science, technology, and 
                  problem-solving. Ancient wisdom combined with modern tools creates powerful solutions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="p-8 md:p-12 rounded-2xl bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/30 text-center">
        <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
          Join the Digital Excavation
        </h2>
        <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
          Every exploration helps us understand our shared history. Start analyzing artifacts, 
          decoding languages, and protecting human heritage today.
        </p>
        <Link href="/analyze">
          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-mono tracking-wider">
            START DIGGING NOW
          </Button>
        </Link>
      </section>
    </div>
  );
}
