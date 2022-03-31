const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router = express.Router();

router.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});

// 로그인되지 않은 사람만 로그인 페이지에 접근 가능하고, 만약 로그인되어 있다면 middleware.js에서 /friends 로 리다이렉트 
router.get('/', isNotLoggedIn, (req, res, next) => {
    try {
        res.render('login', {
            title: 'NodeTalk',
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
});

// 회원가입, 회원가입 완료 페이지는 로그인되지 않은 사람만 볼 수 있게 함 
router.get('/join', isNotLoggedIn, (req, res, next) => {
    res.render('join');
});

router.get('/joinComplete', isNotLoggedIn, (req, res, next) => {
    res.render('joinComplete');
});

// 친구 목록은 로그인된 사람만 볼 수 있게 함 
router.get('/friends', isLoggedIn, (req, res, next) => {
    res.render('friends');
});

router.get('/chat', isLoggedIn, (req, res, next) => {
    res.render('chat');
});

router.get('/chats', isLoggedIn, (req, res, next) => {
    res.render('chats');
});

router.get('/find', isLoggedIn, (req, res, next) => {
    res.render('find');
});

router.get('/more', isLoggedIn, (req, res, next) => {
    res.render('more');
});

router.get('/settings', isLoggedIn, (req, res, next) => {
    res.render('settings');
});

module.exports = router;