import { formatDateTime, formatDuration, type ActivityLog } from '../domain/activity';
import { EmptyState } from './EmptyState';

type ActivityTimelineProps = {
  logs: ActivityLog[];
};

export function ActivityTimeline({ logs }: ActivityTimelineProps) {
  const maxDuration = Math.max(...logs.map((log) => log.durationMinutes), 1);

  return (
    <section className="panel timeline-panel">
      <div className="section-heading">
        <span>Activity Timeline</span>
        <strong>{logs.length} logs</strong>
      </div>
      <div className="timeline-list">
        {logs.length === 0 ? (
          <EmptyState
            title="아직 기록된 활동이 없습니다."
            description="Quick Timer를 시작하거나 수동 기록을 추가하면 이곳에 시간이 표시됩니다."
          />
        ) : null}
        {logs.map((log) => (
          <article className={`timeline-row ${log.type}`} key={log.id}>
            <div className="time-copy">
              <strong>{log.name}</strong>
              <span>{log.category}</span>
              <small>
                {formatDateTime(log.startedAt)} - {formatDateTime(log.endedAt)}
              </small>
            </div>
            <div className="timeline-track">
              <span
                style={{
                  width: `${Math.max(12, (log.durationMinutes / maxDuration) * 100)}%`,
                  backgroundColor: log.accent ?? undefined,
                }}
              />
            </div>
            <b>{formatDuration(log.durationMinutes)}</b>
          </article>
        ))}
      </div>
    </section>
  );
}
