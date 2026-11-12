# Global Nexus Migration Plan

**Status:** Planning baseline. Source applications have not yet been modified.

## Reference applications

1. **Global Signals Intelligence Console WEBSTACK-X v1.1** — primary reference for the broad intelligence workspace, workbook ingestion, navigation, signal/history/evidence views, relationships, and raw worksheet inspection.
2. **NEXUS v1.5 YouTube Referrer Fix Candidate** — reference for Content Radar, topic/video registers, and YouTube player/referrer handling.
3. **WEBSTACK-X NEXUS visual and mobile refinements** — additional design references, not replacements for the functional source references.

## Migration rule

Do not concatenate the HTML files or port their scripts wholesale. First inventory behavior, data contracts, DOM dependencies, parser assumptions, and known defects. Then migrate functionality into domain services and Lit components with regression tests.

## Workstreams

### A. Source audit
- Inventory every navigation view and user action in each candidate.
- Identify overlapping, unique, and conflicting functionality.
- Trace XLSX parsing, worksheet normalization, hyperlink extraction, and schema detection.
- Inspect YouTube embed lifecycle, referrer policy, and external-link handling.
- Record known defects and unverified behavior.

### B. Domain and data contracts
- Define typed entities for signals, observations, sources, claims, entities, relationships, YouTube items, content opportunities, reports, and import snapshots.
- Define stable identifiers and multi-value association parsing.
- Preserve unknown worksheet data.
- Define schema adapters for workbook versions and explicit diagnostics.

### C. Intelligence engines
- XLSX ingestion and normalization
- Link extraction and URL safety validation
- Stable-ID association and index construction
- Evidence trace and integrity diagnostics
- Cumulative snapshot and archive service
- YouTube reference and player service

### D. Interface
- Tactical Intelligence HUD design tokens
- Adaptive application shell and navigation
- Dashboard and signal explorer
- History, source, claim, and evidence views
- Entity and relationship explorer
- AI/world intelligence and YouTube views
- Content Radar, archive, methodology, and raw worksheets
- Mobile-specific interaction patterns

### E. Persistence and PWA
- IndexedDB schema and version migrations
- Import snapshot transactions
- Backup/export and restore workflow
- PWA manifest, icons, service worker, offline shell, and update prompt
- GitHub Pages path and deployment verification

## Acceptance criteria

- Every source view/action is mapped to a destination module or explicitly marked as retired with rationale.
- No historical workbook records are silently discarded.
- Existing stable IDs remain unchanged.
- Direct video URLs and discovery URLs remain distinguishable.
- Unresolved links and associations remain visible as diagnostics.
- Representative workbooks ingest without mutating source files.
- Regression tests cover core workflows before a reference implementation is retired.
- Mobile and desktop behavior are validated independently.

## Release sequence

1. Repository and build foundation
2. Source audit and domain contracts
3. Parser and data-integrity engine
4. IndexedDB archive layer
5. HUD shell and core components
6. Intelligence and evidence modules
7. YouTube and Content Radar
8. PWA and GitHub Pages deployment
9. Regression, accessibility, performance, and device validation
