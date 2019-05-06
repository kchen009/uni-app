import _ from 'lodash';
import { makeResolver } from '../Auth';
import crypto from "crypto";
import { ForbiddenError } from 'apollo-server';

// Middleware function to authenticate and authorize the user
// Takes a resolver function and returns an adorned resolver
// that authenticates the user and then checks whether the
// user is permitted to perform the action in specified resolver.
// Options is a an object with two keys, both of which can
// be omitted.
// The two keys are:
//   requireUser: does the operation require the user to be logged
//     in? Defaults to true if not supplied
//   roles: array which specifies which user roles allow this operation
//

export default {
  loginUser: makeResolver(
    (root, args, context, info) => {
      return context.users.login(args.email, args.password, { db: context.db });
    },
    { requireUser: false },
  ),
  logoutUser: makeResolver((root, args, context, info) => {
    const sessionID = context.sessionID;
    context.userSessions.invalidateSession(sessionID);
    return true;
  }),

  createUser: makeResolver(
    (root, args, context, info) => {
      let user = args.user;
      return context.users.create(user, context.db)
    },
    { roles: ['Admin'] }
  ),

  updateUser: makeResolver(
    (root, args, context, info) => {
      let id = args.id;
      let user = args.user;
      return context.users.update(id, user, context.db)
    },
    { roles: ['Admin'] }
  ),

  createCourse: makeResolver(
    (root, args, context, info) => {
      return context.db.Course.create({ name: args.name, userId: args.facultyID });
    },
    { roles: ['Faculty'] }
  ),

  deleteCourse: makeResolver(
    async (root, args, context, info) => {
      let response = await context.db.Course.destroy({
        returning: true,
        where: { id: args.courseID }
      });
      return (response === 1) ? true : false;
    },
    { roles: ['Faculty'] }
  ),

  addCourseStudent: makeResolver(
    async (root, args, context, info) => {
      const student = await context.db.User.findOne({
        where: { id: args.studentID }
      })
      const course = await context.db.Course.findOne({
        where: { id: args.courseID }
      })
      // if student or couse doesn't exist throw error
      if (!course || !student) {
        throw new ForbiddenError('Student or Course does not exist');
      }
      const response = await context.db.StudentCourse.create({ courseId: args.courseID, userId: args.studentID });
      if (!response) {
        throw new ForbiddenError('Response failed - creating new studentcourse');
      }
      return course
    },
    { roles: ['Faculty'] }
  ),

  deleteCourseStudent: makeResolver(
    async (root, args, context, info) => {
      const student = await context.db.User.findOne({
        where: { id: args.studentID }
      })
      const course = await context.db.Course.findOne({
        where: { id: args.courseID }
      })
      // if student or couse doesn't exist throw error
      if (!course || !student) {
        throw new ForbiddenError('Student or Course does not exist');
      }
      const response = await context.db.StudentCourse.destroy({
        where: { courseId: args.courseID, userId: args.studentID }
      });

      if (!response) {
        throw new ForbiddenError('Error - Student is not enrolled in this course')
      }
      return course
    },
    { roles: ['Faculty'] }
  ),

};
