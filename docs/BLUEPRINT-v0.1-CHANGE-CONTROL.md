# GLOBAL NEXUS — Blueprint v0.1 Change-Control Record

**Decision date:** 2026-11-27  
**Status:** Approved for prototype implementation  
**Branch:** phase-c-executive-dashboard  
**Baseline:** phase-b-data-foundation at dcd7aaa0c19719b17c0c76a4f8490c1058761048

## 1. Approved privacy boundary

The workbook and all workbook-derived/imported records remain local to the user's browser.

- XLSX parsing remains client-side.
- Immutable workbook snapshots remain in IndexedDB.
- Workbook bytes, normalized workbook records, source/claim registers, relationships, historical observations, and imported report content are never uploaded to Cloudflare, Firestore, or another application server.
- No cloud synchronization of imported workbooks is in scope.
- No telemetry or analytics may capture workbook content or user-entered intelligence.
- Local export/backup remains user initiated.

Cloud services are permitted only for scheduled external intelligence collection and delivery. Cloud-collected external items must remain clearly distinguishable from workbook-originated records. The browser may retrieve these external items and cache them locally, but must not upload or merge private workbook content into cloud storage.

## 2. Hosting and identity decisions

| Concern | Approved direction |
|---|---|
| Frontend hosting | Cloudflare Pages (migration target; existing GitHub Pages configuration retained until cutover) |
| Access control | Cloudflare Access |
| Authentication | Email one-time PIN |
| Devices | Desktop and Android |
| Scheduled collection | Cloudflare Workers + Cron Triggers |
| External intelligence persistence | Cloud-side store only for externally collected feed items and collection metadata |
| Workbook persistence | IndexedDB only |
| Workbook processing | Browser only |
| Core dashboard offline mode | Local workbook snapshots and cached application shell |

Cloudflare Access protects the hosted application. It does not replace authorization checks on Worker endpoints. Every protected Worker endpoint must validate the Access assertion and apply an explicit allowlist/policy. No service credential may be embedded in browser code.

## 3. Explicit exclusions

Not authorized:
- Uploading workbooks or workbook-derived data to Firestore.
- Firestore synchronization of imported snapshots.
- Server-side XLSX parsing.
- Cloud backup of IndexedDB.
- Analytics or telemetry over private workbook content.
- Automatic upload of local records when a device reconnects.

Firestore is not required for the local workbook dashboard. Any later use of Firestore must be limited to externally collected intelligence and collection metadata, and must not contain workbook-derived records.

## 4. Repository change-control

- Do not modify main directly.
- Do not merge or close the existing Phase B draft PR as part of this phase.
- Create a new implementation branch from the existing Phase B branch.
- Preserve the Phase B parser, models, snapshot store, existing modules, and navigation behavior unless a specific defect is demonstrated and covered by regression tests.
- Keep the existing GitHub Pages configuration and deployment path functional until Cloudflare Pages is validated.
- No production deployment, DNS change, Cloudflare Access policy change, secret creation, or scheduled job activation is performed in this prototype phase.

## 5. Source workbook baseline correction

The actual available workbook used for the prototype is:

Global_Signals_Intelligence_System_v2_0_CUMULATIVE_2026-11-26_COMPLETE_BRIEFING_WORKSHEET.xlsx

Read-only inspection confirms 24 worksheets, not 22. The workbook identifies itself as a v2.0 cumulative archive and explicitly says the requested v2.1 source workbook was unavailable; it must not be relabelled or certified as v2.1.

The latest dated current-signal block is in 01_GLOBAL_SIGNALS, headed CURRENT SIGNAL STATE | 2026-11-26 09:02 Europe/Berlin, with 24 signal records in rows 188–211. The latest daily narrative is in 20_DAILY_BRIEFING_2026-11-26. The workbook's 00_DASHBOARD_CURRENT is an older 22 November view and must not override the 26 November signal-state block.

The 26 November current-state block contains:
- 24 signals.
- Mean Signal Index: 84.6667 (display as 84.7; calculated from the 24 supplied current indices).
- 16 signals above 80.
- 8 signals with Rising or Escalating status.
- 4 signals with New status.

These are workbook-derived prototype baseline values, not live intelligence.

## 6. Scoring and evidence invariants

- Display supplied Signal Index and dimension values as recorded.
- Do not recalculate, normalize, reweight, or silently reconcile scoring fields.
- Keep Importance, Attention, Momentum, Persistence, Connectivity, News Attention, YouTube Attention, Novelty, Escalation, Confidence, Source Diversity, Geographic Spread, and Cross-Domain Spread separate.
- Preserve blanks as missing values; do not replace with zero.
- Preserve rank, index movement, and status separately.
- Distinguish direct video, discovery/search, and external video links.
- Preserve source attribution, uncertainty, publication time, observation time, and ingestion time as distinct concepts.
- Do not infer source or claim associations from text similarity.

## 7. Prototype scope

Phase C prototype scope:
1. Add explicit 26 November v2.0 current-block detection to the local workbook adapter.
2. Add the executive dashboard view using normalized local records.
3. Show snapshot timestamp and source workbook provenance.
4. Show KPI cards, signal-status distribution, ranked signals, and signal detail access.
5. Retain existing navigation and all existing modules.
6. Add regression fixtures/tests for the current-block selection and summary calculations.
7. Keep cloud services out of the prototype runtime.

## 8. Acceptance gates

All tests must be reported as PASS, FAIL, or NOT TESTED.

- 24 workbook sheets discovered and preserved.
- Current state selected from 01_GLOBAL_SIGNALS at 26 November 2026 09:02 Europe/Berlin.
- Exactly 24 current signal rows normalized.
- KPI calculations reconcile to the source rows.
- Existing Phase B parser behavior remains covered.
- Imported workbook data stays in IndexedDB only.
- Desktop and Android responsive layouts are implemented; physical-device testing is not claimed unless performed.
- Existing modules remain reachable.
- Build and browser ingestion tests pass before the prototype is called validated.

## 9. Deferred cloud phase

Cloudflare Pages + Access email OTP and scheduled Workers are deferred to a separate deployment phase. Cloudflare Cron scheduling must handle Europe/Berlin daylight-saving changes explicitly. External intelligence collection must be idempotent, source-attributed, and failure-safe. The cloud collection layer must not receive workbook payloads or workbook-derived data.
