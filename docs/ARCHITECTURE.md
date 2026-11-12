# Global Nexus Architecture

**Status:** Approved architecture direction. Implementation details remain subject to source audit and validation.

## Technology

- TypeScript for domain models, ingestion, validation, state, and UI behavior.
- Lit for reusable native Web Components.
- Vite for development and production bundling.
- IndexedDB for structured local persistence.
- Web App Manifest and Service Worker for PWA installation and offline application-shell support.
- GitHub Pages for static hosting.

The core workbook workflow must not require a backend.

## Layer boundaries

1. **Presentation:** adaptive HUD shell, navigation, panels, tables, charts, drawers, accessibility, and feedback.
2. **Application:** routing, view composition, workflows, state coordination, and commands.
3. **Domain:** typed records and rules for signals, observations, sources, claims, entities, relationships, YouTube references, content opportunities, reports, and import snapshots.
4. **Intelligence engines:** workbook parsing, schema normalization, stable-ID association, URL validation, evidence tracing, integrity diagnostics, and derived metrics.
5. **Persistence:** IndexedDB repositories, schema versioning, transactional writes, archive preservation, import metadata, and user-controlled backup/export.

Presentation components must not parse XLSX files or independently infer evidence relationships.

## Local-first data lifecycle

1. User selects a workbook.
2. The browser reads it locally.
3. The parser extracts worksheets, cell values, and available hyperlink metadata.
4. Schema adapters identify known workbook versions while retaining unknown worksheets.
5. Validation reports missing headers, invalid URLs, duplicate IDs, and unresolved references.
6. The association engine builds indexes from stable identifiers.
7. The user reviews an import summary.
8. An accepted import is stored as a distinct snapshot in IndexedDB.
9. Views query typed repositories while original source values remain available for audit.

No workbook data is sent to an application server.

## Preservation and provenance

- Never silently replace a previous report or workbook snapshot.
- Preserve original identifiers and source values.
- Keep normalized fields alongside original values.
- Mark unresolved associations instead of fabricating links.
- Distinguish verified direct video URLs from discovery/search URLs.
- Keep report time, source publication time, and ingestion time distinct.
- Record parser/schema version and import diagnostics with each snapshot.

## YouTube

The product supports external YouTube links and an embedded player.

- External links are the reliable baseline.
- Embedded playback is optional and requires an internet connection.
- Load the YouTube player only after explicit user activation.
- Clearly communicate when playback requires an online connection.
- Handle unavailable, private, removed, age-restricted, or region-restricted videos without breaking the view.

## PWA and GitHub Pages

- Configure Vite's base path for the repository deployment path.
- Ensure manifest icons and service-worker paths work under the deployed subpath.
- Cache the application shell and versioned static assets.
- Do not cache imported workbook contents in the service worker.
- Provide a clear update path when a new app version is available.
- Treat IndexedDB as browser-local storage, not a guaranteed permanent archive. Provide user-controlled export/backup and explain browser storage limits.

## Dependency policy

Core choices: TypeScript, Lit, and Vite. Avoid external UI frameworks, CSS frameworks, icon packages, and chart libraries.

Any additional runtime dependency requires a documented need, security/maintenance review, bundle-size and offline-impact assessment, and a practical exit strategy.

## Quality gates

Test representative workbook versions, schema drift, hyperlink extraction, URL safety, stable-ID associations, unresolved-reference reporting, cumulative archive preservation, large-workbook performance, keyboard accessibility, focus visibility, reduced motion, contrast, mobile layouts, browser zoom, PWA installation, offline shell, update lifecycle, and GitHub Pages subpath deployment.

Report every test as PASS, FAIL, or NOT TESTED. Never claim physical-device validation without testing on a physical device.
