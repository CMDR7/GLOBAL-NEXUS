# Global Nexus Source Audit

**Audit stage:** Phase A / static source inspection  
**Audit date:** 12 November 2026  
**Runtime status:** Static inspection only. No browser execution or workbook ingestion test is claimed here.

## 1. Sources inspected

| Source | Size | SHA-256 | Role |
|---|---:|---|---|
| `global-signals-intelligence-console-WEBSTACK-X-v1.4-NEXUS-MOBILE.html` | 89,729 bytes | `173e82e7f7651f3d88d683caf9bcdedc8014b67248cf75bf0ecb874189d9415b` | Primary behavioral reference |
| `NEXUS-v1.5-YouTube-Referrer-Fix-Candidate.html` | 91,684 bytes | `4a67977b6b774daef5348936d4b51d4bc9023a40efc0099aff69fdadc4137495` | Navigation consolidation and YouTube behavior reference |
| `NEXUS-v1.5-Functional-Mapping-and-Interface-Specification-v1.0.md` | 16,380 bytes | n/a | Five-destination functional specification |
| `NEXUS-v1.5-Google-AI-Studio-Implementation-Prompt.md` | 20,788 bytes | n/a | Data governance, implementation and validation requirements |

The older WEBSTACK-X v1.1 file exists as a historical reference, but v1.4 is the newer behavioral baseline and should take precedence where versions differ.

## 2. Static structure findings

### v1.4 behavioral reference

- 19 primary navigation items and 19 corresponding view containers.
- 68 DOM ID occurrences, 67 unique IDs; `relationshipFilter` occurs twice.
- 68 named function declarations, including asynchronous ZIP/XLSX ingestion functions.
- No external JavaScript script imports or external stylesheet imports detected.
- Uses a browser-local custom ZIP/XLSX reader based on `DecompressionStream`, `DOMParser`, and browser file APIs.
- Uses in-memory application state. No IndexedDB, localStorage, or sessionStorage references detected.
- Includes workbook upload/drag-drop, ingestion progress, navigation, global search, signal detail, relationship graph, raw worksheet selector, and YouTube player behavior.

The document title identifies the console as v1.3.1 even though the filename identifies v1.4. This version-label mismatch must be corrected in the new application metadata.

### NEXUS v1.5 YouTube Referrer Fix Candidate

- Five primary destinations: Overview, Content Radar, Signal Trends, Research Monitor, and Intelligence Archive.
- 19 legacy view containers remain in the document and are composed into the five destinations.
- 73 DOM ID occurrences, 72 unique IDs; `relationshipFilter` occurs twice.
- 70 named function declarations.
- No external JavaScript script imports or external stylesheet imports detected.
- Retains the custom browser-local XLSX parser pattern.
- Adds/retains explicit source-link handling, ID-token extraction, evidence-trace diagnostics, latest dated topic-link selection, and a single-instance YouTube player.
- YouTube IFrame API is loaded dynamically when the player is used. This is an optional online dependency, not a core workbook dependency.
- No IndexedDB, localStorage, or sessionStorage references detected.
- The five-destination composition uses `collectLegacy()` to copy rendered HTML from legacy view containers into destination containers. The new Lit implementation should render from shared typed data/services rather than copy DOM markup between views.

The candidate's embedded document title also still says v1.3.1. It is not a reliable release identifier.

## 3. Functional inventory

The source consoles expose the following capabilities:

1. Situation dashboard and current-state summary
2. Current signal register and signal detail
3. Historical signal observations
4. AI intelligence
5. World intelligence
6. YouTube attention and discovery
7. Entity register
8. Relationship graph, zoom, node selection, and table
9. Source register and source detail
10. Evidence browser
11. Topic-link register and dated sheet selection
12. Evidence trace and integrity findings
13. Claims register and claim detail
14. Content opportunities
15. Timelines
16. Geography
17. Report archive
18. Methodology
19. Raw worksheet explorer
20. Global search across normalized workbook rows
21. Workbook file selection and drag/drop ingestion
22. Ingestion progress and error display
23. Responsive mobile navigation and bottom rail
24. Single-instance embedded YouTube player and external fallback

The v1.5 five-destination specification groups these capabilities as follows:

- **01 Overview:** dashboard and current situation
- **02 Content Radar:** AI, world, YouTube attention, topic links, and content opportunities
- **03 Signal Trends:** current signals, historical observations, timelines, and trend-history views
- **04 Research Monitor:** sources, evidence browser, claims, and evidence trace
- **05 Intelligence Archive:** entities, relationships, geography, report archive, methodology, and raw worksheets

Global search, workbook ingestion, snapshot selection, detail panels, and YouTube player remain shell-level capabilities rather than separate destinations.

## 4. Parser observations

The parser is browser-local and dependency-free at the source HTML level. It implements ZIP central-directory traversal, DEFLATE decompression through `DecompressionStream('deflate-raw')`, XML parsing through `DOMParser`, shared strings, inline strings, worksheet cell extraction, worksheet relationship resolution, and external hyperlink extraction.

The v1.5 candidate includes a normalization pass that scores candidate header rows, detects repeated header blocks, retains row indexes, and attaches explicit hyperlink metadata to normalized rows.

These observations establish implementation presence only. They do not establish compatibility with every XLSX feature or successful ingestion of every workbook revision.

### Parser risks to verify before migration

