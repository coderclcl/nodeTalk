const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const User = require('../models/user');
const UserInfo = require('../models/userInfo');
const { sequelize } = require('../models');

const  router = express.Router();

router.post('/join', isNotLoggedIn, async (req, res, next) => {
    const { uid, password, name, phone, mail, birth } = req.body;

    const t = await sequelize.transaction();

    try {
        const exUser = await User.findOne({ where: { uid } });
        if (exUser) {
            return res.redirect('/join?error=exist');
        }
        // transaction을 sequelize 기능으로 구현 
        await User.create({
            uid,
            password,
        }, {transaction: t});
        await UserInfo.create({
            uid,
            phone, 
            mail,
            birth,
            name,
        }, {transaction: t});

        // 문제 없으면 이 줄에 도달해서 트랜잭션을 커밋 
        await t.commit();

        return res.redirect('/');
    } catch (error) {
        console.error(error);
        return next(error);
    }
});

router.post('/login', isNotLoggedIn, (req, res, next) => {

    console.log("routes/auth.js 의 router.post('/login')로 왔어");

    passport.authenticate('local', (authError, user, info) => {
        if (authError) {
            console.error(authError);
            return next(authError);
        }
        if (!user) {
            return res.redirect(`/?loginError=${info.message}`);
        }
        return req.login(user, (loginError) => {
            if (loginError) {
                console.error(loginError);
                return next(loginError);
            }
            return res.redirect('/friends');
        });
    })(req, res, next);
});

router.get('/logout', isLoggedIn, (req, res) => {
    req.logout();
    req.session.destroy();
    res.redirect('/');
});
module.exports = router;