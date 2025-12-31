import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import { authAPI } from './services/api'
import Login from './pages/Login'
import PostList from './pages/PostList'
import PostDetail from './pages/PostDetail'
import PostForm from './pages/PostForm'
import Header from './components/Header'

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await authAPI.getCurrentUser();
      if (response.data.success) {
        setUser(response.data.user);
      }
    } catch (error) {
      console.log('Not authenticated');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = async () => {
    try {
      await authAPI.logout();
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>로딩 중...</p>
      </div>
    );
  }

  return (
    <Router>
      <div className="app">
        {user && <Header user={user} onLogout={handleLogout} />}
        <main className="main-content">
          <Routes>
            <Route 
              path="/login" 
              element={user ? <Navigate to="/" /> : <Login onLogin={handleLogin} />} 
            />
            <Route 
              path="/" 
              element={user ? <PostList user={user} /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/posts/:id" 
              element={user ? <PostDetail user={user} /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/posts/:id/edit" 
              element={user ? <PostForm user={user} /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/new" 
              element={user ? <PostForm user={user} /> : <Navigate to="/login" />} 
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

