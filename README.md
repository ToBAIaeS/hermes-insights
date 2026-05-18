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

## Setup

```bash
npm install
npx expo start
```

## Architecture

```
src/
├── api/           # HermesClient + HonchoClient (axios-based)
├── types/         # TypeScript type definitions
├── stores/        # Zustand stores (auth, hermes, honcho)
├── screens/       # Screen components
├── theme/         # Dark MD3 theme
└── utils/         # Helpers
```

## Authentication

The Auth screen stores API URLs and keys in **SecureStore** (encrypted on-device). Both APIs support:

- **Hermes Dashboard API** — `hermes.tobaiaes.dev` (required)
- **Honcho API** — `honcho.tobaiaes.dev` (optional)

## License

Private — Tobi AeS