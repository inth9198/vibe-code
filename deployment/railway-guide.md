# Railway 배포 가이드 (간단한 방법)

Railway는 무료 티어를 제공하며, GitHub 저장소와 연동하여 자동 배포할 수 있습니다.

## 장점
- ✅ 무료 티어 ($5 크레딧/월)
- ✅ GitHub 자동 배포
- ✅ 간단한 설정
- ✅ SSL 자동 제공

## 1단계: GitHub에 코드 푸시

```bash
cd /g/vibe

# Git 초기화 (아직 안했다면)
git init
git add .
git commit -m "Initial commit"

# GitHub 저장소 생성 후
git remote add origin https://github.com/your-username/vibe.git
git push -u origin main
```

## 2단계: Railway 계정 생성

1. https://railway.app/ 접속
2. **Start a New Project** 클릭
3. **GitHub으로 로그인**

## 3단계: MongoDB 배포

1. **New Project** 클릭
2. **Database** > **MongoDB** 선택
3. 생성된 MongoDB의 **Connection URL** 복사

## 4단계: Backend 배포

1. **New** 클릭
2. **GitHub Repo** 선택
3. `vibe` 저장소 선택
4. **Settings** 클릭:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

5. **Variables** 탭에서 환경 변수 추가:
   ```
   PORT=3000
   MONGODB_URI=<복사한 MongoDB URL>
   SESSION_SECRET=<랜덤 문자열>
   NODE_ENV=production
   CORS_ORIGIN=<프론트엔드 URL>
   ```

6. 배포된 백엔드 URL 복사 (예: `https://vibe-backend-production.up.railway.app`)

## 5단계: Frontend 배포

1. **New** 클릭
2. **GitHub Repo** 선택
3. `vibe` 저장소 선택
4. **Settings** 클릭:
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run preview` (또는 정적 서버)

5. **Variables** 탭에서 환경 변수 추가:
   ```
   VITE_API_URL=<백엔드 URL>
   ```

6. **Deploy** 클릭

## 6단계: 접속

배포된 프론트엔드 URL로 접속!

## 프로덕션용 Frontend 서버 추가

Railway에서 Vite preview 대신 정적 파일 서버를 사용하려면:

### serve 패키지 사용
`frontend/package.json`에 추가:
```json
{
  "scripts": {
    "start": "serve -s dist -l 5173"
  },
  "dependencies": {
    "serve": "^14.2.1"
  }
}
```

Railway Settings:
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm start`

