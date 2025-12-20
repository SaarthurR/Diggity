import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Quote } from "lucide-react";

interface VocabularyItem {
  symbol: string;
  meaning: string;
  pronunciation: string;
  usage: string;
}

interface LanguageInsight {
  id: string;
  name: string;
  civilizationId: string;
  scriptOrigin: string;
  scriptSample: string;
  vocabulary: VocabularyItem[];
  usageExample: {
    context: string;
    text: string;
    meaning: string;
  };
}

interface LanguageInsightsProps {
  languageData: LanguageInsight;
}

export default function LanguageInsights({ languageData }: LanguageInsightsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="space-y-4"
    >
      <Card className="bg-gradient-to-br from-amber-500/5 via-orange-500/5 to-amber-500/5 border-amber-500/20">
        <CardHeader>
          <CardTitle className="text-sm font-mono uppercase text-amber-600 dark:text-amber-500 flex items-center gap-2">
            <BookOpen className="w-4 h-4" /> Language Insights (From Inscriptions)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Script Sample */}
          <div className="p-3 rounded bg-black/20 border border-amber-500/20">
            <p className="text-xs font-mono text-muted-foreground mb-2">SCRIPT SAMPLE</p>
            <p className="text-3xl text-amber-600/80 dark:text-amber-400/80 font-bold tracking-wider">
              {languageData.scriptSample}
            </p>
            <p className="text-xs text-muted-foreground mt-2">{languageData.name}</p>
          </div>

          {/* Vocabulary */}
          <div className="space-y-2">
            <p className="text-xs font-mono text-amber-600 dark:text-amber-500 uppercase font-bold">Vocabulary from Artifact</p>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {languageData.vocabulary.slice(0, 5).map((vocab, i) => (
                <div key={i} className="p-2 rounded bg-card/50 border border-border text-xs space-y-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xl font-bold text-amber-600/80 dark:text-amber-400/80">
                      {vocab.symbol}
                    </span>
                    <span className="font-bold text-foreground">{vocab.meaning}</span>
                  </div>
                  <p className="text-muted-foreground italic">{vocab.pronunciation}</p>
                  <p className="text-muted-foreground border-l border-amber-500/20 pl-2">
                    <span className="font-mono text-[10px]">USAGE:</span> {vocab.usage}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Usage Example */}
          <div className="p-3 rounded bg-card/50 border border-amber-500/20 space-y-2">
            <p className="text-xs font-mono text-amber-600 dark:text-amber-500 uppercase font-bold flex items-center gap-2">
              <Quote className="w-3 h-3" /> Real Context
            </p>
            <div className="space-y-1">
              <p className="text-xs font-bold text-foreground">{languageData.usageExample.context}</p>
              <p className="text-xs font-mono bg-black/30 p-2 rounded text-amber-200/80">
                "{languageData.usageExample.text}"
              </p>
              <p className="text-xs text-muted-foreground">
                {languageData.usageExample.meaning}
              </p>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="p-2 rounded bg-amber-500/5 border border-amber-500/20">
            <p className="text-[11px] text-muted-foreground italic">
              "Language insights come from archaeological evidence, not standalone sources."
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
