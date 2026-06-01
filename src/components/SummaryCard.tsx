import type { ReactNode } from 'react';

type SummaryCardProps = {
  label: string;
  value: string;
  detail: string;
  icon: ReactNode;
  tone?: 'teal' | 'indigo' | 'rose' | 'slate';
};

export function SummaryCard({ label, value, detail, icon, tone = 'slate' }: SummaryCardProps) {
  return (
    <section className={`summary-card ${tone}`}>
      <div className="summary-icon">{icon}</div>
      <div>
        <span>{label}</span>
        <strong>{value}</strong>
        <p>{detail}</p>
      </div>
    </section>
  );
}
