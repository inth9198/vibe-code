import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { postsAPI } from '../services/api';
import './PostList.css';

function PostList({ user }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await postsAPI.getPosts();
      if (response.data.success) {
        setPosts(response.data.posts);
      }
    } catch (error) {
      setError('게시글을 불러오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>게시글을 불러오는 중...</p>
      </div>
    );
  }

  return (
    <div className="post-list-container">
      <div className="post-list-header">
        <h2>📝 스터디 게시판</h2>
        <p>스터디원들이 공유한 정보를 확인하세요</p>
      </div>

      {error && <div className="error-banner">{error}</div>}

      {posts.length === 0 ? (
        <div className="empty-state">
          <p>아직 작성된 게시글이 없습니다.</p>
          <Link to="/new" className="btn btn-primary">
            첫 게시글 작성하기
          </Link>
        </div>
      ) : (
        <div className="posts-grid">
          {posts.map((post) => (
            <Link 
              to={`/posts/${post._id}`} 
              key={post._id} 
              className="post-card"
            >
              <div className="post-card-header">
                <h3 className="post-title">{post.title}</h3>
                <span className={`author-badge ${post.author === user.name ? 'my-post' : ''}`}>
                  {post.author}
                </span>
              </div>
              
              <div className="post-card-footer">
                <span className="post-date">
                  {formatDate(post.createdAt)}
                </span>
                {post.updatedAt !== post.createdAt && (
                  <span className="post-edited">(수정됨)</span>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default PostList;

