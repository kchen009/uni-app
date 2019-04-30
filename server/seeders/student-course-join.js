"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("StudentCourses", [
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        courseId: 1,
        userId: 2
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        courseId: 2,
        userId: 2
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        courseId: 3,
        userId: 3
      },
      
    ]);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
