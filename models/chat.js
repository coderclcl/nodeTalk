const Sequelize = require('sequelize');

module.exports = class Chat extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            cid: {
                primaryKey: true,
                type: Sequelize.STRING(10),
                allowNull: false, 
                unique: true,
            },
            rid: {
                type: Sequelize.STRING(10),
                allowNull: false,
                unique: true,
            },
            uid: {
                type: Sequelize.STRING(10),
                allowNull: false,
                unique:true,
            }, 
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Chat',
            tableName: 'chats',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }

    static associate(db) {

        // Room 테이블과 Chat 테이블의 관계 
        db.Chat.belongsTo(db.Room, {
            foreignKey: 'rid',
            sourceKey: 'rid', 
        });

        // Chat 테이블과 User 테이블의 관계 
        db.Chat.belongsTo(db.User, {
            foreignKey: 'uid',
            sourceKey: 'uid', 
        });

    }
};