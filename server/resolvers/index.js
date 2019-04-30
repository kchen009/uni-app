import queries from "./queries";
import mutations from './mutations';
export default {
  Query: queries,
  Mutation: mutations,
  User: {
    __resolveType: (user, context, info) => user.role,
  }
};
