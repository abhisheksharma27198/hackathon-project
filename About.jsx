export default function About() {
  return (
    <>
      <h1 className="page-title">About the Project</h1>
      <p className="page-subtitle">
        Fake Account Detector helps platforms identify fraudulent accounts
        early using profile metadata, behavioral patterns, and AI-based risk
        scoring.
      </p>

      <section className="grid grid-3">
        <article className="card">
          <h3>Problem</h3>
          <p className="muted">
            Fake accounts spread scams, misinformation, spam, impersonation,
            and coordinated manipulation across social platforms.
          </p>
        </article>

        <article className="card">
          <h3>Solution</h3>
          <p className="muted">
            The system analyzes account signals and produces an explainable
            risk score, helping moderators prioritize suspicious accounts.
          </p>
        </article>

        <article className="card">
          <h3>Future AI Layer</h3>
          <p className="muted">
            The frontend is designed to connect to an NVIDIA-powered backend
            for faster inference and large-scale account analysis.
          </p>
        </article>
      </section>
    </>
  );
}