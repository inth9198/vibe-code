import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { postsAPI } from '../services/api';
import './PostForm.css';

function PostForm({ user }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    title: '',
    content: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [initialLoading, setInitialLoading] = useState(isEditMode);

  useEffect(() => {
    if (isEditMode) {
      loadPost();
    }
  }, [id]);

  const loadPost = async () => {
    setInitialLoading(true);
    try {
      const response = await postsAPI.getPost(id);
      if (response.data.success) {
        const post = response.data.post;
        
        // 작성자 확인
        if (post.author !== user.name) {
          alert('작성자만 수정할 수 있습니다.');
          navigate(`/posts/${id}`);
          return;
        }

        setFormData({
          title: post.title,
          content: post.content
        });
      }
    } catch (error) {
      setError('게시글을 불러오는 중 오류가 발생했습니다.');
    } finally {
      setInitialLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.content.trim()) {
      setError('제목과 내용을 모두 입력해주세요.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const data = {
        title: formData.title.trim(),
        content: formData.content.trim()
      };

      if (isEditMode) {
        const response = await postsAPI.updatePost(id, data);
        if (response.data.success) {
          alert('게시글이 수정되었습니다.');
          navigate(`/posts/${id}`);
        }
      } else {
        const response = await postsAPI.createPost(data);
        if (response.data.success) {
          alert('게시글이 작성되었습니다.');
          navigate('/');
        }
      }
    } catch (error) {
      setError(error.response?.data?.message || '저장 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (window.confirm('작성을 취소하시겠습니까?')) {
      navigate(isEditMode ? `/posts/${id}` : '/');
    }
  };

  if (initialLoading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>게시글을 불러오는 중...</p>
      </div>
    );
  }

  return (
    <div className="post-form-container">
      <div className="post-form-box">
        <h2>{isEditMode ? '게시글 수정' : '새 게시글 작성'}</h2>
        
        <form onSubmit={handleSubmit} className="post-form">
          <div className="form-group">
            <label htmlFor="title">제목</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="제목을 입력하세요"
              maxLength={200}
              disabled={loading}
              required
            />
            <span className="char-count">{formData.title.length}/200</span>
          </div>

          <div className="form-group">
            <label htmlFor="content">내용</label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="내용을 입력하세요"
              maxLength={10000}
              disabled={loading}
              required
              rows={15}
            />
            <span className="char-count">{formData.content.length}/10000</span>
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="form-actions">
            <button 
              type="button" 
              onClick={handleCancel}
              className="btn btn-secondary"
              disabled={loading}
            >
              취소
            </button>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? '저장 중...' : (isEditMode ? '수정하기' : '작성하기')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PostForm;

