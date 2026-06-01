# Digital Balance Dashboard

개인 디지털 활동 시간을 기록하고 생산, 중립, 비생산 활동 비율을 확인하는 React 웹앱입니다.

## 주요 기능

- 활동별 빠른 타이머 시작/종료
- 활동 목록 추가 및 생산성 분류 관리
- 수동 사용 기록 추가
- 시작 시각, 종료 시각, 사용 시간 표시
- 대시보드, 타임라인, 앱 관리, 리포트, 설정 화면

## 실행

```bash
npm install
npm run dev
```

## 검증

```bash
npm test
npm run build
```

## GitHub Pages 배포

이 프로젝트에는 GitHub Pages 자동 배포 워크플로가 포함되어 있습니다.

1. GitHub 저장소에 코드를 push합니다.
2. 저장소의 Settings > Pages로 이동합니다.
3. Source를 GitHub Actions로 설정합니다.
4. Actions의 `Deploy to GitHub Pages` 실행이 끝나면 외부 접속 URL이 생성됩니다.

배포 후 생성된 외부 접속 URL을 개발 보고서의 배포 URL 항목에 기재하면 됩니다.

Vercel로 배포할 경우에는 GitHub 저장소를 연결하고 아래 설정을 사용하면 됩니다.

- Build command: `npm run build`
- Output directory: `dist`
