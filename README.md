# Uni Server

Heroku Link - https://evening-cliffs-67832.herokuapp.com/


## For Local dev

You must have Postgres running on your machine. I use [Postgres App](https://postgresapp.com/). 

`yarn install`
configure your /server/config/config.json
`yarn setup` - This runs 3 other comamnds in the package.json which

- Creates a new Postgres database (Postgres must be runnning locally for this to work. The configuration/credentials can be set in the `server/config/config.json` file.).
- Runs migrations to create tables for Locations, Categories and their join table.
- Runs seeds to populate these tables for demo purposes.

`yarn start` - Runs your express server which servers your graphql playground at [http://localhost:4000/graphql](http://localhost:4000/graphql)

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
    role
  }
}

```

```
query {
  students {
    id
    name
    courses {
      id
      name
      professor {
        id
        name
      }
    }
  }
}

```

```
query {
  faculty {
    id
    name
    courses {
      id
      name
      students {
        id
        name
      }
    }
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

create user
```
mutation {
  createUser(
    user: {
      name: "joe"
      email: "joe@demo.com"
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


#### created with GraphQL, Apollo, Node, Express, Sequelize starter
