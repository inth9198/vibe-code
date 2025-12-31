// 인증 확인 미들웨어
const requireAuth = (req, res, next) => {
  if (!req.session || !req.session.user) {
    return res.status(401).json({ 
      success: false, 
      message: '로그인이 필요합니다.' 
    });
  }
  next();
};

// 작성자 확인 미들웨어
const requireAuthor = (authorField) => {
  return (req, res, next) => {
    const author = req[authorField];
    if (author !== req.session.user.name) {
      return res.status(403).json({ 
        success: false, 
        message: '작성자만 수정/삭제할 수 있습니다.' 
      });
    }
    next();
  };
};

module.exports = {
  requireAuth,
  requireAuthor
};

