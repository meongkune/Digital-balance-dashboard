import { describe, expect, it } from 'vitest';
import {
  buildUsageSummary,
  classifyActivity,
  createActivityLog,
  formatDateTime,
  formatDuration,
} from './activity';

describe('activity domain', () => {
  it('classifies activity names by configured productivity rules', () => {
    expect(classifyActivity('YouTube', [{ keyword: 'youtube', type: 'unproductive' }])).toBe(
      'unproductive',
    );
    expect(classifyActivity('VS Code', [{ keyword: 'code', type: 'productive' }])).toBe(
      'productive',
    );
    expect(classifyActivity('Unknown App', [])).toBe('neutral');
  });

  it('creates a completed activity log with rounded duration minutes', () => {
    const log = createActivityLog({
      name: 'React 과제 구현',
      category: 'Development',
      startedAt: '2026-05-31T09:00:00.000Z',
      endedAt: '2026-05-31T10:34:20.000Z',
      type: 'productive',
    });

    expect(log.durationMinutes).toBe(94);
    expect(log.name).toBe('React 과제 구현');
  });

  it('keeps a very short completed activity visible as at least one minute', () => {
    const log = createActivityLog({
      name: 'YouTube',
      category: 'Streaming',
      startedAt: '2026-05-31T09:00:00.000Z',
      endedAt: '2026-05-31T09:00:12.000Z',
      type: 'unproductive',
    });

    expect(log.durationMinutes).toBe(1);
  });

  it('summarizes total, productive, unproductive, and focus score', () => {
    const summary = buildUsageSummary(
      [
        { id: '1', name: 'VS Code', category: 'Development', type: 'productive', durationMinutes: 150 },
        { id: '2', name: 'YouTube', category: 'Streaming', type: 'unproductive', durationMinutes: 60 },
        { id: '3', name: 'Search', category: 'Research', type: 'neutral', durationMinutes: 30 },
      ],
      { productiveGoalMinutes: 180, distractionLimitMinutes: 90 },
    );

    expect(summary.totalMinutes).toBe(240);
    expect(summary.productiveMinutes).toBe(150);
    expect(summary.unproductiveMinutes).toBe(60);
    expect(summary.productiveRate).toBe(63);
    expect(summary.goalRate).toBe(83);
    expect(summary.distractionRate).toBe(67);
  });

  it('formats minutes as compact Korean duration text', () => {
    expect(formatDuration(45)).toBe('45분');
    expect(formatDuration(135)).toBe('2시간 15분');
  });

  it('formats activity timestamps with date and time', () => {
    expect(formatDateTime('2026-05-31T09:05:00.000Z')).toMatch(/\d{4}\. \d{2}\. \d{2}\. \d{2}:\d{2}/);
    expect(formatDateTime()).toBe('-');
  });
});
