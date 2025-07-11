import { Persona } from '@/components/PersonaCard';

export interface ConversationStage {
  stage_id: string;
  stage_label: string;
  psych_goal: string;
  mr_goal: string;
  micro_intents: string[];
  sample_prompt: string;
  log_fields: string[];
  expected_emotion: string;
}

export interface ConversationTurn {
  id: string;
  stage: string;
  prompt: string;
  response: string;
  timestamp: Date;
  data_tags: Record<string, any>;
  sentiment_score: number;
}

export interface SimulationResult {
  persona_id: string;
  conversation_turns: ConversationTurn[];
  final_sentiment: number;
  stage_progress: Record<string, boolean>;
  insights: {
    dominant_heuristic: string;
    regulatory_focus: string;
    barrier_codes: string[];
    intent_score: number;
    price_elasticity: number;
  };
}

const CONVERSATION_STAGES: ConversationStage[] = [
  {
    stage_id: "SCR",
    stage_label: "Screener",
    psych_goal: "Ensure persona fit; trigger minimal self-disclosure to prime trust.",
    mr_goal: "Quota control for vertical, GMV, payment mix.",
    micro_intents: ["confirm_vertical", "confirm_gmv", "confirm_payment_mix"],
    sample_prompt: "Just to confirm: you process roughly {gmv_band} a year and operate in {vertical}, correct?",
    log_fields: ["industry_vertical", "gmv_band", "payment_mix"],
    expected_emotion: "neutral"
  },
  {
    stage_id: "RAP",
    stage_label: "Rapport Building",
    psych_goal: "Lower defensiveness (Social Penetration Theory).",
    mr_goal: "Increase openness for later probing; collect warm-up verbatim.",
    micro_intents: ["personal_warmup", "competence_signalling"],
    sample_prompt: "How's festival season treating your {business_type} business this year?",
    log_fields: ["baseline_valence", "openness_score"],
    expected_emotion: "mild_positivity"
  },
  {
    stage_id: "CAT",
    stage_label: "Category & Context Framing",
    psych_goal: "Provide concrete anchor (Encoding Specificity).",
    mr_goal: "Document current PSP stack & NPS baseline.",
    micro_intents: ["current_psp", "nps_rating"],
    sample_prompt: "Which payment providers do you currently use and how satisfied are you on a scale of -100 to +100?",
    log_fields: ["current_psp", "nps_psp"],
    expected_emotion: "neutral"
  },
  {
    stage_id: "KPI_AFF",
    stage_label: "Business KPIs + Affective Baseline",
    psych_goal: "Surface core success metrics *and* first-order feelings toward them.",
    mr_goal: "Importance / satisfaction gap matrix.",
    micro_intents: ["kpi_ranking", "affective_rating"],
    sample_prompt: "Rank these outcomes 1-5 on importance: Conversion, Cost, Compliance, Cash-flow. Then tell me how you feel you're doing today.",
    log_fields: ["kpi_importance_vector", "kpi_satisfaction_vector", "valence_score"],
    expected_emotion: "varies"
  },
  {
    stage_id: "PNI_COG",
    stage_label: "Pain & Needs Inventory + Cognitive Elaboration",
    psych_goal: "Evoke pain memories; identify heuristics (Prospect Theory).",
    mr_goal: "Code unmet-need frequency; capture explicit pro/con list.",
    micro_intents: ["unaided_pain", "aided_pain_checklist", "pro_con_listing"],
    sample_prompt: "What's the single biggest pain in payments today for your business? And what other issues rank high?",
    log_fields: ["primary_pain_code", "pain_count", "dominant_heuristic"],
    expected_emotion: "mild_negativity"
  },
  {
    stage_id: "MOT",
    stage_label: "Motivational Drill-Down",
    psych_goal: "Map stated benefits to intrinsic motives (Self-Determination; Regulatory Focus).",
    mr_goal: "Segment by Growth vs. Security drivers.",
    micro_intents: ["benefit_to_outcome_ladder", "reg_focus_probe"],
    sample_prompt: "If checkout success jumped 5 percentage points, what would that really do for your business?",
    log_fields: ["dominant_motive", "regulatory_focus_type"],
    expected_emotion: "hope/anticipation"
  },
  {
    stage_id: "CON",
    stage_label: "Concept Exposure",
    psych_goal: "Trigger immediate affect (Somatic Marker).",
    mr_goal: "Top-box interest & verbatim.",
    micro_intents: ["stimulus_show", "first_valence_probe"],
    sample_prompt: "Here's our new UPI Credit-on-Autopay feature at +7 bps MDR. It enables instant credit for customers during checkout. First reaction?",
    log_fields: ["first_valence", "interest_topbox"],
    expected_emotion: "varies"
  },
  {
    stage_id: "BEN_AFF2",
    stage_label: "Benefit Laddering + Second Affective Check",
    psych_goal: "See if emotion shifts after benefits clarified.",
    mr_goal: "Importance scores per benefit.",
    micro_intents: ["benefit_rating_loop"],
    sample_prompt: "On a 1-5 scale, how valuable are these benefits: T+0 settlement, AI retry routing, tokenized payments?",
    log_fields: ["benefit_ratings"],
    expected_emotion: "stabilising"
  },
  {
    stage_id: "FEA",
    stage_label: "Feature Trade-Off",
    psych_goal: "Force system-2 ranking to override bias.",
    mr_goal: "MaxDiff utilities.",
    micro_intents: ["maxdiff_pair"],
    sample_prompt: "What's more critical for your business: instant settlement or AI retry routing?",
    log_fields: ["feature_choice", "tradeoff_reason"],
    expected_emotion: "analytic_focus"
  },
  {
    stage_id: "PRI",
    stage_label: "Pricing Probe",
    psych_goal: "Elicit loss-aversion threshold.",
    mr_goal: "Gabor-Granger elasticity.",
    micro_intents: ["price_point_acceptance"],
    sample_prompt: "At +5 bps MDR, how likely are you to adopt? And at +3 bps? And at +7 bps?",
    log_fields: ["price_accept_curve"],
    expected_emotion: "cost_anxiety"
  },
  {
    stage_id: "DEF_BAR",
    stage_label: "Defensive / Barrier Check",
    psych_goal: "Uncover hidden objections (Cognitive Dissonance).",
    mr_goal: "Barrier taxonomy frequency.",
    micro_intents: ["barrier_open", "barrier_code"],
    sample_prompt: "What would make you hesitate or say no to this solution?",
    log_fields: ["barrier_codes"],
    expected_emotion: "risk_expression"
  },
  {
    stage_id: "EVI",
    stage_label: "Evidence Calibration",
    psych_goal: "Test attitude elasticity with escalating proof.",
    mr_goal: "Proof-impact delta; persuasion score.",
    micro_intents: ["offer_case_study", "sentiment_recheck"],
    sample_prompt: "What if I showed you a peer case study with +35% conversion rate improvement? Does that change your view?",
    log_fields: ["sentiment_after_proof", "proof_type_needed"],
    expected_emotion: "shift_possible"
  },
  {
    stage_id: "PUR_COM",
    stage_label: "Purchase Intent & Commitment",
    psych_goal: "Leverage Commitment–Consistency; capture intention strength.",
    mr_goal: "5-pt PI scale + adoption window.",
    micro_intents: ["intent_scale", "time_horizon", "implementation_intention"],
    sample_prompt: "On a 1-10 scale, how likely are you to pilot this in the next 90 days? What would be your first step?",
    log_fields: ["intent_score", "adoption_window", "implementation_first_step"],
    expected_emotion: "commitment_clarity"
  },
  {
    stage_id: "CLOSE",
    stage_label: "Wrap-Up",
    psych_goal: "End on positive note; maintain willingness for future waves.",
    mr_goal: "Gather final verbatim.",
    micro_intents: ["thanks", "final_thoughts"],
    sample_prompt: "Anything we didn't cover that you think is crucial for payment solutions?",
    log_fields: ["closing_verbatim"],
    expected_emotion: "gratitude"
  }
];

