import { useState } from "react";
import { ShieldCheck, ShieldAlert, Lock, Zap, ArrowUpRight, Filter, Fingerprint } from "lucide-react";

const STATS = [
  { label: "Accounts Profiled", value: "1,428", delta: "+12% this week", icon: ShieldCheck, color: "green" },
  { label: "Fake/Bot Accounts Flagged", value: "214", delta: "15.0% flag rate", icon: ShieldAlert, color: "red" },
  { label: "Sockpuppet Evasions Intercepted", value: "48", delta: "32 serial trolls matched", icon: Fingerprint, color: "purple" },
  { label: "Automated ID Freezes Issued", value: "31", delta: "100% prevented harassment", icon: Lock, color: "yellow" },
];

const RECENT_DETECTIONS = [
  {
    username: "@crypto_giveaway_9921",
    platform: "Twitter / X",
    type: "Phishing Bot",
    score: 94,
    status: "Quarantined",
    action: "ID Freeze Triggered",
    timestamp: "12 mins ago"
  },
  {
    username: "@new_alpha_revenge",
    platform: "Twitter / X",
    type: "Serial Troll Sockpuppet",
    score: 96,
    status: "Frozen",
    action: "Locked pending Gov ID",
    timestamp: "24 mins ago"
  },
  {
    username: "@free_followers_bot",
    platform: "Instagram",
    type: "Follow Churn",
    score: 88,
    status: "Flagged",
    action: "Shadowbanned",
    timestamp: "1 hr ago"
  },
  {
    username: "@dr_elena_ai",
    platform: "Twitter / X",
    type: "Authentic Researcher",
    score: 12,
    status: "Safe",
    action: "Approved",
    timestamp: "2 hrs ago"
  },
  {
    username: "@binance_helpdesk_fake",
    platform: "Telegram",
    type: "Brand Impersonator",
    score: 92,
    status: "Quarantined",
    action: "Domain & Account Freeze",
    timestamp: "3 hrs ago"
  },
  {
    username: "@tech_enthusiast_dev",
    platform: "LinkedIn",
    type: "Legitimate User",
    score: 18,
    status: "Safe",
    action: "Approved",
    timestamp: "4 hrs ago"
  },
];

export default function Dashboard() {
  const [filter, setFilter] = useState("ALL");

  const filteredDetections = RECENT_DETECTIONS.filter((item) => {
    if (filter === "ALL") return true;
    if (filter === "FROZEN") return item.status === "Frozen" || item.status === "Quarantined";
    if (filter === "SAFE") return item.status === "Safe";
    if (filter === "SOCKPUPPET") return item.type.includes("Sockpuppet");
    return true;
  });

  return (
    <div className="dashboard-page">
      <div className="page-header-box">
        <div className="tag-row">
          <span className="hero-tag">Live Platform Telemetry</span>
          <span className="badge-tech">NVIDIA Nemotron Active Monitoring</span>
        </div>
        <h1 className="page-title">Trust & Safety Intelligence Dashboard</h1>
        <p className="page-subtitle">
          Real-time forensic telemetry tracking bot farms, impersonators, and serial sockpuppet ban-evaders quarantined across connected platforms.
        </p>
      </div>

      {/* Primary Metrics Grid */}
      <section className="grid grid-4 stats-grid">
        {STATS.map((stat) => {
          const Icon = stat.icon;
          return (
            <article key={stat.label} className={`stat-card stat-${stat.color}`}>
              <div className="stat-icon-wrap">
                <Icon size={22} />
              </div>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
              <div className="stat-delta">{stat.delta}</div>
            </article>
          );
        })}
      </section>

      {/* Middle Banner: Automated Protection Highlight */}
      <div className="highlight-banner">
        <div className="highlight-content">
          <div className="highlight-title">
            <Zap size={18} className="text-accent" /> Automated Ban-Evasion Shield Active
          </div>
          <p>
            When abusive users attempt ban evasion by creating fresh burner accounts to target victims, 
            the <strong>Nemotron Stylometric Engine</strong> correlates syntactic signatures and freezes the new account in under <strong>850ms</strong>.
          </p>
        </div>
        <div className="highlight-stats">
          <div className="mini-stat">
            <span className="mini-num">98.4%</span>
            <span className="mini-txt">Accuracy Rate</span>
          </div>
          <div className="mini-stat">
            <span className="mini-num">&lt; 1.2s</span>
            <span className="mini-txt">Avg Inference</span>
          </div>
        </div>
      </div>

      {/* Detections Table Card */}
      <section className="card table-card">
        <div className="table-header-row">
          <div>
            <h3>Real-Time Account Telemetry & Quarantine Log</h3>
            <span className="muted">Latest automated decisions executed on Nebius GPU cluster</span>
          </div>

          <div className="filter-pill-group">
            <button
              type="button"
              className={`filter-btn ${filter === "ALL" ? "active" : ""}`}
              onClick={() => setFilter("ALL")}
            >
              All Signals
            </button>
            <button
              type="button"
              className={`filter-btn ${filter === "FROZEN" ? "active" : ""}`}
              onClick={() => setFilter("FROZEN")}
            >
              Frozen / Quarantined
            </button>
            <button
              type="button"
              className={`filter-btn ${filter === "SOCKPUPPET" ? "active" : ""}`}
              onClick={() => setFilter("SOCKPUPPET")}
            >
              Sockpuppets
            </button>
            <button
              type="button"
              className={`filter-btn ${filter === "SAFE" ? "active" : ""}`}
              onClick={() => setFilter("SAFE")}
            >
              Verified Safe
            </button>
          </div>
        </div>

        <div className="table-responsive">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Profile & Network</th>
                <th>Classification</th>
                <th>Risk Score</th>
                <th>Enforcement Action</th>
                <th>Recorded</th>
              </tr>
            </thead>
            <tbody>
              {filteredDetections.map((account) => (
                <tr key={account.username}>
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
      </section>
    </div>
  );
}
