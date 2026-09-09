# yeon-portfolio

전승연의 개인 포트폴리오 사이트입니다.

🔗 https://jsy-portfolio.vercel.app

## Features

- **About** : 자기소개, 기술 스택, 자격증
- **Projects** : Supabase에 저장된 프로젝트 목록을 카드로 보여주고, 클릭 시 README(Markdown)를 모달로 렌더링
- **Career** : 경력·교육 이력 정리
- **AI 프로젝트 챗봇**: 프로젝트 상세 모달 안에서, 선택한 프로젝트의 GitHub README·최근 커밋을 실시간으로 가져와 Gemini에게 컨텍스트로 넘겨 질문에 답변 — 채용 담당자가 프로젝트에 대해 자유롭게 물어볼 수 있음
- 페이지 이동 시 방향에 따른 전환 애니메이션 
- 모바일 대응 반응형 레이아웃

## Tech Stack

**Frontend**

- React, TypeScript, Vite
- react-router-dom, framer-motion
- @tanstack/react-query (서버 상태 관리)

**Backend / Infra**

- Supabase (프로젝트 데이터 저장)
- Vercel Serverless Function + Google Gemini API (`api/chat.ts`) — 챗봇 응답 생성

## Architecture

[Feature-Sliced Design](https://feature-sliced.design/) 기반으로 구성했습니다.

```
src/
├─ app/        # 라우팅, 페이지 전환 애니메이션
├─ pages/      # about / career / projects
├─ widgets/    # header
├─ features/   # project-chat, project-detail(README 모달)
├─ entities/   # project, skill
└─ shared/     # supabase 클라이언트, 범용 UI
```

## Getting Started

```bash
npm install
cp .env_exam .env   # VITE_SUPABASE_URL, VITE_SUPABASE_ANNON_KEY, GEMINI_API_KEY 채우기
npm run dev
```

챗봇까지 로컬에서 테스트하려면 `/api/chat`(Vercel 서버리스 함수)이 필요합니다:

```bash
npx vercel dev   # 3000번 포트, /api 함수 담당
npm run dev      # 5173번 포트, vite.config.ts 프록시로 /api를 3000번에 위임
```

## Deployment

Vercel에 배포되어 있습니다 (`vercel.json`의 rewrite로 SPA 라우팅 처리).
