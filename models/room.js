const Sequelize = require('sequelize');

module.exports = class Room extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            rid: {
                type: Sequelize.STRING(10),
                allowNull: false,
                unique: true,
            },
            roomName: {
                type: Sequelize.STRING(10),
                allowNull: false,
            },
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'Room',
            tableName: 'rooms',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
    static associate(db) {

        // Room 테이블과 User 테이블의 관계 (Member 중간 테이블 만들기)
        db.Room.belongsToMany(db.User, {
            through: 'Member',
            foreignKey: 'rid',
        });

        // Room 테이블과 Chat 테이블의 관계 
        db.Room.hasMany(db.Chat);


    }
};