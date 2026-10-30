import { useState } from "react";
import RiskBadge from "../components/RiskBadge.jsx";
import { analyzeAccountWithNemotron } from "../services/nemotron.js";
import { addSessionDetection, addSessionReport } from "../services/sessionStore.js";
import { Cpu, ShieldCheck, AlertOctagon, CheckCircle2, Zap } from "lucide-react";

export default function Analyze() {
  const [form, setForm] = useState({
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAnalyze = async (e) => {
    e.preventDefault();
    if (!form.username.trim()) return;

    setLoading(true);
    setResult(null);
    setSavedToSession(false);

    try {
      const res = await analyzeAccountWithNemotron(form, modelType);
      setResult(res);

      const usernameFormatted = form.username.startsWith("@") ? form.username : `@${form.username}`;
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

      // Save to Session Detections
      addSessionDetection({
        id: `DET-${Date.now()}`,
        username: usernameFormatted,
        platform: form.platform,
        type: res.score >= 75 ? "Likely Fake / Bot" : res.score >= 45 ? "Suspicious Profile" : "Authentic Profile",
        score: res.score,
        status: res.score >= 75 ? "Quarantined" : res.score >= 45 ? "Flagged" : "Safe",
        action: res.recommendedAction || "Analyzed",
        timestamp: `Just now (${timeStr})`,
      });

      // Save to Session Reports
      addSessionReport({
        id: `RPT-${Math.floor(1000 + Math.random() * 9000)}`,
        type: "Single Account Forensic Audit",
        primaryTarget: "Platform Integrity",
        perpetratorOld: "N/A",
        perpetratorNew: usernameFormatted,
        date: now.toISOString().split("T")[0],
        score: res.score,
        confidence: `${res.confidence}%`,
        action: res.recommendedAction || "Audited",
        status: res.score >= 75 ? "Quarantined" : res.score >= 45 ? "Flagged" : "Verified",
        stylometrics: res.stylometricFlags || [],
        verdict: res.reasons?.join("; ") || "Profile signals evaluated by NVIDIA Nemotron on Nebius.",
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
          Enter any public social media account signals below to evaluate with NVIDIA Nemotron on Nebius Token Factory.
          All results are stored in your active session.
        </p>
      </div>

      <div className="grid grid-2">
        <form className="card" onSubmit={handleAnalyze}>
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
              placeholder="e.g. twitter_handle or instagram_user"
              value={form.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-field">
            <label className="label" htmlFor="platform">
              Platform Target
            </label>
            <select
              id="platform"
              name="platform"
              className="select"
              value={form.platform}
              onChange={handleChange}
            >
              <option>Twitter / X</option>
              <option>Instagram</option>
              <option>LinkedIn</option>
              <option>Telegram</option>
              <option>Facebook</option>
              <option>Other</option>
            </select>
          </div>

          <div className="form-row">
            <div>
              <label className="label" htmlFor="followers">
                Followers Count
              </label>
              <input
                id="followers"
                name="followers"
                type="number"
                className="input"
                placeholder="0"
                value={form.followers}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="label" htmlFor="following">
                Following Count
              </label>
              <input
                id="following"
                name="following"
                type="number"
                className="input"
                placeholder="0"
                value={form.following}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div>
              <label className="label" htmlFor="posts">
                Total Posts / Content
              </label>
              <input
                id="posts"
                name="posts"
                type="number"
                className="input"
                placeholder="0"
                value={form.posts}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="label" htmlFor="accountAgeDays">
                Account Age (Days)
              </label>
              <input
                id="accountAgeDays"
                name="accountAgeDays"
                type="number"
                className="input"
                placeholder="e.g. 15"
                value={form.accountAgeDays}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-field">
            <label className="label" htmlFor="bio">
              Account Biography & Profile Text
            </label>
            <textarea
              id="bio"
              name="bio"
              className="textarea"
              placeholder="Paste the profile bio text or recent post here..."
              value={form.bio}
              onChange={handleChange}
            />
          </div>

          <button id="run-analyze-btn" className="btn btn-action-lg" type="submit" disabled={loading || !form.username.trim()}>
            {loading ? (
              <>Running Live Nemotron Inference on Nebius...</>
            ) : (
              <>
                <Cpu size={18} /> Analyze with NVIDIA Nemotron
              </>
            )}
          </button>
        </form>

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
                Enter an account handle and profile signals to run real-time inference on Nebius Token Factory.
              </p>
            </div>
          )}

          {loading && (
            <div className="loading-state">
              <div className="spinner" />
              <p>Evaluating account entropy & stylometrics on Nebius GPU cluster ({modelType.includes("Ultra") ? "Nemotron-3-Ultra" : "Nemotron-Lightning"})...</p>
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

              <div className="result-header-metric">
                <div>
                  <div className={`result-score ${result.score >= 70 ? "text-danger" : result.score >= 40 ? "text-warn" : "text-safe"}`}>
                    {result.score}<span className="score-denom">/100</span>
                  </div>
                  <span className="muted">Overall Fraud/Bot Risk Index</span>
                </div>
                <div className="confidence-pill">
                  <span>Confidence:</span>
                  <strong>{result.confidence}%</strong>
                </div>
              </div>

              {/* Recommended Action Pill */}
              <div className={`action-verdict-box ${result.score >= 70 ? "verdict-freeze" : "verdict-ok"}`}>
                <div className="verdict-icon">
                  {result.score >= 70 ? <AlertOctagon size={20} /> : <CheckCircle2 size={20} />}
                </div>
                <div>
                  <strong>Recommended Policy Action:</strong> {result.recommendedAction}
                </div>
              </div>

              {/* Explanation Factors */}
              <div className="factors-section">
                <h4>Signal Breakdown:</h4>
                <ul className="factors-list">
                  {result.reasons?.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              </div>

              {/* Stylometric Flags */}
              {result.stylometricFlags?.length > 0 && (
                <div className="factors-section">
                  <h4>Linguistic & Stylometric Observations:</h4>
                  <div className="tag-cloud">
                    {result.stylometricFlags.map((flag, i) => (
                      <span key={i} className="chip chip-purple">{flag}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Behavioral Anomalies */}
              {result.behavioralAnomalies?.length > 0 && (
                <div className="factors-section">
                  <h4>Behavioral Graph Signals:</h4>
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
