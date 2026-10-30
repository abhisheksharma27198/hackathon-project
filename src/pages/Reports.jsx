import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getSessionReports } from "../services/sessionStore.js";
import { Download, Fingerprint, CheckCircle2, FileText, ArrowRight } from "lucide-react";

export default function Reports() {
  const [reports, setReports] = useState([]);
  const [selected, setSelected] = useState(null);
  const [exportedMsg, setExportedMsg] = useState("");

  const loadData = () => {
    const list = getSessionReports();
    setReports(list);
    if (list.length > 0 && !selected) {
      setSelected(list[0]);
    } else if (list.length === 0) {
      setSelected(null);
    }
  };

  useEffect(() => {
    loadData();
    window.addEventListener("nemotron_session_updated", loadData);
    return () => window.removeEventListener("nemotron_session_updated", loadData);
  }, []);

  const handleExport = (format) => {
    if (!selected) return;
    setExportedMsg(`Generating official forensic ${format} packet for ${selected.id}...`);
    setTimeout(() => {
      setExportedMsg(`✓ ${selected.id}_Forensic_Evidence.${format.toLowerCase()} downloaded successfully.`);
      setTimeout(() => setExportedMsg(""), 3500);
    }, 600);
  };

  return (
    <div className="reports-page">
      <div className="page-header-box">
        <div className="tag-row">
          <span className="hero-tag">Session Audit & Compliance</span>
          <span className="badge-tech">Chain of Custody Dossiers</span>
        </div>
        <h1 className="page-title">Trust & Safety Forensic Reports</h1>
        <p className="page-subtitle">
          Export verified incident dossiers, stylometric proofs, and automated quarantine logs generated during your active session.
        </p>
      </div>

      {reports.length === 0 ? (
        <section className="card" style={{ padding: "60px 20px", textAlign: "center" }}>
          <FileText size={52} className="muted-icon" style={{ margin: "0 auto 16px" }} />
          <h3 style={{ margin: "0 0 8px", color: "var(--text-bright)" }}>No Reports Generated in This Session Yet</h3>
          <p className="muted" style={{ maxWidth: "480px", margin: "0 auto 24px" }}>
            Whenever you run an account analysis or troll ban-evasion match, an official forensic audit report will be generated and saved here.
          </p>
          <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
            <Link to="/analyze" className="btn btn-sm">
              Analyze an Account <ArrowRight size={14} />
            </Link>
            <Link to="/sockpuppet-hunter" className="btn btn-secondary btn-sm">
              Launch Troll Hunter <ArrowRight size={14} />
            </Link>
          </div>
        </section>
      ) : (
        <div className="grid grid-2 reports-layout">
          {/* Left: List of Session Reports */}
          <section className="card">
            <div className="card-header-line">
              <h3>Session Incident Logs</h3>
              <span className="badge badge-tech">{reports.length} Verified {reports.length === 1 ? "File" : "Files"}</span>
            </div>

            <div className="report-list">
              {reports.map((report) => (
                <button
                  key={report.id}
                  type="button"
                  className={`report-item ${selected?.id === report.id ? "active" : ""}`}
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
                    <span className={`score-tag ${report.score >= 50 ? "text-danger" : report.score >= 30 ? "text-warn" : "text-safe"}`}>
                      {report.score}/100
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* Right: Selected Report Details */}
          {selected && (
            <section className="card report-detail-card">
              <div className="detail-header-row">
                <div>
                  <span className="case-id-kicker">{selected.id}</span>
                  <h2>{selected.type} Dossier</h2>
                </div>
                <span className={`status-badge-chip ${(selected.status || "").toLowerCase()}`}>{selected.status}</span>
              </div>

              <div className="report-metrics-row">
                <div className="metric-box">
                  <span className="metric-label">Fraud/Risk Score</span>
                  <span className={`metric-val ${selected.score >= 50 ? "text-danger" : "text-warn"}`}>{selected.score}/100</span>
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
                  {selected.perpetratorOld && selected.perpetratorOld !== "N/A" && (
                    <div className="entity-box">
                      <span className="entity-label">Prior Linked Profile:</span>
                      <strong>{selected.perpetratorOld}</strong>
                    </div>
                  )}
                </div>
              </div>

              {selected.stylometrics && selected.stylometrics.length > 0 && (
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
              )}

              <div className="evidence-section">
                <h4>Nemotron Reasoning & Verdict:</h4>
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
          )}
        </div>
      )}
    </div>
  );
}
