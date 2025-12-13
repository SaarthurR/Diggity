import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sparkles, PenTool } from "lucide-react";
import { motion } from "framer-motion";

import artifactsData from "@/data/artifacts.json";
import civsData from "@/data/civilizations.json";

export default function Story() {
  const [artifact, setArtifact] = useState("");
  const [civ, setCiv] = useState("");
  const [generatedStory, setGeneratedStory] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    if (!artifact || !civ) return;
    
    setIsGenerating(true);
    
    // Simulate generation delay
    setTimeout(() => {
      const selectedArtifact = artifactsData.find(a => a.id === artifact);
      const selectedCiv = civsData.find(c => c.id === civ);
      
      if (selectedArtifact && selectedCiv) {
        const story = `
          In the age of the ${selectedCiv.name}, roughly ${selectedCiv.period}, a master craftsman created the ${selectedArtifact.name}. 
          
          It was crafted from ${selectedArtifact.material} and was essential for ${selectedArtifact.purpose.toLowerCase()}. 
          For centuries, it lay hidden in ${selectedArtifact.location}, waiting to tell its story.
          
          Because we took the time to understand it today, we learned that ${selectedCiv.dailyLife.toLowerCase()} 
          This knowledge helps us protect our own identity. By saving this ${selectedArtifact.name}, we ensure that the ingenuity of the ${selectedCiv.name} is never forgotten.
        `;
        setGeneratedStory(story);
      }
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-display font-bold">Story Mode</h1>
        <p className="text-muted-foreground font-mono">
          Connect the dots between the past and the future.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="text-lg font-mono flex items-center gap-2">
              <PenTool className="w-4 h-4 text-primary" /> Setup Simulation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Select Artifact</Label>
              <Select onValueChange={setArtifact} value={artifact}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose an artifact..." />
                </SelectTrigger>
                <SelectContent>
                  {artifactsData.map(a => (
                    <SelectItem key={a.id} value={a.id}>{a.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Select Civilization</Label>
              <Select onValueChange={setCiv} value={civ}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a civilization..." />
                </SelectTrigger>
                <SelectContent>
                  {civsData.map(c => (
                    <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button 
              className="w-full mt-4 bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={handleGenerate}
              disabled={!artifact || !civ || isGenerating}
            >
              {isGenerating ? "GENERATING..." : "GENERATE STORY"} <Sparkles className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden min-h-[300px] flex flex-col">
          <div className="absolute inset-0 bg-black/50 z-0" />
          <div className="absolute inset-0 hologram-grid opacity-20 z-0" />
          
          <CardContent className="relative z-10 p-8 flex-1 flex items-center justify-center">
            {generatedStory ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-serif text-lg leading-relaxed text-foreground/90 italic"
              >
                "{generatedStory}"
              </motion.div>
            ) : (
              <div className="text-center text-muted-foreground opacity-50">
                <Sparkles className="w-12 h-12 mx-auto mb-4" />
                <p className="font-mono text-sm">Waiting for input parameters...</p>
              </div>
            )}
          </CardContent>
          
          {generatedStory && (
            <div className="relative z-10 p-4 border-t border-white/10 bg-white/5 text-center">
              <p className="text-xs font-mono text-primary">SIMULATION COMPLETE. IMPACT VERIFIED.</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
