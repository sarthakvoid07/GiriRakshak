# `src/data/` — Seed Fixtures

Owned by **B1**. **Schema frozen** — field names must match the [data model](../../README.md#data-model) exactly.

| File | Mirrors |
|:--|:--|
| `dummyZones.js` | The `riskZones` collection — 15 zones across all 8 North Eastern states. |
| `dummyReports.js` | The `fieldReports` collection — 10 sample reports. |

These exist so frontend work isn't blocked on the backend. Import them while building a screen, then swap to `getZones()` / `getReports()` from `src/firebase/reads.js`. Nothing ships to `main` still importing from here.
