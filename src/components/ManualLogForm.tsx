import { Plus } from 'lucide-react';
import { type FormEvent, useEffect, useMemo, useState } from 'react';
import { classifyActivity } from '../domain/activity';
import { useDashboard } from '../state/DashboardContext';

function toDateTimeLocalValue(date: Date) {
  const offset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 16);
}

export function ManualLogForm() {
  const { state, dispatch } = useDashboard();
  const [name, setName] = useState('Figma');
  const categoryOptions = useMemo(
    () => Array.from(new Set(state.activities.map((activity) => activity.category).filter(Boolean))),
    [state.activities],
  );
  const [category, setCategory] = useState(categoryOptions[0] ?? '');
  const [startedAt, setStartedAt] = useState(() => toDateTimeLocalValue(new Date(Date.now() - 60 * 60000)));
  const [endedAt, setEndedAt] = useState(() => toDateTimeLocalValue(new Date()));
  const [accent, setAccent] = useState('#3b82f6');

  useEffect(() => {
    if (!category && categoryOptions.length > 0) {
      setCategory(categoryOptions[0]);
    }
  }, [category, categoryOptions]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const type = classifyActivity(name, state.rules);
    const start = new Date(startedAt);
    const end = new Date(endedAt);
    const durationMinutes = Math.max(1, Math.round((end.getTime() - start.getTime()) / 60000));

    if (!name.trim() || !category || Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || end <= start) {
      return;
    }

    dispatch({
      type: 'ADD_LOG',
      payload: {
        id: `${name}-${Date.now()}`,
        name: name.trim(),
        category,
        type,
        durationMinutes,
        startedAt: start.toISOString(),
        endedAt: end.toISOString(),
        accent,
      },
    });
  }

  return (
    <section className="panel form-panel">
      <div className="section-heading">
        <span>Manual Add</span>
        <strong>Rule based</strong>
      </div>
      <form className="manual-form" onSubmit={handleSubmit}>
        <label>
          활동명
          <input value={name} onChange={(event) => setName(event.target.value)} />
        </label>
        <label>
          카테고리
          <select value={category} onChange={(event) => setCategory(event.target.value)}>
            {categoryOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <label>
          시작 시간
          <input
            type="datetime-local"
            value={startedAt}
            onChange={(event) => setStartedAt(event.target.value)}
          />
        </label>
        <label>
          종료 시간
          <input
            type="datetime-local"
            value={endedAt}
            onChange={(event) => setEndedAt(event.target.value)}
          />
        </label>
        <label>
          색상
          <input
            className="color-input"
            type="color"
            value={accent}
            onChange={(event) => setAccent(event.target.value)}
          />
        </label>
        <button className="primary-action compact" type="submit">
          <Plus size={18} />
          기록 추가
        </button>
      </form>
    </section>
  );
}
