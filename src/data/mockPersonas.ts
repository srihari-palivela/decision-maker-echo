import { Persona } from "@/components/PersonaCard";

export const mockPersonas: Persona[] = [
  {
    id: "P01",
    name: "HyperGrowth_D2C_Founder",
    title: "Founder-CEO",
    company: "D2C Growth Company",
    bio: "Wants Magic Checkout-style uplift today; decides solo once dashboard shows >2 pp success-rate gain.",
    psychographicProfile: {
      dominantFear: "PaymentFailureLoss",
      primaryMotivation: "CheckoutConversionBoost",
      cognitiveBiasDominance: "SocialProofReliance",
      regulatoryFocus: "PromotionFocused",
      riskAppetite: "High",
      locusOfControl: "Internal",
      socialDominance: "Assertive",
      growthMindsetLevel: "HighGrowth"
    },
    decisionMakingStyle: {
      informationProcessingStyle: "DataDriven",
      decisionOrientation: "ConversionLed",
      proofRequirementLevel: "CaseStudyBenchmark",
      decisionSpeed: "Immediate",
      evaluationHorizon: "ShortTermPayback",
      stakeholderInvolvement: "SoloFounder",
      vendorPreference: "IntegratedSuite",
      negotiationStyle: "CollaborativePartnership"
    },
    firmographicProfile: {
      companySizeEmployees: "MicroStartup_<10",
      industryVertical: "D2C_Ecommerce",
      annualGMVRange: "1-10 Cr",
      fundingStage: "Series_A-B",
      primaryPaymentMix: "UPI_Heavy",
      geographicFootprint: "India_Tier1Metro",
      growthTrajectory: "HyperGrowth_>40%YoY",
      techStackMaturity: "LowCode_Shopify/No-Code",
      integrationComplexity: "PlugAndPlay",
      complianceBurden: "Light_Unregulated"
    }
  },
  {
    id: "P02",
    name: "Bootstrapped_SaaS_CTO",
    title: "CTO",
    company: "SaaS Startup",
    bio: "Will migrate if API work < 1 sprint **and** MDR beats current 2.1 % anchor.",
    psychographicProfile: {
      dominantFear: "IntegrationOverhead",
      primaryMotivation: "MultiPaymentCoverage",
      cognitiveBiasDominance: "AnchoringOnFees",
      regulatoryFocus: "Balanced",
      riskAppetite: "Moderate",
      locusOfControl: "Internal",
      socialDominance: "Reserved",
      growthMindsetLevel: "Mixed"
    },
    decisionMakingStyle: {
      informationProcessingStyle: "Hybrid",
      decisionOrientation: "CostCentric",
      proofRequirementLevel: "PilotIntegration",
      decisionSpeed: "Rapid",
      evaluationHorizon: "Quarterly",
      stakeholderInvolvement: "DuoFounderCTO",
      vendorPreference: "BestOfBreedPointSolution",
      negotiationStyle: "CompetitiveDiscountSeeking"
    },
    firmographicProfile: {
      companySizeEmployees: "Small_10-50",
      industryVertical: "SaaS_Software",
      annualGMVRange: "<1 Cr",
      fundingStage: "Bootstrapped",
      primaryPaymentMix: "Card_Heavy",
      geographicFootprint: "India_Tier1Metro",
      growthTrajectory: "SteadyGrowth_10-40%YoY",
      techStackMaturity: "ModernAPI_Node/Java",
      integrationComplexity: "Standard_API",
      complianceBurden: "Moderate_State_Tax"
    }
  },
  {
    id: "P03",
    name: "RiskAverse_FinTech_CFO",
    title: "CFO",
    company: "FinTech NBFC",
    bio: "Won't budge without PCI DSS Level-1 + RBI tokenisation attestation.",
    psychographicProfile: {
      dominantFear: "RegulatoryNonCompliance",
      primaryMotivation: "ComplianceAssurance",
      cognitiveBiasDominance: "LossAversionHigh",
      regulatoryFocus: "PreventionFocused",
      riskAppetite: "Low",
      locusOfControl: "External",
      socialDominance: "Collaborative",
      growthMindsetLevel: "Fixed"
    },
    decisionMakingStyle: {
      informationProcessingStyle: "DataDriven",
      decisionOrientation: "ComplianceCentric",
      proofRequirementLevel: "FullSecurityAudit",
      decisionSpeed: "Deliberate",
      evaluationHorizon: "Annual",
      stakeholderInvolvement: "BoardApproval",
      vendorPreference: "IntegratedSuite",
      negotiationStyle: "FormalRFP"
    },
    firmographicProfile: {
      companySizeEmployees: "ScaleUp_200-1K",
      industryVertical: "FinTech_NBFC",
      annualGMVRange: "100-500 Cr",
      fundingStage: "Series_C-D",
      primaryPaymentMix: "Card_Heavy",
      geographicFootprint: "India_Tier1Metro",
      growthTrajectory: "SteadyGrowth_10-40%YoY",
      techStackMaturity: "ModernAPI_Node/Java",
      integrationComplexity: "MultiSystem_ERP",
      complianceBurden: "Strict_RBI/PCI"
    }
  },
  {
    id: "P04",
    name: "SpeedFirst_EdTech_COO",
    title: "COO",
    company: "EdTech Platform",
    bio: "Wants T+0 settlements before next admission rush; OK to pilot during low season.",
    psychographicProfile: {
      dominantFear: "CashFlowCrunch",
      primaryMotivation: "FasterSettlement",
      cognitiveBiasDominance: "OptimismBias",
      regulatoryFocus: "PromotionFocused",
      riskAppetite: "High",
      locusOfControl: "Internal",
      socialDominance: "Assertive",
      growthMindsetLevel: "HighGrowth"
    },
    decisionMakingStyle: {
      informationProcessingStyle: "Intuitive",
      decisionOrientation: "ConversionLed",
      proofRequirementLevel: "DashboardMetricsReview",
      decisionSpeed: "Rapid",
      evaluationHorizon: "ShortTermPayback",
      stakeholderInvolvement: "SmallLeadershipCommittee",
      vendorPreference: "IntegratedSuite",
      negotiationStyle: "CollaborativePartnership"
    },
    firmographicProfile: {
      companySizeEmployees: "Growth_50-200",
      industryVertical: "EdTech",
      annualGMVRange: "10-100 Cr",
      fundingStage: "Series_A-B",
      primaryPaymentMix: "UPI_Heavy",
      geographicFootprint: "India_Tier1Metro",
      growthTrajectory: "HyperGrowth_>40%YoY",
      techStackMaturity: "MidStack_PHP/WordPress",
      integrationComplexity: "Standard_API",
      complianceBurden: "Moderate_State_Tax"
    }
  },
  {
    id: "P05",
    name: "Gaming_CFO_CrossBorder",
    title: "CFO",
    company: "Gaming Company",
    bio: "Needs FX routing with low chargeback ratio; runs 30-day sandbox before migration.",
    psychographicProfile: {
      dominantFear: "ChargebackPenalty",
      primaryMotivation: "CrossBorderExpansion",
      cognitiveBiasDominance: "AnchoringOnFees",
      regulatoryFocus: "Balanced",
      riskAppetite: "Moderate",
      locusOfControl: "Hybrid",
      socialDominance: "Collaborative",
      growthMindsetLevel: "Mixed"
    },
    decisionMakingStyle: {
      informationProcessingStyle: "DataDriven",
      decisionOrientation: "CashFlowCentric",
      proofRequirementLevel: "PilotIntegration",
      decisionSpeed: "Standard",
      evaluationHorizon: "Quarterly",
      stakeholderInvolvement: "SmallLeadershipCommittee",
      vendorPreference: "BestOfBreedPointSolution",
      negotiationStyle: "CompetitiveDiscountSeeking"
    },
    firmographicProfile: {
      companySizeEmployees: "Growth_50-200",
      industryVertical: "Gaming",
      annualGMVRange: "10-100 Cr",
      fundingStage: "Series_A-B",
      primaryPaymentMix: "CrossBorder_FX",
      geographicFootprint: "Global_MultiCurrency",
      growthTrajectory: "SteadyGrowth_10-40%YoY",
      techStackMaturity: "CloudNative_Serverless",
      integrationComplexity: "Standard_API",
      complianceBurden: "Strict_RBI/PCI"
    }
  },
  {
    id: "P06",
    name: "Mobility_Enterprise_VP_Payments",
    title: "VP Payments",
    company: "Enterprise Mobility",
    bio: "Will replace legacy stack only if Razorpay eliminates three current PSPs and meets global PCI & SCA.",
    psychographicProfile: {
      dominantFear: "IntegrationOverhead",
      primaryMotivation: "MultiPaymentCoverage",
      cognitiveBiasDominance: "StatusQuoBias",
      regulatoryFocus: "Balanced",
      riskAppetite: "Low",
      locusOfControl: "External",
      socialDominance: "Collaborative",
      growthMindsetLevel: "Fixed"
    },
    decisionMakingStyle: {
      informationProcessingStyle: "DataDriven",
      decisionOrientation: "CostCentric",
      proofRequirementLevel: "FullSecurityAudit",
      decisionSpeed: "Deliberate",
      evaluationHorizon: "MultiYear",
      stakeholderInvolvement: "BoardApproval",
      vendorPreference: "IntegratedSuite",
      negotiationStyle: "FormalRFP"
    },
    firmographicProfile: {
      companySizeEmployees: "Enterprise_>1K",
      industryVertical: "Mobility/Travel",
      annualGMVRange: ">500 Cr",
      fundingStage: "Public/PE-backed",
      primaryPaymentMix: "Card_Heavy",
      geographicFootprint: "Global_MultiCurrency",
      growthTrajectory: "SteadyGrowth_10-40%YoY",
      techStackMaturity: "InHouse_PaymentsInfra",
      integrationComplexity: "Custom_Enterprise",
      complianceBurden: "ExtraStrict_CrossBorder+RBI"
    }
  },
  {
    id: "P07",
    name: "HealthTech_Compliance_Founder",
    title: "Founder-CEO",
    company: "HealthTech Startup",
    bio: "Will switch only after Razorpay passes HIPAA-aligned data-flow review.",
    psychographicProfile: {
      dominantFear: "RegulatoryNonCompliance",
      primaryMotivation: "ComplianceAssurance",
      cognitiveBiasDominance: "LossAversionHigh",
      regulatoryFocus: "PreventionFocused",
      riskAppetite: "Low",
      locusOfControl: "Hybrid",
      socialDominance: "Reserved",
      growthMindsetLevel: "Fixed"
    },
    decisionMakingStyle: {
      informationProcessingStyle: "DataDriven",
      decisionOrientation: "ComplianceCentric",
      proofRequirementLevel: "FullSecurityAudit",
      decisionSpeed: "Standard",
      evaluationHorizon: "Annual",
      stakeholderInvolvement: "DuoFounderCTO",
      vendorPreference: "IntegratedSuite",
      negotiationStyle: "CollaborativePartnership"
    },
    firmographicProfile: {
      companySizeEmployees: "Small_10-50",
      industryVertical: "Healthcare/LifeSciences",
      annualGMVRange: "1-10 Cr",
      fundingStage: "Seed",
      primaryPaymentMix: "Card_Heavy",
      geographicFootprint: "India_Tier1Metro",
      growthTrajectory: "SteadyGrowth_10-40%YoY",
      techStackMaturity: "MidStack_PHP/WordPress",
      integrationComplexity: "Standard_API",
      complianceBurden: "Strict_RBI/PCI"
    }
  },
  {
    id: "P08",
    name: "GlobalSeed_SaaS_Founder",
    title: "Founder-CEO",
    company: "Global SaaS Startup",
    bio: "Needs Capital line + FX support; happy to beta-test new APIs.",
    psychographicProfile: {
      dominantFear: "CashFlowCrunch",
      primaryMotivation: "WorkingCapitalAccess",
      cognitiveBiasDominance: "OptimismBias",
      regulatoryFocus: "PromotionFocused",
      riskAppetite: "High",
      locusOfControl: "Internal",
      socialDominance: "Assertive",
      growthMindsetLevel: "HighGrowth"
    },
    decisionMakingStyle: {
      informationProcessingStyle: "Intuitive",
      decisionOrientation: "ConversionLed",
      proofRequirementLevel: "PilotIntegration",
      decisionSpeed: "Immediate",
      evaluationHorizon: "ShortTermPayback",
      stakeholderInvolvement: "SoloFounder",
      vendorPreference: "IntegratedSuite",
      negotiationStyle: "CollaborativePartnership"
    },
    firmographicProfile: {
      companySizeEmployees: "MicroStartup_<10",
      industryVertical: "SaaS_Software",
      annualGMVRange: "<1 Cr",
      fundingStage: "Seed",
      primaryPaymentMix: "CrossBorder_FX",
      geographicFootprint: "SouthAsia_SEAsia",
      growthTrajectory: "HyperGrowth_>40%YoY",
      techStackMaturity: "CloudNative_Serverless",
      integrationComplexity: "PlugAndPlay",
      complianceBurden: "Moderate_State_Tax"
    }
  },
  {
    id: "P09",
    name: "SeriesC_D2C_CFO",
    title: "CFO",
    company: "Series C D2C Company",
    bio: "Benchmarks MDR every quarter; needs >10 bps savings to justify switch.",
    psychographicProfile: {
      dominantFear: "LossAversionHigh",
      primaryMotivation: "CostEfficiency",
      cognitiveBiasDominance: "AnchoringOnFees",
      regulatoryFocus: "Balanced",
      riskAppetite: "Moderate",
      locusOfControl: "External",
      socialDominance: "Collaborative",
      growthMindsetLevel: "Mixed"
    },
    decisionMakingStyle: {
      informationProcessingStyle: "DataDriven",
      decisionOrientation: "CostCentric",
      proofRequirementLevel: "DashboardMetricsReview",
      decisionSpeed: "Standard",
      evaluationHorizon: "Quarterly",
      stakeholderInvolvement: "SmallLeadershipCommittee",
      vendorPreference: "IntegratedSuite",
      negotiationStyle: "CompetitiveDiscountSeeking"
    },
    firmographicProfile: {
      companySizeEmployees: "ScaleUp_200-1K",
      industryVertical: "D2C_Ecommerce",
      annualGMVRange: "100-500 Cr",
      fundingStage: "Series_C-D",
      primaryPaymentMix: "UPI_Heavy",
      geographicFootprint: "India_Tier1Metro",
      growthTrajectory: "SteadyGrowth_10-40%YoY",
      techStackMaturity: "ModernAPI_Node/Java",
      integrationComplexity: "MultiSystem_ERP",
      complianceBurden: "Moderate_State_Tax"
    }
  },
  {
    id: "P10",
    name: "NBFC_HighRisk_COO",
    title: "COO",
    company: "NBFC Enterprise",
    bio: "Experiments with BNPL & card-on-UPI despite dispute risk, if conversion lifts justify.",
    psychographicProfile: {
      dominantFear: "ChargebackPenalty",
      primaryMotivation: "CheckoutConversionBoost",
      cognitiveBiasDominance: "StatusQuoBias",
      regulatoryFocus: "Balanced",
      riskAppetite: "High",
      locusOfControl: "Hybrid",
      socialDominance: "Assertive",
      growthMindsetLevel: "Mixed"
    },
    decisionMakingStyle: {
      informationProcessingStyle: "DataDriven",
      decisionOrientation: "ConversionLed",
      proofRequirementLevel: "PilotIntegration",
      decisionSpeed: "Standard",
      evaluationHorizon: "Annual",
      stakeholderInvolvement: "BoardApproval",
      vendorPreference: "IntegratedSuite",
      negotiationStyle: "FormalRFP"
    },
    firmographicProfile: {
      companySizeEmployees: "Enterprise_>1K",
      industryVertical: "FinTech_NBFC",
      annualGMVRange: ">500 Cr",
      fundingStage: "Public/PE-backed",
      primaryPaymentMix: "Card_Heavy",
      geographicFootprint: "India_Tier1Metro",
      growthTrajectory: "SteadyGrowth_10-40%YoY",
      techStackMaturity: "InHouse_PaymentsInfra",
      integrationComplexity: "Custom_Enterprise",
      complianceBurden: "ExtraStrict_CrossBorder+RBI"
    }
  },
  {
    id: "P11",
    name: "CrossBorder_Aggregator_CFO",
    title: "CFO",
    company: "Cross-Border Travel Platform",
    bio: "Needs FX settlement + PSD2-style SCA; weighs brand trust heavily.",
    psychographicProfile: {
      dominantFear: "BrandReputationDamage",
      primaryMotivation: "CrossBorderExpansion",
      cognitiveBiasDominance: "SocialProofReliance",
      regulatoryFocus: "Balanced",
      riskAppetite: "Moderate",
      locusOfControl: "Hybrid",
      socialDominance: "Collaborative",
      growthMindsetLevel: "Mixed"
    },
    decisionMakingStyle: {
      informationProcessingStyle: "DataDriven",
      decisionOrientation: "ComplianceCentric",
      proofRequirementLevel: "PilotIntegration",
      decisionSpeed: "Standard",
      evaluationHorizon: "Annual",
      stakeholderInvolvement: "SmallLeadershipCommittee",
      vendorPreference: "BestOfBreedPointSolution",
      negotiationStyle: "CompetitiveDiscountSeeking"
    },
    firmographicProfile: {
      companySizeEmployees: "ScaleUp_200-1K",
      industryVertical: "Mobility/Travel",
      annualGMVRange: "100-500 Cr",
      fundingStage: "Series_C-D",
      primaryPaymentMix: "CrossBorder_FX",
      geographicFootprint: "Global_MultiCurrency",
      growthTrajectory: "SteadyGrowth_10-40%YoY",
      techStackMaturity: "CloudNative_Serverless",
      integrationComplexity: "MultiSystem_ERP",
      complianceBurden: "ExtraStrict_CrossBorder+RBI"
    }
  },
  {
    id: "P12",
    name: "Tier2_Retail_MSME_Owner",
    title: "Owner-Operator",
    company: "Tier 2 Retail MSME",
    bio: "Looks for UPI soundbox + instant COD reconciliation to protect thin margins.",
    psychographicProfile: {
      dominantFear: "PaymentFailureLoss",
      primaryMotivation: "FasterSettlement",
      cognitiveBiasDominance: "OptimismBias",
      regulatoryFocus: "PromotionFocused",
      riskAppetite: "Moderate",
      locusOfControl: "Internal",
      socialDominance: "Reserved",
      growthMindsetLevel: "Mixed"
    },
    decisionMakingStyle: {
      informationProcessingStyle: "Intuitive",
      decisionOrientation: "CashFlowCentric",
      proofRequirementLevel: "CaseStudyBenchmark",
      decisionSpeed: "Rapid",
      evaluationHorizon: "Quarterly",
      stakeholderInvolvement: "SoloFounder",
      vendorPreference: "LowCodePlugins",
      negotiationStyle: "RelationshipBased"
    },
    firmographicProfile: {
      companySizeEmployees: "Small_10-50",
      industryVertical: "D2C_Ecommerce",
      annualGMVRange: "<1 Cr",
      fundingStage: "Bootstrapped",
      primaryPaymentMix: "COD_Blend",
      geographicFootprint: "India_Tier2Plus",
      growthTrajectory: "Seasonal/Spike",
      techStackMaturity: "LowCode_Shopify/No-Code",
      integrationComplexity: "PlugAndPlay",
      complianceBurden: "Light_Unregulated"
    }
  },
  {
    id: "P13",
    name: "Subscription_SaaS_CFO",
    title: "CFO",
    company: "Subscription SaaS Platform",
    bio: "Evaluates UPI AutoPay to reduce card decline churn; needs API parity with Stripe Billing.",
    psychographicProfile: {
      dominantFear: "IntegrationOverhead",
      primaryMotivation: "ComplianceAssurance",
      cognitiveBiasDominance: "AnchoringOnFees",
      regulatoryFocus: "Balanced",
      riskAppetite: "Moderate",
      locusOfControl: "Internal",
      socialDominance: "Collaborative",
      growthMindsetLevel: "Mixed"
    },
    decisionMakingStyle: {
      informationProcessingStyle: "DataDriven",
      decisionOrientation: "CostCentric",
      proofRequirementLevel: "DashboardMetricsReview",
      decisionSpeed: "Standard",
      evaluationHorizon: "Annual",
      stakeholderInvolvement: "SmallLeadershipCommittee",
      vendorPreference: "BestOfBreedPointSolution",
      negotiationStyle: "CompetitiveDiscountSeeking"
    },
    firmographicProfile: {
      companySizeEmployees: "Growth_50-200",
      industryVertical: "SaaS_Software",
      annualGMVRange: "10-100 Cr",
      fundingStage: "Series_A-B",
      primaryPaymentMix: "Subscription_Recurring",
      geographicFootprint: "India_Tier1Metro",
      growthTrajectory: "SteadyGrowth_10-40%YoY",
      techStackMaturity: "ModernAPI_Node/Java",
      integrationComplexity: "Standard_API",
      complianceBurden: "Moderate_State_Tax"
    }
  },
  {
    id: "P14",
    name: "InHouse_Payments_VP",
    title: "VP Engineering",
    company: "Technology Platform",
    bio: "Will outsource only niche add-ons (e.g., Magic Checkout) that beat internal SLA.",
    psychographicProfile: {
      dominantFear: "AnchoringOnFees",
      primaryMotivation: "MultiPaymentCoverage",
      cognitiveBiasDominance: "StatusQuoBias",
      regulatoryFocus: "Balanced",
      riskAppetite: "High",
      locusOfControl: "Internal",
      socialDominance: "Assertive",
      growthMindsetLevel: "Mixed"
    },
    decisionMakingStyle: {
      informationProcessingStyle: "DataDriven",
      decisionOrientation: "CostCentric",
      proofRequirementLevel: "PilotIntegration",
      decisionSpeed: "Deliberate",
      evaluationHorizon: "MultiYear",
      stakeholderInvolvement: "SmallLeadershipCommittee",
      vendorPreference: "BuildInHouse",
      negotiationStyle: "CompetitiveDiscountSeeking"
    },
    firmographicProfile: {
      companySizeEmployees: "Enterprise_>1K",
      industryVertical: "Technology/Platform",
      annualGMVRange: ">500 Cr",
      fundingStage: "Public/PE-backed",
      primaryPaymentMix: "Card_Heavy",
      geographicFootprint: "Global_MultiCurrency",
      growthTrajectory: "SteadyGrowth_10-40%YoY",
      techStackMaturity: "InHouse_PaymentsInfra",
      integrationComplexity: "Custom_Enterprise",
      complianceBurden: "Strict_RBI/PCI"
    }
  },
  {
    id: "P15",
    name: "FestivalSpike_D2C_Founder",
    title: "Founder-Owner",
    company: "Festival D2C Brand",
    bio: "Seeks pre-Diwali working-capital line and surge-proof checkout.",
    psychographicProfile: {
      dominantFear: "CashFlowCrunch",
      primaryMotivation: "WorkingCapitalAccess",
      cognitiveBiasDominance: "OptimismBias",
      regulatoryFocus: "PromotionFocused",
      riskAppetite: "High",
      locusOfControl: "Internal",
      socialDominance: "Assertive",
      growthMindsetLevel: "Mixed"
    },
    decisionMakingStyle: {
      informationProcessingStyle: "Intuitive",
      decisionOrientation: "CashFlowCentric",
      proofRequirementLevel: "PilotIntegration",
      decisionSpeed: "Immediate",
      evaluationHorizon: "ShortTermPayback",
      stakeholderInvolvement: "SoloFounder",
      vendorPreference: "LowCodePlugins",
      negotiationStyle: "RelationshipBased"
    },
    firmographicProfile: {
      companySizeEmployees: "MicroStartup_<10",
      industryVertical: "D2C_Ecommerce",
      annualGMVRange: "1-10 Cr",
      fundingStage: "Bootstrapped",
      primaryPaymentMix: "UPI_Heavy",
      geographicFootprint: "India_Tier2Plus",
      growthTrajectory: "Seasonal/Spike",
      techStackMaturity: "LowCode_Shopify/No-Code",
      integrationComplexity: "PlugAndPlay",
      complianceBurden: "Light_Unregulated"
    }
  },
  {
    id: "P16",
    name: "Plateau_EdTech_FinanceHead",
    title: "Head of Finance",
    company: "EdTech Platform",
    bio: "Negotiates MDR down to protect margins amid slower enrollments.",
    psychographicProfile: {
      dominantFear: "LossAversionHigh",
      primaryMotivation: "CostEfficiency",
      cognitiveBiasDominance: "AnchoringOnFees",
      regulatoryFocus: "Balanced",
      riskAppetite: "Low",
      locusOfControl: "External",
      socialDominance: "Reserved",
      growthMindsetLevel: "Fixed"
    },
    decisionMakingStyle: {
      informationProcessingStyle: "DataDriven",
      decisionOrientation: "CostCentric",
      proofRequirementLevel: "DashboardMetricsReview",
      decisionSpeed: "Standard",
      evaluationHorizon: "Annual",
      stakeholderInvolvement: "SmallLeadershipCommittee",
      vendorPreference: "IntegratedSuite",
      negotiationStyle: "CompetitiveDiscountSeeking"
    },
    firmographicProfile: {
      companySizeEmployees: "Growth_50-200",
      industryVertical: "EdTech",
      annualGMVRange: "10-100 Cr",
      fundingStage: "Series_A-B",
      primaryPaymentMix: "UPI_Heavy",
      geographicFootprint: "India_Tier1Metro",
      growthTrajectory: "Plateau_or_Decline",
      techStackMaturity: "MidStack_PHP/WordPress",
      integrationComplexity: "Standard_API",
      complianceBurden: "Moderate_State_Tax"
    }
  }
];

export const filterOptions = {
  industries: [
    "D2C_Ecommerce", "SaaS_Software", "FinTech_NBFC", "EdTech", "Gaming", 
    "Mobility/Travel", "Healthcare/LifeSciences"
  ],
  companySizes: [
    "MicroStartup_<10", "Small_10-50", "Growth_50-200", "ScaleUp_200-1K", "Enterprise_>1K"
  ],
  gmvRanges: [
    "<1 Cr", "1-10 Cr", "10-100 Cr", "100-500 Cr", ">500 Cr"
  ],
  geographies: [
    "India_Tier1Metro", "India_Tier2Plus", "SouthAsia_SEAsia", "Global_MultiCurrency"
  ],
  decisionStyles: [
    "DataDriven", "Intuitive", "Hybrid"
  ]
};