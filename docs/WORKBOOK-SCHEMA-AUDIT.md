# Global Signals Intelligence System v2.1 Workbook Schema Audit

**Workbook:** `Global_Signals_Intelligence_System_v2_1_CUMULATIVE_2026-11-09(1).xlsx`  
**File size:** 495,934 bytes  
**SHA-256:** `dfb39ba4366f824b27985756a44d8804d0133331cb0d5fc5812658523c3e443f`  
**Inspection:** Read-only, workbook opened with formulas preserved.  
**Workbook worksheets:** 28

## 1. Worksheet inventory

| Sheet | Name | Rows | Columns | NEXUS role |
|---:|---|---:|---:|---|
| 00 | `00_DASHBOARD` | 192 | 10 | Overview / source dashboard |
| 01 | `01_GLOBAL_SIGNALS` | 274 | 43 | Signal register |
| 02 | `02_SIGNAL_HISTORY` | 266 | 31 | Longitudinal observations |
| 03 | `03_AI_INTELLIGENCE` | 138 | 12 | Content Radar / AI |
| 04 | `04_WORLD_INTELLIGENCE` | 131 | 12 | Content Radar / World |
| 05 | `05_YOUTUBE_ATTENTION` | 106 | 9 | Content Radar / attention |
| 06 | `06_ENTITIES` | 156 | 8 | Archive / entities |
| 07 | `07_RELATIONSHIPS` | 135 | 9 | Archive / relationships |
| 08 | `08_SOURCES` | 284 | 8 | Research Monitor / sources |
| 09 | `09_CLAIMS` | 172 | 8 | Research Monitor / claims |
| 10 | `10_CONTENT_OPPORTUNITIES` | 108 | 10 | Content Radar / editorial |
| 11 | `11_TIMELINES` | 153 | 8 | Signal Trends / timeline |
| 12 | `12_GEOGRAPHY` | 138 | 8 | Archive / geography |
| 13 | `13_TREND_HISTORY` | 39 | 18 | Signal Trends / trend summary |
| 14 | `14_METHODOLOGY` | 90 | 8 | Archive / methodology |
| 15 | `14_REPORT_ARCHIVE` | 41 | 16 | Archive / reports |
| 16 | `16_VERSION_HISTORY` | 41 | 4 | Archive / version history |
| 17 | `17_SCORECARD` | 243 | 20 | Signal Trends / scorecard |
| 18 | `18_CURRENT_SNAPSHOT` | 25 | 25 | Legacy/current snapshot |
| 19 | `19_CURRENT_2026-11-04_EVE` | 27 | 25 | Dated snapshot |
| 20 | `20_TOPIC_LINKS` | 18 | 6 | Dated topic-link history |
| 21 | `21_CURRENT_2026-11-05_EVE` | 30 | 27 | Dated snapshot |
| 22 | `22_TOPIC_LINKS_2026-11-05` | 19 | 6 | Dated topic-link history |
| 23 | `23_TRENDS_2026-11-05` | 25 | 15 | Dated trend history |
| 24 | `24_CURRENT_2026-11-09_EVE` | 30 | 29 | Latest current snapshot |
| 25 | `25_TOPIC_LINKS_2026-11-09` | 19 | 6 | Latest topic-link register |
| 26 | `26_TRENDS_2026-11-09` | 25 | 15 | Latest trend history |
| 27 | `27_YOUTUBE_VIDEO_REGISTER` | 76 | 18 | Canonical YouTube register |

Row/column totals are worksheet dimensions reported by the workbook reader, including title, notes, blank rows and formatting extents. They are not record counts.

## 2. Latest dated data contracts

### Current snapshot: `24_CURRENT_2026-11-09_EVE`

- Excel row 1: title.
- Excel row 2: snapshot date/time and provenance note.
- Excel rows 4–5: KPI/formula region.
- Excel row 7: scoring audit note.
- Excel row 9: actual data header.
- Excel rows 10 onward: signal records.

Key fields include:

`Signal ID`, `Topic`, `Category`, `Status`, `Rank`, `Signal Index`, `Index Δ`, `Previous Rank`, `Rank Δ`, `Importance`, `Attention`, `Momentum`, `Persistence`, `Connectivity`, `News Attention`, `YouTube Attention Note`, `Source Count`, `Source Diversity`, `Geo Spread`, `Cross-Domain Spread`, `Confidence`, `First Detected`, `Last Detected`, `Evidence Summary`, `Source IDs`, `Dimension Mean (Audit)`, `Legacy Index - Dimension Mean`, `Novelty`, `Escalation`.

