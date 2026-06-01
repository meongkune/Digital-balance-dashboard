import {
  type Dispatch,
  type PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react';
import {
  type DashboardAction,
  type DashboardState,
  hasActivity,
  hasRule,
  dashboardReducer,
  initialDashboardState,
} from './dashboardReducer';

type DashboardContextValue = {
  state: DashboardState;
  dispatch: Dispatch<DashboardAction>;
};

const STORAGE_KEY = 'digital-balance-dashboard-state';
const DashboardContext = createContext<DashboardContextValue | null>(null);

export function DashboardProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(dashboardReducer, initialDashboardState, loadInitialState);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const value = useMemo(() => ({ state, dispatch }), [state]);

  return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>;
}

export function useDashboard() {
  const context = useContext(DashboardContext);

  if (!context) {
    throw new Error('useDashboard must be used inside DashboardProvider');
  }

  return context;
}

function loadInitialState(baseState: DashboardState): DashboardState {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      return baseState;
    }

    const parsed = JSON.parse(saved) as Partial<DashboardState>;
    return {
      ...baseState,
      ...parsed,
      userName: baseState.userName,
      activities: uniqueActivities(parsed.activities ?? baseState.activities),
      rules: uniqueRules(parsed.rules ?? baseState.rules),
      logs: removeSeedLogs(parsed.logs ?? baseState.logs),
      settings: parsed.settings ?? baseState.settings,
      showSampleData: parsed.showSampleData ?? baseState.showSampleData,
    };
  } catch {
    return baseState;
  }
}

function removeSeedLogs(logs: DashboardState['logs']): DashboardState['logs'] {
  return logs.filter((log) => !log.id.startsWith('seed-') && !log.id.startsWith('sample-'));
}

function uniqueActivities(activities: DashboardState['activities']): DashboardState['activities'] {
  return activities.reduce<DashboardState['activities']>((unique, activity) => {
    return hasActivity(unique, activity.name) ? unique : [...unique, activity];
  }, []);
}

function uniqueRules(rules: DashboardState['rules']): DashboardState['rules'] {
  return rules.reduce<DashboardState['rules']>((unique, rule) => {
    return hasRule(unique, rule.keyword) ? unique : [...unique, rule];
  }, []);
}
