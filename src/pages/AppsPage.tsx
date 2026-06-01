import { ActivityManager } from '../components/ActivityManager';
import { AppUsageTable } from '../components/AppUsageTable';
import { RuleManager } from '../components/RuleManager';
import { useDashboard } from '../state/DashboardContext';

export function AppsPage() {
  const { state } = useDashboard();

  return (
    <div className="page-stack">
      <section className="page-title">
        <p className="eyebrow">Apps</p>
        <h2>활동 목록과 분류 기준을 관리합니다.</h2>
      </section>
      <ActivityManager />
      <div className="two-column">
        <RuleManager />
        <AppUsageTable logs={state.logs} />
      </div>
    </div>
  );
}
