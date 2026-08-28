# `ml/` — Risk Model

Owned by **M**. See [CONTRIBUTING.md](../CONTRIBUTING.md) for the ownership rules.

Scores each monitored district on terrain and rainfall history and writes two fields back to the `riskZones` collection:

| Output | Meaning |
|:--|:--|
| `riskScore` | Terrain-derived instability, `0`–`1`. Stable between model runs. |
| `modelVersion` | Which model produced the score, e.g. `v3`. Always bump on a retrain. |

Live rainfall is layered on top of `riskScore` at runtime by `src/api/updateRisk.js` — this folder is not in the request path.