class ConversationAgent {
  private apiKey: string;
  private model: string;

  constructor(apiKey: string, model: string) {
    this.apiKey = apiKey;
    this.model = model;
  }

  async simulateConversation(persona: Persona, productContext: string): Promise<SimulationResult> {
    const conversation_turns: ConversationTurn[] = [];
    const stage_progress: Record<string, boolean> = {};
    let current_sentiment = 0;

    const personaContext = `
You are ${persona.name}, a ${persona.title} at ${persona.company}.

Bio: ${persona.bio}

Respond as this persona would, considering their background, priorities, and constraints. Be realistic about their concerns and motivations based on your bio and company context.
`;

    for (const stage of CONVERSATION_STAGES) {
      try {
        const prompt = this.personalizePrompt(stage.sample_prompt, persona);
        
        const response = await this.callOpenAI(personaContext, prompt, stage);
        
        const turnData = this.extractDataTags(response, stage.log_fields);
        const sentiment = this.extractSentiment(response);
        current_sentiment = sentiment;

        const turn: ConversationTurn = {
          id: crypto.randomUUID(),
          stage: stage.stage_id,
          prompt,
          response,
          timestamp: new Date(),
          data_tags: turnData,
          sentiment_score: sentiment
        };

        conversation_turns.push(turn);
        stage_progress[stage.stage_id] = true;

        // Add realistic delay between turns
        await new Promise(resolve => setTimeout(resolve, 1000));
        
      } catch (error) {
        console.error(`Error in stage ${stage.stage_id}:`, error);
        stage_progress[stage.stage_id] = false;
      }
    }

    const insights = this.generateInsights(conversation_turns);

    return {
      persona_id: persona.id,
      conversation_turns,
      final_sentiment: current_sentiment,
      stage_progress,
      insights
    };
  }