- ZIP64 and unusual ZIP layouts are not established as supported.
- Only the browser's supported DEFLATE stream behavior is available.
- XML parser errors and malformed workbook relationships need explicit validation.
- Formula cells are read through stored cached values; formula recalculation is not provided.
- Workbook date serial conversion, styles/number formats, merged cells, hidden sheets, external relationships, and very sparse sheets require fixture-based tests.
- Header-row scoring is heuristic. Unknown or unusual schemas must remain inspectable without being silently misclassified.
- Repeated header blocks need to preserve physical row provenance and block identity.
- The source workbook must remain read-only.

## 5. Data and persistence boundary

Both inspected HTML files keep workbook data in memory and do not implement browser persistence. Global Nexus has an approved local-first IndexedDB architecture. This is a deliberate new capability, not an existing behavior to assume.

IndexedDB design must:
- store each accepted import as a distinct immutable snapshot;
- preserve original rows, normalized records, workbook metadata, and diagnostics;
- avoid silently replacing earlier snapshots;
- provide user-controlled export and restore;
- never upload workbook contents;
- avoid placing imported workbook data in the service-worker cache.

The authoritative GSIS workbook remains read-only. IndexedDB is a local application archive, not a replacement for the user's original workbook.

## 6. Visual and responsive observations

Both files use an inline CSS design and no external CSS framework. Typography declarations reference Rajdhani and Orbitron with fallbacks, but no external font import or embedded font file was detected in these source files. The new app must therefore use licensed local assets if the exact typefaces are required, or robust system fallbacks.

The v1.4 source includes responsive navigation, a mobile drawer, a bottom rail, safe-area handling, and a raw worksheet selector. The candidate preserves the mobile shell and adds the five-destination navigation model. These behaviors must be independently reimplemented and tested in Lit; they should not be assumed to transfer automatically.

## 7. Known source-level defects and migration cautions

- Duplicate DOM ID `relationshipFilter` appears in both inspected source files.
- Both source files have a v1.3.1 document title despite later filenames.
- Five-destination candidate composes legacy markup using `innerHTML`; event bindings and duplicated IDs need deliberate handling during migration.
- Relationship graph is built from a bounded row/node subset in the current renderer; full-data and large-graph behavior needs explicit design and tests.
- Existing parser behavior is custom and must be regression-tested before replacement or adaptation.
- The YouTube API is online-only; all core workbook views must continue to function without it.
- Existing code presence is not proof of end-to-end correctness. Runtime tests remain outstanding.

## 8. Inputs retrieved and inspected (correction)

Both intended inputs were already present in the user's Library. The earlier audit incorrectly reported them missing because the initial semantic search did not surface them. That was a retrieval error, not a missing-user-input issue.

| Input | Retrieved Library file | Size | SHA-256 |
|---|---|---:|---|
| Lit/TypeScript scaffold | `NEXUS-v1.5-Lit-TypeScript-source.zip` | 12,471 bytes | `bc8967fdbc7dc78740ff514b63ac1155e8689aa5ba1429b52ccc353bb340770f` |
| Authoritative workbook | `Global_Signals_Intelligence_System_v2_1_CUMULATIVE_2026-11-09(1).xlsx` | 495,934 bytes | `dfb39ba4366f824b27985756a44d8804d0133331cb0d5fc5812658523c3e443f` |

The workbook contains 28 worksheets, including the 9 November current snapshot, dated topic-link register, trend register, and canonical YouTube video register. Detailed worksheet and adapter findings are documented in `WORKBOOK-SCHEMA-AUDIT.md`.

### Scaffold-specific findings

- The ZIP contains 15 project files: Vite configuration, package/TypeScript configuration, Lit application shell, five destination components, navigation, design tokens, data model, and workbook adapter.
- The scaffold is a genuine source scaffold, not a completed application.
- Its README explicitly states that the v1.4 browser-local XLSX parser has not yet been ported and live workbook ingestion is not operational.
- The file input emits a `nexus-workbook-request` event, but no parser integration or event handler is included in the scaffold.
- Package dependencies are Lit 3.3.1, TypeScript 5.8.3, Vite 6.4.1 and vite-plugin-singlefile 2.3.0 (version ranges as declared in package.json).
- No lockfile is included in the ZIP.

### Workbook-specific findings

- The file name identifies schema v2.1, while the dashboard/current snapshot text still describes the cumulative research workbook as v2.0. The canonical YouTube register explicitly identifies itself as v2.1. Preserve this source metadata discrepancy; do not silently rename the research methodology or workbook version.
- The latest dated current snapshot sheet is `24_CURRENT_2026-11-09_EVE`.
- The latest dated topic-link sheet is `25_TOPIC_LINKS_2026-11-09`.
- The canonical YouTube register is `27_YOUTUBE_VIDEO_REGISTER`.
- The scaffold adapter's current-snapshot header detection can locate the Signal ID header row, but its field aliases do not fully match the 9 November snapshot schema.
- The scaffold adapter's topic-link parser assumes the header is at row index 1 or 0 and begins data at row index 2. The actual latest topic-link sheet has its header on Excel row 4 and data from row 5. As written, it will misread or fail to normalize that sheet.
- The scaffold model does not yet normalize source, claim, entity, relationship, timeline, geography, archive, or canonical YouTube records into typed collections. Raw sheet retention is declared, but the complete ingestion pipeline is not implemented.

The original files were retrieved and inspected. No replacement or fabricated input was used.

## 10. Audit conclusion

The v1.4 console is the primary functional reference. The v1.5 candidate contributes the five-destination information architecture, improved source/claim/evidence trace behavior, dated topic-link selection, and YouTube player lifecycle. Global Nexus will implement these behaviors through typed domain services and Lit components, while adding the newly approved IndexedDB local archive and adaptive Tactical Intelligence HUD.

**No application source code has been changed by this audit.**
