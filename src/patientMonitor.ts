// Patient Monitoring System - Practice Problem for Cadence Interview

export interface PatientRecord {
  id: string;
  name: string;
  vitals: Vital[];
  riskLevel: 'low' | 'medium' | 'high';
}

export interface Vital {
  timestamp: Date;
  type: 'heart_rate' | 'blood_pressure' | 'temperature' | 'oxygen_saturation';
  value: number;
  unit: string;
}

export interface AlertThreshold {
  type: Vital['type'];
  minValue?: number;
  maxValue?: number;
}

/**
 * PART 1: BUG FIX
 * 
 * The PatientMonitor class has a bug in the calculateRiskLevel method.
 * It doesn't correctly handle all vital types and uses wrong thresholds.
 * Fix the logic to properly assess risk levels.
 */
export class PatientMonitor {
  private patients: Map<string, PatientRecord> = new Map();
  private alertThresholds: Map<string, AlertThreshold> = new Map([
    ['heart_rate', { type: 'heart_rate', minValue: 60, maxValue: 100 }],
    ['blood_pressure', { type: 'blood_pressure', minValue: 90, maxValue: 140 }],
    ['temperature', { type: 'temperature', minValue: 36.5, maxValue: 37.5 }],
    ['oxygen_saturation', { type: 'oxygen_saturation', minValue: 95, maxValue: 100 }],
  ]);

  addPatient(patient: PatientRecord): void {
    this.patients.set(patient.id, patient);
  }

  recordVital(patientId: string, vital: Vital): void {
    const patient = this.patients.get(patientId);
    if (!patient) {
      throw new Error(`Patient ${patientId} not found`);
    }
    
    patient.vitals.push(vital);
    patient.riskLevel = this.calculateRiskLevel(patient);
  }

  // BUG: This method incorrectly calculates risk levels
  // It doesn't check all vitals and uses wrong comparison logic
  calculateRiskLevel(patient: PatientRecord): 'low' | 'medium' | 'high' {
    const recentVitals = patient.vitals.slice(-5); // Last 5 vitals
    
    let abnormalCount = 0;
    
    for (const vital of recentVitals) {
      const threshold = this.alertThresholds.get(vital.type);
      
      // BUG: This logic is incorrect
      if (vital.value < threshold?.minValue!) {
        abnormalCount++;
      }
      // BUG: maxValue is never checked
    }

    if (abnormalCount === 0) return 'low';
    if (abnormalCount <= 2) return 'medium';
    return 'high';
  }

  getPatient(patientId: string): PatientRecord | undefined {
    return this.patients.get(patientId);
  }

  getAllPatients(): PatientRecord[] {
    return Array.from(this.patients.values());
  }
}

/**
 * PART 2: FEATURE EXTENSION
 * 
 * Implement the following methods:
 * 
 * 1. getPatientsByRiskLevel(level: 'low' | 'medium' | 'high'): PatientRecord[]
 *    - Return all patients with the specified risk level
 * 
 * 2. getAverageVitalOverTime(patientId: string, vitalType: Vital['type']): number
 *    - Calculate the average value of a specific vital type for a patient
 *    - Return the average of all recordings for that vital type
 * 
 * 3. checkAlertsForPatient(patientId: string): Alert[]
 *    - Return all active alerts for a patient
 *    - An alert exists when a vital is outside the threshold
 *    - Include the vital type, value, and threshold bounds
 * 
 * You'll need to define an Alert interface as well.
 */

// TODO: Define Alert interface
// TODO: Implement getPatientsByRiskLevel
// TODO: Implement getAverageVitalOverTime
// TODO: Implement checkAlertsForPatient
