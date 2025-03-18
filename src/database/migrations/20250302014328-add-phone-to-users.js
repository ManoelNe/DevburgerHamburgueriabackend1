'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users', 'phone', {
      type: Sequelize.STRING,
      allowNull: true, // Pode ser opcional, pois nem todos os usuários terão telefone
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('users', 'phone');
  },
};

