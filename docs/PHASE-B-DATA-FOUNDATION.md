# Phase B — Data Foundation Implementation Record

**Branch:** `phase-b-data-foundation`  
**Date:** 12 November 2026  
**Status:** Initial implementation committed; build and browser regression gates remain open.

## Implemented in this branch

- Added the Lit/Vite/TypeScript application scaffold and the five approved primary destinations.
- Added a browser-local XLSX ZIP/XML reader using the browser's `DecompressionStream` and `DOMParser`; no workbook is sent to a server.
- Added worksheet extraction for shared strings, inline strings, boolean values, formulas with cached values, physical row positions, hidden-sheet metadata, and external hyperlink relationships.
- Added schema-aware header discovery for the current signal sheet, topic-link sheets, and canonical YouTube register. This removes the previous fixed topic-link header offset.
- Added normalized models for current signals, topic links, YouTube register records, sources, claims, entities, and relationships. Other worksheet families remain available as raw worksheets and inventory entries.
- Added exact token splitting for semicolon/comma/newline-separated references. Signal source IDs are no longer discarded.
- Added separate link classifications: direct video, discovery, external video, and other. The canonical YouTube register's own Link Type field is authoritative for register records; URL-pattern classification is a fallback.
- Added IndexedDB append-only snapshot writes with a UUID, import timestamp, source filename, parser/schema versions, and SHA-256 when Web Crypto is available.
- Added file-picker and drag/drop ingestion UI, progress display, and explicit failure messaging.
- Added an adaptive mobile bottom navigation rail.

## Preservation and privacy boundaries

- The source workbook is read-only. The parser only reads its bytes.
- Workbook contents are processed in the browser and stored in local IndexedDB.
- Each import uses a new snapshot key and `add()`, not an overwrite operation.
- Raw worksheet rows, physical row positions, formula/cached-value pairs, and external cell-link targets are retained in the imported model.
- Unknown worksheets are retained in the raw worksheet collection.
- GSIS scoring fields are mapped as supplied. No score, dimension, weight, or methodology is recalculated.

## Known limitations and outstanding work

1. The parser is a minimal ZIP reader. ZIP64, multi-disk ZIP, unsupported compression methods, and encrypted workbooks are not supported. These must fail visibly.
2. Date serials are retained as source values; display-format-aware date conversion is not yet implemented.
3. The adapter currently normalizes the principal current signal, topic-link, YouTube, source, claim, entity, and relationship registers. Timelines, geography, trends, opportunities, report archive, methodology, and version history are still available as raw worksheets but do not yet have dedicated typed models.
4. Known repeated header blocks in the source and claim registers are now recognized and normalized across their observed variants. Repeated blocks in content opportunities, report archive, scorecard, and other worksheet families remain raw-only; block-level integrity diagnostics are still outstanding.
5. IndexedDB snapshot listing, selection, export, and restore UI are not yet implemented.
6. Evidence graph resolution and unresolved-reference diagnostics remain outstanding.
7. YouTube player lifecycle and verified embed-eligibility enforcement remain outstanding.
8. PWA service worker, offline install/update flow, and shell-only caching remain outstanding.
9. Full UI build, browser ingestion, real-device layout, accessibility, and performance tests have not passed or been claimed.

## Verification performed

- Core data modules were checked with TypeScript 5.8.3 using strict mode and DOM libraries; that isolated data-layer type check completed without errors in the local working environment.
- The three core data modules (model, XLSX parser, workbook adapter) passed a strict TypeScript 5.8.3 check in the local validation environment. The snapshot-store module also compiled with the same strict settings.
- The browser XLSX parser was executed in headless Chromium using the actual authoritative workbook selected through a file input. It successfully parsed all 28 worksheets, including 123 formula cells and 463 external hyperlink relationships.
- The browser parser + adapter run produced 21 signals, 15 topic links, 73 YouTube records, 273 sources, 156 claims, 147 entities, and 126 relationships, with no adapter warnings. All counts matched the independent workbook structure cross-check.
- YouTube link-type classification reconciled exactly to the workbook's own Link Type column: 1 direct video, 68 search/discovery links, and 4 external video records. The initial URL-only classification was corrected to honor this canonical field.
- The full Lit application build/typecheck remains NOT TESTED because npm dependency installation timed out and network package access was unavailable.
- IndexedDB append/reload persistence remains NOT TESTED. The available headless test document used an opaque origin where IndexedDB access is denied. The UUID fallback was added for contexts without `crypto.randomUUID`; persistence still requires a supported browser origin, normally HTTPS or localhost.
- PWA, responsive, accessibility, performance, and physical-device validation remain NOT TESTED.
- Therefore this branch is a data-foundation validation checkpoint, not a validated application release.

## Next engineering gates

1. Restore package-registry access, install dependencies, and complete full-project type checking/build.
2. Run the complete Lit app on a supported HTTPS/localhost origin and validate IndexedDB append, reload, and snapshot listing.
3. Add fixture tests for repeated headers, sparse rows, hyperlink relationships, formula cached values, unknown sheets, and invalid ZIP files.
4. Complete typed adapters for the remaining canonical worksheet families.
5. Add snapshot history/restore/export and integrity trace UI.
6. Complete responsive, accessibility, offline, and PWA validation before merging.


## Independent workbook structure cross-check

A separate read-only inspection of the authoritative workbook with openpyxl confirmed these expected data contracts and non-empty ID-bearing record counts. This is a workbook-structure check, not a successful execution of the browser parser:

| Register | Header row | ID-bearing records |
|---|---:|---:|
| Latest current signals | 9 | 21 |
| Latest topic links | 4 | 15 |
| Canonical YouTube register | 3 | 73 |
| Sources, across 3 header blocks | 3, 91, 107 | 273 |
| Claims, across 8 header blocks | 3, 12, 20, 28, 37, 45, 52, 64 | 156 |
| Entities | 3 | 147 |
| Relationships | 3 | 126 |

The repeated source and claim header variants are why a single-header-row adapter would have silently omitted substantial portions of the registers. These counts are structural expectations for the current workbook revision; they still need to be reconciled against an actual browser-parser run.
