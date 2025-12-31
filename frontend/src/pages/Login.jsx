import { useState } from 'react';
import { authAPI } from '../services/api';
import './Login.css';

function Login({ onLogin }) {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!name.trim()) {
      setError('이름을 입력해주세요.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await authAPI.login(name.trim());
      if (response.data.success) {
        onLogin(response.data.user);
      }
    } catch (error) {
      setError(error.response?.data?.message || '로그인 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <h1>🎵 바이브 스터디</h1>
          <p>스터디원들과 정보를 공유해보세요</p>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="name">이름</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="이름을 입력하세요"
              maxLength={50}
              disabled={loading}
              autoFocus
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button 
            type="submit" 
            className="login-button"
            disabled={loading}
          >
            {loading ? '로그인 중...' : '로그인'}
          </button>
        </form>

        <div className="login-footer">
          <p>비밀번호 없이 이름만으로 로그인할 수 있습니다</p>
        </div>
      </div>
    </div>
  );
}

export default Login;

