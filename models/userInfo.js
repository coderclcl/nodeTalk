const Sequelize = require('sequelize');

module.exports = class UserInfo extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            phone: {
                type: Sequelize.STRING(11),
                allowNull: false,
                unique: true,
            },
            mail: {
                type: Sequelize.STRING(15),
                allowNull: false,
            },
            birth: {
                type: Sequelize.DATE,
                allowNull: true,
            },
            name: {
                type: Sequelize.STRING(10),
                allowNull:false,
            },
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'UserInfo',
            tableName: 'userInfo',
            paranoid: true, 
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }

    static associate(db) {

        // User 테이블과 UserInfo 테이블의 관계 
        db.UserInfo.belongsTo(db.User);

        
    }
    
};