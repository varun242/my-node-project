# Cadence Care RPM - Interview Practice Problem

## Overview

This is a realistic coding exercise designed to mirror the kinds of problems you'll encounter as an engineer at Cadence Care RPM. The system simulates a **Patient Monitoring Platform** that tracks patient vitals and assess risk levels.

## Problem Structure

### **PART 1: Bug Fix** 🐛
The `PatientMonitor.calculateRiskLevel()` method has bugs:
- It only checks the minimum value threshold, not the maximum
- It doesn't properly handle all vital types
- Risk level calculation is incorrect

**Your task:** Fix the logic to correctly identify high/medium/low risk patients.

### **PART 2: Feature Extension** ✨
Implement three new methods to extend the monitoring system:

1. **`getPatientsByRiskLevel(level)`** - Filter patients by risk level
2. **`getAverageVitalOverTime(patientId, vitalType)`** - Calculate average vitals
3. **`checkAlertsForPatient(patientId)`** - Generate alerts for abnormal vitals

You'll also need to define an `Alert` interface.

---

## Medical Context

Understanding these vitals is important for the context:

| Vital Type | Normal Range | Unit | Risk Threshold |
|---|---|---|---|
| **Heart Rate** | 60-100 | bpm | <60 or >100 = abnormal |
| **Blood Pressure** | 90-140 | systolic | <90 or >140 = abnormal |
| **Temperature** | 36.5-37.5 | °C | <36.5 or >37.5 = abnormal |
| **Oxygen Saturation** | 95-100 | % | <95 = critical |

---

## Getting Started

### Run Tests
```bash
cd /Users/sachiparekh/my-node-project/src
npm test
```

### Run in Development Mode
```bash
npm run dev
```

### Build and Run
```bash
npm run build
npm start
```

---

## Test Structure

Tests are organized in `/src/_spec/patientMonitor.spec.ts`:

- **Part 1 Tests (Bug Fix):** Currently failing - tests the risk level calculation
- **Part 2 Tests (Features):** Commented out - uncomment as you implement

### Running Specific Tests
```bash
npm test -- patientMonitor.spec.ts
npm test -- --testNamePattern="calculateRiskLevel"
```

---

## Hints & Tips

### Part 1: Bug Fix
1. Look at the `calculateRiskLevel` method
2. Check both `minValue` and `maxValue` thresholds
3. Count how many vitals are abnormal
4. Adjust risk level logic based on abnormal count

### Part 2: Feature Extension
1. **Define the Alert interface** first - what information does an alert need?
   - Vital type
   - Actual value
   - Expected min/max
   - Patient ID (optional)

2. **getPatientsByRiskLevel()** is straightforward - filter the patients map

3. **getAverageVitalOverTime()** requires:
   - Finding all vitals of a specific type
   - Summing their values
   - Dividing by count

4. **checkAlertsForPatient()** requires:
   - Getting the patient's recent vitals
   - Checking each against thresholds
   - Creating Alert objects for violations

---

## Key Concepts Being Tested

✅ **Problem-solving** - Debug existing code  
✅ **Code comprehension** - Understand complex logic  
✅ **Feature implementation** - Add new functionality  
✅ **Type safety** - Work with TypeScript interfaces  
✅ **Testing** - Ensure your code passes tests  
✅ **Real-world context** - Understand healthcare domain  

---

## Interview Tips

1. **Read the code carefully** - Understand what exists before making changes
2. **Run the tests first** - See what's failing and what's expected
3. **Explain your approach** - Talk through your solution
4. **Ask clarifying questions** - What should happen if a patient has no vitals?
5. **Write clean code** - Use descriptive variable names
6. **Test incrementally** - Fix part 1, then implement part 2
7. **Consider edge cases** - Empty arrays, missing data, etc.

---

## Expected Time

- **Part 1 (Bug Fix):** 10-15 minutes
- **Part 2 (Feature Extension):** 20-30 minutes
- **Total:** 30-45 minutes

---

## Solution Verification

After implementing:
1. All tests should pass: `npm test`
2. Build should succeed: `npm run build`
3. Code should run without errors: `npm start`

---

## Questions?

If you get stuck:
1. Review the test cases - they show expected behavior
2. Check the interface definitions
3. Look at existing methods for patterns
4. Use `console.log()` for debugging
5. Break down the problem into smaller steps

Good luck! 🚀
