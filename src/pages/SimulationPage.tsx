import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SimulationStudio } from "@/components/SimulationStudio";
import { PersonaCard, Persona } from "@/components/PersonaCard";
import { mockPersonas } from "@/data/mockPersonas";
import { Users, Brain, Plus } from "lucide-react";

// Mock AI simulation function
const mockAISimulation = async (input: string, personas: Persona[]) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  return personas.map(persona => {
    // Mock sentiment analysis based on persona traits
    const score = Math.floor(Math.random() * 100);
    const sentiment = score > 70 ? "positive" : score > 40 ? "neutral" : "negative";
    
    const mockQuotes = {
      "positive": [
        "This looks promising for our use case",
        "I can see the value proposition clearly",
        "This addresses our key pain points",
        "The ROI potential seems strong"
      ],
      "neutral": [
        "Need to evaluate this further",
        "Interesting but requires more analysis", 
        "Has potential but concerned about implementation",
        "Worth considering alongside other options"
      ],
      "negative": [
        "Doesn't align with our priorities",
        "Too risky for our current situation",
        "Concerns about scalability and cost",
        "Not convinced this solves our problems"
      ]
    };

    const mockObjections = [
      "Pricing concerns", "Implementation complexity", "Security questions", 
      "Integration challenges", "Team training", "Vendor reliability"
    ];

    return {
      personaId: persona.id,
      sentiment: sentiment as "positive" | "negative" | "neutral",
      score,
      keyQuote: mockQuotes[sentiment][Math.floor(Math.random() * mockQuotes[sentiment].length)],
      objections: sentiment === "negative" ? 
        mockObjections.slice(0, Math.floor(Math.random() * 3) + 1) : 
        Math.random() > 0.7 ? mockObjections.slice(0, 1) : [],
      reasoning: `Based on ${persona.name}'s ${persona.decisionStyle.toLowerCase()} decision style and ${persona.primaryMotivation.toLowerCase()}, this ${sentiment} response reflects their ${persona.cognitiveBias}.`
    };
  });
};

export default function SimulationPage() {
  const [selectedPersonas, setSelectedPersonas] = useState<Persona[]>([]);

  const handlePersonaSelect = (persona: Persona) => {
    setSelectedPersonas(prev => {
      const isSelected = prev.some(p => p.id === persona.id);
      if (isSelected) {
        return prev.filter(p => p.id !== persona.id);
      } else {
        return [...prev, persona];
      }
    });
  };

  const handleSelectAll = () => {
    setSelectedPersonas(mockPersonas);
  };

  const handleClearAll = () => {
    setSelectedPersonas([]);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Simulation Studio</h1>
          <p className="text-muted-foreground mt-1">
            Test your ideas against AI-powered persona responses
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Persona Selection */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Select Personas
                  </CardTitle>
                  <Badge variant="secondary">
                    {selectedPersonas.length}/{mockPersonas.length}
                  </Badge>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleSelectAll}
                    disabled={selectedPersonas.length === mockPersonas.length}
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    All
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleClearAll}
                    disabled={selectedPersonas.length === 0}
                  >
                    Clear
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 max-h-[600px] overflow-y-auto">
                {mockPersonas.map((persona) => (
                  <div 
                    key={persona.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                      selectedPersonas.some(p => p.id === persona.id)
                        ? "border-primary bg-primary/5" 
                        : "border-border hover:bg-muted/50"
                    }`}
                    onClick={() => handlePersonaSelect(persona)}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full border-2 ${
                        selectedPersonas.some(p => p.id === persona.id)
                          ? "bg-primary border-primary" 
                          : "border-muted-foreground"
                      }`} />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{persona.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{persona.title}</p>
                        <p className="text-xs text-primary truncate">{persona.company}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Simulation Studio */}
          <div className="lg:col-span-2">
            <SimulationStudio
              selectedPersonas={selectedPersonas}
              onRunSimulation={mockAISimulation}
            />
          </div>
        </div>
      </div>
    </div>
  );
}