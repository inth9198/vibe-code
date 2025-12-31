# 🚀 배포 가이드

이 문서는 바이브 스터디 플랫폼을 실제 서버에 배포하는 방법을 안내합니다.

## 📋 배포 옵션 비교

| 옵션 | 난이도 | 비용 | DevOps 학습 | 추천 대상 |
|------|--------|------|-------------|-----------|
| **AWS EC2** | ⭐⭐⭐⭐ | $17-40/월 | ⭐⭐⭐⭐⭐ | DevOps 학습 원하는 분 |
| **Railway** | ⭐ | 무료-$5/월 | ⭐⭐ | 빠른 배포 원하는 분 |
| **Render** | ⭐⭐ | 무료-$7/월 | ⭐⭐ | 무료로 시작하고 싶은 분 |
| **DigitalOcean** | ⭐⭐⭐ | $6-40/월 | ⭐⭐⭐⭐ | 중간 수준 학습 원하는 분 |

## 🎯 추천 순서

### DevOps 공부 목적이라면:
1. **로컬 Docker** (완료!) → 2. **AWS EC2** → 3. **도메인 + SSL**

### 빠른 배포 목적이라면:
1. **Railway** 또는 **Render**

## 📚 상세 가이드

각 배포 방법의 상세 가이드는 다음 파일을 참고하세요:

- [AWS EC2 배포](./deployment/aws-ec2-guide.md) - 가장 상세한 DevOps 학습용
- [Railway 배포](./deployment/railway-guide.md) - 가장 간단한 배포
- [Render 배포](./deployment/render-guide.md) - 무료 티어 제공

## 🔧 프로덕션 파일

프로덕션 환경을 위해 다음 파일들이 준비되어 있습니다:

### Docker 관련
- `docker-compose.prod.yml` - 프로덕션용 Docker Compose
- `backend/Dockerfile.prod` - 프로덕션용 백엔드 Dockerfile
- `frontend/Dockerfile.prod` - 프로덕션용 프론트엔드 Dockerfile
- `frontend/nginx.conf` - Nginx 웹 서버 설정

### 환경 설정
- `.env.example` - 환경 변수 예시
- `deployment/deploy.sh` - 자동 배포 스크립트

## 🚀 빠른 시작 (프로덕션)

### 1. 환경 변수 설정
```bash
cp .env.example .env
# .env 파일을 열어서 실제 값으로 변경
```

### 2. 프로덕션 배포 실행
```bash
# 배포 스크립트에 실행 권한 부여
chmod +x deployment/deploy.sh

# 배포 실행
./deployment/deploy.sh
```

## 📊 배포 후 체크리스트

- [ ] 프론트엔드 접속 확인
- [ ] 백엔드 API 응답 확인 (`/health` 엔드포인트)
- [ ] 로그인 기능 테스트
- [ ] 게시글 작성/수정/삭제 테스트
- [ ] 모바일 반응형 확인
- [ ] 보안 설정 확인 (HTTPS, 방화벽 등)
- [ ] 모니터링 설정 (선택사항)
- [ ] 백업 설정 (중요!)

## 🔒 보안 체크리스트

프로덕션 배포 전 반드시 확인:

- [ ] `.env` 파일이 `.gitignore`에 포함되어 있는지
- [ ] SESSION_SECRET이 강력한 랜덤 문자열인지
- [ ] MongoDB 비밀번호가 강력한지
- [ ] CORS_ORIGIN이 정확히 설정되었는지
- [ ] 방화벽이 필요한 포트만 열려있는지
- [ ] SSH 키가 안전하게 보관되어 있는지

## 💾 백업 전략

### MongoDB 백업
```bash
# 백업
docker exec vibe-mongodb mongodump --out=/backup
docker cp vibe-mongodb:/backup ./backup

# 복원
docker cp ./backup vibe-mongodb:/backup
docker exec vibe-mongodb mongorestore /backup
```

### 자동 백업 설정 (cron)
```bash
# crontab 편집
crontab -e

# 매일 새벽 3시에 백업
0 3 * * * /path/to/backup-script.sh
```

## 📈 모니터링

### 기본 모니터링
```bash
# 컨테이너 상태 확인
docker compose -f docker-compose.prod.yml ps

# 로그 확인
docker compose -f docker-compose.prod.yml logs -f

# 리소스 사용량
docker stats
```

### 고급 모니터링 (선택사항)
- **Prometheus + Grafana**: 메트릭 수집 및 시각화
- **AWS CloudWatch**: AWS EC2 사용 시
- **Sentry**: 에러 추적
- **Uptime Robot**: 가동 시간 모니터링

## 🔄 업데이트 방법

```bash
# 1. 코드 업데이트
git pull origin main

# 2. 재배포
./deployment/deploy.sh

# 또는 수동으로
docker compose -f docker-compose.prod.yml up -d --build
```

## 🆘 문제 해결

### 컨테이너가 시작되지 않을 때
```bash
docker compose -f docker-compose.prod.yml logs
```

### 데이터베이스 연결 오류
1. MongoDB 컨테이너 상태 확인
2. 환경 변수 `MONGODB_URI` 확인
3. 네트워크 연결 확인

### 프론트엔드가 백엔드에 연결되지 않을 때
1. CORS 설정 확인
2. 백엔드 URL이 올바른지 확인
3. 방화벽 포트 확인

## 💰 비용 최적화

### AWS EC2
- **예약 인스턴스**: 1년 약정 시 최대 75% 할인
- **스팟 인스턴스**: 최대 90% 할인 (중단 가능성 있음)
- **적절한 인스턴스 크기**: 모니터링 후 다운그레이드

### 무료 옵션
- **Railway**: $5/월 크레딧
- **Render**: 무료 티어 (제한적)
- **MongoDB Atlas**: 512MB 무료
- **Vercel/Netlify**: 프론트엔드 무료 호스팅

## 📞 지원

문제가 발생하면 다음을 확인하세요:
1. 로그 파일 확인
2. GitHub Issues 검색
3. 배포 가이드 재확인
4. 커뮤니티에 질문

---

**행운을 빕니다! 🎉**

