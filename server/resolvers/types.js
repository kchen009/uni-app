export default `
User: {
    __resolveType: (user, context, info) => user.role,
  },

`