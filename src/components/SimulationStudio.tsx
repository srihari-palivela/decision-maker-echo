import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { 
  Play, 
  Users, 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  MessageSquare,
  AlertTriangle,
  CheckCircle,
  Clock,
  ArrowRight,
  User,
  Bot,
  Pause,
  Settings,
  Square
} from "lucide-react";
import { Persona } from "./PersonaCard";
import { ConversationAgent, InsightAgent, CONVERSATION_STAGES as SERVICE_STAGES } from '@/services/agentService';
import { useToast } from '@/hooks/use-toast';

interface ConversationStage {
  stage_id: string;
  stage_label: string;
  psych_goal: string;
  mr_goal: string;
  completed: boolean;
  current: boolean;
  prompt?: string;
  response?: string;
  log_fields?: Record<string, any>;
}

interface PersonaConversation {
  personaId: string;
  simulationName: string;
  startTime: Date;
  currentStage: string;
  stages: ConversationStage[];
  overallSentiment: "positive" | "negative" | "neutral";
  currentScore: number;
  status: "running" | "completed" | "paused";
}

interface SimulationResult {
  personaId: string;
  sentiment: "positive" | "negative" | "neutral";
  score: number;
  keyQuote: string;
  objections: string[];
  reasoning: string;
}

const CONVERSATION_STAGES = [
  {
    stage_id: "SCR",
    stage_label: "Screener",
    psych_goal: "Ensure persona fit; trigger minimal self-disclosure to prime trust.",
    mr_goal: "Quota control for vertical, GMV, payment mix."
  },
  {
    stage_id: "RAP",
    stage_label: "Rapport Building",
    psych_goal: "Lower defensiveness (Social Penetration Theory).",
    mr_goal: "Increase openness for later probing; collect warm-up verbatim."
  },
  {
    stage_id: "CAT",
    stage_label: "Category & Context Framing",
    psych_goal: "Provide concrete anchor (Encoding Specificity).",
    mr_goal: "Document current PSP stack & NPS baseline."
  },
  {
    stage_id: "KPI_AFF",
    stage_label: "Business KPIs + Affective Baseline",
    psych_goal: "Surface core success metrics *and* first-order feelings toward them.",
    mr_goal: "Importance / satisfaction gap matrix."
  },
  {
    stage_id: "PNI_COG",
    stage_label: "Pain & Needs + Cognitive Elaboration",
    psych_goal: "Evoke pain memories; identify heuristics (Prospect Theory).",
    mr_goal: "Code unmet-need frequency; capture explicit pro/con list."
  },
  {
    stage_id: "MOT",
    stage_label: "Motivational Drill-Down",
    psych_goal: "Map stated benefits to intrinsic motives.",
    mr_goal: "Segment by Growth vs. Security drivers."
  },
  {
    stage_id: "CON",
    stage_label: "Concept Exposure",
    psych_goal: "Trigger immediate affect (Somatic Marker).",
    mr_goal: "Top-box interest & verbatim."
  },
  {
    stage_id: "BEN_AFF2",
    stage_label: "Benefit Laddering + Second Affective Check",
    psych_goal: "See if emotion shifts after benefits clarified.",
    mr_goal: "Importance scores per benefit."
  },
  {
    stage_id: "FEA",
    stage_label: "Feature Trade-Off",
    psych_goal: "Force system-2 ranking to override bias.",
    mr_goal: "MaxDiff utilities."
  },
  {
    stage_id: "PRI",
    stage_label: "Pricing Probe",
    psych_goal: "Elicit loss-aversion threshold.",
    mr_goal: "Gabor-Granger elasticity."
  },
  {
    stage_id: "DEF_BAR",
    stage_label: "Defensive / Barrier Check",
    psych_goal: "Uncover hidden objections (Cognitive Dissonance).",
    mr_goal: "Barrier taxonomy frequency."
  },
  {
    stage_id: "EVI",
    stage_label: "Evidence Calibration",
    psych_goal: "Test attitude elasticity with escalating proof.",
    mr_goal: "Proof-impact delta; persuasion score."
  },
  {
    stage_id: "PUR_COM",
    stage_label: "Purchase Intent & Commitment",
    psych_goal: "Leverage Commitment–Consistency; capture intention strength.",
    mr_goal: "5-pt PI scale + adoption window."
  },
  {
    stage_id: "CLOSE",
    stage_label: "Wrap-Up & Snowball",
    psych_goal: "End on positive note; maintain willingness for future waves.",
    mr_goal: "Gather referrals; final verbatim."
  }
];

