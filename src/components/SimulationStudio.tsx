import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Play, 
  Users, 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  MessageSquare,
  AlertTriangle,
  CheckCircle,
  Clock
} from "lucide-react";
import { Persona } from "./PersonaCard";

interface SimulationResult {
  personaId: string;
  sentiment: "positive" | "negative" | "neutral";
  score: number;
  keyQuote: string;
  objections: string[];
  reasoning: string;
}

interface SimulationStudioProps {
  selectedPersonas: Persona[];
  onRunSimulation: (input: string, personas: Persona[]) => Promise<SimulationResult[]>;
}

export function SimulationStudio({ selectedPersonas, onRunSimulation }: SimulationStudioProps) {
  const [input, setInput] = useState("");
  const [results, setResults] = useState<SimulationResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [simulationType, setSimulationType] = useState<"feature" | "pricing" | "message">("feature");

  const simulationPrompts = {
    feature: "Describe the new feature or product change you want to test:",
    pricing: "Describe the pricing model or change you want to validate:",
    message: "Enter the marketing message or positioning you want to test:"
  };

  const handleRunSimulation = async () => {
    if (!input.trim() || selectedPersonas.length === 0) return;
    
    setIsLoading(true);
    try {
      const results = await onRunSimulation(input, selectedPersonas);
      setResults(results);
    } catch (error) {
      console.error("Simulation failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case "positive": return <TrendingUp className="h-4 w-4 text-success" />;
      case "negative": return <TrendingDown className="h-4 w-4 text-destructive" />;
      default: return <Minus className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive": return "text-success";
      case "negative": return "text-destructive"; 
      default: return "text-muted-foreground";
    }
  };

  const avgScore = results.length > 0 ? results.reduce((acc, r) => acc + r.score, 0) / results.length : 0;
  const sentimentBreakdown = results.reduce((acc, r) => {
    acc[r.sentiment]++;
    return acc;
  }, { positive: 0, negative: 0, neutral: 0 } as Record<string, number>);

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Play className="h-5 w-5" />
            Simulation Studio
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Tabs value={simulationType} onValueChange={(value) => setSimulationType(value as any)}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="feature">Feature</TabsTrigger>
              <TabsTrigger value="pricing">Pricing</TabsTrigger>
              <TabsTrigger value="message">Message</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">
              {simulationPrompts[simulationType]}
            </label>
            <Textarea
              placeholder="Enter your scenario details..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={4}
              className="resize-none"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="h-4 w-4" />
              {selectedPersonas.length} personas selected
            </div>
            <Button 
              onClick={handleRunSimulation}
              disabled={!input.trim() || selectedPersonas.length === 0 || isLoading}
              className="min-w-[120px]"
            >
              {isLoading ? (
                <>
                  <Clock className="h-4 w-4 mr-2 animate-spin" />
                  Running...
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 mr-2" />
                  Run Simulation
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results Section */}
      {(results.length > 0 || isLoading) && (
        <Card>
          <CardHeader>
            <CardTitle>Simulation Results</CardTitle>
            {results.length > 0 && (
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-success"></div>
                  Positive: {sentimentBreakdown.positive}
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-muted-foreground"></div>
                  Neutral: {sentimentBreakdown.neutral}
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-destructive"></div>
                  Negative: {sentimentBreakdown.negative}
                </div>
                <div className="ml-auto font-medium">
                  Avg Score: {avgScore.toFixed(1)}/100
                </div>
              </div>
            )}
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                <div className="text-center py-8">
                  <Clock className="h-8 w-8 animate-spin mx-auto mb-2 text-primary" />
                  <p className="text-muted-foreground">AI analyzing persona responses...</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {results.map((result, index) => {
                  const persona = selectedPersonas.find(p => p.id === result.personaId);
                  if (!persona) return null;

                  return (
                    <Card key={index} className="border-l-4 border-l-primary/20">
                      <CardContent className="pt-4">
                        <div className="flex items-start gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={persona.avatar} />
                            <AvatarFallback className="bg-gradient-primary text-white text-sm">
                              {persona.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          
                          <div className="flex-1 space-y-3">
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-medium">{persona.name}</h4>
                                <p className="text-sm text-muted-foreground">{persona.title}</p>
                              </div>
                              <div className="flex items-center gap-2">
                                {getSentimentIcon(result.sentiment)}
                                <span className={`font-medium ${getSentimentColor(result.sentiment)}`}>
                                  {result.score}/100
                                </span>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Progress value={result.score} className="h-2" />
                              
                              <blockquote className="border-l-2 border-muted pl-4 italic text-muted-foreground">
                                "{result.keyQuote}"
                              </blockquote>
                              
                              <p className="text-sm">{result.reasoning}</p>
                              
                              {result.objections.length > 0 && (
                                <div className="flex flex-wrap gap-1 mt-2">
                                  <Badge variant="outline" className="text-xs">
                                    <AlertTriangle className="h-3 w-3 mr-1" />
                                    Objections
                                  </Badge>
                                  {result.objections.map((objection, i) => (
                                    <Badge key={i} variant="secondary" className="text-xs">
                                      {objection}
                                    </Badge>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}