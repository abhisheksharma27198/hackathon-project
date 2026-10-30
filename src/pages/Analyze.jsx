import { useState } from "react";
import RiskBadge from "../components/RiskBadge.jsx";
import { analyzeAccountWithNemotron, analyzeUrlOrHandleWithNemotron } from "../services/nemotron.js";
import { addSessionDetection, addSessionReport } from "../services/sessionStore.js";
import { Cpu, ShieldCheck, AlertOctagon, CheckCircle2, Zap, Globe, Sliders, ArrowRight } from "lucide-react";

export default function Analyze() {
  const [mode, setMode] = useState("URL_SCAN"); // "URL_SCAN" or "MANUAL"
  const [profileUrl, setProfileUrl] = useState("");

  const [manualForm, setManualForm] = useState({
    username: "",
    platform: "Twitter / X",
    followers: "",
    following: "",
    posts: "",
    accountAgeDays: "",
    bio: "",
  });

  const [modelType, setModelType] = useState("nvidia/Nemotron-3-Ultra-550b-a55b");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [savedToSession, setSavedToSession] = useState(false);

  const handleManualChange = (e) => {
    const { name, value } = e.target;
    setManualForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAutoUrlScan = async (e) => {
    e.preventDefault();
    if (!profileUrl.trim()) return;

    setLoading(true);
    setResult(null);
    setSavedToSession(false);

    try {
      const res = await analyzeUrlOrHandleWithNemotron(profileUrl, modelType);
      setResult(res);

      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

      // Save to Session Detections
      addSessionDetection({
        id: `DET-${Date.now()}`,
        username: res.handle,
        platform: res.platform,
        type: res.score >= 50 ? (res.accountType || "High-Risk Threat / Bot") : "Safe Profile",
        score: res.score,
        status: res.score >= 50 ? "Frozen" : "Safe",
        action: res.score >= 50 ? "⚡ Instant Freeze: Require Government ID" : (res.recommendedAction || "Approved"),
        timestamp: `Just now (${timeStr})`,
      });

      // Save to Session Reports
      addSessionReport({
        id: `RPT-${Math.floor(1000 + Math.random() * 9000)}`,
        type: res.score >= 50 ? (res.accountType || "High-Risk Threat / Bot") : "Verified Safe Profile",
        primaryTarget: "Platform Integrity",
        perpetratorOld: "N/A",
        perpetratorNew: res.handle,
        date: now.toISOString().split("T")[0],
        score: res.score,
        confidence: `${res.confidence}%`,
        action: res.score >= 50 ? "⚡ Instant Freeze: Require Government ID" : (res.recommendedAction || "Approved"),
        status: res.score >= 50 ? "Frozen" : "Verified",
        stylometrics: res.reasons || [],
        verdict: res.forensicSummary || "Evaluated by NVIDIA Nemotron on Nebius Token Factory.",
      });

      setSavedToSession(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleManualAnalyze = async (e) => {
    e.preventDefault();
    if (!manualForm.username.trim()) return;

    setLoading(true);
    setResult(null);
    setSavedToSession(false);

    try {
      const res = await analyzeAccountWithNemotron(manualForm, modelType);
      setResult(res);

      const usernameFormatted = manualForm.username.startsWith("@") ? manualForm.username : `@${manualForm.username}`;
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

      addSessionDetection({
        id: `DET-${Date.now()}`,
        username: usernameFormatted,
        platform: manualForm.platform,
        type: res.score >= 50 ? "High-Risk Threat / Bot" : "Authentic Profile",
        score: res.score,
        status: res.score >= 50 ? "Frozen" : "Safe",
        action: res.score >= 50 ? "⚡ Instant Freeze: Require Government ID" : (res.recommendedAction || "Approved"),
        timestamp: `Just now (${timeStr})`,
      });

      addSessionReport({
        id: `RPT-${Math.floor(1000 + Math.random() * 9000)}`,
        type: res.score >= 50 ? "High-Risk Threat / Bot" : "Single Account Forensic Audit",
        primaryTarget: "Platform Integrity",
        perpetratorOld: "N/A",
        perpetratorNew: usernameFormatted,
        date: now.toISOString().split("T")[0],
        score: res.score,
        confidence: `${res.confidence}%`,
        action: res.score >= 50 ? "⚡ Instant Freeze: Require Government ID" : (res.recommendedAction || "Approved"),
        status: res.score >= 50 ? "Frozen" : "Verified",
        stylometrics: res.stylometricFlags || [],
      });

      setSavedToSession(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="analyze-page">
      <div className="page-header-box">
        <div className="tag-row">
          <span className="hero-tag">Live Session Analysis</span>
          <span className="badge-tech">
            <Cpu size={14} /> Active Model: {modelType.includes("Ultra") ? "Nemotron 3 Ultra (550B Reasoning)" : "Nemotron 3.5 Lightning"}
          </span>
        </div>
        <h1 className="page-title">Profile Signal & Botnet Analysis</h1>
        <p className="page-subtitle">
          Just paste any profile URL or handle. NVIDIA Nemotron autonomously inspects the account, detects if it is a bot or troll,
          determines if it is doing harm, and issues an immediate policy verdict.
        </p>
      </div>

      {/* Mode Switcher Tabs */}
      <div className="mode-toggle-strip" style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
        <button
          type="button"
          className={`pill-btn ${mode === "URL_SCAN" ? "active" : ""}`}
          onClick={() => { setMode("URL_SCAN"); setResult(null); }}
          style={{ padding: "10px 18px", fontSize: "14px", display: "inline-flex", alignItems: "center", gap: "8px" }}
        >
          <Globe size={16} /> 1-Click URL / Handle Auto-Scanner (Fastest)
        </button>
        <button
          type="button"
          className={`pill-btn ${mode === "MANUAL" ? "active" : ""}`}
          onClick={() => { setMode("MANUAL"); setResult(null); }}
          style={{ padding: "10px 18px", fontSize: "14px", display: "inline-flex", alignItems: "center", gap: "8px" }}
        >
          <Sliders size={16} /> Detailed Metric Fields (Optional)
        </button>
      </div>

      <div className="grid grid-2">
        {/* Form Column */}
        {mode === "URL_SCAN" ? (
          <form className="card" onSubmit={handleAutoUrlScan}>
            <div className="model-selector-row">
              <label className="label">Nemotron Inference Tier on Nebius</label>
              <div className="pill-group">
                <button
                  type="button"
                  className={`pill-btn ${modelType.includes("Ultra") ? "active" : ""}`}
                  onClick={() => setModelType("nvidia/Nemotron-3-Ultra-550b-a55b")}
                >
                  Nemotron 3 Ultra (550B Reasoning)
                </button>
                <button
                  type="button"
                  className={`pill-btn ${!modelType.includes("Ultra") ? "active" : ""}`}
                  onClick={() => setModelType("nvidia/Nemotron-3_5-Lightning")}
                >
                  Nemotron 3.5 Lightning (Fast Triage)
                </button>
              </div>
            </div>

            <div className="form-field" style={{ marginTop: "16px" }}>
              <label className="label" htmlFor="profileUrl">
                Social Profile URL or Handle *
              </label>
              <input
                id="profileUrl"
                className="input"
                placeholder="e.g. https://x.com/crypto_giveaway_bot or @suspicious_handle"
                value={profileUrl}
                onChange={(e) => setProfileUrl(e.target.value)}
                required
              />
              <span className="muted font-sm" style={{ display: "block", marginTop: "6px" }}>
                Supports X (Twitter), Instagram, Telegram, LinkedIn, or raw handle. No follower or post counts needed.
              </span>
            </div>

            <button
              id="run-analyze-btn"
              className="btn btn-action-lg"
              type="submit"
              disabled={loading || !profileUrl.trim()}
              style={{ marginTop: "18px" }}
            >
              {loading ? (
                <>Autonomously Inspecting with Nemotron...</>
              ) : (
                <>
                  <Globe size={18} /> Auto-Inspect Profile with NVIDIA Nemotron
                </>
              )}
            </button>
          </form>
        ) : (
          <form className="card" onSubmit={handleManualAnalyze}>
            <div className="model-selector-row">
              <label className="label">Nemotron Inference Tier on Nebius</label>
              <div className="pill-group">
                <button
                  type="button"
                  className={`pill-btn ${modelType.includes("Ultra") ? "active" : ""}`}
                  onClick={() => setModelType("nvidia/Nemotron-3-Ultra-550b-a55b")}
                >
                  Nemotron 3 Ultra (550B Reasoning)
                </button>
                <button
                  type="button"
                  className={`pill-btn ${!modelType.includes("Ultra") ? "active" : ""}`}
                  onClick={() => setModelType("nvidia/Nemotron-3_5-Lightning")}
                >
                  Nemotron 3.5 Lightning (Fast Triage)
                </button>
              </div>
            </div>

            <div className="form-field">
              <label className="label" htmlFor="username">
                Username Handle *
              </label>
              <input
                id="username"
                name="username"
                className="input"
                placeholder="e.g. john_doe"
                value={manualForm.username}
                onChange={handleManualChange}
                required
              />
            </div>

            <div className="form-field">
              <label className="label" htmlFor="platform">
                Platform
              </label>
              <select
                id="platform"
                name="platform"
                className="select"
                value={manualForm.platform}
                onChange={handleManualChange}
              >
                <option>Twitter / X</option>
                <option>Instagram</option>
                <option>LinkedIn</option>
                <option>Telegram</option>
                <option>Other</option>
              </select>
            </div>

            <div className="form-row">
              <div>
                <label className="label" htmlFor="followers">Followers</label>
                <input
                  id="followers"
                  name="followers"
                  type="number"
                  className="input"
                  placeholder="0"
                  value={manualForm.followers}
                  onChange={handleManualChange}
                />
              </div>
              <div>
                <label className="label" htmlFor="following">Following</label>
                <input
                  id="following"
                  name="following"
                  type="number"
                  className="input"
                  placeholder="0"
                  value={manualForm.following}
                  onChange={handleManualChange}
                />
              </div>
            </div>

            <div className="form-field">
              <label className="label" htmlFor="bio">Profile Bio</label>
              <textarea
                id="bio"
                name="bio"
                className="textarea"
                placeholder="Paste account bio..."
                value={manualForm.bio}
                onChange={handleManualChange}
              />
            </div>

            <button
              id="run-analyze-manual-btn"
              className="btn btn-action-lg"
              type="submit"
              disabled={loading || !manualForm.username.trim()}
            >
              {loading ? <>Evaluating on Nebius...</> : <><Cpu size={18} /> Analyze Account</>}
            </button>
          </form>
        )}

        {/* Results Column */}
        <section className="card result-card">
          <div className="card-header-line">
            <h3>Detection Results & Audit Trace</h3>
            {result && <RiskBadge score={result.score} />}
          </div>

          {!result && !loading && (
            <div className="empty-state">
              <ShieldCheck size={48} className="muted-icon" />
              <p className="muted">
                {mode === "URL_SCAN"
                  ? "Paste any profile URL or social handle and click Auto-Inspect to scan."
                  : "Enter account metrics to run detection."}
              </p>
            </div>
          )}

          {loading && (
            <div className="loading-state">
              <div className="spinner" />
              <p>Autonomously evaluating profile with NVIDIA Nemotron on Nebius GPU cluster...</p>
            </div>
          )}

          {result && (
            <div className="result-content-body">
              {result.isLiveInference && (
                <div className="live-inference-badge">
                  <Zap size={14} className="text-accent" />
                  <span>Live Nebius Token Factory Endpoint: <strong>{result.modelUsed}</strong></span>
                </div>
              )}

              {savedToSession && (
                <div className="session-saved-pill">
                  <CheckCircle2 size={14} /> Added to current session Dashboard & Reports
                </div>
              )}

              {/* Classification & Harm Status Card */}
              {result.accountType && (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "16px" }}>
                  <div className="metric-box">
                    <span className="metric-label">Account Classification</span>
                    <strong style={{ color: "var(--text-bright)", fontSize: "14px" }}>{result.accountType}</strong>
                  </div>
                  <div className="metric-box">
                    <span className="metric-label">Trolling / Harmful Intent</span>
                    <strong style={{ color: result.isTrollingOrAbusive ? "var(--red)" : "var(--green)", fontSize: "14px" }}>
                      {result.isTrollingOrAbusive ? `YES (${result.abuseSeverity || "Active"} Severity)` : "NO (Benign)"}
                    </strong>
                  </div>
                </div>
              )}

              <div className="result-header-metric">
                <div>
                  <div className={`result-score ${result.score >= 50 ? "text-danger" : result.score >= 30 ? "text-warn" : "text-safe"}`}>
                    {result.score}<span className="score-denom">/100</span>
                  </div>
                  <span className="muted">Overall Fraud / Bot Risk Index</span>
                </div>
                <div className="confidence-pill">
                  <span>Confidence:</span>
                  <strong>{result.confidence}%</strong>
                </div>
              </div>

              {/* Recommended Action Pill */}
              <div className={`action-verdict-box ${result.score >= 50 ? "verdict-freeze" : "verdict-ok"}`}>
                <div className="verdict-icon">
                  {result.score >= 50 ? <AlertOctagon size={20} /> : <CheckCircle2 size={20} />}
                </div>
                <div>
                  <strong>Recommended Policy Action:</strong> {result.recommendedAction}
                </div>
              </div>

              {/* Forensic Summary */}
              {result.forensicSummary && (
                <div className="factors-section">
                  <h4>Forensic Investigation Summary:</h4>
                  <p className="verdict-text" style={{ fontSize: "13.5px" }}>{result.forensicSummary}</p>
                </div>
              )}

              {/* Explanation Factors */}
              <div className="factors-section">
                <h4>Signal Breakdown:</h4>
                <ul className="factors-list">
                  {result.reasons?.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              </div>

              {/* Behavioral Anomalies */}
              {result.behavioralAnomalies?.length > 0 && (
                <div className="factors-section">
                  <h4>Behavioral Footprint:</h4>
                  <div className="tag-cloud">
                    {result.behavioralAnomalies.map((ano, i) => (
                      <span key={i} className="chip chip-blue">{ano}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
