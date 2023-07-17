import express from "express";
import {ApolloServer} from "@apollo/server";
import bodyParser from "body-parser";
import cors from "cors";
import {expressMiddleware} from "@apollo/server/express4";
// import axios from "axios";
import TODOS from "./todos.js";
import USERS from "./users.js";

const startServer = async () => {
  const app = express();
  const server = new ApolloServer({
    typeDefs: `
    type User{
      id: ID!
      name: String!
      username: String!
      email: String!
      phone: String!
      website: String!
    }
    
    
    type Todo{
      id: ID!
      title: String!
      completed: Boolean
      user: User
    }
    type Query {
      getTodos: [Todo]
      getAllUsers: [User]
      getUser(id: ID!): User

    } 
       
    `,
    resolvers: {
      Todo: {
        user: async (todo) => USERS.find((e) => e.id === todo.id),
      },
      Query: {
        getTodos: () => TODOS,
        getAllUsers: () => USERS,
        getUser: (parent, {id}) => USERS.find((e) => e.id === id),
      },
    },
  });

  app.use(bodyParser.json());
  app.use(cors());
  await server.start();
  app.use("/graphql", expressMiddleware(server));
  app.listen(8000, () => console.log("Server is Live"));
};

startServer();
