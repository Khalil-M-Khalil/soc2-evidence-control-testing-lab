# SOC 2 Evidence & Control Testing Lab — Design Brief

## Three directions considered

### Theme Name: Audit Observatory
Very Brief Intro: A calm, editorial review room that makes evidence analysis feel deliberate and trustworthy.
Probability: 0.083

### Theme Name: Control Room
Very Brief Intro: A high-contrast operational workspace with live state, queues, and clear incident-room energy.
Probability: 0.074

### Theme Name: Evidence Atlas
Very Brief Intro: A tactile, map-like investigation interface where documents, controls, and findings connect as a navigable evidence landscape.
Probability: 0.061

## Chosen approach: Evidence Atlas

### Design Movement
Contemporary information cartography: an editorial data-workbench influenced by investigative dashboards, archival indexing, and Swiss information design rather than generic SaaS cards.

### Core Principles
1. Every interaction must move the investigation forward: inspect, classify, connect, decide, or remediate.
2. Evidence is primary; decorative data must never compete with the source artifact or its provenance.
3. Use an asymmetric three-column workbench to communicate scope, evidence, and decision state simultaneously.
4. Make uncertainty visible through explicit confidence, evidence freshness, and “not tested” states.

### Color Philosophy
The base is warm mineral paper and deep graphite, creating the feeling of a serious review room rather than a gaming interface. Oxide orange is the signature action color for decisions and remediation; moss green is reserved for supported control effectiveness; cobalt is reserved for active navigation and evidence links; clay red communicates risk without turning the whole interface into an alarm state.

### Layout Paradigm
A persistent left mission rail anchors the scenario and progress. A wide central investigation canvas holds the selected evidence or control. A narrow right decision ledger keeps scoring, findings, and remediation visible. On mobile these become a deliberate sequence: mission context, evidence, then decision drawer.

### Signature Elements
1. Evidence ribbons that show provenance, freshness, and sensitivity at a glance.
2. A “decision ledger” with an always-visible score and justification state.
3. Thin cartographic connector lines between evidence and controls, rendered with CSS rather than visual noise.

### Interaction Philosophy
The interface rewards careful reading. Opening an evidence item exposes its metadata and asks the user to make a small, consequential classification. Every decision can be revised, but the revision is recorded in the local session timeline. Hints are progressive: first a nudge, then a framework clue, then the reference rationale.

### Animation
Use short 160–240ms opacity and transform transitions for evidence opening, drawer movement, and score updates. Stagger only the first mission reveal. Score changes use a brief count-up only when a decision is committed. Never animate layout dimensions. Honor `prefers-reduced-motion` and keep keyboard actions instant.

### Typography System
Use `DM Sans` for operational UI and `Space Grotesk` for compact section labels and numerical readouts. Headlines use a restrained 40–56px scale on desktop and 30–36px on mobile. Body copy stays at 14–16px with generous line-height. Monospace is reserved for evidence IDs, timestamps, and control references.

### Brand Essence
A hands-on SOC 2 control-testing simulation for aspiring GRC analysts and security practitioners who want to demonstrate judgment, not memorization. Personality: **precise, investigative, grounded**.

### Brand Voice
Headlines are direct and situational. CTAs describe the next professional action instead of generic onboarding language.

Example lines:
- “The evidence is incomplete. Decide what you can defend.”
- “Open the control, trace the proof, document the gap.”

### Wordmark & Logo
A compact atlas-pin symbol made from three interlocking evidence brackets, paired with the wordmark “Evidence Atlas Lab.” The mark is geometric and works as a small favicon without relying on text.

### Signature Brand Color
Oxide Orange `#C85B3A` — warm, ownable, and reserved for decisions, remediation, and the moment the analyst commits to a finding.

## Lab scope

The first release is a single end-to-end SOC 2 scenario for the fictional Northstar Health platform. The user reviews five evidence items, maps them to four Trust Services Criteria-inspired controls, classifies effectiveness, calculates risk, writes findings, and builds a remediation plan. All data is synthetic and runs locally in the browser.

## Safety and integrity boundaries

The lab never connects to AWS, Azure, customer systems, or external URLs. It does not claim to certify SOC 2 compliance. It teaches evidence-based control testing and records progress only in the browser session.
