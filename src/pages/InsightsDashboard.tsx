import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
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
  Download
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
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ScatterChart,
  Scatter,
  ResponsiveContainer
} from "recharts";
import { useState } from "react";

export default function InsightsDashboard() {
  const [selectedCategory, setSelectedCategory] = useState<'psychographic' | 'decision' | 'firmographic'>('psychographic');
  
  // Enhanced mock data with detailed category analysis
  const mockData = {
    overallSentiment: {
      positive: 62,
      neutral: 23, 
      negative: 15
    },
    avgScore: 74,
    totalSimulations: 47,
    
    // Psychographic Analysis
    psychographicInsights: {
      dominantFears: [
        { fear: "PaymentFailureLoss", personas: 6, avgSentiment: 45, intensity: "high" },
        { fear: "CashFlowCrunch", personas: 5, avgSentiment: 38, intensity: "high" },
        { fear: "IntegrationOverhead", personas: 3, avgSentiment: 55, intensity: "medium" },
        { fear: "RegulatoryNonCompliance", personas: 2, avgSentiment: 32, intensity: "high" }
      ],
      motivations: [
        { motivation: "CheckoutConversionBoost", personas: 8, avgSentiment: 78, resonance: "strong" },
        { motivation: "FasterSettlement", personas: 6, avgSentiment: 72, resonance: "strong" },
        { motivation: "WorkingCapitalAccess", personas: 4, avgSentiment: 65, resonance: "medium" },
        { motivation: "MultiPaymentCoverage", personas: 3, avgSentiment: 58, resonance: "medium" }
      ],
      cognitivePatterns: [
        { pattern: "LossAversionHigh", prevalence: 45, positiveResponse: 35 },
        { pattern: "SocialProofReliance", prevalence: 38, positiveResponse: 68 },
        { pattern: "StatusQuoBias", prevalence: 32, positiveResponse: 28 },
        { pattern: "OptimismBias", prevalence: 25, positiveResponse: 72 }
      ]
    },
    
    // Decision Making Analysis
    decisionStyleInsights: {
      processingStyles: [
        { style: "DataDriven", count: 7, avgScore: 82, conversionRate: 71 },
        { style: "Intuitive", count: 5, avgScore: 68, conversionRate: 45 },
        { style: "Hybrid", count: 4, avgScore: 75, conversionRate: 58 }
      ],
      decisionSpeed: [
        { speed: "Immediate", personas: 2, successRate: 85, concerns: ["Limited analysis"] },
        { speed: "Rapid", personas: 6, successRate: 72, concerns: ["Integration complexity"] },
        { speed: "Standard", personas: 5, successRate: 68, concerns: ["Cost validation"] },
        { speed: "Deliberate", personas: 3, successRate: 78, concerns: ["Security audit"] }
      ],
      proofRequirements: [
        { requirement: "CaseStudyBenchmark", personas: 8, satisfaction: 75 },
        { requirement: "DashboardMetricsReview", personas: 6, satisfaction: 68 },
        { requirement: "PilotIntegration", personas: 4, satisfaction: 82 },
        { requirement: "FullSecurityAudit", personas: 2, satisfaction: 90 }
      ]
    },
    
    // Firmographic Analysis
    firmographicInsights: {
      companySize: [
        { size: "MicroStartup_<10", count: 4, avgSentiment: 85, topConcern: "Cost" },
        { size: "Small_10-50", count: 6, avgSentiment: 72, topConcern: "Integration" },
        { size: "Growth_50-200", count: 4, avgSentiment: 68, topConcern: "Scalability" },
        { size: "ScaleUp_200-1K", count: 2, avgSentiment: 75, topConcern: "Compliance" }
      ],
      industries: [
        { industry: "D2C_Ecommerce", personas: 5, sentiment: 78, adoptionRate: 72 },
        { industry: "SaaS_Software", personas: 4, sentiment: 75, adoptionRate: 68 },
        { industry: "FinTech_NBFC", personas: 3, sentiment: 65, adoptionRate: 58 },
        { industry: "EdTech", personas: 2, sentiment: 72, adoptionRate: 65 },
        { industry: "Gaming", personas: 2, sentiment: 82, adoptionRate: 75 }
      ],
      fundingStage: [
        { stage: "Bootstrapped", count: 4, riskAppetite: "Low", avgScore: 65 },
        { stage: "Seed", count: 5, riskAppetite: "Medium", avgScore: 72 },
        { stage: "Series_A-B", count: 4, riskAppetite: "Medium", avgScore: 78 },
        { stage: "Series_C-D", count: 3, riskAppetite: "High", avgScore: 75 }
      ]
    },
    
    // Cross-category insights
    crossCategoryInsights: [
      {
        title: "Fear-driven personas prefer gradual rollouts",
        description: "Personas with high loss aversion show 40% better adoption when offered pilot integration options",
        impact: "high",
        categories: ["psychographic", "decision"]
      },
      {
        title: "FinTech companies demand stronger proof",
        description: "Regulated industries require 2.3x more validation steps before commitment",
        impact: "medium", 
        categories: ["firmographic", "decision"]
      },
      {
        title: "Growth-stage companies prioritize speed",
        description: "Series A-B startups show 35% preference for rapid deployment over thorough evaluation",
        impact: "high",
        categories: ["firmographic", "psychographic"]
      }
    ]
  };

  const chartConfig = {
    sentiment: {
      label: "Sentiment",
      color: "hsl(var(--primary))",
    },
    personas: {
      label: "Personas",
      color: "hsl(var(--secondary))",
    },
    positive: {
      label: "Positive",
      color: "hsl(var(--success))",
    },
    negative: {
      label: "Negative", 
      color: "hsl(var(--destructive))",
    },
    neutral: {
      label: "Neutral",
      color: "hsl(var(--muted-foreground))",
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
              Deep behavioral analysis across persona categories
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

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="hover-scale">
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-2xl font-bold">{mockData.avgScore}</p>
                  <p className="text-sm text-muted-foreground">Avg Score</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover-scale">
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-2xl font-bold">{mockData.totalSimulations}</p>
                  <p className="text-sm text-muted-foreground">Simulations</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover-scale">
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-success" />
                <div>
                  <p className="text-2xl font-bold">{mockData.overallSentiment.positive}%</p>
                  <p className="text-sm text-muted-foreground">Positive</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover-scale">
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-2xl font-bold">16</p>
                  <p className="text-sm text-muted-foreground">Active Personas</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Category Analysis Tabs */}
        <Tabs value={selectedCategory} onValueChange={(value) => setSelectedCategory(value as any)} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="psychographic" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              Psychographic
            </TabsTrigger>
            <TabsTrigger value="decision" className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              Decision Style
            </TabsTrigger>
            <TabsTrigger value="firmographic" className="flex items-center gap-2">
              <Building className="h-4 w-4" />
              Firmographic
            </TabsTrigger>
          </TabsList>

          {/* Psychographic Analysis */}
          <TabsContent value="psychographic" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Dominant Fears */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-destructive" />
                    Dominant Fears Impact
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[300px]">
                    <BarChart data={mockData.psychographicInsights.dominantFears}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="fear" tick={{ fontSize: 10 }} />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="avgSentiment" fill="var(--color-sentiment)" />
                    </BarChart>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Motivations */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-success" />
                    Motivation Resonance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[300px]">
                    <BarChart data={mockData.psychographicInsights.motivations}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="motivation" tick={{ fontSize: 10 }} />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="avgSentiment" fill="var(--color-positive)" />
                    </BarChart>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>

            {/* Cognitive Patterns Radar */}
            <Card>
              <CardHeader>
                <CardTitle>Cognitive Bias Patterns</CardTitle>
                <p className="text-sm text-muted-foreground">
                  How different cognitive biases correlate with positive responses
                </p>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[400px]">
                  <RadarChart data={mockData.psychographicInsights.cognitivePatterns}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="pattern" tick={{ fontSize: 10 }} />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10 }} />
                    <Radar 
                      name="Prevalence" 
                      dataKey="prevalence" 
                      stroke="var(--color-primary)" 
                      fill="var(--color-primary)" 
                      fillOpacity={0.2} 
                    />
                    <Radar 
                      name="Positive Response" 
                      dataKey="positiveResponse" 
                      stroke="var(--color-positive)" 
                      fill="var(--color-positive)" 
                      fillOpacity={0.2} 
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <ChartLegend content={<ChartLegendContent />} />
                  </RadarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Decision Style Analysis */}
          <TabsContent value="decision" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Processing Styles */}
              <Card>
                <CardHeader>
                  <CardTitle>Information Processing Styles</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockData.decisionStyleInsights.processingStyles.map((style, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{style.style}</span>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              {style.count} personas
                            </Badge>
                            <span className="text-sm">{style.avgScore}/100</span>
                          </div>
                        </div>
                        <Progress value={style.conversionRate} className="h-2" />
                        <p className="text-xs text-muted-foreground">
                          {style.conversionRate}% conversion rate
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Decision Speed vs Success */}
              <Card>
                <CardHeader>
                  <CardTitle>Decision Speed vs Success Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[300px]">
                    <ScatterChart data={mockData.decisionStyleInsights.decisionSpeed}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="personas" label={{ value: 'Personas', position: 'insideBottom', offset: -5 }} />
                      <YAxis label={{ value: 'Success Rate', angle: -90, position: 'insideLeft' }} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Scatter dataKey="successRate" fill="var(--color-primary)" />
                    </ScatterChart>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>

            {/* Proof Requirements */}
            <Card>
              <CardHeader>
                <CardTitle>Proof Requirements vs Satisfaction</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {mockData.decisionStyleInsights.proofRequirements.map((req, index) => (
                    <div key={index} className="p-4 rounded-lg border bg-muted/50">
                      <h4 className="font-medium text-sm mb-2">{req.requirement}</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">Personas</span>
                          <span className="text-xs font-medium">{req.personas}</span>
                        </div>
                        <Progress value={req.satisfaction} className="h-1" />
                        <p className="text-xs text-muted-foreground">
                          {req.satisfaction}% satisfaction
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Firmographic Analysis */}
          <TabsContent value="firmographic" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Company Size Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle>Company Size Sentiment</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[300px]">
                    <BarChart data={mockData.firmographicInsights.companySize}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="size" tick={{ fontSize: 10 }} />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="avgSentiment" fill="var(--color-primary)" />
                    </BarChart>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Industry Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Industry Adoption Rates</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[300px]">
                    <PieChart>
                      <Pie
                        data={mockData.firmographicInsights.industries}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="adoptionRate"
                        nameKey="industry"
                      >
                        {mockData.firmographicInsights.industries.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={`hsl(var(--primary) / ${0.8 - index * 0.15})`} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <ChartLegend content={<ChartLegendContent />} />
                    </PieChart>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>

            {/* Funding Stage vs Risk */}
            <Card>
              <CardHeader>
                <CardTitle>Funding Stage Risk Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockData.firmographicInsights.fundingStage.map((stage, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg border">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-gradient-primary"></div>
                        <div>
                          <p className="font-medium text-sm">{stage.stage}</p>
                          <p className="text-xs text-muted-foreground">{stage.count} personas</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge 
                          variant={stage.riskAppetite === 'High' ? 'default' : stage.riskAppetite === 'Medium' ? 'secondary' : 'outline'}
                          className="text-xs"
                        >
                          {stage.riskAppetite} Risk
                        </Badge>
                        <div className="text-right">
                          <p className="font-medium text-sm">{stage.avgScore}</p>
                          <p className="text-xs text-muted-foreground">avg score</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Cross-Category Insights */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-primary" />
              Cross-Category Strategic Insights
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Key patterns emerging across psychographic, decision, and firmographic dimensions
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockData.crossCategoryInsights.map((insight, index) => (
                <div 
                  key={index} 
                  className={`p-4 rounded-lg border-l-4 ${
                    insight.impact === 'high' 
                      ? 'border-l-primary bg-primary/5' 
                      : 'border-l-secondary bg-secondary/5'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-sm">{insight.title}</h4>
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant={insight.impact === 'high' ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {insight.impact} impact
                      </Badge>
                      <div className="flex gap-1">
                        {insight.categories.map((cat, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {cat}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{insight.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}