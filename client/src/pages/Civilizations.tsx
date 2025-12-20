import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, MapPin, Users, Lightbulb, ScrollText, Sparkles } from "lucide-react";
import { useAnalysis } from "@/context/AnalysisContext";
import civsData from "@/data/civilizations.json";

export default function Civilizations() {
  const { analyzedCivilization, analyzedArtifact, clearAnalysis } = useAnalysis();
  const [selectedCivId, setSelectedCivId] = useState<string | null>(null);

  // Use analyzed civilization if available, otherwise allow manual selection
  const displayCiv = analyzedCivilization || civsData.find(c => c.id === selectedCivId);
  const isFromAnalysis = !!analyzedCivilization;

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-display font-bold text-foreground">Civilization Explorer</h2>
          <p className="text-muted-foreground font-mono text-sm mt-1">
            "Civilizations are understood through the artifacts they leave behind."
          </p>
        </div>
        {(displayCiv || isFromAnalysis) && (
          <Button 
            variant="ghost" 
            onClick={() => {
              setSelectedCivId(null);
              if (isFromAnalysis) clearAnalysis();
            }} 
            className="font-mono text-xs"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {isFromAnalysis ? "BACK TO ANALYZE" : "BROWSE ARCHIVE"}
          </Button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {!displayCiv ? (
          <motion.div 
            key="list"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {isFromAnalysis ? (
              // Loading state while showing artifact connection
              <Card className="bg-card/50 border-primary/20 p-8 text-center">
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="space-y-4"
                >
                  <Sparkles className="w-12 h-12 text-primary/50 mx-auto" />
                  <p className="font-mono text-sm text-muted-foreground">
                    Artifact: <span className="text-foreground font-medium">{analyzedArtifact?.name}</span>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Loading civilization data...
                  </p>
                </motion.div>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {civsData.map((civ) => (
                  <Card 
                    key={civ.id}
                    className="cursor-pointer hover:border-primary/50 transition-all hover:bg-card/50 group overflow-hidden border-border"
                    onClick={() => setSelectedCivId(civ.id)}
                  >
                    <div className="h-2 bg-gradient-to-r from-primary/20 via-primary/50 to-primary/20 group-hover:via-primary transition-all" />
                    <CardHeader>
                      <CardTitle className="font-display text-xl">{civ.name}</CardTitle>
                      <CardDescription className="font-mono text-xs flex items-center gap-2">
                        <Clock className="w-3 h-3" /> {civ.period}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-2">{civ.dailyLife}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div 
            key="detail"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid md:grid-cols-3 gap-8"
          >
            {/* Main Info Card */}
            <Card className="md:col-span-2 border-primary/20 bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className="text-4xl font-display font-bold text-foreground mb-2">{displayCiv.name}</h1>
                    {isFromAnalysis && (
                      <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">
                        Identified from: {analyzedArtifact?.name}
                      </Badge>
                    )}
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground font-mono">
                      <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {displayCiv.period}</span>
                      <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {displayCiv.location}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold flex items-center gap-2 mb-2 text-primary">
                    <Users className="w-5 h-5" /> Daily Life
                  </h3>
                  <p className="text-foreground/90 leading-relaxed">{displayCiv.dailyLife}</p>
                </div>

                <div>
                  <h3 className="text-lg font-bold flex items-center gap-2 mb-2 text-secondary">
                    <Lightbulb className="w-5 h-5" /> Contributions We Use Today
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {displayCiv.contributions.map((c, i) => (
                      <Badge key={i} variant="outline" className="border-secondary/50 text-secondary bg-secondary/5">
                        {c}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Sidebar Facts */}
            <div className="space-y-4">
              <Card className="bg-accent/10 border-accent/20">
                <CardHeader>
                  <CardTitle className="text-sm font-mono uppercase text-accent-foreground flex items-center gap-2">
                    <ScrollText className="w-4 h-4" /> Did You Know?
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {displayCiv.facts.map((fact, i) => (
                    <div key={i} className="text-sm text-muted-foreground border-l-2 border-accent/30 pl-3">
                      {fact}
                    </div>
                  ))}
                </CardContent>
              </Card>

              {isFromAnalysis && (
                <div className="p-4 rounded border border-primary/20 bg-primary/5 text-xs font-mono text-primary space-y-1">
                  <p>ARTIFACT TRACE</p>
                  <p className="text-muted-foreground break-words">{analyzedArtifact?.whyItMatters}</p>
                </div>
              )}

              <div className="p-4 rounded border border-border bg-black/40 text-xs font-mono text-muted-foreground">
                DATA SOURCE: ARCHIVE_CTX_99
                <br />
                RELEVANCE: HIGH
                <br />
                STATUS: {isFromAnalysis ? "ARTIFACT-LINKED" : "PRESERVED"}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
