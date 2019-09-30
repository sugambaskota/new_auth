import Sequelize from 'sequelize';
const sequelize = require('../db/sequelize');

const UserLoginInfo = sequelize.define('userLoginInfos', {
    id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true
    },
    uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1
    },
    userId: {
        type: Sequelize.UUID
    },
    expiresAt: {
        type: Sequelize.DATE
    }
}, {
    timestamps: true,
    paranoid: true
});

module.exports = UserLoginInfo;