  private personalizePrompt(template: string, persona: Persona): string {
    return template
      .replace('{gmv_band}', persona.firmographicProfile?.annualGMVRange || 'mid-range')
      .replace('{vertical}', persona.firmographicProfile?.industryVertical || 'business')
      .replace('{business_type}', persona.firmographicProfile?.industryVertical || 'business');
  }

  private async callOpenAI(personaContext: string, prompt: string, stage: ConversationStage): Promise<string> {
    // Mock response for development - replace with actual OpenAI call when API key is available
    const mockResponses = {
      SCR: "Yes, that's correct. We process around that volume annually in our vertical.",
      RAP: "Festival season has been quite busy for us, lots of increased transaction volume.",
      CAT: "We currently use Razorpay and PayU. I'd rate our satisfaction around 60 out of 100.",
      KPI_AFF: "I'd rank Conversion as 1, Cost as 2, Cash-flow as 3, Compliance as 4. We're doing okay but could improve.",
      PNI_COG: "The biggest pain is failed transactions during peak hours. It's costing us conversions.",
      MOT: "A 5% improvement in checkout success would directly impact our revenue and customer satisfaction.",
      CON: "Interesting concept. The instant credit feature could help with cart abandonment issues.",
      BEN_AFF2: "T+0 settlement would be valuable (4/5), AI retry routing sounds promising (3/5).",
      FEA: "I think instant settlement is more critical for our cash flow needs.",
      PRI: "At +3 bps, quite likely (7/10). At +5 bps, maybe (5/10). At +7 bps, less likely (3/10).",
      DEF_BAR: "Main concerns would be integration complexity and ensuring compliance requirements are met.",
      EVI: "A peer case study with 35% improvement is impressive. That does make me more interested.",
      PUR_COM: "Based on what I've heard, I'd say 7/10 likely to pilot in next 90 days. First step would be technical evaluation.",
      CLOSE: "I think understanding the full technical requirements and implementation timeline would be crucial."
    };

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000));
    
    return mockResponses[stage.stage_id as keyof typeof mockResponses] || "That's an interesting point to consider.";
  }

  private extractDataTags(response: string, logFields: string[]): Record<string, any> {
    // Simple extraction logic - in production, use more sophisticated NLP
    const tags: Record<string, any> = {};
    
    if (logFields.includes('baseline_valence') || logFields.includes('valence_score')) {
      tags.valence = this.extractSentiment(response);
    }
    
    if (logFields.includes('barrier_codes')) {
      tags.barriers = this.extractBarriers(response);
    }
    
    if (logFields.includes('intent_score')) {
      tags.intent = this.extractIntent(response);
    }

    return tags;
  }

  private extractSentiment(response: string): number {
    const positiveWords = ['good', 'great', 'excellent', 'positive', 'interested', 'valuable', 'helpful'];
    const negativeWords = ['bad', 'poor', 'negative', 'concerned', 'worried', 'expensive', 'risky'];
    
    const words = response.toLowerCase().split(/\s+/);
    let score = 0;
    
    words.forEach(word => {
      if (positiveWords.some(p => word.includes(p))) score += 0.1;
      if (negativeWords.some(n => word.includes(n))) score -= 0.1;
    });
    
    return Math.max(-1, Math.min(1, score));
  }

  private extractBarriers(response: string): string[] {
    const barriers = [];
    const text = response.toLowerCase();
    
    if (text.includes('cost') || text.includes('price') || text.includes('expensive')) {
      barriers.push('Cost');
    }
    if (text.includes('compliance') || text.includes('regulation') || text.includes('legal')) {
      barriers.push('Compliance');
    }
    if (text.includes('integration') || text.includes('technical') || text.includes('complex')) {
      barriers.push('Integration');
    }
    if (text.includes('risk') || text.includes('security') || text.includes('safe')) {
      barriers.push('Risk');
    }
    
    return barriers;
  }

  private extractIntent(response: string): number {
    const text = response.toLowerCase();
    
    if (text.includes('definitely') || text.includes('10') || text.includes('absolutely')) {
      return 9;
    } else if (text.includes('likely') || text.includes('probably') || text.includes('8') || text.includes('9')) {
      return 7;
    } else if (text.includes('maybe') || text.includes('possibly') || text.includes('5') || text.includes('6')) {
      return 5;
    } else if (text.includes('unlikely') || text.includes('doubt') || text.includes('2') || text.includes('3')) {
      return 3;
    } else if (text.includes('never') || text.includes('no way') || text.includes('1')) {
      return 1;
    }
    
    return 5; // Default neutral
  }

  private generateInsights(turns: ConversationTurn[]): any {
    const sentiments = turns.map(t => t.sentiment_score);
    const avgSentiment = sentiments.reduce((a, b) => a + b, 0) / sentiments.length;
    
    const allBarriers = turns.flatMap(t => t.data_tags.barriers || []);
    const intentScores = turns.map(t => t.data_tags.intent).filter(Boolean);
    const avgIntent = intentScores.length > 0 ? intentScores.reduce((a, b) => a + b, 0) / intentScores.length : 5;
    
    return {
      dominant_heuristic: avgSentiment > 0 ? 'Optimism Bias' : 'Loss Aversion',
      regulatory_focus: avgIntent > 6 ? 'Promotion' : 'Prevention',
      barrier_codes: [...new Set(allBarriers)],
      intent_score: avgIntent,
      price_elasticity: Math.random() * -2 // Mock elasticity
    };
  }
}

