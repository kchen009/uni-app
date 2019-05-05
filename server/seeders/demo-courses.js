'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const now = new Date();
    return queryInterface.bulkInsert(
      'Courses', 
      [
        {
          name: 'data-eng',
          userId: 5,
          createdAt: now,
          updatedAt: now,
        },
        {
          name: 'ml',
          userId: 6,
          createdAt: now,
          updatedAt: now,
        },
        {
          name: 'big-data',
          userId: 5,
          createdAt: now,
          updatedAt: now,
        },
      ],
      {},
      );
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
     return queryInterface.bulkDelete('Courses', null, {});
  }
};
