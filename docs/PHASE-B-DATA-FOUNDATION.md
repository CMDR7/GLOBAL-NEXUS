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
- Added separate link classifications: direct video, discovery, external video, and other.
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
- A full project type check could not be completed because project dependencies were not installed. The package installation attempt timed out.
- Browser execution against the authoritative workbook was attempted but did not complete in the available headless Chromium session.
- Therefore this branch is an implementation checkpoint, not a validated release.

## Next engineering gates

1. Install dependencies and complete full-project type checking/build.
2. Execute the parser against the authoritative v2.1 workbook in a real browser and reconcile sheet/record counts with the read-only audit.
3. Add fixture tests for repeated headers, sparse rows, hyperlink relationships, formula cached values, unknown sheets, and invalid ZIP files.
4. Complete typed adapters for the remaining canonical worksheet families.
5. Add snapshot history/restore/export and integrity trace UI.
6. Complete responsive, accessibility, offline, and PWA validation before merging.
