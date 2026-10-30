import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getSessionDetections, clearSessionData } from "../services/sessionStore.js";
import { ShieldCheck, ShieldAlert, Lock, Zap, Fingerprint, Trash2, ArrowRight } from "lucide-react";

export default function Dashboard() {
  const [detections, setDetections] = useState([]);
  const [filter, setFilter] = useState("ALL");

  const loadData = () => {
    setDetections(getSessionDetections());
  };

  useEffect(() => {
    loadData();
    window.addEventListener("nemotron_session_updated", loadData);
    return () => window.removeEventListener("nemotron_session_updated", loadData);
  }, []);

  const totalProfiled = detections.length;
  const flaggedCount = detections.filter((d) => d.score >= 70).length;
  const sockpuppetCount = detections.filter((d) => (d.type || "").toLowerCase().includes("sockpuppet")).length;
  const frozenCount = detections.filter((d) => (d.action || "").toLowerCase().includes("freeze") || (d.status || "").toLowerCase().includes("frozen")).length;

  const filteredDetections = detections.filter((item) => {
    if (filter === "ALL") return true;
    if (filter === "FROZEN") return item.status === "Frozen" || item.status === "Quarantined";
    if (filter === "SAFE") return item.status === "Safe";
    if (filter === "SOCKPUPPET") return (item.type || "").toLowerCase().includes("sockpuppet");
    return true;
  });

  return (
    <div className="dashboard-page">
      <div className="page-header-box">
        <div className="tag-row">
          <span className="hero-tag">Current Session Telemetry</span>
          <span className="badge-tech">Real-Time NVIDIA Nemotron Logs</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "12px" }}>
          <div>
            <h1 className="page-title">Trust & Safety Intelligence Dashboard</h1>
            <p className="page-subtitle">
              Displaying live accounts and serial troll evasions profiled during your current session.
            </p>
          </div>
          {detections.length > 0 && (
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => {
                if (confirm("Clear all session telemetry?")) {
                  clearSessionData();
                }
              }}
            >
              <Trash2 size={14} /> Clear Session Data
            </button>
          )}
        </div>
      </div>

      {/* Primary Metrics Grid (Derived strictly from session data) */}
      <section className="grid grid-4 stats-grid">
        <article className="stat-card stat-green">
          <div className="stat-icon-wrap">
            <ShieldCheck size={22} />
          </div>
          <div className="stat-value">{totalProfiled}</div>
          <div className="stat-label">Accounts Profiled</div>
          <div className="stat-delta">Current Session</div>
        </article>

        <article className="stat-card stat-red">
          <div className="stat-icon-wrap">
            <ShieldAlert size={22} />
          </div>
          <div className="stat-value">{flaggedCount}</div>
          <div className="stat-label">High-Risk / Bots</div>
          <div className="stat-delta">{totalProfiled > 0 ? `${Math.round((flaggedCount / totalProfiled) * 100)}% flag rate` : "No flags yet"}</div>
        </article>

        <article className="stat-card stat-purple">
          <div className="stat-icon-wrap">
            <Fingerprint size={22} />
          </div>
          <div className="stat-value">{sockpuppetCount}</div>
          <div className="stat-label">Sockpuppets Intercepted</div>
          <div className="stat-delta">{sockpuppetCount > 0 ? "Ban-evasion matched" : "None detected yet"}</div>
        </article>

        <article className="stat-card stat-yellow">
          <div className="stat-icon-wrap">
            <Lock size={22} />
          </div>
          <div className="stat-value">{frozenCount}</div>
          <div className="stat-label">Automated ID Freezes</div>
          <div className="stat-delta">{frozenCount > 0 ? "Protected victims" : "No freezes active"}</div>
        </article>
      </section>

      {/* Middle Banner: Automated Protection Highlight */}
      <div className="highlight-banner">
        <div className="highlight-content">
          <div className="highlight-title">
            <Zap size={18} className="text-accent" /> Active Session Protection
          </div>
          <p>
            Every account you analyze on <strong>Analyze</strong> or <strong>Troll Hunter</strong> is processed via NVIDIA Nemotron on Nebius Token Factory and dynamically recorded here in real-time.
          </p>
        </div>
        <div className="highlight-stats">
          <div className="mini-stat">
            <span className="mini-num">{detections.length}</span>
            <span className="mini-txt">Live Logs</span>
          </div>
          <div className="mini-stat">
            <span className="mini-num">&lt; 2.1s</span>
            <span className="mini-txt">Avg Inference</span>
          </div>
        </div>
      </div>

      {/* Detections Table Card */}
      <section className="card table-card">
        <div className="table-header-row">
          <div>
            <h3>Current Session Telemetry Log</h3>
            <span className="muted">
              {detections.length === 0
                ? "No accounts analyzed in this session yet."
                : `${detections.length} account${detections.length === 1 ? "" : "s"} logged in this session`}
            </span>
          </div>

          {detections.length > 0 && (
            <div className="filter-pill-group">
              <button
                type="button"
                className={`filter-btn ${filter === "ALL" ? "active" : ""}`}
                onClick={() => setFilter("ALL")}
              >
                All ({detections.length})
              </button>
              <button
                type="button"
                className={`filter-btn ${filter === "FROZEN" ? "active" : ""}`}
                onClick={() => setFilter("FROZEN")}
              >
                Frozen ({frozenCount})
              </button>
              <button
                type="button"
                className={`filter-btn ${filter === "SOCKPUPPET" ? "active" : ""}`}
                onClick={() => setFilter("SOCKPUPPET")}
              >
                Sockpuppets ({sockpuppetCount})
              </button>
              <button
                type="button"
                className={`filter-btn ${filter === "SAFE" ? "active" : ""}`}
                onClick={() => setFilter("SAFE")}
              >
                Safe
              </button>
            </div>
          )}
        </div>

        {detections.length === 0 ? (
          <div className="empty-state" style={{ padding: "50px 20px" }}>
            <ShieldCheck size={48} className="muted-icon" />
            <h4 style={{ margin: "12px 0 6px", color: "var(--text-bright)" }}>No Accounts Profiled in This Session Yet</h4>
            <p className="muted" style={{ maxWidth: "480px", margin: "0 auto 20px" }}>
              Run an individual profile evaluation or inspect a suspected serial troll to populate your live telemetry dashboard.
            </p>
            <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
              <Link to="/analyze" className="btn btn-sm">
                Analyze an Account <ArrowRight size={14} />
              </Link>
              <Link to="/sockpuppet-hunter" className="btn btn-secondary btn-sm">
                Launch Troll Hunter <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Profile & Platform</th>
                  <th>Classification</th>
                  <th>Risk Score</th>
                  <th>Enforcement Action</th>
                  <th>Recorded</th>
                </tr>
              </thead>
              <tbody>
                {filteredDetections.map((account) => (
                  <tr key={account.id}>
                    <td>
                      <div className="table-user-cell">
                        <strong>{account.username}</strong>
                        <span className="table-sub-tag">{account.platform}</span>
                      </div>
                    </td>
                    <td>
                      <span className="category-chip">{account.type}</span>
                    </td>
                    <td>
                      <div className="score-cell">
                        <span className={`score-digit ${account.score >= 70 ? "text-danger" : account.score >= 40 ? "text-warn" : "text-safe"}`}>
                          {account.score}
                        </span>
                        <span className="score-denom">/100</span>
                      </div>
                    </td>
                    <td>
                      <span className={`status-badge-chip ${account.status.toLowerCase()}`}>
                        {account.action}
                      </span>
                    </td>
                    <td className="muted font-mono">{account.timestamp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
