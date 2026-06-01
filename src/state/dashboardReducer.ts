import {
  type ActivityLog,
  type ActivityRule,
  type ProductivityType,
  createActivityLog,
} from '../domain/activity';
import { activityPresets, type ActivityPreset } from '../data/presets';

export type ActiveSession = {
  name: string;
  category: string;
  productivityType: ProductivityType;
  startedAt: string;
  accent?: string;
};

export type DashboardSettings = {
  productiveGoalMinutes: number;
  distractionLimitMinutes: number;
};

export type DashboardState = {
  activeSession: ActiveSession | null;
  activities: ActivityPreset[];
  logs: ActivityLog[];
  rules: ActivityRule[];
  settings: DashboardSettings;
  showSampleData: boolean;
  userName: string;
};

export type DashboardAction =
  | { type: 'START_SESSION'; payload: ActiveSession }
  | { type: 'STOP_SESSION'; payload: { endedAt: string } }
  | { type: 'ADD_ACTIVITY'; payload: ActivityPreset }
  | { type: 'ADD_LOG'; payload: ActivityLog }
  | { type: 'DELETE_LOG'; payload: { id: string } }
  | { type: 'ADD_RULE'; payload: ActivityRule }
  | { type: 'UPDATE_SETTINGS'; payload: DashboardSettings }
  | { type: 'SET_SAMPLE_DATA_VISIBLE'; payload: boolean }
  | { type: 'RESET_STATE' };

export const initialDashboardState: DashboardState = {
  activeSession: null,
  userName: 'Digital Balance',
  activities: activityPresets,
  settings: {
    productiveGoalMinutes: 240,
    distractionLimitMinutes: 120,
  },
  showSampleData: false,
  rules: [
    { keyword: 'VS Code', type: 'productive' },
    { keyword: 'React', type: 'productive' },
    { keyword: '강의', type: 'productive' },
    { keyword: '문서', type: 'productive' },
    { keyword: 'YouTube', type: 'unproductive' },
    { keyword: 'Netflix', type: 'unproductive' },
    { keyword: 'Steam', type: 'unproductive' },
    { keyword: '게임', type: 'unproductive' },
  ],
  logs: [],
};

export function dashboardReducer(
  state: DashboardState,
  action: DashboardAction,
): DashboardState {
  switch (action.type) {
    case 'START_SESSION':
      return {
        ...state,
        activeSession: action.payload,
      };
    case 'STOP_SESSION':
      if (!state.activeSession) {
        return state;
      }

      return {
        ...state,
        activeSession: null,
        logs: [
          createActivityLog({
            name: state.activeSession.name,
            category: state.activeSession.category,
            startedAt: state.activeSession.startedAt,
            endedAt: action.payload.endedAt,
            type: state.activeSession.productivityType,
            accent: state.activeSession.accent,
          }),
          ...state.logs,
        ],
      };
    case 'ADD_ACTIVITY':
      if (hasActivity(state.activities, action.payload.name)) {
        return state;
      }

      return {
        ...state,
        activities: [...state.activities, action.payload],
      };
    case 'ADD_LOG':
      return {
        ...state,
        logs: [action.payload, ...state.logs],
      };
    case 'DELETE_LOG':
      return {
        ...state,
        logs: state.logs.filter((log) => log.id !== action.payload.id),
      };
    case 'ADD_RULE':
      if (hasRule(state.rules, action.payload.keyword)) {
        return state;
      }

      return {
        ...state,
        rules: [...state.rules, action.payload],
      };
    case 'UPDATE_SETTINGS':
      return {
        ...state,
        settings: action.payload,
      };
    case 'SET_SAMPLE_DATA_VISIBLE':
      return {
        ...state,
        showSampleData: action.payload,
      };
    case 'RESET_STATE':
      return initialDashboardState;
    default:
      return state;
  }
}

export function normalizeKeyword(value: string): string {
  return value.trim().toLowerCase();
}

export function hasRule(rules: ActivityRule[], keyword: string): boolean {
  const normalizedKeyword = normalizeKeyword(keyword);
  return rules.some((rule) => normalizeKeyword(rule.keyword) === normalizedKeyword);
}

export function hasActivity(activities: ActivityPreset[], name: string): boolean {
  const normalizedName = normalizeKeyword(name);
  return activities.some((activity) => normalizeKeyword(activity.name) === normalizedName);
}
