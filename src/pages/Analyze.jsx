import { useState } from "react";
import RiskBadge from "../components/RiskBadge.jsx";
import { analyzeAccountWithNemotron } from "../services/nemotron.js";
import { Cpu, ShieldCheck, Sparkles, AlertOctagon, CheckCircle2, Zap } from "lucide-react";

const ANALYZE_PRESETS = [
  {
    name: "Crypto Phishing Bot",
    data: {
      username: "crypto_gift_drop9912",
      platform: "Twitter / X",
      followers: "14",
      following: "2840",
      posts: "1",
      accountAgeDays: "3",
      bio: "Official Airdrop Claim Portal! 100x gem verified. DM for instant claim & Telegram link in bio.",
    },
  },
  {
    name: "Astroturfing Sybil Node",
    data: {
      username: "trend_booster_441",
      platform: "Twitter / X",
      followers: "82",
      following: "1940",
      posts: "3",
      accountAgeDays: "18",
      bio: "Viral trends and social media marketing. Follow back 100% guarantee free promo.",
    },
  },
  {
    name: "Legitimate AI Researcher",
    data: {
      username: "dr_elena_ai",
      platform: "Twitter / X",
      followers: "8950",
      following: "410",
      posts: "820",
      accountAgeDays: "1450",
      bio: "Research Scientist working on Large Multimodal Models & Physical AI. PyTorch, CUDA, NeurIPS reviewer.",
    },
  },
];

export default function Analyze() {
  const [form, setForm] = useState(ANALYZE_PRESETS[0].data);
  const [modelType, setModelType] = useState("nvidia/Nemotron-3-Ultra-550b-a55b");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectPreset = (preset) => {
    setForm(preset.data);
    setResult(null);
  };

  const handleAnalyze = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const res = await analyzeAccountWithNemotron(form, modelType);
      setResult(res);
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
          <span className="hero-tag">NVIDIA Nemotron Forensics</span>
          <span className="badge-tech">
            <Cpu size={14} /> Active Model: {modelType.includes("Ultra") ? "Nemotron 3 Ultra (550B Reasoning)" : "Nemotron 3.5 Lightning"}
          </span>
        </div>
        <h1 className="page-title">Profile Signal & Botnet Analysis</h1>
        <p className="page-subtitle">
          Examine public account indicators, metadata entropy, and semantic bio markers using live NVIDIA Nemotron inference hosted on Nebius GPU clusters.
        </p>
      </div>

      {/* 1-Click Presets */}
      <div className="preset-strip">
        <span className="preset-label">
          <Sparkles size={15} /> Quick Test Profiles:
        </span>
        <div className="preset-buttons">
          {ANALYZE_PRESETS.map((p) => (
            <button
              key={p.name}
              type="button"
              className={`preset-btn ${form.username === p.data.username ? "active" : ""}`}
              onClick={() => handleSelectPreset(p)}
            >
              {p.name}
            </button>
          ))}
        </div>
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
                Nemotron 3 Ultra (550B Deep Reasoning)
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
              Username Handle
            </label>
            <input
              id="username"
              name="username"
              className="input"
              placeholder="e.g. john_doe12345"
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
              placeholder="Paste the profile bio text or recent status..."
              value={form.bio}
              onChange={handleChange}
            />
          </div>

          <button id="run-analyze-btn" className="btn btn-action-lg" type="submit" disabled={loading}>
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
                Select a preset profile or enter custom account metrics, then run detection to generate an explainable audit score.
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
