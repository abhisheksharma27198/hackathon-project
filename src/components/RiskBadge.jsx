export default function RiskBadge({ score }) {
  let label = "Safe";
  let className = "badge badge-safe";

  if (score >= 50) {
    label = "⚡ Instant ID Freeze Required";
    className = "badge badge-fake";
  } else if (score >= 30) {
    label = "Moderate Risk";
    className = "badge badge-suspicious";
  }

  return <span className={className}>{label}</span>;
}
