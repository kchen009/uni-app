import types from "./types";
export default `
  type Query {
    users: [User!],
    students: [Student],
    faculty: [Faculty],
    currentUser: User,
  }
`;
