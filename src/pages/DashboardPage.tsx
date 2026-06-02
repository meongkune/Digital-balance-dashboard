import { Clock3, Target, TrendingUp, Zap } from 'lucide-react';
import { type CSSProperties, useMemo } from 'react';
import { ActivityTimeline } from '../components/ActivityTimeline';
import { AppUsageTable } from '../components/AppUsageTable';
import { FocusGauge } from '../components/FocusGauge';
import { ManualLogForm } from '../components/ManualLogForm';
import { ProductivityChart } from '../components/ProductivityChart';
import { QuickTimer } from '../components/QuickTimer';
import { SampleDataToggle } from '../components/SampleDataToggle';
import { SummaryCard } from '../components/SummaryCard';
import { buildUsageSummary, formatDuration } from '../domain/activity';
import { useVisibleLogs } from '../hooks/useVisibleLogs';
import { useDashboard } from '../state/DashboardContext';

export function DashboardPage() {
  const { state } = useDashboard();
  const visibleLogs = useVisibleLogs();
  const summary = useMemo(() => buildUsageSummary(visibleLogs, state.settings), [visibleLogs, state.settings]);
  const topLog = [...visibleLogs].sort((a, b) => b.durationMinutes - a.durationMinutes)[0];

  return (
    <div className="page-stack">
      <section className="hero-panel">
        <div>
          <p className="eyebrow">Digital Activity Dashboard</p>
          <h2>오늘의 디지털 활동 현황</h2>
        </div>
        <div
          className="hero-meter"
          style={
            {
              '--hero-meter-value': `${Math.min(100, Math.max(0, summary.productiveRate)) * 3.6}deg`,
            } as CSSProperties
          }
        >
          <span>{summary.productiveRate}%</span>
          <p>생산 / 전체</p>
        </div>
      </section>

      <div className="summary-grid">
        <SummaryCard
          detail="오늘 기록된 전체 디지털 활동"
          icon={<Clock3 size={22} />}
          label="총 사용 시간"
          tone="slate"
          value={formatDuration(summary.totalMinutes)}
        />
        <SummaryCard
          detail={`생산 시간 / 목표 ${formatDuration(state.settings.productiveGoalMinutes)}`}
          icon={<Target size={22} />}
          label="생산 시간"
          tone="teal"
          value={formatDuration(summary.productiveMinutes)}
        />
        <SummaryCard
          detail={`비생산 시간 / 제한 ${formatDuration(state.settings.distractionLimitMinutes)}`}
          icon={<Zap size={22} />}
          label="비생산 시간"
          tone="rose"
          value={formatDuration(summary.unproductiveMinutes)}
        />
        <SummaryCard
          detail={topLog ? `${topLog.name} 사용량 최다` : '기록 없음'}
          icon={<TrendingUp size={22} />}
          label="최다 활동"
          tone="indigo"
          value={topLog ? formatDuration(topLog.durationMinutes) : '0분'}
        />
      </div>
      <SampleDataToggle />

      <div className="dashboard-grid">
        <div className="wide-column">
          <ProductivityChart summary={summary} />
          <ActivityTimeline logs={visibleLogs} />
          <AppUsageTable logs={visibleLogs} />
        </div>
        <div className="side-column">
          <FocusGauge
            detail={`생산 시간 ${formatDuration(summary.productiveMinutes)} / 목표 ${formatDuration(state.settings.productiveGoalMinutes)}`}
            label="Goal"
            value={summary.goalRate}
          />
          <QuickTimer />
          <ManualLogForm />
        </div>
      </div>
    </div>
  );
}
