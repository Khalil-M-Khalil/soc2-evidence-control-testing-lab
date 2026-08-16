/* Evidence Atlas Lab — asymmetric SOC 2 investigation workbench. Oxide orange marks committed decisions; evidence stays primary. */
import { useMemo, useState } from 'react';
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  Check,
  ChevronRight,
  CircleHelp,
  ClipboardCheck,
  FileKey2,
  FileSearch,
  Flag,
  LockKeyhole,
  Menu,
  Network,
  Search,
  ShieldAlert,
  Sparkles,
  Target,
  X,
} from 'lucide-react';

type Evidence = {
  id: string;
  title: string;
  type: string;
  age: string;
  status: 'supports' | 'gap' | 'context';
  summary: string;
  detail: string;
  tags: string[];
};

type Control = {
  id: string;
  title: string;
  domain: string;
  requirement: string;
  evidence: string[];
  expected: 'partial' | 'fail' | 'pass';
  rationale: string;
};

const evidence: Evidence[] = [
  { id: 'EV-001', title: 'Identity & access policy', type: 'Policy', age: '18 months old', status: 'context', summary: 'A documented access policy exists, but its review cadence is not evidenced.', detail: 'The policy requires MFA for privileged access and quarterly access reviews. The document metadata shows last review: 2024-08-18. The audit period is 2026-Q2.', tags: ['CC6.1', 'Governance'] },
  { id: 'EV-002', title: 'IAM admin export', type: 'System export', age: 'Captured 6 days ago', status: 'gap', summary: 'Two break-glass administrators do not have MFA enrolled.', detail: 'The export lists 42 active identities. 40 have MFA enabled. Accounts `ops-breakglass-01` and `ops-breakglass-02` are active, privileged, and exempt from the MFA group.', tags: ['CC6.1', 'IAM'] },
  { id: 'EV-003', title: 'Central logging configuration', type: 'Configuration', age: 'Captured 12 days ago', status: 'gap', summary: 'CloudTrail is active in the primary region but absent in eu-west-1.', detail: 'The central logging account receives management events from us-east-1 and us-west-2. No trail or delegated administrator is configured for eu-west-1, where the payments worker is deployed.', tags: ['CC7.2', 'Monitoring'] },
  { id: 'EV-004', title: 'Database encryption report', type: 'System report', age: 'Captured 3 days ago', status: 'supports', summary: 'Production data stores use managed encryption keys at rest.', detail: 'All three production PostgreSQL clusters report storage encryption enabled. Key rotation is automatic. The report does not address backup restoration testing.', tags: ['CC6.7', 'Encryption'] },
  { id: 'EV-005', title: 'Backup restore exercise', type: 'Exercise record', age: 'Captured 9 months ago', status: 'gap', summary: 'A restore test exists, but it predates the current recovery objective.', detail: 'The exercise restored a snapshot in 2025-Q3. The current policy requires quarterly validation and a 4-hour RTO. No Q1 or Q2 2026 exercise record is available.', tags: ['CC7.4', 'Resilience'] },
];

const controls: Control[] = [
  { id: 'CC6.1', title: 'Logical access controls', domain: 'Security', requirement: 'Access is restricted to authorized users and protected with strong authentication.', evidence: ['EV-001', 'EV-002'], expected: 'partial', rationale: 'The policy supports the control design, but two active privileged identities lack MFA. This is a partially effective operating control.' },
  { id: 'CC6.7', title: 'Transmission & storage protection', domain: 'Security', requirement: 'Data is protected against unauthorized access during storage and processing.', evidence: ['EV-004'], expected: 'pass', rationale: 'The production encryption report is recent, scoped to all clusters, and supports encryption at rest. It does not prove every protection objective, but it supports this control test.' },
  { id: 'CC7.2', title: 'Anomaly and event monitoring', domain: 'Availability', requirement: 'Security events are monitored and reviewed across in-scope environments.', evidence: ['EV-003'], expected: 'fail', rationale: 'A production region has no centralized CloudTrail coverage. The evidence directly contradicts a complete monitoring assertion.' },
  { id: 'CC7.4', title: 'Recovery and continuity testing', domain: 'Availability', requirement: 'Recovery procedures are tested often enough to support stated objectives.', evidence: ['EV-005'], expected: 'fail', rationale: 'The only exercise is outside the required quarterly cadence and does not demonstrate the current 4-hour RTO.' },
];

const scoreFor = (choice: string | undefined, expected: string) => choice === expected ? 25 : choice ? 7 : 0;

