import { PatientMonitor, PatientRecord, Vital } from '../patientMonitor';

describe('PatientMonitor - Practice Problem', () => {
  let monitor: PatientMonitor;
  let testPatient: PatientRecord;

  beforeEach(() => {
    monitor = new PatientMonitor();
    testPatient = {
      id: 'P001',
      name: 'John Doe',
      vitals: [],
      riskLevel: 'low',
    };
    monitor.addPatient(testPatient);
  });

  describe('PART 1: Bug Fix - calculateRiskLevel', () => {
    it('should mark patient as LOW risk when all vitals are normal', () => {
      monitor.recordVital('P001', {
        timestamp: new Date(),
        type: 'heart_rate',
        value: 75,
        unit: 'bpm',
      });

      const patient = monitor.getPatient('P001');
      expect(patient?.riskLevel).toBe('low');
    });

    it('should mark patient as HIGH risk when heart rate is too low', () => {
      // Heart rate below 60 should be flagged
      monitor.recordVital('P001', {
        timestamp: new Date(),
        type: 'heart_rate',
        value: 45,
        unit: 'bpm',
      });

      const patient = monitor.getPatient('P001');
      expect(patient?.riskLevel).toBe('high');
    });

    it('should mark patient as HIGH risk when heart rate is too high', () => {
      // Heart rate above 100 should be flagged
      monitor.recordVital('P001', {
        timestamp: new Date(),
        type: 'heart_rate',
        value: 120,
        unit: 'bpm',
      });

      const patient = monitor.getPatient('P001');
      expect(patient?.riskLevel).toBe('high');
    });

    it('should mark patient as HIGH risk when oxygen saturation is too low', () => {
      // Oxygen saturation below 95% is critical
      monitor.recordVital('P001', {
        timestamp: new Date(),
        type: 'oxygen_saturation',
        value: 88,
        unit: '%',
      });

      const patient = monitor.getPatient('P001');
      expect(patient?.riskLevel).toBe('high');
    });

    it('should mark patient as MEDIUM risk with 1-2 abnormal vitals', () => {
      monitor.recordVital('P001', {
        timestamp: new Date(),
        type: 'heart_rate',
        value: 110,
        unit: 'bpm',
      });

      monitor.recordVital('P001', {
        timestamp: new Date(),
        type: 'temperature',
        value: 38.5,
        unit: '°C',
      });

      const patient = monitor.getPatient('P001');
      expect(patient?.riskLevel).toBe('medium');
    });
  });

  describe('PART 2: Feature Extension - getPatientsByRiskLevel', () => {
    it('should return patients filtered by risk level', () => {
      const patient2: PatientRecord = {
        id: 'P002',
        name: 'Jane Smith',
        vitals: [],
        riskLevel: 'high',
      };
      monitor.addPatient(patient2);

      monitor.recordVital('P001', {
        timestamp: new Date(),
        type: 'heart_rate',
        value: 75,
        unit: 'bpm',
      });

      // TODO: Uncomment when implemented
      // const lowRiskPatients = monitor.getPatientsByRiskLevel('low');
      // expect(lowRiskPatients.length).toBe(1);
      // expect(lowRiskPatients[0].id).toBe('P001');
    });
  });

  describe('PART 2: Feature Extension - getAverageVitalOverTime', () => {
    it('should calculate average vital value for a patient', () => {
      monitor.recordVital('P001', {
        timestamp: new Date(),
        type: 'heart_rate',
        value: 70,
        unit: 'bpm',
      });

      monitor.recordVital('P001', {
        timestamp: new Date(),
        type: 'heart_rate',
        value: 80,
        unit: 'bpm',
      });

      monitor.recordVital('P001', {
        timestamp: new Date(),
        type: 'heart_rate',
        value: 90,
        unit: 'bpm',
      });

      // TODO: Uncomment when implemented
      // const average = monitor.getAverageVitalOverTime('P001', 'heart_rate');
      // expect(average).toBe(80);
    });

    it('should return 0 if patient has no vitals of that type', () => {
      // TODO: Uncomment when implemented
      // const average = monitor.getAverageVitalOverTime('P001', 'blood_pressure');
      // expect(average).toBe(0);
    });
  });

  describe('PART 2: Feature Extension - checkAlertsForPatient', () => {
    it('should return empty array when all vitals are normal', () => {
      monitor.recordVital('P001', {
        timestamp: new Date(),
        type: 'heart_rate',
        value: 75,
        unit: 'bpm',
      });

      // TODO: Uncomment when implemented
      // const alerts = monitor.checkAlertsForPatient('P001');
      // expect(alerts).toEqual([]);
    });

    it('should return alerts for abnormal vitals', () => {
      monitor.recordVital('P001', {
        timestamp: new Date(),
        type: 'heart_rate',
        value: 150,
        unit: 'bpm',
      });

      monitor.recordVital('P001', {
        timestamp: new Date(),
        type: 'oxygen_saturation',
        value: 85,
        unit: '%',
      });

      // TODO: Uncomment when implemented
      // const alerts = monitor.checkAlertsForPatient('P001');
      // expect(alerts.length).toBe(2);
      // expect(alerts[0].type).toBe('heart_rate');
      // expect(alerts[1].type).toBe('oxygen_saturation');
    });

    it('should include threshold information in alerts', () => {
      monitor.recordVital('P001', {
        timestamp: new Date(),
        type: 'temperature',
        value: 39.5,
        unit: '°C',
      });

      // TODO: Uncomment when implemented
      // const alerts = monitor.checkAlertsForPatient('P001');
      // expect(alerts[0].expectedMin).toBe(36.5);
      // expect(alerts[0].expectedMax).toBe(37.5);
      // expect(alerts[0].actualValue).toBe(39.5);
    });
  });
});
