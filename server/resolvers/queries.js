import { makeResolver } from "../Auth";

export default {
  categories: (parent, args, { db }, info) => {
    return db.Categories.findAll();
  },
  locations: (parent, args, { db }, info) => {
    const where = args.categoryId ? { id: args.categoryId } : {};
    return db.Locations.findAll({
      include: [
        {
          model: db.Categories,
          attributes: ["name"],
          where
        }
      ]
    });
  },

  users: makeResolver((parent, args, { db, req }, info) => {
    return db.User.findAll();
  },
    // { requireUser: false }
    // { roles: ['Student', 'Faculty'] }
  ),

  students: (parent, args, { db }, info) => {
    return db.User.findAll({
      where: {
        role: 'Student'
      },
      // include: [
      //   {
      //     model: db.Course,
      //     through: {attributes: []}
      //     // where: { id: args.id }
      //   }
      // ]
    })
  },

  faculty: (parent, args, { db }, info) => {
    return db.User.findAll({
      where: {
        role: 'Faculty'
      }
    })
  }

};
