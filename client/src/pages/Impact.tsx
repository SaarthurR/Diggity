import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Globe, MessageCircle, ShieldCheck } from "lucide-react";

export default function Impact() {
  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-display font-bold">Protect Tomorrow</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          "When people understand history, they are more likely to protect it."
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="bg-gradient-to-br from-card to-card/50 border-border hover:border-primary/50 transition-colors">
          <CardHeader>
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Heart className="w-6 h-6 text-primary" />
            </div>
            <CardTitle className="font-display text-2xl">Preserves Cultural Identity</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              Every artifact and language holds the soul of a people. By understanding them, we validate their existence and keep their stories alive for their descendants. A community without history is like a tree without roots.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-card to-card/50 border-border hover:border-secondary/50 transition-colors">
          <CardHeader>
            <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
              <MessageCircle className="w-6 h-6 text-secondary" />
            </div>
            <CardTitle className="font-display text-2xl">Protects Endangered Languages</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              When a language dies, we lose unique ways of thinking about the world. Digital preservation helps record and revitalize these languages, ensuring that ancient wisdom isn't lost in translation.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-card to-card/50 border-border hover:border-accent-foreground/50 transition-colors">
          <CardHeader>
            <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mb-4">
              <Globe className="w-6 h-6 text-accent-foreground" />
            </div>
            <CardTitle className="font-display text-2xl">Supports Global Heritage</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              Understanding our shared past fosters global empathy. It supports efforts like UNESCO World Heritage sites, protecting them from war, looting, and neglect. It turns "their history" into "our human story."
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-card to-card/50 border-border hover:border-green-500/50 transition-colors">
          <CardHeader>
            <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center mb-4">
              <ShieldCheck className="w-6 h-6 text-green-500" />
            </div>
            <CardTitle className="font-display text-2xl">Ethical Archaeology</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              Modern archaeology isn't about taking treasure—it's about understanding context. Digital tools allow us to study sites without destroying them, respecting the sanctity of the past while learning for the future.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="p-8 rounded-2xl bg-primary/5 border border-primary/20 text-center space-y-4">
        <h3 className="text-2xl font-display font-bold text-primary">Join the Mission</h3>
        <p className="max-w-2xl mx-auto text-foreground/80">
          You are now a Digital Archaeologist. Your mission is to share what you've learned. 
          Respect the past. Question the present. Protect the future.
        </p>
      </div>
    </div>
  );
}
