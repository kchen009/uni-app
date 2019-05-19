import queries from "./queries";
import mutations from './mutations';
import { sequelize } from "../models";


export default {
  Query: queries,
  Mutation: mutations,
  User: {
    __resolveType: (user, context, info) => user.role,
  },
  //these are data that can be returned for each students
  Student: {
    courses: (student, args, { db }, info) => {
      return student.getCourses();
    }, 
    assignments: (student, args, { db }, info) => {
      return student.getAssignments();
    },
  },
  Faculty: {
    courses: (faculty, args, { db }, info) => {
      // console.log(faculty)
      return db.Course.findAll({
        where: {
          userId: faculty.dataValues.id
        }
      })
    }
  },
  Course: {
    students: (course, args, { db }, info) => {
      // console.log('course', course);
      return course.getUsers();
    },
    professor: (course, args, { db }, info) => {
      return course.getUser();
    },

    assignments: (course, args, { db }, info) => {
      return course.getAssignments();

    },
  },
  AssignmentGrade: {
    student: (assignmentgrade, args, { db }, info) => {
      return db.User.findByPk(assignmentgrade.userId);
    },

    assignment: (assignmentgrade, args, { db }, info) => {
      return db.Assignment.findByPk(assignmentgrade.assignmentId);
    },
  },
  Assignment: {
    grades: (assignment, args, {db}, info) => {
      return db.AssignmentGrade.findAll({
        where: {
         assignmentId: assignment.id
        }
      })
    },
    course: (assignment, args, {db}, info) => {
      return assignment.getCourse();
    }
  }

};
