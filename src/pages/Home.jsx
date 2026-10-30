import { Link } from "react-router-dom";
import { ShieldCheck, Fingerprint, Lock, Zap, ArrowRight, Activity, Cpu, Sparkles } from "lucide-react";

const features = [
  {
    icon: Fingerprint,
    title: "Sockpuppet & Troll Ban Evasion Hunter",
    highlight: "Game Changer",
    description:
      "Detect when a blocked harasser creates fresh burner accounts to target the same victim. Matches stylometric fingerprints and triggers an instant ID-verification freeze.",
    link: "/sockpuppet-hunter",
    linkText: "Try Troll Hunter",
  },
  {
    icon: ShieldCheck,
    title: "Deep Profile Signal Forensics",
    highlight: "Nemotron 70B",
    description:
      "Evaluate handle entropy, follower churn ratios, bio semantics, and activity cadence to uncover deceptive accounts before they cause damage.",
    link: "/analyze",
    linkText: "Analyze Account",
  },
  {
    icon: Activity,
    title: "Live Trust & Safety Dashboard",
    highlight: "Real-Time Telemetry",
    description:
      "Monitor platform-wide fraud signals, high-risk botnet clusters, and automated quarantine metrics in a sleek command center.",
    link: "/dashboard",
    linkText: "View Dashboard",
  },
  {
    icon: Lock,
    title: "Incident Dossiers & Compliance Audits",
    highlight: "Chain of Custody",
    description:
      "Export tamper-evident PDF/JSON forensic reports with clear Nemotron reasoning chains for moderation teams and legal compliance.",
    link: "/reports",
    linkText: "Review Reports",
  },
];

export default function Home() {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-badge-wrap">
          <span className="hero-tag">
            <Sparkles size={14} className="tag-icon" /> Nebius x NVIDIA Global AI Hackathon
          </span>
          <span className="badge-tech">
            <Cpu size={14} /> NVIDIA Nemotron Powered
          </span>
        </div>

        <h1 className="hero-title">
          Stop Fake Accounts & Serial Harassment <br />
          <span className="text-gradient">Before They Cause Damage</span>
        </h1>

        <p className="hero-description">
          <strong>Nemotron Shield</strong> harnesses NVIDIA open-source reasoning models on <strong>Nebius Token Factory</strong>
          to expose botnet rings, impersonators, and serial trolls attempting ban evasion. When an abuser creates a new burner account,
          our stylometric AI detects the match and <strong>instantly freezes the account until they verify their real government ID</strong>.
        </p>

        <div className="hero-actions">
          <Link to="/sockpuppet-hunter" className="btn btn-hero-primary">
            <Fingerprint size={18} /> Launch Sockpuppet Hunter <ArrowRight size={16} />
          </Link>
          <Link to="/analyze" className="btn btn-hero-secondary">
            <ShieldCheck size={18} /> Single Account Audit
          </Link>
          <Link to="/dashboard" className="btn btn-hero-ghost">
            View Live Dashboard
          </Link>
        </div>
      </section>

      {/* Feature Showcase Grid */}
      <section className="grid grid-2 features-grid">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <article key={feature.title} className="card feature-card-interactive">
              <div className="feature-card-top">
                <div className="feature-icon-badge">
                  <Icon size={22} />
                </div>
                {feature.highlight && (
                  <span className="feature-pill-highlight">{feature.highlight}</span>
                )}
              </div>
              <h3>{feature.title}</h3>
              <p className="muted">{feature.description}</p>
              <div className="feature-card-bottom">
                <Link to={feature.link} className="feature-link">
                  {feature.linkText} <ArrowRight size={14} />
                </Link>
              </div>
            </article>
          );
        })}
      </section>

      {/* Game Changer Callout Banner */}
      <section className="card game-changer-banner">
        <div className="banner-badge">Why This Changes The Game</div>
        <h2>The Victim-Protection Protocol: Instant Real-Time ID Freeze</h2>
        <p className="muted">
          Victims of online harassment traditionally face a nightmare: block one troll account, and two new burner accounts appear within minutes.
          Standard reporting queues take 24–72 hours to respond.
          <br /><br />
          <strong>With Nemotron Shield:</strong> The moment a new burner account shows matching stylometric signatures and targets the same victim,
          the system intervenes in under a second. The account is frozen from interacting with the target until the operator verifies their physical identity.
          Troll syndicates lose their power of anonymity.
        </p>
        <div className="banner-cta">
          <Link to="/sockpuppet-hunter" className="btn">
            Test the Ban Evasion Simulation <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </div>
  );
}
