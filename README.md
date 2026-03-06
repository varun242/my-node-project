# Cadence Care RPM Interview Practice Environment

A fully configured Node.js + TypeScript project with a **real-world interview practice problem** designed for Cadence Care RPM engineering interviews.

## 🎯 Interview Practice Problem

This repository includes a **Patient Monitoring System** coding exercise focusing on:
- 🐛 **Debugging** - Fix bugs in the risk assessment logic
- ✨ **Feature Implementation** - Add 3 new monitoring features
- 🧪 **Testing** - Pass all test cases with your implementation

**Start here:** Read [`INTERVIEW_PROBLEM.md`](./INTERVIEW_PROBLEM.md)

## � Practice Problem Status

```
Tests: 4 failing (Part 1: Bugs) | 8 passing | 12 total
Part 1: Bug Fix - calculateRiskLevel()
Part 2: Feature Implementation (3 methods to add)
Estimated Time: 30-45 minutes
```

## 🚀 Quick Start

### Setup (Already Done)
```bash
# Node.js v25.8.0
# npm dependencies installed
# TypeScript configured
# Jest tests ready
```

### Practice the Problem
```bash
cd /Users/sachiparekh/my-node-project/src

# See what's failing
npm test

# Fix the bugs in patientMonitor.ts
# (See INTERVIEW_PROBLEM.md for details)

# Run tests again to verify
npm test

# All tests should pass!
```

## 📚 Documentation

| File | Purpose |
|------|---------|
| **[INTERVIEW_PROBLEM.md](./INTERVIEW_PROBLEM.md)** | 📖 Full problem description, context, and requirements |
| **[PRACTICE_SUMMARY.md](./PRACTICE_SUMMARY.md)** | 📋 Quick overview and learning objectives |
| **[SOLUTION_GUIDE.md](./SOLUTION_GUIDE.md)** | 💡 Detailed solution walkthrough (if you get stuck) |
| **[QUICK_START.sh](./QUICK_START.sh)** | 🔧 Command reference guide |

## �️ Project Structure

```
my-node-project/
├── INTERVIEW_PROBLEM.md          ← Start here!
├── PRACTICE_SUMMARY.md
├── SOLUTION_GUIDE.md
├── QUICK_START.sh
├── README.md                      (this file)
├── package.json
├── tsconfig.json
└── src/
    ├── patientMonitor.ts          ← Code you need to fix
    ├── app.ts
    ├── jest.config.js
    └── _spec/
        ├── patientMonitor.spec.ts ← Your test suite
        └── app.spec.ts
```

## 💻 Available Commands

### Testing
```bash
cd src
npm test                                    # Run all tests
npm test -- patientMonitor.spec.ts         # Patient monitor tests only
npm test -- --testNamePattern="calculateRiskLevel"  # Specific test
```

### Development
```bash
npm run dev      # Run TypeScript directly
npm run build    # Compile TypeScript
npm start        # Run compiled JavaScript
npm run clean    # Remove build artifacts
```

### Git
```bash
git status       # Check changes
git add .        # Stage changes
git commit -m "Your message"  # Commit
git push         # Push to GitHub
```

## 🎓 What You'll Practice

✅ **Debugging** - Find and fix logic errors  
✅ **Feature Development** - Implement new functionality  
✅ **TypeScript** - Strong typing and interfaces  
✅ **Testing** - Test-driven development  
✅ **Problem Solving** - Real-world healthcare domain  
✅ **Code Quality** - Clean, readable implementations  
✅ **Git Workflow** - Version control and commits  

## 🏥 Domain Context

The problem simulates a **Remote Patient Monitoring** system for Cadence Care:
- Track patient vital signs (heart rate, blood pressure, temperature, O₂ saturation)
- Assess patient risk levels (low/medium/high)
- Generate alerts for abnormal vitals
- Monitor trends over time

## 📊 Tech Stack

- **Runtime**: Node.js v25.8.0
- **Language**: TypeScript v5.0.0
- **Testing**: Jest v29.0.0
- **Package Manager**: npm
- **Version Control**: Git + GitHub

## 🔗 Links

- 📂 GitHub: `https://github.com/varun242/my-node-project`
- 👤 Author: Varun Mehta (varun242@gmail.com)
- 🏢 Interview Target: Cadence Care RPM

## 📝 Next Steps

1. **Read** [`INTERVIEW_PROBLEM.md`](./INTERVIEW_PROBLEM.md)
2. **Run** `npm test` to see failing tests
3. **Fix** the `calculateRiskLevel()` bug in `src/patientMonitor.ts`
4. **Implement** the 3 new features
5. **Verify** all tests pass
6. **Commit** your solution

---

**Good luck with your interview! 🚀**
