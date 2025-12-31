# Frontend - Vibe Study Platform

React 기반의 모던한 프론트엔드 애플리케이션입니다.

## 기술 스택

- **React 18**: UI 라이브러리
- **Vite**: 빌드 도구 및 개발 서버
- **React Router**: 클라이언트 사이드 라우팅
- **Axios**: HTTP 클라이언트
- **CSS**: 스타일링 (CSS Modules)

## 프로젝트 구조

```
frontend/
├── src/
│   ├── components/      # 재사용 가능한 컴포넌트
│   │   ├── Header.jsx
│   │   └── Header.css
│   ├── pages/           # 페이지 컴포넌트
│   │   ├── Login.jsx
│   │   ├── PostList.jsx
│   │   ├── PostDetail.jsx
│   │   └── PostForm.jsx
│   ├── services/        # API 통신
│   │   └── api.js
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
├── Dockerfile
└── package.json
```

## 로컬 개발 (Docker 없이)

### 사전 요구사항
- Node.js 18 이상
- Backend 서버 실행 중

### 설치
```bash
cd frontend
npm install
```

### 환경 변수 설정
`.env` 파일 생성:
```env
VITE_API_URL=http://localhost:3000
```

### 실행
```bash
# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 결과 미리보기
npm run preview
```

## 페이지 구성

### 로그인 (`/login`)
- 이름만 입력하여 로그인
- 세션 기반 인증

### 게시글 목록 (`/`)
- 모든 게시글 카드 형태로 표시
- 작성자, 작성일 표시
- 자신의 글은 하이라이트

### 게시글 상세 (`/posts/:id`)
- 게시글 전체 내용 표시
- 작성자인 경우 수정/삭제 버튼 표시

### 게시글 작성 (`/new`)
- 제목과 내용 입력
- 글자 수 제한 표시

### 게시글 수정 (`/posts/:id/edit`)
- 기존 내용 불러오기
- 작성자만 접근 가능

## 컴포넌트 설명

### Header
- 로고, 사용자 이름, 글쓰기 버튼, 로그아웃 버튼
- 모든 페이지에서 표시 (로그인 페이지 제외)

### Login
- 이름 입력 폼
- 에러 메시지 표시

### PostList
- 게시글 목록을 그리드로 표시
- 빈 상태 처리

### PostDetail
- 게시글 상세 정보 표시
- 작성자 권한 확인

### PostForm
- 게시글 작성/수정 폼
- 유효성 검사

## API 서비스

`src/services/api.js`에서 모든 API 호출을 관리합니다:
- `authAPI`: 로그인, 로그아웃, 사용자 정보
- `postsAPI`: 게시글 CRUD 작업

## 스타일링

- 모던하고 깔끔한 UI
- 그라디언트 컬러 스킴
- 반응형 디자인
- 호버 효과 및 애니메이션

## 빌드 결과

```bash
npm run build
```

빌드 결과물은 `dist/` 디렉토리에 생성됩니다.

