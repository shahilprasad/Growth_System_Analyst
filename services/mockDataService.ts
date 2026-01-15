import { ClinicianLog, Specialty } from '../types';

const generateId = () => Math.random().toString(36).substring(2, 9).toUpperCase();

export const generateMockData = (count: number = 50): ClinicianLog[] => {
  const data: ClinicianLog[] = [];
  const specialties = Object.values(Specialty);

  for (let i = 0; i < count; i++) {
    const specialty = specialties[Math.floor(Math.random() * specialties.length)];
    
    // Create realistic clusters of behavior
    const isPowerUser = Math.random() > 0.8;
    const isChurnRisk = Math.random() > 0.85;
    
    let sessionCount = Math.floor(Math.random() * 50) + 5;
    let templateUsage = Math.random() * 0.5;
    let lastActive = Math.floor(Math.random() * 3);
    let noteLength = Math.floor(Math.random() * 300) + 100;

    if (isPowerUser) {
      sessionCount += 100;
      templateUsage = 0.8 + (Math.random() * 0.2);
      noteLength += 200;
    }

    if (isChurnRisk) {
      lastActive = Math.floor(Math.random() * 14) + 4;
    }

    // "Friction" cohort: High sessions but low template usage
    if (!isPowerUser && !isChurnRisk && Math.random() > 0.7) {
        sessionCount = 80 + Math.floor(Math.random() * 40);
        templateUsage = Math.random() * 0.1; // Very low usage despite high volume
    }

    data.push({
      user_id: `USR-${generateId()}`,
      specialty,
      session_count: sessionCount,
      avg_note_length: noteLength,
      last_active_days: lastActive,
      template_usage_rate: parseFloat(templateUsage.toFixed(2))
    });
  }

  return data;
};