export default function App() {
  const [activeTab, setActiveTab] = useState<'mission' | 'evidence' | 'controls' | 'findings'>('mission');
  const [selectedEvidence, setSelectedEvidence] = useState(evidence[1]);
  const [selectedControl, setSelectedControl] = useState(controls[0]);
  const [decisions, setDecisions] = useState<Record<string, string>>({});
  const [findingText, setFindingText] = useState('');
  const [owner, setOwner] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const score = useMemo(() => controls.reduce((total, control) => total + scoreFor(decisions[control.id], control.expected), 0), [decisions]);
  const completed = Object.keys(decisions).length;
  const progress = Math.round((completed / controls.length) * 100);
  const findingReady = findingText.trim().length > 24 && owner.trim().length > 2;

  const decide = (controlId: string, value: string) => {
    setDecisions((current) => ({ ...current, [controlId]: value }));
    setSubmitted(false);
  };

  const navItems = [
    { key: 'mission' as const, label: 'Mission brief', icon: Target },
    { key: 'evidence' as const, label: 'Evidence vault', icon: FileSearch, count: evidence.length },
    { key: 'controls' as const, label: 'Control matrix', icon: ClipboardCheck, count: controls.length },
    { key: 'findings' as const, label: 'Finding & action', icon: Flag },
  ];

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand-lockup"><div className="brand-mark"><Network size={19} /></div><div><p className="eyebrow">EVIDENCE ATLAS</p><h1>LAB / 01</h1></div></div>
        <div className="topbar-meta"><span className="live-dot" /> LOCAL SESSION <span className="divider" /> <span className="mono">SOC2-NSH-026</span></div>
        <button className="mobile-menu" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Open mission navigation"><Menu size={20} /></button>
      </header>
      <div className="workspace">
        <aside className={`mission-rail ${mobileOpen ? 'open' : ''}`}>
          <div className="rail-intro"><span className="section-kicker">ACTIVE CASE</span><h2>Northstar<br />Health</h2><p>Type II readiness review<br />Audit period · 2026 Q2</p></div>
          <div className="progress-card"><div className="progress-head"><span>MISSION PROGRESS</span><strong>{progress}%</strong></div><div className="progress-track"><span style={{ width: `${progress}%` }} /></div><small>{completed} of {controls.length} control calls committed</small></div>
          <nav className="rail-nav" aria-label="Lab sections">{navItems.map(({ key, label, icon: Icon, count }) => <button key={key} className={activeTab === key ? 'nav-item active' : 'nav-item'} onClick={() => { setActiveTab(key); setMobileOpen(false); }}><Icon size={16} /><span>{label}</span>{count && <em>{count}</em>}<ChevronRight className="nav-arrow" size={14} /></button>)}</nav>
          <div className="rail-footer"><div className="safe-note"><LockKeyhole size={15} /><span>Browser-local<br />synthetic data only</span></div><button className="hint-button" onClick={() => setShowHint(!showHint)}><CircleHelp size={15} /> Need a hint?</button></div>
        </aside>

        <main className="canvas">
          {showHint && <div className="hint-banner"><Sparkles size={16} /><span><strong>Analyst hint:</strong> a policy describes intent; an operational export proves what actually happened.</span><button onClick={() => setShowHint(false)} aria-label="Close hint"><X size={15} /></button></div>}
          <div className="canvas-head"><div><span className="section-kicker">CONTROL TESTING WORKBENCH</span><h2>{activeTab === 'mission' ? 'Trace the proof.' : activeTab === 'evidence' ? 'Open the evidence.' : activeTab === 'controls' ? 'Make the call.' : 'Document the gap.'}</h2></div><div className="case-status"><span>CASE STATUS</span><strong>{score === 100 ? 'READY FOR REVIEW' : 'IN PROGRESS'}</strong></div></div>

          {activeTab === 'mission' && <Mission onStart={() => setActiveTab('evidence')} />}
          {activeTab === 'evidence' && <EvidenceView selected={selectedEvidence} setSelected={setSelectedEvidence} />}
          {activeTab === 'controls' && <ControlsView selected={selectedControl} setSelected={setSelectedControl} decisions={decisions} decide={decide} />}
          {activeTab === 'findings' && <FindingsView findingText={findingText} setFindingText={setFindingText} owner={owner} setOwner={setOwner} ready={findingReady} submitted={submitted} onSubmit={() => setSubmitted(true)} />}
        </main>

        <aside className="decision-ledger"><div className="ledger-head"><div><span className="section-kicker">DECISION LEDGER</span><h2>Analyst score</h2></div><div className="score-orbit"><strong>{score}</strong><span>/ 100</span></div></div><p className="ledger-copy">Your score reflects the defensibility of each control decision, not speed.</p><div className="ledger-list">{controls.map((control, index) => <button className="ledger-row" key={control.id} onClick={() => { setSelectedControl(control); setActiveTab('controls'); }}><span className={`ledger-index ${decisions[control.id] ? 'done' : ''}`}>{decisions[control.id] ? <Check size={13} /> : `0${index + 1}`}</span><span><strong>{control.id}</strong><small>{control.title}</small></span><span className={`decision-state ${decisions[control.id] ? 'filled' : ''}`}>{decisions[control.id] ? decisions[control.id].toUpperCase() : 'OPEN'}</span></button>)}</div><div className="ledger-bottom"><div className="legend-row"><span className="legend-dot moss" /> Evidence-supported</div><div className="legend-row"><span className="legend-dot oxide" /> Analyst decision</div><div className="legend-row"><span className="legend-dot clay" /> Gap / risk signal</div></div></aside>
      </div>
    </div>
  );
}

