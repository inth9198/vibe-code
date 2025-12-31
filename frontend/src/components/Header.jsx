import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

function Header({ user, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm('로그아웃 하시겠습니까?')) {
      onLogout();
      navigate('/login');
    }
  };

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          <h1>🎵 바이브 스터디</h1>
        </Link>
        <nav className="nav">
          <span className="user-name">👤 {user.name}</span>
          <Link to="/new" className="btn btn-primary">글쓰기</Link>
          <button onClick={handleLogout} className="btn btn-secondary">
            로그아웃
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Header;

