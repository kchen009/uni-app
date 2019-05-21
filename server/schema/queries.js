import types from "./types";
export default `
  type Query {
    users: [User!],
    students(id: ID): [Student],
    faculty: [Faculty],
    currentUser: User,
  }
`;
