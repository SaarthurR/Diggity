import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { AnalysisProvider } from "@/context/AnalysisContext";
import Layout from "@/components/layout/Layout";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Analysis from "@/pages/Analysis";
import Decoder from "@/pages/Decoder";
import Civilizations from "@/pages/Civilizations";
import Impact from "@/pages/Impact";
import Story from "@/pages/Story";

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/mission" component={Home} />
        <Route path="/analyze" component={Analysis} />
        <Route path="/decoder" component={Decoder} />
        <Route path="/civilizations" component={Civilizations} />
        <Route path="/impact" component={Impact} />
        <Route path="/story" component={Story} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AnalysisProvider>
        <Toaster />
        <Router />
      </AnalysisProvider>
    </QueryClientProvider>
  );
}

export default App;
