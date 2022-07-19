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
    return queryInterface.bulkInsert('Notes', [
      {
        userId: 1,
        noteBowlId: 1,
        title: "Grocery List",
        content: "Butter, Milk, Eggs, Cheese",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        noteBowlId: 1,
        title: "Favorite Books",
        content: "The Bernstein Bears, Winnie The Pooh",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        noteBowlId: 4,
        title: "Garden Projects",
        content: "Prune vines, Fix irrigation, Fertilize Brugmansia",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        noteBowlId: 5,
        title: "Spain",
        content: "Barcelona, Andalusia (all of it)",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        noteBowlId: 2,
        title: "Birthdays",
        content: "Grandma (July, 10th), Eunice (August 15th)",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        noteBowlId: 6,
        title: "San Francisco Restaurants",
        content: "Nopalito, Louie's, Marlowe, Flour and Water",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 3,
        noteBowlId: 3,
        title: "To Do",
        content: "grocery shop, sell my bike, sweep house, dishes, bills",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 3,
        noteBowlId: 7,
        title: "South African Plants",
        content: "Leucadendrons",
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
    return queryInterface.bulkDelete('Notes', null, {});
  }
};
