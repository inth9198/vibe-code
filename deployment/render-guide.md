# Render 배포 가이드

Render는 무료 티어를 제공하며 설정이 간단합니다.

## 장점
- ✅ 무료 티어 제공 (제한적)
- ✅ GitHub 자동 배포
- ✅ SSL 자동 제공
- ✅ MongoDB Atlas와 연동 가능

## 1단계: GitHub에 코드 푸시

```bash
cd /g/vibe
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/your-username/vibe.git
git push -u origin main
```

## 2단계: MongoDB Atlas 설정

1. https://www.mongodb.com/atlas 접속
2. 무료 클러스터 생성
3. **Database Access**에서 사용자 생성
4. **Network Access**에서 `0.0.0.0/0` (모든 IP) 허용
5. **Connect** > **Connect your application**에서 Connection String 복사

## 3단계: Render 계정 생성

1. https://render.com/ 접속
2. GitHub으로 로그인

## 4단계: Backend 배포

1. **New** > **Web Service** 클릭
2. GitHub 저장소 연결
3. 설정:
   - **Name**: vibe-backend
   - **Root Directory**: `backend`
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

4. **Environment Variables** 추가:
   ```
   PORT=3000
   MONGODB_URI=<MongoDB Atlas URL>
   SESSION_SECRET=<랜덤 문자열>
   NODE_ENV=production
   CORS_ORIGIN=<프론트엔드 URL>
   ```

5. **Create Web Service** 클릭
6. 배포된 URL 복사

## 5단계: Frontend 배포

1. **New** > **Static Site** 클릭
2. GitHub 저장소 연결
3. 설정:
   - **Name**: vibe-frontend
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`

4. **Environment Variables** 추가:
   ```
   VITE_API_URL=<백엔드 URL>
   ```

5. **Create Static Site** 클릭

## 6단계: 접속

배포된 프론트엔드 URL로 접속!

## 주의사항

**무료 티어 제한**:
- 15분 동안 요청이 없으면 서버가 자동으로 슬립 모드
- 첫 요청 시 약 30초 정도 시작 시간 필요
- 월 750시간 무료

