export default function About() {
  return (
    <>
      <h1 className="page-title">About the Project</h1>
      <p className="page-subtitle">
        Fake Account Detector helps platforms identify fraudulent accounts
        early using profile metadata, behavioral patterns, and NVIDIA Nemotron
        reasoning deployed on Nebius Token Factory.
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
          <h3>Nebius + NVIDIA Stack</h3>
          <p className="muted">
            Powered by NVIDIA open source Nemotron models hosted on Nebius
            Token Factory high-performance GPU infrastructure for explainable forensic analysis.
          </p>
        </article>
      </section>
    </>
  );
}
