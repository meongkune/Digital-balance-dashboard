# Digital Balance Dashboard

## 주제

개인 디지털 활동 시간 분석 웹앱입니다. 사용자가 개발, 강의, 자료 검색, YouTube, OTT, 게임 같은 활동을 타이머 또는 수동 입력으로 기록하면 생산적 시간, 비생산적 시간, 중립 시간을 대시보드와 리포트로 시각화합니다.

## 구현 요구사항 매핑

| 과제 요구사항 | 반영 위치 |
| --- | --- |
| 컴포넌트 5개 이상 | `AppLayout`, `SummaryCard`, `ProductivityChart`, `FocusGauge`, `QuickTimer`, `ActivityTimeline`, `AppUsageTable`, `ManualLogForm`, `RuleManager`, `WeeklyReport` |
| React Router 3개 이상 URL | `/`, `/timeline`, `/apps`, `/reports`, `/settings`, `/login`, `*` 오류 화면 |
| Hook 3개 이상 | `useState`, `useEffect`, `useMemo`, `useReducer`, `useContext` |
| 전역 상태 적용 | `src/state/DashboardContext.tsx`, `src/state/dashboardReducer.ts` |
| TypeScript 컴포넌트 | 전체 컴포넌트를 `.tsx`로 작성, 특히 `ActivityTimeline.tsx`는 props 타입 명시 |
| 배포 가능 웹사이트 | Vite production build 결과물이 `dist/`에 생성됨 |

## 주요 차별점

- ManicTime 스타일의 활동 분석 대시보드 컨셉
- 생산/비생산/중립 시간을 한눈에 보는 stacked bar와 gauge UI
- 사용자가 추가한 활동이 Quick Timer 버튼으로 바로 반영되는 구조
- 시작 시각, 종료 시각, 사용 시간을 함께 보여주는 타임라인
- 앱/사이트 키워드 기반 자동 분류 규칙
- `/reports` 화면과 잘못된 URL 오류 화면

## 실행 명령

```bash
npm install
npm run dev
npm test
npm run build
```
