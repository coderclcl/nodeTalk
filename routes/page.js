const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router = express.Router();

router.use((req, res, next) => {
    res.locals.user = null;
    next();
});

router.get('/join', isNotLoggedIn, (req, res) => {
    res.render('join', { title: '회원가입' });
});

router.get('/', (req, res, next) => {
    const friends = [];
    res.render('main', {
        title: 'NodeTalk',
        friends,
    });
});

module.exports = router;