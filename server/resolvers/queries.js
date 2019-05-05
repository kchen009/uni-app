import { makeResolver } from "../Auth";

export default {

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
      }
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
