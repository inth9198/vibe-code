const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');

const app = express();
const PORT = process.env.PORT || 3000;

// Render와 같은 프록시 환경을 위한 설정
app.set('trust proxy', 1);

// MongoDB 연결
mongoose.connect(process.env.MONGODB_URI || 'mongodb://mongodb:27017/vibe-study')
.then(() => console.log('MongoDB 연결 성공'))
.catch(err => console.error('MongoDB 연결 실패:', err));

// 미들웨어
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, etc)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      process.env.CORS_ORIGIN || 'http://localhost:5173',
      'http://localhost:5173',
      'https://vibe-frontend-9wxu.onrender.com'
    ];
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log('Blocked by CORS:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 세션 설정
app.use(session({
  secret: process.env.SESSION_SECRET || 'vibe-study-secret-key',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI || 'mongodb://mongodb:27017/vibe-study',
    touchAfter: 24 * 3600, // 24시간
    mongoOptions: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7일
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
  }
}));

// 라우트
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

// 헬스체크
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Vibe Study API Server' 
  });
});

// 404 에러 핸들러
app.use((req, res) => {
  res.status(404).json({ 
    success: false, 
    message: '요청한 리소스를 찾을 수 없습니다.' 
  });
});

// 에러 핸들러
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: '서버 오류가 발생했습니다.' 
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
});

