export interface AttributeDefinition {
  attribute: string;
  description: string;
  reason: string;
  values: Record<string, string>;
}

export const psychographicAttributes: AttributeDefinition[] = [
  {
    attribute: "DominantFear",
    description: "The single biggest risk that keeps this decision-maker awake at night when evaluating a payment partner.",
    reason: "Razorpay merchants cite fear of revenue leakage, compliance fines, or brand damage as primary triggers for switching or staying.",
    values: {
      "PaymentFailureLoss": "Losing revenue and customer trust because checkout or UPI transactions fail.",
      "ChargebackPenalty": "Absorbing fees and claw-backs from high dispute or fraud rates.",
      "RegulatoryNonCompliance": "Facing RBI penalties or card-network restrictions for missing mandates (e.g., tokenisation, SCA).",
      "CashFlowCrunch": "Running out of runway if settlement cycles are slow or capital is tied up.",
      "IntegrationOverhead": "Burning developer hours and delaying launches due to complex gateway migrations.",
      "BrandReputationDamage": "Public backlash on social media when payments break during peak campaigns."
    }
  },
  {
    attribute: "PrimaryMotivation",
    description: "The strongest positive outcome the buyer hopes to achieve by adopting Razorpay products.",
    reason: "Motivational levers guide product positioning and upsell sequencing.",
    values: {
      "CheckoutConversionBoost": "Improve success rate or reduce friction to lift GMV instantly.",
      "FasterSettlement": "Access funds T+0/T+1 to smooth working capital.",
      "ComplianceAssurance": "Stay automatically aligned with RBI, PCI-DSS, GST-TDS, etc.",
      "WorkingCapitalAccess": "Tap collateral-free credit lines (Razorpay Capital) to cover payroll or marketing spikes.",
      "MultiPaymentCoverage": "Offer UPI, cards, BNPL, subscriptions, and COD from a single stack.",
      "CrossBorderExpansion": "Collect and settle in multiple currencies with minimal FX friction."
    }
  },
  {
    attribute: "CognitiveBiasDominance",
    description: "The heuristic most likely to skew the persona's judgment during vendor evaluation.",
    reason: "Surfacing biases lets sales teams provide counter-evidence or social proof.",
    values: {
      "StatusQuoBias": "Prefers staying with incumbent provider even if metrics lag.",
      "LossAversionHigh": "Weights potential downsides (fees, downtime) more than upside gains.",
      "SocialProofReliance": "Heavily swayed by peer case studies, G2 ratings, or LinkedIn buzz.",
      "OptimismBias": "Overestimates ease of integration and speed to ROI.",
      "AnchoringOnFees": "Fixates on headline MDR or per-transaction cost as the primary yardstick."
    }
  },
  {
    attribute: "RegulatoryFocus",
    description: "Whether the persona is driven more by growth opportunities or by avoiding compliance risks.",
    reason: "Dictates message framing—gain versus loss prevention.",
    values: {
      "PromotionFocused": "Pursues new payment experiences (e.g., one-click UPI) for upside.",
      "PreventionFocused": "Prioritises meeting mandates and avoiding fines or audits.",
      "Balanced": "Treats growth and compliance as equal decision criteria."
    }
  },
  {
    attribute: "RiskAppetite",
    description: "Overall tolerance for adopting unproven features or pricing models.",
    reason: "Informs beta-program targeting and rollout cadence.",
    values: {
      "High": "Comfortable piloting beta APIs and new checkout flows.",
      "Moderate": "Will test innovations after early results are public.",
      "Low": "Requires proven ROI and references before any change."
    }
  },
  {
    attribute: "LocusOfControl",
    description: "Where the buyer believes success or failure primarily originates.",
    reason: "Shapes coaching strategy—internal locus values self-serve dashboards; external locus values concierge support.",
    values: {
      "Internal": "Trusts in-house teams to influence payment KPIs.",
      "External": "Attributes performance to banks, regulators, or partners.",
      "Hybrid": "Recognises both internal execution and external factors."
    }
  },
  {
    attribute: "SocialDominance",
    description: "Preferred interpersonal style during negotiations and collaboration.",
    reason: "Helps AE decide on tone—consultative vs. assertive.",
    values: {
      "Assertive": "Drives hard deadlines and aggressively pushes for better terms.",
      "Collaborative": "Seeks win-win solutions and open information sharing.",
      "Reserved": "Influences quietly, prefers written data over calls."
    }
  },
  {
    attribute: "GrowthMindsetLevel",
    description: "Openness to experimentation, learning, and continuous optimisation.",
    reason: "Indicates readiness for A/B testing tools like Magic Checkout AB console.",
    values: {
      "Fixed": "Prefers stable, once-and-done integrations.",
      "Mixed": "Balances stability with periodic optimisation.",
      "HighGrowth": "Runs continual experiments and eagerly adopts beta features."
    }
  }
];

