'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('shops', 'address', { type: Sequelize.STRING });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn('shops', 'adress');
    }
};