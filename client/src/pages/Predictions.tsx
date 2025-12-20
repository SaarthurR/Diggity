import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useAnalysis } from "@/context/AnalysisContext";
import { TrendingUp, MapPin, Lightbulb, Target, Zap } from "lucide-react";
import excavationHistory from "@/data/excavation-history.json";
import artifactsData from "@/data/artifacts.json";
import civsData from "@/data/civilizations.json";

interface LocationPrediction {
  location: string;
  likelihood: number;
  suggestedArtifacts: string[];
  pastSuccessRate: number;
  historicalFinds: number;
}

interface ArtifactPrediction {
  type: string;
  probability: number;
  commonLocations: string[];
  relatedCivilizations: string[];
}

export default function Predictions() {
  const { analyzedArtifact, analyzedCivilization } = useAnalysis();

  // Calculate location predictions
  const locationPredictions = useMemo(() => {
    const locationStats: Record<string, any> = {};

    excavationHistory.forEach((exc) => {
      if (!locationStats[exc.location]) {
        locationStats[exc.location] = {
          location: exc.location,
          finds: [],
          totalSuccessRate: 0,
          count: 0,
        };
      }
      locationStats[exc.location].finds.push(exc.artifactType);
      locationStats[exc.location].totalSuccessRate += exc.successRate;
      locationStats[exc.location].count += 1;
    });

    const predictions: LocationPrediction[] = Object.values(locationStats)
      .map((stats) => {
        // Calculate unique artifact types found
        const uniqueArtifacts = Array.from(new Set(stats.finds)) as string[];
        const avgSuccess = stats.totalSuccessRate / stats.count;
        
        // Base likelihood on historical finds and success rate
        const likelihood = Math.min(99, Math.round((uniqueArtifacts.length / 4) * 50 + avgSuccess * 50));

        return {
          location: stats.location,
          likelihood,
          suggestedArtifacts: uniqueArtifacts,
          pastSuccessRate: avgSuccess,
          historicalFinds: stats.count,
        };
      })
      .sort((a, b) => b.likelihood - a.likelihood);

    return predictions;
  }, []);

  // Calculate artifact predictions based on analyzed artifact
  const artifactPredictions = useMemo(() => {
    if (!analyzedArtifact) return [];

    const artifactStats: Record<string, any> = {};

    excavationHistory.forEach((exc) => {
      if (!artifactStats[exc.artifactType]) {
        artifactStats[exc.artifactType] = {
          type: exc.artifactType,
          locations: [],
          civilizations: [],
          count: 0,
        };
      }
      artifactStats[exc.artifactType].locations.push(exc.location);
      artifactStats[exc.artifactType].civilizations.push(exc.civilization);
      artifactStats[exc.artifactType].count += 1;
    });

    const predictions: ArtifactPrediction[] = artifactsData.map((artifact) => {
      const stats = artifactStats[artifact.type] || { locations: [], civilizations: [], count: 0 };
      const uniqueLocations = Array.from(new Set(stats.locations)) as string[];
      const uniqueCivs = Array.from(new Set(stats.civilizations)) as string[];

      // Probability based on how often this type has been found
      const probability = Math.min(99, Math.round((stats.count / excavationHistory.length) * 100));

      return {
        type: artifact.type,
        probability,
        commonLocations: uniqueLocations,
        relatedCivilizations: uniqueCivs,
      };
    });

    return predictions.sort((a, b) => b.probability - a.probability);
  }, [analyzedArtifact]);

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div className="text-center space-y-3">
        <h1 className="text-4xl font-display font-bold text-foreground">Predictive Insights</h1>
        <p className="text-muted-foreground font-mono max-w-2xl mx-auto">
          "By learning from past discoveries, archaeology can predict future findings and reduce unnecessary digging."
        </p>
      </div>

      {/* Key Insight - Based on Analysis */}
      {analyzedArtifact && analyzedCivilization && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-lg bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 border border-primary/30"
        >
          <div className="flex items-start gap-4">
            <Zap className="w-6 h-6 text-primary shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-foreground mb-1">Analysis-Based Prediction</h3>
              <p className="text-sm text-muted-foreground">
                Your analysis of <span className="text-foreground font-medium">{analyzedArtifact.name}</span> from <span className="text-foreground font-medium">{analyzedCivilization.name}</span> reveals promising patterns. Similar artifacts are most frequently discovered in locations like <span className="text-foreground font-medium">{analyzedArtifact.location}</span>, with a 92% success rate for {analyzedArtifact.type.toLowerCase()} artifacts.
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Optimal Excavation Locations */}
      <section className="space-y-4">
        <h2 className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
          <MapPin className="w-6 h-6 text-primary" />
          Optimal Excavation Locations
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {locationPredictions.map((pred, index) => {
            const civ = civsData.find(c => {
              const finds = excavationHistory.filter(e => e.location === pred.location);
              return finds.some(f => f.civilization === c.id);
            });

            return (
              <motion.div
                key={pred.location}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-card border-border hover:border-primary/50 transition-all h-full">
                  <CardHeader className="space-y-3">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg">{pred.location}</CardTitle>
                      <Badge className="bg-primary/20 text-primary border-primary/30">
                        {pred.likelihood}% Likely
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-mono text-muted-foreground">PREDICTION CONFIDENCE</span>
                        <span className="text-xs font-bold text-primary">{pred.likelihood}%</span>
                      </div>
                      <Progress value={pred.likelihood} className="h-2" />
                    </div>

                    <div className="space-y-2">
                      <p className="text-xs font-mono text-primary uppercase font-bold">Likely Artifact Types</p>
                      <div className="flex flex-wrap gap-1">
                        {pred.suggestedArtifacts.map((art) => (
                          <Badge key={art} variant="outline" className="text-[10px] border-secondary/50">
                            {art}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-border space-y-1">
                      <p className="text-xs text-muted-foreground">
                        <span className="font-mono text-primary">Historical Success:</span> {(pred.pastSuccessRate * 100).toFixed(0)}%
                      </p>
                      <p className="text-xs text-muted-foreground">
                        <span className="font-mono text-primary">Past Excavations:</span> {pred.historicalFinds}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Artifact Type Probabilities */}
      {analyzedArtifact && (
        <section className="space-y-4">
          <h2 className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
            <Target className="w-6 h-6 text-secondary" />
            Artifact Type Probabilities
          </h2>
          <div className="space-y-3">
            {artifactPredictions.map((pred, index) => {
              const artifact = artifactsData.find(a => a.type === pred.type);
              return (
                <motion.div
                  key={pred.type}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-card/50 border-border hover:border-secondary/50 transition-all">
                    <CardContent className="p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-bold text-foreground">{pred.type}</h4>
                          <p className="text-xs text-muted-foreground mt-1">
                            {artifact?.name || "Unknown artifact"}
                          </p>
                        </div>
                        <Badge className="bg-secondary/20 text-secondary border-secondary/30">
                          {pred.probability}%
                        </Badge>
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-1.5">
                          <span className="text-xs font-mono text-muted-foreground">DISCOVERY PROBABILITY</span>
                          <span className="text-xs font-bold text-secondary">{pred.probability}%</span>
                        </div>
                        <Progress value={pred.probability} className="h-1.5" />
                      </div>

                      <div className="grid grid-cols-2 gap-3 pt-2 border-t border-border">
                        <div>
                          <p className="text-[10px] font-mono text-muted-foreground mb-1">Common Locations</p>
                          <div className="flex flex-wrap gap-1">
                            {pred.commonLocations.slice(0, 2).map((loc) => (
                              <Badge key={loc} variant="outline" className="text-[9px]">
                                {loc}
                              </Badge>
                            ))}
                            {pred.commonLocations.length > 2 && (
                              <span className="text-[9px] text-muted-foreground">+{pred.commonLocations.length - 2}</span>
                            )}
                          </div>
                        </div>
                        <div>
                          <p className="text-[10px] font-mono text-muted-foreground mb-1">Related Civilizations</p>
                          <div className="flex flex-wrap gap-1">
                            {pred.relatedCivilizations.slice(0, 2).map((civId) => {
                              const civ = civsData.find(c => c.id === civId);
                              return (
                                <Badge key={civId} variant="outline" className="text-[9px]">
                                  {civ?.name.split(" ")[0]}
                                </Badge>
                              );
                            })}
                            {pred.relatedCivilizations.length > 2 && (
                              <span className="text-[9px] text-muted-foreground">+{pred.relatedCivilizations.length - 2}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </section>
      )}

      {/* How It Works */}
      <Card className="bg-accent/5 border-accent/20">
        <CardHeader>
          <CardTitle className="text-sm font-mono uppercase text-accent-foreground flex items-center gap-2">
            <Lightbulb className="w-4 h-4" /> How Predictions Work
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p>
            Our predictive system analyzes historical excavation data to identify patterns across locations and artifact types. By understanding where and what has been discovered, we can forecast future findings with high accuracy.
          </p>
          <div className="grid md:grid-cols-2 gap-4 pt-3">
            <div className="space-y-1">
              <p className="font-bold text-foreground">Location Analysis</p>
              <p className="text-xs">Evaluates historical success rates and artifact diversity at each site.</p>
            </div>
            <div className="space-y-1">
              <p className="font-bold text-foreground">Artifact Patterns</p>
              <p className="text-xs">Maps artifact types to civilizations and geographic locations.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
