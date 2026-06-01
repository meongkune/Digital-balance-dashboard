import { useMemo } from 'react';
import { sampleLogs } from '../data/sampleLogs';
import { useDashboard } from '../state/DashboardContext';

export function useVisibleLogs() {
  const { state } = useDashboard();

  return useMemo(
    () => (state.showSampleData ? sampleLogs : state.logs),
    [state.logs, state.showSampleData],
  );
}
