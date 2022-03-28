const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const User = require('./user');
const UserInfo = require('./userInfo');
const Room = require('./room');
const Chat = require('./chat');

const db = {};

// config.json 파일과 연결된 부분 
// Sequelize는 시퀄라이즈 패키지이자 생성자. 
// config/config.json에서 데이터베이스 설정을 불러온 후 new Sequelize를 통해 MySQL 연결 객체를 생성함. 
// 연결 객체를 나중에 재사용하기 위해 db.sequelize에 넣어둠. 
const sequelize = new Sequelize(
  config.database, config.username, config.password, config,
);

db.sequelize = sequelize;
db.User = User;
db.UserInfo = UserInfo;
db.Room = Room;
db.Chat = Chat;

User.init(sequelize);
UserInfo.init(sequelize);
Room.init(sequelize);
Chat.init(sequelize);

User.associate(db);
UserInfo.associate(db);
Room.associate(db);
Chat.associate(db);

module.exports = db;