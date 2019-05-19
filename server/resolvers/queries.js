import { makeResolver } from "../Auth";

export default {

  users: makeResolver((parent, args, context, info) => {
    return context.db.User.findAll();
  },
    { roles: ['Admin'] },
  ),

  students: (parent, args, context, info) => {
    return context.db.User.findAll({
      where: {
        role: 'Student'
      }
    })
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
