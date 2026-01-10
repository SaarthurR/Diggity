import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, Compass, Pickaxe, Scan, Database, ArrowRight } from "lucide-react";

const excavationSteps = [
  {
    icon: Compass,
    title: "Discovery",
    description: "Autonomous rover surveys terrain and identifies potential artifact locations using ground-penetrating radar.",
    data: ["Soil composition", "Depth readings", "Spatial coordinates"],
  },
  {
    icon: Pickaxe,
    title: "Careful Excavation",
    description: "Precision mechanical arms extract artifacts with minimal damage, maintaining contextual integrity.",
    data: ["Excavation depth", "Surrounding materials", "Structural integrity"],
  },
  {
    icon: Zap,
    title: "Extraction",
    description: "Objects are gently lifted and secured within the robot's sterile containment chamber.",
    data: ["Object weight", "Fragility assessment", "Stabilization data"],
  },
  {
    icon: Scan,
    title: "Inspection",
    description: "Multi-spectrum imaging captures detailed surface features, wear patterns, and composition.",
    data: ["3D geometry", "Surface texture", "Color spectrum"],
  },
  {
    icon: Database,
    title: "Data Collection",
    description: "All measurements, images, and metadata are transmitted to the digital analysis system.",
    data: ["Material analysis", "Age markers", "Artifact category"],
  },
];

export default function RobotExcavationPipeline() {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-3">
        <h2 className="text-3xl font-display font-bold text-foreground">Excavation Robot System</h2>
        <p className="text-muted-foreground font-mono max-w-2xl mx-auto">
          "The robot is the first step in a data-driven archaeology system."
        </p>
      </div>

      {/* Pipeline Visualization */}
      <div className="relative">
        {/* Connection Lines */}
        <div className="hidden lg:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent pointer-events-none" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 relative z-10">
          {excavationSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <Card className="h-full bg-card border-border hover:border-primary/50 transition-all group">
                  <CardHeader className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <Badge variant="outline" className="text-[10px] h-6">
                        STEP {index + 1}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg font-display">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                    <div className="space-y-2 pt-2 border-t border-border">
                      <p className="text-[10px] font-mono text-primary uppercase font-bold">DATA COLLECTED</p>
                      <ul className="space-y-1">
                        {step.data.map((item, i) => (
                          <li key={i} className="text-xs text-muted-foreground flex items-center gap-2">
                            <span className="w-1 h-1 rounded-full bg-secondary" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                {/* Arrow between steps */}
                {index < excavationSteps.length - 1 && (
                  <div className="hidden lg:flex absolute -right-8 top-12 pointer-events-none">
                    <ArrowRight className="w-5 h-5 text-primary/30" />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
