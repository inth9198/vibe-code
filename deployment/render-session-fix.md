# Render 세션 쿠키 문제 해결

## 문제 상황
로그인은 성공하지만 세션 쿠키가 저장되지 않아 `/api/auth/me` 및 `/api/posts` 요청이 401 에러 발생

## 해결 방법

### 1. 환경 변수 확인
Render 백엔드 서비스에서 다음 환경 변수가 올바르게 설정되어 있는지 확인:

```env
NODE_ENV=production
CORS_ORIGIN=https://vibe-frontend-9wxu.onrender.com
SESSION_SECRET=강력한-랜덤-문자열-최소-32자
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/vibe-study
```

### 2. 백엔드 재배포
수정된 코드를 GitHub에 푸시하면 Render가 자동으로 재배포합니다.

### 3. 테스트 방법
1. 브라우저 개발자 도구 열기
2. Network 탭에서 `/api/auth/login` 요청 확인
3. Response Headers에 `Set-Cookie` 헤더가 있는지 확인
4. Application > Storage > Cookies에 세션 쿠키가 저장되는지 확인

### 4. 로그 확인
Render 대시보드에서 백엔드 로그를 확인하여:
- 로그인 시 "Session saved successfully" 메시지
- `/api/auth/me` 요청 시 세션 정보 로그

### 5. 추가 디버깅
문제가 지속될 경우 Render 무료 티어의 슬립 모드 때문일 수 있습니다:
- 서버가 슬립 상태에서 깨어날 때 세션 연결이 끊어질 수 있음
- 유료 플랜으로 업그레이드하거나 다른 호스팅 서비스 고려
