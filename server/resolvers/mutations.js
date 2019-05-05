import _ from 'lodash';
import { makeResolver } from '../Auth';


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
      return  context.users.login(args.email, args.password, {db: context.db});
    },
    { requireUser: false },
  ),
  logoutUser: makeResolver((root, args, context, info) => {
    const sessionID = context.sessionID;
    // console.log(context);
    context.userSessions.invalidateSession(sessionID);
    return true;
  }),
};
