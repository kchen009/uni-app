"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("AssignmentGrades", [
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        assignmentId: 1,
        userId: 2,
        grade: 100.0
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        assignmentId: 2,
        userId: 3,
        grade: 100.0
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        assignmentId: 3,
        userId: 4,
        grade: 100.0
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
