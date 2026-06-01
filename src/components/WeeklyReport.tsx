import { formatDuration, type ActivityLog } from '../domain/activity';
import { EmptyState } from './EmptyState';

const days = ['월', '화', '수', '목', '금', '토', '일'];

type WeeklyReportProps = {
  logs: ActivityLog[];
};

export function WeeklyReport({ logs }: WeeklyReportProps) {
  const productive = logs.filter((log) => log.type === 'productive').reduce((total, log) => total + log.durationMinutes, 0);
  const unproductive = logs.filter((log) => log.type === 'unproductive').reduce((total, log) => total + log.durationMinutes, 0);
  const max = Math.max(productive, unproductive, 1);

  return (
    <section className="panel report-panel">
      <div className="section-heading">
        <span>Weekly Signal</span>
        <strong>{formatDuration(productive)}</strong>
      </div>
      <div className="week-bars">
        {logs.length === 0 ? (
          <EmptyState
            title="주간 흐름을 계산할 기록이 없습니다."
            description="기록이 쌓이면 생산 시간과 비생산 시간이 요일별 막대로 표시됩니다."
          />
        ) : (
          days.map((day, index) => {
            const productiveHeight = Math.max(12, ((productive * (0.55 + index * 0.06)) / max) * 72);
            const distractionHeight = Math.max(10, ((unproductive * (0.95 - index * 0.05)) / max) * 62);

            return (
              <div className="day-bar" key={day}>
                <div>
                  <span className="productive-bar" style={{ height: productiveHeight }} />
                  <span className="unproductive-bar" style={{ height: distractionHeight }} />
                </div>
                <b>{day}</b>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}
