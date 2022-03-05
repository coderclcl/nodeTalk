const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            uid: {
                type: Sequelize.STRING(10),
                allowNull: false,
                unique:true,
            }, 
            password: {
                type: Sequelize.STRING(10),
                allowNull: false,
            },
            name: {
                type: Sequelize.STRING(10),
                allowNull: false,
            },
            provider: {
                type: Sequelize.STRING(10),
                allowNull: false,
                defaultValue: 'local',
            },
            snsId: {
                type: Sequelize.STRING(30),
                allowNull: true,
            },
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'User',
            tableName: 'users',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }

    static associate(db) {

        // User 테이블과 UserInfo 테이블의 관계 
        db.User.hasOne(db.UserInfo, {
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });
        
        // User 테이블과 User 테이블의 관계 (Friend 중간 테이블 만들기)
        db.User.belongsToMany(db.User, {
            foreignKey: 'followingId',
            as: 'Followers',
            through: 'Friend' // 중간 테이블 이름 
        });

        db.User.belongsToMany(db.User, {
            foreignKey: 'followerId',
            as: 'Followings',
            through: 'Friend' // 중간 테이블 이름 
        });

        // User 테이블과 Room 테이블의 관계 (Member 중간 테이블 만들기)
        db.User.belongsToMany(db.Room, {
            through: 'Member',
            foreignKey: 'uid',
        });


    }
};