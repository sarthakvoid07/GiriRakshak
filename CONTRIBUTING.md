# Contributing to GiriRakshak

Six people are working in one repo on a deadline. These rules exist so we spend the time building instead of resolving conflicts.

## Folder ownership

You may **read and import from** any folder. You may only **write to** the folders you own.

| Folder / file | Owner | Notes |
|:--|:--|:--|
| `ml/` | **M** | Model training and scoring. |
| `src/firebase/config.js`, `auth.js`, `ingest.js` | **B1** | Firebase init and writes. |
| `src/firebase/reads.js`, `src/api/` | **B2** | Read layer, weather, risk engine. |
| `src/data/` | **B1** | Seed fixtures. Frozen — see below. |
| `src/pages/Login.jsx`, `FieldReport.jsx`, `MyReports.jsx` | **F1** | |
| `src/pages/RiskMap.jsx`, `ZoneDetail.jsx` | **F2** | |
| `src/pages/DistrictDashboard.jsx`, `src/components/` | **F3** | |

Need a change in someone else's folder? Ask them in the group and let them make it. A two-minute message beats a thirty-minute merge conflict.

## The schema is frozen

Field names in `riskZones` and `fieldReports` are fixed. They are documented in the [README](README.md#data-model) and mirrored in `src/data/`.

**Do not rename a field.** Every layer — the model, the read layer, and three separate frontend pages — reads these names. Renaming one breaks all of them silently, and you will find out during the demo.

If a field genuinely needs to change, raise it with B1 and B2 first and change every consumer in the same commit.

## Fixtures vs. live data

`src/data/dummyZones.js` and `dummyReports.js` exist so frontend work isn't blocked on the backend. Import them while you build, then swap to the real reads:

```js
// While building
import dummyZones from '../data/dummyZones';

// Once your screen works
import { getZones } from '../firebase/reads';
```

Nothing ships to `main` still importing from `src/data/`.

## Branches and commits

```bash
git checkout -b f2/risk-map
# ...work...
git add .
git commit -m "risk map: colour zones by riskLevel"
git push -u origin f2/risk-map
```

- Branch names: `<role>/<what>` — `b2/weather-api`, `f1/login-screen`.
- **Never commit directly to `main`.** Open a pull request.
- One commit message per actual change. Three commits reading `firestore read functions working` tell a reviewer — and a judge — nothing about what happened.
- Pull before you push: `git pull --rebase origin main`.

## Secrets

`.env` is gitignored and has never been committed. Keep it that way.

- Copy `.env.example` to `.env` and fill in your own keys.
- Never paste a key into a source file, a commit message, an issue, or a screenshot.
- If a key is ever pushed, rotate it in the Firebase and OpenWeather consoles immediately — removing the commit is not enough, it stays in the history.

## Before you open a pull request

- [ ] `npm run lint` passes
- [ ] `npm run build` completes without errors
- [ ] No `console.log` left in committed code
- [ ] No imports from `src/data/` in shipped screens
- [ ] `.env` is not in `git status`
