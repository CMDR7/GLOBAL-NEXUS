# Global Nexus Functional Migration Matrix

**Status:** Phase A static mapping baseline  
**Source references:** WEBSTACK-X v1.4 and NEXUS v1.5 YouTube Referrer Fix Candidate  
**Rule:** No capability is retired merely because navigation is consolidated.

| Existing capability | Primary source | Global Nexus destination/module | Migration requirement | Verification status |
|---|---|---|---|---|
| Dashboard / situation overview | v1.4 `renderDashboard`; v1.5 Overview | Overview | Preserve source workbook values, snapshot provenance, status counts and drill-down | Static mapping |
| Current signals | v1.4 `renderSignals`; v1.5 Signal Trends | Signals / Signal Trends | Preserve Signal IDs, definitions, current observation and status | Static mapping |
| Signal profile/detail | v1.4 signal detail | Shared signal detail panel | Show explicit related history, sources, claims, entities and relationships | Static mapping |
| Signal history | v1.4 `renderHistory`; v1.5 Signal Trends | Signal Trends | Preserve chronology and physical worksheet provenance; do not interpolate | Static mapping |
| AI intelligence | v1.4 `renderDomain('ai')`; v1.5 Content Radar | Content Radar / AI | Preserve source rows and links; editorial ranking remains distinct from GSIS scoring | Static mapping |
| World intelligence | v1.4 `renderDomain('world')`; v1.5 Content Radar | Content Radar / World | Preserve source rows and links; keep attribution and uncertainty | Static mapping |
| YouTube attention | v1.4 `renderYouTube`; v1.5 Content Radar | Content Radar / YouTube | Preserve attention observations and source caveats | Static mapping |
| Topic-link register | v1.4 `renderTopicLinks`; v1.5 Content Radar | Content Radar / Topic Links | Select latest valid dated sheet without hiding historical topic-link sheets | Static mapping |
| Direct YouTube player | v1.5 YouTube module | Content Radar / Player service | Accept verified direct video URL or valid 11-character ID only; single player instance; explicit online fallback | Static mapping |
| YouTube discovery links | v1.5 Topic Links | Content Radar / Link classification | Keep search/discovery URLs distinct; never turn them into fabricated watch URLs | Static mapping |
| Entities | v1.4 entity view; v1.5 Archive | Intelligence Archive / Entities | Preserve entity IDs and links; no fuzzy association as canonical identity | Static mapping |
| Relationships | v1.4 `renderRelationships`; v1.5 Archive | Intelligence Archive / Relationship Explorer | Preserve graph, zoom, node selection, filtering and complete tabular fallback | Static mapping |
| Source register | v1.4 sources; v1.5 Research Monitor | Research Monitor / Sources | Preserve publisher, title, date, URL, type, caveat and source ID fields as present | Static mapping |
| Evidence browser | v1.4 `renderEvidence`; v1.5 Research Monitor | Research Monitor / Evidence | Distinguish source records, claim records and evidence references | Static mapping |
| Evidence trace | v1.4 `renderTrace`; v1.5 Research Monitor | Research Monitor / Trace | Retain explicit claim → source → signal → history → report references; expose unresolved links | Static mapping |
| Claims | v1.4 claims; v1.5 Research Monitor | Research Monitor / Claims | Preserve claim IDs, attribution, classification, confidence and explicit source IDs | Static mapping |
| Content opportunities | v1.4 content view; v1.5 Content Radar specification | Content Radar / Opportunities | Keep editorial potential UI-derived and never feed it into GSIS scoring | Static mapping |
| Timelines | v1.4 timeline view; v1.5 Signal Trends | Signal Trends / Timeline | Preserve event dates and associated source/signal IDs | Static mapping |
| Geography | v1.4 geography view; v1.5 Archive | Intelligence Archive / Geography | Preserve location labels and source references; no invented geocoding | Static mapping |
| Report archive | v1.4 `renderArchive`; v1.5 Archive | Intelligence Archive / Reports | Preserve all report snapshots and dates; no replacement on re-import | Static mapping |
| Methodology | v1.4 `renderMethod`; v1.5 Archive | Intelligence Archive / Methodology | Display workbook methodology as source material; do not change scoring parameters | Static mapping |
| Raw worksheets | v1.4 `renderRaw`; v1.5 Archive | Intelligence Archive / Raw Data | Preserve every discovered sheet, row, header block and original row provenance | Static mapping |
| Global search | v1.4 `searchAll`; v1.5 shell | Global application shell | Search IDs, topics, titles, publishers, claims, entities and safe URL fields; results open exact records | Static mapping |
| Workbook selection / drag-drop | v1.4 `ingestFile` | Global application shell / Ingestion | Browser-local read-only file processing; clear progress, cancel/error states | Static mapping |
| XLSX parser | v1.4/v1.5 custom ZIP/XML parser | Engine / Workbook parser | Regression-test before adaptation; preserve raw cells, links, sheet names and row positions | Static mapping |
| Schema normalization | v1.5 `normalizeRows` | Engine / Schema adapters | Support known workbook schemas, repeated headers and unknown sheets with explicit diagnostics | Static mapping |
| Snapshot selection | v1.5 current snapshot helpers | Global shell / Snapshot selector | Select latest actual snapshot from available dated records; never infer missing dates | Static mapping |
| Integrity diagnostics | v1.5 `renderTrace` | Research Monitor / Integrity | Surface missing URLs, duplicate IDs, invalid links and unresolved references without dropping records | Static mapping |
| Local persistence | New approved Global Nexus requirement | Storage / IndexedDB | Store each accepted import as a distinct immutable snapshot; user-controlled backup/restore | New capability |
| PWA install/offline shell | New approved Global Nexus requirement | App shell / PWA | Cache versioned app shell only; keep workbook data out of service-worker cache | New capability |
| Adaptive Tactical HUD | New approved Global Nexus design | Presentation / Lit components | Handheld HUD on mobile; expanded workstation on desktop; rounded graphite panels | New capability |

