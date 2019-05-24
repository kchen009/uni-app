# Uni Server

Heroku Link - https://evening-cliffs-67832.herokuapp.com/


## For Local dev

You must have Postgres running on your machine. I use [Postgres App](https://postgresapp.com/). 

`yarn install`
configure your /server/config/config.json

`yarn setup` - This runs 3 other comamnds in the package.json which

- Creates a new Postgres database (Postgres must be runnning locally for this to work. The configuration/credentials can be set in the `server/config/config.json` file.).
- Runs migrations to create tables for User, Course, Assignment, and their join tables.
- Runs seeds to populate these tables for demo purposes.

`yarn start` - Runs your express server which servers your graphql playground at [http://localhost:3000/graphql](http://localhost:3000/graphql)

`yarn test` - Runs the test suite, must have server running first.

## Example queries and mutations

Mutation to login user. Logging in returns a token which you need to add into the http header of query/mutation in the apollo playground. 

For example, 
```
mutation {
  loginUser(email: "john@demo.com", password: "password") {
    token
    user {
      id
      name
      email
      role
    }
  }
}
```
This token will be used to identify/validate the user.  In the graphql playground you need to set the token returned as Authorization in the http header in order for queries/mutations to work. 
```
{"Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwic2Vzc2lvbklEIjoxLCJpYXQiOjE1NTcwODc2MTcsImV4cCI6MTU1NzA4ODIxN30.fBwmnr7EGhpSYuR7xYcyGMaunakcu8qZiQZgfk5A8-4"}
```

On the web client, the token can be cached and included in all future api request to the server so the backend can identify the user.

## Queries

```
query {
  users {
    id
    name
    email
    role
  }
}

```

```
query {
  students {
    id
    name
    email
    role
    courses {
      name
    }
    assignments {
      name
      grades {
        grade
      }
    }
  }
}
```

```
query {
  students {
    id
    name
    email
    role
    courses {
      name
    }
    assignments {
      name
      grades {
        grade
      }
    }
  }
}

```
```
query {
  currentUser {
    id
    name
  }
}

```


## Mutation 

logout user
```
mutation{
  logoutUser
}
```

create user (you must be an admin)
```
mutation {
  createUser(
    user: {
      name: "Cara"
      email: "cara@demo.com"
      role: Student
      password: "password"
    }
  ) {
    id
    name
    email
  }
}
```
update user (you must be an admin)
```
mutation {
  updateUser(
    id: 8
    user: {
      name: "Kara"
      email: "kara@demo.com"
      role: Student
      password: "password"
    }
  ) {
    id
    name
    email
    role
  }
}
```
create course (you must be a faculty member)
```
mutation {
  createCourse(name: "Data Visualization", facultyID: 6) {
    id
    name
    professor{
      name
    }
  }
}
```
create studentcourse (you must be a faculty member)
```
mutation {
  addCourseStudent(courseID: 4, studentID: 4) {
    id
    name
    students {
      id
      name
    }
  }
}
```
delete studentcourse (you must be faculty member)
```
mutation {
  deleteCourseStudent(courseID: 4, studentID: 4) {
    id
    name
    students {
      id
      name
    }
  }
}
```
create assignment (you must be a faculty)
```
mutation {
  createAssignment(courseID: 4, name: "homework1") {
    id
    name
  }
}
```

Create assignmentGrade (you must be a faculty)
```
mutation {
  createAssignmentGrade(assignmentID: 1, studentID: 2, grade: 99.0) {
    id
    assignment {
      name
    }
    student {
      name
    }
    grade
  }
}
```


#### created with GraphQL, Apollo, Node, Express, [dse-i2400-project-template](https://github.com/makeitnew/dse-i2400-project-template), [GraphQL-Appollo-Sequelize-starter](https://github.com/andrecalvo/GraphQL-Apollo-Node-Express-Postgres-Sequelize-starter)
