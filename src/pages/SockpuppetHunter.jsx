import { useState } from "react";
import { matchSockpuppetWithNemotron } from "../services/nemotron.js";
import { ShieldAlert, UserX, Cpu, Fingerprint, Lock, CheckCircle2, AlertTriangle, ArrowRight, Sparkles, Zap } from "lucide-react";

const PRESETS = [
  {
    name: "Serial Troll Ban-Evasion",
    victim: "sarah_researcher",
    oldAccount: {
      username: "troll_alpha_91",
      bio: "Speaking truth to scammers. Unfiltered.",
      recentPosts: "You are an absolute clown!! Stop lying to everyone you total fraud!!",
    },
    newAccount: {
      username: "new_alpha_revenge",
      bio: "They can't silence truth. Alt backup.",
      recentPosts: "u thought getting me banned was gonna work?? Round 2 clown!! I told you I'd be back, you're still a fraud!!",
      accountAgeDays: "0.2",
    },
  },
  {
    name: "Customer Support Impersonator",
    victim: "BinanceExchange",
    oldAccount: {
      username: "BinanceDesk_Live01",
      bio: "Official Helpdesk. DM with wallet issue for instant resolution.",
      recentPosts: "Kindly send your ticket number and transaction hash directly to our DM for immediate refund verification.",
    },
    newAccount: {
      username: "BinanceDesk_Live09",
      bio: "Official 24/7 Resolution Portal. Authorized representative.",
      recentPosts: "Kindly DM your ticket number and seed phrase confirmation to our resolution specialist immediately.",
      accountAgeDays: "1",
    },
  },
  {
    name: "Authentic Unrelated Critic",
    victim: "game_studio_x",
    oldAccount: {
      username: "angry_gamer_44",
      bio: "Refund this broken game now.",
      recentPosts: "Trash optimization, crashes every 5 minutes. Devs stole our money.",
    },
    newAccount: {
      username: "casual_player_mike",
      bio: "RPG fan, coffee drinker.",
      recentPosts: "Does anyone know if patch 1.4 fixed the memory leak on RTX 4070? Still seeing stuttering in town.",
      accountAgeDays: "420",
    },
  },
];

export default function SockpuppetHunter() {
  const [victim, setVictim] = useState(PRESETS[0].victim);
  const [oldAccount, setOldAccount] = useState(PRESETS[0].oldAccount);
  const [newAccount, setNewAccount] = useState(PRESETS[0].newAccount);

  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [frozenStatus, setFrozenStatus] = useState(null);

  const handleLoadPreset = (preset) => {
    setVictim(preset.victim);
    setOldAccount(preset.oldAccount);
    setNewAccount(preset.newAccount);
    setAnalysis(null);
    setFrozenStatus(null);
  };

  const handleRunAnalysis = async (e) => {
    e?.preventDefault();
    setLoading(true);
    setAnalysis(null);
    setFrozenStatus(null);

    try {
      const res = await matchSockpuppetWithNemotron(oldAccount, newAccount, victim);
      setAnalysis(res);
      if (res.isSameActor) {
        setFrozenStatus("QUARANTINED_ID_REQUIRED");
      } else {
        setFrozenStatus("CLEARED");
      }
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
          NVIDIA Nemotron compares stylometric fingerprints, rhetorical syntax, and temporal retaliation patterns—triggering
          an <strong>instant automated freeze</strong> until the perpetrator provides official government ID.
        </p>
      </div>

      {/* Preset Selector */}
      <div className="preset-strip">
        <span className="preset-label">
          <Sparkles size={15} /> Load Investigation Scenario:
        </span>
        <div className="preset-buttons">
          {PRESETS.map((p) => (
            <button
              key={p.name}
              type="button"
              className={`preset-btn ${victim === p.victim ? "active" : ""}`}
              onClick={() => handleLoadPreset(p)}
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Dual-Profile Comparison Grid */}
      <form onSubmit={handleRunAnalysis}>
        {/* Victim input */}
        <div className="card victim-card">
          <label className="label">Target / Harassed Party Handle</label>
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
              <label className="label">Suspended Username</label>
              <input
                className="input"
                value={oldAccount.username}
                onChange={(e) => setOldAccount({ ...oldAccount, username: e.target.value })}
                placeholder="e.g. troll_alpha_91"
                required
              />
            </div>

            <div className="form-field">
              <label className="label">Previous Bio / Keywords</label>
              <input
                className="input"
                value={oldAccount.bio}
                onChange={(e) => setOldAccount({ ...oldAccount, bio: e.target.value })}
                placeholder="Bio text..."
              />
            </div>

            <div className="form-field">
              <label className="label">Harassing Text / Post History</label>
              <textarea
                className="textarea"
                rows={4}
                value={oldAccount.recentPosts}
                onChange={(e) => setOldAccount({ ...oldAccount, recentPosts: e.target.value })}
                placeholder="Example abusive or trolling posts made by this account..."
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
              <label className="label">New Suspicious Handle</label>
              <input
                className="input"
                value={newAccount.username}
                onChange={(e) => setNewAccount({ ...newAccount, username: e.target.value })}
                placeholder="e.g. new_alpha_revenge"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-field" style={{ flex: 1 }}>
                <label className="label">Account Age (Days/Hours)</label>
                <input
                  className="input"
                  value={newAccount.accountAgeDays || "1"}
                  onChange={(e) => setNewAccount({ ...newAccount, accountAgeDays: e.target.value })}
                  placeholder="e.g. 0.2 (created 4 hrs ago)"
                />
              </div>
              <div className="form-field" style={{ flex: 2 }}>
                <label className="label">New Bio</label>
                <input
                  className="input"
                  value={newAccount.bio}
                  onChange={(e) => setNewAccount({ ...newAccount, bio: e.target.value })}
                  placeholder="Bio..."
                />
              </div>
            </div>

            <div className="form-field">
              <label className="label">New Harassing Text (bragging/insulting)</label>
              <textarea
                className="textarea"
                rows={4}
                value={newAccount.recentPosts}
                onChange={(e) => setNewAccount({ ...newAccount, recentPosts: e.target.value })}
                placeholder="New posts directed at the victim..."
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
            disabled={loading}
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
                <span><strong>Inference Engine:</strong> NVIDIA Nemotron-70B on Nebius Token Factory</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
