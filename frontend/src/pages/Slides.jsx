import { useState } from 'react';
import './Slides.css';

const slidesData = [
  {
    title: "바이브 프로젝트 개요",
    content: (
      <div className="slide-content">
        <h1>🎯 바이브(Vibe) 프로젝트</h1>
        <h2>소셜 미디어 플랫폼 만들기</h2>
        <div className="tech-stack">
          <div className="tech-item">
            <h3>프론트엔드</h3>
            <p>React + Vite</p>
            <small>사용자가 보는 화면</small>
          </div>
          <div className="tech-item">
            <h3>백엔드</h3>
            <p>Express.js</p>
            <small>데이터 처리 서버</small>
          </div>
          <div className="tech-item">
            <h3>데이터베이스</h3>
            <p>MongoDB</p>
            <small>데이터 저장소</small>
          </div>
        </div>
      </div>
    )
  },
  {
    title: "프로젝트 구조",
    content: (
      <div className="slide-content">
        <h2>📁 프로젝트 구조</h2>
        <div className="code-block">
          <pre>{`vibe/
├── frontend/       ← 화면 (React)
│   ├── src/
│   │   ├── pages/     ← 각 페이지
│   │   └── components/ ← 재사용 UI
│
├── backend/        ← 서버 (Express)
│   ├── src/
│   │   ├── routes/    ← API 주소
│   │   └── models/    ← DB 구조
│
└── 강의자료/       ← 학습 자료`}</pre>
        </div>
      </div>
    )
  },
  {
    title: "어떻게 작동할까?",
    content: (
      <div className="slide-content">
        <h2>🔄 데이터 흐름</h2>
        <div className="flow-diagram">
          <div className="flow-step">
            <div className="step-number">1</div>
            <div className="step-content">
              <h3>사용자</h3>
              <p>버튼 클릭, 글 작성</p>
            </div>
          </div>
          <div className="arrow">→</div>
          <div className="flow-step">
            <div className="step-number">2</div>
            <div className="step-content">
              <h3>프론트엔드</h3>
              <p>화면 표시, API 호출</p>
            </div>
          </div>
          <div className="arrow">→</div>
          <div className="flow-step">
            <div className="step-number">3</div>
            <div className="step-content">
              <h3>백엔드</h3>
              <p>데이터 처리, 검증</p>
            </div>
          </div>
          <div className="arrow">→</div>
          <div className="flow-step">
            <div className="step-number">4</div>
            <div className="step-content">
              <h3>데이터베이스</h3>
              <p>데이터 저장/조회</p>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    title: "React 기초 - 컴포넌트",
    content: (
      <div className="slide-content">
        <h2>⚛️ React 컴포넌트</h2>
        <p className="subtitle">재사용 가능한 UI 조각</p>
        <div className="code-example">
          <h3>코드 예시:</h3>
          <div className="code-block">
            <pre>{`function Header({ user, onLogout }) {
  return (
    <header>
      <h1>Vibe</h1>
      <span>{user.username}님</span>
      <button onClick={onLogout}>
        로그아웃
      </button>
    </header>
  );
}`}</pre>
          </div>
        </div>
        <div className="key-points">
          <h3>핵심:</h3>
          <ul>
            <li>✅ 함수처럼 만들고 사용</li>
            <li>✅ props로 데이터 전달</li>
            <li>✅ JSX로 HTML처럼 작성</li>
          </ul>
        </div>
      </div>
    )
  },
  {
    title: "React 기초 - State",
    content: (
      <div className="slide-content">
        <h2>🔄 State (상태)</h2>
        <p className="subtitle">변경 가능한 데이터</p>
        <div className="code-example">
          <h3>코드 예시:</h3>
          <div className="code-block">
            <pre>{`const [count, setCount] = useState(0);

<button onClick={() => setCount(count + 1)}>
  클릭 횟수: {count}
</button>`}</pre>
          </div>
        </div>
        <div className="key-points">
          <h3>핵심:</h3>
          <ul>
            <li>✅ useState로 상태 만들기</li>
            <li>✅ set함수로 상태 변경</li>
            <li>✅ 상태가 바뀌면 화면 자동 업데이트</li>
          </ul>
        </div>
      </div>
    )
  },
  {
    title: "백엔드 - Express API",
    content: (
      <div className="slide-content">
        <h2>⚙️ Express API</h2>
        <p className="subtitle">프론트엔드와 백엔드가 대화하는 방법</p>
        <div className="api-table">
          <table>
            <thead>
              <tr>
                <th>메서드</th>
                <th>주소</th>
                <th>역할</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><span className="method get">GET</span></td>
                <td>/api/posts</td>
                <td>게시물 목록 가져오기</td>
              </tr>
              <tr>
                <td><span className="method post">POST</span></td>
                <td>/api/posts</td>
                <td>새 게시물 작성</td>
              </tr>
              <tr>
                <td><span className="method put">PUT</span></td>
                <td>/api/posts/:id</td>
                <td>게시물 수정</td>
              </tr>
              <tr>
                <td><span className="method delete">DELETE</span></td>
                <td>/api/posts/:id</td>
                <td>게시물 삭제</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  },
  {
    title: "백엔드 - 코드 예시",
    content: (
      <div className="slide-content">
        <h2>📝 API 코드 예시</h2>
        <div className="code-example">
          <div className="code-block">
            <pre>{`// 게시물 목록 가져오기
router.get('/posts', async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 });
    
    res.json({ 
      success: true, 
      posts 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: '오류 발생' 
    });
  }
});`}</pre>
          </div>
        </div>
        <div className="key-points">
          <h3>핵심:</h3>
          <ul>
            <li>✅ router.get = 데이터 가져오기</li>
            <li>✅ await Post.find() = DB에서 찾기</li>
            <li>✅ res.json() = 결과 전송</li>
          </ul>
        </div>
      </div>
    )
  },
  {
    title: "데이터베이스 - MongoDB",
    content: (
      <div className="slide-content">
        <h2>💾 MongoDB</h2>
        <p className="subtitle">데이터를 저장하는 곳</p>
        <div className="db-example">
          <h3>게시물 데이터 구조:</h3>
          <div className="code-block">
            <pre>{`{
  _id: "507f1f77bcf86cd799439011",
  title: "안녕하세요",
  content: "첫 게시물입니다!",
  author: {
    _id: "507f191e810c19729de860ea",
    username: "홍길동"
  },
  createdAt: "2024-01-15T10:30:00Z"
}`}</pre>
          </div>
        </div>
        <div className="key-points">
          <h3>핵심:</h3>
          <ul>
            <li>✅ JSON 형태로 저장</li>
            <li>✅ _id는 자동 생성</li>
            <li>✅ 관계 데이터는 참조로</li>
          </ul>
        </div>
      </div>
    )
  },
  {
    title: "인증 시스템",
    content: (
      <div className="slide-content">
        <h2>🔐 로그인 시스템</h2>
        <p className="subtitle">세션 기반 인증</p>
        <div className="auth-flow">
          <div className="auth-step">
            <h3>1. 로그인</h3>
            <p>username + password 전송</p>
          </div>
          <div className="arrow-down">↓</div>
          <div className="auth-step">
            <h3>2. 서버 검증</h3>
            <p>DB에서 사용자 확인</p>
          </div>
          <div className="arrow-down">↓</div>
          <div className="auth-step">
            <h3>3. 세션 생성</h3>
            <p>서버가 "로그인됨" 기억</p>
          </div>
          <div className="arrow-down">↓</div>
          <div className="auth-step">
            <h3>4. 쿠키 전송</h3>
            <p>브라우저에 증명서 저장</p>
          </div>
        </div>
      </div>
    )
  },
  {
    title: "화면 수정하기",
    content: (
      <div className="slide-content">
        <h2>🎨 화면 수정 방법</h2>
        <div className="tips-grid">
          <div className="tip-card">
            <h3>📝 텍스트 변경</h3>
            <p>JSX 파일에서 직접 수정</p>
            <code>{'<h1>Vibe</h1>'}</code>
          </div>
          <div className="tip-card">
            <h3>🎨 색상 변경</h3>
            <p>CSS 파일의 변수 수정</p>
            <code>--primary-color</code>
          </div>
          <div className="tip-card">
            <h3>🔘 버튼 추가</h3>
            <p>onClick 이벤트 연결</p>
            <code>{'<button onClick={...}>'}</code>
          </div>
          <div className="tip-card">
            <h3>📋 입력창 추가</h3>
            <p>useState + input</p>
            <code>value, onChange</code>
          </div>
        </div>
      </div>
    )
  },
  {
    title: "기능 추가하기",
    content: (
      <div className="slide-content">
        <h2>✨ 새 기능 추가 단계</h2>
        <div className="steps-vertical">
          <div className="step-card">
            <div className="step-num">1</div>
            <div className="step-info">
              <h3>프론트엔드</h3>
              <p>UI 만들기 (버튼, 입력창)</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-num">2</div>
            <div className="step-info">
              <h3>백엔드</h3>
              <p>API 엔드포인트 만들기</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-num">3</div>
            <div className="step-info">
              <h3>데이터베이스</h3>
              <p>모델 구조 정의하기</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-num">4</div>
            <div className="step-info">
              <h3>연결</h3>
              <p>API 호출로 연결하기</p>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    title: "실전 예제: 좋아요 기능",
    content: (
      <div className="slide-content">
        <h2>❤️ 좋아요 기능 만들기</h2>
        <div className="example-steps">
          <div className="example-step">
            <h3>1️⃣ 프론트엔드 (버튼 추가)</h3>
            <div className="code-block small">
              <pre>{`<button onClick={() => handleLike(post._id)}>
  ❤️ 좋아요 {post.likes || 0}
</button>`}</pre>
            </div>
          </div>
          <div className="example-step">
            <h3>2️⃣ 백엔드 (API 추가)</h3>
            <div className="code-block small">
              <pre>{`router.post('/posts/:id/like', async (req, res) => {
  const post = await Post.findById(req.params.id);
  post.likes = (post.likes || 0) + 1;
  await post.save();
  res.json({ success: true, post });
});`}</pre>
            </div>
          </div>
          <div className="example-step">
            <h3>3️⃣ 모델 (필드 추가)</h3>
            <div className="code-block small">
              <pre>{`const PostSchema = new mongoose.Schema({
  title: String,
  content: String,
  likes: { type: Number, default: 0 }  // 추가!
});`}</pre>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    title: "자주 하는 실수",
    content: (
      <div className="slide-content">
        <h2>⚠️ 자주 하는 실수들</h2>
        <div className="mistakes-list">
          <div className="mistake-item error">
            <h3>❌ 괄호 안 맞음</h3>
            <code>{'{ } ( ) [ ]'} 개수 확인!</code>
          </div>
          <div className="mistake-item error">
            <h3>❌ 백엔드만 수정</h3>
            <code>프론트엔드도 같이 수정!</code>
          </div>
          <div className="mistake-item error">
            <h3>❌ 서버 재시작 안 함</h3>
            <code>backend는 재시작 필요</code>
          </div>
          <div className="mistake-item error">
            <h3>❌ npm install 안 함</h3>
            <code>새 패키지 설치 필수</code>
          </div>
        </div>
      </div>
    )
  },
  {
    title: "배포하기",
    content: (
      <div className="slide-content">
        <h2>🌐 실제 웹사이트로 만들기</h2>
        <div className="deployment-options">
          <div className="deploy-card">
            <h3>🐳 Docker</h3>
            <p>컨테이너로 패키징</p>
            <small>개발 환경 통일</small>
          </div>
          <div className="deploy-card">
            <h3>☁️ Render</h3>
            <p>무료 클라우드 배포</p>
            <small>간단한 배포</small>
          </div>
          <div className="deploy-card">
            <h3>🚂 Railway</h3>
            <p>자동 배포</p>
            <small>Git 연동</small>
          </div>
        </div>
        <div className="deploy-note">
          <p>💡 <strong>Tip:</strong> deployment 폴더에 가이드 있음!</p>
        </div>
      </div>
    )
  },
  {
    title: "핵심 정리",
    content: (
      <div className="slide-content">
        <h2>📌 꼭 기억하세요!</h2>
        <div className="summary-grid">
          <div className="summary-item">
            <h3>⚛️ React</h3>
            <ul>
              <li>컴포넌트로 조립</li>
              <li>useState로 상태 관리</li>
              <li>useEffect로 데이터 로드</li>
            </ul>
          </div>
          <div className="summary-item">
            <h3>⚙️ Express</h3>
            <ul>
              <li>API로 통신</li>
              <li>라우터로 주소 관리</li>
              <li>미들웨어로 검증</li>
            </ul>
          </div>
          <div className="summary-item">
            <h3>💾 MongoDB</h3>
            <ul>
              <li>JSON 형태 저장</li>
              <li>Mongoose로 관리</li>
              <li>모델로 구조 정의</li>
            </ul>
          </div>
          <div className="summary-item">
            <h3>🔐 인증</h3>
            <ul>
              <li>세션으로 로그인 유지</li>
              <li>쿠키로 증명</li>
              <li>미들웨어로 보호</li>
            </ul>
          </div>
        </div>
      </div>
    )
  },
  {
    title: "다음 단계",
    content: (
      <div className="slide-content">
        <h2>🚀 이제 시작입니다!</h2>
        <div className="next-steps">
          <div className="next-step">
            <h3>1. 직접 수정해보기</h3>
            <p>텍스트, 색상, 버튼 바꿔보세요</p>
          </div>
          <div className="next-step">
            <h3>2. 새 기능 추가하기</h3>
            <p>댓글, 좋아요, 검색 등</p>
          </div>
          <div className="next-step">
            <h3>3. 배포하기</h3>
            <p>친구들에게 보여주세요</p>
          </div>
        </div>
        <div className="final-message">
          <h2>💪 화이팅!</h2>
          <p>실수해도 괜찮아요. 다시 시도하면 됩니다!</p>
        </div>
      </div>
    )
  }
];

function Slides() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    if (currentSlide < slidesData.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight') nextSlide();
    if (e.key === 'ArrowLeft') prevSlide();
  };

  return (
    <div className="slides-container" onKeyDown={handleKeyDown} tabIndex="0">
      <div className="slide-header">
        <h2>바이브 코딩 가이드</h2>
        <div className="slide-counter">
          {currentSlide + 1} / {slidesData.length}
        </div>
      </div>

      <div className="slide">
        {slidesData[currentSlide].content}
      </div>

      <div className="slide-controls">
        <button 
          onClick={prevSlide} 
          disabled={currentSlide === 0}
          className="nav-button"
        >
          ← 이전
        </button>
        
        <div className="slide-dots">
          {slidesData.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              title={slidesData[index].title}
            />
          ))}
        </div>

        <button 
          onClick={nextSlide} 
          disabled={currentSlide === slidesData.length - 1}
          className="nav-button"
        >
          다음 →
        </button>
      </div>

      <div className="slide-navigation">
        <p className="hint">💡 키보드 ← → 키로도 이동할 수 있어요!</p>
      </div>
    </div>
  );
}

export default Slides;

