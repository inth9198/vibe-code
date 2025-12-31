import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { postsAPI } from '../services/api';
import './PostDetail.css';

function PostDetail({ user }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadPost();
  }, [id]);

  const loadPost = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await postsAPI.getPost(id);
      if (response.data.success) {
        setPost(response.data.post);
      }
    } catch (error) {
      setError('게시글을 불러오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('정말로 이 게시글을 삭제하시겠습니까?')) {
      return;
    }

    try {
      const response = await postsAPI.deletePost(id);
      if (response.data.success) {
        alert('게시글이 삭제되었습니다.');
        navigate('/');
      }
    } catch (error) {
      alert(error.response?.data?.message || '삭제 중 오류가 발생했습니다.');
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

  if (error || !post) {
    return (
      <div className="error-container">
        <p>{error || '게시글을 찾을 수 없습니다.'}</p>
        <Link to="/" className="btn btn-primary">목록으로 돌아가기</Link>
      </div>
    );
  }

  const isAuthor = post.author === user.name;

  return (
    <div className="post-detail-container">
      <div className="post-detail">
        <div className="post-header">
          <div className="post-info">
            <h1 className="post-title">{post.title}</h1>
            <div className="post-meta">
              <span className="author">작성자: {post.author}</span>
              <span className="date">작성일: {formatDate(post.createdAt)}</span>
              {post.updatedAt !== post.createdAt && (
                <span className="date">수정일: {formatDate(post.updatedAt)}</span>
              )}
            </div>
          </div>

          {isAuthor && (
            <div className="post-actions">
              <Link 
                to={`/posts/${id}/edit`} 
                className="btn btn-secondary"
              >
                수정
              </Link>
              <button 
                onClick={handleDelete} 
                className="btn btn-danger"
              >
                삭제
              </button>
            </div>
          )}
        </div>

        <div className="post-content">
          {post.content.split('\n').map((line, index) => (
            <p key={index}>{line || '\u00A0'}</p>
          ))}
        </div>

        <div className="post-footer">
          <Link to="/" className="btn btn-primary">목록으로</Link>
        </div>
      </div>
    </div>
  );
}

export default PostDetail;

