const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Post = require('../models/Post');
const { requireAuth, requireAuthor } = require('../middleware/auth');

// 게시글 목록 조회
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .select('title author createdAt updatedAt');
    
    res.json({ 
      success: true, 
      posts 
    });
  } catch (error) {
    console.error('Get posts error:', error);
    res.status(500).json({ 
      success: false, 
      message: '게시글 목록을 불러오는 중 오류가 발생했습니다.' 
    });
  }
});

// 게시글 상세 조회
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ 
        success: false, 
        message: '게시글을 찾을 수 없습니다.' 
      });
    }

    res.json({ 
      success: true, 
      post 
    });
  } catch (error) {
    console.error('Get post error:', error);
    res.status(500).json({ 
      success: false, 
      message: '게시글을 불러오는 중 오류가 발생했습니다.' 
    });
  }
});

// 게시글 작성
router.post('/', requireAuth, [
  body('title').trim().isLength({ min: 1, max: 200 }).withMessage('제목은 1-200자 사이여야 합니다.'),
  body('content').trim().isLength({ min: 1, max: 10000 }).withMessage('내용은 1-10000자 사이여야 합니다.')
], async (req, res) => {
  try {
    // 유효성 검사
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        message: errors.array()[0].msg 
      });
    }

    const { title, content } = req.body;
    const author = req.session.user.name;

    const post = new Post({
      title,
      content,
      author
    });

    await post.save();

    res.status(201).json({ 
      success: true, 
      post 
    });
  } catch (error) {
    console.error('Create post error:', error);
    res.status(500).json({ 
      success: false, 
      message: '게시글 작성 중 오류가 발생했습니다.' 
    });
  }
});

// 게시글 수정
router.put('/:id', requireAuth, [
  body('title').trim().isLength({ min: 1, max: 200 }).withMessage('제목은 1-200자 사이여야 합니다.'),
  body('content').trim().isLength({ min: 1, max: 10000 }).withMessage('내용은 1-10000자 사이여야 합니다.')
], async (req, res) => {
  try {
    // 유효성 검사
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        message: errors.array()[0].msg 
      });
    }

    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ 
        success: false, 
        message: '게시글을 찾을 수 없습니다.' 
      });
    }

    // 작성자 확인
    if (post.author !== req.session.user.name) {
      return res.status(403).json({ 
        success: false, 
        message: '작성자만 수정할 수 있습니다.' 
      });
    }

    const { title, content } = req.body;
    post.title = title;
    post.content = content;
    post.updatedAt = Date.now();

    await post.save();

    res.json({ 
      success: true, 
      post 
    });
  } catch (error) {
    console.error('Update post error:', error);
    res.status(500).json({ 
      success: false, 
      message: '게시글 수정 중 오류가 발생했습니다.' 
    });
  }
});

// 게시글 삭제
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ 
        success: false, 
        message: '게시글을 찾을 수 없습니다.' 
      });
    }

    // 작성자 확인
    if (post.author !== req.session.user.name) {
      return res.status(403).json({ 
        success: false, 
        message: '작성자만 삭제할 수 있습니다.' 
      });
    }

    await Post.findByIdAndDelete(req.params.id);

    res.json({ 
      success: true, 
      message: '게시글이 삭제되었습니다.' 
    });
  } catch (error) {
    console.error('Delete post error:', error);
    res.status(500).json({ 
      success: false, 
      message: '게시글 삭제 중 오류가 발생했습니다.' 
    });
  }
});

module.exports = router;

