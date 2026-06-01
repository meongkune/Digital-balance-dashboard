import { describe, expect, it } from 'vitest';
import { dashboardReducer, initialDashboardState } from './dashboardReducer';

describe('dashboardReducer', () => {
  it('starts and stops an activity session into a saved log', () => {
    const started = dashboardReducer(initialDashboardState, {
      type: 'START_SESSION',
      payload: {
        name: 'VS Code',
        category: 'Development',
        productivityType: 'productive',
        startedAt: '2026-05-31T01:00:00.000Z',
      },
    });

    const stopped = dashboardReducer(started, {
      type: 'STOP_SESSION',
      payload: { endedAt: '2026-05-31T02:20:00.000Z' },
    });

    expect(stopped.activeSession).toBeNull();
    expect(stopped.logs[0]).toMatchObject({
      name: 'VS Code',
      category: 'Development',
      type: 'productive',
      durationMinutes: 80,
    });
  });

  it('adds a classification rule that is reused by other pages', () => {
    const nextState = dashboardReducer(initialDashboardState, {
      type: 'ADD_RULE',
      payload: { keyword: 'Discord', type: 'neutral' },
    });

    expect(nextState.rules).toContainEqual({ keyword: 'Discord', type: 'neutral' });
  });

  it('does not add duplicated classification rules regardless of case', () => {
    const nextState = dashboardReducer(initialDashboardState, {
      type: 'ADD_RULE',
      payload: { keyword: 'youtube', type: 'unproductive' },
    });

    expect(nextState.rules).toHaveLength(initialDashboardState.rules.length);
  });

  it('adds a custom activity that can be used by the quick timer', () => {
    const nextState = dashboardReducer(initialDashboardState, {
      type: 'ADD_ACTIVITY',
      payload: {
        id: 'activity-discord',
        name: 'Discord',
        category: 'Communication',
        type: 'neutral',
        accent: '#5865f2',
      },
    });

    expect(nextState.activities).toContainEqual({
      id: 'activity-discord',
      name: 'Discord',
      category: 'Communication',
      type: 'neutral',
      accent: '#5865f2',
    });
  });

  it('does not add duplicated activities regardless of case', () => {
    const nextState = dashboardReducer(initialDashboardState, {
      type: 'ADD_ACTIVITY',
      payload: {
        id: 'activity-youtube-copy',
        name: 'youtube',
        category: 'Streaming',
        type: 'unproductive',
        accent: '#f97316',
      },
    });

    expect(nextState.activities).toHaveLength(initialDashboardState.activities.length);
  });

  it('resets saved state back to the default dashboard data', () => {
    const changed = dashboardReducer(initialDashboardState, {
      type: 'UPDATE_SETTINGS',
      payload: { productiveGoalMinutes: 300, distractionLimitMinutes: 75 },
    });

    const reset = dashboardReducer(changed, { type: 'RESET_STATE' });

    expect(reset).toEqual(initialDashboardState);
  });

  it('updates productivity goals without replacing usage logs', () => {
    const nextState = dashboardReducer(initialDashboardState, {
      type: 'UPDATE_SETTINGS',
      payload: { productiveGoalMinutes: 300, distractionLimitMinutes: 75 },
    });

    expect(nextState.settings.productiveGoalMinutes).toBe(300);
    expect(nextState.settings.distractionLimitMinutes).toBe(75);
    expect(nextState.logs.length).toBe(initialDashboardState.logs.length);
  });
});
