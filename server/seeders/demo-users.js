'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const now = new Date();
    return queryInterface.bulkInsert(
      'Users', 
      [
        {
          name: 'John',
          email: 'john@demo.com',
          role: 'Admin',
          createdAt: now,
          updatedAt: now,
        },
        {
          name: 'Sally',
          email: 'sally@demo.com',
          role: 'Student',
          gpa: 3.67,
          createdAt: now,
          updatedAt: now,
        },
        {
          name: 'Erik',
          email: 'erik@demo.com',
          role: 'Student',
          gpa: 2.91,
          createdAt: now,
          updatedAt: now,
        },
        {
          name: 'Tom',
          email: 'tom@demo.com',
          role: 'Student',
          gpa: '1.9',
          createdAt: now,
          updatedAt: now,
        },
        {
          name: 'Vivian',
          email: 'paul@demo.com',
          role: 'Faculty',
          createdAt: now,
          updatedAt: now,
        },
        {
          name: 'Scott',
          email: 'scott@demo.com',
          role: 'Faculty',
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
    return queryInterface.bulkDelete("Users", null, {});

    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
