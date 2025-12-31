const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../models/User');

// 로그인
router.post('/login', [
  body('name').trim().isLength({ min: 1, max: 50 }).withMessage('이름은 1-50자 사이여야 합니다.')
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

    const { name } = req.body;

    // 사용자 찾기 또는 생성
    let user = await User.findOne({ name });
    if (!user) {
      user = new User({ name });
      await user.save();
    }

    // 세션에 사용자 정보 저장
    req.session.user = {
      id: user._id,
      name: user.name
    };

    res.json({ 
      success: true, 
      user: { 
        name: user.name 
      } 
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      success: false, 
      message: '로그인 중 오류가 발생했습니다.' 
    });
  }
});

// 로그아웃
router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ 
        success: false, 
        message: '로그아웃 중 오류가 발생했습니다.' 
      });
    }
    res.json({ 
      success: true, 
      message: '로그아웃되었습니다.' 
    });
  });
});

// 현재 사용자 정보
router.get('/me', (req, res) => {
  if (req.session && req.session.user) {
    res.json({ 
      success: true, 
      user: req.session.user 
    });
  } else {
    res.status(401).json({ 
      success: false, 
      message: '로그인되어 있지 않습니다.' 
    });
  }
});

module.exports = router;

