# Digital Balance Dashboard

개인 디지털 활동 시간을 기록하고, 생산 활동과 비생산 활동의 비율을 시각적으로 확인할 수 있는 React 기반 디지털 사용 시간 관리 대시보드입니다.

배포 주소: https://meongkune.github.io/Digital-balance-dashboard/

## 프로젝트 개요

Digital Balance Dashboard는 사용자가 하루 동안 사용한 앱, 웹사이트, 학습 도구, 여가 활동 등을 기록하고 생산성 관점에서 분류할 수 있는 웹 애플리케이션입니다.

사용자는 빠른 타이머 또는 수동 입력을 통해 활동 기록을 남길 수 있으며, 대시보드와 리포트 화면에서 총 사용 시간, 생산 시간, 비생산 시간, 생산성 비율을 확인할 수 있습니다.

## 주요 기능

### 대시보드

- 오늘의 전체 디지털 활동 시간 요약
- 생산 시간, 비생산 시간, 최다 사용 활동 표시
- 생산성 비율 게이지 제공
- 활동 타임라인, 사용량 표, 주간 리포트 확인

### 활동 기록

- 활동 시작/종료 타이머
- 수동 활동 기록 추가
- 시작 시각, 종료 시각, 사용 시간 기록
- 기록 삭제 기능

### 활동 및 분류 관리

- 활동 목록 추가
- 생산/비생산 분류 규칙 관리
- 앱 또는 활동명 기반 생산성 분류

### 리포트

- 생산성 점수 확인
- 비생산 활동 시간 확인
- 생산/전체 사용 시간 비율 시각화
- 주간 사용 시간 리포트 제공

### 설정

- 하루 생산 시간 목표 설정
- 비생산 시간 제한 설정
- 브라우저에 저장된 데이터 초기화

## 주요 화면

### 1. 대시보드 화면

![Dashboard](./docs/images/dashboard.png)

오늘의 총 사용 시간, 생산 시간, 비생산 시간, 최다 활동을 카드 형태로 확인할 수 있습니다.  
생산성 비율 게이지와 주간 리포트를 통해 디지털 사용 패턴을 한눈에 파악할 수 있습니다.

### 2. 활동 기록 화면

![Timeline](./docs/images/timeline.png)

타이머로 기록한 활동과 수동으로 추가한 활동 기록을 시간순으로 확인할 수 있습니다.

### 3. 활동 관리 화면

![Apps](./docs/images/apps.png)

사용자가 직접 활동 항목을 추가하고, 활동명 또는 키워드에 따라 생산성 분류 규칙을 관리할 수 있습니다.

### 4. 리포트 화면

![Reports](./docs/images/reports.png)

전체 사용 시간 대비 생산 시간 비율, 비생산 활동 시간, 주간 리포트를 확인할 수 있습니다.

### 5. 설정 화면

![Settings](./docs/images/settings.png)

하루 생산 시간 목표와 비생산 시간 제한을 설정하고, 저장된 데이터를 초기화할 수 있습니다.

## 기술 스택

| 구분 | 기술 |
|---|---|
| Frontend | React 19 |
| Language | TypeScript |
| Build Tool | Vite |
| Routing | React Router |
| State Management | React Context + Reducer |
| Storage | LocalStorage |
| Icon | Lucide React |
| Test | Vitest |
| Deployment | GitHub Pages + GitHub Actions |

## 프로젝트 구조

```text
src/
├─ components/        # 대시보드, 타이머, 차트, 폼 등 공통 UI 컴포넌트
├─ data/              # 기본 활동 프리셋 데이터
├─ domain/            # 활동 기록 계산 및 포맷팅 로직
├─ hooks/             # 화면 표시용 기록 필터링 훅
├─ pages/             # Dashboard, Timeline, Apps, Reports, Settings 페이지
├─ state/             # Context, Reducer 기반 전역 상태 관리
└─ App.tsx            # 라우팅 구성