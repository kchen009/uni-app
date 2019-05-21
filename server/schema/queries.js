import types from "./types";
export default `
  type Query {
    users: [User!],
    students(id: Int): [Student],
    faculty: [Faculty],
    currentUser: User,
  }
`;
