import { makeResolver } from "../Auth";

export default {

  users: (parent, args, context, info) => {
    return context.db.User.findAll();
  },
    // { roles: ['Admin'] },

  students: (parent, args, context, info) => {
    if (args.id) {
      return context.db.User.findAll({
        where: {
          id: args.id
        }
      })
    } else {
      return context.db.User.findAll({
        where: {
          role: 'Student'
        }
      })
    }
  },

  faculty: (parent, args, context, info) => {
    return context.db.User.findAll({
      where: {
        role: 'Faculty'
      }
    })
  },
  currentUser: makeResolver((parent, args, context, info) => {
    return context.user;
  })

};
