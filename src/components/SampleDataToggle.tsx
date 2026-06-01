import { Eye, EyeOff } from 'lucide-react';
import { useDashboard } from '../state/DashboardContext';

export function SampleDataToggle() {
  const { state, dispatch } = useDashboard();

  return (
    <section className="panel sample-toggle">
      <div>
        <span>Sample Data</span>
        <strong>{state.showSampleData ? '표시 중' : '숨김'}</strong>
        <p>처음 사용하는 화면은 실제 기록만 보여줍니다. 화면 구성을 확인할 때만 샘플 기록을 켜세요.</p>
      </div>
      <button
        className="secondary-action"
        onClick={() => dispatch({ type: 'SET_SAMPLE_DATA_VISIBLE', payload: !state.showSampleData })}
        type="button"
      >
        {state.showSampleData ? <EyeOff size={18} /> : <Eye size={18} />}
        {state.showSampleData ? '샘플 숨기기' : '샘플 보기'}
      </button>
    </section>
  );
}
