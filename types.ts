

export type Language = 'en' | 'hi' | 'mr';

export interface ClinicalData {
  // Patient Profile
  age: number;
  height: number; // cm
  weight: number; // kg
  bmi: number; // calculated
  socioEconomicStatus: string;
  
  // Obstetric History
  parity: number;
  previousCSection: boolean;
  gestationalAge: number; // weeks
  
  // Vitals & Measurements
  systolicBP: number;
  diastolicBP: number;
  fetalHeartRate: number; // bpm
  fundalHeight: number; // cm
  
  // Labs & Exams
  hemoglobin: number;
  urineProtein: string; // Negative, Trace, 1+, etc
  
  // Risks
  diabetes: boolean;
  multiplePregnancy: boolean;
  bleeding: boolean;
  edema: boolean;
  fundalHeightMismatch: boolean;
  otherRiskFactors: string;
}

export interface RiskResult {
  score: number;
  category: 'Low' | 'Moderate' | 'High';
  recommendation: string;
  referralAction: string;
}

export interface USGMetrics {
  bpd?: number;
  hc?: number;
  ac?: number;
  fl?: number;
  efw?: number;
  gestationalAge?: number;
}

export interface USGResult {
  metrics: USGMetrics;
  diagnosis: 'Normal Growth' | 'Suspected FGR' | 'Confirmed FGR';
  reasoning: string;
}

export interface CTGFeatures {
  baseline_heart_rate: number;
  accelerations: number;
  fetal_movement: number;
  uterine_contractions: number;
  light_decelerations: number;
  severe_decelerations: number;
  prolonged_decelerations: number;
  abnormal_short_term_variability: number;
  mean_value_of_short_term_variability: number;
}

export interface CTGResult {
  classification: 'Normal' | 'Suspicious' | 'Pathological';
  confidence: number;
  reasoning: string;
}

export interface PMSMACenter {
  id: string;
  name: string;
  address: string;
  contact: string;
  latitude: number;
  longitude: number;
  nextCampDate: string;
  distance?: number;
}

export interface GroundingChunk {
  web?: {
    uri: string;
    title: string;
  };
  maps?: {
    uri: string;
    title: string;
    placeAnswerSources?: unknown;
  };
}

export interface LocationSearchResult {
  text: string;
  groundingChunks: GroundingChunk[];
}

export interface MealItem {
  time: string;
  name: string;
  description: string;
  nutrients: string; // e.g., "Iron, Protein"
}

export interface DietPlan {
  meals: MealItem[];
  hydrationTip: string;
  avoidList: string[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface KickRecord {
  id: string;
  date: string; // ISO date string
  count: number;
  duration: number; // minutes
  startTime: string;
}

export interface ContractionRecord {
  id: string;
  startTime: number;
  endTime: number;
  durationSec: number;
  frequencyMin: number; // Time since previous start
}