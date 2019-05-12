// 'use strict';
const crypto = require( "crypto");


const genRandomString = length => {
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString('hex') /** convert to hexadecimal format */
    .slice(0, length); /** return required number of characters */
};

const sha512 = (password, salt) => {
  var hash = crypto.createHmac(
    'sha512',
    salt,
  ); /** Hashing algorithm sha512 */
  hash.update(password);
  var value = hash.digest('hex');
  return {
    salt: salt,
    passwordHash: value,
  };
};

const genSaltHashPassword = userpassword => {
  var salt = genRandomString(16); /** Gives us salt of length 16 */
  var passwordData = sha512(userpassword, salt);
  console.log('UserPassword = ' + userpassword);
  console.log('Passwordhash = ' + passwordData.passwordHash);
  console.log('nSalt = ' + passwordData.salt);
  return passwordData;
};


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
          ...genSaltHashPassword('password'),


        },
        {
          name: 'Sally',
          email: 'sally@demo.com',
          role: 'Student',
          gpa: 3.5,
          createdAt: now,
          updatedAt: now,
          ...genSaltHashPassword('password'),

        },
        {
          name: 'Erik',
          email: 'erik@demo.com',
          role: 'Student',
          gpa: 3.0,
          createdAt: now,
          updatedAt: now,
          ...genSaltHashPassword('password'),

        },
        {
          name: 'Tom',
          email: 'tom@demo.com',
          role: 'Student',
          gpa: 4.00,
          createdAt: now,
          updatedAt: now,
          ...genSaltHashPassword('password'),

        },
        {
          name: 'Paul',
          email: 'paul@demo.com',
          role: 'Faculty',
          createdAt: now,
          updatedAt: now,
          ...genSaltHashPassword('password'),

        },
        {
          name: 'Scott',
          email: 'scott@demo.com',
          role: 'Faculty',
          createdAt: now,
          updatedAt: now,
          ...genSaltHashPassword('password'),

        },
        {
          name: 'Lisa',
          email: 'lisa@demo.com',
          role: 'Faculty',
          createdAt: now,
          updatedAt: now,
          ...genSaltHashPassword('password'),

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
