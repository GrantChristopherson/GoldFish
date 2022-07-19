'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('NoteBowls', [
      {
        userId: 1,
        title: "Main",
        default: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        title: "Main",
        default: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 3,
        title: "Main",
        default: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        title: "To Do Lists",
        default: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        title: "Places I'd Like To Visit",
        default: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        title: "My Favourite Restaurants",
        default: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 3,
        title: "Plants I Love...",
        default: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('NoteBowls', null, {});
  }
};
