# Node.js + TypeScript Project

A fully configured Node.js project with TypeScript, Jest testing, and ts-node for development.

## 🚀 Quick Start

```bash
npm install      # Install dependencies
npm run build    # Compile TypeScript → JavaScript
npm start        # Run the compiled app
npm run dev      # Run TypeScript directly (development)
npm test         # Run Jest tests
npm run clean    # Remove dist folder
```

## 📁 Project Structure

```
.
├── app.ts                 # Main application (TypeScript)
├── app.test.ts           # Unit tests (Jest + TypeScript)
├── package.json          # Dependencies & scripts
├── tsconfig.json         # TypeScript compiler config
├── jest.config.js        # Jest testing config
├── dist/                 # Compiled JavaScript (generated)
└── node_modules/         # Dependencies
```

## 🛠️ Tech Stack

- **Node.js**: v25.8.0 (or latest)
- **TypeScript**: v5.0.0
- **Jest**: v29.0.0 (testing framework)
- **ts-node**: v10.0.0 (run TypeScript directly)

## 📝 Scripts

| Script | Purpose |
|--------|---------|
| `npm run build` | Compile TypeScript to JavaScript in `dist/` |
| `npm start` | Run compiled app from `dist/app.js` |
| `npm run dev` | Run TypeScript directly (no compilation needed) |
| `npm test` | Run Jest test suite |
| `npm run clean` | Remove `dist/` folder |

## ✅ Verified

- ✓ Node.js installed via Homebrew
- ✓ npm dependencies installed
- ✓ TypeScript compilation working
- ✓ App runs successfully
- ✓ Jest tests passing
- ✓ Both `npm start` and `npm run dev` working

Ready for the Cadence coding exercise!
