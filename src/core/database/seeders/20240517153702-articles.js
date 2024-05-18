'use strict';

const GenerateID = require('../../../utils/uuid');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert(
      'articles',
      [
        {

        },
      ],
      {}
    );

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('articles', null, {});

  }
};
