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
  industry: string;
  companySize: string;
  gmv: string;
  geography: string;
  decisionStyle: "Analytical" | "Collaborative" | "Intuitive" | "Decisive";
  primaryFear: string;
  primaryMotivation: string;
  cognitiveBias: string;
  bio: string;
  traits: string[];
}

interface PersonaCardProps {
  persona: Persona;
  isSelected?: boolean;
  onSelect?: (persona: Persona) => void;
  onViewDetails?: (persona: Persona) => void;
}

export function PersonaCard({ persona, isSelected, onSelect, onViewDetails }: PersonaCardProps) {
  const decisionStyleColors = {
    Analytical: "bg-blue-100 text-blue-700",
    Collaborative: "bg-green-100 text-green-700", 
    Intuitive: "bg-purple-100 text-purple-700",
    Decisive: "bg-orange-100 text-orange-700"
  };

  return (
    <Card 
      className={`group relative cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02] ${
        isSelected 
          ? "ring-2 ring-primary shadow-lg bg-gradient-card" 
          : "hover:shadow-md"
      }`}
      onClick={() => onSelect?.(persona)}
    >
      <CardHeader className="pb-3">
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
          
          <Badge 
            variant="secondary" 
            className={decisionStyleColors[persona.decisionStyle]}
          >
            {persona.decisionStyle}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="flex items-center gap-1.5">
            <Building className="h-3 w-3 text-muted-foreground" />
            <span className="text-muted-foreground truncate">{persona.industry}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users className="h-3 w-3 text-muted-foreground" />
            <span className="text-muted-foreground truncate">{persona.companySize}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <DollarSign className="h-3 w-3 text-muted-foreground" />
            <span className="text-muted-foreground truncate">{persona.gmv}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="h-3 w-3 text-muted-foreground" />
            <span className="text-muted-foreground truncate">{persona.geography}</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-start gap-2">
            <Briefcase className="h-3 w-3 text-muted-foreground mt-0.5 flex-shrink-0" />
            <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
              <span className="font-medium">Motivation:</span> {persona.primaryMotivation}
            </p>
          </div>
          <div className="flex items-start gap-2">
            <Brain className="h-3 w-3 text-muted-foreground mt-0.5 flex-shrink-0" />
            <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
              <span className="font-medium">Bias:</span> {persona.cognitiveBias}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-1">
          {persona.traits.slice(0, 3).map((trait, index) => (
            <Badge key={index} variant="outline" className="text-xs px-2 py-0.5">
              {trait}
            </Badge>
          ))}
          {persona.traits.length > 3 && (
            <Badge variant="outline" className="text-xs px-2 py-0.5">
              +{persona.traits.length - 3}
            </Badge>
          )}
        </div>

        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
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
            className="flex-1 text-xs"
            onClick={(e) => {
              e.stopPropagation();
              onSelect?.(persona);
            }}
          >
            {isSelected ? "Selected" : "Select"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}