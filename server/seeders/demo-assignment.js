'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        const now = new Date();
        return queryInterface.bulkInsert(
            'Assignments',
            [
                {
                    name: 'homework',
                    courseId: 1,
                    createdAt: now,
                    updatedAt: now,
                },
                {
                    name: 'quiz',
                    courseId: 2,
                    createdAt: now,
                    updatedAt: now,
                },
                {
                    name: 'midterm',
                    courseId: 3,
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
        return queryInterface.bulkDelete('Assignments', null, {});
    }
};