interface SimulationStudioProps {
  selectedPersonas: Persona[];
  onRunSimulation?: (input: string, personas: Persona[]) => Promise<SimulationResult[]>;
  onSimulationComplete?: (results: any[]) => void;
}

export function SimulationStudio({ selectedPersonas, onRunSimulation, onSimulationComplete }: SimulationStudioProps) {
  const [input, setInput] = useState("");
  const [results, setResults] = useState<SimulationResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [simulationType, setSimulationType] = useState<"feature" | "pricing" | "message">("feature");
  const [activeConversations, setActiveConversations] = useState<PersonaConversation[]>([]);
  const [simulationName, setSimulationName] = useState("");
  const [viewMode, setViewMode] = useState<"setup" | "conversations" | "results">("setup");
  const [showSettings, setShowSettings] = useState(false);
  const { toast } = useToast();

  // Load settings from localStorage
  const getSettings = () => {
    const savedSettings = localStorage.getItem('simulation-settings');
    if (savedSettings) {
      return JSON.parse(savedSettings);
    }
    return {
      openaiApiKey: '',
      conversationModel: 'o3-2025-04-16',
      insightModel: 'o3-2025-04-16',
      maxConcurrentSimulations: 4,
    };
  };

  const simulationPrompts = {
    feature: "Describe the new feature or product change you want to test:",
    pricing: "Describe the pricing model or change you want to validate:",
    message: "Enter the marketing message or positioning you want to test:"
  };

  const generateSimulationName = () => {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const typeNames = { feature: "Feature Test", pricing: "Pricing Test", message: "Message Test" };
    return `${typeNames[simulationType]} - ${timestamp}`;
  };

  const handleRunSimulation = async () => {
    const settings = getSettings();
    
    if (!settings.openaiApiKey) {
      toast({
        title: "API key required",
        description: "Please configure your OpenAI API key in Settings.",
        variant: "destructive",
      });
      return;
    }

    if (!input.trim() || selectedPersonas.length === 0) {
      toast({
        title: "Missing information",
        description: "Please provide simulation details and select personas.",
        variant: "destructive",
      });
      return;
    }
    
    const simName = simulationName || generateSimulationName();
    setSimulationName(simName);
    
    // Initialize conversations for each persona
    const conversations: PersonaConversation[] = selectedPersonas.map(persona => ({
      personaId: persona.id,
      simulationName: simName,
      startTime: new Date(),
      currentStage: "SCR",
      stages: SERVICE_STAGES.map((stage, index) => ({
        ...stage,
        completed: false,
        current: index === 0
      })),
      overallSentiment: "neutral",
      currentScore: 0,
      status: "running"
    }));
    
    setActiveConversations(conversations);
    setViewMode("conversations");
    setIsLoading(true);

    try {
      // Create agents
      const conversationAgent = new ConversationAgent(settings.openaiApiKey, settings.conversationModel);
      const insightAgent = new InsightAgent(settings.openaiApiKey, settings.insightModel);

      // Run simulations in parallel with concurrency limit
      const maxConcurrent = settings.maxConcurrentSimulations;
      const results = [];
      
      for (let i = 0; i < selectedPersonas.length; i += maxConcurrent) {
        const batch = selectedPersonas.slice(i, i + maxConcurrent);
        
        const batchResults = await Promise.all(
          batch.map(async (persona) => {
            try {
              // Run conversation simulation
              const result = await conversationAgent.simulateConversation(persona, input);
              
              // Update UI with conversation progress
              result.conversation_turns.forEach((turn, index) => {
                setTimeout(() => {
                  setActiveConversations(prev => 
                    prev.map(conv => conv.personaId === persona.id ? 
                      { 
                        ...conv,
                        currentStage: turn.stage,
                        overallSentiment: turn.sentiment_score > 0.3 ? "positive" : 
                                        turn.sentiment_score < -0.3 ? "negative" : "neutral",
                        currentScore: Math.min(100, ((index + 1) / result.conversation_turns.length) * 100),
                        status: index === result.conversation_turns.length - 1 ? "completed" : "running",
                        stages: conv.stages.map((stage, idx) => ({
                          ...stage,
                          completed: idx <= index,
                          current: idx === index,
                          prompt: idx === index ? turn.prompt : stage.prompt,
                          response: idx === index ? turn.response : stage.response
                        }))
                      } : conv
                    )
                  );
                }, index * 1000); // Stagger updates
              });

              return {
                personaId: persona.id,
                sentiment: result.final_sentiment > 0.3 ? "positive" : 
                         result.final_sentiment < -0.3 ? "negative" : "neutral",
                score: result.insights.intent_score * 10,
                keyQuote: result.conversation_turns[result.conversation_turns.length - 1]?.response || "",
                objections: result.insights.barrier_codes,
                reasoning: `Intent: ${result.insights.intent_score}/10, Focus: ${result.insights.regulatory_focus}`,
                rawData: result
              };
            } catch (error) {
              console.error(`Simulation error for ${persona.name}:`, error);
              return null;
            }
          })
        );
        
        results.push(...batchResults.filter(Boolean));
      }

      // Generate insights
      const validResults = results.filter(r => r?.rawData);
      if (validResults.length > 0) {
        const insights = await insightAgent.generateInsights(validResults.map(r => r.rawData));
        
        // Create combined results for dashboard
        const dashboardResults = results.map(result => ({
          personaId: result.personaId,
          simulationName: simName,
          timestamp: new Date(),
          sentiment: result.rawData.final_sentiment,
          keyInsights: [
            `Intent Score: ${result.rawData.insights.intent_score}/10`,
            `Dominant Focus: ${result.rawData.insights.regulatory_focus}`,
            `Key Heuristic: ${result.rawData.insights.dominant_heuristic}`
          ],
          objections: result.rawData.insights.barrier_codes,
          selectedPersonaIds: selectedPersonas.map(p => p.id),
          aggregatedInsights: insights
        }));

        if (onSimulationComplete) {
          onSimulationComplete(dashboardResults);
        }
      }

      setResults(results.filter(Boolean));
      setViewMode("results");
      
      toast({
        title: "Simulation completed",
        description: `Successfully simulated ${results.filter(Boolean).length} personas.`,
      });

    } catch (error) {
      console.error('Simulation error:', error);
      toast({
        title: "Simulation failed",
        description: error instanceof Error ? error.message : "There was an error running the simulation.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const simulateConversationFlow = async (conversations: PersonaConversation[]) => {
    for (let i = 0; i < CONVERSATION_STAGES.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 2000)); // 2 second delay per stage
      
      setActiveConversations(prev => prev.map(conv => {
        const updatedStages = conv.stages.map((stage, index) => ({
          ...stage,
          completed: index < i,
          current: index === i,
          prompt: index === i ? generateStagePrompt(CONVERSATION_STAGES[i], conv.personaId) : stage.prompt,
          response: index === i ? generateStageResponse(CONVERSATION_STAGES[i], conv.personaId) : stage.response
        }));
        
        return {
          ...conv,
          currentStage: CONVERSATION_STAGES[i].stage_id,
          stages: updatedStages,
          currentScore: Math.min(100, conv.currentScore + Math.random() * 15),
          overallSentiment: i > 6 ? (Math.random() > 0.5 ? "positive" : "negative") : "neutral"
        };
      }));
    }
    
    // Complete simulation
    setTimeout(async () => {
      setIsLoading(false);
      try {
        const results = await onRunSimulation(input, selectedPersonas);
        setResults(results);
        setActiveConversations(prev => prev.map(conv => ({ ...conv, status: "completed" as const })));
        setViewMode("results");
      } catch (error) {
        console.error("Simulation failed:", error);
      }
    }, 1000);
  };

  const generateStagePrompt = (stage: any, personaId: string) => {
    const prompts = {
      SCR: "Just to confirm: you process roughly 10-100 Cr a year and operate in D2C, correct?",
      RAP: "How's festival season treating your sales team this year?",
      CAT: "Which payment providers do you currently use and how satisfied are you?",
      KPI_AFF: "Rank these outcomes 1-5 on importance: Conversion, Cost, Compliance, Cash-flow.",
      PNI_COG: "What's the single biggest pain in payments today?",
      MOT: "If checkout success jumped 5 pp, what would that really do for you?",
      CON: "Here's our UPI Credit-on-Autopay solution. First reaction?",
      BEN_AFF2: "On a 1-5 scale, how valuable is instant T+0 settlement?",
      FEA: "What's more critical: instant settlement or AI retry routing?",
      PRI: "At +5 bps MDR, how likely are you to adopt?",
      DEF_BAR: "What would make you hesitate or say no?",
      EVI: "If I showed a peer case study with +35% CVR, does that change your view?",
      PUR_COM: "On a 1-10 scale, how likely are you to pilot in the next 90 days?",
      CLOSE: "Anything we didn't cover that you think is crucial?"
    };
    return prompts[stage.stage_id as keyof typeof prompts] || "Continue the conversation...";
  };

  const generateStageResponse = (stage: any, personaId: string) => {
    const responses = {
      SCR: "Yes, that's correct. We're in D2C fashion, around 50 Cr annually.",
      RAP: "It's been intense! Sales are up 40% but payment failures are killing us.",
      CAT: "We use PayU primarily, some Paytm. I'd rate satisfaction around 6/10.",
      KPI_AFF: "Conversion is 5/5 critical. Cost is 4/5. Compliance 3/5. Cash-flow 4/5.",
      PNI_COG: "Payment failures during high traffic. We lose 15% of sales to UPI timeouts.",
      MOT: "It would directly impact our unit economics. Could mean 2-3 Cr more revenue.",
      CON: "Interesting... but I'm concerned about the additional MDR cost.",
      BEN_AFF2: "T+0 settlement? That's valuable, maybe 4/5. Cash flow is important.",
      FEA: "AI retry routing sounds more critical for our conversion issues.",
      PRI: "At +5 bps... maybe 6/10 likely. Need to see the conversion uplift data.",
      DEF_BAR: "Integration complexity and proving ROI to my CFO.",
      EVI: "+35% CVR is impressive. That changes things significantly. Maybe 8/10 now.",
      PUR_COM: "With that data, I'd say 7/10 likely for a pilot in Q1.",
      CLOSE: "Just need to understand onboarding timeline and support."
    };
    return responses[stage.stage_id as keyof typeof responses] || "Let me think about that...";
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
      {/* Navigation Tabs */}
      <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as any)}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="setup">Setup</TabsTrigger>
          <TabsTrigger value="conversations" disabled={activeConversations.length === 0}>
            Live Conversations
          </TabsTrigger>
          <TabsTrigger value="results" disabled={results.length === 0}>
            Results
          </TabsTrigger>
        </TabsList>

        <TabsContent value="setup">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Play className="h-5 w-5" />
                Simulation Studio
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Simulation Name</label>
                <input
                  type="text"
                  placeholder="Auto-generated name..."
                  value={simulationName}
                  onChange={(e) => setSimulationName(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md text-sm"
                />
              </div>

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
                      Start Simulation
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="conversations">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Live Conversations - {simulationName}
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Following psychology-grounded interview ontology across {SERVICE_STAGES.length} stages
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {activeConversations.map((conversation) => {
                  const persona = selectedPersonas.find(p => p.id === conversation.personaId);
                  if (!persona) return null;

                  const currentStageIndex = conversation.stages.findIndex(s => s.current);
                  const completedStages = conversation.stages.filter(s => s.completed).length;
                  const progressPercent = (completedStages / SERVICE_STAGES.length) * 100;

                  return (
                    <Card key={conversation.personaId} className="border-l-4 border-l-primary">
                      <CardContent className="pt-4">
                        <div className="space-y-4">
                          {/* Persona Header */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-10 w-10">
                                <AvatarFallback className="bg-gradient-primary text-white text-sm">
                                  {persona.name.substring(0, 2)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <h4 className="font-medium">{persona.name}</h4>
                                <p className="text-sm text-muted-foreground">{persona.title}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant={conversation.status === "running" ? "default" : "secondary"}>
                                {conversation.status === "running" ? (
                                  <>
                                    <Clock className="h-3 w-3 mr-1 animate-pulse" />
                                    Running
                                  </>
                                ) : conversation.status === "completed" ? (
                                  <>
                                    <CheckCircle className="h-3 w-3 mr-1" />
                                    Completed
                                  </>
                                ) : (
                                  <>
                                    <Pause className="h-3 w-3 mr-1" />
                                    Paused
                                  </>
                                )}
                              </Badge>
                              <span className="text-sm font-medium">
                                Score: {conversation.currentScore.toFixed(0)}/100
                              </span>
                            </div>
                          </div>

                          {/* Progress Bar */}
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Stage: {conversation.currentStage}</span>
                              <span>{completedStages}/{SERVICE_STAGES.length} completed</span>
                            </div>
                            <Progress value={progressPercent} className="h-2" />
                          </div>

                          {/* Current Stage Details */}
                          {currentStageIndex >= 0 && (
                            <div className="space-y-3 border rounded-lg p-4 bg-muted/50">
                              <div className="flex items-center gap-2">
                                <Badge variant="outline">
                                  {conversation.stages[currentStageIndex].stage_label}
                                </Badge>
                                <ArrowRight className="h-4 w-4 text-muted-foreground" />
                              </div>
                              
                              <div className="text-xs text-muted-foreground">
                                <strong>Psychology:</strong> {conversation.stages[currentStageIndex].psych_goal}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                <strong>Research:</strong> {conversation.stages[currentStageIndex].mr_goal}
                              </div>

                              {/* Conversation Exchange */}
                              {conversation.stages[currentStageIndex].prompt && (
                                <div className="space-y-2">
                                  <div className="flex items-start gap-2">
                                    <Bot className="h-4 w-4 mt-1 text-primary flex-shrink-0" />
                                    <div className="text-sm bg-background rounded p-2 border flex-1">
                                      {conversation.stages[currentStageIndex].prompt}
                                    </div>
                                  </div>
                                  
                                  {conversation.stages[currentStageIndex].response && (
                                    <div className="flex items-start gap-2">
                                      <User className="h-4 w-4 mt-1 text-muted-foreground flex-shrink-0" />
                                      <div className="text-sm bg-muted rounded p-2 flex-1">
                                        {conversation.stages[currentStageIndex].response}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          )}

                          {/* Stage Timeline */}
                          <div className="flex flex-wrap gap-1">
                            {conversation.stages.map((stage, index) => (
                              <Badge 
                                key={stage.stage_id} 
                                variant={stage.completed ? "default" : stage.current ? "secondary" : "outline"}
                                className="text-xs"
                              >
                                {stage.stage_id}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="results">

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Simulation Results - {simulationName}
              </CardTitle>
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
              <div className="space-y-4">
                {results.map((result, index) => {
                  const persona = selectedPersonas.find(p => p.id === result.personaId);
                  if (!persona) return null;

                  return (
                    <Card key={index} className="border-l-4 border-l-primary/20">
                      <CardContent className="pt-4">
                        <div className="flex items-start gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-gradient-primary text-white text-sm">
                              {persona.name.substring(0, 2)}
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
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}