import _ from 'lodash';
import { makeResolver } from '../Auth';
import crypto from "crypto";


const genRandomString = length => {
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString('hex') /** convert to hexadecimal format */
    .slice(0, length); /** return required number of characters */
};

const sha512 = (password, salt) => {
  var hash = crypto.createHmac(
    'sha512',
    salt,
  ); /** Hashing algorithm sha512 */
  hash.update(password);
  var value = hash.digest('hex');
  return {
    salt: salt,
    passwordHash: value,
  };
};

const genSaltHashPassword = userpassword => {
  var salt = genRandomString(16); /** Gives us salt of length 16 */
  var passwordData = sha512(userpassword, salt);
  console.log('UserPassword = ' + userpassword);
  console.log('Passwordhash = ' + passwordData.passwordHash);
  console.log('nSalt = ' + passwordData.salt);
  return passwordData;
};

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
      let user = args.user
      let password = genSaltHashPassword(user.password);
      return context.db.User.create({ name: user.name, email: user.email, role: user.role, ...password })
    },
    { roles: ['Admin'] }
  )
};
