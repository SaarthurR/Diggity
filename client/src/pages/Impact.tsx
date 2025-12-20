import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Globe, MessageCircle, ShieldCheck, Zap, Scan, Users, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

export default function Impact() {
  const steps = [
    {
      icon: Zap,
      number: "1",
      title: "Excavation Robot",
      description: "Precision digital excavation minimizes damage to artifacts while gathering comprehensive data",
    },
    {
      icon: Scan,
      number: "2",
      title: "Artifact Analyzer",
      description: "Advanced analysis identifies artifacts and their origins without destructive testing",
    },
    {
      icon: Globe,
      number: "3",
      title: "Civilization Understanding",
      description: "Connect artifacts to cultures and histories to reveal humanity's shared story",
    },
    {
      icon: ShieldCheck,
      number: "4",
      title: "Future Protection",
      description: "Knowledge drives conservation efforts and protects endangered cultural heritage",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-display font-bold">Protect Tomorrow</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          "When people understand history, they are more likely to protect it."
        </p>
      </div>

      {/* Pipeline Journey */}
      <div className="space-y-6">
        <h2 className="text-2xl font-display font-bold text-center text-foreground mb-8">
          The Data-Driven Archaeology System
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full bg-card border-border hover:border-primary/50 transition-all relative">
                  <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                    {step.number}
                  </div>
                  <CardHeader className="space-y-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <div className="p-4 rounded-lg bg-primary/5 border border-primary/20 text-center">
          <p className="text-sm text-muted-foreground italic">
            Each step reduces physical damage while maximizing knowledge. The pipeline turns artifacts into understanding, and understanding into preservation.
          </p>
        </div>
      </div>

      {/* Impact Areas */}
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="bg-gradient-to-br from-card to-card/50 border-border hover:border-primary/50 transition-colors">
          <CardHeader>
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Heart className="w-6 h-6 text-primary" />
            </div>
            <CardTitle className="font-display text-2xl">Preserves Cultural Identity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-muted-foreground leading-relaxed">
              Every artifact and language holds the soul of a people. By understanding them, we validate their existence and keep their stories alive for their descendants. A community without history is like a tree without roots.
            </p>
            <div className="p-3 rounded bg-primary/5 border border-primary/20">
              <p className="text-xs font-mono text-primary uppercase font-bold mb-1">Through This System</p>
              <p className="text-xs text-muted-foreground">
                The robot preserves artifacts digitally. The analyzer reveals their significance. Civilizations are understood, not erased.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-card to-card/50 border-border hover:border-secondary/50 transition-colors">
          <CardHeader>
            <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
              <MessageCircle className="w-6 h-6 text-secondary" />
            </div>
            <CardTitle className="font-display text-2xl">Reduces Artifact Damage</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-muted-foreground leading-relaxed">
              Excavation robots eliminate human error, contamination, and physical mishandling. Digital analysis means artifacts are studied, not destroyed. What survived millennia is protected for millennia more.
            </p>
            <div className="p-3 rounded bg-secondary/5 border border-secondary/20">
              <p className="text-xs font-mono text-secondary uppercase font-bold mb-1">Measurable Impact</p>
              <p className="text-xs text-muted-foreground">
                Zero accidental breakage from excavation. Non-destructive analysis. Preservation first, knowledge second.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-card to-card/50 border-border hover:border-accent-foreground/50 transition-colors">
          <CardHeader>
            <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-accent-foreground" />
            </div>
            <CardTitle className="font-display text-2xl">Educates Future Generations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-muted-foreground leading-relaxed">
              When young people understand where humans came from and how civilizations flourished, they become stewards of our shared heritage. Knowledge builds respect. Respect builds protection.
            </p>
            <div className="p-3 rounded bg-accent/10 border border-accent/20">
              <p className="text-xs font-mono text-accent-foreground uppercase font-bold mb-1">For Tomorrow</p>
              <p className="text-xs text-muted-foreground">
                Interactive artifact analysis. Accessible civilization data. A new generation of digital archaeologists.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-card to-card/50 border-border hover:border-green-500/50 transition-colors">
          <CardHeader>
            <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center mb-4">
              <BookOpen className="w-6 h-6 text-green-500" />
            </div>
            <CardTitle className="font-display text-2xl">Supports Global Heritage</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-muted-foreground leading-relaxed">
              Understanding our shared past fosters global empathy. Digital preservation supports worldwide conservation efforts, protecting cultural sites from war, looting, and neglect. It turns "their history" into "our human story."
            </p>
            <div className="p-3 rounded bg-green-500/5 border border-green-500/20">
              <p className="text-xs font-mono text-green-500 uppercase font-bold mb-1">Real World</p>
              <p className="text-xs text-muted-foreground">
                Backup archives of endangered sites. Data accessible to researchers globally. Prevention through understanding.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Call to Action */}
      <div className="p-8 rounded-2xl bg-primary/5 border border-primary/20 text-center space-y-4">
        <h3 className="text-2xl font-display font-bold text-primary">You Are the Digital Archaeologist</h3>
        <p className="max-w-2xl mx-auto text-foreground/80 leading-relaxed">
          You've explored artifacts, understood civilizations, and learned to predict the future of archaeology. 
          Your knowledge is a tool. Use it to share what you've learned, advocate for preservation, 
          and help others see that history isn't just the past—it's the foundation of our future.
        </p>
        <p className="text-lg font-display text-foreground font-bold pt-4 border-t border-primary/20">
          "Understanding yesterday helps protect tomorrow."
        </p>
      </div>
    </div>
  );
}
