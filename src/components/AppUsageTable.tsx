import { Trash2 } from 'lucide-react';
import { formatDateTime, formatDuration, type ActivityLog } from '../domain/activity';
import { useDashboard } from '../state/DashboardContext';
import { EmptyState } from './EmptyState';

type AppUsageTableProps = {
  logs: ActivityLog[];
};

export function AppUsageTable({ logs }: AppUsageTableProps) {
  const { dispatch } = useDashboard();

  return (
    <section className="panel table-panel">
      <div className="section-heading">
        <span>Usage Logs</span>
        <strong>Today</strong>
      </div>
      <div className="usage-table">
        {logs.length === 0 ? (
          <EmptyState
            title="사용 기록이 비어 있습니다."
            description="활동을 종료하면 기록이 자동으로 추가됩니다."
          />
        ) : null}
        {logs.map((log) => (
          <div className="usage-row" key={log.id}>
            <span className="usage-accent" style={{ backgroundColor: log.accent ?? undefined }} />
            <div>
              <strong>{log.name}</strong>
              <span>{log.category}</span>
              <small>{formatDateTime(log.startedAt)}</small>
            </div>
            <em className={log.type}>{labelFor(log.type)}</em>
            <b>{formatDuration(log.durationMinutes)}</b>
            {log.id.startsWith('sample-') ? (
              <span className="read-only-cell">샘플</span>
            ) : (
              <button
                aria-label={`${log.name} 기록 삭제`}
                className="icon-button"
                onClick={() => dispatch({ type: 'DELETE_LOG', payload: { id: log.id } })}
                title="기록 삭제"
                type="button"
              >
                <Trash2 size={16} />
              </button>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function labelFor(type: ActivityLog['type']) {
  if (type === 'productive') {
    return '생산';
  }
  if (type === 'unproductive') {
    return '여가';
  }
  return '중립';
}
