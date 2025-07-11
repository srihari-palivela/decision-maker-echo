import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { X, Filter } from "lucide-react";

export interface FilterOptions {
  industries: string[];
  companySizes: string[];
  gmvRanges: string[];
  geographies: string[];
  decisionStyles: string[];
}

interface FilterPanelProps {
  filters: FilterOptions;
  selectedFilters: Partial<FilterOptions>;
  onFilterChange: (filterType: keyof FilterOptions, value: string, checked: boolean) => void;
  onClearAll: () => void;
  className?: string;
}

export function FilterPanel({ 
  filters, 
  selectedFilters, 
  onFilterChange, 
  onClearAll,
  className 
}: FilterPanelProps) {
  const totalSelected = Object.values(selectedFilters).reduce((acc, curr) => acc + (curr?.length || 0), 0);

  const FilterSection = ({ 
    title, 
    options, 
    filterKey 
  }: { 
    title: string; 
    options: string[]; 
    filterKey: keyof FilterOptions;
  }) => (
    <div className="space-y-3">
      <h4 className="font-medium text-sm text-foreground">{title}</h4>
      <div className="space-y-2">
        {options.map((option) => (
          <div key={option} className="flex items-center space-x-2">
            <Checkbox
              id={`${filterKey}-${option}`}
              checked={selectedFilters[filterKey]?.includes(option) || false}
              onCheckedChange={(checked) => 
                onFilterChange(filterKey, option, !!checked)
              }
            />
            <Label 
              htmlFor={`${filterKey}-${option}`}
              className="text-sm text-muted-foreground cursor-pointer flex-1"
            >
              {option}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <Card className={className}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <CardTitle className="text-base">Filters</CardTitle>
            {totalSelected > 0 && (
              <Badge variant="secondary" className="text-xs">
                {totalSelected}
              </Badge>
            )}
          </div>
          {totalSelected > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearAll}
              className="h-auto p-1 text-xs"
            >
              <X className="h-3 w-3 mr-1" />
              Clear
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <FilterSection
          title="Industry"
          options={filters.industries}
          filterKey="industries"
        />
        
        <Separator />
        
        <FilterSection
          title="Company Size"
          options={filters.companySizes}
          filterKey="companySizes"
        />
        
        <Separator />
        
        <FilterSection
          title="GMV Range"
          options={filters.gmvRanges}
          filterKey="gmvRanges"
        />
        
        <Separator />
        
        <FilterSection
          title="Geography"
          options={filters.geographies}
          filterKey="geographies"
        />
        
        <Separator />
        
        <FilterSection
          title="Decision Style"
          options={filters.decisionStyles}
          filterKey="decisionStyles"
        />
      </CardContent>
    </Card>
  );
}