import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, Camera, Scan, CheckCircle2, AlertTriangle, Search } from "lucide-react";
import artifactsData from "@/data/artifacts.json";
import civsData from "@/data/civilizations.json";

export default function Analyzer() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [step, setStep] = useState<"upload" | "verify" | "result">("upload");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form State
  const [material, setMaterial] = useState("");
  const [category, setCategory] = useState("");
  
  // Result State
  const [matchedArtifact, setMatchedArtifact] = useState<typeof artifactsData[0] | null>(null);
  const [matchedCiv, setMatchedCiv] = useState<typeof civsData[0] | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImagePreview(url);
      setStep("verify");
    }
  };

  const handleAnalyze = () => {
    setIsScanning(true);
    
    // Simulate complex analysis
    setTimeout(() => {
      // Simple logic to find a match based on user input
      // In a real app, this would be AI. Here we simulate the AI asking the user for help, then "confirming".
      
      let match = artifactsData.find(a => 
        (a.material.toLowerCase().includes(material.toLowerCase())) ||
        (a.type.toLowerCase().includes(category.toLowerCase()))
      );

      // Fallback if no specific match, just pick one based on material or random
      if (!match) {
        match = artifactsData[0]; // Default to tablet
      }

      const civ = civsData.find(c => c.id === match?.civilizationId);

      setMatchedArtifact(match || null);
      setMatchedCiv(civ || null);
      setIsScanning(false);
      setStep("result");
    }, 2500);
  };

  const reset = () => {
    setImagePreview(null);
    setStep("upload");
    setMaterial("");
    setCategory("");
    setMatchedArtifact(null);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-display font-bold">Artifact Image Analyzer</h1>
        <p className="text-muted-foreground font-mono">
          Upload an artifact image to identify its origin and purpose.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        {/* Left Column: Image / Scanner */}
        <Card className="overflow-hidden bg-black/50 border-primary/20 relative min-h-[400px] flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            {!imagePreview ? (
              <motion.div 
                key="upload-placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center p-8 space-y-4"
              >
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto border border-dashed border-primary/30">
                  <Camera className="w-10 h-10 text-primary/50" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">Upload Artifact</h3>
                  <p className="text-sm text-muted-foreground">JPG or PNG formats supported</p>
                </div>
                <div className="flex gap-2 justify-center">
                  <Button onClick={() => fileInputRef.current?.click()} variant="outline" className="border-primary/50 text-primary hover:bg-primary/10">
                    <Upload className="w-4 h-4 mr-2" /> Select File
                  </Button>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="preview"
                className="relative w-full h-full min-h-[400px]"
              >
                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover opacity-80" />
                
                {/* Scanning Overlay */}
                {isScanning && (
                  <div className="absolute inset-0 z-10 bg-primary/10">
                    <div className="scan-line" />
                    <div className="absolute inset-0 flex items-center justify-center">
                       <div className="bg-black/80 backdrop-blur border border-primary/50 p-4 rounded text-primary font-mono text-xs animate-pulse">
                         ANALYZING VISUAL MATRICES...
                       </div>
                    </div>
                  </div>
                )}

                {/* Grid Overlay */}
                <div className="absolute inset-0 pointer-events-none hologram-grid opacity-30" />
              </motion.div>
            )}
          </AnimatePresence>
        </Card>

        {/* Right Column: Controls & Results */}
        <div className="space-y-6">
          <AnimatePresence mode="wait">
            {step === "upload" && (
              <motion.div 
                key="step-upload"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="font-display">Why Digital Analysis?</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Physical handling of artifacts accelerates degradation. Oils from hands, humidity changes, and accidental drops can destroy history forever.
                    </p>
                    <div className="p-4 rounded bg-primary/5 border border-primary/20 flex gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                      <p className="text-xs text-foreground/80">
                        Digital analysis reduces physical handling and helps preserve artifacts for the future.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {step === "verify" && (
              <motion.div
                key="step-verify"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="font-mono text-sm uppercase text-primary flex items-center gap-2">
                      <Search className="w-4 h-4" /> Calibrate Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-xs text-muted-foreground">
                      Help the system identify key features to narrow down the search database.
                    </p>

                    <div className="space-y-2">
                      <Label>Primary Material</Label>
                      <Select onValueChange={setMaterial} value={material}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select material..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Clay">Clay / Terracotta</SelectItem>
                          <SelectItem value="Stone">Stone / Flint</SelectItem>
                          <SelectItem value="Gold">Gold / Metal</SelectItem>
                          <SelectItem value="Ceramic">Ceramic / Pottery</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Artifact Category</Label>
                      <Select onValueChange={setCategory} value={category}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Record">Tablet / Record</SelectItem>
                          <SelectItem value="Tool">Tool / Weapon</SelectItem>
                          <SelectItem value="Container">Vase / Container</SelectItem>
                          <SelectItem value="Religious">Statue / Idol</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button 
                      className="w-full mt-4 bg-primary text-primary-foreground hover:bg-primary/90"
                      onClick={handleAnalyze}
                      disabled={!material || !category || isScanning}
                    >
                      {isScanning ? "PROCESSING..." : "RUN ANALYSIS"} <Scan className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {step === "result" && matchedArtifact && (
              <motion.div
                key="step-result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-4"
              >
                <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30 flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-500" />
                  <div>
                    <h4 className="font-bold text-green-500 text-sm">Match Found</h4>
                    <p className="text-xs text-green-500/80">Confidence: 94.2%</p>
                  </div>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="font-display text-2xl">{matchedArtifact.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground text-xs block">ESTIMATED AGE</span>
                        <span className="font-mono font-bold">{matchedArtifact.age}</span>
                      </div>
                      <div>
                         <span className="text-muted-foreground text-xs block">CIVILIZATION</span>
                         <span className="font-mono font-bold text-primary">{matchedCiv?.name}</span>
                      </div>
                      <div className="col-span-2">
                        <span className="text-muted-foreground text-xs block">LIKELY PURPOSE</span>
                        <p className="mt-1">{matchedArtifact.purpose}</p>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-border mt-4">
                      <p className="text-xs text-muted-foreground italic">
                        "{matchedArtifact.whyItMatters}"
                      </p>
                    </div>

                    <Button variant="outline" className="w-full" onClick={reset}>
                      Analyze Another Artifact
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
