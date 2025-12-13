import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Scanner from "@/components/Scanner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CheckCircle2, MapPin, Clock, Hammer } from "lucide-react";
import artifactsData from "@/data/artifacts.json";

// Image Imports
import tabletImg from "@assets/generated_images/ancient_clay_tablet_artifact.png";
import toolImg from "@assets/generated_images/prehistoric_stone_hand_axe.png";
import potteryImg from "@assets/generated_images/ancient_decorative_pottery.png";
import statueImg from "@assets/generated_images/ancient_golden_idol_statue.png";

const imageMap: Record<string, string> = {
  tablet: tabletImg,
  tool: toolImg,
  pottery: potteryImg,
  statue: statueImg,
};

export default function Analysis() {
  const [selectedArtifactId, setSelectedArtifactId] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);

  const selectedArtifact = artifactsData.find(a => a.id === selectedArtifactId);

  const handleSelect = (id: string) => {
    setSelectedArtifactId(id);
    setIsScanning(true);
    setScanComplete(false);
  };

  const handleScanComplete = () => {
    setIsScanning(false);
    setScanComplete(true);
  };

  const reset = () => {
    setSelectedArtifactId(null);
    setIsScanning(false);
    setScanComplete(false);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-display font-bold text-foreground">Artifact Analysis</h2>
          <p className="text-muted-foreground font-mono text-sm mt-1">Select an object to begin digital excavation.</p>
        </div>
        {selectedArtifactId && (
          <Button variant="ghost" onClick={reset} className="font-mono text-xs hover:bg-primary/10 hover:text-primary">
            <ArrowLeft className="w-4 h-4 mr-2" />
            NEW SCAN
          </Button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {!selectedArtifactId ? (
          /* GRID VIEW */
          <motion.div 
            key="grid"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {artifactsData.map((artifact) => (
              <Card 
                key={artifact.id}
                className="group cursor-pointer border-border hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,255,255,0.1)] bg-card overflow-hidden"
                onClick={() => handleSelect(artifact.id)}
              >
                <div className="relative aspect-square overflow-hidden bg-black">
                  <img 
                    src={imageMap[artifact.imageId]} 
                    alt={artifact.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-80 group-hover:opacity-100" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60" />
                  <div className="absolute bottom-3 left-3">
                    <p className="font-mono text-xs text-primary bg-black/50 px-2 py-1 rounded backdrop-blur-md border border-primary/20">
                      ID: {artifact.id.toUpperCase()}
                    </p>
                  </div>
                </div>
                <CardHeader className="p-4">
                  <CardTitle className="font-display text-lg">{artifact.name}</CardTitle>
                  <CardDescription className="text-xs font-mono">{artifact.location}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </motion.div>
        ) : (
          /* ANALYSIS VIEW */
          <motion.div 
            key="analysis"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid lg:grid-cols-2 gap-8 items-start"
          >
            {/* Left Column: Scanner */}
            <div className="space-y-4">
              <Scanner 
                imageUrl={imageMap[selectedArtifact!.imageId]} 
                isScanning={isScanning} 
                onScanComplete={handleScanComplete}
                className="aspect-square w-full shadow-2xl"
              />
              <div className="p-4 rounded border border-border bg-card/50 font-mono text-xs text-muted-foreground">
                STATUS: {isScanning ? <span className="text-primary animate-pulse">SCANNING...</span> : <span className="text-green-500">COMPLETE</span>}
                <br />
                COORDINATES: {selectedArtifact!.location}
                <br />
                OBJECT TYPE: {selectedArtifact!.type.toUpperCase()}
              </div>
            </div>

            {/* Right Column: Data Results */}
            <div className="space-y-6">
              {scanComplete ? (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ staggerChildren: 0.1 }}
                >
                  <div className="mb-6">
                    <Badge variant="outline" className="mb-2 border-primary text-primary">ANALYSIS SUCCESSFUL</Badge>
                    <h1 className="text-4xl font-display font-bold text-foreground mb-2">{selectedArtifact!.name}</h1>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground font-mono">
                      <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {selectedArtifact!.age}</span>
                      <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {selectedArtifact!.location}</span>
                      <span className="flex items-center gap-1"><Hammer className="w-4 h-4" /> {selectedArtifact!.material}</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Card className="bg-primary/5 border-primary/20">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-mono text-primary uppercase">Purpose</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-foreground/90">{selectedArtifact!.purpose}</p>
                      </CardContent>
                    </Card>

                    <Card className="bg-secondary/5 border-secondary/20">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-mono text-secondary uppercase">Why It Matters</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-foreground/90">{selectedArtifact!.whyItMatters}</p>
                      </CardContent>
                    </Card>

                    <div className="p-4 rounded-lg bg-card border border-border flex gap-4 items-start">
                      <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0 mt-1" />
                      <div>
                        <h4 className="font-bold text-sm mb-1">Preservation Protocol</h4>
                        <p className="text-xs text-muted-foreground">
                          By identifying this artifact's cultural significance, we can ensure it is handled with respect and preserved for future generations.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center p-12 text-center opacity-50 space-y-4">
                  <div className="w-16 h-16 rounded-full border-4 border-dashed border-primary/30 animate-spin" />
                  <p className="font-mono text-sm">Processing artifact data...</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
