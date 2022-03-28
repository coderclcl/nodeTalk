const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const User = require('../models/user');
const UserInfo = require('../models/userInfo');

const  router = express.Router();

router.post('/join', isNotLoggedIn, async (req, res, next) => {
    const { uid, password, name, phone, mail, birth } = req.body;

    try {
        const exUser = await User.findOne({ where: { uid } });
        if (exUser) {
            return res.redirect('/join?error=exist');
        }
        // transaction 하는 방법은? 
        await User.create({
            uid,
            password,
        });
        await UserInfo.create({
            uid,
            phone, 
            mail,
            birth,
            name,
        });
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