class InsightAgent {
  private apiKey: string;
  private model: string;

  constructor(apiKey: string, model: string) {
    this.apiKey = apiKey;
    this.model = model;
  }

  async generateInsights(results: SimulationResult[]): Promise<any> {
    const conversationData = results.map(result => ({
      persona_id: result.persona_id,
      final_sentiment: result.final_sentiment,
      insights: result.insights,
      key_quotes: result.conversation_turns.slice(-3).map(t => t.response)
    }));

    const prompt = `
Analyze the following simulation results and generate comprehensive insights:

${JSON.stringify(conversationData, null, 2)}

Generate insights in the following format:
1. Sentiment Heat Map data (persona x sentiment scores)
2. Objection clusters with percentages
3. Adoption likelihood funnel (likely/maybe/unlikely percentages)
4. Key themes and recommendations

Provide response in JSON format.
`;

    // Mock insights generation for development
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      sentiment_heatmap: results.map(r => ({
        persona_id: r.persona_id,
        sentiment: r.final_sentiment,
        key_objection: r.insights.barrier_codes[0] || 'None'
      })),
      objection_clusters: [
        { name: 'Cost Concerns', percentage: 40 },
        { name: 'Compliance Issues', percentage: 25 },
        { name: 'Integration Complexity', percentage: 20 },
        { name: 'Risk Factors', percentage: 15 }
      ],
      adoption_funnel: {
        likely: Math.round(results.filter(r => r.insights.intent_score >= 7).length / results.length * 100),
        maybe: Math.round(results.filter(r => r.insights.intent_score >= 4 && r.insights.intent_score < 7).length / results.length * 100),
        unlikely: Math.round(results.filter(r => r.insights.intent_score < 4).length / results.length * 100)
      },
      key_themes: [
        "Payment reliability is a top concern across personas",
        "Cost sensitivity varies by company size", 
        "Integration complexity is a common barrier",
        "Instant settlement features show strong appeal"
      ],
      recommendations: [
        "Focus on reliability messaging for technical personas",
        "Develop tiered pricing for different company sizes",
        "Create detailed integration guides and support",
        "Highlight settlement speed as key differentiator"
      ]
    };
  }
}

export { ConversationAgent, InsightAgent, CONVERSATION_STAGES };