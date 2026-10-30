import { useState } from "react";
import { FileText, Download, ShieldAlert, Fingerprint, Lock, CheckCircle2 } from "lucide-react";

const REPORTS = [
  {
    id: "INC-2026-9041",
    type: "Sockpuppet Ban-Evasion",
    primaryTarget: "@sarah_researcher",
    perpetratorOld: "@troll_alpha_91 (Suspended)",
    perpetratorNew: "@new_alpha_revenge",
    date: "2026-10-30",
    score: 96,
    confidence: "98%",
    action: "Instant ID Freeze Activated",
    status: "Quarantined",
    stylometrics: [
      "Explicit admission of ban evasion: 'u thought getting me banned was gonna work?? Round 2'",
      "Shared abrasive rhetorical token: 'clown!!'",
      "Double-punctuation shock syntax (!!)",
      "Account registered 4.8 hours after primary account suspension"
    ],
    verdict: "High-probability intentional ban evasion. Direct messaging & tagging blocked until verified government ID submitted."
  },
  {
    id: "INC-2026-8812",
    type: "Phishing & Impersonation Syndicate",
    primaryTarget: "@BinanceExchange",
    perpetratorOld: "N/A",
    perpetratorNew: "@crypto_giveaway_9921",
    date: "2026-10-29",
    score: 94,
    confidence: "95%",
    action: "Domain & Account Freeze",
    status: "Quarantined",
    stylometrics: [
      "Numeric entropy in handle: '9921'",
      "Off-platform phishing funnel: 'DM for instant claim telegram link'",
      "Follower ratio disparity: 2,840 following vs 14 followers"
    ],
    verdict: "Automated phishing node. Account suspended and phishing domain blacklisted."
  },
  {
    id: "INC-2026-7734",
    type: "Coordinated Astroturf Bot",
    primaryTarget: "Platform Wide",
    perpetratorOld: "Cluster #44",
    perpetratorNew: "@free_followers_bot",
    date: "2026-10-28",
    score: 88,
    confidence: "91%",
    action: "Shadowbanned",
    status: "Restricted",
    stylometrics: [
      "Follow-churn engagement amplification pattern",
      "Template-generated profile description"
    ],
    verdict: "Commercial follower-churn bot. Engagement demoted across search and hashtag indexing."
  },
];

export default function Reports() {
  const [selected, setSelected] = useState(REPORTS[0]);
  const [exportedMsg, setExportedMsg] = useState("");

  const handleExport = (format) => {
    setExportedMsg(`Generating official forensic ${format} packet for ${selected.id}...`);
    setTimeout(() => {
      setExportedMsg(`✓ ${selected.id}_Forensic_Evidence.${format.toLowerCase()} downloaded successfully.`);
      setTimeout(() => setExportedMsg(""), 3500);
    }, 800);
  };

  return (
    <div className="reports-page">
      <div className="page-header-box">
        <div className="tag-row">
          <span className="hero-tag">Audit & Compliance Trace</span>
          <span className="badge-tech">Chain of Custody Dossiers</span>
        </div>
        <h1 className="page-title">Trust & Safety Forensic Reports</h1>
        <p className="page-subtitle">
          Export verified incident dossiers, stylometric proofs, and automated quarantine logs for legal compliance, moderation review, and appeals.
        </p>
      </div>

      <div className="grid grid-2 reports-layout">
        {/* Left: List of Reports */}
        <section className="card">
          <div className="card-header-line">
            <h3>Incident Logs</h3>
            <span className="badge badge-tech">{REPORTS.length} Verified Files</span>
          </div>

          <div className="report-list">
            {REPORTS.map((report) => (
              <button
                key={report.id}
                type="button"
                className={`report-item ${selected.id === report.id ? "active" : ""}`}
                onClick={() => setSelected(report)}
              >
                <div className="report-item-left">
                  <div className="report-item-title-row">
                    <strong>{report.id}</strong>
                    <span className="report-type-chip">{report.type}</span>
                  </div>
                  <div className="muted font-mono report-subtext">
                    Subject: {report.perpetratorNew} • {report.date}
                  </div>
                </div>
                <div className="report-item-right">
                  <span className={`score-tag ${report.score >= 70 ? "text-danger" : "text-warn"}`}>
                    {report.score}/100
                  </span>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Right: Selected Report Details */}
        <section className="card report-detail-card">
          <div className="detail-header-row">
            <div>
              <span className="case-id-kicker">{selected.id}</span>
              <h2>{selected.type} Dossier</h2>
            </div>
            <span className="status-badge-chip frozen">{selected.status}</span>
          </div>

          <div className="report-metrics-row">
            <div className="metric-box">
              <span className="metric-label">Fraud/Risk Score</span>
              <span className="metric-val text-danger">{selected.score}/100</span>
            </div>
            <div className="metric-box">
              <span className="metric-label">Nemotron Confidence</span>
              <span className="metric-val">{selected.confidence}</span>
            </div>
            <div className="metric-box">
              <span className="metric-label">Enforcement</span>
              <span className="metric-val font-sm">{selected.action}</span>
            </div>
          </div>

          <div className="evidence-section">
            <h4>Entity Relationships:</h4>
            <div className="entity-grid">
              <div className="entity-box">
                <span className="entity-label">Target / Victim:</span>
                <strong>{selected.primaryTarget}</strong>
              </div>
              <div className="entity-box">
                <span className="entity-label">Suspect Profile:</span>
                <strong>{selected.perpetratorNew}</strong>
              </div>
              {selected.perpetratorOld !== "N/A" && (
                <div className="entity-box">
                  <span className="entity-label">Prior Linked Profile:</span>
                  <strong>{selected.perpetratorOld}</strong>
                </div>
              )}
            </div>
          </div>

          <div className="evidence-section">
            <h4>Forensic Stylometric Evidence:</h4>
            <ul className="evidence-list">
              {selected.stylometrics.map((s, i) => (
                <li key={i}>
                  <Fingerprint size={14} className="icon-tiny text-accent" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="evidence-section">
            <h4>Legal / Moderation Verdict:</h4>
            <p className="verdict-text">{selected.verdict}</p>
          </div>

          <div className="export-actions-row">
            <button
              type="button"
              className="btn"
              onClick={() => handleExport("PDF")}
            >
              <Download size={16} /> Export Forensic PDF
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => handleExport("JSON")}
            >
              Export Machine JSON
            </button>
          </div>

          {exportedMsg && (
            <div className="export-success-banner">
              <CheckCircle2 size={16} /> {exportedMsg}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
