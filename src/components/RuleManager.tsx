import { Plus } from 'lucide-react';
import { type FormEvent, useState } from 'react';
import type { ProductivityType } from '../domain/activity';
import { useDashboard } from '../state/DashboardContext';
import { hasRule } from '../state/dashboardReducer';

export function RuleManager() {
  const { state, dispatch } = useDashboard();
  const [keyword, setKeyword] = useState('Netflix');
  const [type, setType] = useState<ProductivityType>('unproductive');
  const trimmedKeyword = keyword.trim();
  const isDuplicate = Boolean(trimmedKeyword) && hasRule(state.rules, trimmedKeyword);
  const canSubmit = Boolean(trimmedKeyword) && !isDuplicate;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubmit) {
      return;
    }

    dispatch({ type: 'ADD_RULE', payload: { keyword: trimmedKeyword, type } });
    setKeyword('');
  }

  return (
    <section className="panel">
      <div className="section-heading">
        <span>Classification Rules</span>
        <strong>{state.rules.length}</strong>
      </div>
      <form className="rule-form" onSubmit={handleSubmit}>
        <input value={keyword} onChange={(event) => setKeyword(event.target.value)} placeholder="앱/사이트 키워드" />
        <select value={type} onChange={(event) => setType(event.target.value as ProductivityType)}>
          <option value="productive" style={{ color: '#02061e' }}>생산</option>
          <option value="neutral" style={{ color: '#02061e' }}>
            중립
          </option>
          <option value="unproductive" style={{ color: '#02061e' }}>비생산</option>
        </select>
        <button className="primary-action compact" disabled={!canSubmit} type="submit">
          <Plus size={18} />
          규칙 추가
        </button>
      </form>
      {isDuplicate ? <p className="form-message">이미 등록된 분류 규칙입니다.</p> : null}
      <div className="rule-list">
        {state.rules.map((rule) => (
          <span className={`rule-chip ${rule.type}`} key={`${rule.keyword}-${rule.type}`}>
            {rule.keyword}
          </span>
        ))}
      </div>
    </section>
  );
}
