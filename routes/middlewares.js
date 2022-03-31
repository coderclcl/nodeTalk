// 이미 로그인한 사용자는 회원가입, 로그인 라우터에 접근하면 안 됨 
// 로그인하지 않은 사용자는 로그아웃 라우터에 접근하면 안 됨 
// 라우터에 접근 권한을 제어하는 미들웨어 

exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        console.log("로그인된 상태 확인 완료~")
        next();
    } else {
        // res.status(403).send('로그인 필요');
        res.redirect('/');
    }
};

exports.isNotLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        console.log("로그인 안 한 상태 확인 완료~")
        next();
    } else {
        // const message = encodeURIComponent('로그인한 상태입니다.');
        // res.redirect(`/?error=?{message}`);
        res.redirect('/friends');
    }
};

