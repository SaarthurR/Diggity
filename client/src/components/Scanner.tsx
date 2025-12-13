import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ScannerProps {
  imageUrl: string;
  isScanning: boolean;
  onScanComplete?: () => void;
  className?: string;
}

export default function Scanner({ imageUrl, isScanning, onScanComplete, className }: ScannerProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isScanning) {
      setProgress(0);
      return;
    }

    const duration = 3000; // 3 seconds scan
    const interval = 50;
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      setProgress((currentStep / steps) * 100);

      if (currentStep >= steps) {
        clearInterval(timer);
        if (onScanComplete) onScanComplete();
      }
    }, interval);

    return () => clearInterval(timer);
  }, [isScanning, onScanComplete]);

  return (
    <div className={cn("relative overflow-hidden rounded-lg border border-border bg-black", className)}>
      <img 
        src={imageUrl} 
        alt="Artifact" 
        className={cn(
          "w-full h-full object-cover transition-opacity duration-500",
          isScanning ? "opacity-60" : "opacity-100"
        )}
      />
      
      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none opacity-30" />

      {/* Scanning Bar */}
      {isScanning && (
        <>
          <motion.div
            className="absolute top-0 left-0 right-0 h-1 bg-primary shadow-[0_0_20px_rgba(0,255,255,0.8)] z-20"
            animate={{ top: ["0%", "100%", "0%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
          
          {/* Data overlay text */}
          <div className="absolute bottom-4 left-4 font-mono text-xs text-primary z-30 bg-black/70 px-2 py-1 rounded border border-primary/30">
            SCANNING... {Math.round(progress)}%
            <br />
            <span className="opacity-70 text-[10px]">
              {Math.random().toString(36).substring(7).toUpperCase()} :: 
              ANALYZING MATRICES
            </span>
          </div>
        </>
      )}

      {/* Corner Brackets (HUD style) */}
      <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-primary/50" />
      <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-primary/50" />
      <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-primary/50" />
      <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-primary/50" />
    </div>
  );
}
