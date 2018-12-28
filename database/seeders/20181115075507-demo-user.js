'use strict';

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert('Users', [{
      name: 'John',
      age: 18,
      role: 'admin',
      phone: '12121212',
    }], {});
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('Users', {
      name: 'John',
      age: 18,
      role: 'admin',
      phone: '12121212',
    }, {});
  },
};
