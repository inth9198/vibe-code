# AWS EC2 배포 가이드

## 사전 준비사항

- AWS 계정
- 도메인 (선택사항, 없으면 IP 주소로 접속)
- SSH 클라이언트

## 1단계: EC2 인스턴스 생성

### 1. AWS Console 로그인
https://console.aws.amazon.com/

### 2. EC2 인스턴스 시작
1. **서비스** > **EC2** 선택
2. **인스턴스 시작** 클릭
3. 설정:
   - **이름**: vibe-study-server
   - **AMI**: Ubuntu Server 22.04 LTS
   - **인스턴스 유형**: t2.small (최소) 또는 t2.medium (권장)
   - **키 페어**: 새로 생성 또는 기존 키 사용 (다운로드 보관!)
   - **네트워크 설정**:
     - SSH (포트 22) - 내 IP만 허용
     - HTTP (포트 80) - 모든 곳
     - HTTPS (포트 443) - 모든 곳
     - 사용자 지정 TCP (포트 3000) - 모든 곳
     - 사용자 지정 TCP (포트 5173) - 모든 곳
   - **스토리지**: 20GB 이상

4. **인스턴스 시작** 클릭

## 2단계: EC2 인스턴스 접속

### Windows (Git Bash 사용)
```bash
chmod 400 your-key.pem
ssh -i your-key.pem ubuntu@your-ec2-public-ip
```

### macOS/Linux
```bash
chmod 400 your-key.pem
ssh -i your-key.pem ubuntu@your-ec2-public-ip
```

## 3단계: 서버 환경 설정

### 1. 시스템 업데이트
```bash
sudo apt update
sudo apt upgrade -y
```

### 2. Docker 설치
```bash
# Docker 설치
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# 현재 사용자를 docker 그룹에 추가
sudo usermod -aG docker ubuntu

# 로그아웃 후 다시 로그인 (또는 재접속)
exit
# 다시 SSH 접속
```

### 3. Docker Compose 설치
```bash
sudo apt install docker-compose-plugin -y
```

### 4. Git 설치
```bash
sudo apt install git -y
```

## 4단계: 프로젝트 배포

### 1. 프로젝트 클론
```bash
# 저장소가 GitHub에 있다면
git clone https://github.com/your-username/vibe.git
cd vibe

# 또는 로컬에서 파일 전송
# 로컬 컴퓨터에서:
# scp -i your-key.pem -r ./vibe ubuntu@your-ec2-ip:~/
```

### 2. 환경 변수 설정
```bash
# Backend 환경 변수
cd ~/vibe/backend
cat > .env << EOF
PORT=3000
MONGODB_URI=mongodb://mongodb:27017/vibe-study
SESSION_SECRET=$(openssl rand -base64 32)
NODE_ENV=production
CORS_ORIGIN=http://your-ec2-public-ip:5173
EOF
```

### 3. Docker Compose 실행
```bash
cd ~/vibe
docker compose up -d --build
```

### 4. 로그 확인
```bash
docker compose logs -f
```

## 5단계: 접속 확인

- **프론트엔드**: http://your-ec2-public-ip:5173
- **백엔드 API**: http://your-ec2-public-ip:3000

## 6단계: 프로덕션 설정 (선택사항)

### Nginx 리버스 프록시 설정

```bash
sudo apt install nginx -y

# Nginx 설정
sudo nano /etc/nginx/sites-available/vibe
```

```nginx
server {
    listen 80;
    server_name your-domain.com;  # 또는 EC2 IP

    # Frontend
    location / {
        proxy_pass http://localhost:5173;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# 설정 활성화
sudo ln -s /etc/nginx/sites-available/vibe /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### SSL 인증서 설정 (HTTPS)

```bash
# Certbot 설치
sudo apt install certbot python3-certbot-nginx -y

# SSL 인증서 발급 (도메인 필요)
sudo certbot --nginx -d your-domain.com
```

## 7단계: 자동 시작 설정

```bash
# Docker Compose 서비스 생성
sudo nano /etc/systemd/system/vibe.service
```

```ini
[Unit]
Description=Vibe Study Platform
After=docker.service
Requires=docker.service

[Service]
Type=oneshot
RemainAfterExit=yes
WorkingDirectory=/home/ubuntu/vibe
ExecStart=/usr/bin/docker compose up -d
ExecStop=/usr/bin/docker compose down

[Install]
WantedBy=multi-user.target
```

```bash
# 서비스 활성화
sudo systemctl enable vibe
sudo systemctl start vibe
```

## 유지보수 명령어

### 로그 확인
```bash
docker compose logs -f
```

### 재시작
```bash
docker compose restart
```

### 업데이트
```bash
git pull
docker compose up -d --build
```

### 백업
```bash
# MongoDB 데이터 백업
docker exec vibe-mongodb mongodump --out=/backup
docker cp vibe-mongodb:/backup ./backup
```

## 보안 팁

1. **SSH 포트 변경**: 기본 22번 포트 대신 다른 포트 사용
2. **방화벽 설정**: ufw 사용
   ```bash
   sudo ufw enable
   sudo ufw allow 22
   sudo ufw allow 80
   sudo ufw allow 443
   ```
3. **자동 업데이트**: unattended-upgrades 설정
4. **정기 백업**: cron으로 자동 백업 스케줄링
5. **모니터링**: CloudWatch 또는 다른 모니터링 도구 사용

## 비용 예상

- **EC2 t2.small**: 월 약 $17-20
- **EC2 t2.medium**: 월 약 $35-40
- **데이터 전송**: 월 1GB까지 무료, 이후 약 $0.09/GB

## 문제 해결

### 컨테이너가 시작되지 않음
```bash
docker compose ps
docker compose logs
```

### 포트가 이미 사용 중
```bash
sudo netstat -tulpn | grep :3000
sudo kill -9 <PID>
```

### 메모리 부족
```bash
free -h
docker system prune -a
```

