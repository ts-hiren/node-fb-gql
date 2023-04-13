import { gql } from "apollo-server-core";

const typeDefs = gql`
  extend type Query {
    project(id: ID!): Project
    projects(options: PageQueryOptions): ProjectPage
  }
  extend type Mutation {
    createProject(input: ProjectInput): Project
  }

  input ProjectInput {
    id: String
    createAt: String
    description: String
    title: String
  }

  type Project {
    id: String
    createAt: String
    description: String
    title: String
  }

  type ProjectPage {
    data: [Project]
    links: PaginationLinks
    meta: PageMetadata
  }
`;

export default typeDefs;
