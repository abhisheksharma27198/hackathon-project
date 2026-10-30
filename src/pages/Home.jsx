import { Link } from "react-router-dom";

const features = [
  {
    title: "Profile Signal Analysis",
    description:
      "Evaluate username patterns, account age, follower ratio, bio quality, and activity consistency.",
  },
  {
    title: "AI Risk Scoring",
    description:
      "Generate a transparent risk score from 0 to 100 using explainable account signals.",
  },
  {
    title: "Bulk Detection",
    description:
      "Analyze multiple accounts at once and identify suspicious clusters for moderation teams.",
  },
  {
    title: "Audit Reports",
    description:
      "Export analysis results with reasons, confidence, and recommended actions.",
  },
];

export default function Home() {
  return (
    <>
      <section className="hero">
        <span className="hero-tag">NVIDIA x Nebius Hackathon Project</span>
        <h1 className="page-title">
          Detect fake accounts before they cause damage
        </h1>
        <p className="page-subtitle">
          Fake Account Detector analyzes public profile signals and behavioral
          patterns using NVIDIA Nemotron on Nebius Token Factory to estimate whether an account is genuine, suspicious, or
          likely fake.
        </p>

        <div className="hero-actions">
          <Link to="/analyze" className="btn">
            Analyze an account
          </Link>
          <Link to="/dashboard" className="btn btn-secondary">
            View dashboard
          </Link>
        </div>
      </section>

      <section className="grid grid-2">
        {features.map((feature) => (
          <article key={feature.title} className="card">
            <h3>{feature.title}</h3>
            <p className="muted">{feature.description}</p>
          </article>
        ))}
      </section>
    </>
  );
}
