import { ApolloServer } from "apollo-server";
import typeDefs from "./gql/typeDefs";
import resolvers from "./gql/resolvers";
import context from "./gql/context";

const server = new ApolloServer({ typeDefs, resolvers, context });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
