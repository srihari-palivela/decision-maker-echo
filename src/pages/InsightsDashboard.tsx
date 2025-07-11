import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Brain,
  Target,
  AlertTriangle,
  CheckCircle
} from "lucide-react";

export default function InsightsDashboard() {
  // Mock data - in real app this would come from API
  const mockData = {
    overallSentiment: {
      positive: 62,
      neutral: 23, 
      negative: 15
    },
    avgScore: 74,
    totalSimulations: 47,
    keyInsights: [
      "Analytical personas respond 23% more positively to data-driven features",
      "Pricing changes create highest resistance among early-stage startups",
      "Security messaging resonates strongly with fintech decision makers",
      "Decision style correlates strongly with feature adoption likelihood"
    ],
    topConcerns: [
      { concern: "Implementation complexity", percentage: 34 },
      { concern: "Pricing concerns", percentage: 28 },
      { concern: "Security questions", percentage: 22 },
      { concern: "Integration challenges", percentage: 16 }
    ],
    personaPerformance: [
      { name: "Arjun Mehta", company: "PayEase Solutions", avgScore: 85, simulations: 8 },
      { name: "Priya Sharma", company: "QuickCommerce", avgScore: 78, simulations: 6 },
      { name: "Vikram Singh", company: "LogiFlow Systems", avgScore: 72, simulations: 5 },
      { name: "Sneha Patel", company: "FashionForward", avgScore: 69, simulations: 7 }
    ]
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Insights Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Aggregated insights from your persona simulations
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
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

          <Card>
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

          <Card>
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

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <TrendingDown className="h-5 w-5 text-destructive" />
                <div>
                  <p className="text-2xl font-bold">{mockData.overallSentiment.negative}%</p>
                  <p className="text-sm text-muted-foreground">Negative</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Sentiment Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Overall Sentiment Distribution</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span className="text-sm">Positive</span>
                  </div>
                  <span className="text-sm font-medium">{mockData.overallSentiment.positive}%</span>
                </div>
                <Progress value={mockData.overallSentiment.positive} className="h-2" />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Neutral</span>
                  </div>
                  <span className="text-sm font-medium">{mockData.overallSentiment.neutral}%</span>
                </div>
                <Progress value={mockData.overallSentiment.neutral} className="h-2" />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-destructive" />
                    <span className="text-sm">Negative</span>
                  </div>
                  <span className="text-sm font-medium">{mockData.overallSentiment.negative}%</span>
                </div>
                <Progress value={mockData.overallSentiment.negative} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* Top Concerns */}
          <Card>
            <CardHeader>
              <CardTitle>Top Concerns Across Personas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockData.topConcerns.map((concern, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">{concern.concern}</span>
                    <span className="text-sm font-medium">{concern.percentage}%</span>
                  </div>
                  <Progress value={concern.percentage} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Key Insights */}
        <Card>
          <CardHeader>
            <CardTitle>Key Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {mockData.keyInsights.map((insight, index) => (
                <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                  <Brain className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm">{insight}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Persona Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Personas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockData.personaPerformance.map((persona, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center">
                      <span className="text-white text-xs font-medium">
                        {persona.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-sm">{persona.name}</p>
                      <p className="text-xs text-muted-foreground">{persona.company}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge variant="secondary" className="text-xs">
                      {persona.simulations} simulations
                    </Badge>
                    <div className="text-right">
                      <p className="font-medium text-sm">{persona.avgScore}</p>
                      <p className="text-xs text-muted-foreground">avg score</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}