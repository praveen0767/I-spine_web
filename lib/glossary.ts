export type MetricGlossaryNode = {
  name: string;
  formula: string;
  meaning: string;
  thresholds: { label: string; value: string }[];
  action: string;
  whyItMatters: string;
};

export const METRIC_GLOSSARY: Record<string, MetricGlossaryNode> = {
  STRATEGIC_SCORE: {
    name: "Strategic Readiness Score",
    formula: "Weighted composite of normalized vote dominance, turnout size, historical consistency, target gap, and swing risk. Output range: 0-100",
    meaning: "Higher scores indicate a stronger operational position. Lower scores indicate urgent need for intervention.",
    thresholds: [
      { label: "Safe", value: "> 70" },
      { label: "Stable", value: "40 - 70" },
      { label: "High Risk", value: "< 40 and Swing > 15" }
    ],
    action: "Booths scoring below 40 must undergo Immediate Visit execution.",
    whyItMatters: "Distills multiple volatile variables into a single deterministic number for campaign workers to stack-rank their daily operations without having to interpret raw statistics."
  },
  SWING_SCORE: {
    name: "Volatility (Swing) Factor",
    formula: "Raw difference (max_value - min_value) normalized by total_voters percentage",
    meaning: "Measures electoral instability. High swing indicates a fickle voter block that changes loyalty rapidly between cycles.",
    thresholds: [
      { label: "High Volatility", value: "> 15%" },
      { label: "Moderate Volatility", value: "10% - 15%" },
      { label: "Stable", value: "< 10%" }
    ],
    action: "Focus campaigns specifically on High Volatility zones; they are mathematically easier to flip than safe opposition zones.",
    whyItMatters: "Directs resource distribution away from lost causes and towards areas where slight leverage shifts outcomes."
  },
  PRIORITY_LABEL: {
    name: "Operational Priority",
    formula: "If Strategy >= 80: Critical, >= 60: High, >= 30: Medium, else Low (Quantile boundaries adjust automatically)",
    meaning: "A human-readable tag determining resource allocation priority.",
    thresholds: [
      { label: "Critical", value: "Top Decile / High Risk" },
      { label: "High", value: "Upper Quartile" }
    ],
    action: "Deploy best operatives to Critical zones.",
    whyItMatters: "Non-technical operatives need clear categorization rather than decimal numbers."
  },
  CONFIDENCE_LEVEL: {
    name: "Data Reliability Index",
    formula: "Completeness scoring based on non-null fields + consistency + source agreement",
    meaning: "Higher confidence means we trust the data underlying the strategy.",
    thresholds: [
      { label: "High", value: "All fields complete" },
      { label: "Medium", value: "Missing historical data" },
      { label: "Low", value: "Missing critical denominators" }
    ],
    action: "Low confidence rows require ground validation.",
    whyItMatters: "Prevents the campaign from making expensive bad decisions on flawed intelligence."
  }
};
