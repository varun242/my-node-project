# Solution Guide - Patient Monitoring System

> This guide helps if you get stuck. Try solving on your own first! 

---

## PART 1: Bug Fix - calculateRiskLevel()

### Problem Analysis

The current code:
```typescript
calculateRiskLevel(patient: PatientRecord): 'low' | 'medium' | 'high' {
  const recentVitals = patient.vitals.slice(-5);
  let abnormalCount = 0;
  
  for (const vital of recentVitals) {
    const threshold = this.alertThresholds.get(vital.type);
    
    // BUG 1: Only checks minimum, not maximum
    if (vital.value < threshold?.minValue!) {
      abnormalCount++;
    }
    // BUG 2: maxValue never checked
  }

  if (abnormalCount === 0) return 'low';
  if (abnormalCount <= 2) return 'medium';
  return 'high';
}
```

### Issues to Fix

1. **Missing Maximum Check:** A vital can be too HIGH (above max) but code doesn't catch it
2. **Wrong Risk Thresholds:** 
   - If abnormalCount = 1, should be HIGH (critical vital abnormal)
   - If abnormalCount = 2, should be MEDIUM (multiple concerns)
   - If abnormalCount >= 3, should be HIGH (many problems)

### Solution Approach

```typescript
calculateRiskLevel(patient: PatientRecord): 'low' | 'medium' | 'high' {
  const recentVitals = patient.vitals.slice(-5);
  let abnormalCount = 0;
  
  for (const vital of recentVitals) {
    const threshold = this.alertThresholds.get(vital.type);
    if (!threshold) continue;
    
    // Check both min AND max
    const isAboveMax = vital.value > threshold.maxValue!;
    const isBelowMin = vital.value < threshold.minValue!;
    
    if (isAboveMax || isBelowMin) {
      abnormalCount++;
    }
  }

  // Adjusted thresholds
  if (abnormalCount === 0) return 'low';
  if (abnormalCount === 1) return 'high'; // One abnormal vital is serious
  if (abnormalCount <= 3) return 'medium'; // Multiple abnormalities
  return 'high'; // Many abnormalities
}
```

---

## PART 2: Feature Extension

### 1. Define Alert Interface

```typescript
export interface Alert {
  type: Vital['type'];
  actualValue: number;
  expectedMin?: number;
  expectedMax?: number;
  severity: 'warning' | 'critical';
}
```

### 2. Implement getPatientsByRiskLevel()

```typescript
getPatientsByRiskLevel(level: 'low' | 'medium' | 'high'): PatientRecord[] {
  const results: PatientRecord[] = [];
  
  for (const patient of this.patients.values()) {
    if (patient.riskLevel === level) {
      results.push(patient);
    }
  }
  
  return results;
}

// Or more concise:
getPatientsByRiskLevel(level: 'low' | 'medium' | 'high'): PatientRecord[] {
  return Array.from(this.patients.values())
    .filter(p => p.riskLevel === level);
}
```

### 3. Implement getAverageVitalOverTime()

```typescript
getAverageVitalOverTime(patientId: string, vitalType: Vital['type']): number {
  const patient = this.patients.get(patientId);
  if (!patient) return 0;
  
  const vitals = patient.vitals.filter(v => v.type === vitalType);
  
  if (vitals.length === 0) return 0;
  
  const sum = vitals.reduce((total, v) => total + v.value, 0);
  return sum / vitals.length;
}
```

### 4. Implement checkAlertsForPatient()

```typescript
checkAlertsForPatient(patientId: string): Alert[] {
  const patient = this.patients.get(patientId);
  if (!patient) return [];
  
  const alerts: Alert[] = [];
  const recentVitals = patient.vitals.slice(-5); // Last 5
  
  for (const vital of recentVitals) {
    const threshold = this.alertThresholds.get(vital.type);
    if (!threshold) continue;
    
    const isBelowMin = vital.value < threshold.minValue!;
    const isAboveMax = vital.value > threshold.maxValue!;
    
    if (isBelowMin || isAboveMax) {
      alerts.push({
        type: vital.type,
        actualValue: vital.value,
        expectedMin: threshold.minValue,
        expectedMax: threshold.maxValue,
        severity: this.calculateSeverity(vital.type, vital.value, threshold),
      });
    }
  }
  
  return alerts;
}

// Helper method
private calculateSeverity(
  type: Vital['type'],
  value: number,
  threshold: AlertThreshold
): 'warning' | 'critical' {
  // Oxygen saturation is critical when low
  if (type === 'oxygen_saturation' && value < 90) return 'critical';
  
  // Heart rate extremes are critical
  if (type === 'heart_rate' && (value < 50 || value > 120)) return 'critical';
  
  return 'warning';
}
```

---

## Key Insights

### Risk Level Logic
- **LOW:** All vitals normal
- **MEDIUM:** 2-3 abnormal vitals
- **HIGH:** 1 abnormal vital (unexpected but critical) OR 4+ abnormal

### Alert System
- Only recent vitals (last 5) count for alerts
- Each alert tracks the expected vs actual range
- Severity helps distinguish critical from routine alerts

### Edge Cases to Consider
- Patient has no vitals recorded
- Patient has only 1 vital recorded
- All recent vitals are abnormal
- Mixed vital types (some high, some low)

---

## Testing Your Solution

```bash
# Run all tests
npm test

# Run only patient monitor tests
npm test -- patientMonitor.spec.ts

# Run specific test
npm test -- --testNamePattern="should mark patient as HIGH"

# Watch mode (auto-rerun on changes)
npm test -- --watch
```

---

## Common Mistakes to Avoid

❌ **Mistake:** Forgetting to check `maxValue`
```typescript
// Wrong
if (vital.value < threshold.minValue) {
```
✅ **Correct:**
```typescript
if (vital.value < threshold.minValue || vital.value > threshold.maxValue) {
```

❌ **Mistake:** Not handling undefined thresholds
```typescript
// Can crash
const threshold = this.alertThresholds.get(vital.type);
if (threshold.minValue < vital.value) {
```
✅ **Correct:**
```typescript
if (!threshold) continue;
if (vital.value < threshold.minValue!) {
```

❌ **Mistake:** Wrong risk calculation logic
```typescript
// Wrong - doesn't account for severity
if (abnormalCount >= 1) return 'high';
```
✅ **Correct:**
```typescript
// Even 1 abnormal vital is serious
if (abnormalCount === 1) return 'high';
if (abnormalCount <= 3) return 'medium';
```

---

## Interview Talking Points

When explaining your solution:

1. **Problem Understanding:**
   - "The bug was checking only minimum values, not maximums"
   - "Risk levels weren't properly calibrated to patient severity"

2. **Design Decisions:**
   - "I used recent vitals only (last 5) to avoid stale data"
   - "I introduced a severity level for alerts to help prioritization"

3. **Testing:**
   - "I verified edge cases like patients with no vitals"
   - "I checked both upper and lower bounds for each vital type"

4. **Improvements:**
   - "For production, I'd add timestamps to alerts"
   - "Could implement trend analysis (vitals worsening over time)"
   - "Might add patient notification system for critical alerts"

---

Good luck! Remember: The interview is about your problem-solving approach, not just getting it right. 🚀
