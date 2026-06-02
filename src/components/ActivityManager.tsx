import { Plus } from 'lucide-react';
import { type FormEvent, useState } from 'react';
import type { ProductivityType } from '../domain/activity';
import { useDashboard } from '../state/DashboardContext';
import { hasActivity } from '../state/dashboardReducer';

const defaultAccents: Record<ProductivityType, string> = {
  productive: '#14b8a6',
  neutral: '#64748b',
  unproductive: '#f97316',
};

export function ActivityManager() {
  const { state, dispatch } = useDashboard();
  const [name, setName] = useState('Discord');
  const [category, setCategory] = useState('Communication');
  const [type, setType] = useState<ProductivityType>('neutral');
  const [accent, setAccent] = useState(defaultAccents.neutral);
  const trimmedName = name.trim();
  const isDuplicate = Boolean(trimmedName) && hasActivity(state.activities, trimmedName);
  const canSubmit = Boolean(trimmedName) && !isDuplicate;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubmit) {
      return;
    }

    dispatch({
      type: 'ADD_ACTIVITY',
      payload: {
        id: `activity-${Date.now()}`,
        name: trimmedName,
        category: category.trim() || 'General',
        type,
        accent,
      },
    });
    dispatch({ type: 'ADD_RULE', payload: { keyword: trimmedName, type } });
    setName('');
  }

  function handleTypeChange(nextType: ProductivityType) {
    setType(nextType);
    setAccent(defaultAccents[nextType]);
  }

  return (
    <section className="panel activity-manager">
      <div className="section-heading">
        <span>Activity Library</span>
        <strong>{state.activities.length}</strong>
      </div>
      <form className="activity-form" onSubmit={handleSubmit}>
        <label>
          활동명
          <input value={name} onChange={(event) => setName(event.target.value)} />
        </label>
        <label>
          카테고리
          <input value={category} onChange={(event) => setCategory(event.target.value)} />
        </label>
        <label>
          분류
          <select value={type} onChange={(event) => handleTypeChange(event.target.value as ProductivityType)}>
            <option value="productive" style={{ color: '#02061e' }}>
              생산
            </option>
            <option value="neutral" style={{ color: '#02061e' }}>
              중립
            </option>
            <option value="unproductive" style={{ color: '#02061e' }}>
              비생산
            </option>
          </select>
        </label>
        <label>
          색상
          <input className="color-input" type="color" value={accent} onChange={(event) => setAccent(event.target.value)} />
        </label>
        <button className="primary-action compact" disabled={!canSubmit} type="submit">
          <Plus size={18} />
          추가
        </button>
      </form>
      {isDuplicate ? <p className="form-message">이미 등록된 활동명입니다.</p> : null}
      <div className="activity-library">
        {state.activities.map((activity) => (
          <article className="activity-card" key={activity.id}>
            <span className="activity-accent" style={{ backgroundColor: activity.accent }} />
            <div>
              <strong>{activity.name}</strong>
              <p>{activity.category}</p>
            </div>
            <em className={activity.type}>{labelFor(activity.type)}</em>
          </article>
        ))}
      </div>
    </section>
  );
}

function labelFor(type: ProductivityType) {
  if (type === 'productive') {
    return '생산';
  }
  if (type === 'unproductive') {
    return '비생산';
  }
  return '중립';
}
