# Hermes Insights

Mobile dashboard for Hermes Dashboard API and Honcho API monitoring.

## Stack

- **Expo SDK 54** — React Native framework
- **TypeScript** (strict mode)
- **expo-router** — Navigation
- **zustand** — State management
- **react-native-paper** — MD3 UI components
- **axios** — HTTP client
- **expo-secure-store** — Secure credential storage

## Prerequisites

- Node.js 20+
- npm 10+
- Expo CLI (`npm install -g expo-cli`)
- For EAS Build: Expo account + `EXPO_TOKEN` secret in GitHub repo

## Setup

```bash
npm install
npx expo start
```

## Development

```bash
# Start dev server
npm start

# Platform-specific
npm run ios        # iOS simulator
npm run android    # Android emulator
npm run web        # Web browser
```

## Code Quality

```bash
# Run all checks (lint + typecheck + format + test)
npm run check-all

# Individual checks
npm run lint           # ESLint (0 warnings policy)
npm run lint:fix       # ESLint auto-fix
npm run format         # Prettier format
npm run format:check   # Prettier check
npm run typecheck      # TypeScript strict check
npm run test           # Jest unit tests
npm run test:coverage  # Jest with coverage report
```

CI enforces all checks on every push to `main` and `develop`.

## EAS Build

### Build Profiles (eas.json)

| Profile       | iOS       | Android    | Distribution |
| ------------- | --------- | ---------- | ------------ |
| `development` | Simulator | APK        | Internal     |
| `simulator`   | Simulator | —          | Internal     |
| `preview`     | —         | APK        | Internal     |
| `production`  | App Store | Play Store | Store        |

### Build Commands

```bash
# Install EAS CLI
npm install -g eas-cli

# Login
eas login

# iOS Simulator build (local dev testing)
eas build --platform ios --profile simulator

# Android APK (preview/dogfooding)
eas build --platform android --profile preview

# Production builds (triggered automatically by v* tags)
eas build --platform ios --profile production
eas build --platform android --profile production
```

### Release Tags

Push a `v*` tag to trigger automatic EAS builds via GitHub Actions:

```bash
git tag v1.0.0
git push origin v1.0.0
```

Production builds (e.g. `v1.0.0`, `v2.0.0`) also trigger the `production-build` job.

## CI/CD

- **CI Pipeline** (`.github/workflows/ci.yml`): Lint, type-check, test on every push/PR to `main` or `develop`
- **EAS Build Pipeline** (`.github/workflows/eas-build.yml`): Simulator + APK builds on `v*` tags

### Required GitHub Secrets

| Secret       | Purpose                           |
| ------------ | --------------------------------- |
| `EXPO_TOKEN` | Expo authentication for EAS Build |

## Architecture

```
src/
├── api/           # HermesClient + HonchoClient (axios-based)
├── types/         # TypeScript type definitions
├── stores/        # Zustand stores (auth, hermes, honcho)
├── screens/       # Screen components
├── theme/         # Dark MD3 theme
├── utils/         # Helpers
└── __tests__/     # Unit tests
```

## Git Workflow

See [docs/CONVENTIONS.md](docs/CONVENTIONS.md) for:

- Branch strategy (main/develop/feature)
- Conventional commits format
- PR process and review requirements
- Code quality enforcement

## Authentication

The Auth screen stores API URLs and keys in **SecureStore** (encrypted on-device). Both APIs support:

- **Hermes Dashboard API** — `hermes.tobaiaes.dev` (required)
- **Honcho API** — `honcho.tobaiaes.dev` (optional)

## License

Private — Tobi AeS