function Mission({ onStart }: { onStart: () => void }) {
  return <section className="mission-view"><div className="mission-hero"><div className="hero-index">01 <span>of 04</span></div><div className="hero-copy"><p className="section-kicker">NORTHSTAR HEALTH · SOC 2 TYPE II</p><h3>A clean assertion<br /><i>needs</i> clean proof.</h3><p className="hero-lede">You are the control tester. Review the evidence, decide what it proves, and document the gaps you would defend in front of an auditor.</p><button className="primary-button" onClick={onStart}>Enter the evidence vault <ArrowRight size={16} /></button></div><div className="hero-stamp"><BookOpen size={18} /><span>FIELD<br />SIMULATION</span></div></div><div className="mission-grid"><article className="brief-card"><span className="section-kicker">YOUR BRIEF</span><p>Northstar Health is preparing for its first SOC 2 Type II review. The product runs across three cloud regions and serves protected health workflows.</p><p>Four controls have been sampled. Five artifacts are waiting in the vault. Your task is to make a defensible call — not a generous one.</p></article><article className="brief-card accent-card"><span className="section-kicker">WHAT GOOD LOOKS LIKE</span><ul><li><Check size={15} /> Distinguish policy from operation.</li><li><Check size={15} /> Tie each call to a specific artifact.</li><li><Check size={15} /> Make uncertainty visible.</li></ul></article></div></section>;
}

function EvidenceView({ selected, setSelected }: { selected: Evidence; setSelected: (e: Evidence) => void }) {
  return <section className="evidence-view"><div className="panel-intro"><p>Five artifacts. Different ages. One question: <strong>what can you defend?</strong></p><div className="filter-chip"><Search size={14} /> All artifacts</div></div><div className="evidence-layout"><div className="evidence-list">{evidence.map((item) => <button key={item.id} className={`evidence-item ${selected.id === item.id ? 'selected' : ''}`} onClick={() => setSelected(item)}><div className="evidence-icon"><FileKey2 size={17} /></div><div className="evidence-item-copy"><span className="mono">{item.id} · {item.type}</span><strong>{item.title}</strong><small>{item.age}</small></div><span className={`status-pin ${item.status}`} /></button>)}</div><article className="evidence-detail"><div className="detail-top"><div><span className="mono">{selected.id} · {selected.type}</span><h3>{selected.title}</h3></div><span className={`evidence-badge ${selected.status}`}>{selected.status === 'supports' ? 'SUPPORTS ASSERTION' : selected.status === 'gap' ? 'GAP SIGNAL' : 'CONTEXT ONLY'}</span></div><div className="detail-paper"><p className="paper-label">ANALYST SUMMARY</p><p className="paper-summary">{selected.summary}</p><div className="paper-rule" /><p className="paper-label">ARTIFACT DETAIL</p><p>{selected.detail}</p><div className="tag-row">{selected.tags.map(tag => <span key={tag}>{tag}</span>)}</div></div><div className="detail-foot"><span><LockKeyhole size={14} /> Synthetic artifact · no external connection</span><span className="mono">SHA · {selected.id.replace('EV-', 'a7f3c9')}</span></div></article></div></section>;
}

