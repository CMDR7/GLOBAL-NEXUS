# Workbook Schema Audit — 26 November 2026 Cumulative v2.0

**Source:** Global_Signals_Intelligence_System_v2_0_CUMULATIVE_2026-11-26_COMPLETE_BRIEFING_WORKSHEET.xlsx  
**Inspection:** Read-only workbook inspection; source file was not modified.  
**Workbook size:** 495,374 bytes  
**Worksheet count:** 24

## Worksheet inventory

| Worksheet | Rows | Columns |
|---|---:|---:|
| 00_DASHBOARD | 117 | 8 |
| 00_DASHBOARD_CURRENT | 157 | 8 |
| 01_GLOBAL_SIGNALS | 211 | 31 |
| 02_SIGNAL_HISTORY | 211 | 31 |
| 03_AI_INTELLIGENCE | 110 | 9 |
| 04_WORLD_INTELLIGENCE | 104 | 9 |
| 05_YOUTUBE_ATTENTION | 110 | 8 |
| 06_ENTITIES | 183 | 8 |
| 07_RELATIONSHIPS | 133 | 8 |
| 08_SOURCES | 265 | 8 |
| 09_CLAIMS | 167 | 8 |
| 10_CONTENT_OPPORTUNITIES | 106 | 8 |
| 11_TIMELINES | 160 | 8 |
| 12_GEOGRAPHY | 139 | 8 |
| 13_TREND_HISTORY | 77 | 22 |
| 14_METHODOLOGY | 60 | 8 |
| 14_REPORT_ARCHIVE | 42 | 15 |
| 15_METHODOLOGY | 92 | 8 |
| 16_VERSION_HISTORY | 42 | 4 |
| 17_SCORECARD | 198 | 11 |
| 18_SNAPSHOT_COMPARISON | 82 | 30 |
| 19_DIMENSIONAL_DELTAS | 84 | 55 |
| 00_DASHBOARD_2026-11-26 | 218 | 8 |
| 20_DAILY_BRIEFING_2026-11-26 | 32 | 5 |

Worksheet dimensions include title, notes, blank rows, and formatting extents; they are not record counts.

## Latest current-state block

01_GLOBAL_SIGNALS contains earlier schema blocks and a final dated state:

- Title: row 186 — CURRENT SIGNAL STATE | 2026-11-26 09:02 Europe/Berlin
- Header: row 187
- Records: rows 188–211
- Record count: 24

Header fields (31 columns):

Snapshot, Signal ID, Topic, Category, First Detected, Last Detected, Current Rank, Previous Rank, Rank Movement, Signal Index, Previous Index, Index Movement, Importance, Attention, Momentum, Persistence, Connectivity, Source Count, Geo Spread, Geography, Cross-Domain Domains, YouTube Attention, News Attention, Novelty, Escalation, Confidence, Source Diversity, Status, Observation, Source IDs, Cross-Domain Spread Score (1-10).

## Latest current-state calculations

Derived from rows 188–211 using the source-provided Signal Index and Status:

| Metric | Value |
|---|---:|
| Signals | 24 |
| Mean Signal Index | 84.6666667 |
| Signals above 80 | 16 |
| Rising + Escalating | 8 |
| New | 4 |

Status distribution:

| Status | Count |
|---|---:|
| Persistent | 7 |
| Rising | 6 |
| New | 4 |
| Escalating | 2 |
| Fragmenting | 2 |
| Not Detected | 2 |
| Falling | 1 |

The mean is an arithmetic display aggregate of the 24 supplied indices. It is not a re-computation of any individual signal score.

## Other current data

- 20_DAILY_BRIEFING_2026-11-26 contains the 26 November morning briefing, with snapshot timestamp in row 2 and a section/claim/source structure from row 4.
- 00_DASHBOARD_CURRENT remains dated 22 November 2026 09:27 Europe/Berlin and is stale relative to the 26 November current-state block.
- 00_DASHBOARD_2026-11-26 contains appended dashboard snapshots; the dated 26 November current dashboard section begins at row 158.
- 18_SNAPSHOT_COMPARISON contains a 26 November 09:02 block in rows 59–82.
- 19_DIMENSIONAL_DELTAS contains appended 26 November comparisons.

## Compatibility implications

The existing adapter's latestSheet strategy searches for sheets named like NN_CURRENT_YYYY-MM-DD. That does not select the 26 November current-state block because the current data is appended inside 01_GLOBAL_SIGNALS. The adapter must detect and parse the latest dated block before falling back to legacy dated worksheet selection.

The v2.0 workbook must remain labelled v2.0. A previous audit of a separate v2.1 workbook is not proof that this v2.0 source conforms to the v2.1 schema.
