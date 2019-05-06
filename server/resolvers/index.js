import queries from "./queries";
import mutations from './mutations';
import { sequelize } from "../models";


export default {
  Query: queries,
  Mutation: mutations,
  User: {
    __resolveType: (user, context, info) => user.role,
  },
  Student: {
    courses: (student, args, { db }, info) => {
      return student.getCourses();
    }
  },
  Faculty: {
    courses: (faculty, args, { db }, info) => {
      console.log(faculty)
      return db.Course.findAll({
        where: {
          userId: faculty.dataValues.id
        }
      })
    }
  },
  Course: {
    students: (course, args, { db }, info) => {
      console.log('course', course);
      return course.getUsers();
    },
    professor: (course, args, { db }, info) => {
      return course.getUser();
    }
  },

};
