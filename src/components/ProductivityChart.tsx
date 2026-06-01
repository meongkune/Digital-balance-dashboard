import { formatDuration, type UsageSummary } from '../domain/activity';

type ProductivityChartProps = {
  summary: UsageSummary;
};

export function ProductivityChart({ summary }: ProductivityChartProps) {
  const productive = summary.totalMinutes ? (summary.productiveMinutes / summary.totalMinutes) * 100 : 0;
  const neutral = summary.totalMinutes ? (summary.neutralMinutes / summary.totalMinutes) * 100 : 0;
  const unproductive = Math.max(0, 100 - productive - neutral);

  return (
    <section className="panel chart-panel">
      <div className="section-heading">
        <span>Productivity Mix</span>
        <strong>{summary.productiveRate}%</strong>
      </div>
      <div className="stacked-bar" aria-label="생산성 비율">
        <span className="segment productive" style={{ width: `${productive}%` }} />
        <span className="segment neutral" style={{ width: `${neutral}%` }} />
        <span className="segment unproductive" style={{ width: `${unproductive}%` }} />
      </div>
      <div className="legend-grid">
        <Metric label="생산적" value={formatDuration(summary.productiveMinutes)} color="teal" />
        <Metric label="중립" value={formatDuration(summary.neutralMinutes)} color="slate" />
        <Metric label="비생산" value={formatDuration(summary.unproductiveMinutes)} color="rose" />
      </div>
    </section>
  );
}

function Metric({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="legend-item">
      <span className={`legend-dot ${color}`} />
      <p>{label}</p>
      <strong>{value}</strong>
    </div>
  );
}
