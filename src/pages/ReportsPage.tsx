import { PieChart } from 'lucide-react';
import { useMemo } from 'react';
import { FocusGauge } from '../components/FocusGauge';
import { ProductivityChart } from '../components/ProductivityChart';
import { SampleDataToggle } from '../components/SampleDataToggle';
import { SummaryCard } from '../components/SummaryCard';
import { buildUsageSummary, formatDuration } from '../domain/activity';
import { useVisibleLogs } from '../hooks/useVisibleLogs';
import { useDashboard } from '../state/DashboardContext';

export function ReportsPage() {
  const { state } = useDashboard();
  const visibleLogs = useVisibleLogs();
  const summary = useMemo(() => buildUsageSummary(visibleLogs, state.settings), [visibleLogs, state.settings]);

  return (
    <div className="page-stack">
      <section className="page-title">
        <p className="eyebrow">Reports</p>
        <h2>사용 시간 리포트</h2>
      </section>
      <SampleDataToggle />
      <div className="summary-grid compact-grid">
        <SummaryCard
          detail="생산 시간 ÷ 전체 시간"
          icon={<PieChart size={22} />}
          label="생산성 점수"
          tone="indigo"
          value={`${summary.productiveRate}%`}
        />
        <SummaryCard
          detail="여가 앱 사용량"
          icon={<PieChart size={22} />}
          label="주의 필요 시간"
          tone="rose"
          value={formatDuration(summary.unproductiveMinutes)}
        />
      </div>
      <div className="two-column">
        <ProductivityChart summary={summary} />
        <FocusGauge
          detail={`생산 시간 ${formatDuration(summary.productiveMinutes)} / 전체 사용 시간 ${formatDuration(summary.totalMinutes)}`}
          label="Focus"
          value={summary.productiveRate}
        />
      </div>
    </div>
  );
}
