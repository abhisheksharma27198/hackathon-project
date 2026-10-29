const stats = [
  { label: "Accounts analyzed", value: "1,284" },
  { label: "Fake accounts detected", value: "182" },
  { label: "Suspicious accounts", value: "247" },
  { label: "Average analysis time", value: "1.2s" },
];

const recent = [
  { username: "@crypto_giveaway_9921", score: 94, status: "Likely Fake" },
  { username: "@free_followers_bot", score: 88, status: "Likely Fake" },
  { username: "@rahul.dev", score: 18, status: "Safe" },
  { username: "@official_support_224", score: 76, status: "Suspicious" },
  { username: "@designstudio_in", score: 32, status: "Safe" },
];

export default function Dashboard() {
  return (
    <>
      <h1 className="page-title">Moderation Dashboard</h1>
      <p className="page-subtitle">
        Monitor detection activity, high-risk accounts, and platform-wide
        trends.
      </p>

      <section className="grid grid-4">
        {stats.map((stat) => (
          <article key={stat.label} className="stat">
            <div className="stat-value">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
          </article>
        ))}
      </section>

      <section className="card table-card">
        <h3>Recent detections</h3>

        <table>
          <thead>
            <tr>
              <th>Account</th>
              <th>Risk score</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {recent.map((account) => (
              <tr key={account.username}>
                <td>{account.username}</td>
                <td>{account.score}/100</td>
                <td>{account.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
}