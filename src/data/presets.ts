import type { ProductivityType } from '../domain/activity';

export type ActivityPreset = {
  id: string;
  name: string;
  category: string;
  type: ProductivityType;
  accent: string;
};

export const activityPresets: ActivityPreset[] = [
  { id: 'activity-react', name: '학교 · 회사 업무 및 과제', category: 'Development', type: 'productive', accent: '#14b8a6' },
  { id: 'activity-lecture', name: '온라인 강의', category: 'Learning', type: 'productive', accent: '#4f46e5' },
  { id: 'activity-research', name: '자료 검색', category: 'Research', type: 'neutral', accent: '#64748b' },
  { id: 'activity-youtube', name: 'YouTube', category: 'Streaming', type: 'unproductive', accent: '#f97316' },
  { id: 'activity-ott', name: 'OTT 시청', category: 'Streaming', type: 'unproductive', accent: '#e11d48' },
  { id: 'activity-game', name: 'Steam 게임', category: 'Game', type: 'unproductive', accent: '#7c3aed' },
];
