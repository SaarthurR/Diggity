import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Languages, HelpCircle, Quote } from "lucide-react";
import languagesData from "@/data/languages.json";

// Mapping Unicode characters to the IDs in JSON
const symbolMap: Record<string, string> = {
  "img/symbol1.png": "𒀭", // Star
  "img/symbol2.png": "𒀀", // Water
  "img/symbol3.png": "𒊺", // Grain
  "img/symbol4.png": "☥", // Ankh
  "img/symbol5.png": "𓇳", // Sun
  "img/symbol6.png": "𓈗", // River
};

export default function Decoder() {
  const [selectedLangId, setSelectedLangId] = useState<string | null>(null);
  const [revealedSymbols, setRevealedSymbols] = useState<Set<number>>(new Set());

  const selectedLang = languagesData.find(l => l.id === selectedLangId);
  const allRevealed = selectedLang && revealedSymbols.size === selectedLang.symbols.length;

  const handleSymbolClick = (index: number) => {
    const newRevealed = new Set(revealedSymbols);
    newRevealed.add(index);
    setRevealedSymbols(newRevealed);
  };

  const reset = () => {
    setSelectedLangId(null);
    setRevealedSymbols(new Set());
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-display font-bold text-foreground">Ancient Language Decoder</h2>
          <p className="text-muted-foreground font-mono text-sm mt-1">
            Translate the past to hear the voices of yesterday.
          </p>
        </div>
        {selectedLangId && (
          <Button variant="ghost" onClick={reset} className="font-mono text-xs">
            CHANGE LANGUAGE
          </Button>
        )}
      </div>

      {!selectedLangId || !selectedLang ? (
        <div className="grid md:grid-cols-2 gap-6">
          {languagesData.map((lang) => (
            <Card 
              key={lang.id}
              className="cursor-pointer hover:border-primary/50 transition-all hover:bg-card/50 group"
              onClick={() => setSelectedLangId(lang.id)}
            >
              <CardContent className="p-8 flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Languages className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-display">{lang.name}</h3>
                <p className="text-sm text-muted-foreground font-mono">Click to decode</p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
          {/* Translation Area */}
          <Card className="border-primary/20 bg-black/40 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="flex flex-wrap justify-center gap-8 mb-12">
                {selectedLang.symbols.map((symbol, index) => {
                  const isRevealed = revealedSymbols.has(index);
                  return (
                    <div 
                      key={index}
                      onClick={() => handleSymbolClick(index)}
                      className={`
                        relative w-24 h-32 rounded-lg border-2 flex flex-col items-center justify-center cursor-pointer transition-all duration-300
                        ${isRevealed 
                          ? "bg-primary/20 border-primary text-primary shadow-[0_0_15px_rgba(0,255,255,0.3)]" 
                          : "bg-card border-border hover:border-primary/50 text-muted-foreground"}
                      `}
                    >
                      <span className="text-5xl mb-2">{symbolMap[symbol.char]}</span>
                      {isRevealed ? (
                        <span className="text-xs font-mono font-bold uppercase tracking-widest">{symbol.meaning}</span>
                      ) : (
                        <span className="text-xs font-mono opacity-50">CLICK TO DECODE</span>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Full Translation Result */}
              {allRevealed && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-6 text-center"
                >
                  <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
                  
                  <div className="max-w-2xl mx-auto">
                    <Quote className="w-8 h-8 text-primary/30 mx-auto mb-4" />
                    <p className="text-xl md:text-2xl font-display italic text-foreground mb-6 leading-relaxed">
                      "{selectedLang.sampleText}"
                    </p>
                    <div className="p-4 rounded bg-destructive/10 border border-destructive/20 text-left">
                      <h4 className="text-destructive font-bold font-mono text-sm mb-2 flex items-center gap-2">
                        <HelpCircle className="w-4 h-4" />
                        WHAT WOULD BE LOST?
                      </h4>
                      <p className="text-sm text-foreground/80 leading-relaxed">
                        {selectedLang.lossImpact}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
