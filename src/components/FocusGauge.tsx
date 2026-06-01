import type { CSSProperties } from 'react';

type FocusGaugeProps = {
  detail: string;
  value: number;
  label: string;
};

export function FocusGauge({ detail, value, label }: FocusGaugeProps) {
  const safeValue = Math.min(100, Math.max(0, value));

  return (
    <section className="panel gauge-panel">
      <div className="gauge" style={{ '--gauge-value': `${safeValue * 3.6}deg` } as CSSProperties}>
        <div>
          <strong>{safeValue}%</strong>
          <span>{label}</span>
        </div>
      </div>
      <p>{detail}</p>
    </section>
  );
}
