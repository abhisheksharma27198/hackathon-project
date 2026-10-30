import { ShieldAlert, Cpu, Fingerprint, Lock, Sparkles, CheckCircle2 } from "lucide-react";

export default function About() {
  return (
    <div className="about-page">
      <div className="page-header-box">
        <div className="tag-row">
          <span className="hero-tag">Architecture & Mission</span>
          <span className="badge-tech">NVIDIA x Nebius AI Hackathon</span>
        </div>
        <h1 className="page-title">Defending Digital Spaces with Open AI</h1>
        <p className="page-subtitle">
          Nemotron Shield unites NVIDIA's state-of-the-art open reasoning models with Nebius Token Factory GPU infrastructure
          to dismantle botnets, stop impersonation, and halt serial harassment rings before damage is done.
        </p>
      </div>

      {/* 3 Core Pillars */}
      <section className="grid grid-3">
        <article className="card feature-highlight-card">
          <div className="feature-icon-bubble">
            <ShieldAlert size={24} className="text-danger" />
          </div>
          <h3>The Crisis: Modern Harassment & Botnets</h3>
          <p className="muted">
            Old-school bots relied on repetitive phrases. Today, generative AI allows bad actors to mass-produce believable personas,
            while persistent trolls exploit platform moderation delays by quickly spawning disposable burner accounts to harass their targets.
          </p>
        </article>

        <article className="card feature-highlight-card">
          <div className="feature-icon-bubble">
            <Fingerprint size={24} className="text-purple" />
          </div>
          <h3>The Solution: Stylometric Authorship Fingerprinting</h3>
          <p className="muted">
            Nemotron Shield analyzes sub-conscious linguistic patterns—slang tokens, punctuation velocity, phraseology, and temporal rebounds—to prove
            when a fresh burner account is operated by the exact same physical individual who was previously suspended.
          </p>
        </article>

        <article className="card feature-highlight-card">
          <div className="feature-icon-bubble">
            <Lock size={24} className="text-accent" />
          </div>
          <h3>The Game Changer: Instant Automated ID-Freeze</h3>
          <p className="muted">
            Instead of making victims endure days of repeated abuse while human review queues lag, Nemotron Shield automatically triggers a real-time quarantine.
            The offending account is locked from messaging the victim until the operator validates their identity with an official government ID.
          </p>
        </article>
      </section>

      {/* Tech Stack Diagram Card */}
      <section className="card tech-architecture-card">
        <h3>⚡ Open Infrastructure: NVIDIA Nemotron + Nebius Token Factory</h3>
        <p className="muted">
          Our system is built specifically to demonstrate the power of high-throughput open models hosted on European and global high-performance GPU infrastructure:
        </p>

        <div className="arch-flow-grid">
          <div className="arch-step">
            <div className="arch-num">01</div>
            <h4>Profile Telemetry Ingestion</h4>
            <p className="muted">Extracts metadata entropy, follower ratios, bio semantics, and recent post history via client/webhook signals.</p>
          </div>

          <div className="arch-step">
            <div className="arch-num">02</div>
            <h4>Nebius Token Factory</h4>
            <p className="muted">Scalable, low-latency OpenAI-compatible endpoints served on H100/H200 clusters with sub-second response times.</p>
          </div>

          <div className="arch-step">
            <div className="arch-num">03</div>
            <h4>NVIDIA Nemotron Reasoning</h4>
            <p className="muted">Deep contextual reasoning via <code>llama-3.1-nemotron-70b-instruct</code> detects nuances, sarcasm, and disguised troll evasions.</p>
          </div>

          <div className="arch-step">
            <div className="arch-num">04</div>
            <h4>Real-Time Quarantine Action</h4>
            <p className="muted">Autonomous policy trigger restricts accounts, initiates mandatory KYC/ID verification, and generates compliance dossiers.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
