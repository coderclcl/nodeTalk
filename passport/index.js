const passport = require('passport');
const local = require('./localStrategy');
const User = require('../models/user');

module.exports = () => {

    // serializeUser는 로그인 시에만 실행되며, req.session 객체에 어떤 데이터를 저장할지 정하는 메서드 
    passport.serializeUser((user, done) => {
        done(null, user.uid);
    });

    // deserializeUser는 매 요청시 실행되며, passport.session 미들웨어가 이 메서드를 호출함 
    // serializeUser의 done의 두 번째 인수 user.uid가 deserializeUser(uid) 의 매개변수로 들어옴 
    // 조회한 정보를 req.user에 저장하므로 앞으로 req.user를 통해 로그인한 사용자의 정보를 가져올 수 있음 
    passport.deserializeUser((uid, done) => {
        User.findOne({ where: { uid } })
            .then(user => done(null, user))
            .catch(err => done(err));
    });

    local(); 

};