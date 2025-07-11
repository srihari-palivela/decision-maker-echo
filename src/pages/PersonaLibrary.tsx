import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { PersonaCard, Persona } from "@/components/PersonaCard";
import { FilterPanel, FilterOptions } from "@/components/FilterPanel";
import { mockPersonas, filterOptions } from "@/data/mockPersonas";
import { Search, Users, Filter } from "lucide-react";

export default function PersonaLibrary() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPersonas, setSelectedPersonas] = useState<Persona[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<Partial<FilterOptions>>({});
  const [showFilters, setShowFilters] = useState(false);

  const handleFilterChange = (filterType: keyof FilterOptions, value: string, checked: boolean) => {
    setSelectedFilters(prev => {
      const currentValues = prev[filterType] || [];
      if (checked) {
        return { ...prev, [filterType]: [...currentValues, value] };
      } else {
        return { ...prev, [filterType]: currentValues.filter(v => v !== value) };
      }
    });
  };

  const handleClearFilters = () => {
    setSelectedFilters({});
  };

  const handleSelectPersona = (persona: Persona) => {
    setSelectedPersonas(prev => {
      const isSelected = prev.some(p => p.id === persona.id);
      if (isSelected) {
        return prev.filter(p => p.id !== persona.id);
      } else {
        return [...prev, persona];
      }
    });
  };

  const filteredPersonas = useMemo(() => {
    return mockPersonas.filter(persona => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const searchableText = [
          persona.name,
          persona.title,
          persona.company,
          persona.industry,
          persona.primaryMotivation,
          persona.cognitiveBias,
          ...persona.traits
        ].join(' ').toLowerCase();
        
        if (!searchableText.includes(query)) return false;
      }

      // Category filters
      if (selectedFilters.industries?.length && !selectedFilters.industries.includes(persona.industry)) return false;
      if (selectedFilters.companySizes?.length && !selectedFilters.companySizes.includes(persona.companySize)) return false;
      if (selectedFilters.gmvRanges?.length && !selectedFilters.gmvRanges.includes(persona.gmv)) return false;
      if (selectedFilters.geographies?.length && !selectedFilters.geographies.includes(persona.geography)) return false;
      if (selectedFilters.decisionStyles?.length && !selectedFilters.decisionStyles.includes(persona.decisionStyle)) return false;

      return true;
    });
  }, [searchQuery, selectedFilters]);

  const totalSelected = Object.values(selectedFilters).reduce((acc, curr) => acc + (curr?.length || 0), 0);

  return (
    <div className="flex min-h-screen bg-background">
      {/* Filters Sidebar */}
      {showFilters && (
        <div className="w-80 border-r border-border bg-card">
          <FilterPanel
            filters={filterOptions}
            selectedFilters={selectedFilters}
            onFilterChange={handleFilterChange}
            onClearAll={handleClearFilters}
            className="h-full border-0 rounded-none"
          />
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Persona Library</h1>
              <p className="text-muted-foreground mt-1">
                16 AI-generated B2B decision-maker personas based on Razorpay research
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              {selectedPersonas.length > 0 && (
                <Badge variant="secondary" className="px-3 py-1">
                  <Users className="h-3 w-3 mr-1" />
                  {selectedPersonas.length} selected
                </Badge>
              )}
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className={showFilters ? "bg-primary text-primary-foreground" : ""}
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
                {totalSelected > 0 && (
                  <Badge variant="secondary" className="ml-2 text-xs">
                    {totalSelected}
                  </Badge>
                )}
              </Button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search personas by name, role, company, or traits..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Results */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {filteredPersonas.length} of {mockPersonas.length} personas
          </p>
          {selectedPersonas.length > 0 && (
            <Button 
              onClick={() => setSelectedPersonas([])}
              variant="ghost"
              size="sm"
            >
              Clear selection
            </Button>
          )}
        </div>

        {/* Persona Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredPersonas.map((persona) => (
            <PersonaCard
              key={persona.id}
              persona={persona}
              isSelected={selectedPersonas.some(p => p.id === persona.id)}
              onSelect={handleSelectPersona}
              onViewDetails={(persona) => {
                // TODO: Open persona details modal
                console.log('View details for:', persona.name);
              }}
            />
          ))}
        </div>

        {filteredPersonas.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No personas found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
}