export const decisionMakingAttributes: AttributeDefinition[] = [
  {
    attribute: "InformationProcessingStyle",
    description: "How the persona absorbs and analyses information when evaluating a vendor.",
    reason: "Dictates collateral depth—dashboards vs. narrative decks.",
    values: {
      "DataDriven": "Relies on metrics, dashboards, and A/B results.",
      "Intuitive": "Leans on gut feel, past experience, or founder instinct.",
      "Hybrid": "Uses intuition for shortlisting, data for final sign-off."
    }
  },
  {
    attribute: "DecisionOrientation",
    description: "Primary lens through which trade-offs are judged.",
    reason: "Helps tailor benefit statements to resonate with their KPI.",
    values: {
      "ConversionLed": "Optimises success rate and GMV first.",
      "CostCentric": "Focuses on MDR, fixed fees, and operational overhead.",
      "ComplianceCentric": "Gives top priority to meeting regulations and audits.",
      "CashFlowCentric": "Ranks payout speed and working-capital impact above all."
    }
  },
  {
    attribute: "ProofRequirementLevel",
    description: "Depth of evidence needed before committing to a switch or upgrade.",
    reason: "Determines sales cycle length and resource allocation.",
    values: {
      "CaseStudyBenchmark": "Happy with published success stories and peer endorsements.",
      "DashboardMetricsReview": "Needs to see KPI impact in trial dashboards.",
      "PilotIntegration": "Requires sandbox or limited-traffic pilot.",
      "FullSecurityAudit": "Demands detailed infosec, PCI, and RBI compliance docs."
    }
  },
  {
    attribute: "DecisionSpeed",
    description: "Typical velocity from first demo to contract sign-off.",
    reason: "Aligns internal cadence for follow-ups and legal prep.",
    values: {
      "Immediate": "Same-week decisions, often founder-led.",
      "Rapid": "1–4 weeks; minimal red tape.",
      "Standard": "1–3 months; includes functional sign-off.",
      "Deliberate": ">3 months; involves formal RFP or board approval."
    }
  },
  {
    attribute: "EvaluationHorizon",
    description: "Timeframe over which ROI is expected and measured.",
    reason: "Guides how to frame savings vs. growth projections.",
    values: {
      "ShortTermPayback": "ROI expected within one quarter.",
      "Quarterly": "Benchmarks every Q but allows ramp-up period.",
      "Annual": "Evaluates savings or growth on fiscal-year basis.",
      "MultiYear": "Invests in multi-year strategic platforms."
    }
  },
  {
    attribute: "StakeholderInvolvement",
    description: "How many internal actors influence the ultimate decision.",
    reason: "Maps the buying committee for multi-threaded outreach.",
    values: {
      "SoloFounder": "Single decision-maker signs and implements.",
      "DuoFounderCTO": "Business and tech co-founders share veto power.",
      "SmallLeadershipCommittee": "3–6 execs across product, finance, and tech.",
      "BoardApproval": "Requires investor or board sanction."
    }
  },
  {
    attribute: "VendorPreference",
    description: "Default bias when selecting technology partners.",
    reason: "Guides bundling strategy—suite vs. modular APIs.",
    values: {
      "IntegratedSuite": "Prefers unified stack covering gateway, payouts, and capital.",
      "BestOfBreedPointSolution": "Cherry-picks specialised providers for each job.",
      "LowCodePlugins": "Looks for Shopify, WooCommerce, or Zapier connectors.",
      "BuildInHouse": "Keeps core payments logic internal, buys only value-adds."
    }
  },
  {
    attribute: "NegotiationStyle",
    description: "Typical approach to pricing and contract discussions.",
    reason: "Prepares sales team for concession strategy or partnership framing.",
    values: {
      "CollaborativePartnership": "Seeks joint go-to-market or co-marketing.",
      "CompetitiveDiscountSeeking": "Pushes hard for lowest MDR tier.",
      "RelationshipBased": "Values long-term rapport over line-item pricing.",
      "FormalRFP": "Runs structured tender with scorecards and deadlines."
    }
  }
];

