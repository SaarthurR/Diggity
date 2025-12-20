import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";
import Scanner from "@/components/Scanner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, CheckCircle2, MapPin, Clock, Hammer, Upload, Camera, Search, AlertTriangle, ScanLine, ExternalLink } from "lucide-react";
import { useAnalysis } from "@/context/AnalysisContext";
import artifactsData from "@/data/artifacts.json";
import civsData from "@/data/civilizations.json";

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
  const [, navigate] = useLocation();
  const { setAnalysisResult } = useAnalysis();
  
  // Mode Selection: 'browse' (grid) or 'upload' (new scan)
  const [mode, setMode] = useState<"browse" | "upload">("upload");

  // Upload/Analyzer State
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadStep, setUploadStep] = useState<"upload" | "verify" | "result">("upload");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [material, setMaterial] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState(""); // Added condition/shape
  const [confidence, setConfidence] = useState(0);

  // Browse/Grid State
  const [selectedArtifactId, setSelectedArtifactId] = useState<string | null>(null);
  
  // Shared Analysis State
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [matchedArtifact, setMatchedArtifact] = useState<typeof artifactsData[0] | null>(null);
  const [matchedCiv, setMatchedCiv] = useState<typeof civsData[0] | null>(null);

  // --- Handlers for Upload Mode ---
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImagePreview(url);
      setUploadStep("verify");
      setMode("upload");
    }
  };

  const handleUploadAnalyze = () => {
    setIsScanning(true);
    setScanComplete(false);
    
    setTimeout(() => {
      // Logic to find a match based on user input tags
      let match = artifactsData.find(a => 
        (a.material.toLowerCase().includes(material.toLowerCase())) ||
        (a.type.toLowerCase().includes(category.toLowerCase()))
      );

      // Fallback
      if (!match) match = artifactsData[0];

      const civ = civsData.find(c => c.id === match?.civilizationId);

      setMatchedArtifact(match || null);
      setMatchedCiv(civ || null);
      
      // Calculate confidence based on input completeness (simulated)
      let baseConfidence = 85;
      if (condition === "intact") baseConfidence += 10;
      if (condition === "fragmented") baseConfidence -= 5;
      const finalConfidence = Math.min(99, Math.floor(Math.random() * 5 + baseConfidence));
      setConfidence(finalConfidence);
      
      // Store in global context for Civilization Explorer
      if (match && civ) {
        setAnalysisResult(match as any, civ as any);
      }
      
      setIsScanning(false);
      setScanComplete(true);
      setUploadStep("result");
    }, 2500);
  };

  // --- Handlers for Browse Mode ---
  const handleGridSelect = (id: string) => {
    const artifact = artifactsData.find(a => a.id === id);
    const civ = civsData.find(c => c.id === artifact?.civilizationId);
    
    setSelectedArtifactId(id);
    setImagePreview(imageMap[artifact?.imageId || "tablet"]);
    setMatchedArtifact(artifact || null);
    setMatchedCiv(civ || null);
    setConfidence(100); // Known artifact
    setMode("browse");
    
    // Start auto-scan
    setIsScanning(true);
    setScanComplete(false);
  };

  const handleScanComplete = () => {
    setIsScanning(false);
    setScanComplete(true);
  };

  const reset = () => {
    setMode("upload");
    setUploadStep("upload");
    setImagePreview(null);
    setSelectedArtifactId(null);
    setMatchedArtifact(null);
    setMaterial("");
    setCategory("");
    setIsScanning(false);
    setScanComplete(false);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-display font-bold text-foreground">Artifact Analysis Lab</h2>
          <p className="text-muted-foreground font-mono text-sm mt-1">
            "Digital artifact analysis allows archaeologists to understand objects before physical handling, reducing damage."
          </p>
        </div>
        {(scanComplete || mode === "browse") && (
          <Button variant="ghost" onClick={reset} className="font-mono text-xs hover:bg-primary/10 hover:text-primary">
            <ArrowLeft className="w-4 h-4 mr-2" />
            NEW ANALYSIS
          </Button>
        )}
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* LEFT COLUMN: Main Interaction Area (Upload or Scan View) */}
        <div className="lg:col-span-7 space-y-6">
          <Card className="overflow-hidden bg-black/40 border-primary/20 relative min-h-[500px] flex flex-col shadow-2xl">
            <AnimatePresence mode="wait">
              {!imagePreview ? (
                /* UPLOAD STATE */
                <motion.div 
                  key="upload-placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 flex flex-col items-center justify-center p-8 space-y-6 text-center"
                >
                  <div className="w-24 h-24 rounded-full bg-primary/5 flex items-center justify-center border border-dashed border-primary/30 relative">
                    <ScanLine className="w-10 h-10 text-primary/50 animate-pulse" />
                    <div className="absolute inset-0 rounded-full border-t border-primary/30 animate-spin duration-3000" />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-xl font-display font-bold text-foreground">Initiate Digital Scan</h3>
                    <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                      Upload an image of an artifact to identify its origin, age, and cultural significance without risking physical damage.
                    </p>
                  </div>

                  <div className="flex gap-4">
                     <Button onClick={() => fileInputRef.current?.click()} className="bg-primary text-primary-foreground hover:bg-primary/90">
                      <Upload className="w-4 h-4 mr-2" /> Upload Image
                    </Button>
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      className="hidden" 
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </div>

                  <div className="pt-8 w-full">
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-border" /></div>
                      <div className="relative flex justify-center text-xs uppercase"><span className="bg-background px-2 text-muted-foreground font-mono">Or select from archive</span></div>
                    </div>
                    
                    <div className="grid grid-cols-4 gap-4 mt-6">
                      {artifactsData.map((artifact) => (
                        <div 
                          key={artifact.id}
                          onClick={() => handleGridSelect(artifact.id)}
                          className="group cursor-pointer relative aspect-square rounded overflow-hidden border border-border hover:border-primary/50 transition-all"
                        >
                          <img src={imageMap[artifact.imageId]} alt={artifact.name} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                          <span className="absolute bottom-1 left-1 text-[10px] font-mono text-white/70">{artifact.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ) : (
                /* PREVIEW / SCANNING STATE */
                <motion.div key="scanner" className="relative w-full h-full flex-1 bg-black">
                   <Scanner 
                      imageUrl={imagePreview} 
                      isScanning={isScanning} 
                      onScanComplete={mode === "browse" ? handleScanComplete : undefined}
                      className="w-full h-full object-contain"
                    />
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </div>

        {/* RIGHT COLUMN: Controls & Results */}
        <div className="lg:col-span-5 space-y-6">
          <AnimatePresence mode="wait">
            {/* 1. VERIFY STEP (Upload Mode Only) */}
            {uploadStep === "verify" && mode === "upload" && (
              <motion.div
                key="verify-controls"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
                  <CardHeader>
                    <CardTitle className="font-mono text-sm uppercase text-primary flex items-center gap-2">
                      <Search className="w-4 h-4" /> Calibrate Analysis
                    </CardTitle>
                    <CardDescription>Select visual tags to assist the recognition algorithm.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
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

                    <div className="space-y-2">
                      <Label>Visible Condition</Label>
                      <Select onValueChange={setCondition} value={condition}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select condition..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="intact">Intact / Complete</SelectItem>
                          <SelectItem value="fragmented">Fragmented / Broken</SelectItem>
                          <SelectItem value="weathered">Weathered / Eroded</SelectItem>
                          <SelectItem value="restored">Restored</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button 
                      className="w-full mt-4 bg-primary text-primary-foreground hover:bg-primary/90"
                      onClick={handleUploadAnalyze}
                      disabled={!material || !category || !condition || isScanning}
                    >
                      {isScanning ? "PROCESSING..." : "RUN ANALYSIS"} <ScanLine className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* 2. RESULT STEP (Both Modes) */}
            {(scanComplete || (uploadStep === "result" && matchedArtifact)) && (
               <motion.div 
                key="result-display"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ staggerChildren: 0.1 }}
                className="space-y-4"
              >
                {/* Confidence Badge */}
                <div className="flex items-center gap-4 mb-4">
                  <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/30 flex gap-2 py-1.5 px-3">
                    <CheckCircle2 className="w-4 h-4" /> ANALYSIS COMPLETE
                  </Badge>
                  
                  <div className="flex-1 flex items-center gap-2">
                    <span className="text-xs font-mono text-muted-foreground">CONFIDENCE</span>
                    <div className="h-2 flex-1 bg-secondary/10 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${confidence}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-full bg-primary shadow-[0_0_10px_rgba(0,255,255,0.5)]"
                      />
                    </div>
                    <span className="text-xs font-mono text-primary font-bold">{confidence}%</span>
                  </div>
                </div>

                {/* Main Identity */}
                <div>
                  <h1 className="text-4xl font-display font-bold text-foreground mb-2">{matchedArtifact!.name}</h1>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground font-mono">
                    <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {matchedArtifact!.age}</span>
                    <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {matchedArtifact!.location}</span>
                  </div>
                </div>

                {/* Details Cards */}
                <Card className="bg-primary/5 border-primary/20">
                  <CardHeader className="pb-2 pt-4">
                    <CardTitle className="text-xs font-mono text-primary uppercase">Likely Purpose</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm font-medium text-foreground/90">{matchedArtifact!.purpose}</p>
                  </CardContent>
                </Card>

                <Card className="bg-secondary/5 border-secondary/20">
                   <CardHeader className="pb-2 pt-4">
                    <CardTitle className="text-xs font-mono text-secondary uppercase">Historical Significance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {matchedArtifact!.whyItMatters}
                    </p>
                  </CardContent>
                </Card>

                <div className="p-4 rounded-lg bg-card border border-border flex gap-3 items-start">
                  <div className="bg-blue-500/20 p-2 rounded-full">
                    <Hammer className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-sm mb-0.5">Civilization Match</h4>
                    <p className="text-xs text-muted-foreground mb-3">
                      Identified features consistent with <span className="text-foreground font-medium">{matchedCiv?.name}</span> craftsmanship ({matchedCiv?.period}).
                    </p>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="text-xs h-7 border-blue-500/30 hover:bg-blue-500/10"
                      onClick={() => navigate("/civilizations")}
                    >
                      <ExternalLink className="w-3 h-3 mr-1" /> Explore Civilization
                    </Button>
                  </div>
                </div>

              </motion.div>
            )}

            {/* 3. EMPTY STATE (Scanning) */}
            {isScanning && (
              <motion.div
                 key="scanning-status"
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 className="h-full flex flex-col items-center justify-center p-12 text-center opacity-50 space-y-4 min-h-[300px]"
              >
                <div className="w-16 h-16 rounded-full border-4 border-dashed border-primary/30 animate-spin" />
                <p className="font-mono text-sm text-primary">Running recognition algorithms...</p>
                <div className="text-xs font-mono text-muted-foreground space-y-1">
                  <p>COMPARING TEXTURES...</p>
                  <p>MATCHING GEOMETRY...</p>
                  <p>VERIFYING DATABASE...</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
