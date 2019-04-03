module.exports = (sequelize, DataTypes) => sequelize.define(
    'orders', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoincrement: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        payment_status: {
            type: DataTypes.ENUM('0', '1'), //0 未支付 1已支付
            defautValue: '0',
        }
    }, {
        tableName: 'orders',
    },
);