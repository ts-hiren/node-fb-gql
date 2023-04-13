import { gql } from "apollo-server-core";

const typeDefs = gql`
  extend type Query {
    user(id: ID!): User
    users(options: PageQueryOptions): UsersPage
  }
  type Mutation {
    createUser(input: UserInput): User
    updateUser(id: ID!, input: UserInput): User
  }
  input UserInput {
    id: String
    firstName: String
    lastName: String
    email: String
    address: String
    phone: String
    gender: String
    birthDate: String
    joiningDate: String
    position: String
    skills: [String]
    totalExp: String
    status: String
    password: String
  }

  type User {
    id: String
    email: String
    firstName: String
    lastName: String
    position: String
    joiningDate: String
    birthDate: String
    totalExp: String
    skills: [String]
    address: String
    phone: String
    status: String
    password: String
    gender: String
  }

  type UsersPage {
    data: [User]
    links: PaginationLinks
    meta: PageMetadata
  }
`;

export default typeDefs;
