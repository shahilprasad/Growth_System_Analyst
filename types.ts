export enum Specialty {
  GP = 'General Practitioner',
  PHYSIO = 'Physiotherapist',
  SURGEON = 'Surgeon',
  PSYCH = 'Psychologist'
}

export interface ClinicianLog {
  user_id: string;
  specialty: Specialty;
  session_count: number;
  avg_note_length: number; // in words
  last_active_days: number;
  template_usage_rate: number; // 0.0 to 1.0
}

export enum SignalCategory {
  FRICTION = 'Friction', // High sessions, low template (struggling)
  REACTIVATION = 'Reactivation', // High value, inactive
  POWER_USER = 'Power User', // Rapid growth
  STABLE = 'Stable' // No action needed
}

export interface InterventionSignal {
  userId: string;
  category: SignalCategory;
  confidence: number;
  reasoning: string;
  emailDraft: string;
}

export interface AnalysisSummary {
  totalProcessed: number;
  signalsFound: number;
  processingTimeMs: number;
  humanTimeEquivalentMinutes: number;
  speedMultiplier: number;
}