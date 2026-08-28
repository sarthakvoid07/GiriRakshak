# `src/firebase/` — Firestore, Auth and Storage

| File | Owner | Does |
|:--|:--|:--|
| `config.js` | **B1** | Initialises the Firebase app and exports `db`, `auth`, `storage`. |
| `auth.js` | **B1** | Sign-in and role handling for residents vs. officials. |
| `ingest.js` | **B1** | Writes — field report submission, zone seeding. |
| `reads.js` | **B2** | `getZones()`, `getReports()`, `getZonesByRisk(level)`. |

All config comes from `.env` — see `.env.example`. No key is ever hardcoded here.
