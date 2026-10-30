import { useState } from "react";

const reports = [
  {
    id: "RPT-1042",
    account: "@crypto_giveaway_9921",
    date: "2026-10-28",
    score: 94,
    action: "Escalated",
  },
  {
    id: "RPT-1041",
    account: "@free_followers_bot",
    date: "2026-10-28",
    score: 88,
    action: "Flagged",
  },
  {
    id: "RPT-1040",
    account: "@official_support_224",
    date: "2026-10-27",
    score: 76,
    action: "Under review",
  },
];

export default function Reports() {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <h1 className="page-title">Detection Reports</h1>
      <p className="page-subtitle">
        Review completed analyses and export evidence for moderation or
        trust-and-safety teams.
      </p>

      <div className="grid grid-2">
        <section className="card">
          <h3>Generated reports</h3>

          <div className="report-list">
            {reports.map((report) => (
              <button
                key={report.id}
                type="button"
                className={
                  selected?.id === report.id ? "report-item active" : "report-item"
                }
                onClick={() => setSelected(report)}
              >
                <div>
                  <strong>{report.account}</strong>
                  <div className="muted">
                    {report.id} • {report.date}
                  </div>
                </div>
                <span>{report.score}/100</span>
              </button>
            ))}
          </div>
        </section>

        <section className="card">
          <h3>Report details</h3>

          {!selected ? (
            <p className="muted">Select a report to view its details.</p>
          ) : (
            <>
              <p>
                <strong>Account:</strong> {selected.account}
              </p>
              <p>
                <strong>Risk score:</strong> {selected.score}/100
              </p>
              <p>
                <strong>Action:</strong> {selected.action}
              </p>
              <p className="muted">
                This report includes profile signals, behavioral indicators, and
                recommended moderation action verified by NVIDIA Nemotron.
              </p>

              <button className="btn" type="button">Export report</button>
            </>
          )}
        </section>
      </div>
    </>
  );
}
