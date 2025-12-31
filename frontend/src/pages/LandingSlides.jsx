import { Link } from 'react-router-dom';
import './LandingSlides.css';

function LandingSlides() {
  return (
    <div className="landing-slides">
      <div className="landing-content">
        <h1>📚 바이브 코딩 가이드</h1>
        <p className="subtitle">비전문가도 쉽게 따라하는 풀스택 개발</p>
        
        <div className="features">
          <div className="feature-card">
            <div className="feature-icon">⚛️</div>
            <h3>React</h3>
            <p>화면 만들기</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚙️</div>
            <h3>Express</h3>
            <p>서버 만들기</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💾</div>
            <h3>MongoDB</h3>
            <p>데이터 저장하기</p>
          </div>
        </div>

        <div className="cta-buttons">
          <Link to="/slides" className="btn-start">
            🚀 강의 시작하기
          </Link>
          <Link to="/login" className="btn-app">
            💻 앱 사용하기
          </Link>
        </div>

        <div className="info-section">
          <h2>📖 무엇을 배울까요?</h2>
          <div className="info-grid">
            <div className="info-item">
              <h4>프로젝트 시작하기</h4>
              <p>개발 환경 설정과 프로젝트 구조 이해</p>
            </div>
            <div className="info-item">
              <h4>화면 수정하기</h4>
              <p>버튼, 텍스트, 색상 등 UI 커스터마이징</p>
            </div>
            <div className="info-item">
              <h4>기능 추가하기</h4>
              <p>새로운 API와 데이터베이스 연동</p>
            </div>
            <div className="info-item">
              <h4>사이트 배포하기</h4>
              <p>실제 웹사이트로 만들어 공유하기</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingSlides;