export const firmographicAttributes: AttributeDefinition[] = [
  {
    attribute: "CompanySizeEmployees",
    description: "Total head-count of the merchant's organisation. Strong proxy for budget, internal processes, and integration resourcing.",
    reason: "Razorpay serves everyone from two-person D2C shops to large enterprises; their size dictates sales motion and onboarding effort.",
    values: {
      "MicroStartup_<10": "Founder-led outfit with <10 employees; decisions are rapid and largely unstructured.",
      "Small_10-50": "Early-stage team that is formalising finance and looking for quick, low-code solutions.",
      "Growth_50-200": "Well-funded Series-A/B firm with dedicated finance & tech leads; scalable APIs matter.",
      "ScaleUp_200-1K": "Multi-function scale-up with procurement gates and cross-team sign-off.",
      "Enterprise_>1K": "Mature organisation with board-level governance and strict vendor due-diligence."
    }
  },
  {
    attribute: "IndustryVertical",
    description: "The merchant's primary operating sector, influencing payment mix, compliance, and feature needs.",
    reason: "Vertical nuances (e.g., gaming versus SaaS) drive chargeback rates, payout preferences, and regulatory exposure.",
    values: {
      "D2C_Ecommerce": "Direct-to-consumer brands selling physical goods online; high UPI and COD share.",
      "SaaS_Software": "Subscription software vendors; recurring billing and low churn are priorities.",
      "FinTech_NBFC": "Regulated lenders or wallets; PCI-DSS and RBI audit readiness critical.",
      "EdTech": "Tuition / course platforms with seasonal spikes; refund management important.",
      "Gaming": "High-volume micro-payments, elevated fraud and chargeback vigilance.",
      "Mobility/Travel": "Ticketing or ride-hailing; needs multi-currency and instant refunds.",
      "Healthcare/LifeSciences": "Sensitive PII, lower transaction frequency, strict data-security requirements."
    }
  },
  {
    attribute: "AnnualGMVRange_INR",
    description: "Gross merchandise value processed per year, in Indian Rupees. Determines optimal price tier and risk exposure.",
    reason: "Razorpay's MDR slabs and risk-based routing differ markedly between a ₹50 L firm and a ₹500 Cr marketplace.",
    values: {
      "<1 Cr": "Nano-scale merchants; pay-as-you-go pricing is most attractive.",
      "1-10 Cr": "Small merchants graduating to negotiated MDR tiers.",
      "10-100 Cr": "Mid-market merchants needing reliability SLAs and analytics dashboards.",
      "100-500 Cr": "Large merchants where even 10 bps fee change is material.",
      ">500 Cr": "Very large enterprises demanding custom routing, dedicated support, and volume rebates."
    }
  },
  {
    attribute: "FundingStage",
    description: "Stage of external investment and governance maturity.",
    reason: "Influences spending power, urgency for growth, and board approval cycles.",
    values: {
      "Bootstrapped": "Self-funded; cash-efficient, highly cost-sensitive.",
      "Seed": "Angel/Seed backed; experiments quickly to find product-market fit.",
      "Series_A-B": "Growth backed; willing to spend for conversion-boosting features.",
      "Series_C-D": "Late-stage scale; begins to formalise risk and compliance processes.",
      "Public/PE-backed": "Listed or private-equity owned; procurement rigor and audit trails paramount."
    }
  },
  {
    attribute: "PrimaryPaymentMix",
    description: "The dominant tender types the merchant accepts—important for routing optimisation and feature enablement.",
    reason: "A UPI-heavy D2C store behaves very differently from a subscription card-heavy SaaS vendor.",
    values: {
      "UPI_Heavy": "≥70% transactions via UPI; success-rate optimisation and TPAP compatibility crucial.",
      "Card_Heavy": "Majority domestic cards; focuses on tokenisation and lower MDR on RuPay credit cards.",
      "CreditCard_on_UPI": "Early adopters of RuPay credit-on-UPI; require blended fee logic.",
      "Subscription_Recurring": "Uses standing instructions and AutoPay; churn mitigation features valued.",
      "COD_Blend": "Cash on Delivery significant; needs COD reconciliation tools.",
      "CrossBorder_FX": "≥10% international volumes; needs FX conversion and multi-currency settlement."
    }
  },
  {
    attribute: "GeographicFootprint",
    description: "Where the merchant operates and settles funds. Drives currency, tax, and UX considerations.",
    reason: "Tier-2 Indian MSMEs want soundbox UPI; global merchants need PCI-DSS and multi-currency.",
    values: {
      "India_Tier1Metro": "Mumbai/Bangalore/Delhi hubs with advanced tech stacks.",
      "India_Tier2Plus": "Emerging cities; prefer vernacular support and low-code plugins.",
      "SouthAsia_SEAsia": "Cross-border sellers into BD, LK, ID; local compliance complexity rises.",
      "Global_MultiCurrency": "Merchants collecting in USD/EUR; demands robust FX rates and chargeback arbitration."
    }
  },
  {
    attribute: "GrowthTrajectory",
    description: "Recent YoY revenue trajectory, indicating urgency for scalability versus optimisation.",
    reason: "Hyper-growth firms trade risk for speed; plateaued firms squeeze costs.",
    values: {
      "HyperGrowth_>40%YoY": "Aggressive expansion; open to beta products for uplift.",
      "SteadyGrowth_10-40%YoY": "Predictable scaling; values reliability over novelty.",
      "Seasonal/Spike": "Large festival or event-driven peaks; needs elastic capacity.",
      "Plateau_or_Decline": "Stagnant revenue; cost-cutting dominates decision criteria."
    }
  },
  {
    attribute: "TechStackMaturity",
    description: "Depth and modernity of the merchant's engineering stack.",
    reason: "Determines ease of integrating advanced APIs or webhooks.",
    values: {
      "LowCode_Shopify/No-Code": "Relies on plugins; expects wizard-based onboarding.",
      "MidStack_PHP/WordPress": "Uses legacy PHP; benefits from drop-in JS SDKs.",
      "ModernAPI_Node/Java": "RESTful micro-services; ready for webhook events and GraphQL.",
      "CloudNative_Serverless": "Deploys on Lambda/Cloud Run; prefers event-driven billing hooks.",
      "InHouse_PaymentsInfra": "Built own gateway; will outsource only niche or value-add modules."
    }
  },
  {
    attribute: "IntegrationComplexity",
    description: "Projected effort to embed Razorpay components into existing systems.",
    reason: "Influences sales engineering time and onboarding friction.",
    values: {
      "PlugAndPlay": "Can go live with hosted checkout or payment links in <1 day.",
      "Standard_API": "Requires backend work but follows docs without bespoke code.",
      "MultiSystem_ERP": "Needs mapping to ERP/OMS; project spans multiple sprints.",
      "Custom_Enterprise": "Bank-grade or proprietary workflows; months of solutioning and infosec review."
    }
  },
  {
    attribute: "ComplianceBurden",
    description: "Level of statutory, industry, and data-security requirements the merchant must satisfy.",
    reason: "Dictates the depth of audit artefacts and custom routing logic.",
    values: {
      "Light_Unregulated": "No sector-specific rules; self-serve onboarding sufficient.",
      "Moderate_State_Tax": "Needs PT/GST auto-collection; occasional audits.",
      "Strict_RBI/PCI": "Under direct RBI oversight or PCI-DSS Level-1; demands tokenisation & audit logs.",
      "ExtraStrict_CrossBorder+RBI": "Operates across jurisdictions; requires FEMA, OFAC, and dual PCI/RBI compliance."
    }
  }
];