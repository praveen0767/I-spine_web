export interface BoothRecord {
  booth_no: string;
  locality: string;
  polling_station: string;
  village: string;
  male: number;
  female: number;
  total_voters: number;
  max_value: number;
  min_value: number;
  swing_value: number;
  source_file: string;
  source_row: number;
  strategic_score: number;
  swing_score: number;
  priority_label: string;
  action_label: string;
  risk_class: string;
  demographic_class: string;
  confidence_level: string;
  pipeline_version: string;
}

export interface SummaryData {
  total_booths: number;
  total_localities: number;
  total_voters: number;
  avg_strategic_score: number;
  avg_swing_score: number;
  critical_zones: number;
  high_priority_zones: number;
}

export interface FreshnessData {
  version: string;
  last_processed: string;
  source_files: number;
  raw_rows: number;
  clean_rows: number;
}

export interface QualityData {
  low_confidence_count: number;
  completeness_score: number;
}

export interface LocalityRecord {
  locality: string;
  booth_count: number;
  total_voters: number;
  strategic_score: number;
  swing_score: number;
  priority_label: string;
  action_label: string;
  rank: number;
}

export interface ActionsData {
  counts: Record<string, number>;
  "Immediate Visit Required": BoothRecord[];
  "Focus Campaign Needed": BoothRecord[];
  "Monitor Closely": BoothRecord[];
  "Maintain Presence": BoothRecord[];
  "Review Data": BoothRecord[];
}
