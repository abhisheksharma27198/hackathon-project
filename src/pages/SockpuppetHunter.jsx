import { useState } from "react";
import { matchSockpuppetWithNemotron } from "../services/nemotron.js";
import { addSessionDetection, addSessionReport } from "../services/sessionStore.js";
import { ShieldAlert, UserX, Cpu, Fingerprint, Lock, CheckCircle2, AlertTriangle, Zap } from "lucide-react";

export default function SockpuppetHunter() {
  const [victim, setVictim] = useState("");
  const [oldAccount, setOldAccount] = useState({
    username: "",
    bio: "",
    recentPosts: "",
  });
  const [newAccount, setNewAccount] = useState({
    username: "",
    bio: "",
    recentPosts: "",
    accountAgeDays: "",
  });

  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [frozenStatus, setFrozenStatus] = useState(null);
  const [savedToSession, setSavedToSession] = useState(false);

  const handleRunAnalysis = async (e) => {
    e?.preventDefault();
    if (!victim.trim() || !oldAccount.username.trim() || !newAccount.username.trim()) {
      return;
    }

    setLoading(true);
    setAnalysis(null);
    setFrozenStatus(null);
    setSavedToSession(false);

    try {
      const res = await matchSockpuppetWithNemotron(oldAccount, newAccount, victim);
      setAnalysis(res);
      if (res.isSameActor) {
        setFrozenStatus("QUARANTINED_ID_REQUIRED");
      } else {
        setFrozenStatus("CLEARED");
      }

      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      const victimFmt = victim.startsWith("@") ? victim : `@${victim}`;
      const newFmt = newAccount.username.startsWith("@") ? newAccount.username : `@${newAccount.username}`;
      const oldFmt = oldAccount.username.startsWith("@") ? oldAccount.username : `@${oldAccount.username}`;

      // Save to Session Detections
      addSessionDetection({
        id: `SOCK-${Date.now()}`,
        username: newFmt,
        platform: "Twitter / X",
        type: res.isSameActor ? "Sockpuppet Ban-Evasion" : "Unrelated User",
        score: res.matchProbability,
        status: res.isSameActor ? "Frozen" : "Safe",
        action: res.isSameActor ? "ID Freeze Triggered" : "Cleared",
        timestamp: `Just now (${timeStr})`,
      });

      // Save to Session Reports
      addSessionReport({
        id: `INC-${Math.floor(1000 + Math.random() * 9000)}`,
        type: res.isSameActor ? "Sockpuppet Ban-Evasion" : "Authorship Non-Match",
        primaryTarget: victimFmt,
        perpetratorOld: `${oldFmt} (Suspended)`,
        perpetratorNew: newFmt,
        date: now.toISOString().split("T")[0],
        score: res.matchProbability,
        confidence: `${res.confidence}%`,
        action: res.isSameActor ? "Instant ID Freeze Activated" : "Cleared",
        status: res.isSameActor ? "Quarantined" : "Cleared",
        stylometrics: res.stylometricMatches || [],
        verdict: res.reasoningDossier || "Evaluated by NVIDIA Nemotron stylometric engine.",
      });

      setSavedToSession(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sockpuppet-container">
      {/* Header Banner */}
      <div className="page-header-box">
        <div className="tag-row">
          <span className="hero-tag">
            <Fingerprint size={14} className="tag-icon" /> Stylometric Forensics Engine
          </span>
          <span className="badge-tech">
            <Cpu size={14} /> NVIDIA Nemotron Reasoning
          </span>
        </div>
        <h1 className="page-title">Sockpuppet & Serial Troll Hunter</h1>
        <p className="page-subtitle">
          Detect when a previously blocked or banned abuser spins up a new burner account to harass the same victim.
          NVIDIA Nemotron compares stylometric fingerprints and temporal retaliation patterns—triggering
          an <strong>instant automated freeze</strong> until the perpetrator provides official government ID.
        </p>
      </div>

      {/* Main Dual-Profile Comparison Grid */}
      <form onSubmit={handleRunAnalysis}>
        {/* Victim input */}
        <div className="card victim-card">
          <label className="label">Target / Harassed Party Handle *</label>
          <div className="input-prefix-wrapper">
            <span className="prefix">@</span>
            <input
              type="text"
              className="input prefix-input"
              value={victim}
              onChange={(e) => setVictim(e.target.value)}
              placeholder="e.g. target_victim_handle"
              required
            />
          </div>
        </div>

        <div className="grid grid-2 duel-grid">
          {/* Account A (Historical) */}
          <div className="card profile-box old-profile">
            <div className="card-header-line">
              <span className="profile-indicator historical">
                <UserX size={16} /> Account A (Previous Troll / Suspended)
              </span>
            </div>

            <div className="form-field">
              <label className="label">Suspended Username Handle *</label>
              <input
                className="input"
                value={oldAccount.username}
                onChange={(e) => setOldAccount({ ...oldAccount, username: e.target.value })}
                placeholder="e.g. old_troll_handle"
                required
              />
            </div>

            <div className="form-field">
              <label className="label">Previous Bio / Keywords</label>
              <input
                className="input"
                value={oldAccount.bio}
                onChange={(e) => setOldAccount({ ...oldAccount, bio: e.target.value })}
                placeholder="Prior bio text or profile info..."
              />
            </div>

            <div className="form-field">
              <label className="label">Harassing Text / Post Sample *</label>
              <textarea
                className="textarea"
                rows={4}
                value={oldAccount.recentPosts}
                onChange={(e) => setOldAccount({ ...oldAccount, recentPosts: e.target.value })}
                placeholder="Paste past abusive messages, insults, or trolling posts by Account A..."
                required
              />
            </div>
          </div>

          {/* Account B (Suspected New Burner) */}
          <div className="card profile-box new-profile">
            <div className="card-header-line">
              <span className="profile-indicator suspect">
                <AlertTriangle size={16} /> Account B (Fresh Burner / Suspected Alt)
              </span>
            </div>

            <div className="form-field">
              <label className="label">New Suspicious Handle *</label>
              <input
                className="input"
                value={newAccount.username}
                onChange={(e) => setNewAccount({ ...newAccount, username: e.target.value })}
                placeholder="e.g. new_alt_handle"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-field" style={{ flex: 1 }}>
                <label className="label">Account Age in Days</label>
                <input
                  className="input"
                  value={newAccount.accountAgeDays}
                  onChange={(e) => setNewAccount({ ...newAccount, accountAgeDays: e.target.value })}
                  placeholder="e.g. 0.2 (created today)"
                />
              </div>
              <div className="form-field" style={{ flex: 2 }}>
                <label className="label">New Bio</label>
                <input
                  className="input"
                  value={newAccount.bio}
                  onChange={(e) => setNewAccount({ ...newAccount, bio: e.target.value })}
                  placeholder="New bio..."
                />
              </div>
            </div>

            <div className="form-field">
              <label className="label">New Harassing Text (bragging/insults) *</label>
              <textarea
                className="textarea"
                rows={4}
                value={newAccount.recentPosts}
                onChange={(e) => setNewAccount({ ...newAccount, recentPosts: e.target.value })}
                placeholder="Paste the new harassing posts, comments, or bragging messages..."
                required
              />
            </div>
          </div>
        </div>

        <div className="action-row">
          <button
            id="execute-match-btn"
            type="submit"
            className="btn btn-action-lg"
            disabled={loading || !victim.trim() || !oldAccount.username.trim() || !newAccount.username.trim()}
            onClick={handleRunAnalysis}
          >
            {loading ? (
              <>Running Stylometric Correlation on Nebius...</>
            ) : (
              <>
                <Fingerprint size={18} /> Execute NVIDIA Nemotron Stylometric Match
              </>
            )}
          </button>
        </div>
      </form>

      {/* Forensic Results Panel */}
      {analysis && (
        <div className="analysis-results-section">
          {analysis.isLiveInference && (
            <div className="live-inference-badge" style={{ marginBottom: "16px" }}>
              <Zap size={14} className="text-accent" />
              <span>Live Nebius Token Factory Endpoint: <strong>{analysis.modelUsed}</strong></span>
            </div>
          )}

          {savedToSession && (
            <div className="session-saved-pill" style={{ marginBottom: "16px" }}>
              <CheckCircle2 size={14} /> Added to current session Dashboard & Reports
            </div>
          )}

          {/* Automated Enforcement Status Banner */}
          {frozenStatus === "QUARANTINED_ID_REQUIRED" ? (
            <div className="enforcement-banner freeze-alert">
              <div className="banner-icon-col">
                <Lock size={32} className="pulse-lock" />
              </div>
              <div className="banner-text-col">
                <div className="banner-title">
                  ⚡ AUTOMATED ID-FREEZE EXECUTED: Account @{newAccount.username} Quarantined
                </div>
                <div className="banner-desc">
                  Based on a <strong>{analysis.matchProbability}% stylometric authorship match</strong> with suspended account @{oldAccount.username},
                  this profile has been restricted in real-time. Mentions, direct messaging, and reply privileges against @{victim} are locked.
                  <strong> The perpetrator cannot interact until presenting verified government photo ID or biometric proof.</strong>
                </div>
              </div>
            </div>
          ) : (
            <div className="enforcement-banner cleared-alert">
              <div className="banner-icon-col">
                <CheckCircle2 size={32} />
              </div>
              <div className="banner-text-col">
                <div className="banner-title">No Sockpuppet Link Detected ({analysis.matchProbability}% Match)</div>
                <div className="banner-desc">
                  Linguistic syntax, punctuation tempo, and chronological factors indicate @{newAccount.username} is an independent user.
                  No automatic ID freeze required.
                </div>
              </div>
            </div>
          )}

          {/* Detailed Evidence Cards */}
          <div className="grid grid-3 forensic-breakdown-grid">
            {/* Score & Verdict Card */}
            <div className="card forensic-metric-card">
              <span className="card-kicker">Authorship Probability</span>
              <div className={`metric-dial ${analysis.matchProbability >= 70 ? "high" : "low"}`}>
                {analysis.matchProbability}%
              </div>
              <div className="metric-sublabel">
                Nemotron Confidence: <strong>{analysis.confidence}%</strong>
              </div>
              <div className="threat-pill">
                Threat Level: <span className={`threat-tag ${analysis.threatSeverity?.toLowerCase()}`}>{analysis.threatSeverity}</span>
              </div>
            </div>

            {/* Stylometric Matches */}
            <div className="card">
              <div className="card-header-sm">
                <Fingerprint size={16} /> Stylometric & Lexical Markers
              </div>
              <ul className="forensic-list">
                {analysis.stylometricMatches?.map((m, i) => (
                  <li key={i}>
                    <span className="dot" /> {m}
                  </li>
                ))}
              </ul>
            </div>

            {/* Behavioral Correlations */}
            <div className="card">
              <div className="card-header-sm">
                <ShieldAlert size={16} /> Behavioral & Temporal Anomalies
              </div>
              <ul className="forensic-list">
                {analysis.behavioralCorrelations?.map((b, i) => (
                  <li key={i}>
                    <span className="dot dot-amber" /> {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Forensic Dossier */}
          <div className="card dossier-card">
            <div className="dossier-header">
              <div>
                <h3>📋 NVIDIA Nemotron Forensic Audit Dossier</h3>
                <span className="muted">Automated chain-of-custody for Trust & Safety enforcement</span>
              </div>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => alert(`Dossier #${Math.floor(100000 + Math.random() * 900000)} exported for Trust & Safety escalation.`)}
              >
                Export Incident Evidence PDF
              </button>
            </div>
            <div className="dossier-body">
              <p>{analysis.reasoningDossier}</p>
              <div className="dossier-meta">
                <span><strong>Target Protected:</strong> @{victim}</span>
                <span><strong>Primary Actor:</strong> @{oldAccount.username} (Suspended)</span>
                <span><strong>Evading Burner:</strong> @{newAccount.username} (Frozen)</span>
                <span><strong>Inference Engine:</strong> NVIDIA Nemotron on Nebius Token Factory</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