function ControlsView({ selected, setSelected, decisions, decide }: { selected: Control; setSelected: (c: Control) => void; decisions: Record<string, string>; decide: (id: string, value: string) => void }) {
  return <section className="controls-view"><div className="panel-intro"><p>Read the requirement, inspect its linked artifacts, then make one call. You can revise it later.</p><div className="framework-chip">SOC 2 · Security & Availability</div></div><div className="control-layout"><div className="control-list">{controls.map(control => <button key={control.id} className={`control-item ${selected.id === control.id ? 'selected' : ''}`} onClick={() => setSelected(control)}><span className="control-id">{control.id}</span><span><strong>{control.title}</strong><small>{control.domain}</small></span><span className={`control-state ${decisions[control.id] ? 'decided' : ''}`}>{decisions[control.id] ? <Check size={14} /> : <ChevronRight size={15} />}</span></button>)}</div><article className="control-detail"><div className="control-heading"><div><span className="mono">{selected.id} · {selected.domain.toUpperCase()}</span><h3>{selected.title}</h3></div><BadgeCheck size={25} /></div><div className="requirement-box"><span className="section-kicker">CONTROL REQUIREMENT</span><p>{selected.requirement}</p></div><div className="linked-evidence"><span className="section-kicker">LINKED EVIDENCE</span><div>{selected.evidence.map(id => <span key={id} className="linked-chip"><FileSearch size={14} /> {id}</span>)}</div></div><div className="decision-box"><div><span className="section-kicker">YOUR CONTROL CALL</span><p>What does the evidence support?</p></div><div className="decision-options">{['pass', 'partial', 'fail'].map(option => <button key={option} className={decisions[selected.id] === option ? `choice selected ${option}` : `choice ${option}`} onClick={() => decide(selected.id, option)}>{decisions[selected.id] === option && <Check size={14} />}{option === 'pass' ? 'Effective' : option === 'partial' ? 'Partially effective' : 'Ineffective'}</button>)}</div></div>{decisions[selected.id] && <div className="rationale"><Sparkles size={15} /><span><strong>Reference rationale:</strong> {selected.rationale}</span></div>}</article></div></section>;
}

function FindingsView({ findingText, setFindingText, owner, setOwner, ready, submitted, onSubmit }: { findingText: string; setFindingText: (v: string) => void; owner: string; setOwner: (v: string) => void; ready: boolean; submitted: boolean; onSubmit: () => void }) {
  return <section className="findings-view"><div className="panel-intro"><p>Turn your strongest gap signal into an action someone can own and close.</p><div className="risk-chip"><ShieldAlert size={14} /> Draft finding</div></div><div className="finding-layout"><article className="finding-form"><div className="form-heading"><div><span className="section-kicker">NEW FINDING · F-001</span><h3>Make the gap legible.</h3></div><span className="risk-level">HIGH RISK</span></div><label>Finding statement <span>Required</span><textarea value={findingText} onChange={e => setFindingText(e.target.value)} placeholder="Example: Two privileged break-glass identities are active without MFA..." /></label><label>Remediation owner <span>Required</span><input value={owner} onChange={e => setOwner(e.target.value)} placeholder="Team or role, not a personal name" /></label><div className="finding-grid"><label>Likelihood<select defaultValue="4"><option value="3">3 · Possible</option><option value="4">4 · Likely</option><option value="5">5 · Almost certain</option></select></label><label>Impact<select defaultValue="5"><option value="3">3 · Moderate</option><option value="4">4 · Major</option><option value="5">5 · Severe</option></select></label></div><div className="risk-score"><div><span className="section-kicker">CALCULATED RISK</span><strong>20 <small>/ 25</small></strong></div><span>CRITICAL<br /><small>Likelihood × Impact</small></span></div><button className="primary-button full" disabled={!ready} onClick={onSubmit}>{submitted ? 'Finding committed' : 'Commit finding'} <ArrowRight size={16} /></button>{submitted && <div className="success-note"><Check size={16} /> Finding saved to the local case timeline. Nice work documenting the gap.</div>}</article><aside className="reference-panel"><span className="section-kicker">REFERENCE STANDARD</span><h3>CC6.1 · Logical access</h3><p>Evidence shows two active privileged accounts are exempt from MFA. A defensible finding names the population, condition, and risk — then assigns an accountable owner.</p><div className="reference-divider" /><span className="section-kicker">CLOSURE CRITERIA</span><ul><li>Both accounts enrolled in phishing-resistant MFA.</li><li>Exception register approved and time-bound.</li><li>Follow-up export reviewed by a separate analyst.</li></ul></aside></div></section>;
}
