# GLOBAL NEXUS — Phase C Prototype Implementation Plan

**Version:** 0.1  
**Status:** Approved for implementation  
**Branch:** phase-c-executive-dashboard

## Objective

Deliver the first usable executive dashboard inside the existing GLOBAL NEXUS Lit/Vite application while preserving the Phase B data foundation and all existing destinations.

## Work package C1 — Current workbook compatibility

Input fixture: Global_Signals_Intelligence_System_v2_0_CUMULATIVE_2026-11-26_COMPLETE_BRIEFING_WORKSHEET.xlsx (available Library file; never commit this workbook).

Implement a deterministic current-signal block selector:
- Prefer a block in 01_GLOBAL_SIGNALS whose title is CURRENT SIGNAL STATE | timestamp.
- Identify the following header row by required columns: Snapshot, Signal ID, Topic, Signal Index, Status.
- Select the latest timestamp by parsed date/time, not worksheet-name lexical sorting.
- Read records until the next blank boundary or a new header/title block.
- Preserve the physical worksheet row number and raw worksheet.
- Preserve the source-provided snapshot timestamp.
- If no valid current-state block exists, fall back to the existing dated-sheet strategy with an explicit warning.
- Do not treat the stale 00_DASHBOARD_CURRENT sheet as authoritative when a newer current-state block exists.

## Work package C2 — Executive dashboard

Use existing Lit components and CSS tokens. No new runtime dependencies.

Dashboard regions:
1. Header and provenance: workbook name, snapshot timestamp, imported-at timestamp if available.
2. KPI strip: current signal count, mean Signal Index, above-80 count, Rising/Escalating count, New count.
3. Status distribution with text labels and accessible visual indicators.
4. Ranked signal table: rank, ID, topic, index, movement, status.
5. Detail disclosure: category, five core dimensions, evidence summary, source IDs, and uncertainty fields when present.
6. Empty state: clear local workbook upload instruction.
7. Error state: visible parser/adapter diagnostics.

All metrics are derived from the normalized current-snapshot records. Preserve nulls. The dashboard must not invent a current score for records with missing Signal Index.

## Work package C3 — Responsive behavior

Desktop:
- Existing left navigation remains.
- Dashboard uses responsive grid panels and a readable full-width ranked table.

Android:
- Existing mobile bottom navigation remains.
- KPI cards stack in two columns where space permits.
- Signal rows become compact cards or horizontally safe table rows.
- Touch targets and safe-area insets are respected.
- No page-level horizontal overflow.

## Work package C4 — Regression and verification

Test:
- Latest current block wins over earlier blocks.
- Stale dashboard sheet does not override a newer signal-state block.
- Current block count = 24 for the 26 November workbook.
- Mean index = 84.6667 before display rounding.
- Above-80 count = 16.
- Rising/Escalating count = 8.
- New count = 4.
- Null index values are excluded from the mean, not treated as zero.
- Raw sheets and physical row numbers remain intact.
- Existing snapshot append/reload and navigation paths remain unchanged.

## Non-goals for this prototype

- Cloudflare Pages migration and production Access configuration.
- Worker API and scheduled external intelligence.
- Firestore or any cloud persistence for workbook-derived data.
- Full evidence graph, map, report archive, or YouTube playback redesign.
- Production PWA release or physical-device certification.

## Definition of done

Prototype code and documentation are committed on the Phase C branch. Build/typecheck and fixture tests must be run where the environment permits. Any unavailable verification is explicitly NOT TESTED. No merge to main and no production deployment without a separate review.
