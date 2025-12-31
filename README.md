# 🎵 바이브 코딩 스터디 플랫폼

바이브 코딩 스터디원들을 위한 정보 공유 플랫폼입니다. 스터디원들이 학습 내용, 질문, 팁 등을 자유롭게 공유할 수 있습니다.

## 📋 주요 기능

- **간편한 로그인**: 이름만 입력하면 바로 사용 가능 (비밀번호 불필요)
- **게시글 작성**: 제목과 내용을 입력하여 정보 공유
- **게시글 수정/삭제**: 작성자만 자신의 글을 수정하거나 삭제 가능
- **실시간 공유**: 모든 스터디원이 작성된 글을 즉시 확인 가능
- **반응형 디자인**: 모바일, 태블릿, 데스크톱 모든 환경에서 최적화된 UI

## 🛠️ 기술 스택

### Frontend
- **React 18**: UI 라이브러리
- **Vite**: 빌드 도구
- **React Router**: 라우팅
- **Axios**: HTTP 클라이언트

### Backend
- **Node.js**: JavaScript 런타임
- **Express**: 웹 프레임워크
- **MongoDB**: NoSQL 데이터베이스
- **Mongoose**: MongoDB ODM
- **express-session**: 세션 관리

### DevOps
- **Docker**: 컨테이너화
- **Docker Compose**: 멀티 컨테이너 오케스트레이션

## 📁 프로젝트 구조

```
vibe/
├── frontend/                 # React 프론트엔드
│   ├── src/
│   │   ├── components/      # 재사용 가능한 컴포넌트
│   │   │   ├── Header.jsx
│   │   │   └── Header.css
│   │   ├── pages/           # 페이지 컴포넌트
│   │   │   ├── Login.jsx
│   │   │   ├── PostList.jsx
│   │   │   ├── PostDetail.jsx
│   │   │   └── PostForm.jsx
│   │   ├── services/        # API 통신
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── Dockerfile
│   └── package.json
│
├── backend/                  # Express 백엔드
│   ├── src/
│   │   ├── models/          # MongoDB 스키마
│   │   │   ├── User.js
│   │   │   └── Post.js
│   │   ├── routes/          # API 라우트
│   │   │   ├── auth.js
│   │   │   └── posts.js
│   │   ├── middleware/      # 커스텀 미들웨어
│   │   │   └── auth.js
│   │   └── server.js        # 서버 진입점
│   ├── Dockerfile
│   └── package.json
│
├── docker-compose.yml        # Docker Compose 설정
├── .gitignore
└── README.md
```

## 🚀 시작하기

### 사전 요구사항

- **Docker**: 20.10 이상
- **Docker Compose**: 2.0 이상

### 설치 및 실행

1. **저장소 클론**
```bash
git clone <repository-url>
cd vibe
```

2. **Docker Compose로 전체 스택 실행**
```bash
docker-compose up --build
```

3. **서비스 접속**
- 프론트엔드: http://localhost:5173
- 백엔드 API: http://localhost:3000
- MongoDB: localhost:27017

### 개발 환경 설정

각 서비스는 핫 리로드를 지원하여 코드 변경 시 자동으로 재시작됩니다.

#### 백그라운드 실행
```bash
docker-compose up -d
```

#### 로그 확인
```bash
# 전체 로그
docker-compose logs -f

# 특정 서비스 로그
docker-compose logs -f frontend
docker-compose logs -f backend
docker-compose logs -f mongodb
```

#### 서비스 중지
```bash
docker-compose down
```

#### 데이터 볼륨까지 삭제
```bash
docker-compose down -v
```

## 🔌 API 엔드포인트

### 인증 (Authentication)

#### 로그인
```http
POST /api/auth/login
Content-Type: application/json

{
  "name": "홍길동"
}
```

#### 로그아웃
```http
POST /api/auth/logout
```

#### 현재 사용자 정보
```http
GET /api/auth/me
```

### 게시글 (Posts)

#### 게시글 목록 조회
```http
GET /api/posts
```

#### 게시글 상세 조회
```http
GET /api/posts/:id
```

#### 게시글 작성 (인증 필요)
```http
POST /api/posts
Content-Type: application/json

{
  "title": "게시글 제목",
  "content": "게시글 내용"
}
```

#### 게시글 수정 (작성자만 가능)
```http
PUT /api/posts/:id
Content-Type: application/json

{
  "title": "수정된 제목",
  "content": "수정된 내용"
}
```

#### 게시글 삭제 (작성자만 가능)
```http
DELETE /api/posts/:id
```

## 💾 데이터베이스 스키마

### User 컬렉션
```javascript
{
  _id: ObjectId,
  name: String (unique, required),
  createdAt: Date
}
```

### Post 컬렉션
```javascript
{
  _id: ObjectId,
  title: String (required, max: 200),
  content: String (required, max: 10000),
  author: String (required),
  createdAt: Date,
  updatedAt: Date
}
```

## 🔒 보안 고려사항

- **CORS 설정**: 프론트엔드에서만 API 접근 허용
- **세션 기반 인증**: express-session + MongoDB 세션 스토어
- **입력 검증**: express-validator를 사용한 데이터 유효성 검사
- **XSS 방어**: 사용자 입력 sanitization
- **MongoDB Injection 방어**: Mongoose를 통한 자동 이스케이핑

## 🧪 테스트

### API 헬스체크
```bash
curl http://localhost:3000/health
```

### 프론트엔드 접속 테스트
브라우저에서 http://localhost:5173 접속

## 📦 프로덕션 배포

### 환경 변수 설정

프로덕션 환경에서는 다음 환경 변수를 안전하게 설정해야 합니다:

```env
# Backend
PORT=3000
MONGODB_URI=mongodb://mongodb:27017/vibe-study
SESSION_SECRET=강력한-랜덤-문자열-사용
NODE_ENV=production
CORS_ORIGIN=https://your-domain.com

# Frontend
VITE_API_URL=https://api.your-domain.com
```

### 프로덕션 빌드

```bash
# Frontend 빌드
cd frontend
npm run build

# Backend는 이미 프로덕션 준비 완료
```

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 라이센스

이 프로젝트는 MIT 라이센스 하에 배포됩니다.

## 👥 팀

바이브 코딩 스터디 팀

## 🐛 문제 해결

### 포트가 이미 사용 중인 경우
```bash
# 사용 중인 포트 확인
netstat -ano | findstr :5173
netstat -ano | findstr :3000
netstat -ano | findstr :27017

# docker-compose.yml에서 포트 번호 변경
```

### Docker 컨테이너가 시작되지 않는 경우
```bash
# 컨테이너 로그 확인
docker-compose logs

# 컨테이너 재시작
docker-compose restart

# 완전히 재구성
docker-compose down
docker-compose up --build
```

### MongoDB 연결 오류
```bash
# MongoDB 컨테이너 상태 확인
docker-compose ps

# MongoDB 로그 확인
docker-compose logs mongodb

# 헬스체크 확인
docker inspect vibe-mongodb
```

## 📚 추가 문서

- [React 공식 문서](https://react.dev/)
- [Express 공식 문서](https://expressjs.com/)
- [MongoDB 공식 문서](https://www.mongodb.com/docs/)
- [Docker 공식 문서](https://docs.docker.com/)

---

**Made with ❤️ by Vibe Study Team**

