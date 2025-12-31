# Backend - Vibe Study Platform

Express 기반의 RESTful API 서버입니다.

## 기술 스택

- **Node.js**: JavaScript 런타임
- **Express**: 웹 프레임워크
- **MongoDB**: NoSQL 데이터베이스
- **Mongoose**: MongoDB ODM
- **express-session**: 세션 관리
- **express-validator**: 입력 유효성 검사

## 프로젝트 구조

```
backend/
├── src/
│   ├── models/          # MongoDB 모델
│   │   ├── User.js
│   │   └── Post.js
│   ├── routes/          # API 라우트
│   │   ├── auth.js
│   │   └── posts.js
│   ├── middleware/      # 커스텀 미들웨어
│   │   └── auth.js
│   └── server.js        # 서버 진입점
├── .env.example
├── .gitignore
├── Dockerfile
└── package.json
```

## 로컬 개발 (Docker 없이)

### 사전 요구사항
- Node.js 18 이상
- MongoDB 실행 중

### 설치
```bash
cd backend
npm install
```

### 환경 변수 설정
`.env` 파일 생성:
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/vibe-study
SESSION_SECRET=your-secret-key
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

### 실행
```bash
# 개발 모드 (nodemon)
npm run dev

# 프로덕션 모드
npm start
```

## API 라우트

### 인증
- `POST /api/auth/login` - 로그인
- `POST /api/auth/logout` - 로그아웃
- `GET /api/auth/me` - 현재 사용자

### 게시글
- `GET /api/posts` - 목록 조회
- `GET /api/posts/:id` - 상세 조회
- `POST /api/posts` - 작성 (인증 필요)
- `PUT /api/posts/:id` - 수정 (작성자만)
- `DELETE /api/posts/:id` - 삭제 (작성자만)

## 데이터베이스 모델

### User
- `name`: 사용자 이름 (unique)
- `createdAt`: 생성 날짜

### Post
- `title`: 제목
- `content`: 내용
- `author`: 작성자 이름
- `createdAt`: 작성 날짜
- `updatedAt`: 수정 날짜

