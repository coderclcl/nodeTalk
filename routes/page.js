const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router = express.Router();

router.use((req, res, next) => {
    res.locals.user = null;
    next();
});

// router.get('/join', isNotLoggedIn, (req, res) => {
//     res.render('index', { title: '회원가입' });
// });



router.get('/', (req, res, next) => {
    const friends = [];
    res.render('index', {
        title: 'NodeTalk',
        friends,
    });
});

router.get('/join', (req, res, next) => {
    res.render('join');
});

router.get('/friends', (req, res, next) => {
    res.render('friends');
});

router.get('/chat', (req, res, next) => {
    res.render('chat');
});

router.get('/chats', (req, res, next) => {
    res.render('chats');
});

router.get('/find', (req, res, next) => {
    res.render('find');
});

router.get('/more', (req, res, next) => {
    res.render('more');
});

router.get('/settings', (req, res, next) => {
    res.render('settings');
});

module.exports = router;