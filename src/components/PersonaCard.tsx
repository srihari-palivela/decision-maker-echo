import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building, MapPin, DollarSign, Users, Briefcase, Brain } from "lucide-react";

export interface Persona {
  id: string;
  name: string;
  title: string;
  company: string;
  avatar?: string;
  bio: string;
  psychographicProfile: {
    dominantFear: string;
    primaryMotivation: string;
    cognitiveBiasDominance: string;
    regulatoryFocus: string;
    riskAppetite: string;
    locusOfControl: string;
    socialDominance: string;
    growthMindsetLevel: string;
  };
  decisionMakingStyle: {
    informationProcessingStyle: string;
    decisionOrientation: string;
    proofRequirementLevel: string;
    decisionSpeed: string;
    evaluationHorizon: string;
    stakeholderInvolvement: string;
    vendorPreference: string;
    negotiationStyle: string;
  };
  firmographicProfile: {
    companySizeEmployees: string;
    industryVertical: string;
    annualGMVRange: string;
    fundingStage: string;
    primaryPaymentMix: string;
    geographicFootprint: string;
    growthTrajectory: string;
    techStackMaturity: string;
    integrationComplexity: string;
    complianceBurden: string;
  };
}

interface PersonaCardProps {
  persona: Persona;
  isSelected?: boolean;
  onSelect?: (persona: Persona) => void;
  onViewDetails?: (persona: Persona) => void;
  onEdit?: (persona: Persona) => void;
}

import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';

export function PersonaCard({ persona, isSelected, onSelect, onViewDetails, onEdit }: PersonaCardProps) {
  // Convert persona attributes to spider chart data
  const getSpiderData = (profile: any, maxValue = 5) => {
    return Object.entries(profile).map(([key, value]) => ({
      attribute: key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()),
      value: Math.floor(Math.random() * maxValue) + 1, // Mock scoring for now
      fullMark: maxValue
    }));
  };

  const psychographicData = getSpiderData(persona.psychographicProfile);
  const decisionData = getSpiderData(persona.decisionMakingStyle);
  const firmographicData = getSpiderData(persona.firmographicProfile);

  return (
    <Card 
      className={`group relative transition-all duration-200 hover:shadow-lg ${
        isSelected 
          ? "ring-2 ring-primary shadow-lg bg-gradient-card" 
          : "hover:shadow-md"
      }`}
    >
      {/* Horizontal Layout */}
      <div className="flex p-6 gap-6">
        {/* Left: Basic Info */}
        <div className="flex-shrink-0 w-64 space-y-4">
          <div className="flex items-start gap-3">
            <Avatar className="h-12 w-12 ring-2 ring-background shadow-sm">
              <AvatarImage src={persona.avatar} />
              <AvatarFallback className="bg-gradient-primary text-white font-semibold">
                {persona.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-foreground truncate">{persona.name}</h3>
              <p className="text-sm text-muted-foreground truncate">{persona.title}</p>
              <p className="text-sm font-medium text-primary truncate">{persona.company}</p>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2">
              <Building className="h-3 w-3 text-muted-foreground" />
              <span className="text-muted-foreground">{persona.firmographicProfile.industryVertical}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-3 w-3 text-muted-foreground" />
              <span className="text-muted-foreground">{persona.firmographicProfile.companySizeEmployees}</span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="h-3 w-3 text-muted-foreground" />
              <span className="text-muted-foreground">{persona.firmographicProfile.annualGMVRange}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-3 w-3 text-muted-foreground" />
              <span className="text-muted-foreground">{persona.firmographicProfile.geographicFootprint}</span>
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <Button 
              size="sm" 
              variant="outline" 
              className="flex-1 text-xs"
              onClick={(e) => {
                e.stopPropagation();
                onViewDetails?.(persona);
              }}
            >
              View Details
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              className="flex-1 text-xs"
              onClick={(e) => {
                e.stopPropagation();
                onEdit?.(persona);
              }}
            >
              Edit
            </Button>
            <Button 
              size="sm" 
              className="flex-1 text-xs"
              onClick={(e) => {
                e.stopPropagation();
                onSelect?.(persona);
              }}
            >
              {isSelected ? "Selected" : "Select"}
            </Button>
          </div>
        </div>

        {/* Right: Description and Charts */}
        <div className="flex-1 space-y-4">
          {/* Description */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Description</h4>
            <p className="text-sm text-muted-foreground line-clamp-3">{persona.bio}</p>
          </div>

          {/* Psychographic and Decision Charts Row */}
          <div className="grid grid-cols-2 gap-4">
            {/* Psychographic Chart */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-center">Psychographic</h4>
              <div className="h-32">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={psychographicData.slice(0, 6)}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="attribute" tick={{ fontSize: 8 }} />
                    <PolarRadiusAxis domain={[0, 5]} tick={{ fontSize: 6 }} />
                    <Radar
                      name="Score"
                      dataKey="value"
                      stroke="hsl(var(--primary))"
                      fill="hsl(var(--primary))"
                      fillOpacity={0.3}
                      strokeWidth={2}
                      label={{ fontSize: 8, fill: "hsl(var(--primary))" }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Decision Making Chart */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-center">Decision Style</h4>
              <div className="h-32">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={decisionData.slice(0, 6)}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="attribute" tick={{ fontSize: 8 }} />
                    <PolarRadiusAxis domain={[0, 5]} tick={{ fontSize: 6 }} />
                    <Radar
                      name="Score"
                      dataKey="value"
                      stroke="hsl(262 83% 70%)"
                      fill="hsl(262 83% 70%)"
                      fillOpacity={0.3}
                      strokeWidth={2}
                      label={{ fontSize: 8, fill: "hsl(262 83% 70%)" }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Firmographic Section */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Firmographic</h4>
            <div className="grid grid-cols-5 gap-2">
              <div className="text-center">
                <div className="text-xs text-muted-foreground">Size</div>
                <Badge variant="outline" className="text-xs px-1 py-0 mt-1">
                  {persona.firmographicProfile.companySizeEmployees.split('_')[1] || persona.firmographicProfile.companySizeEmployees}
                </Badge>
              </div>
              <div className="text-center">
                <div className="text-xs text-muted-foreground">Funding</div>
                <Badge variant="outline" className="text-xs px-1 py-0 mt-1">
                  {persona.firmographicProfile.fundingStage.replace('_', ' ')}
                </Badge>
              </div>
              <div className="text-center">
                <div className="text-xs text-muted-foreground">Payment</div>
                <Badge variant="outline" className="text-xs px-1 py-0 mt-1">
                  {persona.firmographicProfile.primaryPaymentMix.split('_')[0]}
                </Badge>
              </div>
              <div className="text-center">
                <div className="text-xs text-muted-foreground">Growth</div>
                <Badge variant="outline" className="text-xs px-1 py-0 mt-1">
                  {persona.firmographicProfile.growthTrajectory.split('_')[0]}
                </Badge>
              </div>
              <div className="text-center">
                <div className="text-xs text-muted-foreground">Tech</div>
                <Badge variant="outline" className="text-xs px-1 py-0 mt-1">
                  {persona.firmographicProfile.techStackMaturity.split('_')[0]}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}