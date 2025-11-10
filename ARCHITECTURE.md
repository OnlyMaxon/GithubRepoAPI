# Architecture Overview

This document explains how the project is structured, how data flows through the app, and the key decisions behind the implementation.

## Stack

- Runtime/UI: React 19 + Radix primitives (custom UI in `src/components/ui`)
- Styling: Tailwind CSS v4, design tokens via `theme.json`
- Build: Vite 6 + SWC React plugin, Spark vite plugins
- DX: TypeScript 5 (no type-check on build for speed), ESLint v9 flat config
- Spark: `@github/spark` for integrations and the `useKV` persistent state hook

## App bootstrapping

- `index.html` mounts the app into `#root` and includes base CSS.
- `src/main.tsx`
  - Imports Spark web components: `import "@github/spark/spark"`
  - Renders `<App />` under `react-error-boundary` with a custom fallback (`src/ErrorFallback.tsx`). In dev, errors are rethrown for a better dev experience.
  - Loads global styles: `main.css`, `styles/theme.css`, `index.css`.

## Folder layout

```
src/
  App.tsx                 # main page; tabs for Achievements/Repositories
  ErrorFallback.tsx       # production-only error boundary UI
  components/             # feature and shared UI components
    AchievementCard.tsx
    AchievementDetails.tsx
    RepositoryList.tsx
    UserProfileHeader.tsx
    ui/                   # Radix-driven UI primitives styled with Tailwind
  hooks/
    use-mobile.ts         # responsive helper (matchMedia)
  lib/
    achievements.ts       # domain model and static achievement catalog
    utils.ts              # helpers (cn())
  styles/
    theme.css             # CSS variables for theme tokens
```

## Data model and flow

- Achievements are defined statically in `src/lib/achievements.ts`.
- The app resolves a GitHub username in two ways:
  1) If running inside a Spark-enabled context, `window.spark.user()` is used to prefill the current GitHub user.
  2) A user can search any username in `UserProfileHeader`.
- `App.tsx` fetches user data from the public GitHub REST API (`GET /users/:username`).
  - Errors are surfaced using `sonner` toasts (404 vs. generic/network).
  - The data is normalized to `UserData`.
- Persistence: `useKV` from Spark stores small pieces of state locally
  - `github-user-data` — last loaded user
  - `unlocked-achievements` — ids of achievements the app considers unlocked (simulated)

### Simulated achievement logic

`simulateUnlockedAchievements(user)` in `App.tsx` marks some achievements as unlocked based on simple heuristics (public repos, followers, account age). `getAchievementProgress` derives a percentage for each item to show partial progress.

Note: This is intentionally heuristic; it does not call any private APIs. Real unlock status would require more detailed GitHub events/PR/Dicussions data.

## UI structure

- `App.tsx` renders two top-level tabs:
  - Achievements: grid of `AchievementCard` filtered by All/Unlocked/Locked.
  - Repositories: `RepositoryList` shows user repos with simple sorting; uses public GitHub API (`/users/:username/repos`).
- `AchievementDetails` is a dialog showing requirements and tips, with progress if partially complete.
- `UserProfileHeader` renders avatar, progress bar, and the username search.
- All common primitives (Button, Card, Tabs, Dialog, etc.) live under `src/components/ui` and are styled with Tailwind + Radix.

## Styling & theming

- Tailwind v4 config in `tailwind.config.js` reads tokens from `theme.json` if present.
- Custom CSS variables (colors, radii, spacing) are referenced in the Tailwind theme.
- Dark mode is driven by a data attribute: `[data-appearance="dark"]`.

## Error handling

- Global: `react-error-boundary` wraps the tree; dev mode rethrows to surface stacktraces via Vite overlay. In production, an error alert with a "Try Again" button is displayed.
- Fetch calls: explicit 404 handling with toasts; generic network failures also show toasts.

## Tooling

- Scripts (`package.json`):
  - `dev`: start Vite dev server
  - `build`: `tsc -b --noCheck && vite build`
  - `preview`: preview static build
  - `lint`: ESLint v9 (flat config)
  - `kill`: Linux-only helper (not used on Windows)
- ESLint: flat config in `eslint.config.js` with `@eslint/js`, `typescript-eslint`, `react-hooks`, and `react-refresh`.

## External dependencies & constraints

- Public GitHub API calls are unauthenticated and subject to rate limits (60/hr per IP). Heavy usage may require a token-proxy or server.
- Spark-specific functionality:
  - `window.spark.user()` is available only in Spark-aware environments. The app guards this with try/catch and works without it by using manual search.

## Quality gates (current status)

- Build: PASS (Vite build succeeds). Note: CSS optimizer reports warnings for container query-like tokens; these are benign with current setup.
- Lint: PASS with warnings (hooks exhaustive-deps, fast-refresh guidance). No blocking errors.
- Tests: Not configured.

## Opportunities / recommendations

1. Achievement engine
   - Move from simulated unlocks to real checks by calling relevant GitHub endpoints (PRs, issues, discussions, stars). Cache results via `react-query` (`@tanstack/react-query` already present) with per-user keys.
   - Define per-achievement `checkProgress(user)` functions directly in `achievements.ts` for co-located logic.

2. State & data
   - Adopt `react-query` for fetches (users, repos), retries, cache, and loading states. Keeps `App.tsx` slimmer and handles race conditions.
   - Persist last-searched username in `useKV` for better UX.

3. Routing
   - Consider adding client-side routing (e.g., `/user/:login`) for shareable links to a profile and deep-linking to an achievement via query params.

4. DX
   - Keep `eslint.config.js` (added) and optionally add Prettier or formatting rules.
   - The `kill` script is Linux-only; consider removing or guarding for Windows environments.

5. Performance
   - Split the Achievements grid via code-splitting or windowing if the catalog grows large.
   - Memoize derived lists (`filteredAchievements`) and progress calculations if they become expensive.

6. A11y
   - Radix provides a strong base; ensure all interactive controls have labels and keyboard focus states (most are covered). Consider testing with Axe.

7. Testing
   - Add Vitest + React Testing Library to validate rendering and critical flows (user search, repo list, details dialog open/close). Keep a couple of unit tests for `simulateUnlockedAchievements` and any future `checkProgress` functions.

8. API limits & resiliency
   - Show remaining rate-limit in the UI if detected; back off with friendly messaging.
   - Optional: add a tiny proxy/server for authenticated requests when needed.

## Key contracts

- `UserData`: minimal normalized user object used across components.
- `Achievement`:
  - id, name, description, tier, icon, category, requirements, tips
  - optional `checkProgress(userData) -> { progress, current, target, unlocked }`

## Edge cases considered

- Unknown user (404)
- Network failures
- No public repos / no topics
- Non-Spark environment (no `window.spark`) — app still usable via manual search

---

If you have questions or want to iterate on the achievement engine (real data integration), see the recommendations above; happy to help wire it up.
