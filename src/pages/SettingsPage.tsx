import { RotateCcw, Save } from 'lucide-react';
import { type FormEvent, useState } from 'react';
import { useDashboard } from '../state/DashboardContext';

export function SettingsPage() {
  const { state, dispatch } = useDashboard();
  const [productiveGoalMinutes, setProductiveGoalMinutes] = useState(state.settings.productiveGoalMinutes);
  const [distractionLimitMinutes, setDistractionLimitMinutes] = useState(state.settings.distractionLimitMinutes);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    dispatch({
      type: 'UPDATE_SETTINGS',
      payload: { productiveGoalMinutes, distractionLimitMinutes },
    });
  }

  return (
    <div className="page-stack">
      <section className="page-title">
        <p className="eyebrow">Settings</p>
        <h2>목표 시간 설정</h2>
      </section>
      <section className="panel settings-panel">
        <form className="settings-form" onSubmit={handleSubmit}>
          <label>
            하루 생산 시간 목표
            <input
              min={30}
              step={10}
              type="number"
              value={productiveGoalMinutes}
              onChange={(event) => setProductiveGoalMinutes(Number(event.target.value))}
            />
          </label>
          <label>
            비생산 시간 제한
            <input
              min={10}
              step={5}
              type="number"
              value={distractionLimitMinutes}
              onChange={(event) => setDistractionLimitMinutes(Number(event.target.value))}
            />
          </label>
          <button className="primary-action compact" type="submit">
            <Save size={18} />
            설정 저장
          </button>
        </form>
      </section>
      <section className="panel settings-panel">
        <div className="section-heading">
          <span>Storage</span>
          <strong>Local</strong>
        </div>
        <p className="settings-copy">
          추가한 활동, 분류 규칙, 기록은 이 브라우저에 저장됩니다.
        </p>
        <button
          className="secondary-action danger"
          onClick={() => dispatch({ type: 'RESET_STATE' })}
          type="button"
        >
          <RotateCcw size={18} />
          저장 데이터 초기화
        </button>
      </section>
    </div>
  );
}
