# Interview Practice Problem - Summary

## 📚 What You Have

A complete practice coding problem designed for Cadence Care RPM interview, focusing on:
- **Real-world healthcare domain** (Patient monitoring system)
- **Debugging skills** (Fix the buggy calculateRiskLevel method)
- **Feature implementation** (Add 3 new methods)
- **TypeScript & Testing** (Full test suite included)

---

## 📁 Files Overview

```
my-node-project/
├── INTERVIEW_PROBLEM.md       ← Start here! Problem description
├── SOLUTION_GUIDE.md          ← If you get stuck
├── QUICK_START.sh             ← Command reference
├── README.md                  ← Project overview
├── package.json               ← Dependencies
├── tsconfig.json              ← TypeScript config
└── src/
    ├── patientMonitor.ts      ← Code you need to fix/extend
    ├── app.ts                 ← Hello world example
    ├── jest.config.js
    └── _spec/
        ├── patientMonitor.spec.ts  ← Tests (some failing)
        └── app.spec.ts
```

---

## 🎯 Problem Breakdown

### Part 1: Debug (10-15 min)
Fix the `calculateRiskLevel()` method in `src/patientMonitor.ts`

**Current Issues:**
- ❌ Only checks minimum thresholds, not maximum
- ❌ Risk calculation is wrong
- ❌ Multiple tests failing

**What to do:**
- Check both `minValue` AND `maxValue` 
- Adjust the risk assessment logic
- Make all Part 1 tests pass

### Part 2: Implement (20-30 min)
Add three new methods:

1. `getPatientsByRiskLevel(level)` - Filter patients
2. `getAverageVitalOverTime(patientId, vitalType)` - Calculate averages
3. `checkAlertsForPatient(patientId)` - Generate alerts

Plus define the `Alert` interface.

---

## 🏃 How to Practice

### Step 1: Understand the Problem
```bash
cat INTERVIEW_PROBLEM.md
```

### Step 2: See What's Broken
```bash
cd /Users/sachiparekh/my-node-project/src
npm test
```

**Current Status:**
- ✅ 7 passing tests
- ❌ 4 failing tests (Part 1 bugs)
- ⏸️ 7 skipped tests (Part 2 to implement)

### Step 3: Fix the Bugs
Edit `src/patientMonitor.ts` and fix `calculateRiskLevel()`

```bash
npm test
# You should see 8 tests passing now
```

### Step 4: Implement Features
Add the three new methods to `src/patientMonitor.ts`

```bash
npm test
# All tests should pass!
```

### Step 5: Verify Everything Works
```bash
npm run build    # TypeScript compiles
npm start        # App runs without errors
```

---

## 💡 Tips for Success

✅ **Read the tests first** - They show you exactly what's expected  
✅ **Start with Part 1** - It's the foundation for Part 2  
✅ **Test incrementally** - Don't implement everything at once  
✅ **Use TypeScript types** - They help catch bugs  
✅ **Consider edge cases** - Empty arrays, null values, etc.  
✅ **Explain your thinking** - During interview, talk through your approach  

---

## 🧪 Testing Commands

```bash
# Run all tests
npm test

# Run only patient monitor tests
npm test -- patientMonitor.spec.ts

# Run tests matching a pattern
npm test -- --testNamePattern="calculateRiskLevel"

# Watch mode (auto-rerun on file changes)
npm test -- --watch

# Show test coverage
npm test -- --coverage
```

---

## 🔧 Development Commands

```bash
# Build TypeScript → JavaScript
npm run build

# Run the app
npm start

# Run TypeScript directly (dev mode)
npm run dev

# Clean build artifacts
npm run clean

# Git commit your work
git add .
git commit -m "Fix bugs and implement features"
git push
```

---

## 📊 Domain Knowledge

### Medical Vitals Being Monitored

| Vital | Normal | Unit | Clinical Significance |
|-------|--------|------|----------------------|
| **Heart Rate** | 60-100 | bpm | Too low = bradycardia, too high = tachycardia |
| **Blood Pressure** | 90-140 | mmHg | High = hypertension, low = hypotension |
| **Temperature** | 36.5-37.5 | °C | High = fever, low = hypothermia |
| **Oxygen Sat** | 95-100 | % | Below 90 = hypoxia (critical) |

### Risk Assessment Logic
- **LOW:** All vitals normal ✅
- **MEDIUM:** Few abnormal vitals ⚠️
- **HIGH:** Critical abnormalities 🚨

---

## 🎓 Interview Strategy

When you get this problem in the actual interview:

1. **Ask clarifying questions** (5 min)
   - "Should I update the thresholds based on patient condition?"
   - "What should happen if vitals data is missing?"

2. **Plan your approach** (5 min)
   - Write pseudocode
   - Identify edge cases
   - Think about data structures

3. **Implement Part 1** (10-15 min)
   - Fix the bugs
   - Make tests pass
   - Ask for confirmation

4. **Implement Part 2** (15-20 min)
   - Add new methods one at a time
   - Test after each implementation
   - Refactor if needed

5. **Discussion & Improvements** (5-10 min)
   - Walk through your solution
   - Discuss trade-offs
   - Mention potential improvements

---

## 🚀 Next Steps

1. **Try solving it yourself first** - Don't peek at the solution guide!
2. **Run the tests** to see what's failing
3. **Fix the bugs** in Part 1
4. **Implement the features** in Part 2
5. **Verify all tests pass** - `npm test`
6. **Commit your work** - `git add . && git commit -m "Solution"`

---

## 📞 Need Help?

**If stuck on Part 1 (bugs):**
- Review the failing test messages
- Check what threshold is being violated
- Look at how min/max values are used

**If stuck on Part 2 (features):**
- Define the Alert interface first
- Implement one method at a time
- Look at existing method patterns in the class
- Check the test expectations

**Still stuck?**
- Read `SOLUTION_GUIDE.md` for detailed walkthrough
- Review the test cases in `_spec/patientMonitor.spec.ts`

---

## ✨ What You'll Learn

✅ Debugging production-like code  
✅ Working with TypeScript interfaces  
✅ Real healthcare domain logic  
✅ Writing testable code  
✅ Test-driven development practices  
✅ Git workflow & version control  
✅ Interview problem-solving techniques  

---

## 🎯 Success Criteria

- ✅ All 11 tests passing
- ✅ Code compiles without errors
- ✅ App runs successfully  
- ✅ Changes committed to Git
- ✅ Can explain your solution

---

**You're ready! Good luck with your Cadence interview! 🚀**

Remember: This problem is about your approach, not just getting the right answer. Show your problem-solving process, ask questions, and explain your thinking.
