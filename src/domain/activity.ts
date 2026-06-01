export type ProductivityType = 'productive' | 'unproductive' | 'neutral';

export type ActivityRule = {
  keyword: string;
  type: ProductivityType;
};

export type ActivityLog = {
  id: string;
  name: string;
  category: string;
  type: ProductivityType;
  durationMinutes: number;
  startedAt?: string;
  endedAt?: string;
  accent?: string;
};

export type UsageGoals = {
  productiveGoalMinutes: number;
  distractionLimitMinutes: number;
};

export type UsageSummary = {
  totalMinutes: number;
  productiveMinutes: number;
  unproductiveMinutes: number;
  neutralMinutes: number;
  productiveRate: number;
  goalRate: number;
  distractionRate: number;
};

type CreateActivityInput = {
  name: string;
  category: string;
  startedAt: string;
  endedAt: string;
  type: ProductivityType;
  accent?: string;
};

export function classifyActivity(name: string, rules: ActivityRule[]): ProductivityType {
  const normalizedName = name.trim().toLowerCase();
  const matchedRule = rules.find((rule) => normalizedName.includes(rule.keyword.toLowerCase()));

  return matchedRule?.type ?? 'neutral';
}

export function createActivityLog(input: CreateActivityInput): ActivityLog {
  const start = new Date(input.startedAt).getTime();
  const end = new Date(input.endedAt).getTime();
  const elapsedMs = end - start;
  const durationMinutes = elapsedMs > 0 ? Math.max(1, Math.round(elapsedMs / 60000)) : 0;

  return {
    id: `${input.name}-${input.startedAt}`,
    name: input.name,
    category: input.category,
    type: input.type,
    startedAt: input.startedAt,
    endedAt: input.endedAt,
    durationMinutes,
    accent: input.accent,
  };
}

export function buildUsageSummary(logs: ActivityLog[], goals: UsageGoals): UsageSummary {
  const totalMinutes = sumByType(logs);
  const productiveMinutes = sumByType(logs, 'productive');
  const unproductiveMinutes = sumByType(logs, 'unproductive');
  const neutralMinutes = sumByType(logs, 'neutral');

  return {
    totalMinutes,
    productiveMinutes,
    unproductiveMinutes,
    neutralMinutes,
    productiveRate: toPercent(productiveMinutes, totalMinutes),
    goalRate: toPercent(productiveMinutes, goals.productiveGoalMinutes),
    distractionRate: toPercent(unproductiveMinutes, goals.distractionLimitMinutes),
  };
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes}분`;
  }

  const hours = Math.floor(minutes / 60);
  const restMinutes = minutes % 60;

  return restMinutes === 0 ? `${hours}시간` : `${hours}시간 ${restMinutes}분`;
}

export function formatDateTime(value?: string): string {
  if (!value) {
    return '-';
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return '-';
  }

  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(date);
}

function sumByType(logs: ActivityLog[], type?: ProductivityType): number {
  return logs
    .filter((log) => (type ? log.type === type : true))
    .reduce((total, log) => total + log.durationMinutes, 0);
}

function toPercent(value: number, total: number): number {
  if (total <= 0) {
    return 0;
  }

  return Math.round((value / total) * 100);
}