## Shared application-shell services

These remain globally available and are not separate primary destinations:

- Global search
- Workbook ingestion and import diagnostics
- Snapshot selector
- Signal/source/claim detail panels
- YouTube player modal
- Import history and local archive controls
- PWA update and offline status indicators

## Primary navigation proposal

1. **Overview** — situation awareness, snapshot and current signal summary
2. **Content Radar** — AI, world, YouTube, topic links and content opportunities
3. **Signal Trends** — current signals, history, timelines and trend history
4. **Research Monitor** — sources, evidence, claims, integrity and trace
5. **Intelligence Archive** — entities, relationships, geography, reports, methodology and raw worksheets

This five-destination model is taken from the supplied NEXUS v1.5 functional specification. It is the current migration proposal; the detailed UX will be finalized in the HUD design phase.

## Regression gates

The following must be tested before replacing the reference console:

- [ ] Workbook parsing with the authoritative v2.1 workbook
- [ ] All original worksheet names and rows remain discoverable
- [ ] Unknown/future worksheets remain accessible
- [ ] Current snapshot selection is date-aware and grounded in workbook data
- [ ] Latest topic-link sheet selection is correct
- [ ] AI, World and YouTube collections render source records and links
- [ ] Direct video URLs and discovery/search URLs are classified separately
- [ ] Signal detail resolves exact source, claim, history, entity and relationship IDs
- [ ] Evidence trace reports missing and unresolved references without deleting records
- [ ] Relationship graph and full table fallback both work
- [ ] Global search opens the correct underlying record
- [ ] Repeated imports append distinct IndexedDB snapshots
- [ ] Export/restore preserves snapshot identity and provenance
- [ ] Workbook file remains read-only and is never uploaded
- [ ] PWA shell loads offline; YouTube playback is correctly marked online-only
- [ ] Mobile and desktop navigation work at supported viewport sizes and zoom levels
- [ ] Accessibility, keyboard behavior, reduced motion and contrast checks pass

**Current verification:** This matrix is a static mapping based on source inspection. Runtime regression tests have not yet been executed.
