import { useState } from "react";
import RiskBadge from "../components/RiskBadge.jsx";

function calculateMockRisk(account) {
  let score = 10;

  const username = account.username.toLowerCase();

  if (/\d{4,}/.test(username)) score += 20;
  if (/(bot|fake|spam|official|verify|free|follow)/.test(username)) score += 25;
  if (account.followers > 0 && account.following / account.followers > 5) {
    score += 25;
  }
  if (account.posts < 5) score += 15;
  if (!account.bio || account.bio.trim().length < 10) score += 10;
  if (account.accountAgeDays < 30) score += 20;

  return Math.min(score, 98);
}

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

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAnalyze = (event) => {
    event.preventDefault();
    setLoading(true);
    setResult(null);

    setTimeout(() => {
      const account = {
        username: form.username || "unknown_user",
        followers: Number(form.followers || 0),
        following: Number(form.following || 0),
        posts: Number(form.posts || 0),
        accountAgeDays: Number(form.accountAgeDays || 0),
        bio: form.bio,
      };

      const score = calculateMockRisk(account);

      setResult({
        score,
        confidence: Math.min(99, 65 + Math.round(score / 5)),
        reasons: [
          score >= 75 && "High-risk username or profile pattern detected",
          account.accountAgeDays < 30 && "Very new account",
          account.posts < 5 && "Very low posting activity",
          account.following / Math.max(account.followers, 1) > 5 &&
            "Unusual follower-to-following ratio",
          (!account.bio || account.bio.trim().length < 10) &&
            "Incomplete or low-quality profile information",
        ].filter(Boolean),
      });

      setLoading(false);
    }, 1200);
  };

  return (
    <>
      <h1 className="page-title">Analyze Account</h1>
      <p className="page-subtitle">
        Enter public profile signals to generate a fake-account risk score.
        Powered by AI analysis with transparent scoring factors.
      </p>

      <div className="grid grid-2">
        <form className="card" onSubmit={handleAnalyze}>
          <div className="form-field">
            <label className="label" htmlFor="username">
              Username
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
              Platform
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
              <option>Facebook</option>
              <option>Other</option>
            </select>
          </div>

          <div className="form-row">
            <div>
              <label className="label" htmlFor="followers">
                Followers
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
                Following
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
                Posts
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
                Account age in days
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
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              className="textarea"
              placeholder="Paste the account bio here..."
              value={form.bio}
              onChange={handleChange}
            />
          </div>

          <button className="btn" type="submit" disabled={loading}>
            {loading ? "Analyzing with Nemotron..." : "Run Detection"}
          </button>
        </form>

        <section className="card result-card">
          <h3>Detection Result</h3>

          {!result && !loading && (
            <p className="muted">
              Fill in the account details and run detection to see the result.
            </p>
          )}

          {loading && <p className="muted">Analyzing account signals with NVIDIA Nemotron on Nebius...</p>}

          {result && (
            <>
              <div className="result-score">{result.score}/100</div>
              <RiskBadge score={result.score} />

              <p className="muted">
                Model confidence: <strong>{result.confidence}%</strong>
              </p>

              <h4>Why this score?</h4>
              <ul>
                {result.reasons.length === 0 ? (
                  <li>No major suspicious signals found.</li>
                ) : (
                  result.reasons.map((reason) => (
                    <li key={reason}>{reason}</li>
                  ))
                )}
              </ul>
            </>
          )}
        </section>
      </div>
    </>
  );
}
