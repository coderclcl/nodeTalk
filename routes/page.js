const express = require('express');

const router = express.Router();

router.use((req, res, next) => {
    res.locals.user = null;
    next();
});

router.get('/join', (req, res) => {
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