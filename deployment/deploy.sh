#!/bin/bash
# 프로덕션 배포 스크립트

echo "🚀 Vibe Study Platform 배포 시작..."

# 환경 변수 확인
if [ ! -f .env ]; then
    echo "❌ .env 파일이 없습니다. .env.example을 참고하여 생성하세요."
    exit 1
fi

# Git pull (선택사항)
echo "📥 최신 코드 가져오기..."
git pull origin main

# Docker Compose 빌드 및 시작
echo "🐳 Docker 컨테이너 빌드 및 시작..."
docker compose -f docker-compose.prod.yml down
docker compose -f docker-compose.prod.yml up -d --build

# 로그 확인
echo "📝 배포 로그 확인 중..."
sleep 5
docker compose -f docker-compose.prod.yml ps

echo "✅ 배포 완료!"
echo "프론트엔드: http://your-domain.com"
echo "백엔드 API: http://your-domain.com:3000"
echo ""
echo "로그 확인: docker compose -f docker-compose.prod.yml logs -f"

