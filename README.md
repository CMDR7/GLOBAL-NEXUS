# GLOBAL NEXUS

**Global Signals Intelligence Platform**

Global Nexus is a local-first, installable intelligence web application for ingesting, examining, relating, and preserving cumulative Global Signals Intelligence workbooks.

## Approved architecture

| Area | Decision |
|---|---|
| Application | TypeScript + Lit + Vite |
| UI components | Lit Web Components |
| Data storage | Local-first IndexedDB |
| YouTube | Embedded player and external links |
| Interface | Adaptive handheld HUD / desktop workstation |
| Hosting | GitHub Pages |
| Application format | Installable Progressive Web App |
| UI dependencies | No external UI, icon, or chart libraries |

## Product direction

A responsive **Tactical Intelligence HUD** with a modern dark graphite palette, rounded layered panels, restrained cyan accents, and clear semantic signal states.

## Core principles

1. **Local-first privacy:** imported workbook contents remain in the browser and are not uploaded to an application server.
2. **Cumulative preservation:** never silently overwrite or discard historical observations, sources, claims, or report snapshots.
3. **Evidence traceability:** preserve stable identifiers and explicit relationships between signals, claims, sources, entities, and observations.
4. **Source fidelity:** distinguish source data from normalized interpretations; expose unresolved or invalid references.
5. **Progressive enhancement:** core workbook inspection remains useful without optional online services.
6. **Responsive by design:** mobile and desktop are deliberate layouts.
7. **Test before release:** validate ingestion, integrity, accessibility, performance, offline behavior, and real-device layouts.

## Planned capabilities

- Cumulative XLSX ingestion and worksheet inspection
- Global signal dashboard and longitudinal history
- AI and world intelligence views
- Source, claim, and evidence browser
- Entity and relationship exploration
- YouTube attention and topic-link intelligence
- Content Radar and opportunity tracking
- Report archive and evidence trace
- Local persistence and user-controlled backup/export
- PWA installation and offline application shell

## Development status

**Repository foundation.** Existing standalone HTML consoles are migration references. Their behavior will be inventoried and migrated into tested modules; they will not be concatenated or ported wholesale.

## Data and privacy

Do not commit operational intelligence workbooks, private datasets, API keys, access tokens, personal data, or browser storage exports. Use synthetic fixtures for tests and sanitized samples for documentation.

## License

No license has been selected. Until one is added, all rights are reserved by default.
