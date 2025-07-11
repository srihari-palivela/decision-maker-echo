import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Persona } from "./PersonaCard";
import { psychographicAttributes, decisionMakingAttributes, firmographicAttributes, AttributeDefinition } from "@/data/attributeDefinitions";
import { Save, X, Plus, Info, Edit } from "lucide-react";

interface PersonaFormProps {
  persona?: Persona;
  onSave: (persona: Persona) => void;
  onCancel: () => void;
}

export function PersonaForm({ persona, onSave, onCancel }: PersonaFormProps) {
  const [formData, setFormData] = useState<Persona>(
    persona || {
      id: Math.random().toString(36).substr(2, 9),
      name: "",
      title: "",
      company: "",
      bio: "",
      psychographicProfile: {
        dominantFear: "",
        primaryMotivation: "",
        cognitiveBiasDominance: "",
        regulatoryFocus: "",
        riskAppetite: "",
        locusOfControl: "",
        socialDominance: "",
        growthMindsetLevel: ""
      },
      decisionMakingStyle: {
        informationProcessingStyle: "",
        decisionOrientation: "",
        proofRequirementLevel: "",
        decisionSpeed: "",
        evaluationHorizon: "",
        stakeholderInvolvement: "",
        vendorPreference: "",
        negotiationStyle: ""
      },
      firmographicProfile: {
        companySizeEmployees: "",
        industryVertical: "",
        annualGMVRange: "",
        fundingStage: "",
        primaryPaymentMix: "",
        geographicFootprint: "",
        growthTrajectory: "",
        techStackMaturity: "",
        integrationComplexity: "",
        complianceBurden: ""
      }
    }
  );

  const [customAttributes, setCustomAttributes] = useState<{
    psychographic: AttributeDefinition[];
    decisionMaking: AttributeDefinition[];
    firmographic: AttributeDefinition[];
  }>({
    psychographic: [...psychographicAttributes],
    decisionMaking: [...decisionMakingAttributes],
    firmographic: [...firmographicAttributes]
  });

  const [showAddAttribute, setShowAddAttribute] = useState<{
    category: 'psychographic' | 'decisionMaking' | 'firmographic' | null;
    isOpen: boolean;
  }>({ category: null, isOpen: false });

  const [newAttribute, setNewAttribute] = useState({
    attribute: "",
    description: "",
    reason: "",
    values: {} as Record<string, string>
  });

  const [newValue, setNewValue] = useState({ key: "", description: "" });

  const handleBasicInfoChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleProfileChange = (category: keyof Persona, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [category]: {
        ...(prev[category] as any),
        [field]: value
      }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleAddAttribute = () => {
    if (!showAddAttribute.category || !newAttribute.attribute || !newAttribute.description) return;
    
    const category = showAddAttribute.category;
    setCustomAttributes(prev => ({
      ...prev,
      [category]: [...prev[category], { ...newAttribute }]
    }));
    
    setNewAttribute({ attribute: "", description: "", reason: "", values: {} });
    setShowAddAttribute({ category: null, isOpen: false });
  };

  const handleAddValue = (attributeIndex: number, category: 'psychographic' | 'decisionMaking' | 'firmographic') => {
    if (!newValue.key || !newValue.description) return;
    
    setCustomAttributes(prev => ({
      ...prev,
      [category]: prev[category].map((attr, idx) => 
        idx === attributeIndex 
          ? { ...attr, values: { ...attr.values, [newValue.key]: newValue.description } }
          : attr
      )
    }));
    
    setNewValue({ key: "", description: "" });
  };

  const formatAttributeName = (name: string) => 
    name.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());

  const renderAttributeSection = (
    attributes: AttributeDefinition[], 
    category: 'psychographicProfile' | 'decisionMakingStyle' | 'firmographicProfile',
    categoryKey: 'psychographic' | 'decisionMaking' | 'firmographic'
  ) => {
    return attributes.map((attr, index) => (
      <Accordion key={attr.attribute} type="single" collapsible className="border rounded-lg">
        <AccordionItem value={attr.attribute} className="border-none">
          <AccordionTrigger className="px-4 py-3 hover:no-underline">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-3">
                <span className="font-medium">{formatAttributeName(attr.attribute)}</span>
                <Info className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="flex items-center gap-2">
                {(formData[category] as any)[attr.attribute] && (
                  <Badge variant="secondary" className="text-xs">
                    {(formData[category] as any)[attr.attribute]}
                  </Badge>
                )}
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <div className="space-y-4">
              <div className="bg-muted/50 p-3 rounded-md text-sm">
                <p className="font-medium text-muted-foreground mb-1">Description:</p>
                <p>{attr.description}</p>
                {attr.reason && (
                  <>
                    <p className="font-medium text-muted-foreground mt-2 mb-1">Reasoning:</p>
                    <p className="text-muted-foreground">{attr.reason}</p>
                  </>
                )}
              </div>
              
              <div>
                <Label>Select Value</Label>
                <Select
                  value={(formData[category] as any)[attr.attribute]}
                  onValueChange={(value) => handleProfileChange(category, attr.attribute, value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent className="max-h-60">
                    {Object.entries(attr.values).map(([key, description]) => (
                      <SelectItem key={key} value={key}>
                        <div className="space-y-1">
                          <div className="font-medium">{key}</div>
                          <div className="text-xs text-muted-foreground">{description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Add new value option */}
              <div className="border-t pt-3">
                <div className="flex items-center gap-2 mb-2">
                  <Plus className="h-4 w-4" />
                  <span className="text-sm font-medium">Add Custom Value</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    placeholder="Value key"
                    value={newValue.key}
                    onChange={(e) => setNewValue(prev => ({ ...prev, key: e.target.value }))}
                  />
                  <Input
                    placeholder="Description"
                    value={newValue.description}
                    onChange={(e) => setNewValue(prev => ({ ...prev, description: e.target.value }))}
                  />
                </div>
                <Button
                  type="button"
                  size="sm"
                  className="mt-2"
                  onClick={() => handleAddValue(index, categoryKey)}
                  disabled={!newValue.key || !newValue.description}
                >
                  Add Value
                </Button>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    ));
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>{persona ? "Edit Persona" : "Create New Persona"}</CardTitle>
          <Button variant="ghost" size="sm" onClick={onCancel}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        
        <CardContent className="overflow-y-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Basic Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleBasicInfoChange("name", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleBasicInfoChange("title", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => handleBasicInfoChange("company", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="avatar">Avatar URL</Label>
                  <Input
                    id="avatar"
                    value={formData.avatar || ""}
                    onChange={(e) => handleBasicInfoChange("avatar", e.target.value)}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => handleBasicInfoChange("bio", e.target.value)}
                  rows={3}
                  required
                />
              </div>
            </div>

            {/* Attribute Categories */}
            <Tabs defaultValue="psychographic" className="space-y-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="psychographic">Psychographic</TabsTrigger>
                <TabsTrigger value="decision">Decision Making</TabsTrigger>
                <TabsTrigger value="firmographic">Firmographic</TabsTrigger>
              </TabsList>

              <TabsContent value="psychographic" className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium">Psychographic Profile</h3>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setShowAddAttribute({ category: 'psychographic', isOpen: true })}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Attribute
                  </Button>
                </div>
                
                <div className="space-y-3">
                  {renderAttributeSection(customAttributes.psychographic, 'psychographicProfile', 'psychographic')}
                </div>

                {/* Add new attribute form */}
                {showAddAttribute.isOpen && showAddAttribute.category === 'psychographic' && (
                  <Card className="p-4 border-dashed">
                    <div className="space-y-3">
                      <Input
                        placeholder="Attribute name"
                        value={newAttribute.attribute}
                        onChange={(e) => setNewAttribute(prev => ({ ...prev, attribute: e.target.value }))}
                      />
                      <Textarea
                        placeholder="Attribute description"
                        value={newAttribute.description}
                        onChange={(e) => setNewAttribute(prev => ({ ...prev, description: e.target.value }))}
                      />
                      <Textarea
                        placeholder="Reasoning (optional)"
                        value={newAttribute.reason}
                        onChange={(e) => setNewAttribute(prev => ({ ...prev, reason: e.target.value }))}
                      />
                      <div className="flex gap-2">
                        <Button type="button" size="sm" onClick={handleAddAttribute}>
                          Add Attribute
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => setShowAddAttribute({ category: null, isOpen: false })}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="decision" className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium">Decision Making Style</h3>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setShowAddAttribute({ category: 'decisionMaking', isOpen: true })}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Attribute
                  </Button>
                </div>
                
                <div className="space-y-3">
                  {renderAttributeSection(customAttributes.decisionMaking, 'decisionMakingStyle', 'decisionMaking')}
                </div>

                {/* Add new attribute form */}
                {showAddAttribute.isOpen && showAddAttribute.category === 'decisionMaking' && (
                  <Card className="p-4 border-dashed">
                    <div className="space-y-3">
                      <Input
                        placeholder="Attribute name"
                        value={newAttribute.attribute}
                        onChange={(e) => setNewAttribute(prev => ({ ...prev, attribute: e.target.value }))}
                      />
                      <Textarea
                        placeholder="Attribute description"
                        value={newAttribute.description}
                        onChange={(e) => setNewAttribute(prev => ({ ...prev, description: e.target.value }))}
                      />
                      <Textarea
                        placeholder="Reasoning (optional)"
                        value={newAttribute.reason}
                        onChange={(e) => setNewAttribute(prev => ({ ...prev, reason: e.target.value }))}
                      />
                      <div className="flex gap-2">
                        <Button type="button" size="sm" onClick={handleAddAttribute}>
                          Add Attribute
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => setShowAddAttribute({ category: null, isOpen: false })}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="firmographic" className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium">Firmographic Profile</h3>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setShowAddAttribute({ category: 'firmographic', isOpen: true })}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Attribute
                  </Button>
                </div>
                
                <div className="space-y-3">
                  {renderAttributeSection(customAttributes.firmographic, 'firmographicProfile', 'firmographic')}
                </div>

                {/* Add new attribute form */}
                {showAddAttribute.isOpen && showAddAttribute.category === 'firmographic' && (
                  <Card className="p-4 border-dashed">
                    <div className="space-y-3">
                      <Input
                        placeholder="Attribute name"
                        value={newAttribute.attribute}
                        onChange={(e) => setNewAttribute(prev => ({ ...prev, attribute: e.target.value }))}
                      />
                      <Textarea
                        placeholder="Attribute description"
                        value={newAttribute.description}
                        onChange={(e) => setNewAttribute(prev => ({ ...prev, description: e.target.value }))}
                      />
                      <Textarea
                        placeholder="Reasoning (optional)"
                        value={newAttribute.reason}
                        onChange={(e) => setNewAttribute(prev => ({ ...prev, reason: e.target.value }))}
                      />
                      <div className="flex gap-2">
                        <Button type="button" size="sm" onClick={handleAddAttribute}>
                          Add Attribute
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => setShowAddAttribute({ category: null, isOpen: false })}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </Card>
                )}
              </TabsContent>
            </Tabs>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
              <Button type="submit">
                <Save className="h-4 w-4 mr-2" />
                Save Persona
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}