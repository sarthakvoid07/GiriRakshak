<div align="center">

<img src="docs/banner.png" alt="GiriRakshak — landslide early warning for North East India" width="100%">

<br>

**Landslide early warning and community reporting for North East India**

Machine-scored risk zones, live rainfall, and geotagged reports from the people on the slope.

<br>

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev)
[![Firebase](https://img.shields.io/badge/Firestore-Realtime-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com)
[![OpenWeather](https://img.shields.io/badge/OpenWeather-Live%20Rainfall-EB6E4B?style=for-the-badge)](https://openweathermap.org)
[![Vercel](https://img.shields.io/badge/Vercel-Live-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://giri-rakshak.vercel.app)
[![License](https://img.shields.io/badge/License-MIT-10314B?style=for-the-badge)](LICENSE)

<br>

### [**→ Live Demo**](https://giri-rakshak.vercel.app) &nbsp;·&nbsp; [Report an Issue](https://github.com/sarthakvoid07/GiriRakshak/issues) &nbsp;·&nbsp; [Data Model](#data-model)

</div>

---

## The Problem

Meghalaya and Mizoram sit under some of the heaviest rainfall on Earth. When the monsoon settles in, saturated hillsides give way — burying national highways, cutting villages off from hospitals and markets, and taking lives with almost no notice.

The warnings that exist today have two gaps:

- **Too coarse.** Alerts are issued for a whole district. A district in the North East can span a hundred kilometres of ridgeline, and the slope that fails is a two-kilometre stretch of road.
- **Too slow.** The first signs — a fresh crack across the tarmac, soil creeping over an embankment, debris at a village entrance — are seen by residents and drivers days before they reach anyone with authority to close a road.

The people closest to the hazard have the earliest information and no channel to report it.

## What GiriRakshak Does

GiriRakshak closes that loop in three steps.

| | | |
|---|---|---|
| **1. Predict** | A model scores every monitored district on terrain and rainfall history, producing a stable `riskScore` and slope profile per zone. | `ml/` |
| **2. Watch** | Live rainfall is pulled per coordinate and folded into the score, so a zone escalates as rain accumulates — not after the slope has already failed. | `src/api/` |
| **3. Report** | Residents file geotagged reports with photos — cracks, debris, slope movement, blocked roads. District officials verify and action them. | `src/pages/`, `src/firebase/` |

**Coverage today:** 15 zones across all 8 North Eastern states — Arunachal Pradesh, Assam, Manipur, Meghalaya, Mizoram, Nagaland, Sikkim and Tripura.

## Risk Scoring

Each zone carries a terrain-derived `riskScore` between 0 and 1. Rainfall is what moves it:

```js
combined = riskScore × (rainfall3day / 100)
```

| Level | Threshold | Colour | What it means on the ground |
|:--|:--|:--|:--|
| 🟢 **Low** | `< 0.15` | `#2E8B57` | Normal movement. |
| 🟡 **Moderate** | `≥ 0.15` | `#E8B33D` | Watch the slope. Reports reviewed same day. |
| 🟠 **High** | `≥ 0.30` | `#C4741A` | Restrict heavy vehicles. Field verification dispatched. |
| 🔴 **Severe** | `≥ 0.50` | `#C0392B` | Road closure advised. Village-level alerts issued. |

A steep, historically unstable zone escalates on far less rain than a gentle one — which is the whole point of scoring terrain and weather together rather than issuing a single rainfall threshold for an entire district.

## Screenshots

The app is live at **[giri-rakshak.vercel.app](https://giri-rakshak.vercel.app)** — the map and dashboard screens are in progress.

<!-- Once you have captures: save them into docs/ with these names and delete this comment wrapper.
| Risk Map | Zone Detail |
|:--:|:--:|
| <img src="docs/screenshot-map.png" width="400"> | <img src="docs/screenshot-zone.png" width="400"> |
| **Field Report** | **District Dashboard** |
| <img src="docs/screenshot-report.png" width="400"> | <img src="docs/screenshot-dashboard.png" width="400"> |
-->

## Tech Stack

| Layer | Choice | Why |
|:--|:--|:--|
| **Frontend** | React 19 + Vite 8 | Fast HMR during a hackathon build; zero-config production bundle. |
| **Database** | Cloud Firestore | Realtime listeners mean a verified report updates every open dashboard instantly. |
| **Auth** | Firebase Auth | Separates residents filing reports from officials verifying them. |
| **Storage** | Firebase Storage | Photo evidence attached to each field report. |
| **Weather** | OpenWeatherMap | Live rainfall per coordinate, keyed to each zone's lat/lon. |
| **ML** | Python (see `ml/`) | Offline terrain + rainfall-history scoring, written back as `riskScore` and `modelVersion`. |
| **Hosting** | Vercel | Push-to-deploy from `main`. |

## Getting Started

**Prerequisites** — Node.js 18+, npm, and a Firebase project with Firestore enabled.

```bash
# 1. Clone
git clone https://github.com/sarthakvoid07/GiriRakshak.git
cd GiriRakshak

# 2. Install
npm install

# 3. Configure — copy the template and fill in your own keys
cp .env.example .env

# 4. Run
npm run dev
```

The app starts on `http://localhost:5173`.

| Script | Does |
|:--|:--|
| `npm run dev` | Vite dev server with hot reload |
| `npm run build` | Production bundle into `dist/` |
| `npm run preview` | Serve the production bundle locally |
| `npm run lint` | ESLint across the project |

> **Never commit `.env`.** It is gitignored, and it must stay that way — the repo has a clean history and we intend to keep it that way.

## Data Model

Two Firestore collections. Field names are fixed — see [CONTRIBUTING.md](CONTRIBUTING.md) before renaming anything.

### `riskZones`

| Field | Type | Example |
|:--|:--|:--|
| `id` | string | `z_ml_khasi_03` |
| `district` | string | `East Khasi Hills` |
| `state` | string | `Meghalaya` |
| `latitude` / `longitude` | number | `25.5788` / `91.8933` |
| `riskLevel` | enum | `low` · `moderate` · `high` · `severe` |
| `riskScore` | number `0–1` | `0.91` |
| `rainfall3day` / `rainfall7day` | number (mm) | `210` / `380` |
| `slopeAvg` | number (degrees) | `38` |
| `roadStatus` | enum | `open` · `restricted` · `blocked` |
| `modelVersion` | string | `v3` |
| `updatedAt` | ISO 8601 | `2026-08-20T10:00:00Z` |

### `fieldReports`

| Field | Type | Example |
|:--|:--|:--|
| `id` | string | `r1` |
| `reportType` | enum | `crack` · `debris` · `slope-movement` · `road-blocked` · `other` |
| `description` | string | `New crack across the hill road, 2 m long` |
| `photoUrl` | string | Firebase Storage URL |
| `latitude` / `longitude` | number | `25.5788` / `91.8933` |
| `district` | string | `East Khasi Hills` |
| `severity` | enum | `low` · `medium` · `high` |
| `status` | enum | `pending` → `verified` → `actioned` |
| `reporterId` | string | Firebase Auth UID |
| `createdAt` | ISO 8601 | `2026-08-19T08:30:00Z` |

## Project Structure

```
GiriRakshak/
├── ml/                      # Terrain + rainfall-history risk model
├── public/                  # Static assets, favicon
├── src/
│   ├── api/
│   │   ├── weather.js       # Live rainfall by coordinate (OpenWeatherMap)
│   │   └── updateRisk.js    # Re-scores every zone and writes back to Firestore
│   ├── components/          # Shared UI
│   ├── data/                # Seed fixtures matching the schema above
│   ├── firebase/
│   │   ├── config.js        # App, Firestore, Auth, Storage init
│   │   └── reads.js         # getZones, getReports, getZonesByRisk
│   ├── pages/               # Login, FieldReport, MyReports, RiskMap,
│   │                        # ZoneDetail, DistrictDashboard
│   ├── App.jsx
│   └── main.jsx
└── vite.config.js
```

## Roadmap

**Working now**

- [x] Firestore schema live for `riskZones` and `fieldReports`
- [x] Read layer — `getZones`, `getReports`, `getZonesByRisk`
- [x] Live rainfall fetch by coordinate
- [x] Rainfall-weighted risk escalation writing back to Firestore
- [x] Zone list rendering real Firestore data
- [x] Continuous deployment to Vercel

**In progress**

- [ ] Interactive risk map with colour-coded zone overlays
- [ ] Field report submission with photo upload and geotagging
- [ ] Firebase Auth — resident and official roles
- [ ] District dashboard for report verification

**Next**

- [ ] Replace the 3-day rainfall estimate with real accumulated history
- [ ] Push and SMS alerts on escalation to `severe`
- [ ] Offline-first capture — reports queue without signal and sync later
- [ ] Assamese, Khasi, Mizo and Hindi localisation
- [ ] Firestore security rules hardened before public launch

## Team

Built for the Smart India Hackathon by a team of six.

| Role | Owns | Member |
|:--|:--|:--|
| **B1** | Firestore config, schema, auth, ingest | [Parth Lulla](https://github.com/parthlulla7) |
| **B2** | Read layer, weather API, risk engine | [sarthakvoid07](https://github.com/sarthakvoid07) |
| **F1** | Login, Field Report, My Reports | _add name_ |
| **F2** | Risk Map, Zone Detail | _add name_ |
| **F3** | District Dashboard, shared components | _add name_ |
| **M** | Risk model, terrain scoring | _add name_ |

## Contributing

Branch naming, the schema freeze, and who owns which folder are all in **[CONTRIBUTING.md](CONTRIBUTING.md)**. Read it before your first commit.

## License

MIT — see [LICENSE](LICENSE).

---

<div align="center">

**गिरि रक्षक** — *guardian of the hills*

<sub>Built for the Smart India Hackathon · North East India</sub>

</div>
