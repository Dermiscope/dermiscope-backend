'use strict';

const GenerateID = require('../../../utils/uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'users',
      [
        {
          id: GenerateID(),
          id_google: GenerateID(),
          fullname: 'Aristo Caesar Pratama',
          email: 'aristocaesarpratama@gmail.com',
          image: 'https://aristocaesar.my.id/images/aristocaesar.jpeg',
          role: 'Administrator',
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  },
};
