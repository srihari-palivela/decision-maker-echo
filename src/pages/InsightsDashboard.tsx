import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Brain,
  Target,
  AlertTriangle,
  CheckCircle,
  Heart,
  Zap,
  Building,
  Eye,
  Filter,
  Download,
  DollarSign,
  Clock,
  Shield,
  Lightbulb,
  FileText,
  Percent
} from "lucide-react";
import { 
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent
} from "@/components/ui/chart";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer
} from "recharts";
import { useState, useEffect } from "react";
import { mockPersonas } from "@/data/mockPersonas";

interface PersonaInsight {
  personaId: string;
  personaName: string;
  primaryDecisionKPI: string;
  firstLookSentiment: number;
  netPersuasionShift: number;
  adoptionLikelihood: number;
  adoptionWindow: string;
  acceptableMDRUplift: string;
  topBarrier: string;
  proofRequirement: string;
  mustWinFeature: string;
  oneLiner: string;
}

export default function InsightsDashboard() {
  const [selectedSimulation, setSelectedSimulation] = useState<string>('SIM001');
  const [activeTab, setActiveTab] = useState<'personas' | 'portfolio'>('personas');
  
  // Mock simulation data with selected personas
  const simulations = [
    {
      id: 'SIM001',
      name: 'Magic Checkout Rollout Q4',
      description: 'Testing UPI one-click checkout acceptance',
      selectedPersonaIds: ['P01', 'P02', 'P03', 'P04', 'P05', 'P06', 'P07', 'P08'],
      personas: 8,
      avgScore: 74,
      date: '2024-01-15'
    },
    {
      id: 'SIM002', 
      name: 'Razorpay Capital Launch',
      description: 'Working capital product market fit',
      selectedPersonaIds: ['P01', 'P08', 'P09', 'P12', 'P15'],
      personas: 5,
      avgScore: 68,
      date: '2024-01-08'
    },
    {
      id: 'SIM003',
      name: 'Cross-border Payments Beta',
      description: 'Multi-currency settlement testing',
      selectedPersonaIds: ['P05', 'P06', 'P08', 'P11'],
      personas: 4,
      avgScore: 82,
      date: '2024-01-03'
    }
  ];

  // Generate Layer A: Persona-Level Insights based on simulation results
  const generatePersonaInsights = (simId: string): PersonaInsight[] => {
    const simulation = simulations.find(sim => sim.id === simId);
    if (!simulation) return [];

    const selectedPersonas = simulation.selectedPersonaIds.map(id => 
      mockPersonas.find(p => p.id === id)
    ).filter(Boolean);

    return selectedPersonas.map(persona => {
      // Generate realistic data based on persona characteristics
      const baseScore = Math.random() * 0.4 + 0.3; // 0.3 to 0.7
      const riskAdjustment = persona.psychographicProfile?.riskAppetite === 'High' ? 0.2 : 
                           persona.psychographicProfile?.riskAppetite === 'Low' ? -0.2 : 0;
      const speedAdjustment = persona.decisionMakingStyle?.decisionSpeed === 'Immediate' ? 0.15 : 
                            persona.decisionMakingStyle?.decisionSpeed === 'Deliberate' ? -0.15 : 0;
      
      const firstLookSentiment = Math.min(1, Math.max(-1, baseScore + riskAdjustment));
      const netPersuasionShift = Math.random() * 0.4 - 0.1; // -0.1 to 0.3
      const adoptionLikelihood = Math.round((firstLookSentiment + 1) * 5); // 1-10 scale
      
      const kpiOptions = ['Checkout Conversion', 'Cost Efficiency', 'Compliance', 'Cash-Flow'];
      const primaryDecisionKPI = kpiOptions[Math.floor(Math.random() * kpiOptions.length)];
      
      const barriers = ['Cost', 'Compliance Proof', 'Integration Time', 'Chargeback Risk', 'None'];
      const topBarrier = barriers[Math.floor(Math.random() * barriers.length)];
      
      const proofOptions = ['Case study only', 'Dashboard pilot', 'Full audit', 'No proof needed'];
      const proofRequirement = proofOptions[Math.floor(Math.random() * proofOptions.length)];
      
      const features = ['AI Retry Routing', 'Magic Checkout', 'Risk Engine', 'Multi-currency'];
      const mustWinFeature = features[Math.floor(Math.random() * features.length)];
      
      const mdrUplift = Math.floor(Math.random() * 8) + 1;
      const adoptionWindows = ['Within 30 days', 'Within 90 days', 'Within 6 months', 'Over 6 months'];
      const adoptionWindow = adoptionWindows[Math.floor(Math.random() * adoptionWindows.length)];
      
      return {
        personaId: persona.id,
        personaName: persona.name,
        primaryDecisionKPI,
        firstLookSentiment: Number(firstLookSentiment.toFixed(2)),
        netPersuasionShift: Number(netPersuasionShift.toFixed(2)),
        adoptionLikelihood,
        adoptionWindow,
        acceptableMDRUplift: `≤ +${mdrUplift} bps`,
        topBarrier: topBarrier === 'Cost' ? 'None (cost offset by CVR gain)' : topBarrier,
        proofRequirement,
        mustWinFeature,
        oneLiner: `${persona.name} will adopt ${adoptionWindow.toLowerCase()} if MDR delta ≤${mdrUplift} bps and sees proven uplift.`
      };
    });
  };

  // Layer B: Portfolio Summary Analytics
  const generatePortfolioSummary = (personaInsights: PersonaInsight[]) => {
    // 1. Decision KPI Prevalence
    const kpiCounts = personaInsights.reduce((acc, insight) => {
      acc[insight.primaryDecisionKPI] = (acc[insight.primaryDecisionKPI] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const kpiPrevalence = Object.entries(kpiCounts).map(([kpi, count]) => ({
      kpi,
      percentage: Math.round((count / personaInsights.length) * 100),
      personas: count
    })).sort((a, b) => b.percentage - a.percentage);

    // 2. Price Elasticity Bands
    const mdrBands = personaInsights.reduce((acc, insight) => {
      const mdr = parseInt(insight.acceptableMDRUplift.match(/\d+/)?.[0] || '0');
      if (mdr <= 3) acc['0-3 bps']++;
      else if (mdr <= 6) acc['4-6 bps']++;
      else acc['7 bps+']++;
      return acc;
    }, { '0-3 bps': 0, '4-6 bps': 0, '7 bps+': 0 });

    const priceElasticity = Object.entries(mdrBands).map(([band, count]) => ({
      band,
      personas: count,
      share: Math.round((count / personaInsights.length) * 100)
    }));

    // 3. Barrier Frequency
    const barrierCounts = personaInsights.reduce((acc, insight) => {
      const barrier = insight.topBarrier.includes('None') ? 'Cost' : insight.topBarrier;
      acc[barrier] = (acc[barrier] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const barrierFrequency = Object.entries(barrierCounts).map(([barrier, count]) => ({
      barrier,
      incidence: Math.round((count / personaInsights.length) * 100)
    })).sort((a, b) => b.incidence - a.incidence);

    // 4. Evidence Elasticity
    const evidenceElasticity = [
      { tier: 'Case Study', avgSentimentDelta: '+0.18' },
      { tier: 'Dashboard Pilot', avgSentimentDelta: '+0.31' },
      { tier: 'Full Audit', avgSentimentDelta: '+0.07' }
    ];

    // 5. Persona Clusters
    const clusters = [
      { 
        cluster: 'UPI-Heavy / Conversion-Led', 
        count: 5, 
        keyHandle: '"Show the lift, keep fees ≤ 4 bps."', 
        quickWin: 'Offer Magic Checkout A/B trial.' 
      },
      { 
        cluster: 'Card-Heavy / Compliance-Centric', 
        count: 4, 
        keyHandle: '"Need audit first, fee second."', 
        quickWin: 'Pre-package PCI & RBI cert bundle.' 
      },
      { 
        cluster: 'FX / Cross-Border', 
        count: 3, 
        keyHandle: '"FX cost & chargebacks."', 
        quickWin: 'Highlight spread savings + dispute API.' 
      },
      { 
        cluster: 'Cost-Fixated Mid-Market', 
        count: 4, 
        keyHandle: '"Every bps counts."', 
        quickWin: 'Volume-based rebate table up-front.' 
      }
    ];

    return {
      kpiPrevalence,
      priceElasticity,
      barrierFrequency,
      evidenceElasticity,
      clusters
    };
  };

  const currentSimulation = simulations.find(sim => sim.id === selectedSimulation) || simulations[0];
  const personaInsights = generatePersonaInsights(selectedSimulation);
  const portfolioSummary = generatePortfolioSummary(personaInsights);

  const chartConfig = {
    percentage: {
      label: "Percentage",
      color: "hsl(var(--primary))",
    },
    personas: {
      label: "Personas",
      color: "hsl(var(--secondary))",
    },
    sentiment: {
      label: "Sentiment",
      color: "hsl(var(--success))",
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Insights Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Comprehensive persona-level insights and portfolio analytics from simulation results
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Simulation Selector */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Simulation Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              {simulations.map((sim) => (
                <div
                  key={sim.id}
                  className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                    selectedSimulation === sim.id 
                      ? 'border-primary bg-primary/5' 
                      : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => setSelectedSimulation(sim.id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-sm">{sim.name}</h3>
                    <Badge variant={selectedSimulation === sim.id ? 'default' : 'outline'}>
                      {sim.avgScore}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{sim.description}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>{sim.personas} personas</span>
                    <span>{sim.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tab Navigation */}
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="personas" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Layer A: Persona-Level Insights
            </TabsTrigger>
            <TabsTrigger value="portfolio" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Layer B: Portfolio Summary
            </TabsTrigger>
          </TabsList>

          {/* Layer A: Persona-Level Insights */}
          <TabsContent value="personas" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-primary" />
                  Persona-Level Insight Template
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Individual persona analysis for {currentSimulation.name}
                </p>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Persona</TableHead>
                        <TableHead>Primary Decision KPI</TableHead>
                        <TableHead>First-Look Sentiment</TableHead>
                        <TableHead>Net Persuasion Shift</TableHead>
                        <TableHead>Adoption Likelihood</TableHead>
                        <TableHead>Adoption Window</TableHead>
                        <TableHead>Acceptable MDR Uplift</TableHead>
                        <TableHead>Top Barrier</TableHead>
                        <TableHead>Proof Requirement</TableHead>
                        <TableHead>Must-Win Feature</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {personaInsights.map((insight, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{insight.personaName}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="text-xs">
                              {insight.primaryDecisionKPI}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge 
                              variant={insight.firstLookSentiment > 0.3 ? 'default' : 
                                     insight.firstLookSentiment < -0.3 ? 'destructive' : 'secondary'}
                              className="text-xs"
                            >
                              {insight.firstLookSentiment > 0 ? '+' : ''}{insight.firstLookSentiment}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge 
                              variant={insight.netPersuasionShift > 0 ? 'default' : 'secondary'}
                              className="text-xs"
                            >
                              {insight.netPersuasionShift > 0 ? '+' : ''}{insight.netPersuasionShift}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{insight.adoptionLikelihood}</span>
                              <span className="text-muted-foreground text-xs">/ 10</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="text-xs">
                              {insight.adoptionWindow}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="text-xs">
                              {insight.acceptableMDRUplift}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-xs max-w-32 truncate">{insight.topBarrier}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="text-xs">
                              {insight.proofRequirement}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="text-xs">
                              {insight.mustWinFeature}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            {/* One-liners */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Persona One-Liners
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {personaInsights.map((insight, index) => (
                    <div key={index} className="p-4 rounded-lg border bg-muted/50">
                      <div className="flex items-start gap-3">
                        <Badge variant="outline" className="text-xs mt-1">
                          {insight.personaId}
                        </Badge>
                        <p className="text-sm italic">"{insight.oneLiner}"</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Layer B: Portfolio Summary */}
          <TabsContent value="portfolio" className="space-y-6">
            {/* Decision KPI Prevalence */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  1. Decision KPI Prevalence
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    {portfolioSummary.kpiPrevalence.map((kpi, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{kpi.kpi}</span>
                          <span className="text-sm font-bold">{kpi.percentage}%</span>
                        </div>
                        <Progress value={kpi.percentage} className="h-2" />
                      </div>
                    ))}
                  </div>
                  <div className="p-4 rounded-lg bg-muted/50">
                    <h4 className="font-medium mb-2">Take-away:</h4>
                    <p className="text-sm text-muted-foreground">
                      Optimising conversion covers nearly half the market; compliance is niche but non-negotiable for those affected.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Price Elasticity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-primary" />
                  2. Price Elasticity Bands
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    {portfolioSummary.priceElasticity.map((band, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                        <div>
                          <p className="font-medium text-sm">{band.band}</p>
                          <p className="text-xs text-muted-foreground">{band.personas} personas</p>
                        </div>
                        <Badge variant="outline" className="text-sm">
                          {band.share}%
                        </Badge>
                      </div>
                    ))}
                  </div>
                  <div className="p-4 rounded-lg bg-muted/50">
                    <h4 className="font-medium mb-2">Take-away:</h4>
                    <p className="text-sm text-muted-foreground">
                      A +3 bps ceiling secures 44%; every extra 3 bps drops adoption by ~13 pp.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Barrier Frequency */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-warning" />
                  3. Barrier Frequency
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <ChartContainer config={chartConfig} className="h-[300px]">
                    <BarChart data={portfolioSummary.barrierFrequency}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="barrier" tick={{ fontSize: 10 }} />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="incidence" fill="var(--color-percentage)" />
                    </BarChart>
                  </ChartContainer>
                  <div className="p-4 rounded-lg bg-muted/50">
                    <h4 className="font-medium mb-2">Take-away:</h4>
                    <p className="text-sm text-muted-foreground">
                      Unit-economics messaging will unlock the largest stuck segment.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Evidence Elasticity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  4. Evidence Elasticity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    {portfolioSummary.evidenceElasticity.map((evidence, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                        <span className="font-medium text-sm">{evidence.tier}</span>
                        <Badge 
                          variant={evidence.avgSentimentDelta.includes('+0.31') ? 'default' : 'outline'}
                          className="text-sm"
                        >
                          Avg Δ Sentiment {evidence.avgSentimentDelta}
                        </Badge>
                      </div>
                    ))}
                  </div>
                  <div className="p-4 rounded-lg bg-muted/50">
                    <h4 className="font-medium mb-2">Take-away:</h4>
                    <p className="text-sm text-muted-foreground">
                      30-day pilot dashboards shift sentiment the most; audits mainly calm already-skeptical buyers.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Persona Clusters */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-primary" />
                  5. Persona Cluster Cheat-Sheet
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {portfolioSummary.clusters.map((cluster, index) => (
                    <div key={index} className="p-4 rounded-lg border">
                      <div className="grid md:grid-cols-4 gap-4 items-center">
                        <div>
                          <h4 className="font-medium text-sm">{cluster.cluster}</h4>
                          <p className="text-xs text-muted-foreground">{cluster.count} personas</p>
                        </div>
                        <div className="text-xs">
                          <span className="text-muted-foreground">Key Handle:</span>
                          <p className="italic">{cluster.keyHandle}</p>
                        </div>
                        <div className="text-xs">
                          <span className="text-muted-foreground">Quick Win:</span>
                          <p>{cluster.quickWin}</p>
                        </div>
                        <Badge variant="outline" className="w-fit">
                          {cluster.count} personas
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Executive Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-primary" />
                  6. Single-Slide Executive Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 p-4 rounded-lg bg-gradient-to-r from-primary/10 to-secondary/10 border">
                  <div className="text-center">
                    <h3 className="text-lg font-bold">80% of personas will pilot if one of two conditions is met:</h3>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <h4 className="font-medium flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">a</span>
                        Path A: Economic Validation
                      </h4>
                      <p className="text-sm text-muted-foreground ml-8">
                        MDR uplift ≤ +4 bps and proven +3 pp conversion
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-secondary text-secondary-foreground text-xs flex items-center justify-center">b</span>
                        Path B: Compliance Assurance
                      </h4>
                      <p className="text-sm text-muted-foreground ml-8">
                        Formal compliance pack delivered with signed SLA
                      </p>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6 pt-4 border-t">
                    <div>
                      <h4 className="font-medium text-sm mb-1">Persuasion Insight:</h4>
                      <p className="text-sm text-muted-foreground">
                        Dashboards beat audits for persuasion (+0.31 vs. +0.07 sentiment).
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm mb-1">Speed Insight:</h4>
                      <p className="text-sm text-muted-foreground">
                        Cost is the #1 blocker; address it early for fastest cycle time.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}