import { ActivityTimeline } from '../components/ActivityTimeline';
import { QuickTimer } from '../components/QuickTimer';
import { SampleDataToggle } from '../components/SampleDataToggle';
import { useVisibleLogs } from '../hooks/useVisibleLogs';

export function TimelinePage() {
  const visibleLogs = useVisibleLogs();

  return (
    <div className="page-stack">
      <section className="page-title">
        <p className="eyebrow">Timeline</p>
        <h2>활동 기록</h2>
      </section>
      <SampleDataToggle />
      <div className="two-column">
        <ActivityTimeline logs={visibleLogs} />
        <QuickTimer />
      </div>
    </div>
  );
}
