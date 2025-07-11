import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Persona } from "./PersonaCard";
import { Save, X } from "lucide-react";

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

  // Options for dropdowns
  const psychographicOptions = {
    dominantFear: ["PaymentFailureLoss", "ChargebackPenalty", "RegulatoryNonCompliance", "CashFlowCrunch", "IntegrationOverhead", "BrandReputationDamage"],
    primaryMotivation: ["CheckoutConversionBoost", "FasterSettlement", "ComplianceAssurance", "WorkingCapitalAccess", "MultiPaymentCoverage", "CrossBorderExpansion"],
    cognitiveBiasDominance: ["StatusQuoBias", "LossAversionHigh", "SocialProofReliance", "OptimismBias", "AnchoringOnFees"],
    regulatoryFocus: ["PromotionFocused", "PreventionFocused", "Balanced"],
    riskAppetite: ["High", "Moderate", "Low"],
    locusOfControl: ["Internal", "External", "Hybrid"],
    socialDominance: ["Assertive", "Collaborative", "Reserved"],
    growthMindsetLevel: ["Fixed", "Mixed", "HighGrowth"]
  };

  const decisionOptions = {
    informationProcessingStyle: ["DataDriven", "Intuitive", "Hybrid"],
    decisionOrientation: ["ConversionLed", "CostCentric", "ComplianceCentric", "CashFlowCentric"],
    proofRequirementLevel: ["CaseStudyBenchmark", "DashboardMetricsReview", "PilotIntegration", "FullSecurityAudit"],
    decisionSpeed: ["Immediate", "Rapid", "Standard", "Deliberate"],
    evaluationHorizon: ["ShortTermPayback", "Quarterly", "Annual", "MultiYear"],
    stakeholderInvolvement: ["SoloFounder", "DuoFounderCTO", "SmallLeadershipCommittee", "BoardApproval"],
    vendorPreference: ["IntegratedSuite", "BestOfBreedPointSolution", "LowCodePlugins", "BuildInHouse"],
    negotiationStyle: ["CollaborativePartnership", "CompetitiveDiscountSeeking", "RelationshipBased", "FormalRFP"]
  };

  const firmographicOptions = {
    companySizeEmployees: ["MicroStartup_<10", "Small_10-50", "Growth_50-200", "ScaleUp_200-1K", "Enterprise_>1K"],
    industryVertical: ["D2C_Ecommerce", "SaaS_Software", "FinTech_NBFC", "EdTech", "Gaming", "Mobility/Travel", "Healthcare/LifeSciences"],
    annualGMVRange: ["<1 Cr", "1-10 Cr", "10-100 Cr", "100-500 Cr", ">500 Cr"],
    fundingStage: ["Bootstrapped", "Seed", "Series_A-B", "Series_C-D", "Public/PE-backed"],
    primaryPaymentMix: ["UPI_Heavy", "Card_Heavy", "CreditCard_on_UPI", "Subscription_Recurring", "COD_Blend", "CrossBorder_FX"],
    geographicFootprint: ["India_Tier1Metro", "India_Tier2Plus", "SouthAsia_SEAsia", "Global_MultiCurrency"],
    growthTrajectory: ["HyperGrowth_>40%YoY", "SteadyGrowth_10-40%YoY", "Seasonal/Spike", "Plateau_or_Decline"],
    techStackMaturity: ["LowCode_Shopify/No-Code", "MidStack_PHP/WordPress", "ModernAPI_Node/Java", "CloudNative_Serverless", "InHouse_PaymentsInfra"],
    integrationComplexity: ["PlugAndPlay", "Standard_API", "MultiSystem_ERP", "Custom_Enterprise"],
    complianceBurden: ["Light_Unregulated", "Moderate_State_Tax", "Strict_RBI/PCI", "ExtraStrict_CrossBorder+RBI"]
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
                <h3 className="text-lg font-medium">Psychographic Profile</h3>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(psychographicOptions).map(([key, options]) => (
                    <div key={key}>
                      <Label>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</Label>
                      <Select
                        value={formData.psychographicProfile[key as keyof typeof formData.psychographicProfile]}
                        onValueChange={(value) => handleProfileChange("psychographicProfile", key, value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select..." />
                        </SelectTrigger>
                        <SelectContent>
                          {options.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="decision" className="space-y-4">
                <h3 className="text-lg font-medium">Decision Making Style</h3>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(decisionOptions).map(([key, options]) => (
                    <div key={key}>
                      <Label>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</Label>
                      <Select
                        value={formData.decisionMakingStyle[key as keyof typeof formData.decisionMakingStyle]}
                        onValueChange={(value) => handleProfileChange("decisionMakingStyle", key, value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select..." />
                        </SelectTrigger>
                        <SelectContent>
                          {options.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="firmographic" className="space-y-4">
                <h3 className="text-lg font-medium">Firmographic Profile</h3>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(firmographicOptions).map(([key, options]) => (
                    <div key={key}>
                      <Label>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</Label>
                      <Select
                        value={formData.firmographicProfile[key as keyof typeof formData.firmographicProfile]}
                        onValueChange={(value) => handleProfileChange("firmographicProfile", key, value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select..." />
                        </SelectTrigger>
                        <SelectContent>
                          {options.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  ))}
                </div>
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