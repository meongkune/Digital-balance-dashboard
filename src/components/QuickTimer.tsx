import { PauseCircle, PlayCircle } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { formatDuration } from '../domain/activity';
import { useDashboard } from '../state/DashboardContext';

export function QuickTimer() {
  const { state, dispatch } = useDashboard();
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (!state.activeSession) {
      return;
    }

    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, [state.activeSession]);

  const elapsed = useMemo(() => {
    if (!state.activeSession) {
      return '대기 중';
    }

    const minutes = Math.max(0, Math.floor((now - new Date(state.activeSession.startedAt).getTime()) / 60000));
    return formatDuration(minutes);
  }, [now, state.activeSession]);

  return (
    <section className="panel quick-timer">
      <div className="section-heading">
        <span>Quick Timer</span>
        <strong>{elapsed}</strong>
      </div>
      <div className="preset-grid">
        {state.activities.map((preset) => (
          <button
            key={preset.id}
            className="preset-button"
            disabled={Boolean(state.activeSession)}
            onClick={() =>
              dispatch({
                type: 'START_SESSION',
                payload: {
                  name: preset.name,
                  category: preset.category,
                  productivityType: preset.type,
                  startedAt: new Date().toISOString(),
                  accent: preset.accent,
                },
              })
            }
            type="button"
          >
            <span style={{ backgroundColor: preset.accent }} />
            {preset.name}
          </button>
        ))}
      </div>
      <button
        className="primary-action"
        disabled={!state.activeSession}
        onClick={() => dispatch({ type: 'STOP_SESSION', payload: { endedAt: new Date().toISOString() } })}
        type="button"
      >
        {state.activeSession ? <PauseCircle size={20} /> : <PlayCircle size={20} />}
        {state.activeSession ? '현재 활동 종료 및 기록' : '활동을 선택해 시작'}
      </button>
    </section>
  );
}
