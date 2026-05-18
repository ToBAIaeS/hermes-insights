# Git & Code Conventions

## Branch Strategy

```
main (protected) → develop → feature/*
                      ↓
                  release/*
                      ↓
                   main (tag v*)
```

- **main** — Production-ready code. Only merge via PR with passing CI.
- **develop** — Integration branch. All feature branches target this.
- **feature/\*** — New features or fixes. Naming: `feat/<short-description>`, `fix/<short-description>`
- **release/\*** — Cut from develop for release prep. Naming: `release/v1.2.0`
- **hotfix/\*** — Emergency fixes from main. Naming: `hotfix/<short-description>`

## Conventional Commits

Format: `<type>(<scope>): <description>`

Types: `feat`, `fix`, `refactor`, `style`, `docs`, `test`, `chore`, `ci`, `build`, `revert`

Examples:

- `feat(auth): add API key login screen`
- `fix(dashboard): handle empty stats response`
- `chore(deps): update expo to SDK 54.0.33`
- `ci: add EAS build workflow for release tags`

## PR Process

1. Create branch from `develop`
2. Implement + write tests
3. Run `npm run check-all` locally
4. Open PR → CI must pass (lint, typecheck, test)
5. At least one review required (for `main` target)
6. Squash merge into `develop`

## Code Quality

- **ESLint**: Config in `.eslintrc.json` — runs in CI
- **Prettier**: Config in `.prettierrc` — runs in CI (`--check` mode)
- **TypeScript**: `strict: true` in `tsconfig.json` — `tsc --noEmit` in CI
- **Jest**: Unit tests, coverage reports uploaded as artifacts

## Available Scripts

| Command                 | Description               |
| ----------------------- | ------------------------- |
| `npm run lint`          | ESLint check (0 warnings) |
| `npm run lint:fix`      | ESLint auto-fix           |
| `npm run format`        | Prettier format files     |
| `npm run format:check`  | Prettier check            |
| `npm run typecheck`     | TypeScript type check     |
| `npm run test`          | Run Jest tests            |
| `npm run test:coverage` | Jest with coverage        |
| `npm run check-all`     | All checks in sequence    |