The workbook retains a legacy Signal Index and separately exposes a dimension mean/audit gap. NEXUS must display workbook values as recorded and must not recalculate or rebase GSIS scores.

### Topic links: `25_TOPIC_LINKS_2026-11-09`

- Excel row 1: title.
- Excel row 2: collection/verification note.
- Excel row 4: header.
- Excel rows 5 onward: records.

Headers: `Collection`, `Rank`, `Topic`, `Source / ID`, `Clickable URL`, `Verification / caveat`.

Collections should remain separate: AI TOP 5, WORLD TOP 5, YOUTUBE TOP 5. URLs are explicit source data and must be validated, not rewritten. A YouTube search URL is a discovery link, not a direct video.

### Canonical YouTube register: `27_YOUTUBE_VIDEO_REGISTER`

- Excel row 1: title.
- Excel row 2: normalization and verification note.
- Excel row 3: header.
- Excel row 4 onward: records.

Headers: `Record ID`, `Legacy Record ID`, `Video ID`, `Video Title`, `Channel`, `Published At`, `Video URL`, `Link Type`, `Verification Status`, `Embed Eligibility`, `Related Signal IDs`, `Snapshot Timestamp`, `Views`, `Likes`, `Comments`, `Metric Capture Time`, `Source / Attribution`, `Notes`.

Do not infer missing IDs, video titles, channel names, dates, metrics or embed eligibility. Preserve historical verification labels and distinguish direct video, discovery/search and external video links.

## 3. Parser/adapter defects identified in supplied scaffold

The current `src/data/workbook-adapter.ts` is not compatible with all of the latest workbook's row layouts as written:

1. **Topic-link header offset:** it reads `linkRows[1] ?? linkRows[0]` and starts data at index 2. The latest dated topic-link sheet has its header at index 3 and data at index 4. It therefore cannot correctly read the latest register.
2. **Current snapshot aliases:** header discovery finds `Signal ID`, but several mapped names do not match the actual latest sheet. In particular, `previousIndex` looks for `Previous Signal Index`, while the sheet provides `Index Δ`; rank aliases and attention/source-count names also need an explicit mapping decision.
3. **Source IDs:** the adapter currently sets each signal's `sourceIds` to an empty array, despite the current snapshot providing `Source IDs`.
4. **Latest snapshot selection:** lexical sorting of sheet names works for the present ISO date naming convention, but the selector must parse and compare actual dates and preserve a fallback warning. It must not assume the latest date exists in every sheet family.
5. **YouTube model gap:** the typed model has topic links but no canonical YouTube video record interface, despite the workbook's dedicated canonical register.
6. **Domain coverage:** the model currently types only signals and topic links. Sources, claims, entities, relationships, timelines, geography, reports, methodology, trends and raw worksheet provenance still need typed adapters or a typed generic record model.
7. **Version metadata:** the filename identifies v2.1; the dashboard and dated current snapshot describe the cumulative research workbook as v2.0; the YouTube register labels itself canonical v2.1. Preserve this discrepancy as source metadata and surface it transparently rather than normalizing it away.

## 4. Required adapter design

- Header detection must be worksheet-specific and schema-aware, not based on one fixed row offset.
- Retain original worksheet name, physical row number, raw cell values and repeated-header block boundaries.
- Keep formulas and cached values distinguishable where relevant; do not recalculate formulas in NEXUS.
- Parse IDs as exact tokens. A multi-ID field such as `N56;N57` must remain two source references, not a fuzzy text match.
- Normalize direct video, discovery/search, and external video links as distinct types.
- Preserve unknown worksheets without dropping rows or inventing a schema.
- Keep the original workbook read-only and entirely client-side.

## 5. Migration implementation order

1. Port the existing browser-local XLSX ZIP/XML parser into a dedicated service, preserving hyperlink relationship resolution and raw rows.
2. Add schema-aware worksheet adapters for the three latest dated sheets and all canonical domain sheets.
3. Add diagnostics for missing sheets, missing headers, duplicate IDs, invalid URLs and unresolved associations.
4. Add typed YouTube video register and source/claim/evidence association models.
5. Implement snapshot selection and immutable IndexedDB import records.
6. Add tests using this exact workbook as a fixture before UI integration.

## 6. Verification boundary

This is a read-only static workbook/schema inspection plus source-code inspection. It does not claim that the scaffold builds, that XLSX parsing works, or that the browser UI has passed desktop/mobile tests. Those are subsequent engineering gates.
