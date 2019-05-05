import { makeResolver } from "../Auth";

export default {

  users: makeResolver((parent, args, context, info) => {
    return context.db.User.findAll();
  },
    // { requireUser: false }
    // { roles: ['Student', 'Faculty'] }
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
  }

};
