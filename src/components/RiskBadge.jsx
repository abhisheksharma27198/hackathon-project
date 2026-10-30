export default function RiskBadge({ score }) {
  let label = "Safe";
  let className = "badge badge-safe";

  if (score >= 75) {
    label = "High Risk / Likely Fake";
    className = "badge badge-fake";
  } else if (score >= 45) {
    label = "Suspicious";
    className = "badge badge-suspicious";
  }

  return <span className={className}>{label}</span>;
}
